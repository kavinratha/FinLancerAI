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
    let conversation, scenario, targetRate
    try {
      const body = await req.json()
      conversation = body.conversation || []
      scenario = body.scenario || "new-client"
      targetRate = body.targetRate || 85
    } catch (parseError) {
      console.error("Fehler beim Parsen der Anfrage:", parseError)
      return NextResponse.json(
        {
          error: "Ungültiges Anfrage-Format.",
        },
        { status: 400 },
      )
    }

    // Erstelle den System-Prompt für die Verhandlungstipps
    const systemPrompt = `Du bist ein Experte für Preisverhandlungen und hilfst Freelancern, bessere Verhandlungsergebnisse zu erzielen.

Basierend auf dem aktuellen Verlauf einer Preisverhandlung sollst du 2-3 kurze, präzise Tipps geben, was der Freelancer als nächstes sagen oder tun sollte, um seine Verhandlungsposition zu stärken.

Szenario: ${
      scenario === "new-client"
        ? "Verhandlung mit einem neuen Kunden über den Stundensatz"
        : scenario === "price-pressure"
          ? "Ein Kunde versucht, den Stundensatz zu drücken"
          : "Verhandlung über einen Mengenrabatt für ein langfristiges Projekt"
    }

Zielstundensatz des Freelancers: ${targetRate}€

Deine Tipps sollten:
1. Konkret und handlungsorientiert sein
2. Auf die letzte Aussage des Kunden reagieren
3. Psychologische Verhandlungstaktiken berücksichtigen
4. Kurz und prägnant sein (max. 1-2 Sätze pro Tipp)
5. In deutscher Sprache sein

Formatiere deine Antwort als nummerierte Liste mit 2-3 Tipps.
Beginne jeden Tipp mit einem Aktionsverb (z.B. "Betone", "Frage nach", "Verweise auf").
Gib keine allgemeinen Ratschläge, sondern spezifische Vorschläge für die aktuelle Situation.
`

    // Bereite die Nachrichten für die API vor
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Hier ist der aktuelle Verhandlungsverlauf:\n\n${conversation.join("\n")}` },
    ]

    // Bereite die Anfrage an OpenAI vor
    const payload = {
      model: "gpt-4-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 250,
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

      // Verarbeite die Antwort
      const data = await response.json()
      const tips = data.choices[0].message.content

      return NextResponse.json({ tips })
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
