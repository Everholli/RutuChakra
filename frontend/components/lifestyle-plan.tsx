"use client"

import { useState } from "react"
import {
  Dumbbell,
  Salad,
  Leaf,
  Droplets,
  Clock,
  Flame,
  Apple,
  Ban,
  X
} from "lucide-react"
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
  const [showDietModal, setShowDietModal] = useState(false)

  /* ---------------- DIET CONTENT ---------------- */
  const dietContent = {
    High: {
      eat: [
        "Green vegetables (spinach, broccoli, fenugreek)",
        "Protein foods (dal, paneer, eggs, tofu)",
        "Low-GI fruits (apple, berries, pear)",
        "Nuts & seeds (flaxseed, almonds, walnuts)",
        "Whole grains (millets, oats, brown rice)"
      ],
      avoid: [
        "Sugary drinks & sweets",
        "Maida, white bread, bakery items",
        "Fried & packaged food"
      ],
      suggestions: [
        "Eat small, frequent meals to maintain blood sugar.",
        "Include cinnamon or spearmint tea for insulin regulation.",
        "Stay hydrated and combine diet with regular exercise."
      ]
    },
    Medium: {
      eat: [
        "Green vegetables (spinach, broccoli, fenugreek)",
        "Protein foods (dal, paneer, eggs, tofu)",
        "Low-GI fruits (apple, berries, pear)",
        "Nuts & seeds (flaxseed, almonds, walnuts)"
      ],
      avoid: [
        "Sugary drinks & sweets",
        "Maida, white bread, bakery items",
        "Fried & packaged food"
      ],
      suggestions: [
        "Maintain a balanced meal plan with moderate portions.",
        "Combine diet with moderate exercise.",
        "Include herbal teas like spearmint or cinnamon."
      ]
    },
    Low: {
      eat: [
        "Fruits (apple, berries, banana)",
        "Vegetables (carrot, cucumber, spinach)",
        "Whole grains (oats, brown rice)",
        "Protein sources (eggs, tofu, legumes)"
      ],
      avoid: [
        "Excess sugary foods",
        "Highly processed snacks",
        "Soft drinks"
      ],
      suggestions: [
        "Keep meals balanced and regular.",
        "Include a mix of protein, fiber, and healthy fats.",
        "Stay active with walking, yoga, or light exercise."
      ]
    }
  }

  const currentDiet = dietContent[riskLevel]

  /* ---------------- EXERCISE CONTENT ---------------- */
  const exerciseContent = {
    High: {
      duration: "20–30 minutes/day",
      frequency: "3–4 days per week",
      focus: "Start gradually, focus on strength training and high-intensity intervals",
      notes: [
        "Begin with lighter weights and low-impact exercises.",
        "Increase intensity slowly to avoid injury.",
        "Include warm-up and cool-down routines."
      ]
    },
    Medium: {
      duration: "40–45 minutes/day",
      frequency: "4–5 days per week",
      focus: "Mix of strength training and cardio at moderate-to-high intensity",
      notes: [
        "Include both anaerobic and aerobic exercises.",
        "Maintain consistent workout schedule.",
        "Focus on proper form and technique."
      ]
    },
    Low: {
      duration: "30–40 minutes/day",
      frequency: "3–5 days per week",
      focus: "Regular activity with yoga, walking, and light strength training",
      notes: [
        "Maintain variety in exercises.",
        "Focus on flexibility and balance.",
        "Keep intensity moderate to avoid overtraining."
      ]
    }
  }

  const currentExercise = exerciseContent[riskLevel]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* ---------------- EXERCISE CARD ---------------- */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Anaerobic Exercise
              </h3>
              <p className="text-xs text-muted-foreground">
                Improve insulin sensitivity
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{currentExercise.duration}</p>
                <p className="text-xs text-muted-foreground">{currentExercise.frequency}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Flame className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{currentExercise.focus}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
              {currentExercise.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- DIET CARD ---------------- */}
        <div
          className="rounded-2xl border border-border bg-card p-6 shadow-sm cursor-pointer hover:bg-muted/10 transition"
          onClick={() => setShowDietModal(true)}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Salad className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Dietary Modification
              </h3>
              <p className="text-xs text-primary">
                Click to view diet recommendations
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Apple className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  High Fiber & Protein
                </p>
                <p className="text-xs text-muted-foreground">
                  Whole foods & lean protein
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Ban className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium text-foreground">Zero Junk Food</p>
                <p className="text-xs text-muted-foreground">
                  Avoid processed & sugary foods
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- DIET MODAL ---------------- */}
      {showDietModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative max-w-md w-full rounded-2xl bg-card p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={() => setShowDietModal(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              {riskLevel === "High"
                ? "PCOD High Risk – Recommended Diet"
                : riskLevel === "Medium"
                ? "PCOD Medium Risk – Recommended Diet"
                : "Healthy Hormone Diet"}
            </h3>

            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
              {currentDiet.eat.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h4 className="mt-4 text-sm font-semibold text-destructive">Avoid</h4>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
              {currentDiet.avoid.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h4 className="mt-4 text-sm font-semibold">Suggestions</h4>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
              {currentDiet.suggestions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ---------------- HERBAL REMEDIES ---------------- */}
      {(riskLevel === "High" || riskLevel === "Medium") && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Herbal Remedies
              </h3>
              <p className="text-xs text-muted-foreground">
                Natural support for hormonal balance
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs">
              <Droplets className="mb-2 h-4 w-4 text-primary" />
              Spearmint tea – 2 cups daily
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs">
              <Leaf className="mb-2 h-4 w-4 text-primary" />
              Cinnamon – improves insulin sensitivity
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs">
              <Leaf className="mb-2 h-4 w-4 text-primary" />
              Fenugreek – supports blood sugar balance
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
