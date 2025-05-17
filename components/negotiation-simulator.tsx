"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Send, User, Briefcase, RefreshCw, AlertCircle, Lightbulb, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { StatusIndicator } from "@/components/status-indicator"
import { Card, CardContent } from "@/components/ui/card"

type Message = {
  id: string
  role: "user" | "client" | "system"
  content: string
}

type Scenario = {
  id: string
  name: string
  description: string
  clientType: string
  difficulty: "easy" | "medium" | "hard"
  initialMessage: string
}

export function NegotiationSimulator() {
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [targetRate, setTargetRate] = useState(85)
  const [scenario, setScenario] = useState<string>("new-client")
  const [isSimulationActive, setIsSimulationActive] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [tips, setTips] = useState<string[]>([])
  const [isLoadingTips, setIsLoadingTips] = useState(false)
  const [showTips, setShowTips] = useState(true)

  const scenarios: Scenario[] = [
    {
      id: "new-client",
      name: "Neuer Kunde",
      description: "Ein potenzieller neuer Kunde fragt nach deinem Stundensatz",
      clientType: "Startup",
      difficulty: "easy",
      initialMessage: "Hallo! Wir suchen einen Freelancer für unser Projekt. Was ist Ihr Stundensatz?",
    },
    {
      id: "price-pressure",
      name: "Preisdruck",
      description: "Ein Kunde versucht, deinen Stundensatz zu drücken",
      clientType: "Mittelständisches Unternehmen",
      difficulty: "medium",
      initialMessage:
        "Danke für Ihr Angebot. Ihr Stundensatz liegt deutlich über unserem Budget. Können Sie uns entgegenkommen?",
    },
    {
      id: "long-term",
      name: "Langzeitprojekt",
      description: "Verhandlung über einen reduzierten Satz für ein langfristiges Projekt",
      clientType: "Großunternehmen",
      difficulty: "hard",
      initialMessage:
        "Wir planen ein 6-monatiges Projekt und würden gerne über einen Mengenrabatt bei Ihrem Stundensatz sprechen.",
    },
  ]

  const startSimulation = () => {
    const selectedScenario = scenarios.find((s) => s.id === scenario)
    if (!selectedScenario) return

    setIsSimulationActive(true)
    setMessages([
      {
        id: "1",
        role: "system",
        content: `Szenario: ${selectedScenario.description}. Kundentyp: ${selectedScenario.clientType}. Dein Zielstundensatz: ${targetRate}€`,
      },
      {
        id: "2",
        role: "client",
        content: selectedScenario.initialMessage,
      },
    ])

    // Lade initiale Tipps
    fetchNegotiationTips([`Kunde: ${selectedScenario.initialMessage}`])
  }

  const resetSimulation = () => {
    setIsSimulationActive(false)
    setMessages([])
    setInput("")
    setUseFallback(false)
    setTips([])
  }

  const fetchNegotiationTips = async (conversationHistory: string[]) => {
    if (!showTips) return

    setIsLoadingTips(true)
    try {
      const response = await fetch("/api/negotiation-tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: conversationHistory,
          scenario: scenario,
          targetRate: targetRate,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Verarbeite die Tipps - entferne Nummerierung und leere Zeilen
      const tipsArray = data.tips
        .split(/\d+\.\s+/)
        .filter((tip: string) => tip.trim() !== "")
        .map((tip: string) => tip.trim())

      setTips(tipsArray)
    } catch (error) {
      console.error("Fehler beim Laden der Tipps:", error)
      setTips(["Verbindungsproblem beim Laden der Tipps."])
    } finally {
      setIsLoadingTips(false)
    }
  }

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
    setInput("")
    setIsLoading(true)

    try {
      const selectedScenario = scenarios.find((s) => s.id === scenario)
      if (!selectedScenario) throw new Error("Szenario nicht gefunden")

      // Erstelle eine ID für die Antwort
      const responseId = (Date.now() + 1).toString()

      // Füge eine leere Nachricht hinzu, die wir später aktualisieren werden
      setMessages((prev) => [
        ...prev,
        {
          id: responseId,
          role: "client",
          content: "",
        },
      ])

      // Bereite die vorherigen Nachrichten für die API vor
      const previousMessages = messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        }))

      // Sende die Anfrage an den Server
      const response = await fetch("/api/negotiation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: input,
          scenario: selectedScenario.id,
          targetRate: targetRate,
          clientType: selectedScenario.clientType,
          difficulty: selectedScenario.difficulty,
          previousMessages: previousMessages,
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

      // Nachdem die Antwort vollständig ist, hole neue Tipps
      const updatedMessages = [
        ...messages.filter((msg) => msg.role !== "system"),
        userMessage,
        { id: responseId, role: "client", content: accumulatedContent },
      ]

      const conversationHistory = updatedMessages.map(
        (msg) => `${msg.role === "user" ? "Freelancer" : "Kunde"}: ${msg.content}`,
      )

      fetchNegotiationTips(conversationHistory)
    } catch (error) {
      console.error("Fehler bei der Simulation:", error)
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

  // Fallback-Antworten für den Offline-Modus
  const handleFallbackResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase()
    let responseContent = ""

    // Einfache Logik für simulierte Antworten
    if (lowerInput.includes("rabatt") || lowerInput.includes("reduzieren")) {
      responseContent =
        "Rabatt? Wir haben bereits mehrere Angebote von anderen Freelancern, die deutlich günstiger sind. Können Sie nicht wenigstens 20% unter Ihren genannten Preis gehen?"
    } else if (lowerInput.includes(targetRate.toString())) {
      responseContent = `${targetRate}€ ist viel zu hoch für unser Budget. Wir hatten eher an ${Math.round(
        targetRate * 0.7,
      )}€ gedacht. Das ist marktüblich für solche Projekte.`
    } else if (lowerInput.includes("qualität") || lowerInput.includes("erfahrung")) {
      responseContent =
        "Qualität ist wichtig, aber wir müssen auch auf unser Budget achten. Was genau macht Ihre Arbeit so viel wertvoller als die Ihrer Mitbewerber?"
    } else {
      responseContent =
        "Ich verstehe Ihren Standpunkt, aber unser Budget ist begrenzt. Wir haben andere Angebote, die deutlich günstiger sind. Was können Sie uns anbieten, um diesen Preisunterschied zu rechtfertigen?"
    }

    const clientMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "client",
      content: responseContent,
    }

    setMessages((prev) => [...prev, clientMessage])

    // Aktualisiere auch die Tipps im Fallback-Modus
    setTips([
      "Betone den konkreten Mehrwert deiner Arbeit mit Beispielen.",
      "Frage nach den Erwartungen an Qualität und Lieferumfang bei diesem Budget.",
      "Schlage ein gestaffeltes Preismodell vor, das verschiedene Leistungsniveaus bietet.",
    ])
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
    <div className="space-y-4">
      {!isSimulationActive ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scenario">Verhandlungsszenario</Label>
            <Select value={scenario} onValueChange={setScenario}>
              <SelectTrigger id="scenario">
                <SelectValue placeholder="Wähle ein Szenario" />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    <div className="flex flex-col">
                      <span>{s.name}</span>
                      <span className="text-xs text-gray-500">{s.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="target-rate">Dein Zielstundensatz: {targetRate}€</Label>
              <span className="text-xs text-gray-500">
                Schwierigkeit:{" "}
                {scenarios.find((s) => s.id === scenario)?.difficulty === "easy"
                  ? "Leicht"
                  : scenarios.find((s) => s.id === scenario)?.difficulty === "medium"
                    ? "Mittel"
                    : "Schwer"}
              </span>
            </div>
            <Slider
              id="target-rate"
              value={[targetRate]}
              min={50}
              max={150}
              step={1}
              onValueChange={(value) => setTargetRate(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>50€</span>
              <span>100€</span>
              <span>150€</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="show-tips"
              checked={showTips}
              onChange={(e) => setShowTips(e.target.checked)}
              className="rounded border-gray-300 text-[#7DD5D8] focus:ring-[#7DD5D8]"
            />
            <Label htmlFor="show-tips" className="text-sm">
              Dynamische Verhandlungstipps anzeigen
            </Label>
          </div>

          <Button onClick={startSimulation} className="w-full freelance-button-cta">
            Simulation starten
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md h-[350px] flex flex-col md:col-span-2">
              <div className="p-3 border-b bg-gray-50 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <div>
                  <h3 className="text-sm font-medium">
                    {scenarios.find((s) => s.id === scenario)?.clientType || "Kunde"}
                  </h3>
                  <p className="text-xs text-gray-500">Zielstundensatz: {targetRate}€</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {useFallback ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRetryConnection}
                      className="h-6 text-xs flex items-center gap-1 text-amber-500"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>Offline-Modus</span>
                    </Button>
                  ) : (
                    <StatusIndicator online={true} />
                  )}
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetSimulation}>
                    <RefreshCw className="w-3 h-3 mr-1" /> Neu starten
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages
                  .filter((msg) => msg.role !== "system")
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg ${
                          message.role === "user" ? "bg-[#7DD5D8] text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-0.5">
                          {message.role === "user" ? <User className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          <span className="font-medium text-[10px]">{message.role === "user" ? "Du" : "Kunde"}</span>
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
                        <Briefcase className="w-3 h-3" />
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

              <div className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Deine Antwort..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>

            {showTips && (
              <div className="h-[350px] flex flex-col">
                <Card className="flex-1 overflow-hidden">
                  <div className="p-3 border-b bg-gray-50 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7DD5D8]" />
                    <h3 className="text-sm font-medium">Verhandlungstipps</h3>
                    {isLoadingTips && <RefreshCw className="w-3 h-3 ml-auto animate-spin text-gray-400" />}
                  </div>
                  <CardContent className="p-3 overflow-y-auto h-full">
                    {tips.length > 0 ? (
                      <ul className="space-y-3">
                        {tips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 bg-yellow-50 p-2 rounded-md border border-yellow-100"
                          >
                            <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                            <p className="text-xs text-yellow-800">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    ) : isLoadingTips ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-xs text-gray-500">Lade Tipps...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <Lightbulb className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-xs text-gray-500">Tipps werden angezeigt, sobald die Verhandlung beginnt.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
