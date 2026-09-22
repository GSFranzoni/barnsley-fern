import { useEffect, useRef } from "react";

export type Point = {
  xn: number;
  yn: number;
};

type Props = {
  points: Point[];
};

const width = 600;

const height = 700;

const leafColor = "rgba(16, 185, 129, 0.12)";

const toCanvasX = (x: number) => ((x + 3) / 6) * width;

const toCanvasY = (y: number) => height - (y / 10) * height;

export function Fractal({ points }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (!context) {
      return;
    }

    context.clearRect(0, 0, width, height);
    context.fillStyle = leafColor;

    for (const point of points) {
      context.beginPath();
      context.arc(toCanvasX(point.xn), toCanvasY(point.yn), 1.1, 0, Math.PI * 2);
      context.fill();
    }
  }, [points]);

  return (
    <canvas className="block h-auto w-full max-w-[600px]" height={height} ref={canvasRef} width={width}>
      Your browser does not support canvas.
    </canvas>
  );
}
