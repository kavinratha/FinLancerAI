"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Shield, Calculator, MessageSquare } from "lucide-react"

export default function Settings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Stundensatz-Einstellungen
  const [rateSettings, setRateSettings] = useState({
    showRange: true,
    showFactors: true,
    compareWithMarket: true,
  })

  // Verhandlungs-Einstellungen
  const [negotiationSettings, setNegotiationSettings] = useState({
    showTips: true,
    difficultyLevel: "medium",
  })

  // Benachrichtigungseinstellungen
  const [notificationSettings, setNotificationSettings] = useState({
    rateChanges: true,
    weeklyReports: false,
  })

  // Datenschutzeinstellungen
  const [privacySettings, setPrivacySettings] = useState({
    storeConversations: true,
    anonymizeData: true,
  })

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Einstellungen gespeichert",
        description: "Deine Einstellungen wurden erfolgreich aktualisiert.",
      })
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Einstellungen</h1>
        <Button onClick={handleSaveSettings} className="freelance-button-cta" disabled={isLoading}>
          {isLoading ? "Wird gespeichert..." : "Speichern"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Stundensatz-Einstellungen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Stundensatz
            </CardTitle>
            <CardDescription>Einstellungen zur Stundensatzberechnung</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-range">Preisspanne anzeigen</Label>
                <p className="text-xs text-gray-500">Zeige minimalen und maximalen empfohlenen Stundensatz an</p>
              </div>
              <Switch
                id="show-range"
                checked={rateSettings.showRange}
                onCheckedChange={(checked) => setRateSettings({ ...rateSettings, showRange: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-factors">Einflussfaktoren anzeigen</Label>
                <p className="text-xs text-gray-500">
                  Zeige Faktoren an, die deinen empfohlenen Stundensatz beeinflussen
                </p>
              </div>
              <Switch
                id="show-factors"
                checked={rateSettings.showFactors}
                onCheckedChange={(checked) => setRateSettings({ ...rateSettings, showFactors: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compare-market">Marktvergleich anzeigen</Label>
                <p className="text-xs text-gray-500">Vergleiche deinen Stundensatz mit dem Marktdurchschnitt</p>
              </div>
              <Switch
                id="compare-market"
                checked={rateSettings.compareWithMarket}
                onCheckedChange={(checked) => setRateSettings({ ...rateSettings, compareWithMarket: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Verhandlungs-Einstellungen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Verhandlungssimulator
            </CardTitle>
            <CardDescription>Einstellungen für den Verhandlungssimulator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-tips">Verhandlungstipps anzeigen</Label>
                <p className="text-xs text-gray-500">Zeige dynamische Tipps während der Verhandlungssimulation an</p>
              </div>
              <Switch
                id="show-tips"
                checked={negotiationSettings.showTips}
                onCheckedChange={(checked) => setNegotiationSettings({ ...negotiationSettings, showTips: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty-level">Schwierigkeitsgrad</Label>
              <Select
                value={negotiationSettings.difficultyLevel}
                onValueChange={(value) => setNegotiationSettings({ ...negotiationSettings, difficultyLevel: value })}
              >
                <SelectTrigger id="difficulty-level">
                  <SelectValue placeholder="Wähle einen Schwierigkeitsgrad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Leicht</SelectItem>
                  <SelectItem value="medium">Mittel</SelectItem>
                  <SelectItem value="hard">Schwer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Benachrichtigungen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Benachrichtigungen
            </CardTitle>
            <CardDescription>Benachrichtigungseinstellungen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="rate-changes">Stundensatz-Änderungen</Label>
                <p className="text-xs text-gray-500">
                  Benachrichtigungen bei signifikanten Änderungen deines empfohlenen Stundensatzes
                </p>
              </div>
              <Switch
                id="rate-changes"
                checked={notificationSettings.rateChanges}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, rateChanges: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-reports">Wöchentliche Berichte</Label>
                <p className="text-xs text-gray-500">Wöchentliche Zusammenfassung deiner Stundensatzentwicklung</p>
              </div>
              <Switch
                id="weekly-reports"
                checked={notificationSettings.weeklyReports}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Datenschutz */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Datenschutz
            </CardTitle>
            <CardDescription>Datenschutzeinstellungen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="store-conversations">Gespräche speichern</Label>
                <p className="text-xs text-gray-500">Speichere deine Gespräche für bessere Antworten und Analysen</p>
              </div>
              <Switch
                id="store-conversations"
                checked={privacySettings.storeConversations}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, storeConversations: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="anonymize-data">Daten anonymisieren</Label>
                <p className="text-xs text-gray-500">
                  Anonymisiere persönliche Informationen in deinen gespeicherten Daten
                </p>
              </div>
              <Switch
                id="anonymize-data"
                checked={privacySettings.anonymizeData}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, anonymizeData: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
