# 🚀 Release Workflow

> **Systematischer Release-Prozess für Next.js Projekte mit Git-Tags & KI-Optimierung**

## 🎯 Workflow-Überblick

### **Wann verwenden?**
- ✅ Feature-Release (neue Funktionalität)
- ✅ Bugfix-Release (kritische Probleme behoben)
- ✅ Documentation-Update (größere Docs-Änderungen)
- ✅ Dependency-Updates (Major-Updates)

### **KI-Chat Integration**
```bash
# Workflow starten
"Führe @RELEASE.md durch für Version X.Y.Z"

# Einzelne Schritte
"Führe Pre-Release Checklist aus @RELEASE.md durch"
"Aktualisiere CHANGELOG nach @RELEASE.md"
"Erstelle Release-Tag nach @RELEASE.md"
```

---

## 📋 Pre-Release Checklist

### **Code-Qualität sicherstellen**
```bash
# 1. Alle Tests müssen laufen
npm run test
npm run test:e2e

# 2. Build erfolgreich
npm run build

# 3. Code-Qualität checken
npm run lint
npm run type-check

# 4. Vollständige Validierung
npm run validate
```

### **Funktionalität testen**
- [ ] **Hauptfeatures** → Manuelle Tests durchgeführt
- [ ] **API-Endpoints** → Alle Routen funktional
- [ ] **Responsive Design** → Mobile & Desktop getestet
- [ ] **Performance** → Lighthouse-Score akzeptabel
- [ ] **Cross-Browser** → Chrome, Firefox, Safari getestet

### **Dokumentation überprüfen**
- [ ] **README.md** → Neue Features dokumentiert
- [ ] **TODO.md** → Erledigte Tasks abgehakt
- [ ] **docs/** → Architektur-Änderungen dokumentiert
- [ ] **docs/OVERVIEW.MD** → Master-Links aktualisiert

---

## 📝 Documentation Update

### **1. CHANGELOG.md erweitern**
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- 🎯 **Feature Name** → Beschreibung der neuen Funktionalität
- 🔧 **Tool Integration** → Neue Tools oder Abhängigkeiten
- 📚 **Documentation** → Neue Guides oder Anleitungen

### Changed
- 🎨 **UI Improvements** → Interface-Verbesserungen
- ⚡ **Performance** → Optimierungen und Verbesserungen
- 🔄 **Workflow Updates** → Prozess-Verbesserungen

### Fixed
- 🐛 **Bug Description** → Behobene Probleme
- 🔒 **Security Issues** → Sicherheitslücken geschlossen
- 📱 **Mobile Issues** → Mobile-spezifische Fixes

### Security
- 🛡️ **Security Enhancement** → Sicherheitsverbesserungen

### Technical Details
**Warum diese Änderungen?**
- [Business/Technical Rationale]
- [Alternativen evaluiert]
- [Architektur-Entscheidungen]

**Breaking Changes:**
- [Falls vorhanden, klar dokumentieren]

**Migration Guide:**
- [Schritt-für-Schritt Anleitung bei Breaking Changes]
```

### **2. package.json Version erhöhen**
```json
{
  "name": "project-name",
  "version": "X.Y.Z",
  "description": "..."
}
```

### **3. Relevante Docs für nächsten Chat aktualisieren**
```markdown
# TODO.md → Erledigte Tasks abhaken & Prioritäten setzen
- [x] Feature X implementiert
- [x] Bug Y behoben
- [x] Documentation Z erweitert

### 🔥 **NÄCHSTER FOKUS: [NEW_PRIORITY]**
**Warum diese Priorität?** [BEGRÜNDUNG_POST_RELEASE]

# docs/OVERVIEW.MD → Master-Übersicht aktualisieren
- Neue Features in entsprechende Sections verlinken
- Status-Updates in Quality Gates
- Architektur-Änderungen dokumentieren

# docs/architecture/OVERVIEW.md → Bei größeren Änderungen
- Neue Komponenten/Services dokumentieren
- Datenfluss-Diagramme aktualisieren
- Performance-Implikationen notieren

# docs/development/GUIDELINES.md → Bei Code-Standards-Änderungen
- Neue Best Practices hinzufügen
- Tool-Updates dokumentieren
- Workflow-Verbesserungen integrieren

# Weitere relevante Docs → Je nach Feature-Kontext
- docs/security/GUIDELINES.md → Bei Security-Features
- docs/workflows/[SPEZIFISCH].md → Bei Workflow-Änderungen
- Oder andere mit dem Feature im Zusammenhang stehende Dokumentation
```

---

## 🏷️ Git Tag & Release

### **Semantic Versioning**
- **MAJOR** (X.0.0) → Breaking Changes
- **MINOR** (0.X.0) → Neue Features (backwards compatible)
- **PATCH** (0.0.X) → Bug Fixes

### **Release erstellen**
```bash
# 1. Alle Änderungen committen
git add .
git commit -m "chore: release vX.Y.Z

- Update CHANGELOG.md
- Update package.json version
- Update TODO.md priorities
- Documentation updates"

# 2. Git Tag erstellen
git tag vX.Y.Z

# Optional: Tag mit detaillierter Nachricht
git tag -a vX.Y.Z -m "Release vX.Y.Z - [Beschreibung]

Features:
- Feature 1: Details
- Feature 2: Details

Fixes:
- Bug 1: Details
- Bug 2: Details

Technical:
- Performance improvements
- Security enhancements"

# 3. Pushen
git push origin main
git push origin vX.Y.Z
```

### **Warum separate Tag-Push?**
- ✅ **Kontrolle** → Entscheiden welche Tags öffentlich werden
- ✅ **GitHub Releases** → Tags triggern automatische Release-Notes
- ✅ **Rollback-Sicherheit** → Tags bleiben bei Force-Push bestehen
- ✅ **Staging** → Lokale Tags für Testing

---

## 🔄 Post-Release Tasks

### **1. GitHub Release erstellen**
- [ ] GitHub Release-Notes überprüfen/anpassen
- [ ] Release-Assets hochladen (falls nötig)
- [ ] Release als "Latest" markieren

### **2. Team-Kommunikation**
```markdown
# Release-Announcement Template
🚀 **Release vX.Y.Z ist live!**

**Neue Features:**
- [Feature 1] → [Nutzen für User/Team]
- [Feature 2] → [Nutzen für User/Team]

**Wichtige Fixes:**
- [Fix 1] → [Problem gelöst]
- [Fix 2] → [Problem gelöst]

**Breaking Changes:**
- [Falls vorhanden] → [Migration-Steps]

**Nächste Schritte:**
- [Priority 1 für nächsten Sprint]
- [Priority 2 für nächsten Sprint]
```

### **3. Monitoring & Feedback**
- [ ] **Error-Tracking** → Sentry/Logs auf neue Fehler überwachen
- [ ] **Performance** → Web Vitals nach Release checken
- [ ] **User-Feedback** → Support-Kanäle überwachen
- [ ] **Analytics** → Usage-Patterns analysieren

### **4. Continuation Prompt für nächsten Chat generieren**

**🎯 ZIEL:** Nächster KI-Chat kann SOFORT produktiv starten mit vollständigem Kontext.

#### **Schritt 1: TODO.md für AI-Continuity updaten**
```markdown
# Update TODO.md → Post-Release Section
## 🚀 POST-RELEASE vX.Y.Z - NÄCHSTE SCHRITTE

**Was ist neu verfügbar:**
- [Feature X kann jetzt für Y genutzt werden]
- [System Z ist bereit für nächste Ausbaustufe]

**Top 3 Prioritäten:**
1. **[PRIO 1]** → [Zeitschätzung] → [KI-Chat-Command]
2. **[PRIO 2]** → [Zeitschätzung] → [KI-Chat-Command]  
3. **[PRIO 3]** → [Zeitschätzung] → [KI-Chat-Command]
```

#### **Schritt 2: Continuation Prompt im Chat ausgeben**

**🤖 WICHTIG:** Am Ende des Release-Workflows MUSS dieser Prompt **IM CHAT AUSGEGEBEN** werden (NICHT als Datei speichern!):

```markdown
# 🚀 CONTINUATION PROMPT für nächsten Chat:

## 📋 Release vX.Y.Z Status
✅ **ERFOLGREICH RELEASED:** [Datum/Zeit]

**Was wurde implementiert:**
- ✅ [Feature 1] → [Kurze Beschreibung]
- ✅ [Feature 2] → [Kurze Beschreibung]
- ✅ [Bugfix 1] → [Problem gelöst]

**Neue Möglichkeiten durch Release:**
- 🎯 [Feature X] ermöglicht jetzt [neue Funktionalität]
- 🔧 [System Y] ist bereit für [nächste Ausbaustufe]
- 📈 [Performance Z] verbessert für [bessere User Experience]

---

## 🎯 NÄCHSTE PRIORITÄTEN (nach vX.Y.Z)

### 🔥 **SOFORTIGER FOKUS: [MAIN_PRIORITY]**
**Warum jetzt?** [Begründung basierend auf Release-Stand]

### 📋 **Top 3 Tasks:**
1. **[TASK_1]** → [Zeitschätzung] 
   - **Files:** `@TODO.md`, `@docs/[specific].md`
   - **Command:** "[Konkreter KI-Chat-Befehl]"

2. **[TASK_2]** → [Zeitschätzung]
   - **Files:** `@[relevant_files]`
   - **Command:** "[Konkreter KI-Chat-Befehl]"

3. **[TASK_3]** → [Zeitschätzung]
   - **Files:** `@[relevant_files]`
   - **Command:** "[Konkreter KI-Chat-Befehl]"

---

## 🤖 QUICK-START für nächsten Chat:

### **Empfohlener Chat-Start:**
```
"Projekt-Status: Release vX.Y.Z erfolgreich.
Lies @TODO.md für aktuelle Prioritäten.
Starte mit [SPECIFIC_TASK_1] aus der Post-Release-Liste.
Verwende @[RELEVANT_DOCS] als Referenz."
```

### **Alternative Chat-Starts:**
```
"Implementiere [TASK_1] basierend auf Release vX.Y.Z Status"
"Arbeite an [FEATURE_NAME] aus @TODO.md Post-Release Prioritäten"
"Review und optimiere [COMPONENT] nach Release vX.Y.Z"
```

---

## 📁 RELEVANTE FILES für nächsten Chat:
- **📋 Tasks:** `@TODO.md` → Post-Release Section
- **🏗️ Architektur:** `@docs/architecture/OVERVIEW.md`
- **🔧 Guidelines:** `@docs/development/GUIDELINES.md`
- **🔒 Security:** `@docs/security/GUIDELINES.md`
- **📝 Changes:** `@CHANGELOG.md` → Latest Release

---

**⚡ BEREIT FÜR PRODUKTIVE ENTWICKLUNG!**
*Nächster Chat kann sofort mit konkretem Task starten.*
```

#### **Schritt 3: Prompt-Template anpassen**

**Für verschiedene Release-Typen:**

**🌟 Feature Release:**
```markdown
"Projekt nach Feature-Release vX.Y.Z bereit für [NEXT_FEATURE].
Lies @TODO.md für neue Prioritäten.
Starte mit [SPECIFIC_NEXT_FEATURE] Implementation."
```

**🐛 Bugfix Release:**
```markdown
"Bugfix-Release vX.Y.Z deployed, System stabil.
Fokus zurück auf Feature-Development.
Nächster Task: [MAIN_FEATURE] aus @TODO.md."
```

**💥 Major Release:**
```markdown
"Major Release vX.Y.Z live! Breaking Changes deployed.
Monitoring läuft, System stable.
Nächste Phase: [NEXT_MAJOR_FEATURE] aus @TODO.md."
```

---

## 🆘 Rollback-Prozedur

### **Bei kritischen Problemen nach Release:**

```bash
# 1. Tag löschen (lokal)
git tag -d vX.Y.Z

# 2. Tag löschen (remote) 
git push origin :refs/tags/vX.Y.Z

# 3. Commit rückgängig (falls nötig)
git reset --hard HEAD~1
git push --force origin main

# 4. GitHub Release löschen
# → GitHub UI: Delete Release

# 5. Hotfix vorbereiten
git checkout -b hotfix/critical-fix
# Fix implementieren...
# Neuen Patch-Release machen (vX.Y.Z+1)
```

### **Emergency Hotfix Workflow:**
```bash
# 1. Hotfix-Branch
git checkout -b hotfix/v1.2.4

# 2. Fix implementieren & testen
npm run test
npm run build

# 3. Schnell-Release
git commit -m "hotfix: critical issue XYZ"
git tag v1.2.4
git push origin hotfix/v1.2.4
git push origin v1.2.4

# 4. Merge zurück zu main
git checkout main
git merge hotfix/v1.2.4
git push origin main
```

---

## 🎯 Release-Typen

### **🌟 Feature Release (Minor)**
```bash
# Beispiel: v1.2.0 → v1.3.0
- Neue Funktionalität
- Backwards compatible
- Umfangreichere Tests
- Marketing-Material updaten
```

### **🐛 Bugfix Release (Patch)**
```bash
# Beispiel: v1.2.0 → v1.2.1
- Kritische Bugs behoben
- Schneller Release-Prozess
- Focused Testing
- Minimal Documentation
```

### **💥 Breaking Release (Major)**
```bash
# Beispiel: v1.2.0 → v2.0.0
- Breaking Changes
- Migration-Guide erstellen
- Extended Testing
- User-Communication Plan
- Backward-Compatibility-Period
```

---

## ✅ Success Metrics

### **Release-Qualität messen:**
- 🚀 **Time to Release** → Setup bis Live unter 30 Minuten
- 🐛 **Post-Release Bugs** → Weniger als 2 kritische Issues/Release
- 📈 **Performance Impact** → Keine Verschlechterung der Core Web Vitals
- 👥 **Team Velocity** → Release blockiert kein parallel Development

### **KI-Chat Efficiency:**
- 🤖 **Workflow-Compliance** → Alle Schritte via @RELEASE.md durchführbar
- 📋 **Documentation-Sync** → TODO.md & CHANGELOG.md immer aktuell
- 🔄 **Continuity** → Nächster Chat kann sofort produktiv starten

---

**📅 Letzte Aktualisierung:** [LAST_UPDATE_DATE]  
**📊 Template Version:** 1.0  
**🎯 Optimiert für:** Next.js 15, Git Tags, KI-Chat Integration

### Quick Commands für AI-Chat
```bash
# Kompletter Release-Workflow
"Führe Release vX.Y.Z durch nach @RELEASE.md"

# Einzelne Schritte
"Checke Pre-Release Checklist aus @RELEASE.md"
"Erstelle CHANGELOG-Entry nach @RELEASE.md"
"Setze Git-Tag nach @RELEASE.md"
"Führe Post-Release Tasks aus @RELEASE.md durch"

# 🎯 WICHTIG: Continuation Prompt
"Generiere Continuation Prompt nach @RELEASE.md für nächsten Chat"
"Gib den vollständigen Continuation Prompt aus @RELEASE.md aus"
``` 