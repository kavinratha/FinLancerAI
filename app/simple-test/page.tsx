"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SimpleApiTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [rawResponse, setRawResponse] = useState<string | null>(null)

  const testApiKey = async () => {
    setIsLoading(true)
    setResult(null)
    setRawResponse(null)

    try {
      // Verwende den einfacheren Endpunkt
      const response = await fetch("/api/simple-test")

      // Speichere die Rohantwort für Debugging-Zwecke
      const text = await response.text()
      setRawResponse(text)

      try {
        // Versuche, die Antwort als JSON zu parsen
        const data = JSON.parse(text)
        setResult(data)
      } catch (parseError) {
        setResult({
          success: false,
          error: "Konnte Antwort nicht als JSON parsen",
          details: parseError instanceof Error ? parseError.message : String(parseError),
        })
      }
    } catch (error) {
      setResult({
        success: false,
        error: "Fehler beim Testen",
        details: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Einfacher OpenAI API-Key Test</CardTitle>
          <CardDescription>
            Überprüfe, ob dein OpenAI API-Key korrekt konfiguriert ist und funktioniert.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result && (
            <div className={`p-4 rounded-md mb-4 ${result.success ? "bg-green-50" : "bg-red-50"}`}>
              <div className="flex items-start">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                )}
                <div>
                  <p className={`font-medium ${result.success ? "text-green-700" : "text-red-700"}`}>
                    {result.success ? "API-Key ist gültig!" : "API-Key Problem"}
                  </p>
                  <p className="text-sm mt-1">{result.success ? result.message : result.error}</p>

                  {result.details && (
                    <p className="text-xs mt-1 text-gray-600">Details: {JSON.stringify(result.details)}</p>
                  )}

                  {result.success && result.apiKeyFirstChars && (
                    <p className="text-xs mt-1 text-gray-600">API-Key beginnt mit: {result.apiKeyFirstChars}</p>
                  )}

                  {result.success && result.models && Array.isArray(result.models) && result.models.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-green-700">Verfügbare Modelle:</p>
                      <ul className="text-xs mt-1 list-disc pl-5">
                        {result.models.map((model, index) => (
                          <li key={index}>{model}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {rawResponse && (
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-700">Rohantwort (für Debugging):</p>
              <pre className="text-xs mt-1 p-2 bg-gray-100 rounded-md overflow-x-auto">{rawResponse}</pre>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={testApiKey} disabled={isLoading} className="w-full freelance-button-cta">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Teste API-Key...
              </>
            ) : (
              "API-Key testen"
            )}
          </Button>
          <Link href="/dashboard" className="text-xs text-center text-gray-500 hover:underline">
            Zurück zum Dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
