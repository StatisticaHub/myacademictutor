"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  description: string;
};

function clean(value: number, digits = 3) {
  return Number(value.toFixed(digits));
}

export default function FTCConnectionExplorer({
  title,
  description,
}: Props) {
  const [x, setX] = useState(1.5);

  const values = useMemo(
    () => ({
      height: x * x,
      accumulated:
        x ** 3 / 3,
      accumulationSlope:
        x * x,
    }),
    [x]
  );

  return (
    <section className="calc-lab">
      <div className="calc-lab-heading">
        <span className="calc-lab-kicker">
          Interactive lab
        </span>

        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="calc-builder-grid">
        <div className="calc-lab-controls">
          <label className="calc-range">
            <span>
              Upper limit x
              <strong>{clean(x, 2)}</strong>
            </span>

            <input
              type="range"
              min="0"
              max="3"
              step="0.05"
              value={x}
              onChange={(event) =>
                setX(Number(event.target.value))
              }
            />
          </label>

          <div className="calc-metrics">
            <article>
              <span>Current f(x)</span>
              <strong>{clean(values.height)}</strong>
            </article>

            <article>
              <span>Accumulation A(x)</span>
              <strong>{clean(values.accumulated)}</strong>
            </article>

            <article>
              <span>A′(x)</span>
              <strong>{clean(values.accumulationSlope)}</strong>
            </article>
          </div>
        </div>

        <div className="calc-builder">
          <article>
            <span>Integrand</span>
            <strong>f(x)=x²</strong>
          </article>

          <article>
            <span>Accumulation</span>
            <strong>A(x)=∫₀ˣt²dt=x³/3</strong>
          </article>

          <article className="emphasis">
            <span>FTC connection</span>
            <strong>A′(x)=x²=f(x)</strong>
          </article>

          <p>
            At the selected x, the
            slope of the accumulation
            function equals the
            current height of the
            original function.
          </p>
        </div>
      </div>
    </section>
  );
}
