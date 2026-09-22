export type Matrix = number[][];

export function mul(a: Matrix, b: Matrix): Matrix {
  if (a[0].length !== b.length) {
    throw new Error(
      "The amount of lines of the first matrix should be exactly the amount of columns of the second one",
    );
  }

  const result: Matrix = Array.from({ length: a.length }, () => new Array(b[0].length).fill(0));

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
}

export function add(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error(
      "The amount of lines of the first matrix should be exactly the amount of columns of the second one",
    );
  }

  const result: Matrix = [];

  for (let i = 0; i < a.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < b[0].length; j++) {
      row.push(a[i][j] + b[i][j]);
    }
    result.push(row);
  }

  return result;
}
