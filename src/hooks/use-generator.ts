import { useEffect, useState } from "react";

export function useGenerator<T>(createGenerator: () => Iterator<T>, batchSize = 1) {
  const [values, setValues] = useState<T[]>([]);

  useEffect(() => {
    const iterator = createGenerator();

    let frameId: number;

    const consume = () => {
      const batch: T[] = [];

      for (let i = 0; i < batchSize; i++) {
        const { value, done } = iterator.next();

        if (done) {
          break;
        }

        batch.push(value);
      }

      if (!batch.length) {
        return;
      }

      setValues((values) => [...values, ...batch]);
      frameId = requestAnimationFrame(consume);
    };

    // oxlint-disable-next-line react/set-state-in-effect
    setValues([]);

    frameId = requestAnimationFrame(consume);

    return () => {
      cancelAnimationFrame(frameId);
      iterator.return?.();
    };
  }, [createGenerator, batchSize]);

  return values;
}
