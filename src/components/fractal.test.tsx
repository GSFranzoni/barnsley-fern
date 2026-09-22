import { render } from "vitest-browser-react";
import { describe, expect, it } from "vitest";

import { Fractal } from "./fractal";

function getCanvas(container: HTMLElement) {
  const canvas = container.querySelector("canvas");

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("The fractal canvas was not rendered");
  }

  return canvas;
}

describe("Fractal", () => {
  it("draws each point at its scaled canvas position", async () => {
    const screen = await render(<Fractal points={[{ xn: 0, yn: 5 }]} />);
    const canvas = getCanvas(screen.container);
    const context = canvas.getContext("2d");

    expect(canvas.width).toBe(600);
    expect(canvas.height).toBe(700);
    expect(context).not.toBeNull();

    const pixel = context!.getImageData(300, 350, 1, 1).data;

    expect(pixel[3]).toBeGreaterThan(0);
    expect(pixel[1]).toBeGreaterThan(pixel[0]);
    expect(pixel[1]).toBeGreaterThan(pixel[2]);
  });

  it("clears the canvas when the point list changes", async () => {
    const screen = await render(<Fractal points={[{ xn: 0, yn: 5 }]} />);
    const canvas = getCanvas(screen.container);
    const context = canvas.getContext("2d");

    await screen.rerender(<Fractal points={[]} />);

    expect(context!.getImageData(300, 350, 1, 1).data[3]).toBe(0);
  });
});
