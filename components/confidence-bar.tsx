interface ConfidenceBarProps {
  min: number
  recommended: number
  max: number
}

export function ConfidenceBar({ min, recommended, max }: ConfidenceBarProps) {
  return (
    <div className="pb-1">
      <div className="flex justify-between text-[10px] text-gray-600 mb-1">
        <span>Min</span>
        <span>Empfohlen</span>
        <span>Max</span>
      </div>

      <div className="relative h-4 bg-[#F7F8FA] rounded-full mb-1">
        {/* Bar */}
        <div className="absolute h-full bg-[#7DD5D8]/20 rounded-full w-full" />

        {/* Markers */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <div className="h-4 w-0.5 bg-gray-400" />
          <div className="h-4 w-0.5 bg-[#333333]" />
          <div className="h-4 w-0.5 bg-gray-400" />
        </div>
      </div>

      <div className="flex justify-between text-[10px] font-medium">
        <span>{min} €</span>
        <span>{recommended} €</span>
        <span>{max} €</span>
      </div>
    </div>
  )
}
