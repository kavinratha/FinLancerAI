import { NextResponse } from "next/server"

// Explizit Node.js-Runtime verwenden
export const runtime = "nodejs"

export async function GET() {
  try {
    // Überprüfe, ob der API-Key vorhanden ist
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "API-Key fehlt. Bitte stelle sicher, dass die OPENAI_API_KEY Umgebungsvariable gesetzt ist.",
        },
        { status: 400 },
      )
    }

    // Direkter Aufruf der OpenAI API mit fetch
    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      })

      // Überprüfe den Status-Code
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return NextResponse.json(
          {
            success: false,
            error: `OpenAI API-Fehler: ${response.status} ${response.statusText}`,
            details: errorData,
          },
          { status: response.status },
        )
      }

      // Parse die Antwort
      const data = await response.json()

      // Extrahiere die ersten 5 Modelle
      const models = data.data?.slice(0, 5).map((model) => model.id) || []

      return NextResponse.json({
        success: true,
        message: "API-Key ist gültig und funktioniert korrekt!",
        models,
        apiKeyFirstChars: apiKey.substring(0, 5) + "...", // Zeige die ersten 5 Zeichen des API-Keys
      })
    } catch (fetchError) {
      console.error("Fehler beim Fetch-Aufruf:", fetchError)
      return NextResponse.json(
        {
          success: false,
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
        success: false,
        error: "Unerwarteter Fehler beim Testen des API-Keys",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
