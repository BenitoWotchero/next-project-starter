#!/usr/bin/env node

/**
 * 🤖 AI Documentation Check
 * Prüft Dokumentations-Referenzen und Verlinkungen
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.blue.bold('\n🤖 AI Documentation Check\n'));

let issues = [];

// Überprüfe OVERVIEW.MD Referenzen
function checkOverviewReferences() {
  console.log(chalk.yellow('📋 Prüfe OVERVIEW.MD Referenzen...\n'));
  
  if (!fs.existsSync('docs/OVERVIEW.MD')) {
    issues.push('❌ docs/OVERVIEW.MD fehlt');
    return;
  }
  
  const overviewContent = fs.readFileSync('docs/OVERVIEW.MD', 'utf8');
  
  // Finde alle Links im Format [text](path)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let validLinks = 0;
  let brokenLinks = 0;
  
  while ((match = linkRegex.exec(overviewContent)) !== null) {
    const linkText = match[1];
    const linkPath = match[2];
    
    // Relative Pfade prüfen (ignoriere externe URLs)
    if (!linkPath.startsWith('http') && !linkPath.startsWith('#')) {
      const fullPath = path.resolve('docs', linkPath);
      
      if (fs.existsSync(fullPath) || fs.existsSync(linkPath)) {
        console.log(chalk.green(`✅ ${linkText} → ${linkPath}`));
        validLinks++;
      } else {
        console.log(chalk.red(`❌ ${linkText} → ${linkPath} (BROKEN)`));
        issues.push(`Broken link in OVERVIEW.MD: ${linkPath}`);
        brokenLinks++;
      }
    }
  }
  
  console.log(chalk.blue(`\n📊 Links gefunden: ${validLinks + brokenLinks} (${validLinks} gültig, ${brokenLinks} defekt)\n`));
}

// Überprüfe verwaiste Dateien
function checkOrphanedFiles() {
  console.log(chalk.yellow('🔍 Prüfe verwaiste Dateien...\n'));
  
  if (!fs.existsSync('docs/OVERVIEW.MD')) {
    return;
  }
  
  const overviewContent = fs.readFileSync('docs/OVERVIEW.MD', 'utf8');
  
  // Sammle alle .md Dateien im docs/ Verzeichnis
  const getAllMdFiles = (dir) => {
    let files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        files = files.concat(getAllMdFiles(fullPath));
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
    return files;
  };
  
  if (fs.existsSync('docs')) {
    const mdFiles = getAllMdFiles('docs');
    
    for (const file of mdFiles) {
      const relativePath = path.relative('docs', file);
      
      // Ignoriere OVERVIEW.MD selbst
      if (relativePath === 'OVERVIEW.MD') continue;
      
      // Prüfe ob File in Overview erwähnt wird
      if (overviewContent.includes(relativePath) || overviewContent.includes(file)) {
        console.log(chalk.green(`✅ ${relativePath} ist referenziert`));
      } else {
        console.log(chalk.yellow(`⚠️ ${relativePath} ist NICHT in OVERVIEW.MD referenziert`));
        issues.push(`Orphaned file: ${relativePath} not referenced in OVERVIEW.MD`);
      }
    }
  }
}

// Überprüfe AI-Workflow Konsistenz
function checkAIWorkflows() {
  console.log(chalk.yellow('\n🤖 Prüfe AI-Workflow Konsistenz...\n'));
  
  const aiFiles = [
    'AI-WORKFLOWS/START-PROMPT.md',
    'AI-WORKFLOWS/CONTEXT-KEEPER.md'
  ];
  
  for (const file of aiFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Prüfe ob wichtige Referenzen vorhanden sind
      const requiredRefs = ['docs/OVERVIEW.MD', 'CHECKLIST.MD', 'WORKFLOWS.MD'];
      let foundRefs = 0;
      
      for (const ref of requiredRefs) {
        if (content.includes(ref)) {
          foundRefs++;
        }
      }
      
      if (foundRefs >= 2) {
        console.log(chalk.green(`✅ ${file} hat ausreichend Referenzen (${foundRefs}/${requiredRefs.length})`));
      } else {
        console.log(chalk.yellow(`⚠️ ${file} hat wenige Referenzen (${foundRefs}/${requiredRefs.length})`));
        issues.push(`${file} missing important references`);
      }
    } else {
      issues.push(`❌ ${file} fehlt`);
    }
  }
}

// Überprüfe Checkbox-Format
function checkCheckboxFormat() {
  console.log(chalk.yellow('\n☑️ Prüfe Checkbox-Format...\n'));
  
  const checklistFile = 'docs/CHECKLIST.MD';
  if (fs.existsSync(checklistFile)) {
    const content = fs.readFileSync(checklistFile, 'utf8');
    
    // Zähle verschiedene Checkbox-Formate
    const emptyCheckboxes = (content.match(/- \[ \]/g) || []).length;
    const checkedCheckboxes = (content.match(/- \[x\]/g) || []).length;
    const invalidCheckboxes = (content.match(/- \[[^x\s]\]/g) || []).length;
    
    console.log(chalk.green(`✅ Leere Checkboxes: ${emptyCheckboxes}`));
    console.log(chalk.blue(`✅ Erledigte Checkboxes: ${checkedCheckboxes}`));
    
    if (invalidCheckboxes > 0) {
      console.log(chalk.red(`❌ Ungültige Checkboxes: ${invalidCheckboxes}`));
      issues.push(`Invalid checkbox format in ${checklistFile}`);
    }
    
    if (emptyCheckboxes < 10) {
      console.log(chalk.yellow(`⚠️ Wenige Checkboxes gefunden (${emptyCheckboxes})`));
    }
  }
}

// Hauptfunktion
async function main() {
  checkOverviewReferences();
  checkOrphanedFiles();
  checkAIWorkflows();
  checkCheckboxFormat();
  
  // Ergebnis
  console.log(chalk.yellow('\n📊 AI Check Ergebnis:\n'));
  
  if (issues.length === 0) {
    console.log(chalk.green.bold('🎉 Alle AI-Checks bestanden! Dokumentation ist KI-freundlich.\n'));
    console.log(chalk.gray('💡 Die KI kann jetzt optimal mit deiner Dokumentation arbeiten.'));
    process.exit(0);
  } else {
    console.log(chalk.red.bold(`❌ ${issues.length} Issues gefunden:\n`));
    
    issues.forEach((issue, index) => {
      console.log(chalk.red(`${index + 1}. ${issue}`));
    });
    
    console.log(chalk.yellow('\n💡 Empfehlungen:'));
    console.log(chalk.gray('• Aktualisiere docs/OVERVIEW.MD mit fehlenden Referenzen'));
    console.log(chalk.gray('• Entferne verwaiste Files oder verlinke sie'));
    console.log(chalk.gray('• Überprüfe AI-WORKFLOWS auf wichtige Referenzen'));
    console.log(chalk.gray('• Korrigiere Checkbox-Format zu "- [ ]" oder "- [x]"'));
    
    process.exit(1);
  }
}

main(); 