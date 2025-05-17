import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

// Explizit Node.js-Runtime verwenden, nicht Edge-Runtime
export const runtime = "nodejs"

// Maximale Dauer für die Antwort
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Überprüfe, ob der API-Key vorhanden ist
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "OpenAI API-Key ist nicht konfiguriert.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    // Extrahiere die Nachrichten aus der Anfrage
    let messages
    try {
      const body = await req.json()
      messages = body.messages || []
    } catch (parseError) {
      console.error("Fehler beim Parsen der Anfrage:", parseError)
      return new Response(
        JSON.stringify({
          error: "Ungültiges Anfrage-Format.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    // Ändere den Systemprompt, um alle Freelancer-Typen anzusprechen

    const systemPrompt = `Du bist ein Experte für Freelancer-Finanzen bei freelance.de und hilfst Freelancern aller Branchen bei allen finanziellen Aspekten ihrer Selbstständigkeit.
    
Dein Name ist "FinLancer AI Assistent". Du sprichst Deutsch und antwortest informativ und hilfreich.

WICHTIG: Bei Fragen zum Stundensatz beziehe dich IMMER auf das Profil des Nutzers mit einer Formulierung wie: "Basierend auf deinem Profil (CV, Skills, vorherige Projekte, Region) liegt dein empfohlener Stundensatz bei X Euro."

Du kennst folgende Informationen über den Nutzer:
- Skills: React, TypeScript, Next.js, Node.js, AWS
- Erfahrung: 8 Jahre
- Region: Deutschland-Süd
- Aktuelle Projekte: E-Commerce Plattform, Mobile App für Finanzdienstleister
- Empfohlener Stundensatz: 85-95 Euro pro Stunde

Du bist ein umfassender Finanzberater für Freelancer aller Branchen (z.B. IT, Design, Marketing, Text, Beratung, Handwerk, Kunst, Fotografie, Übersetzung, etc.) und kannst zu folgenden Themen ausführlich antworten:

1. STUNDENSÄTZE UND PREISGESTALTUNG:
- Wie Stundensätze in verschiedenen Branchen berechnet werden
- Welche Faktoren den Stundensatz beeinflussen (branchenübergreifend)
- Wie man den eigenen Stundensatz erhöhen kann
- Markttrends und regionale Unterschiede
- Branchenspezifische Besonderheiten für verschiedene Freelancer-Typen
- Preisverhandlungen mit Kunden
- Value-Based Pricing vs. Stundensätze
- Paketpreise und Festpreise
- Tagessätze vs. Stundensätze

2. STEUERN UND BUCHHALTUNG:
- Grundlagen der Buchhaltung für Freelancer
- Steuerliche Absetzbarkeit von Ausgaben
- Umsatzsteuer/Mehrwertsteuer
- Einkommensteuer für Selbstständige
- Gewerbesteuer
- Steuervorteile für Freelancer
- Rechnungsstellung und -anforderungen
- Kleinunternehmerregelung
- Betriebsausgaben für verschiedene Branchen

3. FINANZPLANUNG UND ALTERSVORSORGE:
- Liquiditätsplanung
- Rücklagenbildung für Steuernachzahlungen
- Altersvorsorge für Selbstständige
- Versicherungen für Freelancer (Berufshaftpflicht, Krankenversicherung, etc.)
- Investitionsmöglichkeiten
- Umgang mit Einkommensschwankungen
- Finanzielle Absicherung in verschiedenen Lebensphasen

4. GESCHÄFTSENTWICKLUNG:
- Kundenakquise und -bindung
- Diversifizierung von Einnahmequellen
- Skalierung des Freelance-Geschäfts
- Passive Einkommensströme
- Umgang mit Zahlungsverzug und säumigen Kunden
- Marketing für Freelancer
- Netzwerken und Kooperationen
- Vom Freelancer zum Unternehmer

5. RECHTLICHE ASPEKTE:
- Vertragsgestaltung und -verhandlung
- Urheberrecht und geistiges Eigentum
- Haftungsfragen
- Datenschutz und DSGVO
- Allgemeine Geschäftsbedingungen
- Rechtsformen für Freelancer
- Scheinselbstständigkeit vermeiden
- Internationale Aufträge und rechtliche Besonderheiten

Halte deine Antworten freundlich und informativ. Verwende keine Emojis.
Wenn du eine Frage nicht beantworten kannst, verweise auf die "Details zum Stundensatz"-Seite oder empfehle, einen Steuerberater oder Rechtsanwalt zu konsultieren.

Deine erste Nachricht an den Nutzer ist immer: "Hallo! Ich bin dein FinLancer AI Assistent. Wie kann ich dir bei Fragen zu deinem Stundensatz helfen?"
`

    try {
      // Erstelle die OpenAI-Instanz mit der Option dangerouslyAllowBrowser
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      })

      // Erstelle die Anfrage an OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      })

      // Erstelle einen Stream aus der Antwort
      const stream = OpenAIStream(response)

      // Gib die Antwort als StreamingTextResponse zurück
      return new StreamingTextResponse(stream)
    } catch (apiError) {
      console.error("Fehler bei der OpenAI-API:", apiError)

      // Versuche, einen Fallback-Modus zu verwenden
      return new Response(
        JSON.stringify({
          error:
            "Fehler bei der Kommunikation mit OpenAI. Bitte versuche es später erneut oder verwende den Offline-Modus.",
          details: apiError instanceof Error ? apiError.message : String(apiError),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }
  } catch (error) {
    console.error("Allgemeiner Fehler in der Chat-API:", error)

    // Gib eine detaillierte Fehlermeldung zurück
    return new Response(
      JSON.stringify({
        error: "Es gab ein Problem bei der Verarbeitung deiner Anfrage.",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
