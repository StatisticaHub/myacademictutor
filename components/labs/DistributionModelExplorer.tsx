"use client";

import {
  useMemo,
  useState,
} from "react";


type DistributionModelExplorerProps = {
  title?: string;
  description?: string;
};


/* ==========================================================================
   BINOMIAL HELPERS
   ========================================================================== */

function factorialCombination(
  n: number,
  k: number
) {
  if (
    k < 0 ||
    k > n
  ) {
    return 0;
  }

  const smaller =
    Math.min(
      k,
      n - k
    );

  let result = 1;

  for (
    let index = 1;
    index <= smaller;
    index += 1
  ) {
    result =
      result *
      (
        n -
        smaller +
        index
      ) /
      index;
  }

  return result;
}


function binomialProbability(
  n: number,
  p: number,
  x: number
) {
  return (
    factorialCombination(
      n,
      x
    ) *
    Math.pow(
      p,
      x
    ) *
    Math.pow(
      1 - p,
      n - x
    )
  );
}


/* ==========================================================================
   NORMAL HELPERS
   ========================================================================== */

function normalDensity(
  x: number,
  mean: number,
  sd: number
) {
  const exponent =
    -0.5 *
    Math.pow(
      (
        x -
        mean
      ) /
        sd,
      2
    );

  return (
    1 /
    (
      sd *
      Math.sqrt(
        2 *
        Math.PI
      )
    )
  ) *
    Math.exp(
      exponent
    );
}


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


function normalCdf(
  x: number,
  mean: number,
  sd: number
) {
  return (
    0.5 *
    (
      1 +
      erf(
        (
          x -
          mean
        ) /
          (
            sd *
            Math.sqrt(
              2
            )
          )
      )
    )
  );
}


/* ==========================================================================
   COMPONENT
   ========================================================================== */

export default function DistributionModelExplorer({
  title =
    "Probability Distribution Explorer",

  description =
    "Explore how binomial and normal probability models change when their parameters change.",
}: DistributionModelExplorerProps) {

  /* ------------------------------------------------------------------------
     BINOMIAL STATE
     ------------------------------------------------------------------------ */

  const [
    n,
    setN,
  ] =
    useState(10);


  const [
    p,
    setP,
  ] =
    useState(0.5);


  const [
    selectedX,
    setSelectedX,
  ] =
    useState(5);


  /* ------------------------------------------------------------------------
     NORMAL STATE
     ------------------------------------------------------------------------ */

  const [
    normalMean,
    setNormalMean,
  ] =
    useState(50);


  const [
    normalSd,
    setNormalSd,
  ] =
    useState(10);


  const [
    observedValue,
    setObservedValue,
  ] =
    useState(65);


  /* ------------------------------------------------------------------------
     BINOMIAL SUMMARY
     ------------------------------------------------------------------------ */

  const binomial =
    useMemo(
      () => {

        const values =
          Array.from(
            {
              length:
                n + 1,
            },
            (
              _,
              x
            ) => ({
              x,

              probability:
                binomialProbability(
                  n,
                  p,
                  x
                ),
            })
          );


        const maximumProbability =
          Math.max(
            ...values.map(
              (
                item
              ) =>
                item.probability
            ),
            0.0001
          );


        const exact =
          binomialProbability(
            n,
            p,
            selectedX
          );


        const cumulative =
          values
            .filter(
              (
                item
              ) =>
                item.x <=
                selectedX
            )
            .reduce(
              (
                total,
                item
              ) =>
                total +
                item.probability,
              0
            );


        return {
          values,
          maximumProbability,

          mean:
            n * p,

          sd:
            Math.sqrt(
              n *
              p *
              (
                1 - p
              )
            ),

          exact,
          cumulative,
        };
      },
      [
        n,
        p,
        selectedX,
      ]
    );


  /* ------------------------------------------------------------------------
     NORMAL SUMMARY
     ------------------------------------------------------------------------ */

  const normal =
    useMemo(
      () => {

        const z =
          (
            observedValue -
            normalMean
          ) /
          normalSd;


        const below =
          normalCdf(
            observedValue,
            normalMean,
            normalSd
          );


        const minX =
          normalMean -
          4 *
            normalSd;


        const maxX =
          normalMean +
          4 *
            normalSd;


        const points =
          Array.from(
            {
              length: 121,
            },
            (
              _,
              index
            ) => {

              const x =
                minX +
                (
                  index /
                  120
                ) *
                  (
                    maxX -
                    minX
                  );


              return {
                x,

                density:
                  normalDensity(
                    x,
                    normalMean,
                    normalSd
                  ),
              };
            }
          );


        const maximumDensity =
          normalDensity(
            normalMean,
            normalMean,
            normalSd
          );


        const svgPath =
          points
            .map(
              (
                point,
                index
              ) => {

                const x =
                  (
                    (
                      point.x -
                      minX
                    ) /
                    (
                      maxX -
                      minX
                    )
                  ) *
                  600;


                const y =
                  180 -
                  (
                    point.density /
                    maximumDensity
                  ) *
                    150;


                return `${
                  index === 0
                    ? "M"
                    : "L"
                } ${x.toFixed(
                  2
                )} ${y.toFixed(
                  2
                )}`;
              }
            )
            .join(
              " "
            );


        const markerPosition =
          Math.max(
            0,
            Math.min(
              600,
              (
                (
                  observedValue -
                  minX
                ) /
                (
                  maxX -
                  minX
                )
              ) *
                600
            )
          );


        return {
          z,
          below,
          minX,
          maxX,
          svgPath,
          markerPosition,
        };
      },
      [
        normalMean,
        normalSd,
        observedValue,
      ]
    );


  /* ------------------------------------------------------------------------
     KEEP X VALID
     ------------------------------------------------------------------------ */

  function changeN(
    nextN: number
  ) {
    setN(
      nextN
    );

    setSelectedX(
      (current) =>
        Math.min(
          current,
          nextN
        )
    );
  }


  return (
    <div className="distribution-model-explorer">

      <header className="distribution-model-header">

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
          BINOMIAL
          ================================================================ */}

      <section className="distribution-model-section">

        <div className="distribution-model-intro">

          <span className="eyebrow">
            Model 01
          </span>

          <h4>
            Binomial distribution
          </h4>

          <p>
            Change the number of
            trials and probability of
            success to see how the
            distribution changes.
          </p>

        </div>


        <div className="distribution-model-controls">

          <label>

            <span>
              Number of trials, n
            </span>

            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={
                n
              }
              onChange={(
                event
              ) =>
                changeN(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {n}
            </strong>

          </label>


          <label>

            <span>
              Probability, p
            </span>

            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={
                p
              }
              onChange={(
                event
              ) =>
                setP(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {p.toFixed(
                2
              )}
            </strong>

          </label>


          <label>

            <span>
              Selected successes, x
            </span>

            <input
              type="range"
              min="0"
              max={
                n
              }
              step="1"
              value={
                selectedX
              }
              onChange={(
                event
              ) =>
                setSelectedX(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {selectedX}
            </strong>

          </label>

        </div>


        <div className="distribution-model-stats">

          <article>
            <span>
              Mean np
            </span>

            <strong>
              {binomial.mean.toFixed(
                2
              )}
            </strong>
          </article>


          <article>
            <span>
              SD
            </span>

            <strong>
              {binomial.sd.toFixed(
                2
              )}
            </strong>
          </article>


          <article>
            <span>
              P(X = {selectedX})
            </span>

            <strong>
              {binomial.exact.toFixed(
                4
              )}
            </strong>
          </article>


          <article>
            <span>
              P(X ≤ {selectedX})
            </span>

            <strong>
              {binomial.cumulative.toFixed(
                4
              )}
            </strong>
          </article>

        </div>


        <div className="binomial-chart">

          {binomial.values.map(
            (
              item
            ) => {

              const height =
                (
                  item.probability /
                  binomial
                    .maximumProbability
                ) *
                100;


              return (
                <button
                  key={
                    item.x
                  }
                  type="button"
                  className={
                    item.x ===
                    selectedX
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedX(
                      item.x
                    )
                  }
                  aria-label={`X equals ${
                    item.x
                  }, probability ${item.probability.toFixed(
                    4
                  )}`}
                >

                  <span className="binomial-probability">
                    {item.probability.toFixed(
                      2
                    )}
                  </span>


                  <div className="binomial-bar-area">

                    <div
                      style={{
                        height:
                          `${Math.max(
                            2,
                            height
                          )}%`,
                      }}
                    />

                  </div>


                  <small>
                    {item.x}
                  </small>

                </button>
              );
            }
          )}

        </div>


        <div className="distribution-model-note">

          <span>
            Try this
          </span>

          <p>
            Keep n = 10 and compare
            p = 0.50 with p = 0.20
            and p = 0.80. Notice how
            the centre and shape move.
          </p>

        </div>

      </section>


      {/* ================================================================
          NORMAL
          ================================================================ */}

      <section className="distribution-model-section normal-model-section">

        <div className="distribution-model-intro">

          <span className="eyebrow">
            Model 02
          </span>

          <h4>
            Normal distribution
          </h4>

          <p>
            Change μ and σ to see
            how the centre and spread
            of the normal curve
            respond.
          </p>

        </div>


        <div className="distribution-model-controls">

          <label>

            <span>
              Mean, μ
            </span>

            <input
              type="range"
              min="20"
              max="80"
              step="1"
              value={
                normalMean
              }
              onChange={(
                event
              ) =>
                setNormalMean(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {normalMean}
            </strong>

          </label>


          <label>

            <span>
              Standard deviation, σ
            </span>

            <input
              type="range"
              min="3"
              max="20"
              step="1"
              value={
                normalSd
              }
              onChange={(
                event
              ) =>
                setNormalSd(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {normalSd}
            </strong>

          </label>


          <label>

            <span>
              Observed value, x
            </span>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={
                observedValue
              }
              onChange={(
                event
              ) =>
                setObservedValue(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
            />

            <strong>
              {observedValue}
            </strong>

          </label>

        </div>


        <div className="distribution-model-stats">

          <article>
            <span>
              Mean
            </span>

            <strong>
              {normalMean}
            </strong>
          </article>


          <article>
            <span>
              SD
            </span>

            <strong>
              {normalSd}
            </strong>
          </article>


          <article>
            <span>
              z-score
            </span>

            <strong>
              {normal.z.toFixed(
                2
              )}
            </strong>
          </article>


          <article>
            <span>
              P(X ≤ {observedValue})
            </span>

            <strong>
              {normal.below.toFixed(
                3
              )}
            </strong>
          </article>

        </div>


        <div className="normal-chart">

          <svg
            viewBox="0 0 600 200"
            role="img"
            aria-label="Normal distribution curve"
          >

            <line
              x1="0"
              y1="180"
              x2="600"
              y2="180"
              className="normal-axis"
            />


            <path
              d={
                normal.svgPath
              }
              className="normal-curve"
            />


            <line
              x1={
                normal
                  .markerPosition
              }
              y1="20"
              x2={
                normal
                  .markerPosition
              }
              y2="180"
              className="normal-observation-line"
            />

          </svg>


          <div className="normal-chart-labels">

            <span>
              {(
                normalMean -
                3 *
                  normalSd
              ).toFixed(
                0
              )}
            </span>

            <span>
              μ ={" "}
              {normalMean}
            </span>

            <span>
              {(
                normalMean +
                3 *
                  normalSd
              ).toFixed(
                0
              )}
            </span>

          </div>

        </div>


        <div className="normal-rule-grid">

          <article>
            <span>
              ±1σ
            </span>

            <strong>
              ≈ 68%
            </strong>

            <p>
              Roughly 68% of values
              lie within one standard
              deviation of the mean.
            </p>
          </article>


          <article>
            <span>
              ±2σ
            </span>

            <strong>
              ≈ 95%
            </strong>

            <p>
              Roughly 95% lie within
              two standard deviations.
            </p>
          </article>


          <article>
            <span>
              ±3σ
            </span>

            <strong>
              ≈ 99.7%
            </strong>

            <p>
              Almost all observations
              lie within three
              standard deviations.
            </p>
          </article>

        </div>


        <div className="distribution-model-note">

          <span>
            Try this
          </span>

          <p>
            Increase σ while keeping
            μ fixed. The curve should
            become wider and flatter.
            Then move μ and notice that
            the whole distribution
            shifts without changing
            its basic shape.
          </p>

        </div>

      </section>

    </div>
  );
}