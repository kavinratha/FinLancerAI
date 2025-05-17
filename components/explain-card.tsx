interface Factor {
  label: string
  impact: string
}

interface ExplainCardProps {
  factors: Factor[]
}

export function ExplainCard({ factors }: ExplainCardProps) {
  return (
    <div className="space-y-2">
      {factors.map((factor, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-[#F7F8FA] rounded-md">
          <span className="text-xs font-medium">{factor.label}</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-[#7DD5D8] text-white rounded-full">{factor.impact}</span>
        </div>
      ))}

      {factors.length === 0 && <p className="text-xs text-gray-500 italic">Keine Einflussfaktoren verfügbar.</p>}
    </div>
  )
}
