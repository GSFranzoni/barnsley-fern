# Barnsley Fern

> A small browser experiment in fractals: watch a fern emerge from four matrix transformations.

[![Live demo](https://img.shields.io/badge/live%20demo-open-34d399?logo=github)](https://gsfranzoni.github.io/barnsley-fern/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Bun](https://img.shields.io/badge/Bun-1.4-000?logo=bun&logoColor=white)](https://bun.sh/)

<p align="center">
  <img src="public/assets/example.png" width="200" alt="Barnsley fern rendered on the project canvas" />
</p>

[Live demo →](https://gsfranzoni.github.io/barnsley-fern/)

Barnsley Fern is an interactive rendering of the classic iterated function system (IFS). Starting at the origin, each point is transformed by one of four affine matrix operations selected at random. Repeating that process thousands of times produces the fern.

This project intentionally overcomplicates a few things that could have been written directly as coordinate equations. The goal was to practice and revisit matrix operations, generators, canvas rendering and browser-based testing—not to present the smallest possible implementation.

The transformations and probabilities are based on the [Barnsley fern reference](https://en.wikipedia.org/wiki/Barnsley_fern).

## How it works

```text
Origin (0, 0)
     │
     ▼
Randomly select one affine transformation
     │
     ├── f₁ — stem                    1%
     ├── f₂ — smaller leaflets       85%
     ├── f₃ — large left leaflet      7%
     └── f₄ — large right leaflet     7%
     │
     ▼
Matrix multiplication + translation
     │
     ▼
Generator yields the next point
     │
     ▼
React streams batches per animation frame
     │
     ▼
Native canvas draws translucent green points
```

Each transformation has the form:

```text
nextPoint = matrix × point + translation
```

The `f₂` transformation is selected most often, so it builds the main body of the fern. The less frequent transformations form the stem and side leaves. Translucent points accumulate in dense areas, leaving the outer leaves naturally darker.

## What you can explore

- Watch up to 100,000 points build the fern in the browser.
- Reset the stream at any time and grow a new fern.
- Inspect the matrix multiplication and addition utilities behind the affine transformations.
- See a generator streamed into React state in animation-frame batches.
- Run unit and browser tests for matrices, the IFS generator, the hook, and the canvas renderer.

## Support

If you enjoyed this small fractal experiment, you can support its creator here:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?logo=buymeacoffee&logoColor=000)](https://buymeacoffee.com/gsfranzoni)

<a href="https://buymeacoffee.com/gsfranzoni">
  <img src="public/assets/buymeacoffee.png" width="220" alt="Buy Me a Coffee QR code for gsfranzoni" />
</a>

## Quick start

Requires [Bun](https://bun.sh/) 1.4 or newer.

```bash
bun install
bun run dev
```

Open the Vite URL printed in the terminal, usually [`http://localhost:5173`](http://localhost:5173).

To create a production build locally:

```bash
bun run build
```

## Commands

| Command             | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `bun run dev`       | Start the Vite development server.               |
| `bun run build`     | Type-check and create a production build.        |
| `bun run preview`   | Preview the production build locally.            |
| `bun run test`      | Run the Vitest suite in headless Chromium.       |
| `bun run lint`      | Run Oxlint.                                      |
| `bun run lint:fix`  | Apply available Oxlint fixes.                    |
| `bun run fmt`       | Format source files with Oxfmt.                  |
| `bun run fmt:check` | Check formatting without modifying source files. |

> [!NOTE]
> Use `bun run test`, not `bun test`. The former starts Vitest Browser Mode, which is required by the React hook and canvas tests.

## Project structure

```text
src
├── app.tsx
│   └── Page layout, point counter, and reset control
├── components/fractal.tsx
│   └── Responsive native-canvas renderer
├── hooks/use-generator.ts
│   └── Streams generator values in animation-frame batches
└── utils
    ├── matrix.ts
    │   └── Matrix addition and multiplication
    └── fractal.ts
        └── Barnsley fern affine transformations and generator
```

Tests live next to the modules they cover. The project uses Vitest Browser Mode with Playwright so canvas and hook behavior run in a real Chromium browser.
