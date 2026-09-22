import { useCallback, useEffect, useRef, useState } from "react";

export function useGenerator<T>(createGenerator: () => Iterator<T>, batchSize = 1) {
  const generatorRef = useRef(createGenerator);

  const [values, setValues] = useState<T[]>([]);

  const [generation, setGeneration] = useState(0);

  const reset = useCallback(() => setGeneration((current) => current + 1), []);

  useEffect(() => {
    generatorRef.current = createGenerator;
  }, [createGenerator]);

  useEffect(() => {
    const iterator = generatorRef.current();

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
  }, [batchSize, generation]);

  return { reset, values };
}
