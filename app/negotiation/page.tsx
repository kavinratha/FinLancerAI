"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NegotiationSimulator } from "@/components/negotiation-simulator"
import { ArgumentGenerator } from "@/components/argument-generator"
import { OfferGenerator } from "@/components/offer-generator"
import { MessageSquare, Lightbulb, FileText } from "lucide-react"

export default function NegotiationPage() {
  // Hole den Tab-Parameter aus der URL
  const searchParams =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const tabParam = searchParams.get("tab")

  // Setze den aktiven Tab basierend auf dem URL-Parameter oder Standard
  const initialTab = tabParam === "arguments" || tabParam === "generator" ? tabParam : "simulator"
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Preisverhandlungs-Coach</h1>
        <p className="text-gray-500 mt-1">
          Verbessere deine Verhandlungsfähigkeiten und maximiere deinen Stundensatz mit KI-Unterstützung
        </p>
      </div>

      <Tabs defaultValue="simulator" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="simulator" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Verhandlungssimulator</span>
            <span className="sm:hidden">Simulator</span>
          </TabsTrigger>
          <TabsTrigger value="arguments" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Argumentationshilfen</span>
            <span className="sm:hidden">Argumente</span>
          </TabsTrigger>
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Angebote & Rechnungen</span>
            <span className="sm:hidden">Dokumente</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulator">
          <Card>
            <CardHeader>
              <CardTitle>Verhandlungssimulator</CardTitle>
              <CardDescription>
                Übe Preisverhandlungen mit einem KI-Kunden und erhalte Feedback zu deiner Verhandlungsstrategie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NegotiationSimulator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arguments">
          <Card>
            <CardHeader>
              <CardTitle>Argumentationshilfen</CardTitle>
              <CardDescription>
                Generiere überzeugende Argumente, um deinen Stundensatz gegenüber Kunden zu rechtfertigen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArgumentGenerator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>Angebote & Rechnungen</CardTitle>
              <CardDescription>
                Erstelle professionelle Angebote und rechtskonforme Rechnungen für deine Freelance-Projekte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OfferGenerator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
