#!/usr/bin/env node

/**
 * 🔍 Template Update Checker
 * 
 * Prüft ob neue Template-Updates verfügbar sind und zeigt diese an.
 * Basis-Implementation für das Template Update System.
 */

const fs = require('fs');
const path = require('path');

// Template-Konfiguration (später aus externer Quelle)
const TEMPLATE_CONFIG = {
  repository: 'https://github.com/your-org/next-project-starter',
  currentVersion: '1.0.1', // Aus package.json lesen
  releasesUrl: 'https://api.github.com/repos/your-org/next-project-starter/releases'
};

/**
 * 📋 Aktuelle Template-Version aus package.json lesen
 */
function getCurrentTemplateVersion() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      return packageJson.templateVersion || null;
    }
  } catch (error) {
    console.error('❌ Fehler beim Lesen der package.json:', error.message);
  }
  return null;
}

/**
 * 🔍 Verfügbare Updates simulieren (später mit echtem API-Call)
 */
function checkAvailableUpdates(currentVersion) {
  // Simulated updates - später echte GitHub API
  const availableUpdates = [
    {
      version: '1.0.1',
      type: 'PATCH',
      category: 'CRITICAL',
      title: 'Security fix in GitHub workflows',
      description: 'Behebt kritische Sicherheitslücke in CI/CD Pipeline',
      files: ['.github/workflows/validate-docs.yml'],
      releaseDate: '2024-01-15'
    },
    {
      version: '1.1.0',
      type: 'MINOR',
      category: 'RECOMMENDED',
      title: 'Neuer HOTFIX-Workflow',
      description: 'Workflow für schnelle Hotfix-Deployments',
      files: ['docs/workflows/HOTFIX.md', 'scripts/hotfix-deploy.sh'],
      releaseDate: '2024-01-20'
    },
    {
      version: '1.1.1',
      type: 'PATCH',
      category: 'RECOMMENDED',
      title: 'Verbesserte AI-Prompts',
      description: 'Optimierte Prompts für bessere AI-Unterstützung',
      files: ['AI-WORKFLOWS/CONTEXT-KEEPER.md', 'AI-WORKFLOWS/START-PROMPT.md'],
      releaseDate: '2024-01-22'
    },
    {
      version: '1.2.0',
      type: 'MINOR',
      category: 'OPTIONAL',
      title: 'Alternative Prompt-Sammlung',
      description: 'Zusätzliche Prompt-Varianten für verschiedene Szenarien',
      files: ['AI-WORKFLOWS/ALTERNATIVE-PROMPTS.md'],
      releaseDate: '2024-01-25'
    }
  ];

  // Filter: Nur Updates die neuer als current version sind
  return availableUpdates.filter(update => 
    compareVersions(update.version, currentVersion || '0.0.0') > 0
  );
}

/**
 * 🔢 Einfacher Versions-Vergleich
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  return 0;
}

/**
 * 🎨 Update-Anzeige formatieren
 */
function displayUpdates(currentVersion, updates) {
  console.log('\n🔍 Template Update Check');
  console.log('=======================');
  
  if (!currentVersion) {
    console.log('⚠️  Keine Template-Version in package.json gefunden');
    console.log('💡 Füge "templateVersion": "1.0.0" zu package.json hinzu\n');
  } else {
    console.log(`📦 Aktuelle Template-Version: ${currentVersion}`);
  }

  if (updates.length === 0) {
    console.log('✅ Keine Updates verfügbar - Template ist aktuell!\n');
    return;
  }

  console.log(`🆕 ${updates.length} Updates verfügbar:\n`);

  // Nach Kategorie gruppieren
  const categories = {
    'CRITICAL': { icon: '🔴', updates: [] },
    'RECOMMENDED': { icon: '🟡', updates: [] },
    'OPTIONAL': { icon: '🟢', updates: [] }
  };

  updates.forEach(update => {
    categories[update.category].updates.push(update);
  });

  // Anzeige nach Kategorien
  Object.entries(categories).forEach(([category, data]) => {
    if (data.updates.length === 0) return;

    console.log(`${data.icon} ${category} (${data.updates.length})`);
    data.updates.forEach(update => {
      console.log(`   └── v${update.version}: ${update.title}`);
      console.log(`       ${update.description}`);
      console.log(`       Dateien: ${update.files.join(', ')}`);
      console.log('');
    });
  });

  // Nächste Schritte
  console.log('🚀 Nächste Schritte:');
  console.log('   1. npm run template:diff     # Details zu den Änderungen');
  console.log('   2. npm run template:update   # Updates auswählen und anwenden');
  console.log('');

  // Warnings für Critical Updates
  const criticalCount = categories.CRITICAL.updates.length;
  if (criticalCount > 0) {
    console.log(`⚠️  ${criticalCount} CRITICAL Update(s) verfügbar!`);
    console.log('   → Sofortige Installation wird empfohlen');
    console.log('');
  }
}

/**
 * 💾 Update-Info für weitere Scripts speichern
 */
function saveUpdateInfo(updates) {
  const updateInfo = {
    checkDate: new Date().toISOString(),
    availableUpdates: updates,
    summary: {
      total: updates.length,
      critical: updates.filter(u => u.category === 'CRITICAL').length,
      recommended: updates.filter(u => u.category === 'RECOMMENDED').length,
      optional: updates.filter(u => u.category === 'OPTIONAL').length
    }
  };

  try {
    const tempDir = path.join(process.cwd(), '.temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    fs.writeFileSync(
      path.join(tempDir, 'template-updates.json'),
      JSON.stringify(updateInfo, null, 2)
    );
  } catch (error) {
    console.error('⚠️  Konnte Update-Info nicht speichern:', error.message);
  }
}

/**
 * 🚀 Main Function
 */
function main() {
  console.clear();
  
  const currentVersion = getCurrentTemplateVersion();
  const availableUpdates = checkAvailableUpdates(currentVersion);
  
  displayUpdates(currentVersion, availableUpdates);
  saveUpdateInfo(availableUpdates);
  
  // Exit-Code für CI/CD
  const criticalUpdates = availableUpdates.filter(u => u.category === 'CRITICAL').length;
  process.exit(criticalUpdates > 0 ? 1 : 0);
}

// Script ausführen wenn direkt aufgerufen
if (require.main === module) {
  main();
}

module.exports = {
  getCurrentTemplateVersion,
  checkAvailableUpdates,
  compareVersions
}; 