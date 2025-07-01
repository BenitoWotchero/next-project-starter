# 🧠 CONTEXT-KEEPER - Gegen Kontext-Verlust

> **Nutze diese Prompts, wenn die KI den Kontext verliert oder verwirrt wird**

## 🔄 Kontext-Reset Prompt

```
KONTEXT-REFRESH:

Ich arbeite an einem Next.js 15+ Projekt. Hier ist die aktuelle Situation:

📁 PROJEKT-STRUKTUR:
- docs/OVERVIEW.MD → Master-Übersicht (prüfe das zuerst!)
- docs/CHECKLIST.MD → Quality Gates
- docs/WORKFLOWS.MD → Standard-Abläufe
- AI-WORKFLOWS/ → KI-Leitfäden

🎯 ARBEITSREGELN:
1. IMMER erst docs/OVERVIEW.MD prüfen
2. NIEMALS überschreiben, nur erweitern
3. ALLE neuen Files in OVERVIEW.MD verlinken
4. Checkboxes für alle Tasks: - [ ] 

📋 AKTUELLER STAND:
[HIER KURZ BESCHREIBEN WO DU GERADE STEHST]

Kannst du mit diesem Kontext weiterhelfen?
```

## 📍 Status-Update Prompt

```
STATUS-CHECK:

Bevor wir weitermachen:
1. Welche Files haben wir heute bearbeitet?
2. Was ist in docs/OVERVIEW.MD noch nicht verlinkt?
3. Welche offenen Checkboxes haben wir in docs/CHECKLIST.MD?

Lass uns den Stand überprüfen und dann strukturiert weitermachen.
```

## 🔗 Referenz-Check Prompt

```
REFERENZ-VALIDATION:

Bitte prüfe:
1. Sind alle neuen Files in docs/OVERVIEW.MD verlinkt?
2. Sind alle Referenzen zwischen den Docs korrekt?
3. Fehlen irgendwo wichtige Querverweise?

Dann können wir sicher weitermachen ohne dass etwas verloren geht.
```

## 🎯 Fokus-Reset Prompt

```
FOKUS-RESET:

Mein Hauptziel: [HIER DEIN AKTUELLES ZIEL EINFÜGEN]

Relevante Dokumentation:
- docs/OVERVIEW.MD (Master-Übersicht)
- [WEITERE RELEVANTE FILES]

Aktuelle Herausforderung:
[HIER DAS KONKRETE PROBLEM BESCHREIBEN]

Lass uns strukturiert und ohne Überschreiben von Bestehendem vorgehen.
```

## ⚡ Emergency-Reset Prompt

```
EMERGENCY-RESET:

Stopp! Lass uns neu anfangen:

1. Öffne und lies docs/OVERVIEW.MD komplett
2. Sage mir, was du dort siehst
3. Dann erkläre ich dir den aktuellen Stand
4. Erst dann machen wir weiter

Das verhindert, dass wir bestehende Arbeit überschreiben.
```

## 🧭 Navigation-Hilfe

### Bei Verwirrung:
→ **Nutze "KONTEXT-REFRESH" Prompt**

### Bei Status-Unsicherheit:  
→ **Nutze "STATUS-CHECK" Prompt**

### Nach längeren Pausen:
→ **Nutze "FOKUS-RESET" Prompt**

### Bei kritischen Fehlern:
→ **Nutze "EMERGENCY-RESET" Prompt**

---

**💡 Tipp**: Kopiere diese Prompts in deine Notizen, dann hast du sie immer griffbereit! 