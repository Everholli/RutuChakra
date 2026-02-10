import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  BookOpen,
  AlertCircle,
  Activity,
  Brain,
  ArrowRight,
  Droplets,
  Scale,
  Heart,
  Zap,
  CircleCheck,
  CircleX,
} from "lucide-react"
import Link from "next/link"

const myths = [
  {
    myth: "PCOD is a rare condition.",
    fact: "PCOD affects 1 in 5 women of reproductive age in India, making it one of the most common endocrine disorders.",
    isMyth: true,
  },
  {
    myth: "PCOD only affects overweight women.",
    fact: "Lean PCOD exists. Even women with normal BMI can have hormonal imbalance and insulin resistance.",
    isMyth: true,
  },
  {
    myth: "Lifestyle changes can significantly improve PCOD symptoms.",
    fact: "Diet, exercise, and stress management can reverse many symptoms and improve insulin sensitivity by up to 60%.",
    isMyth: false,
  },
  {
    myth: "PCOD means you cannot get pregnant.",
    fact: "With proper management and medical guidance, most women with PCOD can conceive successfully.",
    isMyth: true,
  },
]

const irStages = [
  {
    icon: Droplets,
    title: "Stage 1: Excess Insulin",
    desc: "Your body produces more insulin than normal to process glucose, often triggered by diet and lifestyle factors.",
  },
  {
    icon: Scale,
    title: "Stage 2: Weight Gain",
    desc: "Excess insulin promotes fat storage, especially around the abdomen, creating a cycle of worsening resistance.",
  },
  {
    icon: Brain,
    title: "Stage 3: Hormonal Disruption",
    desc: "High insulin triggers the ovaries to produce excess androgens (male hormones), disrupting the menstrual cycle.",
  },
  {
    icon: AlertCircle,
    title: "Stage 4: PCOD Symptoms",
    desc: "Irregular periods, acne, hair growth, and weight change manifest as the hormonal imbalance deepens.",
  },
]

const actionSteps = [
  {
    icon: Activity,
    title: "Move Your Body",
    desc: `Regular exercise improves insulin sensitivity.
- Low Risk: 30 min daily, mix of walking & light strength.
- Medium Risk: 40–45 min, mix of strength and cardio.
- High Risk: Start 20 min, build up with high-intensity intervals.`,
  },
  {
    icon: Heart,
    title: "Eat Mindfully",
    desc: `Diet helps balance hormones.
- Low Risk: Balanced diet with fruits, vegetables, whole grains.
- Medium Risk: Increase fiber & protein, reduce processed foods.
- High Risk: Strict anti-inflammatory, low-GI foods; avoid sugar & junk food.`,
  },
  {
    icon: Zap,
    title: "Manage Stress",
    desc: `Stress impacts insulin & hormones.
- Low Risk: Relaxation exercises 2–3 times/week.
- Medium Risk: Daily meditation or yoga.
- High Risk: Prioritize stress management, deep breathing, and therapy if needed.`,
  },
  {
    icon: BookOpen,
    title: "Stay Informed",
    desc: `Knowledge is power.
- Low Risk: Track your cycle occasionally.
- Medium Risk: Note symptoms & lifestyle effects.
- High Risk: Keep detailed records, consult a doctor if symptoms persist.`,
  },
]

export default function AwarenessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              Health Awareness
            </div>
            <h1 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Understanding <span className="text-primary">Insulin Resistance</span> & PCOD
            </h1>
            <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Insulin Resistance is widely recognized as the root cause of PCOD. When your cells become resistant to insulin, 
              it triggers a chain reaction of hormonal imbalances that lead to the symptoms associated with Polycystic Ovarian Disorder.
            </p>
          </div>
        </section>

        {/* Insulin Resistance Stages */}
        <section className="border-y border-border bg-card px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground">How Insulin Resistance Leads to PCOD</h2>
              <p className="text-sm text-muted-foreground">The progression from insulin resistance to full PCOD symptoms</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {irStages.map((stage, i) => (
                <div key={stage.title} className="relative">
                  <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <stage.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{stage.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{stage.desc}</p>
                  </div>
                  {i < irStages.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/40 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Myths vs Facts */}
        <section className="bg-background px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground">Myths vs Facts</h2>
              <p className="text-sm text-muted-foreground">Separating common misconceptions from medical facts</p>
            </div>

            <div className="flex flex-col gap-4">
              {myths.map((item) => (
                <div key={item.myth} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-3 flex items-start gap-3">
                    {item.isMyth ? (
                      <CircleX className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                    ) : (
                      <CircleCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[hsl(var(--success))]" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            item.isMyth
                              ? "bg-destructive/10 text-destructive"
                              : "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                          }`}
                        >
                          {item.isMyth ? "MYTH" : "FACT"}
                        </span>
                        <p className="text-sm font-medium text-foreground">{item.myth}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.fact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Steps */}
        <section className="border-t border-border bg-card px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground">What You Can Do Today</h2>
              <p className="text-sm text-muted-foreground">Practical steps to manage and reverse PCOD symptoms</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {actionSteps.map((step) => (
                <div
                  key={step.title}
                  className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:border-primary/30"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-10 text-center shadow-sm">
              <h3 className="text-xl font-bold text-primary-foreground">Ready to Check Your Risk?</h3>
              <p className="max-w-md text-sm text-primary-foreground/80">
                Take our 3-step health assessment and get personalized lifestyle recommendations tailored to your needs.
              </p>
              <Link
                href="/dashboard"
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-3 text-sm font-semibold text-primary transition-all hover:opacity-90"
              >
                Start Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
