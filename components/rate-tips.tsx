"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Lightbulb, TrendingUp, Award, BookOpen, ArrowUpRight } from "lucide-react"

interface RateTipsProps {
  skills: string[]
  rate: number
  expanded?: boolean // Neuer Parameter für erweiterte Ansicht
}

export function RateTips({ skills, rate, expanded = false }: RateTipsProps) {
  // Wenn expanded true ist, zeige alle Tipps standardmäßig an
  const [expandedTip, setExpandedTip] = useState<number | null>(expanded ? null : 0)

  // Generiere personalisierte Tipps basierend auf den Skills und dem Stundensatz
  const tips = [
    {
      title: "Spezialisierung in Nischenbereichen",
      icon: <Award className="w-3 h-3 text-[#7DD5D8]" />,
      description: `Spezialisiere dich tiefer in ${
        skills.find((s) => s.includes("React") || s.includes("TypeScript")) || "deinen Kernkompetenzen"
      }. Freelancer mit Nischenexpertise können bis zu 25% höhere Stundensätze erzielen.`,
    },
    {
      title: "Erweitere dein Skill-Portfolio",
      icon: <BookOpen className="w-3 h-3 text-[#7DD5D8]" />,
      description: `Ergänze deine Skills mit ${
        skills.includes("React") ? "Backend-Technologien" : "Frontend-Frameworks"
      }. Full-Stack-Entwickler erzielen durchschnittlich 15-20% höhere Stundensätze.`,
    },
    {
      title: "Optimiere deine Marktpositionierung",
      icon: <TrendingUp className="w-3 h-3 text-[#7DD5D8]" />,
      description: `Dein Stundensatz von ${rate}€ liegt ${
        rate < 85 ? "unter" : "nahe"
      } dem Durchschnitt. Verbessere deine Außendarstellung durch Case Studies und Testimonials.`,
    },
    {
      title: "Langfristige Kundenbeziehungen",
      icon: <Lightbulb className="w-3 h-3 text-[#7DD5D8]" />,
      description:
        "Biete Bestandskunden Rabatte für längere Zusammenarbeit, erhöhe aber deinen Standardsatz für neue Kunden um 5-10% pro Jahr.",
    },
  ]

  const toggleTip = (index: number) => {
    if (expandedTip === index) {
      setExpandedTip(null)
    } else {
      setExpandedTip(index)
    }
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {tips.map((tip, index) => (
          <div key={index} className="border border-gray-100 rounded-md overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => toggleTip(index)}
              className="w-full flex items-center justify-between p-1.5 h-auto text-left hover:bg-gray-50"
            >
              <div className="flex items-center gap-1">
                {tip.icon}
                <span className="text-xs font-medium">{tip.title}</span>
              </div>
              {!expanded && (
                <ChevronRight className={`w-3 h-3 transition-transform ${expandedTip === index ? "rotate-90" : ""}`} />
              )}
            </Button>
            {(expandedTip === index || expanded) && (
              <div className="p-2 pt-0 text-[11px] text-gray-600 bg-gray-50">
                <p>{tip.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Link zur neuen Seite mit detaillierten Tipps */}
      <Link href="/rate-increase-tips" className="text-[#7DD5D8] text-xs flex items-center hover:underline mt-2">
        <span>Alle Tipps zur Stundensatzerhöhung anzeigen</span>
        <ArrowUpRight className="w-3 h-3 ml-1" />
      </Link>
    </div>
  )
}
