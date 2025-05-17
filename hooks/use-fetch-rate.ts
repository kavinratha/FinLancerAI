"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"

interface RateData {
  recommended: number
  min: number
  max: number
  delta: number
  factors: {
    label: string
    impact: string
  }[]
}

export function useFetchRate() {
  const [queryParams, setQueryParams] = useState<string>("")

  useEffect(() => {
    // Get settings from localStorage
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      const { skills, experience, region } = JSON.parse(savedSettings)
      const params = new URLSearchParams()

      if (skills && skills.length > 0) {
        params.append("skills", skills.join(","))
      }

      if (experience) {
        params.append("experience", experience.toString())
      }

      if (region) {
        params.append("region", region)
      }

      setQueryParams(params.toString())
    }
  }, [])

  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error, isLoading } = useSWR<RateData>(queryParams ? `/api/rate?${queryParams}` : "/api/rate", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    isLoading,
    isError: error,
  }
}
