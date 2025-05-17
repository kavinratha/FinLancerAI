"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Erweitere die Mock-Antworten für den Fallback-Modus, um verschiedene Branchen abzudecken

const mockResponses = {
  tagessatz:
    "Basierend auf deinem Profil (8 Jahre Erfahrung, Region Deutschland-Süd) wird dein Stundensatz auf 85-95 Euro geschätzt. Dieser Satz kann je nach Branche variieren: In der IT liegen die Sätze typischerweise zwischen 70-120€, im Design zwischen 60-100€, im Marketing zwischen 65-110€ und bei Beratungsleistungen zwischen 80-150€ pro Stunde.",
  erhöhen:
    "Um deinen Stundensatz zu erhöhen, könntest du: 1) Deine Spezialisierung vertiefen, 2) Dein Portfolio mit erfolgreichen Projekten ausbauen, 3) Deine Positionierung am Markt schärfen, 4) Mehrwert statt Stunden verkaufen, 5) Referenzen und Testimonials sammeln. Branchenübergreifend gilt: Wer einen klaren Mehrwert bietet, kann höhere Preise durchsetzen.",
  niedrig:
    "Wenn du das Gefühl hast, dass der vorgeschlagene Stundensatz von 85-95 Euro für dein Profil nicht passt, kannst du auf 'Details zum Stundensatz' klicken und dort die Parameter anpassen. Bedenke, dass die Sätze je nach Branche, Spezialisierungsgrad und Region stark variieren können.",
  steuern:
    "Als Freelancer solltest du etwa 25-35% deiner Einnahmen für Steuern zurücklegen. Bei deinem empfohlenen Stundensatz wären das ca. 25-30 Euro pro Stunde. Wichtig ist eine gute Buchhaltung, um alle beruflichen Ausgaben als Betriebsausgaben absetzen zu können. Dies gilt für alle Branchen, wobei die absetzbaren Ausgaben je nach Tätigkeitsfeld variieren.",
  versicherung:
    "Für Freelancer sind folgende Versicherungen besonders wichtig: 1) Berufshaftpflichtversicherung (je nach Branche unterschiedlich ausgestaltet), 2) Krankenversicherung, 3) Berufsunfähigkeitsversicherung und 4) private Altersvorsorge. Bei deinem Stundensatz solltest du etwa 15-20% für Versicherungen und Vorsorge einplanen.",
  rechnungen:
    "Deine Rechnungen müssen folgende Angaben enthalten: Deine vollständigen Kontaktdaten mit Steuernummer, Kundendaten, fortlaufende Rechnungsnummer, Leistungszeitraum, detaillierte Leistungsbeschreibung, Netto-Betrag, Umsatzsteuer (sofern du nicht Kleinunternehmer bist) und Gesamtbetrag. Diese Anforderungen gelten branchenübergreifend für alle Freelancer.",
  marketing:
    "Als Freelancer kannst du dich durch verschiedene Marketing-Strategien positionieren: 1) Eine professionelle Website mit Portfolio, 2) Präsenz auf relevanten Social-Media-Kanälen, 3) Content-Marketing durch Fachbeiträge, 4) Networking auf Branchenevents, 5) Direktakquise bei Wunschkunden. Die genaue Strategie sollte an deine Branche und Zielgruppe angepasst werden.",
  rechtsform:
    "Als Freelancer hast du verschiedene Optionen für deine Rechtsform: Einzelunternehmen (einfachste Form), Freiberufler (bei bestimmten Berufen möglich, steuerliche Vorteile), GbR (bei Zusammenarbeit mit anderen), UG oder GmbH (bei höherem Haftungsrisiko). Die Wahl hängt von deiner Tätigkeit, dem Haftungsrisiko und steuerlichen Überlegungen ab.",
  default:
    "Basierend auf deinem Profil kann ich dir bei Fragen zu deinem empfohlenen Stundensatz von 85-95 Euro und anderen finanziellen Aspekten deiner Freelance-Tätigkeit helfen. Meine Beratung umfasst alle Freelancer-Branchen, von IT über Design bis hin zu Beratung, Marketing oder kreativen Berufen. Wie kann ich dir konkret weiterhelfen?",
}

// Typen für die Nachrichten
type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export function AIChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [useFallback, setUseFallback] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hallo! Ich bin dein FinLancer AI Assistent. Wie kann ich dir bei Fragen zu deinem Stundensatz helfen?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  // Eigene Implementierung des Chat-Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Benutzer-Nachricht hinzufügen
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setInput("")

    try {
      // Erstelle eine ID für die Antwort
      const responseId = (Date.now() + 1).toString()

      // Füge eine leere Nachricht hinzu, die wir später aktualisieren werden
      setMessages((prev) => [
        ...prev,
        {
          id: responseId,
          role: "assistant",
          content: "",
        },
      ])

      // Sende die Anfrage an den Server
      const response = await fetch("/api/direct-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages
            .filter((msg) => msg.role !== "system")
            .concat(userMessage)
            .map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Verarbeite den Stream
      const reader = response.body?.getReader()
      if (!reader) throw new Error("Response body is null")

      let accumulatedContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Konvertiere den Uint8Array zu Text
        const chunk = new TextDecoder().decode(value)

        // Verarbeite die Daten
        const lines = chunk.split("\n").filter((line) => line.trim() !== "")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)

            if (data === "[DONE]") continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content || ""

              if (content) {
                accumulatedContent += content

                // Aktualisiere die Nachricht mit dem neuen Inhalt
                setMessages((prev) =>
                  prev.map((msg) => (msg.id === responseId ? { ...msg, content: accumulatedContent } : msg)),
                )
              }
            } catch (e) {
              console.error("Fehler beim Parsen der Antwort:", e)
            }
          }
        }
      }
    } catch (error) {
      console.error("Fehler beim Chat:", error)
      toast({
        title: "Verbindungsproblem",
        description: "Es gab ein Problem mit dem AI-Service. Wechsle in den Offline-Modus.",
        variant: "destructive",
      })
      setUseFallback(true)

      // Entferne die leere Nachricht
      setMessages((prev) => prev.filter((msg) => msg.content !== ""))

      // Füge eine Fallback-Antwort hinzu
      handleFallbackResponse(input)
    } finally {
      setIsLoading(false)
    }
  }

  // Erweitere die Erkennungsmuster in der handleFallbackResponse-Funktion

  const handleFallbackResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase()
    let responseContent = mockResponses.default

    if (
      lowerInput.includes("tagessatz") ||
      lowerInput.includes("stundensatz") ||
      lowerInput.includes("berechnung") ||
      lowerInput.includes("preis")
    ) {
      responseContent = mockResponses.tagessatz
    } else if (
      lowerInput.includes("erhöhen") ||
      lowerInput.includes("steigern") ||
      lowerInput.includes("mehr") ||
      lowerInput.includes("höher")
    ) {
      responseContent = mockResponses.erhöhen
    } else if (
      lowerInput.includes("zu niedrig") ||
      lowerInput.includes("zu hoch") ||
      lowerInput.includes("passt nicht") ||
      lowerInput.includes("angemessen")
    ) {
      responseContent = mockResponses.niedrig
    } else if (
      lowerInput.includes("steuer") ||
      lowerInput.includes("finanzamt") ||
      lowerInput.includes("abgaben") ||
      lowerInput.includes("buchhaltung") ||
      lowerInput.includes("absetzen")
    ) {
      responseContent = mockResponses.steuern
    } else if (
      lowerInput.includes("versicherung") ||
      lowerInput.includes("vorsorge") ||
      lowerInput.includes("absicherung") ||
      lowerInput.includes("krankenversicherung") ||
      lowerInput.includes("haftpflicht")
    ) {
      responseContent = mockResponses.versicherung
    } else if (
      lowerInput.includes("rechnung") ||
      lowerInput.includes("invoice") ||
      lowerInput.includes("abrechnung") ||
      lowerInput.includes("zahlung")
    ) {
      responseContent = mockResponses.rechnungen
    } else if (
      lowerInput.includes("marketing") ||
      lowerInput.includes("kunden") ||
      lowerInput.includes("akquise") ||
      lowerInput.includes("werbung") ||
      lowerInput.includes("sichtbarkeit")
    ) {
      responseContent = mockResponses.marketing
    } else if (
      lowerInput.includes("rechtsform") ||
      lowerInput.includes("unternehmen") ||
      lowerInput.includes("gmbh") ||
      lowerInput.includes("einzelunternehmen") ||
      lowerInput.includes("freiberufler")
    ) {
      responseContent = mockResponses.rechtsform
    }

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant" as const,
      content: responseContent,
    }

    setMessages((prev) => [...prev, assistantMessage])
  }

  // Versuche, zum Online-Modus zurückzukehren
  const handleRetryConnection = () => {
    setUseFallback(false)
    toast({
      title: "Verbindung wird wiederhergestellt",
      description: "Versuche, die Verbindung zum AI-Service wiederherzustellen...",
    })
  }

  // Scroll zum Ende der Nachrichten, wenn neue hinzugefügt werden
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="h-[350px] flex flex-col">
      <div className="p-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[#7DD5D8]" />
          <h2 className="text-sm font-medium m-0">FinLancer AI Assistent</h2>
        </div>
        {useFallback ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRetryConnection}
            className="h-6 text-xs flex items-center gap-1 text-gray-500"
          >
            <AlertCircle className="w-3 h-3" />
            <span>Offline-Modus</span>
          </Button>
        ) : (
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Online</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                message.role === "user" ? "bg-[#7DD5D8] text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                {message.role === "assistant" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                <span className="font-medium text-[10px]">{message.role === "assistant" ? "FinLancer AI" : "Du"}</span>
              </div>
              <p className="text-xs whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-2 rounded-lg">
              <div className="flex items-center gap-1">
                <Bot className="w-3 h-3" />
                <div className="flex gap-1">
                  <span className="animate-bounce text-xs">•</span>
                  <span className="animate-bounce text-xs" style={{ animationDelay: "0.2s" }}>
                    •
                  </span>
                  <span className="animate-bounce text-xs" style={{ animationDelay: "0.4s" }}>
                    •
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stelle eine Frage zu deinem Stundensatz..."
            className="flex-1 text-xs h-8"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isLoading}
            className="bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white h-8 w-8 p-0"
          >
            <Send className="w-3 h-3" />
          </Button>
        </form>
      </div>
    </div>
  )
}
