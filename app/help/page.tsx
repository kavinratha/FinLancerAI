"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import {
  HelpCircle,
  MessageSquare,
  Calculator,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  FileText,
  Lightbulb,
  Sparkles,
} from "lucide-react"

export default function HelpPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("about")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Nachricht gesendet",
        description: "Vielen Dank für deine Anfrage. Wir werden uns in Kürze bei dir melden.",
      })
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Hilfe & Support</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="about" className="flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            <span>Über FinLancer AI</span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>Support kontaktieren</span>
          </TabsTrigger>
        </TabsList>

        {/* Über FinLance AI */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Was ist FinLancer AI?</CardTitle>
              <CardDescription>
                Dein intelligenter Assistent für Stundensatzberechnung und Preisverhandlungen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[#7DD5D8]/10 p-4 rounded-lg border border-[#7DD5D8]/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#7DD5D8] mt-1" />
                  <div>
                    <h3 className="font-medium text-base mb-1">Dein KI-gestützter Finanzberater</h3>
                    <p className="text-sm text-gray-600">
                      FinLancer AI ist ein intelligenter Assistent, der speziell für Freelancer entwickelt wurde. Mit
                      Hilfe von künstlicher Intelligenz analysiert FinLancer AI Marktdaten, dein Profil und aktuelle
                      Trends, um dir einen optimalen Stundensatz zu empfehlen und dich bei Preisverhandlungen zu
                      unterstützen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-[#7DD5D8]" />
                      <CardTitle className="text-base">Stundensatzberechnung</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Basierend auf deinen Skills, deiner Erfahrung und aktuellen Marktdaten berechnet FinLance AI einen
                      optimalen Stundensatz für dich. Du erhältst detaillierte Einblicke in die Faktoren, die deinen
                      Stundensatz beeinflussen, und Tipps zur Steigerung.
                    </p>
                    <Button variant="link" className="text-[#7DD5D8] p-0 h-auto mt-2 text-sm">
                      Mehr erfahren <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#7DD5D8]" />
                      <CardTitle className="text-base">Verhandlungssimulator</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Übe Preisverhandlungen mit einem KI-Kunden und verbessere deine Verhandlungsfähigkeiten. Der
                      Simulator bietet verschiedene Szenarien und Schwierigkeitsgrade sowie Echtzeit-Feedback zu deiner
                      Verhandlungsstrategie.
                    </p>
                    <Button variant="link" className="text-[#7DD5D8] p-0 h-auto mt-2 text-sm">
                      Mehr erfahren <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#7DD5D8]" />
                      <CardTitle className="text-base">Argumentationshilfen</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Erhalte überzeugende Argumente, um deinen Stundensatz gegenüber Kunden zu rechtfertigen. Die KI
                      generiert personalisierte Argumentationshilfen basierend auf deinem Profil und deinem
                      Zielstundensatz.
                    </p>
                    <Button variant="link" className="text-[#7DD5D8] p-0 h-auto mt-2 text-sm">
                      Mehr erfahren <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#7DD5D8]" />
                      <CardTitle className="text-base">Angebotsgenerator</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Erstelle professionelle Angebote mit optimaler Preisgestaltung. Der Angebotsgenerator hilft dir,
                      überzeugende Angebote zu erstellen, die deine Expertise hervorheben und deinen Wert klar
                      kommunizieren.
                    </p>
                    <Button variant="link" className="text-[#7DD5D8] p-0 h-auto mt-2 text-sm">
                      Mehr erfahren <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-base mb-2">So funktioniert FinLance AI</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="bg-[#7DD5D8] text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong>Datenanalyse:</strong> FinLance AI analysiert aktuelle Marktdaten, Branchenstandards und
                      regionale Unterschiede.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-[#7DD5D8] text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong>Profilabgleich:</strong> Dein Profil (Skills, Erfahrung, bisherige Projekte) wird mit den
                      Marktdaten abgeglichen.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-[#7DD5D8] text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong>KI-Berechnung:</strong> Basierend auf diesen Daten berechnet die KI einen optimalen
                      Stundensatz und identifiziert Einflussfaktoren.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-[#7DD5D8] text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <strong>Personalisierte Empfehlungen:</strong> Du erhältst maßgeschneiderte Empfehlungen und Tipps
                      zur Steigerung deines Stundensatzes.
                    </div>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Häufig gestellte Fragen</CardTitle>
              <CardDescription>Antworten auf die häufigsten Fragen zu FinLancer AI</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Wie wird mein empfohlener Stundensatz berechnet?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600 mb-2">
                      Dein empfohlener Stundensatz wird basierend auf mehreren Faktoren berechnet:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>Deine Skills und Spezialisierungen</li>
                      <li>Deine Berufserfahrung in Jahren</li>
                      <li>Deine Region (unterschiedliche Märkte haben unterschiedliche Preisniveaus)</li>
                      <li>Aktuelle Marktdaten von freelance.de</li>
                      <li>Branchenspezifische Nachfrage und Trends</li>
                      <li>Vergleichsdaten von ähnlichen Freelancern</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                      Die KI gewichtet diese Faktoren und berechnet daraus einen optimalen Stundensatz sowie eine
                      empfohlene Preisspanne.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Wie realistisch ist der Verhandlungssimulator?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      Der Verhandlungssimulator wurde entwickelt, um realistische Verhandlungssituationen zu simulieren.
                      Er basiert auf tausenden echten Verhandlungsgesprächen und verwendet fortschrittliche KI, um
                      authentische Reaktionen zu generieren. Je nach gewähltem Schwierigkeitsgrad verhält sich der
                      simulierte Kunde unterschiedlich hartnäckig und setzt verschiedene Verhandlungstaktiken ein.
                      Obwohl keine Simulation die Komplexität echter menschlicher Interaktionen vollständig abbilden
                      kann, bietet der Simulator eine wertvolle Übungsumgebung, um Verhandlungsstrategien zu testen und
                      zu verbessern.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Sind meine Daten bei FinLancer AI sicher?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      Ja, der Schutz deiner Daten hat für uns höchste Priorität. FinLance AI verarbeitet deine Daten
                      gemäß der DSGVO und verwendet moderne Verschlüsselungstechnologien. In deinen
                      Datenschutzeinstellungen kannst du festlegen, welche Daten gespeichert werden und ob diese
                      anonymisiert werden sollen. Wir verwenden deine Daten ausschließlich, um dir personalisierte
                      Empfehlungen zu geben und die Genauigkeit unserer KI zu verbessern. Deine Daten werden niemals
                      ohne deine ausdrückliche Zustimmung an Dritte weitergegeben.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Kann ich FinLancer AI für verschiedene Branchen nutzen?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      Ja, FinLancer AI ist für Freelancer aus verschiedenen Branchen konzipiert. Die KI berücksichtigt
                      branchenspezifische Faktoren bei der Berechnung deines Stundensatzes und passt ihre Empfehlungen
                      entsprechend an. Zu den unterstützten Branchen gehören unter anderem:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mt-2">
                      <li>IT & Entwicklung</li>
                      <li>Design & Kreation</li>
                      <li>Marketing & Kommunikation</li>
                      <li>Text & Übersetzung</li>
                      <li>Beratung & Coaching</li>
                      <li>Und viele weitere</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Wie oft werden die Marktdaten aktualisiert?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      Die Marktdaten, auf denen FinLancer AI basiert, werden regelmäßig aktualisiert, um aktuelle Trends
                      und Entwicklungen zu berücksichtigen. Die Kerndaten werden wöchentlich aktualisiert, während
                      umfassendere Marktanalysen monatlich durchgeführt werden. In deinen Einstellungen kannst du
                      festlegen, wie oft dein empfohlener Stundensatz basierend auf den neuesten Daten aktualisiert
                      werden soll. Du kannst auch jederzeit manuell eine Aktualisierung anstoßen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Kann ich FinLancer AI kostenlos nutzen?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      FinLancer AI bietet sowohl kostenlose als auch kostenpflichtige Funktionen. Mit dem kostenlosen
                      Basisplan erhältst du Zugang zur grundlegenden Stundensatzberechnung und eingeschränkten
                      Verhandlungssimulationen. Für den vollen Funktionsumfang, einschließlich detaillierter Analysen,
                      unbegrenzter Verhandlungssimulationen, Argumentationshilfen und dem Angebotsgenerator, ist ein
                      Upgrade auf einen Premium-Plan erforderlich. Weitere Informationen zu unseren Plänen findest du
                      auf der Upgrade-Seite.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support kontaktieren */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Support kontaktieren</CardTitle>
              <CardDescription>Hast du Fragen oder benötigst du Hilfe? Kontaktiere unser Support-Team.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <form onSubmit={handleContactFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactFormChange}
                          placeholder="Dein Name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-Mail
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleContactFormChange}
                          placeholder="deine@email.de"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Betreff
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactFormChange}
                        placeholder="Worum geht es?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Nachricht
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        placeholder="Wie können wir dir helfen?"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="freelance-button-cta w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                    </Button>
                  </form>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-base mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Wir sind für dich da
                    </h3>
                    <p className="text-sm text-gray-600">
                      Unser Support-Team beantwortet deine Anfrage in der Regel innerhalb von 24 Stunden an Werktagen.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-base mb-2">Häufige Anfragen</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Button variant="link" className="text-[#7DD5D8] p-0 h-auto">
                          Ich benötige Hilfe bei der Einrichtung
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="text-[#7DD5D8] p-0 h-auto">
                          Mein Stundensatz scheint nicht korrekt
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="text-[#7DD5D8] p-0 h-auto">
                          Ich habe Feedback zur Verhandlungssimulation
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="text-[#7DD5D8] p-0 h-auto">
                          Ich möchte meinen Account löschen
                        </Button>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-medium text-base mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      Dringender Support
                    </h3>
                    <p className="text-sm text-yellow-700">
                      Bei dringenden Anfragen kannst du uns direkt unter <strong>support@finlancer.ai</strong>{" "}
                      kontaktieren oder während der Geschäftszeiten unter <strong>+49 123 456789</strong> anrufen.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
