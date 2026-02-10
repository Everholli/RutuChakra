"use client"

import { Dumbbell, Salad, Leaf, Droplets, Clock, Flame, Apple, Ban } from "lucide-react"
import type { FormData } from "./health-form"

interface LifestylePlanProps {
  formData: FormData
}

function getRiskLevel(data: FormData): "Low" | "Medium" | "High" {
  let score = 0
  if (data.bmi > 30) score += 30
  else if (data.bmi > 25) score += 20
  if (data.acne) score += 10
  if (data.hairGrowth) score += 15
  if (data.hairThinning) score += 10
  if (data.weightChange) score += 10
  if (data.cycleType === "irregular") score += 25
  if (data.age > 20 && data.age < 35) score += 5
  score = Math.min(score, 100)
  if (score >= 60) return "High"
  if (score >= 35) return "Medium"
  return "Low"
}

export function LifestylePlan({ formData }: LifestylePlanProps) {
  const riskLevel = getRiskLevel(formData)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Exercise card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Anaerobic Exercise</h3>
              <p className="text-xs text-muted-foreground">Improve insulin sensitivity</p>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">40-45 minutes/day</p>
                <p className="text-xs text-muted-foreground">5 days per week</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Flame className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">High-Intensity Focus</p>
                <p className="text-xs text-muted-foreground">Gham Ghalnari style for maximum insulin response</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {riskLevel === "High"
                ? "Start gradually with 20 minutes and build up. Focus on strength training and high-intensity intervals to combat insulin resistance effectively."
                : riskLevel === "Medium"
                  ? "Incorporate a mix of strength training and cardio. Aim for moderate-to-high intensity to maintain hormonal balance."
                  : "Maintain regular activity. A mix of yoga, walking, and light strength training will help keep your hormones balanced."}
            </p>
          </div>
        </div>

        {/* Diet card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Salad className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Dietary Modification</h3>
              <p className="text-xs text-muted-foreground">Balance hormones naturally</p>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Apple className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">High Fiber & Protein</p>
                <p className="text-xs text-muted-foreground">Focus on whole foods and lean protein</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Ban className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium text-foreground">Zero Junk Food</p>
                <p className="text-xs text-muted-foreground">Eliminate processed and sugary foods</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {riskLevel === "High"
                ? "Strict dietary control is essential. Focus on anti-inflammatory foods, reduce sugar intake, and follow a low-glycemic index diet."
                : riskLevel === "Medium"
                  ? "Moderate dietary adjustments can make a big difference. Reduce processed food and increase vegetable and fiber intake."
                  : "Maintain a balanced diet with plenty of fruits, vegetables, and whole grains. Stay hydrated and limit processed food."}
            </p>
          </div>
        </div>
      </div>

      {/* Herbal remedies - shown for medium/high risk */}
      {(riskLevel === "High" || riskLevel === "Medium") && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Herbal Remedies</h3>
              <p className="text-xs text-muted-foreground">Natural support for hormonal balance</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Spearmint Tea</h4>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Helps reduce androgen levels. Drink 2 cups daily for anti-androgenic effects.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Cinnamon</h4>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Improves insulin sensitivity. Add 1 tsp to warm water or food daily.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Fenugreek (Methi)</h4>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Soak seeds overnight and drink the water. Helps regulate blood sugar and hormones.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
