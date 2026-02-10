export function StatsSection() {
  const stats = [
    { value: "1 in 5", label: "Women affected by PCOD in India" },
    { value: "70%", label: "Cases linked to Insulin Resistance" },
    { value: "60%", label: "Improvement with lifestyle changes" },
    { value: "4-6 mo", label: "Recommended monitoring period" },
  ]

  return (
    <section className="border-y border-border bg-card px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <span className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</span>
              <span className="text-xs leading-relaxed text-muted-foreground md:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
