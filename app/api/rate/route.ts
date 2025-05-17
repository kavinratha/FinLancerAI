import { type NextRequest, NextResponse } from "next/server"
import { mockUser } from "@/lib/mock-user"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  // Get query parameters from URL
  const url = new URL(request.url)
  const skills = url.searchParams.get("skills")?.split(",") || mockUser.skills
  const experience = Number(url.searchParams.get("experience")) || mockUser.experience
  const region = url.searchParams.get("region") || mockUser.region

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // TODO: Replace mock API with ML endpoint
  // Simple mock logic to calculate rates
  const baseRate = 75 // Realistischer Basis-Stundensatz
  let recommended = baseRate

  // Adjust based on experience
  if (experience > 5) {
    recommended += (experience - 5) * 1.5 // Reduzierter Erfahrungsbonus pro Jahr
  }

  // Adjust based on region
  if (region === "de-sued" || region === "ch") {
    recommended = Math.round(recommended * 1.04)
  } else if (region === "at") {
    recommended = Math.round(recommended * 1.02)
  }

  // Adjust based on skills
  const premiumSkills = ["AWS", "DevOps", "Machine Learning", "React", "TypeScript"]
  const userPremiumSkills = skills.filter((skill) =>
    premiumSkills.some((ps) => skill.toLowerCase().includes(ps.toLowerCase())),
  )

  recommended += userPremiumSkills.length * 2 // Reduzierter Skill-Bonus

  // Calculate min and max
  const min = Math.round(recommended * 0.91)
  const max = Math.round(recommended * 1.09)

  // Calculate delta compared to current rate
  const delta = Math.round(((recommended - mockUser.currentRate) / mockUser.currentRate) * 100)

  // Generate impact factors
  const factors = []

  if (userPremiumSkills.length > 0) {
    factors.push({
      label: userPremiumSkills[0],
      impact: `+2 €/Stunde`,
    })
  }

  if (region === "de-sued") {
    factors.push({
      label: "Region DE-Süd",
      impact: "+4 %",
    })
  }

  if (experience >= 8) {
    factors.push({
      label: `${experience} J+ Erfahrung`,
      impact: "+1,5 €/Stunde",
    })
  }

  // Fill with generic factors if needed
  if (factors.length < 3) {
    if (!factors.some((f) => f.label.includes("Markt"))) {
      factors.push({
        label: "Markttrend Q2/2023",
        impact: "+2 %",
      })
    }

    if (factors.length < 3 && !factors.some((f) => f.label.includes("Nachfrage"))) {
      factors.push({
        label: "Hohe Nachfrage",
        impact: "+3 €/Stunde",
      })
    }
  }

  // Limit to top 3 factors
  const topFactors = factors.slice(0, 3)

  return NextResponse.json({
    recommended,
    min,
    max,
    delta,
    factors: topFactors,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { skills, experience, region } = body

    // TODO: Replace mock API with ML endpoint
    // Simple mock logic to calculate rates
    const baseRate = 75 // Realistischer Basis-Stundensatz
    let recommended = baseRate

    // Similar logic as GET but using body parameters
    if (experience > 5) {
      recommended += (experience - 5) * 1.5 // Reduzierter Erfahrungsbonus pro Jahr
    }

    if (region === "de-sued" || region === "ch") {
      recommended = Math.round(recommended * 1.04)
    } else if (region === "at") {
      recommended = Math.round(recommended * 1.02)
    }

    const premiumSkills = ["AWS", "DevOps", "Machine Learning", "React", "TypeScript"]
    const userPremiumSkills = skills.filter((skill) =>
      premiumSkills.some((ps) => skill.toLowerCase().includes(ps.toLowerCase())),
    )

    recommended += userPremiumSkills.length * 2 // Reduzierter Skill-Bonus

    const min = Math.round(recommended * 0.91)
    const max = Math.round(recommended * 1.09)
    const delta = Math.round(((recommended - mockUser.currentRate) / mockUser.currentRate) * 100)

    // Generate impact factors
    const factors = []

    if (userPremiumSkills.length > 0) {
      factors.push({
        label: userPremiumSkills[0],
        impact: `+2 €/Stunde`,
      })
    }

    if (region === "de-sued") {
      factors.push({
        label: "Region DE-Süd",
        impact: "+4 %",
      })
    }

    if (experience >= 8) {
      factors.push({
        label: `${experience} J+ Erfahrung`,
        impact: "+1,5 €/Stunde",
      })
    }

    // Fill with generic factors if needed
    if (factors.length < 3) {
      if (!factors.some((f) => f.label.includes("Markt"))) {
        factors.push({
          label: "Markttrend Q2/2023",
          impact: "+2 %",
        })
      }

      if (factors.length < 3 && !factors.some((f) => f.label.includes("Nachfrage"))) {
        factors.push({
          label: "Hohe Nachfrage",
          impact: "+3 €/Stunde",
        })
      }
    }

    // Limit to top 3 factors
    const topFactors = factors.slice(0, 3)

    return NextResponse.json({
      recommended,
      min,
      max,
      delta,
      factors: topFactors,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
