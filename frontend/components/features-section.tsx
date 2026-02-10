import { ClipboardList, BarChart3, Salad, Dumbbell, BookOpen, HeartPulse } from "lucide-react"

const features = [
  {
    icon: ClipboardList,
    title: "3-Step Assessment",
    description: "Quick multi-step form capturing your vitals, symptoms, and menstrual cycle details.",
  },
  {
    icon: BarChart3,
    title: "Risk Analysis",
    description: "Intelligent risk scoring with Low, Medium, and High risk categorization.",
  },
  {
    icon: HeartPulse,
    title: "Health Monitoring",
    description: "Track your progress over time with visual health indicators and trends.",
  },
  {
    icon: Dumbbell,
    title: "Exercise Guidance",
    description: "Personalized anaerobic workout plans to improve insulin sensitivity.",
  },
  {
    icon: Salad,
    title: "Diet Recommendations",
    description: "Herbal remedies and dietary modifications for hormonal balance.",
  },
  {
    icon: BookOpen,
    title: "Health Education",
    description: "Comprehensive awareness content about PCOD and insulin resistance.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-balance text-3xl font-bold text-foreground">
            Everything You Need for PCOD Management
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            From risk assessment to lifestyle recommendations, RutuChakra provides a complete toolkit for understanding and managing PCOD.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
