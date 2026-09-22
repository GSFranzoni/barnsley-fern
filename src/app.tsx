import { useTheme } from "next-themes";

import { MoonIcon } from "@/assets/moon-icon";
import { SunIcon } from "@/assets/sun-icon";
import { Fractal } from "@/components/fractal";
import { useGenerator } from "@/hooks/use-generator";
import { generate } from "@/utils/fractal";

export function App() {
  const { reset, values: points } = useGenerator(() => generate(100_000), 250);

  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <main className="bg-page text-foreground grid min-h-screen items-start justify-items-center px-4 pt-10 pb-8 sm:place-items-center sm:p-10">
      <section className="w-full max-w-2xl">
        <header className="mb-5 flex flex-col items-start gap-3 px-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-accent-soft/70 mb-1 text-xs font-semibold tracking-[0.28em] uppercase">
              Iterated function system
            </p>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              Barnsley fern
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="border-accent/15 bg-accent/10 text-accent-soft rounded-full border px-3 py-1.5 text-xs font-medium tabular-nums sm:text-right">
              <span className="bg-accent-soft mr-1.5 inline-block size-1.5 animate-pulse rounded-full" />
              {points.length.toLocaleString()} points
            </div>

            <button
              className="border-accent/25 text-foreground hover:bg-accent/15 focus-visible:ring-accent-soft rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
              onClick={reset}
              type="button"
            >
              Reset
            </button>
            <button
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="border-accent/25 text-foreground hover:bg-accent/15 focus-visible:ring-accent-soft grid size-8 place-items-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              type="button"
            >
              {isDark ? (
                <SunIcon aria-hidden="true" className="size-4" />
              ) : (
                <MoonIcon aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
        </header>

        <div className="border-foreground/10 bg-surface shadow-shadow/30 rounded-2xl border p-2 shadow-2xl sm:p-3">
          <div className="border-accent-soft/10 bg-canvas grid place-items-center overflow-hidden rounded-xl border">
            <Fractal points={points} />
          </div>
        </div>

        <p className="text-muted/45 mt-4 text-center text-xs tracking-wide">
          Growing one transformation at a time
        </p>
      </section>
    </main>
  );
}
