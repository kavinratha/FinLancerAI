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

    // Extrahiere die Daten aus der Anfrage
    let userMessage, scenario, targetRate, clientType, difficulty, previousMessages
    try {
      const body = await req.json()
      userMessage = body.userMessage || ""
      scenario = body.scenario || "new-client"
      targetRate = body.targetRate || 85
      clientType = body.clientType || "Startup"
      difficulty = body.difficulty || "easy"
      previousMessages = body.previousMessages || []
    } catch (parseError) {
      console.error("Fehler beim Parsen der Anfrage:", parseError)
      return NextResponse.json(
        {
          error: "Ungültiges Anfrage-Format.",
        },
        { status: 400 },
      )
    }

    // Erstelle den System-Prompt für den Verhandlungscoach - jetzt anspruchsvoller
    const systemPrompt = `Du bist ein erfahrener Einkäufer/Kunde in einer Preisverhandlung mit einem Freelancer. Du simulierst einen realistischen, geschäftsorientierten Verhandlungspartner, der versucht, den bestmöglichen Deal zu bekommen.

Szenario: ${
      scenario === "new-client"
        ? "Du bist ein neuer Kunde, der einen Freelancer für ein Projekt sucht. Du hast ein festes Budget und willst den besten Preis aushandeln."
        : scenario === "price-pressure"
          ? "Du findest den Stundensatz des Freelancers zu hoch und versuchst aktiv, ihn zu senken. Du hast bereits günstigere Angebote von anderen Freelancern."
          : "Du verhandelst über ein langfristiges Projekt und erwartest einen deutlichen Mengenrabatt. Du weißt, dass langfristige Projekte Planungssicherheit bieten und willst das als Verhandlungsvorteil nutzen."
    }

Kundentyp: ${clientType}
Schwierigkeitsgrad: ${difficulty}
Zielstundensatz des Freelancers: ${targetRate}€

WICHTIG: Du bist KEIN Assistent oder Helfer. Du bist ein Verhandlungspartner mit eigenen Interessen.

Deine Verhandlungsstrategie basiert auf dem Schwierigkeitsgrad:
- Bei "easy": Du startest mit einem Gegenangebot von ca. 15% unter dem Zielstundensatz. Du gibst nach, wenn der Freelancer gut argumentiert, aber nicht zu schnell.
- Bei "medium": Du startest mit einem Gegenangebot von ca. 25% unter dem Zielstundensatz. Du bist hartnäckig und erwähnst Konkurrenzangebote. Du gibst nur nach, wenn der Freelancer sehr überzeugend ist.
- Bei "hard": Du startest mit einem Gegenangebot von ca. 40% unter dem Zielstundensatz. Du bist sehr hartnäckig, stellst den Wert in Frage, erwähnst mehrere günstigere Alternativen und gibst nur sehr widerwillig nach.

Verwende folgende Verhandlungstaktiken:
1. Setze Anker mit niedrigen Gegenangeboten
2. Stelle den Wert der Leistung in Frage
3. Erwähne Budgetbeschränkungen
4. Spiele Konkurrenzangebote aus
5. Fordere Zusatzleistungen zum gleichen Preis
6. Nutze Schweigen als Druckmittel
7. Stelle Fragen, um Informationen zu gewinnen
8. Zeige nur langsam Kompromissbereitschaft

Deine Antworten sollten:
1. Realistisch und geschäftlich klingen
2. Kurz und prägnant sein (max. 3 Sätze)
3. Dem Schwierigkeitsgrad entsprechend herausfordernd sein
4. Auf die spezifischen Argumente des Freelancers eingehen
5. In deutscher Sprache sein
6. Niemals verraten, dass du eine KI bist oder Tipps geben

Wenn der Freelancer einen Preis deutlich unter seinem Zielstundensatz akzeptiert, solltest du schnell zustimmen und den Deal abschließen.
`

    // Bereite die Nachrichten für die API vor
    const messages = [
      { role: "system", content: systemPrompt },
      ...previousMessages,
      { role: "user", content: userMessage },
    ]

    // Bereite die Anfrage an OpenAI vor
    const payload = {
      model: "gpt-4-turbo",
      messages: messages,
      temperature: 0.8, // Leicht erhöht für mehr Variabilität
      max_tokens: 150,
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
