"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  description: string;
};

export default function ChainRuleBuilder({
  title,
  description,
}: Props) {
  const [power, setPower] = useState(3);
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);

  const derivative = useMemo(
    () => ({
      outer:
        `${power}(${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)})^${power - 1}`,
      inner: `${a}`,
      final:
        `${power * a}(${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)})^${power - 1}`,
    }),
    [power, a, b]
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
              Outer power n
              <strong>{power}</strong>
            </span>

            <input
              type="range"
              min="2"
              max="7"
              step="1"
              value={power}
              onChange={(event) =>
                setPower(Number(event.target.value))
              }
            />
          </label>

          <label className="calc-range">
            <span>
              Inner slope a
              <strong>{a}</strong>
            </span>

            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={a}
              onChange={(event) =>
                setA(Number(event.target.value))
              }
            />
          </label>

          <label className="calc-range">
            <span>
              Inner intercept b
              <strong>{b}</strong>
            </span>

            <input
              type="range"
              min="-4"
              max="4"
              step="1"
              value={b}
              onChange={(event) =>
                setB(Number(event.target.value))
              }
            />
          </label>
        </div>

        <div className="calc-builder">
          <article>
            <span>Composite function</span>
            <strong>
              y = ({a}x {b >= 0 ? "+" : "−"} {Math.abs(b)})^{power}
            </strong>
          </article>

          <article>
            <span>1. Differentiate outer layer</span>
            <strong>{derivative.outer}</strong>
          </article>

          <article>
            <span>2. Differentiate inner layer</span>
            <strong>× {derivative.inner}</strong>
          </article>

          <article className="emphasis">
            <span>Final derivative</span>
            <strong>y′ = {derivative.final}</strong>
          </article>
        </div>
      </div>
    </section>
  );
}
