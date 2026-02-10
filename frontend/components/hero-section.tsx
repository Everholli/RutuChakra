import Link from "next/link"
import { ArrowRight, Shield, Activity, Leaf } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-20 lg:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/5" />
        <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-accent/40" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
              <Shield className="h-3.5 w-3.5" />
              Trusted Health Assessment Tool
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                PCOD is a{" "}
                <span className="text-primary">Disorder</span>,{" "}
                Not a Disease.
              </h1>
              <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                Insulin Resistance is often the root cause of PCOD, leading to hormonal imbalance. 
                Understand your risk early and take control of your health with personalized lifestyle recommendations.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
              >
                Check Your Risk
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/awareness"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-accent"
              >
                Learn About PCOD
              </Link>
            </div>
          </div>

          {/* Right content - Bento cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 pt-8">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Risk Prediction</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Smart assessment using your vitals and symptoms for accurate risk scoring.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Exercise Plans</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Anaerobic exercises tailored to improve insulin sensitivity and hormone balance.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Herbal Remedies</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Natural solutions including Spearmint tea, Cinnamon, and Fenugreek for hormonal health.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/80 p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
                  <ArrowRight className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-primary-foreground">Get Started</h3>
                <p className="text-xs leading-relaxed text-primary-foreground/80">
                  Take the 3-step assessment and receive your personalized health plan today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
