"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Save,
  RefreshCw,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Search,
  LinkIcon,
  FileText,
  Clock,
  Calendar,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

// Mock-Daten für Projekte von freelance.de
const mockProjects = [
  {
    id: "p1",
    title: "Entwicklung einer E-Commerce Plattform",
    client: "Online Shop GmbH",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    budget: "10.000 - 15.000 €",
    duration: "3 Monate",
    description:
      "Entwicklung einer modernen E-Commerce Plattform mit Produktkatalog, Warenkorb und Zahlungsabwicklung.",
    status: "Offen",
    link: "#",
    avgRate: 85,
  },
  {
    id: "p2",
    title: "Mobile App für Finanzdienstleister",
    client: "FinTech AG",
    skills: ["React Native", "TypeScript", "Firebase"],
    budget: "20.000 - 25.000 €",
    duration: "4 Monate",
    description: "Entwicklung einer nativen App für iOS und Android zur Verwaltung von Finanzprodukten.",
    status: "Offen",
    link: "#",
    avgRate: 95,
  },
  {
    id: "p3",
    title: "Website-Relaunch für Industrieunternehmen",
    client: "Industrie Solutions GmbH",
    skills: ["WordPress", "PHP", "SEO", "UI/UX"],
    budget: "5.000 - 8.000 €",
    duration: "2 Monate",
    description: "Kompletter Relaunch der Unternehmenswebsite mit modernem Design und CMS.",
    status: "Offen",
    link: "#",
    avgRate: 75,
  },
]

// Mock-Daten für vorherige Projekte des Freelancers
const previousProjects = [
  {
    id: "pp1",
    title: "CRM-System für Vertriebsteam",
    client: "Sales Pro GmbH",
    skills: ["React", "Node.js", "MongoDB"],
    duration: "Jan 2023 - Apr 2023",
    hourlyRate: 85,
  },
  {
    id: "pp2",
    title: "Webshop-Optimierung",
    client: "Fashion Store",
    skills: ["Shopify", "JavaScript", "SEO"],
    duration: "Jun 2023 - Aug 2023",
    hourlyRate: 80,
  },
  {
    id: "pp3",
    title: "Intranet-Entwicklung",
    client: "Corporate Services AG",
    skills: ["React", "TypeScript", "GraphQL"],
    duration: "Sep 2023 - Dez 2023",
    hourlyRate: 90,
  },
]

// Mock-Daten für CV-Skills
const cvSkills = [
  { name: "React", level: "Experte", years: 4 },
  { name: "TypeScript", level: "Fortgeschritten", years: 3 },
  { name: "Node.js", level: "Fortgeschritten", years: 3 },
  { name: "AWS", level: "Mittel", years: 2 },
  { name: "MongoDB", level: "Fortgeschritten", years: 3 },
]

export default function RateDetails() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("project")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [calculatedRate, setCalculatedRate] = useState<number | null>(null)
  const [rateRange, setRateRange] = useState<[number, number] | null>(null)
  const [usePreviousRates, setUsePreviousRates] = useState(true)
  const [useMarketData, setUseMarketData] = useState(true)
  const [useSkillsData, setUseSkillsData] = useState(true)
  const [complexity, setComplexity] = useState(3)
  const [urgency, setUrgency] = useState(2)
  const [customRate, setCustomRate] = useState<number | null>(null)
  const [insights, setInsights] = useState<string[]>([])
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [showManualProjectForm, setShowManualProjectForm] = useState(false)
  const [manualProject, setManualProject] = useState({
    title: "",
    client: "",
    skills: [] as string[],
    budget: "",
    duration: "",
    description: "",
  })
  const [manualSkill, setManualSkill] = useState("")

  // Simuliere Ladezeit
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Filtere Projekte basierend auf Suchbegriff
  const filteredProjects = mockProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Berechne Stundensatz basierend auf ausgewähltem Projekt und Einstellungen
  useEffect(() => {
    if (selectedProject) {
      const project = mockProjects.find((p) => p.id === selectedProject)
      if (project) {
        let baseRate = project.avgRate

        // Berücksichtige vorherige Projekte, wenn aktiviert
        if (usePreviousRates) {
          const avgPreviousRate = previousProjects.reduce((sum, p) => sum + p.hourlyRate, 0) / previousProjects.length
          baseRate = (baseRate + avgPreviousRate) / 2
        }

        // Berücksichtige Komplexität (1-5)
        const complexityFactor = 1 + (complexity - 3) * 0.05
        baseRate = baseRate * complexityFactor

        // Berücksichtige Dringlichkeit (1-5)
        const urgencyFactor = 1 + (urgency - 3) * 0.03
        baseRate = baseRate * urgencyFactor

        // Runde auf ganze Zahlen
        baseRate = Math.round(baseRate)

        // Setze berechneten Stundensatz
        setCalculatedRate(baseRate)

        // Setze Stundensatzbereich (±10%)
        setRateRange([Math.round(baseRate * 0.9), Math.round(baseRate * 1.1)])
      }
    }
  }, [selectedProject, usePreviousRates, useMarketData, useSkillsData, complexity, urgency])

  // Generiere KI-Insights basierend auf den Parametern
  const generateInsights = () => {
    setIsGeneratingInsights(true)

    // Simuliere eine API-Anfrage an einen KI-Dienst
    setTimeout(() => {
      const project = mockProjects.find((p) => p.id === selectedProject)

      if (project) {
        const generatedInsights = [
          `Für Projekte wie "${project.title}" liegt der durchschnittliche Stundensatz bei ${project.avgRate}€.`,
          `Deine Erfahrung mit ${project.skills.slice(0, 2).join(", ")} rechtfertigt einen Stundensatz von ${calculatedRate}€.`,
          `Ähnliche Freelancer mit deinem Profil berechnen zwischen ${rateRange?.[0]}€ und ${rateRange?.[1]}€ pro Stunde.`,
          `Die aktuelle Nachfrage nach ${project.skills[0]}-Entwicklern ist hoch, was deinen Stundensatz positiv beeinflusst.`,
          `Basierend auf deinen vorherigen Projekten könntest du für dieses Projekt einen um 5-10% höheren Satz ansetzen.`,
        ]

        setInsights(generatedInsights)
      }

      setIsGeneratingInsights(false)

      toast({
        title: "KI-Insights generiert",
        description: "Die KI hat neue Insights zu deinem Stundensatz generiert.",
      })
    }, 1500)
  }

  // Speichere den angepassten Stundensatz
  const handleSave = () => {
    toast({
      title: "Stundensatz gespeichert",
      description: `Dein Stundensatz von ${customRate || calculatedRate}€ wurde für das Projekt gespeichert.`,
    })
  }

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && manualSkill.trim()) {
      e.preventDefault()
      setManualProject({
        ...manualProject,
        skills: [...manualProject.skills, manualSkill.trim()],
      })
      setManualSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setManualProject({
      ...manualProject,
      skills: manualProject.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleCreateManualProject = () => {
    // Validiere, dass mindestens Titel und Client ausgefüllt sind
    if (!manualProject.title || !manualProject.client) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte fülle mindestens Projekttitel und Kunde aus.",
        variant: "destructive",
      })
      return
    }

    // Erstelle eine eindeutige ID für das manuelle Projekt
    const manualProjectId = `manual-${Date.now()}`

    // Füge das manuelle Projekt zu den gefilterten Projekten hinzu
    const newProject = {
      id: manualProjectId,
      title: manualProject.title,
      client: manualProject.client,
      skills: manualProject.skills,
      budget: manualProject.budget || "Nicht angegeben",
      duration: manualProject.duration || "Nicht angegeben",
      description: manualProject.description || "Keine Beschreibung vorhanden",
      status: "Manuell",
      link: "#",
      avgRate: 85, // Standardwert
    }

    // Setze das neue Projekt als ausgewählt
    setSelectedProject(manualProjectId)

    // Verstecke das Formular
    setShowManualProjectForm(false)

    // Wechsle zum nächsten Tab
    setActiveTab("calculate")

    toast({
      title: "Projekt erstellt",
      description: "Dein manuelles Projekt wurde erstellt und ausgewählt.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Stundensatz mit KI berechnen</h1>
        </div>

        <div className="flex gap-2">
          <Button className="freelance-button-cta flex items-center gap-1" onClick={handleSave}>
            <Save className="w-4 h-4" />
            <span>Speichern</span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="project">Projekt auswählen</TabsTrigger>
              <TabsTrigger value="calculate">Stundensatz berechnen</TabsTrigger>
              <TabsTrigger value="insights">KI-Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="project" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Projekt für Stundensatzberechnung auswählen</CardTitle>
                  <CardDescription>
                    Wähle ein Projekt von freelance.de, für das du einen Stundensatz berechnen möchtest.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Projekte durchsuchen..."
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="ml-2 whitespace-nowrap"
                        onClick={() => setShowManualProjectForm(true)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Manuelles Projekt
                      </Button>
                    </div>

                    {showManualProjectForm && (
                      <Card className="mb-4">
                        <CardHeader className="pb-2">
                          <CardTitle>Manuelles Projekt erstellen</CardTitle>
                          <CardDescription>
                            Gib die Details deines Projekts ein, um einen Stundensatz zu berechnen.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="project-title">Projekttitel *</Label>
                                <Input
                                  id="project-title"
                                  value={manualProject.title}
                                  onChange={(e) => setManualProject({ ...manualProject, title: e.target.value })}
                                  placeholder="z.B. Website-Entwicklung"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="project-client">Kunde *</Label>
                                <Input
                                  id="project-client"
                                  value={manualProject.client}
                                  onChange={(e) => setManualProject({ ...manualProject, client: e.target.value })}
                                  placeholder="z.B. Musterfirma GmbH"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="project-skills">Skills</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="project-skills"
                                  value={manualSkill}
                                  onChange={(e) => setManualSkill(e.target.value)}
                                  onKeyDown={addSkill}
                                  placeholder="Skill eingeben und Enter drücken"
                                />
                              </div>
                              {manualProject.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {manualProject.skills.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="bg-gray-100 flex items-center gap-1"
                                    >
                                      {skill}
                                      <button
                                        onClick={() => removeSkill(skill)}
                                        className="ml-1 text-gray-500 hover:text-gray-700"
                                      >
                                        ×
                                      </button>
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="project-budget">Budget</Label>
                                <Input
                                  id="project-budget"
                                  value={manualProject.budget}
                                  onChange={(e) => setManualProject({ ...manualProject, budget: e.target.value })}
                                  placeholder="z.B. 5.000 - 10.000 €"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="project-duration">Dauer</Label>
                                <Input
                                  id="project-duration"
                                  value={manualProject.duration}
                                  onChange={(e) => setManualProject({ ...manualProject, duration: e.target.value })}
                                  placeholder="z.B. 2 Monate"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="project-description">Beschreibung</Label>
                              <Textarea
                                id="project-description"
                                value={manualProject.description}
                                onChange={(e) => setManualProject({ ...manualProject, description: e.target.value })}
                                placeholder="Beschreibe das Projekt kurz..."
                                rows={3}
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setShowManualProjectForm(false)}>
                            Abbrechen
                          </Button>
                          <Button
                            onClick={handleCreateManualProject}
                            className="bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white"
                          >
                            Projekt erstellen
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    <div className="space-y-3 mt-4">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <div
                            key={project.id}
                            className={`border rounded-md p-4 cursor-pointer transition-all ${
                              selectedProject === project.id
                                ? "border-[#7DD5D8] bg-[#7DD5D8]/5"
                                : "hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedProject(project.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-base">{project.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{project.client}</p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {project.status}
                              </Badge>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1">
                              {project.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="bg-gray-100">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-1 text-gray-600">
                                <FileText className="w-3.5 h-3.5" />
                                <span>Budget: {project.budget}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Dauer: {project.duration}</span>
                              </div>
                            </div>

                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex items-center gap-1 text-[#7DD5D8]">
                                <LinkIcon className="w-3.5 h-3.5" />
                                <Link href={project.link} className="text-sm hover:underline">
                                  Zum Projekt
                                </Link>
                              </div>
                              {selectedProject === project.id && <CheckCircle className="w-5 h-5 text-[#7DD5D8]" />}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Keine Projekte gefunden.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    {filteredProjects.length} {filteredProjects.length === 1 ? "Projekt" : "Projekte"} gefunden
                  </p>
                  <Button
                    onClick={() => setActiveTab("calculate")}
                    disabled={!selectedProject}
                    className="bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white"
                  >
                    Weiter zur Berechnung
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="calculate" className="space-y-4">
              {selectedProject ? (
                <>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Stundensatz für dein Projekt</CardTitle>
                          <CardDescription>
                            Basierend auf deinem Profil, vorherigen Projekten und Marktdaten.
                          </CardDescription>
                        </div>
                        <div className="bg-[#7DD5D8]/20 text-[#333333] text-xs px-2 py-1 rounded-full flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          <span>KI-optimiert</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Empfohlener Stundensatz</div>
                          <div className="text-5xl font-bold text-gray-800">{calculatedRate} €</div>
                          {rateRange && (
                            <div className="text-sm text-gray-500 mt-2">
                              Empfohlene Spanne: {rateRange[0]} € - {rateRange[1]} €
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="custom-rate" className="text-base font-medium">
                              Angepasster Stundensatz
                            </Label>
                            <div className="flex items-center">
                              <Input
                                id="custom-rate"
                                type="number"
                                className="w-24 text-right"
                                value={customRate !== null ? customRate : calculatedRate || ""}
                                onChange={(e) => setCustomRate(Number(e.target.value))}
                              />
                              <span className="ml-2">€ / Stunde</span>
                            </div>
                          </div>

                          <div className="space-y-4 pt-2">
                            <h3 className="text-sm font-medium">Datenquellen für die Berechnung</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <Label htmlFor="previous-rates" className="text-sm">
                                    Vorherige Projekte berücksichtigen
                                  </Label>
                                </div>
                                <Switch
                                  id="previous-rates"
                                  checked={usePreviousRates}
                                  onCheckedChange={setUsePreviousRates}
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4 text-gray-500" />
                                  <Label htmlFor="market-data" className="text-sm">
                                    Aktuelle Marktdaten einbeziehen
                                  </Label>
                                </div>
                                <Switch id="market-data" checked={useMarketData} onCheckedChange={setUseMarketData} />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                  <Label htmlFor="skills-data" className="text-sm">
                                    Skills aus CV berücksichtigen
                                  </Label>
                                </div>
                                <Switch id="skills-data" checked={useSkillsData} onCheckedChange={setUseSkillsData} />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 pt-2">
                            <h3 className="text-sm font-medium">Projektspezifische Faktoren</h3>
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label htmlFor="complexity" className="text-sm">
                                    Projektkomplexität
                                  </Label>
                                  <span className="text-xs text-gray-500">
                                    {complexity === 1
                                      ? "Sehr einfach"
                                      : complexity === 2
                                        ? "Einfach"
                                        : complexity === 3
                                          ? "Mittel"
                                          : complexity === 4
                                            ? "Komplex"
                                            : "Sehr komplex"}
                                  </span>
                                </div>
                                <Slider
                                  id="complexity"
                                  min={1}
                                  max={5}
                                  step={1}
                                  value={[complexity]}
                                  onValueChange={(value) => setComplexity(value[0])}
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label htmlFor="urgency" className="text-sm">
                                    Dringlichkeit
                                  </Label>
                                  <span className="text-xs text-gray-500">
                                    {urgency === 1
                                      ? "Nicht dringend"
                                      : urgency === 2
                                        ? "Normal"
                                        : urgency === 3
                                          ? "Dringend"
                                          : urgency === 4
                                            ? "Sehr dringend"
                                            : "Höchste Priorität"}
                                  </span>
                                </div>
                                <Slider
                                  id="urgency"
                                  min={1}
                                  max={5}
                                  step={1}
                                  value={[urgency]}
                                  onValueChange={(value) => setUrgency(value[0])}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("project")}>
                        Zurück zur Projektauswahl
                      </Button>
                      <Button
                        onClick={() => {
                          setActiveTab("insights")
                          if (insights.length === 0) {
                            generateInsights()
                          }
                        }}
                        className="bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white"
                      >
                        KI-Insights anzeigen
                      </Button>
                    </CardFooter>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Daten aus deinem Profil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Vorherige Projekte</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {previousProjects.map((project) => (
                            <div key={project.id} className="border-b pb-2 last:border-0 last:pb-0">
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium">{project.title}</h4>
                                <Badge variant="outline">{project.hourlyRate} €/h</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{project.client}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {project.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="bg-gray-100 text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Skills aus deinem CV</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {cvSkills.map((skill, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <div>
                                  <span className="text-sm font-medium">{skill.name}</span>
                                  <span className="text-xs text-gray-500 ml-2">{skill.level}</span>
                                </div>
                                <Badge variant="outline" className="bg-gray-50">
                                  {skill.years} {skill.years === 1 ? "Jahr" : "Jahre"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Kein Projekt ausgewählt</h3>
                  <p className="text-gray-500 mt-2">Bitte wähle zuerst ein Projekt aus, um fortzufahren.</p>
                  <Button onClick={() => setActiveTab("project")} variant="outline" className="mt-4">
                    Zurück zur Projektauswahl
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              {selectedProject ? (
                <>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>KI-generierte Insights</CardTitle>
                        <Button
                          onClick={generateInsights}
                          className="bg-[#7DD5D8] hover:bg-[#6BC4C7] text-white"
                          disabled={isGeneratingInsights}
                        >
                          {isGeneratingInsights ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Generiere...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Insights aktualisieren
                            </>
                          )}
                        </Button>
                      </div>
                      <CardDescription>
                        Basierend auf deinem Profil, dem ausgewählten Projekt und aktuellen Marktdaten:
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {insights.length > 0 ? (
                        <div className="space-y-3">
                          {insights.map((insight, index) => (
                            <div key={index} className="bg-[#7DD5D8]/10 p-3 rounded-md border border-[#7DD5D8]/20">
                              <div className="flex gap-2">
                                <Sparkles className="w-4 h-4 text-[#7DD5D8] mt-0.5" />
                                <p className="text-sm">{insight}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md text-center">
                          {isGeneratingInsights ? (
                            <div className="flex flex-col items-center">
                              <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin" />
                              <p className="text-gray-500">Generiere KI-Insights...</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500">
                                Klicke auf "Insights aktualisieren", um KI-basierte Erkenntnisse zu erhalten.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Marktvergleich</CardTitle>
                      <CardDescription>
                        So positioniert sich dein Stundensatz im Vergleich zu ähnlichen Projekten:
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="relative pt-5">
                          <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                            <span>Niedriger</span>
                            <span>Durchschnitt</span>
                            <span>Höher</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-[#7DD5D8] rounded-full"
                              style={{
                                width: `${
                                  calculatedRate
                                    ? Math.min(100, Math.max(0, ((calculatedRate - 60) / (120 - 60)) * 100))
                                    : 50
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div
                            className="absolute -top-1 transform -translate-x-1/2"
                            style={{
                              left: `${
                                calculatedRate
                                  ? Math.min(100, Math.max(0, ((calculatedRate - 60) / (120 - 60)) * 100))
                                  : 50
                              }%`,
                            }}
                          >
                            <div className="w-4 h-4 bg-[#7DD5D8] rounded-full border-2 border-white"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-1">
                            <span>60 €</span>
                            <span>90 €</span>
                            <span>120 €</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Vergleichbare Projekte</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">Durchschnittlicher Stundensatz</span>
                              <span className="font-medium">85 €</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">Niedrigster Stundensatz</span>
                              <span className="font-medium">70 €</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">Höchster Stundensatz</span>
                              <span className="font-medium">110 €</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800">KI-Empfehlung</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Basierend auf deinem Profil und dem ausgewählten Projekt empfehlen wir einen Stundensatz von{" "}
                          <strong>{calculatedRate} €</strong>. Dieser Satz berücksichtigt deine Erfahrung, die
                          Projektkomplexität und aktuelle Markttrends.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Kein Projekt ausgewählt</h3>
                  <p className="text-gray-500 mt-2">Bitte wähle zuerst ein Projekt aus, um KI-Insights zu erhalten.</p>
                  <Button onClick={() => setActiveTab("project")} variant="outline" className="mt-4">
                    Zurück zur Projektauswahl
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
