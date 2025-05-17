"use client"

import { RateCard } from "@/components/rate-card"
import { useFetchRate } from "@/hooks/use-fetch-rate"
import { Skeleton } from "@/components/ui/skeleton"

export default function RateWidget() {
  const { data, isLoading } = useFetchRate()

  return (
    <div className="w-[340px] h-[280px] p-4 bg-white rounded-md border border-[#E5E7EB] shadow-sm mx-auto">
      <h2 className="text-lg font-medium text-[#333333] mb-4">Empfohlener Stundensatz</h2>

      {isLoading ? (
        <Skeleton className="h-[200px] w-full" />
      ) : (
        <RateCard rate={data?.recommended || 0} delta={data?.delta || 0} variant="small" />
      )}
    </div>
  )
}
