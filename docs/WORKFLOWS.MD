# 📋 Standard-Workflows - Wiederkehrende Abläufe

> **Referenzierbare Workflows für Chat-Prompts und standardisierte Entwicklung**

## 🎯 Verwendung in KI-Chats

**Chat-Prompts:**
```
"Führe @docs/WORKFLOWS.MD → RELEASE_WORKFLOW durch"
"Folge @docs/WORKFLOWS.MD → FEATURE_DEVELOPMENT_WORKFLOW"
"Verwende @docs/WORKFLOWS.MD → DOCUMENTATION_UPDATE_WORKFLOW"
```

---

## 🚀 RELEASE_WORKFLOW

### Überblick
Standardisierter Release-Prozess mit Git Tags, Semantic Versioning und automatischer Dokumentation.

### Semantic Versioning Schema
```
MAJOR.MINOR.PATCH
  |     |     |
  |     |     └── Bugfixes (1.2.3 → 1.2.4)
  |     └────────── Neue Features (1.2.4 → 1.3.0)
  └──────────────── Breaking Changes (1.3.0 → 2.0.0)
```

**Für Next.js Projekte:**
- **0.x.x** → Development Phase
- **1.0.0** → Erste produktive Version
- **1.x.x** → Feature-Updates
- **2.0.0** → Breaking Changes (API, Dependencies)

### Warum Git Tags verwenden?

**Git Tags = Unveränderliche Versionsmarker**
```bash
# Tag erstellen
git tag v1.2.3

# Tag mit ausführlicher Nachricht
git tag -a v1.2.3 -m "Version 1.2.3 - Feature Description

- Feature 1: Details
- Feature 2: Details
- Bugfixes: Details"

# Alle Tags anzeigen
git tag --list
```

**Warum separat pushen?**
```bash
git push origin main     # Pusht nur Commits
git push origin v1.2.3   # Pusht nur den Tag
git push --tags          # Pusht alle Tags
```

**Vorteile:**
1. **Kontrolle** → Entscheiden welche Tags öffentlich werden
2. **GitHub Releases** → Tags triggern automatische Release-Notes
3. **Rollback-Sicherheit** → Tags bleiben bei Force-Push bestehen
4. **Staging** → Lokale Tags für Testing, öffentliche für Releases

### Schritt-für-Schritt Workflow

#### 1. Pre-Release Checklist
- [ ] Alle geplanten Features implementiert
- [ ] Tests laufen durch (`npm run test`)
- [ ] Build erfolgreich (`npm run build`)
- [ ] Linting clean (`npm run lint`)

#### 2. Dokumentation aktualisieren
```bash
# CHANGELOG.md erweitern
## [X.Y.Z] - YYYY-MM-DD

### Added
- Neue Features beschreiben

### Changed
- Geänderte Funktionalitäten

### Fixed
- Behobene Bugs

### Technical
- Technische Änderungen
- Warum diese Entscheidungen?
- Alternativen evaluiert?
```

```bash
# package.json Version erhöhen
{
  "version": "X.Y.Z"
}
```

```bash
# docs/OVERVIEW.MD aktualisieren
- Neue Features in entsprechenden Sections verlinken
- Erledigte Checkboxes abhaken
- Neue Priority-Items hinzufügen
```

#### 3. Commit & Tag erstellen
```bash
# Alle Änderungen hinzufügen
git add .

# Commit mit strukturierter Message
git commit -m "feat: kurze Beschreibung

- Detaillierte Änderung 1
- Detaillierte Änderung 2
- Update version to X.Y.Z
- Update documentation"

# Tag erstellen
git tag vX.Y.Z

# Optional: Tag mit ausführlicher Nachricht
git tag -a vX.Y.Z -m "Version X.Y.Z - Beschreibung

- Feature 1: Details
- Feature 2: Details
- Bugfixes: Details"
```

#### 4. Release pushen
```bash
# Code pushen
git push origin main

# Tag pushen (erstellt GitHub Release)
git push origin vX.Y.Z
```

#### 5. Post-Release
- [ ] GitHub Release Notes überprüfen
- [ ] TODO-Listen in docs/OVERVIEW.MD aktualisieren (siehe TODO_UPDATE_WORKFLOW)
- [ ] Continuation-Prompt für nächsten Chat generieren (siehe AI_CONTINUATION_WORKFLOW)
- [ ] Team/Stakeholder benachrichtigen

### Rollback bei Problemen
```bash
# Tag löschen (lokal)
git tag -d vX.Y.Z

# Tag löschen (remote)
git push origin :refs/tags/vX.Y.Z

# Commit rückgängig
git reset --hard HEAD~1
```

---

## 📋 TODO_UPDATE_WORKFLOW

### Überblick
Systematisches Aktualisieren der TODO-Listen vor jedem Release für bessere KI-Continuity.

### Warum TODO-Updates vor Release?
- **KI-Continuity** → Neue Chats können direkt anknüpfen
- **Momentum halten** → Klare nächste Schritte definiert
- **Prioritäten setzen** → Focus auf wichtigste Entwicklungsbereiche

### Workflow-Schritte

#### 1. Erledigte Aufgaben abhaken
```markdown
# In docs/OVERVIEW.MD
- [x] ⭐ Feature X implementiert
- [x] API-Endpunkt Y erstellt
- [ ] ⭐ Feature Z (nächste Priorität)
```

#### 2. Neue Prioritäten basierend auf Release setzen
```markdown
## 🚀 EMPFOHLENE NÄCHSTE SCHRITTE (Post vX.Y.Z)

> **Hinzugefügt nach vX.Y.Z Release** - [Release-Beschreibung]

### 🎯 **SOFORTIGER FOKUS: [Hauptpriorität]**
**Warum [diese Priorität]?** [Begründung basierend auf Release-Stand]

#### **Phase 1: [Kurzziel] (Zeitschätzung)**
1. **[Konkreter Schritt 1]**
2. **[Konkreter Schritt 2]**

#### **Phase 2: [Mittelfristziel] (Zeitschätzung)**
- [Detaillierte Aufgaben]

### 📅 **[ZEITRAUM] ROADMAP**
- [ ] **Tag X:** [Spezifische Aufgabe]
- [ ] **Tag Y:** [Spezifische Aufgabe]

### 🛠️ **TECHNISCHE EMPFEHLUNGEN**
- [Konkrete Tech-Entscheidungen]
- [Tool-Empfehlungen mit Begründung]

### ⚠️ **KRITISCHE ENTSCHEIDUNGEN DIESE WOCHE**
1. [Entscheidung 1]
2. [Entscheidung 2]

→ **[Fokus-Statement für Richtung]**
```

#### 3. Spezifische Arbeitsbereich-TODOs erweitern
```markdown
# Beispiel für Frontend-TODOs
### 🎨 UI/UX TODO-Updates
- [ ] Component X: State-Management optimieren
- [ ] Page Y: Mobile Responsiveness verbessern
- [ ] Feature Z: Accessibility-Compliance sicherstellen

**Nächster Chat-Fokus:** "Arbeite an Component X State-Management"
```

#### 4. KI-Chat Prompts vorbereiten
```markdown
# Für nächsten Chat
**Quick-Start-Prompts:**
- "Implementiere Component X State-Management aus @docs/OVERVIEW.MD"
- "Optimiere Mobile Responsiveness für Page Y"
- "Review und verbessere Accessibility für Feature Z"
```

### Template für TODO-Section Updates
```markdown
## ⚡ NACH RELEASE vX.Y.Z - NÄCHSTE SCHRITTE

### Was ist jetzt anders?
- [Release hat X ermöglicht]
- [Neue Möglichkeiten durch Y]
- [Nächste logische Schritte sind Z]

### Top 3 Prioritäten
1. **[PRIO 1]** → [Warum wichtig] → [Zeitschätzung]
2. **[PRIO 2]** → [Warum wichtig] → [Zeitschätzung]
3. **[PRIO 3]** → [Warum wichtig] → [Zeitschätzung]

### Für nächsten KI-Chat
**Empfohlener Start:** "[Konkreter Arbeitsauftrag mit @file-Referenz]"
```

---

## 🔄 FEATURE_DEVELOPMENT_WORKFLOW

### Überblick
Strukturierter Workflow für Feature-Entwicklung von Konzept bis Release.

### Workflow-Schritte

#### 1. Feature Planning
```markdown
# Feature-Template erstellen
## 🎯 [FEATURE_NAME]

### Problem/Bedarf
- Was löst dieses Feature?
- Für wen ist es gedacht?

### Lösung
- Wie lösen wir das Problem?
- Warum diese Lösung?

### Technische Implementierung
- Welche Komponenten betroffen?
- Neue Dependencies?
- Breaking Changes?

### Acceptance Criteria
- [ ] Kriterium 1
- [ ] Kriterium 2

### Testing Strategy
- Unit Tests für...
- Integration Tests für...
- E2E Tests für...
```

#### 2. Implementation
```bash
# Feature Branch erstellen
git checkout -b feature/feature-name

# Entwicklung in kleinen Commits
git commit -m "feat(component): add basic structure"
git commit -m "feat(component): implement core logic"
git commit -m "test(component): add unit tests"
```

#### 3. Documentation während Development
- [ ] Code-Kommentare hinzufügen
- [ ] README.md aktualisieren (falls nötig)
- [ ] API-Dokumentation erweitern
- [ ] Component-Dokumentation (Storybook)

#### 4. Testing & Review
```bash
# Tests ausführen
npm run test
npm run lint
npm run type-check
npm run build

# Code Review vorbereiten
git push origin feature/feature-name
# Pull Request erstellen
```

#### 5. Merge & Cleanup
```bash
# Nach Merge: Branch löschen
git branch -d feature/feature-name
git push origin --delete feature/feature-name

# Lokale Branches aufräumen
git remote prune origin
```

---

## 📚 DOCUMENTATION_UPDATE_WORKFLOW

### Überblick
Systematisches Aktualisieren der Projektdokumentation.

### Regelmäßige Dokumentations-Reviews

#### Wöchentlich
- [ ] CHANGELOG.md aktuell?
- [ ] README.md reflects current state?
- [ ] TODO-Listen in docs/OVERVIEW.MD abhaken

#### Monatlich
- [ ] docs/OVERVIEW.MD vollständig durchgehen
- [ ] Verwaiste Dokumentations-Files identifizieren
- [ ] Broken Links reparieren (`npm run ai-check`)
- [ ] Veraltete Sections als deprecated markieren

#### Bei jedem Release
- [ ] Alle neuen Features dokumentiert
- [ ] API-Änderungen dokumentiert
- [ ] Breaking Changes prominent markiert
- [ ] Migration-Guides erstellt (bei Breaking Changes)

### Documentation Debt Management
```markdown
## Documentation Debt Log

### Identified Issues
- [ ] Section X needs updating (Reason: Feature Y added)
- [ ] File Z is outdated (Reason: API changed)

### Deprecation Queue
- [ ] Old workflow A → Replace with workflow B
- [ ] Legacy component docs → Update for new patterns

### Content Strategy
- Focus on "Why" not just "What"
- Include decision rationales
- Add troubleshooting sections
- Keep getting-started path clear
```

---

## 🤖 AI_CHAT_CONTINUATION_WORKFLOW

### Überblick
Workflow für nahtlose Weiterarbeit zwischen Chat-Sessions.

### Template für Chat-Übergang
```markdown
Howdie partner! Arbeite an [PROJECT_NAME].

**AKTUELLER STATUS (Version X.Y.Z):**
[Aktuelle Meilensteine aus docs/OVERVIEW.MD]

**LETZTER ARBEITSBEREICH:** [Was zuletzt bearbeitet wurde]

**VERFÜGBARE BEREICHE:**
- 🏗️ Architecture & Setup
- 💻 Development & Features  
- 📚 Documentation
- 🚀 Deployment & DevOps
- 🧪 Testing & QA

**LETZTE ÄNDERUNGEN:**
[Aus CHANGELOG.md neueste Version]

**BEKANNTE ISSUES:**
[Aus docs/OVERVIEW.MD oder GitHub Issues]

Bitte lies @docs/OVERVIEW.MD für vollständigen Kontext.

**WAS SOLL ICH HEUTE BEARBEITEN?**
[Konkrete Optionen basierend auf aktueller Projektphase]
```

### Context-Keeper für lange Chats
```markdown
## 🧠 CONTEXT REFRESH

**Projekt:** [PROJECT_NAME]
**Phase:** [Development/Testing/Production]
**Letzte Änderung:** [Kurze Beschreibung]

**Aktuelle Aufgabe:** 
[Was gerade bearbeitet wird]

**Nächste Schritte:**
1. [Konkreter nächster Schritt]
2. [Danach kommt...]

**Wichtige Entscheidungen heute:**
- [Entscheidung 1 mit Begründung]
- [Entscheidung 2 mit Begründung]
```

---

## 🧪 TESTING_WORKFLOW

### Überblick
Systematisches Testing von der Entwicklung bis zum Release.

### Test-Pyramid für Next.js

#### Unit Tests (Basis)
```bash
# Komponenten-Tests
npm run test:unit

# Was testen?
- Einzelne Funktionen
- React-Komponenten isoliert
- Utility-Functions
- API-Route-Handler
```

#### Integration Tests (Mitte)
```bash
# API-Integration
npm run test:integration

# Was testen?
- API-Endpunkt-Kombinationen
- Datenbank-Interaktionen
- Service-Integrationen
- Komponentengruppen
```

#### E2E Tests (Spitze)
```bash
# User-Journeys
npm run test:e2e

# Was testen?
- Kritische User-Flows
- Happy Path Scenarios
- Error-Handling-Flows
- Cross-Browser-Compatibility
```

### Pre-Commit Testing
```bash
# Automated testing hook
npm run pre-commit
# Führt aus: lint + type-check + unit-tests
```

### Release Testing Checklist
- [ ] All automated tests pass
- [ ] Manual smoke tests completed
- [ ] Performance tests (if applicable)
- [ ] Security tests (if applicable)
- [ ] Browser compatibility tested
- [ ] Mobile responsiveness verified

---

## 🔧 DEPENDENCY_UPDATE_WORKFLOW

### Überblick
Systematisches Updaten von Dependencies ohne Breaking Changes.

### Monthly Dependency Review
```bash
# Check outdated packages
npm outdated

# Security audit
npm audit

# Update strategy
npm run deps:update
```

### Update Categories

#### Patch Updates (Automatisch)
```bash
# Safe updates
npm update
```

#### Minor Updates (Review)
```bash
# Review breaking changes
npm install package@latest
# Test thoroughly
npm run test:all
```

#### Major Updates (Planned)
```bash
# Plan in advance
# Create feature branch
# Update one by one
# Extensive testing
# Documentation updates
```

### Rollback Strategy
```bash
# Package-lock.json backup
cp package-lock.json package-lock.backup.json

# Quick rollback
git checkout HEAD -- package-lock.json
npm ci
```

---

## 🚨 EMERGENCY_HOTFIX_WORKFLOW

### Überblick
Schnelle Fehlerbehebung für produktive Systeme.

### Hotfix-Prozess

#### 1. Hotfix Branch
```bash
# Von main/master Branch
git checkout -b hotfix/critical-bug-fix

# Minimale Änderung
# Nur der Bug-Fix, keine Features!
```

#### 2. Schnelle Tests
```bash
# Nur relevante Tests
npm run test -- --testPathPattern=affected
npm run build
```

#### 3. Express Release
```bash
# Patch-Version erhöhen
# Minimal CHANGELOG
# Schneller Release
```

#### 4. Post-Hotfix
```bash
# Hotfix in development branch mergen
# Ursachen-Analyse
# Präventive Maßnahmen planen
```

---

## 📋 Workflow-Referenz

### Quick Commands
```bash
# Release durchführen
npm run release

# Dokumentation prüfen  
npm run ai-check

# Projekt validieren
npm run validate

# Tests ausführen
npm run test:all
```

### Workflow-Files Struktur
```
docs/
├── WORKFLOWS.MD           # Diese Datei - Alle Workflows
├── OVERVIEW.MD            # Master-Übersicht  
├── CHECKLIST.MD           # Quality Gates
└── workflows/             # Detaillierte Workflow-Docs
    ├── release.md         # Detaillierter Release-Guide
    ├── feature-dev.md     # Feature-Development Details
    ├── documentation.md   # Doc-Management Details
    └── emergency.md       # Notfall-Prozeduren
```

---

**💡 Verwendung:** Referenziere diese Workflows in KI-Chats mit `@docs/WORKFLOWS.MD → [WORKFLOW_NAME]` für standardisierte Abläufe.

**🔄 Updates:** Diese Workflows werden bei jedem Release-Workflow aktualisiert und verbessert.

---

## 📁 Erweiterte Workflows

Für spezielle wiederkehrende Abläufe siehe:
- **[workflows/ADDITIONAL_WORKFLOWS.md](workflows/ADDITIONAL_WORKFLOWS.md)** → 🧹 Cleanup, ⚡ Performance, 🔒 Security, 🎨 Design, 🚀 Client-Handover, 💾 Backup, 📊 Analytics, 🎯 Scope-Management, 🔄 Dependencies, 📱 Mobile-Testing

### Quick-Referenz für Chat-Prompts:
```
"Führe @docs/workflows/ADDITIONAL_WORKFLOWS.md → PROJECT_CLEANUP_WORKFLOW durch"
"Führe @docs/workflows/ADDITIONAL_WORKFLOWS.md → PERFORMANCE_AUDIT_WORKFLOW durch"
"Führe @docs/workflows/ADDITIONAL_WORKFLOWS.md → SECURITY_REVIEW_WORKFLOW durch"
"Führe @docs/workflows/ADDITIONAL_WORKFLOWS.md → CLIENT_HANDOVER_WORKFLOW durch"
``` 