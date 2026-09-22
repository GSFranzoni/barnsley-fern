import { add, mul } from "@/utils/matrix";

function f1(x: number, y: number) {
  const [[xn], [yn]] = mul(
    [
      [0.0, 0.0],
      [0.0, 0.16],
    ],
    [[x], [y]],
  );

  return { xn, yn };
}

function f2(x: number, y: number) {
  const [[xn], [yn]] = add(
    mul(
      [
        [0.85, 0.04],
        [-0.04, 0.85],
      ],
      [[x], [y]],
    ),
    [[0.0], [1.6]],
  );

  return { xn, yn };
}

function f3(x: number, y: number) {
  const [[xn], [yn]] = add(
    mul(
      [
        [0.2, -0.26],
        [0.23, 0.22],
      ],
      [[x], [y]],
    ),
    [[0.0], [1.6]],
  );

  return { xn, yn };
}

function f4(x: number, y: number) {
  const [[xn], [yn]] = add(
    mul(
      [
        [-0.15, 0.28],
        [0.26, 0.24],
      ],
      [[x], [y]],
    ),
    [[0.0], [0.44]],
  );

  return { xn, yn };
}

export function* generate(iterations: number = Infinity) {
  let point: { xn: number; yn: number } = {
    xn: 0,
    yn: 0,
  };

  yield point;

  for (let iteration = 1; iteration < iterations; iteration++) {
    const random = Math.random();

    if (random < 0.01) {
      point = f1(point.xn, point.yn);
    } else if (random < 0.86) {
      point = f2(point.xn, point.yn);
    } else if (random < 0.93) {
      point = f3(point.xn, point.yn);
    } else {
      point = f4(point.xn, point.yn);
    }

    yield point;
  }
}
