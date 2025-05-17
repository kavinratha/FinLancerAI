"use client"

import { useState } from "react"
import { RateCard } from "@/components/rate-card"
import { useFetchRate } from "@/hooks/use-fetch-rate"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, TrendingUp, MessageSquare, Lightbulb, FileText, X, Info, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConfidenceBar } from "@/components/confidence-bar"
import { RateTips } from "@/components/rate-tips"
import { AIChat } from "@/components/ai-chat"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function Dashboard() {
  const { data, isLoading } = useFetchRate()
  const router = useRouter()
  const [activeDialog, setActiveDialog] = useState<string | null>(null)

  // Funktionen zum Öffnen und Schließen der Dialoge
  const openDialog = (dialogId: string) => setActiveDialog(dialogId)
  const closeDialog = () => setActiveDialog(null)

  // Verhandlungs-Features für die Kachel
  const negotiationFeatures = [
    {
      id: "simulator",
      icon: <MessageSquare className="w-4 h-4 text-[#7DD5D8]" />,
      title: "Verhandlungssimulator",
      description: "Übe Preisverhandlungen mit einem KI-Kunden",
    },
    {
      id: "arguments",
      icon: <Lightbulb className="w-4 h-4 text-[#7DD5D8]" />,
      title: "Argumentationshilfen",
      description: "Erhalte überzeugende Argumente für deinen Stundensatz",
    },
    {
      id: "generator",
      icon: <FileText className="w-4 h-4 text-[#7DD5D8]" />,
      title: "Angebotsgenerator",
      description: "Erstelle professionelle Angebote mit optimaler Preisgestaltung",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-0 md:px-4 py-6">
      {/* Benachrichtigung im freelance.de Stil */}
      <div className="bg-gradient-to-r from-[#7DD5D8] to-[#7DD5D8]/90 text-gray-800 rounded-lg shadow-sm flex justify-between items-center py-3 px-5 border border-[#7DD5D8]/20">
        <p className="text-sm">Herzlich willkommen bei FinLance AI. Hier findest du deinen empfohlenen Stundensatz.</p>
        <button className="text-gray-600">
          <X className="w-4 h-4" />
          <span className="sr-only">Schließen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hauptkachel mit Stundensatz */}
        <Card
          className="shadow-md hover:shadow-lg border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:border-[#7DD5D8] transition-all duration-200"
          onClick={() => openDialog("rate")}
        >
          <CardHeader className="pb-2 bg-gradient-to-r from-[#F7F8FA] to-white border-b border-gray-100">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#7DD5D8]/10 p-1.5 rounded-full">
                  <TrendingUp className="w-4 h-4 text-[#7DD5D8]" />
                </div>
                <span>Mein Stundensatz</span>
              </div>
              <Info className="w-4 h-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl font-bold mb-3 text-gray-800">{data?.recommended || 0} €</div>
                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                    (data?.delta || 0) > 0
                      ? "text-green-700 bg-green-50 border border-green-100"
                      : "text-red-700 bg-red-50 border border-red-100"
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>{data?.delta || 0}% ggü. Vorwoche</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-[#7DD5D8] hover:text-[#6BC4C7] hover:bg-[#7DD5D8]/5 group"
            >
              Details anzeigen <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        {/* Tipps zur Stundensatzerhöhung */}
        <Card
          className="shadow-md hover:shadow-lg border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:border-[#FFD100] transition-all duration-200"
          onClick={() => openDialog("tips")}
        >
          <CardHeader className="pb-2 bg-gradient-to-r from-[#FFD100]/10 to-white border-b border-gray-100">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#FFD100]/10 p-1.5 rounded-full">
                  <Lightbulb className="w-4 h-4 text-[#FFD100]" />
                </div>
                <span>Tipps zur Erhöhung</span>
              </div>
              <Info className="w-4 h-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[100px] w-full" />
            ) : (
              <div className="py-2">
                <div className="space-y-2">
                  {/* Zeige die ersten 2 Tipps kompakt an */}
                  <div className="flex items-center gap-3 p-3 bg-[#F7F8FA] rounded-lg border border-gray-100 shadow-sm">
                    <div className="bg-white p-1.5 rounded-full shadow-sm">
                      <TrendingUp className="w-4 h-4 text-[#7DD5D8]" />
                    </div>
                    <span className="text-sm">Spezialisierung in Nischenbereichen</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F7F8FA] rounded-lg border border-gray-100 shadow-sm">
                    <div className="bg-white p-1.5 rounded-full shadow-sm">
                      <Award className="w-4 h-4 text-[#7DD5D8]" />
                    </div>
                    <span className="text-sm">Erweitere dein Skill-Portfolio</span>
                  </div>
                </div>
                <div className="text-center text-xs text-gray-500 mt-2">+2 weitere Tipps verfügbar</div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-[#7DD5D8] hover:text-[#6BC4C7] hover:bg-[#7DD5D8]/5 group"
            >
              Alle Tipps anzeigen{" "}
              <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        {/* Preisverhandlungs-Coach Kachel */}
        <Card
          className="shadow-md hover:shadow-lg border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:border-[#7DD5D8] transition-all duration-200"
          onClick={() => router.push("/negotiation")}
        >
          <CardHeader className="pb-2 bg-gradient-to-r from-[#7DD5D8]/10 to-white border-b border-gray-100">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#7DD5D8]/10 p-1.5 rounded-full">
                  <MessageSquare className="w-4 h-4 text-[#7DD5D8]" />
                </div>
                <span>Preisverhandlungs-Coach</span>
              </div>
              <Info className="w-4 h-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-2">
              <div className="grid grid-cols-1 gap-2">
                {negotiationFeatures.slice(0, 2).map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-3 p-3 bg-[#F7F8FA] rounded-lg border border-gray-100 shadow-sm"
                  >
                    <div className="bg-white p-1.5 rounded-full shadow-sm">{feature.icon}</div>
                    <div className="overflow-hidden">
                      <h3 className="text-sm font-medium truncate">{feature.title}</h3>
                    </div>
                  </div>
                ))}
                {negotiationFeatures.length > 2 && (
                  <div className="text-center text-xs text-gray-500 mt-1">
                    +{negotiationFeatures.length - 2} weitere Tools
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-[#7DD5D8] hover:text-[#6BC4C7] hover:bg-[#7DD5D8]/5 group"
            >
              Alle Tools anzeigen{" "}
              <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        {/* KI-Assistent Kachel - Nimmt die volle Breite ein */}
        <Card className="shadow-md border border-gray-100 rounded-xl overflow-hidden md:col-span-2 lg:col-span-3">
          <CardHeader className="pb-2 bg-gradient-to-r from-[#7DD5D8]/10 to-white border-b border-gray-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-[#7DD5D8]/10 p-1.5 rounded-full">
                <MessageSquare className="w-4 h-4 text-[#7DD5D8]" />
              </div>
              <span>KI-Assistent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <AIChat />
          </CardContent>
        </Card>
      </div>

      {/* Dialog für Stundensatz-Details */}
      <Dialog open={activeDialog === "rate"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl rounded-xl border-none">
          <DialogHeader>
            <DialogTitle>Mein Stundensatz im Detail</DialogTitle>
            <DialogDescription>Detaillierte Informationen zu deinem empfohlenen Stundensatz</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <>
                <RateCard rate={data?.recommended || 0} delta={data?.delta || 0} variant="large" />
                <ConfidenceBar min={data?.min || 0} recommended={data?.recommended || 0} max={data?.max || 0} />

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Tipps zur Erhöhung deines Stundensatzes</h3>
                  <RateTips skills={data?.factors.map((f) => f.label) || []} rate={data?.recommended || 0} />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    className="freelance-button-cta"
                    onClick={() => {
                      closeDialog()
                      router.push("/rate-details")
                    }}
                  >
                    Stundensatz mit KI berechnen
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog für Tipps zur Stundensatzerhöhung */}
      <Dialog open={activeDialog === "tips"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl rounded-xl border-none">
          <DialogHeader>
            <DialogTitle>Tipps zur Erhöhung deines Stundensatzes</DialogTitle>
            <DialogDescription>Mit diesen Strategien kannst du deinen Stundensatz steigern</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <>
                <RateTips
                  skills={data?.factors.map((f) => f.label) || []}
                  rate={data?.recommended || 0}
                  expanded={true}
                />

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Wie wurden diese Tipps erstellt?</h3>
                  <p className="text-sm text-gray-600">
                    Unsere KI analysiert erfolgreiche Freelancer mit ähnlichem Profil und identifiziert die effektivsten
                    Strategien zur Steigerung des Stundensatzes. Die Tipps sind auf dein Profil, deine Skills und deine
                    aktuelle Marktsituation zugeschnitten.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    className="freelance-button-cta"
                    onClick={() => {
                      closeDialog()
                      router.push("/rate-details")
                    }}
                  >
                    Stundensatz mit KI berechnen
                  </Button>
                </div>
                <Link
                  href="/rate-increase-tips"
                  className="text-[#7DD5D8] text-xs flex items-center hover:underline mt-2"
                >
                  <span>Alle Tipps zur Stundensatzerhöhung anzeigen</span>
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </Link>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
