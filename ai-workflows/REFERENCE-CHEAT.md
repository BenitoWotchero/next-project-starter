# 🔗 Reference Cheat Sheet - Alle wichtigen Links & Commands

> **Schnelle Referenz für KI-Chats und Development**

## 📁 Wichtige Dateien

### 🎯 Master-Referenzen
- **`docs/OVERVIEW.MD`** → Vollständige Projekt-Dokumentation (Template)
- **`docs/CHECKLIST.MD`** → Quality Gates & Checkboxes
- **`docs/STARTER.MD`** → Workflow für Dokumentation
- **`docs/WORKFLOWS.MD`** → Standard-Abläufe (Release, etc.)

### 🤖 KI-Workflows
- **`AI-WORKFLOWS/START-PROMPT.md`** → Cursor Quick-Start
- **`AI-WORKFLOWS/CONTEXT-KEEPER.md`** → Gegen Kontext-Verlust
- **`AI-WORKFLOWS/REFERENCE-CHEAT.md`** → Diese Datei

### 🛠️ Scripts
- **`scripts/setup-project.js`** → Initial Setup
- **`scripts/validate-project.js`** → Struktur-Check
- **`scripts/ai-check.js`** → Dokumentation validieren

## 🚀 NPM Commands

```bash
# Setup & Development
npm run setup      # Initial Projekt-Setup (KI-Interview)
npm run dev        # Next.js Development Server
npm run build      # Production Build
npm run start      # Production Server

# Quality & Validation
npm run validate   # Projekt-Struktur prüfen
npm run ai-check   # Dokumentation & Referenzen prüfen
npm run lint       # Code Linting
npm run type-check # TypeScript Check
npm run test       # Tests ausführen

# Workflows
npm run release    # Release-Workflow ausführen
npm run help       # Alle Commands anzeigen
```

## 📋 Dokumentations-Lifecycle (WICHTIG!)

### ✅ Richtige Evolution:
```markdown
1. AKTUALISIEREN → Bestehende Docs erweitern
2. DEPRECATE → Alte Sections als veraltet markieren  
3. REFACTOR → Bei Breaking Changes umstrukturieren
4. DELETE → Irrelevante Sections entfernen
5. REFERENCE → Alle Änderungen in OVERVIEW.MD verlinken
```

### ❌ Vermeiden:
```markdown
- Neue Files für jede Änderung erstellen
- Alte Docs "für Sicherheit" behalten
- Widersprüchliche Informationen
- Verwaiste Files ohne Referenzen
```

### 🤖 KI-Chat Befehle:
```
"Aktualisiere [FILE] mit [CHANGES]. 
Markiere veraltete Sections als deprecated.
Update alle Referenzen in OVERVIEW.MD"

"Refactore [SECTION] in [FILE]. 
Behalte wichtige Legacy-Infos als Archiv.
Validate mit npm run ai-check"
```

## 🎯 Standard-Workflows Referenz

### Daily Development
```bash
npm run dev          # Start development
npm run validate     # Check structure  
npm run ai-check     # Validate docs
```

### Feature Development
```markdown
1. Update docs/CHECKLIST.MD mit neuen Tasks
2. Dokumentiere in entsprechenden OVERVIEW.MD Sections
3. Code implementieren
4. npm run validate && npm run ai-check
5. Review & Merge
```

### Release Preparation
```bash
npm run release      # Automated release workflow
# Oder manuell nach docs/WORKFLOWS.MD
```

### Bei Problemen
```markdown
1. npm run validate → Struktur-Probleme?
2. npm run ai-check → Dokumentation-Issues?
3. @AI-WORKFLOWS/CONTEXT-KEEPER.md → KI-Reset
```

## 🔍 Quick Debugging

### File nicht gefunden?
```bash
npm run validate     # Zeigt fehlende Files
```

### Broken References?
```bash
npm run ai-check     # Findet kaputte Links
```

### KI verwirrt?
```markdown
@AI-WORKFLOWS/CONTEXT-KEEPER.md 
→ EMERGENCY-RESET verwenden
```

### Projekt unorganisiert?
```markdown
1. docs/OVERVIEW.MD öffnen
2. Alle nicht-verlinkten Files finden
3. AKTUALISIEREN oder LÖSCHEN
4. Referenzen reparieren
```

## 💡 KI-Chat Best Practices

### ✅ Immer erwähnen:
- "Prüfe erst docs/OVERVIEW.MD"  
- "Update Referenzen nach Änderungen"
- "Nutze Checkboxes für Tasks"
- "Markiere deprecated Sections"

### ✅ Für neue Features:
- "Erweitere bestehende Docs statt neue zu erstellen"
- "Verlinke in OVERVIEW.MD"
- "Füge Checkboxes in CHECKLIST.MD hinzu"

### ✅ Bei Änderungen:
- "Aktualisiere [FILE], lösche nicht"
- "Markiere alte Infos als deprecated"
- "Validate mit npm run ai-check"

---

**💾 Save this file! Es ist deine wichtigste Referenz für produktives Arbeiten.** 