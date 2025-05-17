"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Lightbulb, FileText, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function NegotiationPreview() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const features = [
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
      title: "Angebote & Rechnungen",
      description: "Erstelle professionelle Angebote und rechtskonforme Rechnungen",
    },
  ]

  const handleNavigate = () => {
    router.push("/negotiation")
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="freelance-section-title text-base">Preisverhandlungs-Coach</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#7DD5D8] hover:text-[#6BC4C7]"
          onClick={handleNavigate}
        >
          Alle Tools <ArrowRight className="ml-1 w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="border border-gray-100 rounded-md p-2 transition-all duration-200 hover:border-[#7DD5D8] hover:bg-gray-50 cursor-pointer"
            onMouseEnter={() => setIsHovered(feature.id)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={handleNavigate}
          >
            <div className="flex items-center gap-2">
              {feature.icon}
              <div>
                <h3 className="text-xs font-medium">{feature.title}</h3>
                <p className="text-[10px] text-gray-500">{feature.description}</p>
              </div>
              <ArrowRight
                className={`ml-auto w-3 h-3 transition-opacity duration-200 ${
                  isHovered === feature.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
