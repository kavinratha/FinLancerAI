import { AlertCircle } from "lucide-react"

interface StatusIndicatorProps {
  online: boolean
}

export function StatusIndicator({ online }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-1 text-xs">
      {online ? (
        <>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-gray-500">Online</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-3 h-3 text-amber-500" />
          <span className="text-amber-500">Offline-Modus</span>
        </>
      )}
    </div>
  )
}
