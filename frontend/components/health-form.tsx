"use client"

import { useState, useMemo } from "react"
import { Check, ChevronRight, ChevronLeft, AlertTriangle } from "lucide-react"

export interface FormData {
  age: number
  weight: number
  height: number
  bmi: number
  acne: boolean
  hairGrowth: boolean
  hairThinning: boolean
  weightChange: boolean
  cycleType: string
  cycleLength: number
}

interface HealthFormProps {
  onSubmit: (data: FormData) => void
}

const steps = [
  { id: 1, label: "Vitals" },
  { id: 2, label: "Symptoms" },
  { id: 3, label: "Cycle" },
]

export function HealthForm({ onSubmit }: HealthFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    weight: 0,
    height: 0,
    bmi: 0,
    acne: false,
    hairGrowth: false,
    hairThinning: false,
    weightChange: false,
    cycleType: "",
    cycleLength: 28,
  })

  const bmi = useMemo(() => {
    if (formData.weight > 0 && formData.height > 0) {
      const heightM = formData.height / 100
      return Number.parseFloat((formData.weight / (heightM * heightM)).toFixed(1))
    }
    return 0
  }, [formData.weight, formData.height])

  const isHighPriority = formData.age > 20 && bmi > 25 && formData.cycleType === "irregular"

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  function handleNext() {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  function handlePrev() {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  function handleSubmit() {
    onSubmit({ ...formData, bmi })
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      {/* Stepper */}
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center justify-center gap-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span
                  className={`hidden text-sm font-medium sm:inline ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && <div className="mx-2 h-px w-8 bg-border sm:w-16" />}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="p-6 md:p-8">
        {/* Step 1: Vitals */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">Basic Vitals</h3>
              <p className="text-sm text-muted-foreground">Enter your basic health information</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="age" className="text-sm font-medium text-foreground">Age</label>
                <input
                  id="age"
                  type="number"
                  min={0}
                  placeholder="e.g. 25"
                  value={formData.age || ""}
                  onChange={(e) => updateField("age", Number(e.target.value))}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="weight" className="text-sm font-medium text-foreground">Weight (kg)</label>
                <input
                  id="weight"
                  type="number"
                  min={0}
                  placeholder="e.g. 65"
                  value={formData.weight || ""}
                  onChange={(e) => updateField("weight", Number(e.target.value))}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="height" className="text-sm font-medium text-foreground">Height (cm)</label>
                <input
                  id="height"
                  type="number"
                  min={0}
                  placeholder="e.g. 165"
                  value={formData.height || ""}
                  onChange={(e) => updateField("height", Number(e.target.value))}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            {/* BMI display */}
            {bmi > 0 && (
              <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Your BMI</p>
                  <p className="text-2xl font-bold text-primary">{bmi}</p>
                </div>
                <div className="h-px flex-1 bg-border" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese"}
                  </p>
                  <p className="text-xs text-muted-foreground">BMI Category</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Symptoms */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">Symptom Checklist</h3>
              <p className="text-sm text-muted-foreground">Select any symptoms you are currently experiencing</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { key: "acne" as const, label: "Acne / Skin Breakouts", desc: "Persistent acne on face, back, or chest" },
                { key: "hairGrowth" as const, label: "Excess Hair Growth (Hirsutism)", desc: "Unusual hair growth on face, chin, or body" },
                { key: "hairThinning" as const, label: "Hair Thinning / Hair Loss", desc: "Noticeable hair thinning or hair fall" },
                { key: "weightChange" as const, label: "Unexplained Weight Change", desc: "Sudden weight gain or difficulty losing weight" },
              ].map((symptom) => (
                <label
                  key={symptom.key}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    formData[symptom.key]
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData[symptom.key]}
                    onChange={(e) => updateField(symptom.key, e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{symptom.label}</p>
                    <p className="text-xs text-muted-foreground">{symptom.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Menstrual Cycle */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">Menstrual Cycle</h3>
              <p className="text-sm text-muted-foreground">Tell us about your menstrual cycle pattern</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="cycleType" className="text-sm font-medium text-foreground">Cycle Regularity</label>
                <select
                  id="cycleType"
                  value={formData.cycleType}
                  onChange={(e) => updateField("cycleType", e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option value="">Select...</option>
                  <option value="regular">Regular</option>
                  <option value="irregular">Irregular</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cycleLength" className="text-sm font-medium text-foreground">Cycle Length (days)</label>
                <input
                  id="cycleLength"
                  type="number"
                  min={15}
                  max={60}
                  placeholder="e.g. 28"
                  value={formData.cycleLength}
                  onChange={(e) => updateField("cycleLength", Number(e.target.value))}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            {/* High priority badge */}
            {isHighPriority && (
              <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <span className="inline-block rounded-full bg-destructive px-3 py-0.5 text-xs font-semibold text-destructive-foreground">
                    High Priority Case
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Based on your age, BMI, and irregular cycle, we recommend immediate consultation.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border px-6 py-4 md:px-8">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Get Results
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
