"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Users,
  BarChart,
  CheckCircle2,
  Star,
  Clock,
  Rocket,
  ArrowUpRight,
  FileText,
  CheckSquare,
  Download,
  MessageSquare,
  CheckIcon as Checkbox,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

export default function RateIncreaseTips() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("strategies")
  const [savedTips, setSavedTips] = useState<string[]>([])

  const toggleSaveTip = (tipId: string) => {
    if (savedTips.includes(tipId)) {
      setSavedTips(savedTips.filter((id) => id !== tipId))
      toast({
        title: "Tipp entfernt",
        description: "Der Tipp wurde aus deinen gespeicherten Tipps entfernt.",
      })
    } else {
      setSavedTips([...savedTips, tipId])
      toast({
        title: "Tipp gespeichert",
        description: "Der Tipp wurde zu deinen gespeicherten Tipps hinzugefügt.",
      })
    }
  }

  // Animationsvarianten für die Karten
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#7DD5D8] to-[#5BBDC0] rounded-xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.7))]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 text-white">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">Premium-Funktion</Badge>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl font-bold">Stundensatz strategisch erhöhen</h1>
              <p className="text-white/90 text-lg">
                Entdecke bewährte Strategien, um deinen Stundensatz nachhaltig zu steigern und dein Einkommen als
                Freelancer zu maximieren.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> Einkommenssteigerung
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">
                  <Award className="w-3.5 h-3.5 mr-1" /> Positionierung
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">
                  <Users className="w-3.5 h-3.5 mr-1" /> Kundengewinnung
                </Badge>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[240px]">
              <h3 className="text-lg font-medium mb-3">Dein Fortschritt</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Gespeicherte Tipps</span>
                    <span>{savedTips.length}/15</span>
                  </div>
                  <Progress value={(savedTips.length / 15) * 100} className="h-2 bg-white/20" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Stundensatzpotenzial</span>
                    <span>+25%</span>
                  </div>
                  <Progress value={25} className="h-2 bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptinhalt */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="strategies">Strategien</TabsTrigger>
          <TabsTrigger value="case-studies">Erfolgsgeschichten</TabsTrigger>
          <TabsTrigger value="tools">Tools & Checklisten</TabsTrigger>
        </TabsList>

        {/* Strategien Tab */}
        <TabsContent value="strategies" className="space-y-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Spezialisierung */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#7DD5D8]" />
                        Spezialisierung
                      </CardTitle>
                      <CardDescription>Fokussiere dich auf Nischenbereiche für höhere Stundensätze</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+15-30%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium">Nischenexpertise aufbauen</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Identifiziere Bereiche mit hoher Nachfrage und geringem Angebot. Spezialisiere dich auf
                          komplexe Technologien oder Branchen mit hoher Zahlungsbereitschaft.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-blue-800 font-medium text-xs mb-1">Beispiel:</p>
                          <p className="text-blue-700 text-xs">
                            Ein React-Entwickler, der sich auf Fintech-Anwendungen mit strengen Sicherheitsanforderungen
                            spezialisiert, kann bis zu 30% höhere Stundensätze erzielen als ein allgemeiner
                            React-Entwickler.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-sm font-medium">T-Shaped Skills entwickeln</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Entwickle tiefe Expertise in einem Kernbereich (vertikaler Balken des T) und breites Wissen in
                          angrenzenden Bereichen (horizontaler Balken).
                        </p>
                        <div className="flex gap-2 mt-3">
                          <div className="flex-1 bg-gray-100 p-2 rounded text-center text-xs">Frontend-Spezialist</div>
                          <div className="flex-1 bg-gray-100 p-2 rounded text-center text-xs">+ UX-Design</div>
                          <div className="flex-1 bg-gray-100 p-2 rounded text-center text-xs">+ Performance</div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-sm font-medium">
                        Zertifizierungen & Weiterbildung
                      </AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Investiere in anerkannte Zertifizierungen und kontinuierliche Weiterbildung, um deine
                          Expertise zu belegen und zu vertiefen.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> AWS Certified
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> Google Cloud
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> Scrum Master
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> ITIL
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toggleSaveTip("specialization")}>
                    {savedTips.includes("specialization") ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Gespeichert
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tipp speichern
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Wertbasierte Preisgestaltung */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="w-5 h-5 text-[#7DD5D8]" />
                        Wertbasierte Preisgestaltung
                      </CardTitle>
                      <CardDescription>Preise nach dem geschaffenen Wert, nicht nach Zeit</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+20-40%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium">ROI-basierte Argumentation</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Kommuniziere den Return on Investment (ROI) deiner Arbeit. Zeige, wie deine Leistung dem
                          Kunden hilft, Geld zu sparen oder zu verdienen.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-blue-800 font-medium text-xs mb-1">Beispiel:</p>
                          <p className="text-blue-700 text-xs">
                            "Meine Optimierung der Conversion Rate hat dem letzten Kunden eine Umsatzsteigerung von 15%
                            gebracht. Bei Ihrem Umsatzvolumen wäre das ein zusätzlicher Gewinn von ca. 30.000€ pro
                            Jahr."
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-sm font-medium">Pakete statt Stundensätze</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Biete Festpreispakete an, die auf den Ergebnissen basieren, nicht auf der aufgewendeten Zeit.
                          Dies entkoppelt deinen Verdienst von deinem Zeitaufwand.
                        </p>
                        <div className="border rounded-md p-3 mt-2">
                          <h4 className="text-xs font-medium mb-1">Beispiel-Paket: Website-Relaunch</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Responsive Design
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              SEO-Optimierung
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Performance-Tuning
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Festpreis: 8.000€
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-sm font-medium">Ergebnisbasierte Boni</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Vereinbare zusätzliche Boni für überdurchschnittliche Ergebnisse oder das Erreichen bestimmter
                          KPIs.
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md mt-2">
                          <p className="text-xs">
                            Beispiel: Grundhonorar + 10% Bonus bei Erreichen der Conversion-Ziele oder Einhaltung des
                            Zeitplans.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toggleSaveTip("value-based-pricing")}>
                    {savedTips.includes("value-based-pricing") ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Gespeichert
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tipp speichern
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Positionierung & Branding */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#7DD5D8]" />
                        Positionierung & Branding
                      </CardTitle>
                      <CardDescription>Baue eine starke persönliche Marke auf</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+10-25%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium">Thought Leadership</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Positioniere dich als Experte durch Fachbeiträge, Vorträge und aktive Teilnahme in relevanten
                          Communities.
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <div className="bg-gray-100 p-2 rounded text-center text-xs">Blog</div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs">Podcast</div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs">Webinare</div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-sm font-medium">Professionelle Online-Präsenz</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Investiere in eine hochwertige Website, optimiere dein LinkedIn-Profil und pflege eine
                          konsistente Markenidentität.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-blue-800 font-medium text-xs mb-1">Tipp:</p>
                          <p className="text-blue-700 text-xs">
                            Nutze Testimonials und Case Studies, um deine Erfolge zu dokumentieren. 83% der Kunden
                            prüfen Online-Bewertungen, bevor sie eine Kaufentscheidung treffen.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-sm font-medium">Premium-Positionierung</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Positioniere dich bewusst im Premium-Segment. Kommuniziere Qualität, Zuverlässigkeit und
                          Expertise statt günstiger Preise.
                        </p>
                        <div className="mt-2 p-3 border rounded-md">
                          <h4 className="text-xs font-medium mb-1">Elemente der Premium-Positionierung:</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Hochwertiges Branding
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Exzellenter Service
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Selektive Projektauswahl
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Fokus auf Mehrwert statt Preis
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toggleSaveTip("branding")}>
                    {savedTips.includes("branding") ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Gespeichert
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tipp speichern
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Weiterbildung & Zertifizierungen */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#7DD5D8]" />
                        Weiterbildung & Zertifizierungen
                      </CardTitle>
                      <CardDescription>Investiere in deine Fähigkeiten und Expertise</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+10-20%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium">Relevante Zertifizierungen</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Identifiziere Zertifizierungen, die in deiner Branche anerkannt sind und einen echten Mehrwert
                          bieten.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> AWS Certified
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> Google Analytics
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> Scrum Master
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center text-xs flex items-center justify-center">
                            <Award className="w-3 h-3 mr-1" /> Adobe Expert
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-sm font-medium">Kontinuierliche Weiterbildung</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Halte dich durch regelmäßige Weiterbildung auf dem neuesten Stand und erweitere dein Skillset
                          strategisch.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-blue-800 font-medium text-xs mb-1">Tipp:</p>
                          <p className="text-blue-700 text-xs">
                            Reserviere 5-10% deiner Arbeitszeit für Weiterbildung und betrachte es als Investition in
                            höhere Stundensätze.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-sm font-medium">Spezialisierte Kurse</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Investiere in hochwertige, spezialisierte Kurse, die dir einen Wettbewerbsvorteil verschaffen.
                        </p>
                        <div className="mt-2 p-3 border rounded-md">
                          <h4 className="text-xs font-medium mb-1">Beispiele:</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Masterclass von Branchenexperten
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Spezialisierte Online-Kurse
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Workshops zu Zukunftstechnologien
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toggleSaveTip("education")}>
                    {savedTips.includes("education") ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Gespeichert
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tipp speichern
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Langfristige Kundenbeziehungen */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#7DD5D8]" />
                        Langfristige Kundenbeziehungen
                      </CardTitle>
                      <CardDescription>Baue dauerhafte Partnerschaften auf</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+10-20%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium">Retainer-Modelle</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Biete monatliche Retainer-Pakete an, die dem Kunden Planungssicherheit geben und dir
                          regelmäßige Einnahmen sichern.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-blue-800 font-medium text-xs mb-1">Beispiel:</p>
                          <p className="text-blue-700 text-xs">
                            Monatliches Paket mit 20 Stunden für 2.000€ (100€/h) statt Einzelbuchungen zu 90€/h.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-sm font-medium">Upselling & Cross-Selling</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Biete bestehenden Kunden zusätzliche Dienstleistungen oder Erweiterungen an, die ihren
                          Mehrwert erhöhen.
                        </p>
                        <div className="mt-2 p-3 border rounded-md">
                          <h4 className="text-xs font-medium mb-1">Beispiele:</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Wartungsverträge nach Projektabschluss
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Regelmäßige Schulungen für das Team
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Erweiterungsmodule für bestehende Lösungen
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-sm font-medium">Strategische Partnerschaften</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Entwickle dich vom Dienstleister zum strategischen Partner, der aktiv an der
                          Geschäftsentwicklung des Kunden beteiligt ist.
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md mt-2">
                          <p className="text-xs">
                            Biete regelmäßige Strategie-Meetings an, in denen du nicht nur über aktuelle Projekte
                            sprichst, sondern auch über langfristige Ziele und Herausforderungen des Kunden.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toggleSaveTip("client-relationships")}>
                    {savedTips.includes("client-relationships") ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Gespeichert
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tipp speichern
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Effizienzsteigerung */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#7DD5D8]" />
                        Effizienzsteigerung
                      </CardTitle>
                      <CardDescription>Erhöhe deinen effektiven Stundensatz</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+15-25%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium">Prozessoptimierung</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Standardisiere wiederkehrende Aufgaben und entwickle effiziente Workflows, um mehr in weniger
                          Zeit zu erledigen.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-blue-800 font-medium text-xs mb-1">Tipp:</p>
                          <p className="text-blue-700 text-xs">
                            Erstelle Vorlagen, Checklisten und Standardprozesse für typische Projektphasen. Dies spart
                            Zeit und erhöht die Qualität.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-sm font-medium">Automatisierung</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Identifiziere Aufgaben, die automatisiert werden können, und investiere in entsprechende Tools
                          und Technologien.
                        </p>
                        <div className="mt-2 p-3 border rounded-md">
                          <h4 className="text-xs font-medium mb-1">Beispiele:</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Automatisierte Tests
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              CI/CD-Pipelines
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Automatisierte Reporting-Tools
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-sm font-medium">Delegation & Teamarbeit</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mb-2">
                          Delegiere Aufgaben mit niedrigerem Wertbeitrag an Junior-Freelancer oder Assistenten, um dich
                          auf hochwertige Tätigkeiten zu konzentrieren.
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md mt-2">
                          <p className="text-xs">
                            Beispiel: Ein Senior-Entwickler mit einem Stundensatz von 100€ delegiert Basis-Coding an
                            einen Junior für 50€/h und konzentriert sich auf Architektur und komplexe Probleme.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toggleSaveTip("efficiency")}>
                    {savedTips.includes("efficiency") ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Gespeichert
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tipp speichern
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          {/* Aktionsplan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#7DD5D8]" />
                Dein 90-Tage-Aktionsplan zur Stundensatzerhöhung
              </CardTitle>
              <CardDescription>
                Konkrete Schritte, um deinen Stundensatz in den nächsten 3 Monaten zu steigern
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Phase 1: Analyse & Vorbereitung (Woche 1-2)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          1
                        </div>
                        <h4 className="text-sm font-medium">Marktanalyse durchführen</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Recherchiere aktuelle Stundensätze in deiner Branche und Nische. Nutze Plattformen wie
                        freelance.de, XING und LinkedIn.
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          2
                        </div>
                        <h4 className="text-sm font-medium">Portfolio analysieren</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Identifiziere deine erfolgreichsten Projekte und die Bereiche, in denen du den größten Mehrwert
                        lieferst.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Phase 2: Positionierung & Branding (Woche 3-6)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          3
                        </div>
                        <h4 className="text-sm font-medium">Online-Präsenz optimieren</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Aktualisiere deine Website und Profile mit Fokus auf deine Spezialisierung und den Mehrwert, den
                        du bietest.
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          4
                        </div>
                        <h4 className="text-sm font-medium">Case Studies erstellen</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Dokumentiere 2-3 erfolgreiche Projekte mit messbaren Ergebnissen und Kundenaussagen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Phase 3: Angebots- & Preisstruktur (Woche 7-8)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          5
                        </div>
                        <h4 className="text-sm font-medium">Wertbasierte Pakete entwickeln</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Erstelle 2-3 Dienstleistungspakete mit klarem Mehrwert und Festpreisen statt reiner
                        Stundensätze.
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          6
                        </div>
                        <h4 className="text-sm font-medium">Preiserhöhungsstrategie festlegen</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Definiere neue Stundensätze für verschiedene Kundengruppen (Neukunden vs. Bestandskunden).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Phase 4: Umsetzung & Kommunikation (Woche 9-12)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          7
                        </div>
                        <h4 className="text-sm font-medium">Preiserhöhung kommunizieren</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Informiere Bestandskunden über deine neuen Preise mit angemessenem Vorlauf und klarer Begründung
                        des Mehrwerts.
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#7DD5D8]/20 text-[#7DD5D8] rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          8
                        </div>
                        <h4 className="text-sm font-medium">Neue Kunden akquirieren</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Starte gezielte Akquise bei Wunschkunden mit deiner neuen Positionierung und Preisstruktur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white">
                <FileText className="w-4 h-4 mr-2" />
                Aktionsplan als PDF herunterladen
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Erfolgsgeschichten Tab */}
        <TabsContent value="case-studies" className="space-y-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Erfolgsgeschichte 1 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Von 65€ auf 110€ in 8 Monaten</CardTitle>
                    <Badge className="bg-green-100 text-green-800">+69%</Badge>
                  </div>
                  <CardDescription>Frontend-Entwickler, 4 Jahre Erfahrung</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      MS
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Markus S.</h3>
                      <p className="text-xs text-gray-500">React & TypeScript Spezialist</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ausgangssituation</h3>
                    <p className="text-sm text-gray-600">
                      "Ich arbeitete als allgemeiner Frontend-Entwickler für verschiedene Kunden und hatte
                      Schwierigkeiten, meinen Stundensatz über 65€ zu erhöhen. Die Kunden verglichen mich ständig mit
                      günstigeren Alternativen."
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Strategie</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Spezialisierung auf E-Commerce</p>
                          <p className="text-xs text-gray-600">
                            Fokus auf React-basierte Shopify- und WooCommerce-Lösungen
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Expertise durch Content Marketing</p>
                          <p className="text-xs text-gray-600">
                            Veröffentlichung von Fachartikeln und Open-Source-Komponenten
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Wertbasierte Preisgestaltung</p>
                          <p className="text-xs text-gray-600">
                            Umstellung auf Pakete mit Fokus auf Conversion-Optimierung
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ergebnis</h3>
                    <p className="text-sm text-gray-600">
                      "Nach 8 Monaten konnte ich meinen Stundensatz auf 110€ erhöhen. Ich habe jetzt eine Warteliste von
                      Kunden und kann mir die Projekte aussuchen, die mich wirklich interessieren."
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Vollständige Fallstudie lesen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Erfolgsgeschichte 2 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Vom Stundensatz zum Retainer-Modell</CardTitle>
                    <Badge className="bg-green-100 text-green-800">+120%</Badge>
                  </div>
                  <CardDescription>UX/UI Designer, 6 Jahre Erfahrung</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      LK
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Laura K.</h3>
                      <p className="text-xs text-gray-500">UX/UI Designer für SaaS-Produkte</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ausgangssituation</h3>
                    <p className="text-sm text-gray-600">
                      "Ich arbeitete projektbasiert mit einem Stundensatz von 75€. Mein Einkommen schwankte stark und
                      ich verbrachte viel Zeit mit der Akquise neuer Projekte."
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Strategie</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Spezialisierung auf SaaS-Produkte</p>
                          <p className="text-xs text-gray-600">Fokus auf User Experience für B2B-Software</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Einführung von Retainer-Modellen</p>
                          <p className="text-xs text-gray-600">Monatliche Design-Abonnements statt Einzelprojekte</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Strategische Partnerschaften</p>
                          <p className="text-xs text-gray-600">
                            Zusammenarbeit mit Entwicklungsteams für Komplettlösungen
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ergebnis</h3>
                    <p className="text-sm text-gray-600">
                      "Ich habe jetzt drei langfristige Retainer-Kunden, die mir ein stabiles monatliches Einkommen
                      sichern. Mein effektiver Stundensatz liegt bei 165€, und ich habe deutlich weniger
                      Akquiseaufwand."
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Vollständige Fallstudie lesen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Erfolgsgeschichte 3 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Vom Generalist zum Experten</CardTitle>
                    <Badge className="bg-green-100 text-green-800">+85%</Badge>
                  </div>
                  <CardDescription>Backend-Entwickler, 3 Jahre Erfahrung</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      TM
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Thomas M.</h3>
                      <p className="text-xs text-gray-500">Spezialist für Zahlungssysteme</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ausgangssituation</h3>
                    <p className="text-sm text-gray-600">
                      "Als allgemeiner Node.js-Entwickler lag mein Stundensatz bei 70€. Ich hatte viele Konkurrenten und
                      musste oft über den Preis verhandeln."
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Strategie</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Spezialisierung auf Zahlungssysteme</p>
                          <p className="text-xs text-gray-600">Fokus auf Stripe, PayPal und SEPA-Integration</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Zertifizierungen erwerben</p>
                          <p className="text-xs text-gray-600">Stripe Certified Partner und AWS-Zertifizierungen</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Open-Source-Beiträge</p>
                          <p className="text-xs text-gray-600">
                            Entwicklung von Bibliotheken für Zahlungsintegrationen
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ergebnis</h3>
                    <p className="text-sm text-gray-600">
                      "Innerhalb eines Jahres konnte ich meinen Stundensatz auf 130€ erhöhen. Kunden suchen mich jetzt
                      gezielt wegen meiner Spezialisierung, und ich werde regelmäßig weiterempfohlen."
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Vollständige Fallstudie lesen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Erfolgsgeschichte 4 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Vom Freelancer zur Boutique-Agentur</CardTitle>
                    <Badge className="bg-green-100 text-green-800">+150%</Badge>
                  </div>
                  <CardDescription>Full-Stack-Entwickler, 7 Jahre Erfahrung</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      SK
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Stefan K.</h3>
                      <p className="text-xs text-gray-500">Gründer von DigitalCraft Solutions</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ausgangssituation</h3>
                    <p className="text-sm text-gray-600">
                      "Als Einzelkämpfer hatte ich einen Stundensatz von 85€ und stieß an meine Kapazitätsgrenzen. Ich
                      konnte nicht mehr Projekte annehmen, ohne die Qualität zu gefährden."
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Strategie</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Aufbau eines Freelancer-Netzwerks</p>
                          <p className="text-xs text-gray-600">Zusammenarbeit mit spezialisierten Freelancern</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Positionierung als Boutique-Agentur</p>
                          <p className="text-xs text-gray-600">Fokus auf hochwertige, maßgeschneiderte Lösungen</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Projektbasierte Preisgestaltung</p>
                          <p className="text-xs text-gray-600">
                            Umstellung von Stundensätzen auf wertbasierte Festpreise
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Ergebnis</h3>
                    <p className="text-sm text-gray-600">
                      "Mein effektiver Stundensatz liegt jetzt bei über 200€. Ich koordiniere Projekte und konzentriere
                      mich auf Strategie und Architektur, während mein Netzwerk die Umsetzung übernimmt."
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Vollständige Fallstudie lesen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          {/* Statistiken */}
          <Card>
            <CardHeader>
              <CardTitle>Stundensatzentwicklung nach Branche und Erfahrung</CardTitle>
              <CardDescription>Durchschnittliche Steigerung nach Umsetzung der empfohlenen Strategien</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Nach Branche</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Webentwicklung</span>
                        <span>+35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>UX/UI Design</span>
                        <span>+42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Mobile App Entwicklung</span>
                        <span>+38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>DevOps & Cloud</span>
                        <span>+45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Datenanalyse & KI</span>
                        <span>+52%</span>
                      </div>
                      <Progress value={52} className="h-2" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Nach Erfahrungslevel</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Junior (1-2 Jahre)</span>
                        <span>+25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Mid-Level (3-5 Jahre)</span>
                        <span>+38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Senior (6-9 Jahre)</span>
                        <span>+45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Expert (10+ Jahre)</span>
                        <span>+32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tools & Checklisten Tab */}
        <TabsContent value="tools" className="space-y-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Portfolio-Optimierung */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#7DD5D8]" />
                    Portfolio-Optimierung
                  </CardTitle>
                  <CardDescription>
                    Präsentiere deine Arbeit so, dass sie höhere Stundensätze rechtfertigt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">1. Fallstudien erstellen</h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          Dokumentiere deine erfolgreichsten Projekte mit messbaren Ergebnissen und Kundenaussagen.
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <h4 className="text-xs font-medium mb-1">Elemente einer guten Fallstudie:</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Ausgangssituation & Herausforderung
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Lösungsansatz & Umsetzung
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Messbare Ergebnisse & ROI
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Kundenaussagen & Testimonials
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">2. Visuelle Präsentation</h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          Investiere in hochwertiges Design und professionelle Darstellung deiner Arbeit.
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <h4 className="text-xs font-medium mb-1">Optimierungstipps:</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Professionelle Fotos & Screenshots
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Konsistentes Branding & Design
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Übersichtliche Datenvisualisierung
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Responsive & moderne Website
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">3. Zielgruppenorientierung</h3>
                      <div className="space-y-2">
                        <p className="text-sm">Passe dein Portfolio an deine Wunschkunden und -projekte an.</p>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <h4 className="text-xs font-medium mb-1">Strategien:</h4>
                          <ul className="text-xs space-y-1">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Branchenspezifische Portfolios
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Hervorhebung relevanter Projekte
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Anpassung der Sprache & Begriffe
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                              Fokus auf Probleme der Zielgruppe
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Portfolio-Checkliste herunterladen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Checkliste: Stundensatzerhöhung */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-[#7DD5D8]" />
                    Checkliste: Stundensatzerhöhung
                  </CardTitle>
                  <CardDescription>Schritt-für-Schritt-Anleitung zur Erhöhung deines Stundensatzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-1" />
                      <div>
                        <Label htmlFor="item-1" className="text-sm font-medium">
                          Marktrecherche durchführen
                        </Label>
                        <p className="text-xs text-gray-500">
                          Recherchiere aktuelle Stundensätze für deine Nische und Erfahrungsstufe.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-2" />
                      <div>
                        <Label htmlFor="item-2" className="text-sm font-medium">
                          Spezialisierung definieren
                        </Label>
                        <p className="text-xs text-gray-500">
                          Identifiziere deine Kernkompetenzen und Nischenbereiche mit hoher Nachfrage
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-3" />
                      <div>
                        <Label htmlFor="item-3" className="text-sm font-medium">
                          Portfolio aktualisieren
                        </Label>
                        <p className="text-xs text-gray-500">
                          Überarbeite dein Portfolio mit Fokus auf deine Spezialisierung und Erfolgsgeschichten.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-4" />
                      <div>
                        <Label htmlFor="item-4" className="text-sm font-medium">
                          Preisstruktur entwickeln
                        </Label>
                        <p className="text-xs text-gray-500">
                          Erstelle verschiedene Preismodelle (Stundensatz, Pakete, Retainer) für unterschiedliche
                          Kundengruppen.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-5" />
                      <div>
                        <Label htmlFor="item-5" className="text-sm font-medium">
                          Kommunikationsstrategie planen
                        </Label>
                        <p className="text-xs text-gray-500">
                          Formuliere überzeugende Argumente für deinen neuen Stundensatz und übe Preisverhandlungen.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-6" />
                      <div>
                        <Label htmlFor="item-6" className="text-sm font-medium">
                          Bestandskunden informieren
                        </Label>
                        <p className="text-xs text-gray-500">
                          Kommuniziere Preiserhöhungen rechtzeitig und mit klarer Begründung des Mehrwerts.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-7" />
                      <div>
                        <Label htmlFor="item-7" className="text-sm font-medium">
                          Neue Kunden akquirieren
                        </Label>
                        <p className="text-xs text-gray-500">
                          Starte gezielte Akquise bei Wunschkunden mit deiner neuen Positionierung und Preisstruktur.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="item-8" />
                      <div>
                        <Label htmlFor="item-8" className="text-sm font-medium">
                          Ergebnisse analysieren
                        </Label>
                        <p className="text-xs text-gray-500">
                          Überprüfe regelmäßig die Auswirkungen deiner Preiserhöhung auf Kundenzufriedenheit und
                          Einkommen.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Checkliste als PDF herunterladen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Content-Marketing-Strategie */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#7DD5D8]" />
                    Content-Marketing-Strategie
                  </CardTitle>
                  <CardDescription>Positioniere dich als Experte durch wertvolle Inhalte</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">1. Fachbeiträge & Artikel</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm">
                          Veröffentliche regelmäßig Fachartikel auf deiner Website, auf Plattformen wie Medium oder in
                          Branchenpublikationen, um deine Expertise zu demonstrieren.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">2. Video & Podcast</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm">
                          Erstelle Video-Tutorials oder starte einen Podcast zu deinem Fachgebiet. Diese Formate bauen
                          besonders effektiv Vertrauen und Autorität auf.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">3. Webinare & Online-Kurse</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm">
                          Biete kostenlose Webinare oder kostenpflichtige Online-Kurse an, um dein Wissen zu teilen und
                          gleichzeitig deine Positionierung als Experte zu stärken.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">4. Social Media Strategie</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm">
                          Teile regelmäßig wertvolle Inhalte auf LinkedIn, Twitter oder anderen relevanten Plattformen.
                          Konzentriere dich auf Qualität statt Quantität.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Content-Kalender-Vorlage herunterladen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
