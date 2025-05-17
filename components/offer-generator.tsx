"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Download, FileText, Send, Receipt, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export function OfferGenerator() {
  const { toast } = useToast()
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [clientName, setClientName] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [estimatedHours, setEstimatedHours] = useState("")
  const [offerType, setOfferType] = useState("standard")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedOffer, setGeneratedOffer] = useState<string | null>(null)
  const [generatedInvoice, setGeneratedInvoice] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("editor")

  // Neue Zustandsvariablen für Rechnungen
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [serviceDate, setServiceDate] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("14")
  const [taxRate, setTaxRate] = useState("19")
  const [isSmallBusiness, setIsSmallBusiness] = useState(false)
  const [freelancerDetails, setFreelancerDetails] = useState({
    name: "",
    address: "",
    taxId: "",
    email: "",
    phone: "",
    bankName: "",
    iban: "",
    bic: "",
  })

  const handleGenerate = async () => {
    if (!projectTitle || !projectDescription || !clientName || !hourlyRate || !estimatedHours) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte fülle alle Felder aus, um ein Angebot zu generieren.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Hier würde normalerweise ein API-Aufruf erfolgen
      // Für dieses Beispiel simulieren wir die Antwort
      setTimeout(() => {
        const totalCost = Number.parseInt(hourlyRate) * Number.parseInt(estimatedHours)

        const offerText = `
# Angebot: ${projectTitle}

**Für:** ${clientName}
**Datum:** ${new Date().toLocaleDateString("de-DE")}
**Angebotsnummer:** ANG-${Math.floor(Math.random() * 10000)}

## Projektbeschreibung

${projectDescription}

## Leistungsumfang

${
  offerType === "standard"
    ? "- Konzeption und Planung\n- Entwicklung und Implementierung\n- Grundlegende Tests und Qualitätssicherung\n- Projektmanagement"
    : offerType === "premium"
      ? "- Detaillierte Anforderungsanalyse\n- Konzeption und Planung\n- Entwicklung und Implementierung\n- Umfassende Tests und Qualitätssicherung\n- Erweiterte Dokumentation\n- Persönliches Projektmanagement\n- 2 Wochen Support nach Projektabschluss"
      : "- Konzeption und Planung\n- Entwicklung und Implementierung\n- Grundlegende Tests\n- Minimale Dokumentation"
}

## Kostenaufstellung

- **Stundensatz:** ${hourlyRate}€
- **Geschätzter Aufwand:** ${estimatedHours} Stunden
- **Gesamtkosten:** ${totalCost}€${
          offerType === "premium"
            ? "\n- **Premium-Service-Zuschlag:** " +
              (totalCost * 0.15).toFixed(2) +
              "€\n- **Gesamtsumme:** " +
              (totalCost * 1.15).toFixed(2) +
              "€"
            : offerType === "budget"
              ? "\n- **Budget-Rabatt:** -" +
                (totalCost * 0.1).toFixed(2) +
                "€\n- **Gesamtsumme:** " +
                (totalCost * 0.9).toFixed(2) +
                "€"
              : ""
        }

## Zahlungsbedingungen

- 30% Anzahlung bei Projektstart
- 40% nach Erreichen des ersten Meilensteins
- 30% nach Projektabschluss

## Zeitplan

- Projektstart: Nach Auftragsbestätigung
- Geschätzte Projektdauer: ${Math.ceil(Number.parseInt(estimatedHours) / 8)} Arbeitstage

## Anmerkungen

${
  offerType === "standard"
    ? "Dieses Angebot ist 30 Tage gültig. Änderungen am Projektumfang können zu Anpassungen der Kosten und des Zeitplans führen."
    : offerType === "premium"
      ? "Dieses Premium-Angebot ist 45 Tage gültig und beinhaltet priorisierte Bearbeitung. Änderungen am Projektumfang werden flexibel gehandhabt."
      : "Dieses Budget-Angebot ist 14 Tage gültig. Der reduzierte Preis setzt voraus, dass der Projektumfang exakt wie beschrieben umgesetzt wird. Änderungen führen zu separaten Kostenberechnungen."
}

Mit freundlichen Grüßen,

[Dein Name]
Freelancer
        `

        setGeneratedOffer(offerText)
        setActiveTab("preview")
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Fehler bei der Generierung:", error)
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Generierung des Angebots.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedOffer) return

    try {
      const blob = new Blob([generatedOffer], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Angebot_${projectTitle.replace(/\s+/g, "_")}.md`
      document.body.appendChild(a)
      a.click()

      // Clean up
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)

      toast({
        title: "Angebot heruntergeladen",
        description: "Das Angebot wurde als Markdown-Datei heruntergeladen.",
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download fehlgeschlagen",
        description: "Es gab ein Problem beim Herunterladen des Angebots.",
        variant: "destructive",
      })
    }
  }

  const handleSendByEmail = () => {
    toast({
      title: "E-Mail-Funktion",
      description: "Diese Funktion ist noch in Entwicklung.",
    })
  }

  const handleGenerateInvoice = async () => {
    if (!projectTitle || !projectDescription || !clientName || !hourlyRate || !estimatedHours || !invoiceNumber) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte fülle alle Pflichtfelder aus, um eine Rechnung zu generieren.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Hier würde normalerweise ein API-Aufruf erfolgen
      // Für dieses Beispiel simulieren wir die Antwort
      setTimeout(() => {
        const totalCost = Number.parseInt(hourlyRate) * Number.parseInt(estimatedHours)
        const netAmount = totalCost
        const taxAmount = isSmallBusiness ? 0 : (netAmount * Number.parseInt(taxRate)) / 100
        const totalAmount = netAmount + taxAmount

        const invoiceText = `
# Rechnung

**Rechnungsnummer:** ${invoiceNumber}
**Rechnungsdatum:** ${invoiceDate}

## Leistungserbringer
${freelancerDetails.name}
${freelancerDetails.address}

**Steuernummer/USt-ID:** ${freelancerDetails.taxId}
**E-Mail:** ${freelancerDetails.email}
**Telefon:** ${freelancerDetails.phone}

## Leistungsempfänger
${clientName}

## Leistungsbeschreibung
**Projekt:** ${projectTitle}

${projectDescription}

**Leistungszeitraum:** ${serviceDate || "Siehe Leistungsbeschreibung"}

## Abrechnung

| Beschreibung | Menge | Einheit | Einzelpreis | Gesamtpreis |
|--------------|-------|---------|-------------|-------------|
| ${projectTitle} | ${estimatedHours} | Stunden | ${hourlyRate}€ | ${netAmount}€ |

**Nettobetrag:** ${netAmount.toFixed(2)}€
${!isSmallBusiness ? `**${taxRate}% Mehrwertsteuer:** ${taxAmount.toFixed(2)}€` : ""}
**Gesamtbetrag:** ${totalAmount.toFixed(2)}€

${isSmallBusiness ? "Gemäß § 19 UStG enthält der Rechnungsbetrag keine Umsatzsteuer." : ""}

## Zahlungsinformationen
Bitte überweisen Sie den Gesamtbetrag innerhalb von ${paymentTerms} Tagen auf das folgende Konto:

**Kontoinhaber:** ${freelancerDetails.name}
**Bank:** ${freelancerDetails.bankName}
**IBAN:** ${freelancerDetails.iban}
**BIC:** ${freelancerDetails.bic}

**Zahlungsziel:** ${new Date(new Date(invoiceDate).getTime() + Number.parseInt(paymentTerms) * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE")}

Vielen Dank für Ihr Vertrauen und die gute Zusammenarbeit!

Mit freundlichen Grüßen,

${freelancerDetails.name}
        `

        setGeneratedInvoice(invoiceText)
        setActiveTab("preview")
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Fehler bei der Generierung:", error)
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Generierung der Rechnung.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleDownloadInvoice = () => {
    if (!generatedInvoice) return

    try {
      const blob = new Blob([generatedInvoice], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Rechnung_${invoiceNumber.replace(/\s+/g, "_")}.md`
      document.body.appendChild(a)
      a.click()

      // Clean up
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)

      toast({
        title: "Rechnung heruntergeladen",
        description: "Die Rechnung wurde als Markdown-Datei heruntergeladen.",
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download fehlgeschlagen",
        description: "Es gab ein Problem beim Herunterladen der Rechnung.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="editor">Angebote</TabsTrigger>
          <TabsTrigger value="invoice">Rechnung</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedOffer && !generatedInvoice}>
            Vorschau
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          {/* Bestehender Code für den Angebots-Editor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Kundenname</Label>
              <Input
                id="client-name"
                placeholder="z.B. Musterfirma GmbH"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-title">Projekttitel</Label>
              <Input
                id="project-title"
                placeholder="z.B. Website-Redesign"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="project-description">Projektbeschreibung</Label>
              <Textarea
                id="project-description"
                placeholder="Beschreibe das Projekt kurz..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourly-rate">Stundensatz (€)</Label>
              <Input
                id="hourly-rate"
                type="number"
                placeholder="z.B. 85"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated-hours">Geschätzte Stunden</Label>
              <Input
                id="estimated-hours"
                type="number"
                placeholder="z.B. 40"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="offer-type">Angebotstyp</Label>
              <Select value={offerType} onValueChange={setOfferType}>
                <SelectTrigger id="offer-type">
                  <SelectValue placeholder="Wähle einen Angebotstyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (10% Rabatt, minimaler Umfang)</SelectItem>
                  <SelectItem value="standard">Standard (Normaler Preis, regulärer Umfang)</SelectItem>
                  <SelectItem value="premium">Premium (15% Aufschlag, erweiterter Umfang)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerate} className="w-full freelance-button-cta" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generiere Angebot...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" /> Angebot generieren
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="invoice" className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Wichtige Hinweise zur Rechnungsstellung</h3>
                <p className="text-xs text-yellow-700 mt-1">
                  Achte darauf, dass deine Rechnung alle gesetzlich vorgeschriebenen Angaben enthält. Dazu gehören deine
                  vollständigen Kontaktdaten, Steuernummer oder USt-ID, Rechnungsnummer, Rechnungsdatum,
                  Leistungsbeschreibung, Leistungszeitraum, Netto- und Bruttobeträge sowie Zahlungsinformationen.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Rechnungsnummer*</Label>
              <Input
                id="invoice-number"
                placeholder="z.B. RE-2023-001"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoice-date">Rechnungsdatum*</Label>
              <Input
                id="invoice-date"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-date">Leistungszeitraum</Label>
              <Input
                id="service-date"
                placeholder="z.B. 01.01.2023 - 31.01.2023"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-terms">Zahlungsziel (Tage)*</Label>
              <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                <SelectTrigger id="payment-terms">
                  <SelectValue placeholder="Wähle ein Zahlungsziel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Tage</SelectItem>
                  <SelectItem value="14">14 Tage</SelectItem>
                  <SelectItem value="30">30 Tage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax-rate">Mehrwertsteuersatz*</Label>
              <Select value={taxRate} onValueChange={setTaxRate} disabled={isSmallBusiness}>
                <SelectTrigger id="tax-rate">
                  <SelectValue placeholder="Wähle einen Steuersatz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="19">19% (Standard)</SelectItem>
                  <SelectItem value="7">7% (Ermäßigt)</SelectItem>
                  <SelectItem value="0">0% (Steuerfrei)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="small-business"
                  checked={isSmallBusiness}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTaxRate("0")
                    }
                    setIsSmallBusiness(!!checked)
                  }}
                />
                <Label htmlFor="small-business" className="text-sm">
                  Kleinunternehmer nach §19 UStG
                </Label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium mb-3">Deine Kontaktdaten</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="freelancer-name">Name / Firma*</Label>
                <Input
                  id="freelancer-name"
                  placeholder="Dein vollständiger Name"
                  value={freelancerDetails.name}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="freelancer-address">Anschrift*</Label>
                <Input
                  id="freelancer-address"
                  placeholder="Deine vollständige Anschrift"
                  value={freelancerDetails.address}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, address: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="freelancer-tax-id">Steuernummer / USt-ID*</Label>
                <Input
                  id="freelancer-tax-id"
                  placeholder="Deine Steuernummer oder USt-ID"
                  value={freelancerDetails.taxId}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, taxId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="freelancer-email">E-Mail</Label>
                <Input
                  id="freelancer-email"
                  type="email"
                  placeholder="Deine E-Mail-Adresse"
                  value={freelancerDetails.email}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="freelancer-phone">Telefon</Label>
                <Input
                  id="freelancer-phone"
                  placeholder="Deine Telefonnummer"
                  value={freelancerDetails.phone}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium mb-3">Bankverbindung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank*</Label>
                <Input
                  id="bank-name"
                  placeholder="Name deiner Bank"
                  value={freelancerDetails.bankName}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, bankName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-iban">IBAN*</Label>
                <Input
                  id="bank-iban"
                  placeholder="Deine IBAN"
                  value={freelancerDetails.iban}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, iban: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-bic">BIC</Label>
                <Input
                  id="bank-bic"
                  placeholder="Deine BIC"
                  value={freelancerDetails.bic}
                  onChange={(e) => setFreelancerDetails({ ...freelancerDetails, bic: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium mb-3">Projektdetails</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name-invoice">Kundenname*</Label>
                <Input
                  id="client-name-invoice"
                  placeholder="z.B. Musterfirma GmbH"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-title-invoice">Projekttitel*</Label>
                <Input
                  id="project-title-invoice"
                  placeholder="z.B. Website-Redesign"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="project-description-invoice">Projektbeschreibung*</Label>
                <Textarea
                  id="project-description-invoice"
                  placeholder="Beschreibe das Projekt kurz..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourly-rate-invoice">Stundensatz (€)*</Label>
                <Input
                  id="hourly-rate-invoice"
                  type="number"
                  placeholder="z.B. 85"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated-hours-invoice">Anzahl Stunden*</Label>
                <Input
                  id="estimated-hours-invoice"
                  type="number"
                  placeholder="z.B. 40"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Button onClick={handleGenerateInvoice} className="w-full freelance-button-cta" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generiere Rechnung...
              </>
            ) : (
              <>
                <Receipt className="mr-2 h-4 w-4" /> Rechnung generieren
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          {generatedOffer && !generatedInvoice && (
            <>
              <div className="border rounded-md p-4 bg-white">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{generatedOffer}</pre>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleDownload} className="flex-1 bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white">
                  <Download className="mr-2 h-4 w-4" /> Als Markdown herunterladen
                </Button>
                <Button onClick={handleSendByEmail} className="flex-1" variant="outline">
                  <Send className="mr-2 h-4 w-4" /> Per E-Mail senden
                </Button>
              </div>
            </>
          )}

          {generatedInvoice && (
            <>
              <div className="border rounded-md p-4 bg-white">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{generatedInvoice}</pre>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleDownloadInvoice} className="flex-1 bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white">
                  <Download className="mr-2 h-4 w-4" /> Als Markdown herunterladen
                </Button>
                <Button onClick={handleSendByEmail} className="flex-1" variant="outline">
                  <Send className="mr-2 h-4 w-4" /> Per E-Mail senden
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
