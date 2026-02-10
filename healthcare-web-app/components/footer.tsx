import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" fill="currentColor" />
            <span className="text-sm font-semibold text-foreground">RutuChakra</span>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
            This is a prediction tool, not a diagnosis. Consult a doctor if symptoms persist for 4-6 months.
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} RutuChakra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
