"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  description: string;
};

function f(x: number) {
  return x ** 3 - 3 * x;
}

function fp(x: number) {
  return 3 * x * x - 3;
}

function fpp(x: number) {
  return 6 * x;
}

function clean(value: number) {
  return Number(value.toFixed(2));
}

export default function CurveBehaviourExplorer({
  title,
  description,
}: Props) {
  const [x, setX] = useState(-1.5);

  const values = useMemo(
    () => ({
      y: f(x),
      first: fp(x),
      second: fpp(x),
    }),
    [x]
  );

  const behaviour =
    values.first > 0.05
      ? "Increasing"
      : values.first < -0.05
        ? "Decreasing"
        : "Stationary";

  const curvature =
    values.second > 0.05
      ? "Concave up"
      : values.second < -0.05
        ? "Concave down"
        : "Inflection level";

  const width = 640;
  const height = 320;
  const left = 48;
  const right = 24;
  const top = 22;
  const bottom = 42;
  const xMin = -2.3;
  const xMax = 2.3;
  const yMin = -5;
  const yMax = 5;

  const sx = (value: number) =>
    left +
    ((value - xMin) / (xMax - xMin)) *
      (width - left - right);

  const sy = (value: number) =>
    top +
    ((yMax - value) / (yMax - yMin)) *
      (height - top - bottom);

  const curve = Array.from(
    { length: 141 },
    (_, index) => {
      const px =
        xMin +
        (index / 140) *
          (xMax - xMin);

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
              Position x
              <strong>{clean(x)}</strong>
            </span>

            <input
              type="range"
              min="-2"
              max="2"
              step="0.05"
              value={x}
              onChange={(event) =>
                setX(Number(event.target.value))
              }
            />
          </label>

          <div className="calc-metrics">
            <article>
              <span>f(x)</span>
              <strong>{clean(values.y)}</strong>
            </article>

            <article>
              <span>f′(x)</span>
              <strong>{clean(values.first)}</strong>
            </article>

            <article>
              <span>f″(x)</span>
              <strong>{clean(values.second)}</strong>
            </article>
          </div>

          <div className="calc-lab-note">
            <strong>{behaviour}</strong>
            <p>{curvature}</p>
          </div>
        </div>

        <div className="calc-chart-wrap">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="calc-chart"
            role="img"
            aria-label="Cubic curve with a movable point"
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

            <circle
              cx={sx(x)}
              cy={sy(values.y)}
              r="8"
              className="calc-point"
            />
          </svg>

          <div className="calc-chart-caption">
            <strong>f(x)=x³−3x</strong>
            <span>f′=3x²−3, f″=6x</span>
          </div>
        </div>
      </div>
    </section>
  );
}
