"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  description: string;
};

function f(x: number) {
  return x * x;
}

function clean(value: number, digits = 4) {
  return Number(value.toFixed(digits));
}

export default function RiemannSumExplorer({
  title,
  description,
}: Props) {
  const [n, setN] = useState(4);

  const values = useMemo(() => {
    const a = 0;
    const b = 2;
    const dx = (b - a) / n;
    let sum = 0;

    const rectangles = Array.from(
      { length: n },
      (_, index) => {
        const left = a + index * dx;
        const right = left + dx;
        const height = f(right);

        sum += dx * height;

        return {
          left,
          right,
          height,
        };
      }
    );

    return {
      rectangles,
      estimate: sum,
      exact: 8 / 3,
      error:
        Math.abs(
          sum - 8 / 3
        ),
    };
  }, [n]);

  const width = 640;
  const height = 320;
  const left = 48;
  const right = 24;
  const top = 22;
  const bottom = 42;
  const xMin = 0;
  const xMax = 2.15;
  const yMin = 0;
  const yMax = 4.5;

  const sx = (value: number) =>
    left +
    ((value - xMin) / (xMax - xMin)) *
      (width - left - right);

  const sy = (value: number) =>
    top +
    ((yMax - value) / (yMax - yMin)) *
      (height - top - bottom);

  const curve = Array.from(
    { length: 121 },
    (_, index) => {
      const px =
        (2 * index) / 120;

      return `${sx(px)},${sy(f(px))}`;
    }
  ).join(" ");

  return (
    <section className="calc-lab">
      <div className="calc-lab-heading">
        <span className="calc-lab-kicker">
          Interactive lab
        </span>

        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="calc-lab-grid">
        <div className="calc-lab-controls">
          <label className="calc-range">
            <span>
              Rectangles n
              <strong>{n}</strong>
            </span>

            <input
              type="range"
              min="2"
              max="40"
              step="1"
              value={n}
              onChange={(event) =>
                setN(Number(event.target.value))
              }
            />
          </label>

          <div className="calc-metrics">
            <article>
              <span>Right sum</span>
              <strong>{clean(values.estimate)}</strong>
            </article>

            <article>
              <span>Exact integral</span>
              <strong>{clean(values.exact)}</strong>
            </article>

            <article>
              <span>Error</span>
              <strong>{clean(values.error)}</strong>
            </article>
          </div>

          <div className="calc-lab-note">
            <strong>
              More rectangles, narrower widths
            </strong>

            <p>
              The right-endpoint sum
              approaches 8/3 as the
              partition becomes finer.
            </p>
          </div>
        </div>

        <div className="calc-chart-wrap">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="calc-chart"
            role="img"
            aria-label="Riemann rectangles under x squared"
          >
            {values.rectangles.map(
              (rectangle, index) => (
                <rect
                  key={index}
                  x={sx(rectangle.left)}
                  y={sy(rectangle.height)}
                  width={
                    sx(rectangle.right) -
                    sx(rectangle.left)
                  }
                  height={
                    sy(0) -
                    sy(rectangle.height)
                  }
                  className="calc-rectangle"
                />
              )
            )}

            <line
              x1={sx(xMin)}
              x2={sx(xMax)}
              y1={sy(0)}
              y2={sy(0)}
              className="calc-axis"
            />

            <polyline
              points={curve}
              className="calc-curve"
            />
          </svg>

          <div className="calc-chart-caption">
            <strong>f(x)=x² on [0,2]</strong>
            <span>exact area = 8/3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
