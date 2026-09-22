import { Fractal } from "@/components/fractal";
import { useGenerator } from "@/hooks/use-generator";
import { generate } from "@/utils/fractal";

export function App() {
  const { reset, values: points } = useGenerator(() => generate(100_000), 250);

  return (
    <main className="relative grid min-h-screen items-start justify-items-center overflow-hidden px-4 pt-10 pb-8 text-emerald-50 sm:place-items-center sm:p-10">
      <div className="pointer-events-none absolute top-0 -left-32 size-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-40 size-128 rounded-full bg-emerald-400/10 blur-3xl" />

      <section className="relative w-full max-w-2xl">
        <header className="mb-5 flex flex-col items-start gap-3 px-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-[0.28em] text-emerald-300/70 uppercase">
              Iterated function system
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Barnsley fern
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-200 tabular-nums backdrop-blur-sm sm:text-right">
              <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-emerald-300" />
              {points.length.toLocaleString()} points
            </div>
            <button
              className="rounded-full border border-emerald-300/25 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:outline-none"
              onClick={reset}
              type="button"
            >
              Reset
            </button>
          </div>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-3">
          <div className="grid place-items-center overflow-hidden rounded-xl border border-emerald-200/10 bg-[#020804]">
            <Fractal points={points} />
          </div>
        </div>

        <p className="mt-4 text-center text-xs tracking-wide text-emerald-100/45">
          Growing one transformation at a time
        </p>
      </section>
    </main>
  );
}
