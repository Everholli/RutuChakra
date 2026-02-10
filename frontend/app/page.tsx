"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { HealthForm } from "@/components/health-form"

// Define what the result looks like to prevent TypeScript errors
interface PredictionResult {
  risk: string;
  risk_score: number;
}

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleHealthFormSubmit(formData: any) {
    setIsLoading(true)
    try {
      // 1) Translate form data to names the ML model understands
      const payload = {
        Age: Number(formData.age),
        BMI: Number(formData.bmi),
        Irregular_Periods: formData.cycleType === "irregular" ? 1 : 0,
        Unusual_Bleeding: 0, 
        number_of_peak: formData.weightChange ? 3 : 1,
        Menses_score: (formData.acne ? 1 : 0) + 
                      (formData.hairGrowth ? 1 : 0) + 
                      (formData.hairThinning ? 1 : 0)
      }

      // 2) Send the data to your Node.js backend
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      // 3) Show the result returned by the Python script
      if (data.success && data.prediction) {
        setResult({
          risk: data.prediction.risk,
          risk_score: data.prediction.risk_score,
        })
      }
    } catch (error) {
      console.error("Error connecting to backend:", error)
      alert("Make sure your backend is running on port 5000!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        
        <div id="predict-section" className="container mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Health Risk Assessment</h2>
          
          {/* The Form Component */}
          <HealthForm onSubmit={handleHealthFormSubmit} />
          
          {/* Loading State */}
          {isLoading && <p className="text-center mt-4">Analyzing data... please wait.</p>}

          {/* Show the result UI if it exists */}
          {result && (
            <div className="mt-10 p-6 border-2 border-indigo-500 rounded-lg bg-indigo-50 max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-2 text-indigo-900">Your Results</h3>
              <div className="flex justify-around items-center">
                <div>
                  <p className="text-sm uppercase text-gray-500 font-bold">Risk Level</p>
                  <p className="text-xl font-bold text-indigo-700">{result.risk}</p>
                </div>
                <div>
                  <p className="text-sm uppercase text-gray-500 font-bold">Confidence Score</p>
                  <p className="text-xl font-bold text-indigo-700">{result.risk_score}%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}