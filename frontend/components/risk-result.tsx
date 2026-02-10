"use client"

import { AlertTriangle, TrendingUp, Heart, ShieldAlert } from "lucide-react"
import type { FormData } from "./health-form"

interface RiskResultProps {
  formData: FormData
}

function calculateRisk(data: FormData): { score: number; level: "Low" | "Medium" | "High"; color: string } {
  let score = 0

  // BMI contribution
  if (data.bmi > 30) score += 30
  else if (data.bmi > 25) score += 20
  else if (data.bmi > 22) score += 5

  // Symptoms contribution
  if (data.acne) score += 10
  if (data.hairGrowth) score += 15
  if (data.hairThinning) score += 10
  if (data.weightChange) score += 10

  // Cycle contribution
  if (data.cycleType === "irregular") score += 25

  // Age factor
  if (data.age > 20 && data.age < 35) score += 5

  // Cap at 100
  score = Math.min(score, 100)

  if (score >= 60) return { score, level: "High", color: "text-destructive" }
  if (score >= 35) return { score, level: "Medium", color: "text-[hsl(var(--warning))]" }
  return { score, level: "Low", color: "text-[hsl(var(--success))]" }
}

const complications = [
  { title: "Type 2 Diabetes", desc: "Insulin resistance can progress to diabetes if unmanaged." },
  { title: "Hypertension", desc: "Hormonal imbalance may contribute to elevated blood pressure." },
  { title: "Metabolic Disorders", desc: "PCOD is closely linked with metabolic syndrome." },
]

export function RiskResult({ formData }: RiskResultProps) {
  const risk = calculateRisk(formData)

  const circumference = 2 * Math.PI * 54
  const dashOffset = circumference - (risk.score / 100) * circumference

  return (
    <div className="flex flex-col gap-6">
      {/* Risk gauge + summary */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Circular gauge */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="relative mb-4">
            <svg width="140" height="140" className="-rotate-90">
              <circle cx="70" cy="70" r="54" stroke="hsl(var(--muted))" strokeWidth="10" fill="none" />
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke={
                  risk.level === "High"
                    ? "hsl(var(--destructive))"
                    : risk.level === "Medium"
                      ? "hsl(var(--warning))"
                      : "hsl(var(--success))"
                }
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${risk.color}`}>{risk.score}%</span>
              <span className="text-xs text-muted-foreground">Risk Score</span>
            </div>
          </div>
          <span
            className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${
              risk.level === "High"
                ? "bg-destructive/10 text-destructive"
                : risk.level === "Medium"
                  ? "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]"
                  : "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
            }`}
          >
            {risk.level} Risk
          </span>
        </div>

        {/* Risk summary */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Risk Summary</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {risk.level === "High"
              ? "Your assessment indicates a high risk for PCOD. Insulin resistance may be significantly affecting your hormonal balance. We strongly recommend consulting a gynecologist within the next 4-6 months if symptoms persist."
              : risk.level === "Medium"
                ? "Your assessment shows a moderate risk. Some symptoms and indicators suggest potential hormonal imbalance. Monitor your symptoms closely and consider lifestyle modifications."
                : "Your assessment shows a low risk. Continue maintaining a healthy lifestyle with regular exercise and a balanced diet. Stay aware of any changes in your symptoms."}
          </p>

          {risk.level === "High" && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/5 p-3">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 text-destructive" />
              <p className="text-xs text-destructive">
                Immediate doctor consultation recommended (4-6 month rule applies).
              </p>
            </div>
          )}

          <div className="mt-auto flex items-center gap-4 border-t border-border pt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{formData.bmi}</p>
              <p className="text-xs text-muted-foreground">BMI</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground capitalize">{formData.cycleType || "N/A"}</p>
              <p className="text-xs text-muted-foreground">Cycle</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {[formData.acne, formData.hairGrowth, formData.hairThinning, formData.weightChange].filter(Boolean).length}/4
              </p>
              <p className="text-xs text-muted-foreground">Symptoms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Complications */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Potential Future Complications</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {complications.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
