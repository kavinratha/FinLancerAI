# FinLancer AI

Ein KI-gestützter Smart Rate Advisor für Freelancer, der optimale Stundensätze berechnet, professionelle Angebote generiert und Verhandlungstraining bietet.

## Überblick

FinLancer AI ist eine Next.js-Anwendung, die Freelancern dabei hilft, ihre Einkommenssituation zu optimieren. Das Tool kombiniert Marktdatenanalyse mit KI-gestützten Empfehlungen und bietet eine vollständige Suite für die Geschäftsabwicklung.

**Prototyp-Status:** Dieses Projekt ist ein funktionsfähiger Prototyp. Einige Features sind als Mockups implementiert (z.B. Marktdatenanalyse, historische Trends), während andere vollständig produktiv funktionieren, sobald ein OpenAI API-Schlüssel konfiguriert ist (KI-Chat, Angebotsgenerierung, Verhandlungssimulator).

**Entwickelt als Projekt für ein Masterseminar an der Universität St. Gallen, Institut für Wirtschaftsinformatik.**

## Features

### 🎯 Smart Rate Advisor
- Intelligente Stundensatzberechnung basierend auf Skills, Erfahrung und Marktdaten
- Confidence-Indikatoren für Empfehlungsqualität
- Detaillierte Erklärungen der Berechnungsfaktoren
- Vergleichsanalysen mit Marktstandards

### 💬 KI-Chat Assistant
- Personalisierte Beratung zu Preisgestaltung und Geschäftsstrategie
- Kontextbezogene Antworten basierend auf Nutzerprofil
- Streaming-Antworten für reaktionsschnelle Kommunikation
- Fallback-Mechanismen für Offline-Betrieb

### 📄 Angebots- und Rechnungsgenerator
- Automatische Erstellung professioneller Angebote
- Rechtskonforme Rechnungsgenerierung mit Kleinunternehmerregelung
- Anpassbare Templates für verschiedene Branchen
- Mehrwertsteuer-Berechnungen und Compliance-Features

### 🤝 Verhandlungssimulator
- Interaktives Training für Preisverhandlungen
- KI-gestützte Gesprächspartner mit verschiedenen Persönlichkeiten
- Argumentationshilfen und Strategieempfehlungen
- Feedback und Verbesserungsvorschläge

### 📊 Dashboard & Analytics
- Übersicht über Stundensatzentwicklung
- Erfolgsmetriken und Trends
- Personalisierte Tipps zur Einkommenssteigerung
- Historische Datenauswertung

### 💡 Argumentationshilfen
- Automatische Generierung von Begründungen für Stundensatzerhöhungen
- Branchenspezifische Argumentationsstrategien
- Personalisierte Empfehlungen basierend auf Nutzerprofil

## Technische Architektur

### Frontend
- **Framework**: Next.js 14 mit App Router
- **Styling**: Tailwind CSS mit shadcn/ui Komponenten
- **State Management**: React Hooks und SWR für Datenmanagement
- **UI Components**: Responsive Design mit Accessibility-Features

### Backend
- **API Routes**: Next.js serverless functions
- **KI-Integration**: OpenAI API für Chat und Textgenerierung
- **Datenverarbeitung**: Server-side Berechnungen und Validierung
- **Streaming**: Real-time Antworten für verbesserte User Experience

### Datenstrukturen
- Nutzerprofildaten (Skills, Erfahrung, Standort)
- Projektdaten und Marktanalysen
- Chat-Verläufe und Empfehlungshistorie
- Angebots- und Rechnungsdaten

## Installation

\`\`\`bash
# Repository klonen
git clone [repository-url]
cd finlancer-ai

# Dependencies installieren
npm install

# Umgebungsvariablen konfigurieren
cp .env.example .env.local
# OPENAI_API_KEY in .env.local eintragen

# Entwicklungsserver starten
npm run dev
\`\`\`

## Umgebungsvariablen

\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

## Projektstruktur

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # Backend API Routes
│   │   ├── rate/          # Stundensatzberechnung
│   │   ├── direct-chat/   # KI-Chat
│   │   ├── negotiation/   # Verhandlungssimulation
│   │   └── chat/          # Allgemeine Chat-Funktionen
│   ├── dashboard/         # Dashboard Seiten
│   ├── negotiation/       # Verhandlungsseiten
│   ├── help/              # Hilfe und Support
│   └── globals.css        # Globale Styles
├── components/            # React Komponenten
│   ├── ui/               # shadcn/ui Basis-Komponenten
│   ├── ai-chat.tsx       # KI-Chat Komponente
│   ├── offer-generator.tsx # Angebots-/Rechnungsgenerator
│   ├── negotiation-simulator.tsx # Verhandlungssimulator
│   └── rate-card.tsx     # Stundensatz-Anzeige
├── hooks/                # Custom React Hooks
├── lib/                  # Utility Funktionen
└── types/                # TypeScript Definitionen
\`\`\`

## API Endpunkte

- `/api/rate` - Stundensatzberechnung und -analyse
- `/api/direct-chat` - KI-Chat Funktionalität mit Streaming
- `/api/negotiation` - Verhandlungssimulation
- `/api/negotiation-tips` - Verhandlungsstrategien und Tipps
- `/api/chat` - Allgemeine Chat-Funktionen

## Deployment

Das Projekt ist für Vercel optimiert und kann direkt deployed werden:

\`\`\`bash
npm run build
npm run start
\`\`\`

## Entwicklungshistorie

Das Projekt wurde iterativ entwickelt:
- **Version 1**: Grundlegende Stundensatzberechnung
- **Version 33**: KI-Integration und erweiterte Features
- **Version 77**: Vollständige Freelancer-Suite mit Verhandlungstraining

## Lizenz

Akademisches Projekt - Universität St. Gallen, Institut für Wirtschaftsinformatik
