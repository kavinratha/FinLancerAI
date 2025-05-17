import { NextResponse } from "next/server"

// Explizit Node.js-Runtime verwenden
export const runtime = "nodejs"

// Maximale Dauer für die Antwort
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Überprüfe, ob der API-Key vorhanden ist
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "OpenAI API-Key ist nicht konfiguriert.",
        },
        { status: 500 },
      )
    }

    // Extrahiere die Nachrichten aus der Anfrage
    let messages
    try {
      const body = await req.json()
      messages = body.messages || []
    } catch (parseError) {
      console.error("Fehler beim Parsen der Anfrage:", parseError)
      return NextResponse.json(
        {
          error: "Ungültiges Anfrage-Format.",
        },
        { status: 400 },
      )
    }

    // Füge einen System-Prompt hinzu
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

    // Bereite die Anfrage an OpenAI vor
    const payload = {
      model: "gpt-4-turbo",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    }

    try {
      // Direkter Aufruf der OpenAI API mit fetch
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      // Überprüfe den Status-Code
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return NextResponse.json(
          {
            error: `OpenAI API-Fehler: ${response.status} ${response.statusText}`,
            details: errorData,
          },
          { status: response.status },
        )
      }

      // Gib den Stream direkt zurück
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    } catch (fetchError) {
      console.error("Fehler beim Fetch-Aufruf:", fetchError)
      return NextResponse.json(
        {
          error: "Fehler bei der Kommunikation mit OpenAI API",
          details: fetchError instanceof Error ? fetchError.message : String(fetchError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Allgemeiner Fehler:", error)
    return NextResponse.json(
      {
        error: "Unerwarteter Fehler",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
