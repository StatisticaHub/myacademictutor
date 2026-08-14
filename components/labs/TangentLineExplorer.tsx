"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  description: string;
};

function f(x: number) {
  return x * x;
}

function clean(value: number, digits = 3) {
  return Number(value.toFixed(digits));
}

export default function TangentLineExplorer({
  title,
  description,
}: Props) {
  const [x, setX] = useState(1.5);
  const [h, setH] = useState(1.5);

  const values = useMemo(() => {
    const x2 = x + h;
    const y1 = f(x);
    const y2 = f(x2);
    const secantSlope = (y2 - y1) / h;
    const tangentSlope = 2 * x;

    return {
      x2,
      y1,
      y2,
      secantSlope,
      tangentSlope,
      difference: Math.abs(secantSlope - tangentSlope),
    };
  }, [x, h]);

  const width = 640;
  const height = 330;
  const left = 48;
  const right = 24;
  const top = 22;
  const bottom = 42;
  const xMin = -3;
  const xMax = 3;
  const yMin = -2;
  const yMax = 12;

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
        xMin +
        (index / 120) *
          (xMax - xMin);

      return `${sx(px)},${sy(f(px))}`;
    }
  ).join(" ");

  const secantYLeft =
    values.y1 +
    values.secantSlope *
      (xMin - x);

  const secantYRight =
    values.y1 +
    values.secantSlope *
      (xMax - x);

  const tangentYLeft =
    values.y1 +
    values.tangentSlope *
      (xMin - x);

  const tangentYRight =
    values.y1 +
    values.tangentSlope *
      (xMax - x);

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
              Base point x
              <strong>{clean(x, 2)}</strong>
            </span>

            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={x}
              onChange={(event) =>
                setX(Number(event.target.value))
              }
            />
          </label>

          <label className="calc-range">
            <span>
              Interval h
              <strong>{clean(h, 3)}</strong>
            </span>

            <input
              type="range"
              min="0.02"
              max="2.5"
              step="0.02"
              value={h}
              onChange={(event) =>
                setH(Number(event.target.value))
              }
            />
          </label>

          <div className="calc-metrics">
            <article>
              <span>Secant slope</span>
              <strong>{clean(values.secantSlope)}</strong>
            </article>

            <article>
              <span>Tangent slope</span>
              <strong>{clean(values.tangentSlope)}</strong>
            </article>
          </div>

          <div className="calc-lab-note">
            <strong>
              Difference: {clean(values.difference)}
            </strong>

            <p>
              Reduce h and the secant
              line approaches the
              tangent line.
            </p>
          </div>
        </div>

        <div className="calc-chart-wrap">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="calc-chart"
            role="img"
            aria-label="Parabola with secant and tangent lines"
          >
            <line
              x1={sx(xMin)}
              x2={sx(xMax)}
              y1={sy(0)}
              y2={sy(0)}
              className="calc-axis"
            />

            <line
              x1={sx(0)}
              x2={sx(0)}
              y1={sy(yMin)}
              y2={sy(yMax)}
              className="calc-axis"
            />

            <polyline
              points={curve}
              className="calc-curve"
            />

            <line
              x1={sx(xMin)}
              y1={sy(secantYLeft)}
              x2={sx(xMax)}
              y2={sy(secantYRight)}
              className="calc-secondary-line"
            />

            <line
              x1={sx(xMin)}
              y1={sy(tangentYLeft)}
              x2={sx(xMax)}
              y2={sy(tangentYRight)}
              className="calc-primary-line"
            />

            <circle
              cx={sx(x)}
              cy={sy(values.y1)}
              r="7"
              className="calc-point"
            />

            <circle
              cx={sx(values.x2)}
              cy={sy(values.y2)}
              r="6"
              className="calc-point secondary"
            />
          </svg>

          <div className="calc-chart-caption">
            <strong>f(x)=x²</strong>
            <span>tangent slope at x = 2x</span>
          </div>
        </div>
      </div>
    </section>
  );
}
