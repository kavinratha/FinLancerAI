"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Copy, Check, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Argument = {
  id: string
  title: string
  content: string
  category: string
}

export function ArgumentGenerator() {
  const { toast } = useToast()
  const [targetRate, setTargetRate] = useState("")
  const [skills, setSkills] = useState("")
  const [experience, setExperience] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedArguments, setArguments] = useState<Argument[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!targetRate || !skills || !experience) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte fülle alle Felder aus, um Argumente zu generieren.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Hier würde normalerweise ein API-Aufruf erfolgen
      // Für dieses Beispiel simulieren wir die Antwort
      setTimeout(() => {
        const mockArguments: Argument[] = [
          {
            id: "1",
            title: "Spezialisierte Expertise",
            content: `Mit ${experience} Jahren Erfahrung und Spezialisierung auf ${skills} biete ich eine Expertise, die weit über dem Durchschnitt liegt. Mein Stundensatz von ${targetRate}€ spiegelt diese spezialisierte Erfahrung wider, die Ihrem Projekt einen erheblichen Mehrwert bringt.`,
            category: "expertise",
          },
          {
            id: "2",
            title: "Return on Investment",
            content: `Die Investition von ${targetRate}€ pro Stunde zahlt sich durch höhere Qualität, schnellere Umsetzung und weniger Fehler aus. Langfristig sparen Sie Kosten durch weniger Nacharbeit und eine robustere Implementierung.`,
            category: "value",
          },
          {
            id: "3",
            title: "Marktvergleich",
            content: `Der aktuelle Marktdurchschnitt für Freelancer mit meinem Skillset (${skills}) und Erfahrungslevel (${experience} Jahre) liegt zwischen ${
              Number.parseInt(targetRate) - 10
            }€ und ${
              Number.parseInt(targetRate) + 15
            }€. Mein Stundensatz von ${targetRate}€ ist daher marktgerecht und bietet ein ausgezeichnetes Preis-Leistungs-Verhältnis.`,
            category: "market",
          },
          {
            id: "4",
            title: "Effizienz und Zeitersparnis",
            content: `Durch meine Erfahrung mit ${skills} über ${experience} Jahre hinweg kann ich Aufgaben deutlich effizienter lösen als weniger erfahrene Freelancer. Diese Effizienz bedeutet, dass Sie trotz eines Stundensatzes von ${targetRate}€ insgesamt weniger für das Projekt ausgeben werden.`,
            category: "efficiency",
          },
        ]

        setArguments(mockArguments)
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Fehler bei der Generierung:", error)
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Generierung der Argumente.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)

    toast({
      title: "Kopiert!",
      description: "Das Argument wurde in die Zwischenablage kopiert.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target-rate">Dein Zielstundensatz (€)</Label>
          <Input
            id="target-rate"
            type="number"
            placeholder="z.B. 85"
            value={targetRate}
            onChange={(e) => setTargetRate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Berufserfahrung (Jahre)</Label>
          <Input
            id="experience"
            type="number"
            placeholder="z.B. 5"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="skills">Deine wichtigsten Skills (durch Komma getrennt)</Label>
          <Input
            id="skills"
            placeholder="z.B. React, TypeScript, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleGenerate} className="w-full freelance-button-cta" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generiere Argumente...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" /> Argumente generieren
          </>
        )}
      </Button>

      {generatedArguments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Generierte Argumente</h3>
          <div className="grid grid-cols-1 gap-4">
            {generatedArguments.map((arg) => (
              <Card key={arg.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{arg.title}</h4>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                        {arg.category === "expertise"
                          ? "Expertise"
                          : arg.category === "value"
                            ? "Wertversprechen"
                            : arg.category === "market"
                              ? "Marktvergleich"
                              : "Effizienz"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopy(arg.id, arg.content)}
                    >
                      {copiedId === arg.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3">
                    <p className="text-sm">{arg.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
