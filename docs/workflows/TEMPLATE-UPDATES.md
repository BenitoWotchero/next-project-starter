# 🔄 Template Update Guide

> **Systematische Updates von Template-Änderungen in bestehende Projekte**

## ⚠️ Wichtige Unterscheidung

### **🏗️ Template Repository vs. 🚀 Projekt Repositories**

**Dieses Update-System ist für PROJEKTE gedacht, die auf dem Template basieren:**

```
next-project-starter/          ← 🏗️ TEMPLATE (Master)
├── Dokumentations-Template
├── AI-Workflows 
├── Standard-Projektstruktur
└── Wird von uns weiterentwickelt

echte-projekte/               ← 🚀 PROJEKTE (basierend auf Template)  
├── customer-dashboard/       ← Nutzt Template als Basis
├── saas-platform/           ← Hat eigene Business-Logic
├── mobile-backend/          ← Will selektiv Template-Updates
└── ecommerce-frontend/      ← Eigene Anpassungen + Template-Updates
```

**💡 Dieses Update-System ermöglicht:**
- Template entwickelt sich weiter → Projekte können Updates selektiv übernehmen
- Lokale Projekt-Anpassungen bleiben erhalten
- Nur gewünschte Template-Verbesserungen werden integriert

## 🎯 Update-Überblick

### **Wann Template-Updates anwenden?**
- ✅ **Template wurde weiterentwickelt** mit neuen Features/Fixes
- ✅ **Sicherheitsupdates** sind verfügbar
- ✅ **Neue AI-Workflows** wurden hinzugefügt
- ✅ **Verbesserte Dokumentationsstruktur** ist verfügbar

### **Was wird erreicht?**
- 🎯 **Aktuelle Template-Features** → Projekt bleibt auf neuestem Stand
- 🔒 **Selektive Updates** → Nur gewünschte Änderungen übernehmen
- 🛡️ **Keine lokalen Verluste** → Eigene Anpassungen bleiben erhalten
- 📋 **Nachvollziehbare Änderungen** → Vollständiges Update-Protokoll

---

## 📊 Template-Versionierung

### **Semantic Versioning für Template**
```
Major.Minor.Patch (z.B. 2.1.3)

MAJOR: Breaking Changes (z.B. Ordner-Umstrukturierung)
MINOR: Neue Features (z.B. neue Workflows, Docs)
PATCH: Bugfixes, kleine Verbesserungen
```

### **Update-Kategorien**
- 🔴 **CRITICAL** → Sicherheitsupdates (sofort empfohlen)
- 🟡 **RECOMMENDED** → Neue Features, Verbesserungen
- 🟢 **OPTIONAL** → Nice-to-have, experimentelle Features

---

## 🛡️ Update-Sicherheitsstrategie

### **Safety-First Approach**
```bash
# 1. Vollständiges Backup vor Update
git tag backup-vor-update-$(date +%Y%m%d)
git push origin backup-vor-update-$(date +%Y%m%d)

# 2. Separate Branch für Updates
git checkout -b updates/template-v2.1.3
```

### **Conflict-Detection**
- ✅ **Automatische Erkennung** von Konflikten mit lokalen Änderungen
- ✅ **3-Way-Merge Strategie** → Template + Lokale Änderungen + Gemeinsame Basis
- ✅ **Rollback-Plan** bei Problemen

---

## 📋 Update-Workflow

### **🔍 Phase 1: Update-Analyse**
- [ ] **Template-Version prüfen** → Aktuell: [CURRENT] → Verfügbar: [AVAILABLE] ✅/❌
- [ ] **CHANGELOG analysiert** → Updates: [ANZAHL] verfügbar ✅/❌
- [ ] **Konflikt-Scan** → Potentielle Konflikte: [ANZAHL] ✅/❌
- [ ] **Update-Kategorien geprüft** → Critical: [X], Recommended: [Y], Optional: [Z] ✅/❌

### **🎯 Phase 2: Update-Auswahl**
- [ ] **Critical Updates** → Alle ausgewählt (zwingend empfohlen) ✅/❌
- [ ] **Recommended Updates** → Ausgewählt: [LISTE] ✅/❌
- [ ] **Optional Updates** → Ausgewählt: [LISTE] ✅/❌
- [ ] **Konflikte bewertet** → Lösungsstrategie: [BESCHREIBUNG] ✅/❌

### **🔧 Phase 3: Update-Anwendung**
- [ ] **Backup erstellt** → Tag: backup-vor-update-[DATUM] ✅/❌
- [ ] **Update-Branch erstellt** → Branch: updates/template-v[VERSION] ✅/❌
- [ ] **Updates angewendet** → [ANZAHL] erfolgreich ✅/❌
- [ ] **Konflikte gelöst** → [ANZAHL] manual gemerged ✅/❌
- [ ] **Tests ausgeführt** → Build: ✅/❌, Tests: ✅/❌ ✅/❌

### **✅ Phase 4: Validation & Integration**
- [ ] **Funktionalität geprüft** → Alle Features: ✅/❌ ✅/❌
- [ ] **Documentation aktualisiert** → Eigene Docs angepasst: ✅/❌ ✅/❌
- [ ] **Team-Review** → Approved von: [PERSON] ✅/❌
- [ ] **Update merged** → In main-branch integriert ✅/❌

---

## 📝 Update-Kategorien & Beispiele

### **🔴 CRITICAL Updates**
```markdown
- Sicherheitslücken in Dependencies
- Breaking Security Issues
- Kritische Bug-Fixes

→ Automatisch zur Installation empfohlen
```

### **🟡 RECOMMENDED Updates**
```markdown
- Neue AI-Workflows (z.B. bessere Prompts)
- Verbesserte Dokumentationsstruktur
- Performance-Optimierungen
- Neue Best-Practice Guidelines

→ Nutzer entscheidet welche er will
```

### **🟢 OPTIONAL Updates**
```markdown
- Experimentelle Features
- Alternative Workflow-Varianten
- Zusätzliche Templates/Snippets

→ Komplett optional
```

---

## 🔧 Update-Mechanismus

### **Template-Diff Analysis**
```bash
# Script das Template-Änderungen analysiert
./scripts/analyze-template-updates.js --from=v2.1.0 --to=v2.1.3

Output:
├── CRITICAL (1):
│   └── Security fix in .github/workflows/
├── RECOMMENDED (3):
│   ├── New workflow: docs/workflows/HOTFIX.md
│   ├── Improved: AI-WORKFLOWS/CONTEXT-KEEPER.md  
│   └── New: docs/security/INCIDENT-RESPONSE.md
└── OPTIONAL (2):
    ├── Alternative: AI-WORKFLOWS/ALTERNATIVE-PROMPTS.md
    └── Enhancement: Additional code snippets
```

### **Selektive Update-Anwendung**
```bash
# User wählt Updates aus
./scripts/apply-template-updates.js \
  --include=CRITICAL,security-workflow,context-keeper \
  --exclude=alternative-prompts \
  --backup=true
```

### **Conflict-Resolution**
```markdown
Bei Konflikten:
1. **3-Way-Merge** → Template + Lokale Version + Original
2. **Manual Review** → Benutzer entscheidet bei Konflikten
3. **Merge-Strategien:** 
   - ACCEPT_TEMPLATE (Template-Version nehmen)
   - ACCEPT_LOCAL (Lokale Version behalten)  
   - MANUAL_MERGE (Händisch zusammenführen)
```

---

## 📊 Update-Tracking

### **Template-Version in Projekt tracken**
```json
// package.json Erweiterung
{
  "name": "mein-projekt",
  "version": "1.0.0",
  "templateVersion": "2.1.3",
  "templateUpdates": {
    "lastUpdate": "2024-01-15",
    "appliedUpdates": [
      "security-workflow-v2.1.1",
      "context-keeper-v2.1.2",
      "hotfix-workflow-v2.1.3"
    ],
    "skippedUpdates": [
      "alternative-prompts-v2.1.2"
    ]
  }
}
```

### **Update-History Log**
```markdown
# TEMPLATE-UPDATE-HISTORY.md (im Projekt)

## 📋 Template Update History

### 2024-01-15: Template v2.1.0 → v2.1.3
**Applied Updates:**
- ✅ CRITICAL: Security workflow fix
- ✅ RECOMMENDED: Improved CONTEXT-KEEPER.md
- ✅ RECOMMENDED: New HOTFIX workflow

**Skipped Updates:**
- ❌ OPTIONAL: Alternative prompts (nicht benötigt für unser Team)

**Conflicts Resolved:**
- docs/workflows/DEPLOYMENT.md: Manual merge (lokale Anpassungen beibehalten)

**Validation:**
- ✅ Build successful
- ✅ All tests passing
- ✅ Team review completed
```

---

## 🚀 Automatisierung & Tools

### **Update-Check Script**
```bash
# Automatischer Check auf neue Updates
./scripts/check-template-updates.js

Output:
🔍 Checking for template updates...
📦 Current template version: 2.1.0
🆕 Latest template version: 2.1.3
⚠️  3 updates available (1 CRITICAL, 2 RECOMMENDED)

Run: npm run template:update to start update process
```

### **NPM Scripts Integration**
```json
{
  "scripts": {
    "template:check": "node scripts/check-template-updates.js",
    "template:update": "node scripts/apply-template-updates.js",
    "template:diff": "node scripts/diff-template-versions.js"
  }
}
```

---

## 🎯 Vorteile dieser Lösung

### **✅ Für Entwickler**
- **Selective Updates** → Nur nehmen was man braucht
- **Safety First** → Immer Rollback-Option
- **Transparent** → Genau sehen was sich ändert
- **Conflict-Aware** → Lokale Änderungen bleiben sicher

### **✅ Für Template-Maintainer**
- **Versioned Releases** → Strukturierte Entwicklung
- **Impact-Tracking** → Wer nutzt welche Updates
- **Feedback-Loop** → Welche Updates werden oft übersprungen

### **✅ Für Teams**
- **Controlled Updates** → Teams entscheiden gemeinsam
- **Dokumentierte Changes** → Nachvollziehbare Update-History
- **Gradual Adoption** → Nicht alle Updates auf einmal

---

## 🛠️ Implementation Roadmap

### **Phase 1: Grundlagen**
- [ ] Template-Versionierung einführen
- [ ] CHANGELOG-Struktur für Updates
- [ ] package.json Template-Tracking

### **Phase 2: Scripts & Tools**
- [ ] check-template-updates.js
- [ ] apply-template-updates.js  
- [ ] diff-template-versions.js

### **Phase 3: Automatisierung**
- [ ] CI/CD Integration für Update-Checks
- [ ] Notification System für neue Updates
- [ ] Batch-Update Tools für Multiple Projects

### **Phase 4: Advanced Features**
- [ ] Web-UI für Update-Management
- [ ] Rollback-Automatisierung
- [ ] Template-Analytics & Insights 