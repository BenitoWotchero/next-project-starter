#!/usr/bin/env node

/**
 * 🏗️ Project Structure Validator
 * Prüft ob alle notwendigen Dateien und Ordner vorhanden sind
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

console.log(chalk.blue.bold('\n🔍 Projekt-Struktur Validation\n'));

const requiredFiles = [
  'docs/OVERVIEW.MD',
  'docs/CHECKLIST.MD', 
  'docs/WORKFLOWS.MD',
  'AI-WORKFLOWS/START-PROMPT.md',
  'AI-WORKFLOWS/CONTEXT-KEEPER.md',
  'package.json',
  'PROJECT-SETUP.md'
];

const requiredDirs = [
  'docs',
  'AI-WORKFLOWS',
  'scripts'
];

let allGood = true;

// Files prüfen
console.log(chalk.yellow('📁 Prüfe Required Files...\n'));
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(chalk.green(`✅ ${file}`));
  } else {
    console.log(chalk.red(`❌ ${file} - FEHLT!`));
    allGood = false;
  }
});

console.log(chalk.yellow('\n📂 Prüfe Required Directories...\n'));
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(chalk.green(`✅ ${dir}/`));
  } else {
    console.log(chalk.red(`❌ ${dir}/ - FEHLT!`));
    allGood = false;
  }
});

// Spezielle Checks
console.log(chalk.yellow('\n🔍 Spezielle Checks...\n'));

// Checkbox-Count in _CHECKLIST.md
if (fs.existsSync('docs/_CHECKLIST.md')) {
  const checklistContent = fs.readFileSync('docs/_CHECKLIST.md', 'utf8');
  const checkboxCount = (checklistContent.match(/- \[ \]/g) || []).length;
  
  if (checkboxCount > 10) {
    console.log(chalk.green(`✅ Checkboxes in _CHECKLIST.md: ${checkboxCount}`));
  } else {
    console.log(chalk.yellow(`⚠️ Wenige Checkboxes in _CHECKLIST.md: ${checkboxCount}`));
  }
}

// Package.json Scripts
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['setup', 'dev', 'validate', 'ai-check'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(chalk.green(`✅ npm script: ${script}`));
    } else {
      console.log(chalk.red(`❌ npm script fehlt: ${script}`));
      allGood = false;
    }
  });
}

// Next.js Check
if (fs.existsSync('src/app') || fs.existsSync('pages')) {
  console.log(chalk.green('✅ Next.js Struktur erkannt'));
} else {
  console.log(chalk.yellow('⚠️ Next.js noch nicht eingerichtet (normal vor Setup)'));
}

// Ergebnis
console.log(chalk.yellow('\n📊 Ergebnis:\n'));

if (allGood) {
  console.log(chalk.green.bold('🎉 Alle Checks bestanden! Projekt-Struktur ist in Ordnung.\n'));
  process.exit(0);
} else {
  console.log(chalk.red.bold('❌ Einige Checks fehlgeschlagen. Bitte beheben und erneut prüfen.\n'));
  console.log(chalk.gray('Tipp: Führe "npm run setup" aus, falls noch nicht geschehen.'));
  process.exit(1);
} 