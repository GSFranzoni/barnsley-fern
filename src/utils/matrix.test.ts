import { describe, expect, it } from "vitest";

import { add, mul } from "./matrix";

describe("mul", () => {
  it("multiplies two square matrices", () => {
    expect(
      mul(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [5, 6],
          [7, 8],
        ],
      ),
    ).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  it("multiplies rectangular matrices", () => {
    expect(
      mul(
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [7, 8],
          [9, 10],
          [11, 12],
        ],
      ),
    ).toEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  it("rejects incompatible dimensions", () => {
    expect(() => mul([[1, 2]], [[3, 4]])).toThrow();
  });
});

describe("add", () => {
  it("adds every corresponding element of rectangular matrices", () => {
    expect(
      add(
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [10, 20, 30],
          [40, 50, 60],
        ],
      ),
    ).toEqual([
      [11, 22, 33],
      [44, 55, 66],
    ]);
  });

  it("rejects matrices with different dimensions", () => {
    expect(() => add([[1, 2]], [[1], [2]])).toThrow();
  });
});
