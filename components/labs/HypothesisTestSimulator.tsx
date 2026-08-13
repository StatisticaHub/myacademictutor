"use client";

import {
  useMemo,
  useState,
} from "react";


type HypothesisTestSimulatorProps = {
  title?: string;
  description?: string;
};


type AlphaLevel =
  | 0.1
  | 0.05
  | 0.01;


/* ==========================================================================
   NORMAL HELPERS
   ========================================================================== */

function erf(
  value: number
) {
  const sign =
    value >= 0
      ? 1
      : -1;

  const x =
    Math.abs(
      value
    );

  const a1 =
    0.254829592;

  const a2 =
    -0.284496736;

  const a3 =
    1.421413741;

  const a4 =
    -1.453152027;

  const a5 =
    1.061405429;

  const p =
    0.3275911;


  const t =
    1 /
    (
      1 +
      p * x
    );


  const y =
    1 -
    (
      (
        (
          (
            (
              a5 * t +
              a4
            ) *
              t +
            a3
          ) *
            t +
          a2
        ) *
          t +
        a1
      ) *
        t
    ) *
      Math.exp(
        -x * x
      );


  return (
    sign *
    y
  );
}


function standardNormalCdf(
  z: number
) {
  return (
    0.5 *
    (
      1 +
      erf(
        z /
        Math.sqrt(
          2
        )
      )
    )
  );
}


function randomNormal(
  mean: number,
  sd: number
) {
  const u1 =
    Math.max(
      Math.random(),
      Number.EPSILON
    );

  const u2 =
    Math.random();


  const z =
    Math.sqrt(
      -2 *
      Math.log(
        u1
      )
    ) *
    Math.cos(
      2 *
      Math.PI *
      u2
    );


  return (
    mean +
    sd * z
  );
}


/* ==========================================================================
   COMPONENT
   ========================================================================== */

export default function HypothesisTestSimulator({
  title =
    "Hypothesis Testing Simulator",

  description =
    "Explore a simple two-sided test of a population mean and see how the test statistic, p-value and significance decision change.",
}: HypothesisTestSimulatorProps) {

  const [
    nullMean,
    setNullMean,
  ] =
    useState(50);


  const [
    observedMean,
    setObservedMean,
  ] =
    useState(54);


  const [
    populationSd,
    setPopulationSd,
  ] =
    useState(10);


  const [
    sampleSize,
    setSampleSize,
  ] =
    useState(25);


  const [
    alpha,
    setAlpha,
  ] =
    useState<AlphaLevel>(
      0.05
    );


  /* ------------------------------------------------------------------------
     TEST CALCULATIONS
     ------------------------------------------------------------------------ */

  const result =
    useMemo(
      () => {

        const standardError =
          populationSd /
          Math.sqrt(
            sampleSize
          );


        const z =
          (
            observedMean -
            nullMean
          ) /
          standardError;


        const upperTail =
          1 -
          standardNormalCdf(
            Math.abs(
              z
            )
          );


        const pValue =
          Math.min(
            1,
            2 *
            upperTail
          );


        const significant =
          pValue <
          alpha;


        return {
          standardError,
          z,
          pValue,
          significant,
        };
      },
      [
        nullMean,
        observedMean,
        populationSd,
        sampleSize,
        alpha,
      ]
    );


  /* ------------------------------------------------------------------------
     NULL DISTRIBUTION CURVE
     ------------------------------------------------------------------------ */

  const curve =
    useMemo(
      () => {

        const points =
          Array.from(
            {
              length:
                161,
            },
            (
              _,
              index
            ) => {

              const z =
                -4 +
                (
                  index /
                  160
                ) *
                  8;


              const density =
                Math.exp(
                  -0.5 *
                  z *
                  z
                );


              const x =
                (
                  (
                    z +
                    4
                  ) /
                  8
                ) *
                600;


              const y =
                180 -
                density *
                  145;


              return {
                z,
                x,
                y,
              };
            }
          );


        const path =
          points
            .map(
              (
                point,
                index
              ) =>
                `${
                  index === 0
                    ? "M"
                    : "L"
                } ${point.x.toFixed(
                  2
                )} ${point.y.toFixed(
                  2
                )}`
            )
            .join(
              " "
            );


        const observedZ =
          Math.max(
            -4,
            Math.min(
              4,
              result.z
            )
          );


        const observedX =
          (
            (
              observedZ +
              4
            ) /
            8
          ) *
          600;


        const mirrorZ =
          -observedZ;


        const mirrorX =
          (
            (
              mirrorZ +
              4
            ) /
            8
          ) *
          600;


        return {
          path,
          observedX,
          mirrorX,
        };
      },
      [
        result.z,
      ]
    );


  /* ------------------------------------------------------------------------
     SIMULATE UNDER NULL
     ------------------------------------------------------------------------ */

  function simulateUnderNull() {
    const se =
      populationSd /
      Math.sqrt(
        sampleSize
      );


    const simulatedMean =
      randomNormal(
        nullMean,
        se
      );


    setObservedMean(
      Number(
        simulatedMean.toFixed(
          1
        )
      )
    );
  }


  return (
    <div className="hypothesis-simulator">

      {/* ================================================================
          HEADER
          ================================================================ */}

      <header className="hypothesis-simulator-header">

        <span>
          Interactive lab
        </span>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </header>


      {/* ================================================================
          HYPOTHESES
          ================================================================ */}

      <section className="hypothesis-section">

        <div className="hypothesis-heading">

          <span className="eyebrow">
            Step 01
          </span>

          <h4>
            Define the null model
          </h4>

          <p>
            This introductory simulator
            uses a two-sided test of one
            population mean with known
            population standard
            deviation.
          </p>

        </div>


        <div className="hypothesis-equations">

          <article>
            <span>
              Null hypothesis
            </span>

            <strong>
              H₀: μ = {nullMean}
            </strong>
          </article>


          <article>
            <span>
              Alternative hypothesis
            </span>

            <strong>
              H₁: μ ≠ {nullMean}
            </strong>
          </article>

        </div>


        <div className="hypothesis-control-grid">

          <label>

            <span>
              Null mean, μ₀
            </span>

            <input
              type="range"
              min="30"
              max="70"
              step="1"
              value={
                nullMean
              }
              onChange={(
                event
              ) =>
                setNullMean(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {nullMean}
            </strong>

          </label>


          <label>

            <span>
              Observed sample mean
            </span>

            <input
              type="range"
              min="25"
              max="75"
              step="0.5"
              value={
                observedMean
              }
              onChange={(
                event
              ) =>
                setObservedMean(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {observedMean}
            </strong>

          </label>


          <label>

            <span>
              Population SD, σ
            </span>

            <input
              type="range"
              min="4"
              max="20"
              step="1"
              value={
                populationSd
              }
              onChange={(
                event
              ) =>
                setPopulationSd(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {populationSd}
            </strong>

          </label>

        </div>

      </section>


      {/* ================================================================
          SAMPLE SIZE
          ================================================================ */}

      <section className="hypothesis-section hypothesis-soft-section">

        <div className="hypothesis-heading">

          <span className="eyebrow">
            Step 02
          </span>

          <h4>
            Choose sample size
          </h4>

        </div>


        <div className="hypothesis-option-buttons">

          {[10, 25, 50, 100, 250].map(
            (
              value
            ) => (

              <button
                key={
                  value
                }
                type="button"
                className={
                  sampleSize ===
                  value
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSampleSize(
                    value
                  )
                }
              >
                n = {value}
              </button>

            )
          )}

        </div>


        <div className="hypothesis-stat-grid">

          <article>

            <span>
              Standard error
            </span>

            <strong>
              {result.standardError.toFixed(
                3
              )}
            </strong>

          </article>


          <article>

            <span>
              Difference
            </span>

            <strong>
              {(
                observedMean -
                nullMean
              ).toFixed(
                2
              )}
            </strong>

          </article>


          <article>

            <span>
              z statistic
            </span>

            <strong>
              {result.z.toFixed(
                3
              )}
            </strong>

          </article>

        </div>

      </section>


      {/* ================================================================
          NULL DISTRIBUTION
          ================================================================ */}

      <section className="hypothesis-section">

        <div className="hypothesis-heading">

          <span className="eyebrow">
            Null distribution
          </span>

          <h4>
            How unusual is the result
            under H₀?
          </h4>

          <p>
            The dashed markers show
            results at least as extreme
            as the observed z statistic
            in either direction.
          </p>

        </div>


        <div className="hypothesis-chart">

          <svg
            viewBox="0 0 600 200"
            role="img"
            aria-label="Null distribution with observed test statistic"
          >

            <line
              x1="0"
              y1="180"
              x2="600"
              y2="180"
              className="hypothesis-axis"
            />


            <path
              d={
                curve.path
              }
              className="hypothesis-null-curve"
            />


            <line
              x1={
                curve.observedX
              }
              y1="20"
              x2={
                curve.observedX
              }
              y2="180"
              className="hypothesis-observed-line"
            />


            <line
              x1={
                curve.mirrorX
              }
              y1="20"
              x2={
                curve.mirrorX
              }
              y2="180"
              className="hypothesis-mirror-line"
            />

          </svg>


          <div className="hypothesis-chart-labels">

            <span>
              −4
            </span>

            <span>
              0
            </span>

            <span>
              +4
            </span>

          </div>

        </div>

      </section>


      {/* ================================================================
          P VALUE
          ================================================================ */}

      <section className="hypothesis-section hypothesis-dark-section">

        <div className="hypothesis-heading">

          <span className="eyebrow">
            Evidence
          </span>

          <h4>
            Calculate the p-value
          </h4>

        </div>


        <div className="hypothesis-result-grid">

          <article>

            <span>
              |z|
            </span>

            <strong>
              {Math.abs(
                result.z
              ).toFixed(
                3
              )}
            </strong>

          </article>


          <article>

            <span>
              Two-sided p-value
            </span>

            <strong>
              {result.pValue <
              0.0001
                ? "< 0.0001"
                : result.pValue.toFixed(
                    4
                  )}
            </strong>

          </article>


          <article>

            <span>
              α
            </span>

            <strong>
              {alpha}
            </strong>

          </article>

        </div>


        <div className="hypothesis-alpha-buttons">

          {(
            [
              0.1,
              0.05,
              0.01,
            ] as AlphaLevel[]
          ).map(
            (
              level
            ) => (

              <button
                key={
                  level
                }
                type="button"
                className={
                  alpha ===
                  level
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAlpha(
                    level
                  )
                }
              >
                α = {level}
              </button>

            )
          )}

        </div>

      </section>


      {/* ================================================================
          DECISION
          ================================================================ */}

      <section className="hypothesis-decision">

        <span>
          Statistical decision
        </span>


        <h4>
          {result.significant
            ? "Reject H₀ at the selected significance level."
            : "Do not reject H₀ at the selected significance level."}
        </h4>


        <p>
          {result.significant
            ? `The observed result would be relatively unusual under the null model because p = ${result.pValue.toFixed(
                4
              )} is below α = ${alpha}.`
            : `The observed result is not sufficiently unusual under the null model to cross the selected threshold because p = ${result.pValue.toFixed(
                4
              )} is not below α = ${alpha}.`}
        </p>


        <div className="hypothesis-warning">

          <strong>
            This decision does not tell
            us that H₀ is certainly
            false or true.
          </strong>

          <p>
            A hypothesis test evaluates
            how compatible the observed
            data are with a specified
            null model.
          </p>

        </div>

      </section>


      {/* ================================================================
          SIMULATION
          ================================================================ */}

      <section className="hypothesis-section">

        <div className="hypothesis-heading">

          <span className="eyebrow">
            Try repeated null results
          </span>

          <h4>
            Generate a sample mean
            assuming H₀ is true
          </h4>

          <p>
            Even when the null
            hypothesis is true,
            random samples sometimes
            produce fairly extreme
            results.
          </p>

        </div>


        <button
          type="button"
          className="hypothesis-simulate-button"
          onClick={
            simulateUnderNull
          }
        >
          Simulate one sample under H₀
        </button>

      </section>


      {/* ================================================================
          LEARNING PROMPTS
          ================================================================ */}

      <section className="hypothesis-observation">

        <span>
          Experiments to try
        </span>


        <p>
          Set μ₀ = 50, σ = 10,
          n = 25 and observed mean
          = 54. Then increase n while
          keeping the difference
          between the observed and
          null means unchanged.
        </p>


        <p>
          Notice that the standard
          error becomes smaller, the
          same numerical difference
          becomes more extreme in
          standard-error units, and
          the p-value becomes smaller.
        </p>


        <strong>
          Statistical significance
          depends on effect size,
          variability and sample size.
        </strong>

      </section>

    </div>
  );
}