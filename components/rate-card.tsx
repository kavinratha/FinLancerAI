"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Info } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

interface RateCardProps {
  rate: number
  delta: number
  variant?: "small" | "large"
}

export function RateCard({ rate, delta, variant = "small" }: RateCardProps) {
  const { toast } = useToast()
  const router = useRouter()

  const handleViewDetails = () => {
    router.push("/rate-details")
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-gray-800 ${variant === "small" ? "text-2xl" : "text-2xl"}`}>{rate} €</span>
          <span className="text-xs text-gray-500">/ Stunde</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center ml-1 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full cursor-help">
                  <Info className="w-3 h-3 mr-0.5" />
                  <span className="text-[10px]">KI-generiert</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Dieser Stundensatz wurde mit KI basierend auf folgenden Faktoren berechnet:</p>
                <ul className="list-disc pl-4 mt-1 text-xs">
                  <li>Aktuelle Marktdaten von freelance.de</li>
                  <li>Deine Skills und Erfahrung</li>
                  <li>Regionale Unterschiede</li>
                  <li>Branchenspezifische Nachfrage</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs w-fit mt-1 ${
            delta > 0 ? "text-green-700 bg-green-50" : delta < 0 ? "text-red-700 bg-red-50" : "text-gray-700 bg-gray-50"
          }`}
        >
          {delta > 0 ? <ArrowUp className="w-3 h-3" /> : delta < 0 ? <ArrowDown className="w-3 h-3" /> : null}
          <span>
            {delta > 0 ? "+" : ""}
            {delta}% ggü. Vorwoche
          </span>
        </div>
      </div>

      <Button onClick={handleViewDetails} className="freelance-button-cta w-full text-sm py-1.5">
        Stundensatz mit KI berechnen
      </Button>
    </div>
  )
}
