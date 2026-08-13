"use client";

import {
  useMemo,
  useState,
} from "react";


type ConfidenceIntervalSimulatorProps = {
  title?: string;
  description?: string;
};


type ConfidenceLevel =
  | 90
  | 95
  | 99;


type IntervalResult = {
  estimate: number;
  lower: number;
  upper: number;
  containsTruth: boolean;
};


/* ==========================================================================
   HELPERS
   ========================================================================== */

const criticalValues:
  Record<ConfidenceLevel, number> = {
    90: 1.645,
    95: 1.96,
    99: 2.576,
  };


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


function sampleMean(
  values: number[]
) {
  return (
    values.reduce<number>(
      (
        total,
        value
      ) =>
        total + value,
      0
    ) /
    values.length
  );
}


/* ==========================================================================
   COMPONENT
   ========================================================================== */

export default function ConfidenceIntervalSimulator({
  title =
    "Confidence Interval Coverage",

  description =
    "Generate repeated confidence intervals and see which ones contain the true population mean.",
}: ConfidenceIntervalSimulatorProps) {

  const [
    populationMean,
    setPopulationMean,
  ] =
    useState(50);


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
    confidenceLevel,
    setConfidenceLevel,
  ] =
    useState<ConfidenceLevel>(
      95
    );


  const [
    intervals,
    setIntervals,
  ] =
    useState<
      IntervalResult[]
    >([]);


  /* ------------------------------------------------------------------------
     DERIVED VALUES
     ------------------------------------------------------------------------ */

  const standardError =
    populationSd /
    Math.sqrt(
      sampleSize
    );


  const criticalValue =
    criticalValues[
      confidenceLevel
    ];


  const marginOfError =
    criticalValue *
    standardError;


  const capturedCount =
    intervals.filter(
      (interval) =>
        interval
          .containsTruth
    ).length;


  const coverage =
    intervals.length > 0
      ? (
          capturedCount /
          intervals.length
        ) *
        100
      : 0;


  /* ------------------------------------------------------------------------
     GENERATE ONE INTERVAL
     ------------------------------------------------------------------------ */

  function generateInterval() {
    const sample =
      Array.from(
        {
          length:
            sampleSize,
        },
        () =>
          randomNormal(
            populationMean,
            populationSd
          )
      );


    const estimate =
      sampleMean(
        sample
      );


    const lower =
      estimate -
      marginOfError;


    const upper =
      estimate +
      marginOfError;


    return {
      estimate,
      lower,
      upper,

      containsTruth:
        lower <=
          populationMean &&
        upper >=
          populationMean,
    };
  }


  function runIntervals(
    count: number
  ) {
    const newIntervals =
      Array.from(
        {
          length:
            count,
        },
        () =>
          generateInterval()
      );


    setIntervals(
      (
        current
      ) =>
        [
          ...current,
          ...newIntervals,
        ].slice(
          -100
        )
    );
  }


  function reset() {
    setIntervals(
      []
    );
  }


  function changeSampleSize(
    value: number
  ) {
    setSampleSize(
      value
    );

    reset();
  }


  function changeConfidenceLevel(
    level: ConfidenceLevel
  ) {
    setConfidenceLevel(
      level
    );

    reset();
  }


  /* ------------------------------------------------------------------------
     CHART SCALE
     ------------------------------------------------------------------------ */

  const chartScale =
    useMemo(
      () => {

        if (
          intervals.length ===
          0
        ) {
          return {
            minimum:
              populationMean -
              4 *
                populationSd,

            maximum:
              populationMean +
              4 *
                populationSd,
          };
        }


        const minimum =
          Math.min(
            ...intervals.map(
              (
                interval
              ) =>
                interval.lower
            ),
            populationMean
          );


        const maximum =
          Math.max(
            ...intervals.map(
              (
                interval
              ) =>
                interval.upper
            ),
            populationMean
          );


        const padding =
          Math.max(
            1,
            (
              maximum -
              minimum
            ) *
              0.08
          );


        return {
          minimum:
            minimum -
            padding,

          maximum:
            maximum +
            padding,
        };
      },
      [
        intervals,
        populationMean,
        populationSd,
      ]
    );


  const chartRange =
    chartScale.maximum -
    chartScale.minimum;


  function position(
    value: number
  ) {
    return (
      (
        value -
        chartScale.minimum
      ) /
      chartRange
    ) *
      100;
  }


  return (
    <div className="ci-simulator">

      {/* ================================================================
          HEADER
          ================================================================ */}

      <header className="ci-simulator-header">

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
          SETTINGS
          ================================================================ */}

      <section className="ci-section">

        <div className="ci-heading">

          <span className="eyebrow">
            Population
          </span>

          <h4>
            Set the data-generating process
          </h4>

          <p>
            For this teaching simulation,
            samples come from a normal
            population with known standard
            deviation.
          </p>

        </div>


        <div className="ci-control-grid">

          <label>

            <span>
              True mean, μ
            </span>

            <input
              type="range"
              min="30"
              max="70"
              step="1"
              value={
                populationMean
              }
              onChange={(
                event
              ) => {
                setPopulationMean(
                  Number(
                    event
                      .target
                      .value
                  )
                );

                reset();
              }}
            />

            <strong>
              {populationMean}
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
              ) => {
                setPopulationSd(
                  Number(
                    event
                      .target
                      .value
                  )
                );

                reset();
              }}
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

      <section className="ci-section ci-soft-section">

        <div className="ci-heading">

          <span className="eyebrow">
            Precision
          </span>

          <h4>
            Choose the sample size
          </h4>

        </div>


        <div className="ci-option-buttons">

          {[10, 25, 50, 100].map(
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
                  changeSampleSize(
                    value
                  )
                }
              >
                n = {value}
              </button>

            )
          )}

        </div>


        <div className="ci-stat-grid">

          <article>
            <span>
              Standard error
            </span>

            <strong>
              {standardError.toFixed(
                3
              )}
            </strong>
          </article>


          <article>
            <span>
              Critical value
            </span>

            <strong>
              {criticalValue.toFixed(
                3
              )}
            </strong>
          </article>


          <article>
            <span>
              Margin of error
            </span>

            <strong>
              {marginOfError.toFixed(
                3
              )}
            </strong>
          </article>

        </div>

      </section>


      {/* ================================================================
          CONFIDENCE LEVEL
          ================================================================ */}

      <section className="ci-section">

        <div className="ci-heading">

          <span className="eyebrow">
            Confidence level
          </span>

          <h4>
            How much long-run coverage?
          </h4>

        </div>


        <div className="ci-option-buttons">

          {(
            [
              90,
              95,
              99,
            ] as ConfidenceLevel[]
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
                  confidenceLevel ===
                  level
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeConfidenceLevel(
                    level
                  )
                }
              >
                {level}%
              </button>

            )
          )}

        </div>

      </section>


      {/* ================================================================
          GENERATE
          ================================================================ */}

      <section className="ci-section ci-dark-section">

        <div className="ci-heading">

          <span className="eyebrow">
            Repeated sampling
          </span>

          <h4>
            Generate confidence intervals
          </h4>

          <p>
            Every interval comes from
            a new random sample.
          </p>

        </div>


        <div className="ci-run-buttons">

          {[1, 10, 50, 100].map(
            (
              count
            ) => (

              <button
                key={
                  count
                }
                type="button"
                onClick={() =>
                  runIntervals(
                    count
                  )
                }
              >
                +{count}
                {" "}
                {count === 1
                  ? "interval"
                  : "intervals"}
              </button>

            )
          )}

        </div>


        <button
          type="button"
          className="ci-reset"
          onClick={
            reset
          }
        >
          Reset intervals
        </button>

      </section>


      {/* ================================================================
          RESULTS
          ================================================================ */}

      <section className="ci-section">

        <div className="ci-heading">

          <span className="eyebrow">
            Coverage
          </span>

          <h4>
            Which intervals contain μ?
          </h4>

        </div>


        <div className="ci-result-grid">

          <article>

            <span>
              Generated
            </span>

            <strong>
              {intervals.length}
            </strong>

          </article>


          <article>

            <span>
              Contain μ
            </span>

            <strong>
              {capturedCount}
            </strong>

          </article>


          <article>

            <span>
              Miss μ
            </span>

            <strong>
              {intervals.length -
                capturedCount}
            </strong>

          </article>


          <article>

            <span>
              Observed coverage
            </span>

            <strong>
              {intervals.length >
              0
                ? `${coverage.toFixed(
                    1
                  )}%`
                : "—"}
            </strong>

          </article>

        </div>


        {/* ==============================================================
            INTERVAL PLOT
            ============================================================== */}

        <div className="ci-chart">

          <div
            className="ci-truth-line"
            style={{
              left:
                `${position(
                  populationMean
                )}%`,
            }}
          >

            <span>
              μ = {populationMean}
            </span>

          </div>


          {intervals.length ===
          0 ? (

            <div className="ci-empty">
              Generate intervals to see
              repeated-sampling coverage.
            </div>

          ) : (

            <div className="ci-interval-list">

              {intervals
                .slice(
                  -50
                )
                .map(
                  (
                    interval,
                    index
                  ) => {

                    const left =
                      position(
                        interval.lower
                      );


                    const right =
                      position(
                        interval.upper
                      );


                    const estimate =
                      position(
                        interval.estimate
                      );


                    return (
                      <div
                        key={
                          index
                        }
                        className={[
                          "ci-interval-row",

                          interval
                            .containsTruth
                            ? "contains"
                            : "misses",
                        ].join(
                          " "
                        )}
                      >

                        <span className="ci-row-number">
                          {index + 1}
                        </span>


                        <div className="ci-row-track">

                          <div
                            className="ci-interval-line"
                            style={{
                              left:
                                `${left}%`,

                              width:
                                `${Math.max(
                                  0.4,
                                  right -
                                    left
                                )}%`,
                            }}
                          />


                          <span
                            className="ci-estimate-dot"
                            style={{
                              left:
                                `${estimate}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

            </div>

          )}

        </div>

      </section>


      {/* ================================================================
          INTERPRETATION
          ================================================================ */}

      <section className="ci-observation">

        <span>
          What should you notice?
        </span>

        <p>
          At a 95% confidence level,
          repeated intervals will not
          all contain the true mean.
          In the long run, approximately
          95% should contain it under
          this model.
        </p>

        <p>
          Increase the sample size.
          The intervals become narrower,
          but the target coverage level
          stays approximately the same.
        </p>

        <p>
          Increase the confidence level
          from 90% to 99%. The intervals
          become wider because greater
          long-run coverage requires
          more uncertainty around each
          estimate.
        </p>

      </section>

    </div>
  );
}