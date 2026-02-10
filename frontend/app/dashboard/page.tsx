"use client"

import React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HealthForm, type FormData } from "@/components/health-form"
import { RiskResult } from "@/components/risk-result"
import { LifestylePlan } from "@/components/lifestyle-plan"
import { ClipboardList, BarChart3, Leaf, RotateCcw } from "lucide-react"

type Tab = "form" | "results" | "plan"

export default function DashboardPage() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("form")

  function handleFormSubmit(data: FormData) {
    setFormData(data)
    setActiveTab("results")
  }

  function handleReset() {
    setFormData(null)
    setActiveTab("form")
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType; disabled: boolean }[] = [
    { id: "form", label: "Assessment", icon: ClipboardList, disabled: false },
    { id: "results", label: "Results", icon: BarChart3, disabled: !formData },
    { id: "plan", label: "Lifestyle Plan", icon: Leaf, disabled: !formData },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background px-6 py-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Health Dashboard</h1>
              <p className="text-sm text-muted-foreground">Complete the assessment to get your risk analysis</p>
            </div>
            {formData && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                New Assessment
              </button>
            )}
          </div>

          {/* Tab navigation */}
          <div className="mb-6 flex gap-1 rounded-xl border border-border bg-card p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : tab.disabled
                      ? "cursor-not-allowed text-muted-foreground/40"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "form" && <HealthForm onSubmit={handleFormSubmit} />}
          {activeTab === "results" && formData && <RiskResult formData={formData} />}
          {activeTab === "plan" && formData && <LifestylePlan formData={formData} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}
