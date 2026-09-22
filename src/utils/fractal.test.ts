import { afterEach, describe, expect, it, vi } from "vitest";

import { generate } from "./fractal";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("generate", () => {
  it("starts at the origin and yields the requested number of points", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect([...generate(2)]).toEqual([
      { xn: 0, yn: 0 },
      { xn: 0, yn: 0 },
    ]);
  });

  it.each([
    [0, { xn: 0, yn: 0 }],
    [0.01, { xn: 0, yn: 1.6 }],
    [0.86, { xn: 0, yn: 1.6 }],
    [0.93, { xn: 0, yn: 0.44 }],
  ])("uses the correct transform at random value %s", (random, expected) => {
    vi.spyOn(Math, "random").mockReturnValue(random);

    const points = [...generate(2)];

    expect(points[1]).toEqual(expected);
  });
});
