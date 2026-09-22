import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "vitest-browser-react";

import { useGenerator } from "./use-generator";

let frameId = 0;
let frames = new Map<number, FrameRequestCallback>();

function runNextFrame() {
  const next = frames.entries().next().value;

  if (!next) {
    throw new Error("No animation frame is queued");
  }

  const [id, callback] = next;
  frames.delete(id);
  callback(0);
}

function* values(...items: number[]) {
  yield* items;
}

beforeEach(() => {
  frameId = 0;
  frames = new Map();

  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((callback: FrameRequestCallback) => {
      frameId += 1;
      frames.set(frameId, callback);
      return frameId;
    }),
  );
  vi.stubGlobal(
    "cancelAnimationFrame",
    vi.fn((id: number) => {
      frames.delete(id);
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useGenerator", () => {
  it("streams values in animation-frame batches", async () => {
    const generator = () => values(1, 2, 3);
    const { act, result } = await renderHook(() => useGenerator(generator, 2));

    expect(result.current.values).toEqual([]);

    await act(runNextFrame);
    expect(result.current.values).toEqual([1, 2]);

    await act(runNextFrame);
    expect(result.current.values).toEqual([1, 2, 3]);

    await act(runNextFrame);
    expect(frames.size).toBe(0);
  });

  it("does not restart when given an inline generator factory", async () => {
    let created = 0;
    const { act, result } = await renderHook(() => useGenerator(() => values(++created)));

    await act(runNextFrame);

    expect(result.current.values).toEqual([1]);
    expect(created).toBe(1);
  });

  it("uses the latest generator when reset", async () => {
    const first = () => values(1);
    const second = () => values(2, 3);
    const { act, result, rerender } = await renderHook(
      (props) => useGenerator(props?.generator ?? first),
      {
        initialProps: { generator: first },
      },
    );

    await act(runNextFrame);
    expect(result.current.values).toEqual([1]);

    await rerender({ generator: second });
    expect(result.current.values).toEqual([1]);

    await act(result.current.reset);
    expect(result.current.values).toEqual([]);

    await act(runNextFrame);
    expect(result.current.values).toEqual([2]);
  });

  it("cancels the pending frame and closes the iterator on unmount", async () => {
    const iterator = {
      next: vi.fn(() => ({ done: false, value: 1 })),
      return: vi.fn(() => ({ done: true, value: undefined })),
    };
    const generator = () => iterator;
    const { unmount } = await renderHook(() => useGenerator(generator));

    await unmount();

    expect(cancelAnimationFrame).toHaveBeenCalledWith(1);
    expect(iterator.return).toHaveBeenCalledOnce();
  });
});
