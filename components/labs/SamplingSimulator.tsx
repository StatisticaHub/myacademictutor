"use client";

import {
  useMemo,
  useState,
} from "react";


/* ==========================================================================
   TYPES
   ========================================================================== */

type SamplingSimulatorProps = {
  title?: string;
  description?: string;
};

type PopulationPreset =
  | "balanced"
  | "right-skewed"
  | "bimodal";

type HistogramBin = {
  start: number;
  end: number;
  count: number;
  height: number;
};


/* ==========================================================================
   POPULATION BUILDERS
   ========================================================================== */

function repeatValue(
  value: number,
  count: number
) {
  return Array.from(
    { length: count },
    () => value
  );
}


const populations: Record<
  PopulationPreset,
  number[]
> = {

  balanced: [
    ...repeatValue(30, 2),
    ...repeatValue(35, 8),
    ...repeatValue(40, 20),
    ...repeatValue(45, 35),
    ...repeatValue(50, 50),
    ...repeatValue(55, 35),
    ...repeatValue(60, 20),
    ...repeatValue(65, 8),
    ...repeatValue(70, 2),
  ],


  "right-skewed": [
    ...repeatValue(20, 45),
    ...repeatValue(25, 38),
    ...repeatValue(30, 30),
    ...repeatValue(35, 24),
    ...repeatValue(40, 18),
    ...repeatValue(45, 13),
    ...repeatValue(50, 10),
    ...repeatValue(60, 7),
    ...repeatValue(75, 4),
    ...repeatValue(95, 2),
  ],


  bimodal: [
    ...repeatValue(25, 8),
    ...repeatValue(30, 20),
    ...repeatValue(35, 32),
    ...repeatValue(40, 22),
    ...repeatValue(45, 8),

    ...repeatValue(55, 8),
    ...repeatValue(60, 22),
    ...repeatValue(65, 32),
    ...repeatValue(70, 20),
    ...repeatValue(75, 8),
  ],

};


/* ==========================================================================
   STATISTICS HELPERS
   ========================================================================== */

function mean(
  values: number[]
) {
  if (
    values.length === 0
  ) {
    return 0;
  }

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


function median(
  values: number[]
) {
  if (
    values.length === 0
  ) {
    return 0;
  }

  const sorted =
    [...values].sort(
      (a, b) =>
        a - b
    );

  const midpoint =
    Math.floor(
      sorted.length /
        2
    );

  if (
    sorted.length %
      2 ===
    0
  ) {
    return (
      (
        sorted[
          midpoint - 1
        ] +
        sorted[
          midpoint
        ]
      ) /
      2
    );
  }

  return sorted[
    midpoint
  ];
}


function populationSd(
  values: number[]
) {
  if (
    values.length === 0
  ) {
    return 0;
  }

  const average =
    mean(
      values
    );

  const variance =
    values.reduce<number>(
      (
        total,
        value
      ) =>
        total +
        Math.pow(
          value -
            average,
          2
        ),
      0
    ) /
    values.length;

  return Math.sqrt(
    variance
  );
}


function sampleSd(
  values: number[]
) {
  if (
    values.length <= 1
  ) {
    return 0;
  }

  const average =
    mean(
      values
    );

  const variance =
    values.reduce<number>(
      (
        total,
        value
      ) =>
        total +
        Math.pow(
          value -
            average,
          2
        ),
      0
    ) /
    (
      values.length -
      1
    );

  return Math.sqrt(
    variance
  );
}


/* ==========================================================================
   HISTOGRAM
   ========================================================================== */

function makeHistogram(
  values: number[],
  binCount = 12
): HistogramBin[] {
  if (
    values.length === 0
  ) {
    return [];
  }


  const minimum =
    Math.min(
      ...values
    );

  const maximum =
    Math.max(
      ...values
    );


  const range =
    maximum -
    minimum;


  const width =
    range === 0
      ? 1
      : range /
        binCount;


  const counts =
    Array.from(
      {
        length:
          binCount,
      },
      () => 0
    );


  values.forEach(
    (value) => {

      const rawIndex =
        range === 0
          ? 0
          : Math.floor(
              (
                value -
                minimum
              ) /
                width
            );


      const index =
        Math.min(
          binCount - 1,
          Math.max(
            0,
            rawIndex
          )
        );


      counts[
        index
      ] += 1;
    }
  );


  const maximumCount =
    Math.max(
      ...counts,
      1
    );


  return counts.map(
    (
      count,
      index
    ) => {

      const start =
        minimum +
        index *
          width;


      const end =
        index ===
        binCount - 1
          ? maximum
          : minimum +
            (
              index +
              1
            ) *
              width;


      return {
        start,
        end,
        count,

        height:
          (
            count /
            maximumCount
          ) *
          100,
      };
    }
  );
}


/* ==========================================================================
   COMPONENT
   ========================================================================== */

export default function SamplingSimulator({
  title =
    "Sampling Simulator",

  description =
    "Take repeated samples from a population and watch the sampling distribution of the sample mean emerge.",
}: SamplingSimulatorProps) {

  const [
    preset,
    setPreset,
  ] =
    useState<PopulationPreset>(
      "right-skewed"
    );


  const [
    sampleSize,
    setSampleSize,
  ] =
    useState(5);


  const [
    biasedSampling,
    setBiasedSampling,
  ] =
    useState(false);


  const [
    sampleMeans,
    setSampleMeans,
  ] =
    useState<number[]>(
      []
    );


  /* ------------------------------------------------------------------------
     POPULATION
     ------------------------------------------------------------------------ */

  const population =
    populations[
      preset
    ];


  const populationSummary =
    useMemo(
      () => {

        const populationMean =
          mean(
            population
          );

        const populationStandardDeviation =
          populationSd(
            population
          );

        const populationMedian =
          median(
            population
          );


        return {
          mean:
            populationMean,

          sd:
            populationStandardDeviation,

          median:
            populationMedian,

          histogram:
            makeHistogram(
              population
            ),
        };
      },
      [
        population,
      ]
    );


  /* ------------------------------------------------------------------------
     SAMPLING DISTRIBUTION
     ------------------------------------------------------------------------ */

  const sampleSummary =
    useMemo(
      () => {

        if (
          sampleMeans.length ===
          0
        ) {
          return {
            mean:
              null,

            empiricalSe:
              null,

            histogram:
              [] as HistogramBin[],
          };
        }


        return {
          mean:
            mean(
              sampleMeans
            ),

          empiricalSe:
            sampleSd(
              sampleMeans
            ),

          histogram:
            makeHistogram(
              sampleMeans
            ),
        };
      },
      [
        sampleMeans,
      ]
    );


  const theoreticalSe =
    populationSummary.sd /
    Math.sqrt(
      sampleSize
    );


  /* ------------------------------------------------------------------------
     RESET
     ------------------------------------------------------------------------ */

  function resetSamples() {
    setSampleMeans(
      []
    );
  }


  /* ------------------------------------------------------------------------
     CHANGE POPULATION
     ------------------------------------------------------------------------ */

  function changePreset(
    nextPreset:
      PopulationPreset
  ) {
    setPreset(
      nextPreset
    );

    setSampleMeans(
      []
    );
  }


  /* ------------------------------------------------------------------------
     CHANGE SAMPLE SIZE
     ------------------------------------------------------------------------ */

  function changeSampleSize(
    value: number
  ) {
    setSampleSize(
      value
    );

    setSampleMeans(
      []
    );
  }


  /* ------------------------------------------------------------------------
     CHANGE METHOD
     ------------------------------------------------------------------------ */

  function changeSamplingMethod(
    biased: boolean
  ) {
    setBiasedSampling(
      biased
    );

    setSampleMeans(
      []
    );
  }


  /* ------------------------------------------------------------------------
     DRAW ONE SAMPLE
     ------------------------------------------------------------------------ */

  function drawSampleMean() {

    /*
     * In biased mode we deliberately exclude the lower
     * half of the population.
     *
     * This is pedagogical: it demonstrates that increasing
     * n cannot repair systematic selection bias.
     */

    const source =
      biasedSampling
        ? population.filter(
            (value) =>
              value >=
              populationSummary
                .median
          )
        : population;


    const values =
      Array.from(
        {
          length:
            sampleSize,
        },
        () => {

          const index =
            Math.floor(
              Math.random() *
              source.length
            );

          return source[
            index
          ];
        }
      );


    return mean(
      values
    );
  }


  /* ------------------------------------------------------------------------
     RUN REPEATED SAMPLES
     ------------------------------------------------------------------------ */

  function runSamples(
    count: number
  ) {
    const newMeans =
      Array.from(
        {
          length:
            count,
        },
        () =>
          drawSampleMean()
      );


    setSampleMeans(
      (current) =>
        [
          ...current,
          ...newMeans,
        ].slice(
          -5000
        )
    );
  }


  return (
    <div className="sampling-simulator">

      {/* ================================================================
          HEADER
          ================================================================ */}

      <header className="sampling-simulator-header">

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
          POPULATION
          ================================================================ */}

      <section className="sampling-section">

        <div className="sampling-heading">

          <span className="eyebrow">
            Step 01
          </span>

          <h4>
            Choose a population
          </h4>

          <p>
            The population distribution
            describes individual
            observations before any
            sampling takes place.
          </p>

        </div>


        <div className="sampling-preset-buttons">

          <button
            type="button"
            className={
              preset ===
              "balanced"
                ? "active"
                : ""
            }
            onClick={() =>
              changePreset(
                "balanced"
              )
            }
          >
            Balanced
          </button>


          <button
            type="button"
            className={
              preset ===
              "right-skewed"
                ? "active"
                : ""
            }
            onClick={() =>
              changePreset(
                "right-skewed"
              )
            }
          >
            Right-skewed
          </button>


          <button
            type="button"
            className={
              preset ===
              "bimodal"
                ? "active"
                : ""
            }
            onClick={() =>
              changePreset(
                "bimodal"
              )
            }
          >
            Bimodal
          </button>

        </div>


        <div className="sampling-stat-grid">

          <article>
            <span>
              Population size
            </span>

            <strong>
              {population.length}
            </strong>
          </article>


          <article>
            <span>
              Population mean
            </span>

            <strong>
              {populationSummary.mean.toFixed(
                2
              )}
            </strong>
          </article>


          <article>
            <span>
              Population SD
            </span>

            <strong>
              {populationSummary.sd.toFixed(
                2
              )}
            </strong>
          </article>

        </div>


        <div className="sampling-histogram">

          {populationSummary
            .histogram
            .map(
              (
                bin,
                index
              ) => (

                <div
                  className="sampling-histogram-bin"
                  key={
                    index
                  }
                >

                  <span>
                    {bin.count}
                  </span>


                  <div className="sampling-histogram-bar-area">

                    <div
                      style={{
                        height:
                          `${Math.max(
                            bin.height,
                            bin.count >
                              0
                              ? 4
                              : 0
                          )}%`,
                      }}
                    />

                  </div>


                  <small>
                    {bin.start.toFixed(
                      0
                    )}
                  </small>

                </div>
              )
            )}

        </div>

      </section>


      {/* ================================================================
          SAMPLE SIZE
          ================================================================ */}

      <section className="sampling-section sampling-soft-section">

        <div className="sampling-heading">

          <span className="eyebrow">
            Step 02
          </span>

          <h4>
            Choose the sample size
          </h4>

          <p>
            Each repeated sample will
            contain n observations.
          </p>

        </div>


        <div className="sampling-size-buttons">

          {[5, 10, 20, 50, 100].map(
            (
              size
            ) => (

              <button
                key={
                  size
                }
                type="button"
                className={
                  sampleSize ===
                  size
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeSampleSize(
                    size
                  )
                }
              >
                n = {size}
              </button>

            )
          )}

        </div>


        <div className="sampling-se-card">

          <span>
            Expected standard error
          </span>

          <strong>
            {theoreticalSe.toFixed(
              3
            )}
          </strong>

          <p>
            For random sampling,
            the standard deviation
            of the sample mean is
            approximately σ / √n.
          </p>

        </div>

      </section>


      {/* ================================================================
          SAMPLING METHOD
          ================================================================ */}

      <section className="sampling-section">

        <div className="sampling-heading">

          <span className="eyebrow">
            Step 03
          </span>

          <h4>
            Choose the sampling process
          </h4>

          <p>
            Compare genuinely random
            sampling with a deliberately
            biased selection process.
          </p>

        </div>


        <div className="sampling-method-grid">

          <button
            type="button"
            className={
              !biasedSampling
                ? "active"
                : ""
            }
            onClick={() =>
              changeSamplingMethod(
                false
              )
            }
          >

            <span>
              Random sample
            </span>

            <strong>
              Entire population eligible
            </strong>

            <p>
              Every draw can come from
              anywhere in the population.
            </p>

          </button>


          <button
            type="button"
            className={
              biasedSampling
                ? "active"
                : ""
            }
            onClick={() =>
              changeSamplingMethod(
                true
              )
            }
          >

            <span>
              Biased sample
            </span>

            <strong>
              Lower half excluded
            </strong>

            <p>
              Only values at or above
              the population median are
              eligible.
            </p>

          </button>

        </div>

      </section>


      {/* ================================================================
          REPEATED SAMPLING
          ================================================================ */}

      <section className="sampling-section sampling-dark-section">

        <div className="sampling-heading">

          <span className="eyebrow">
            Step 04
          </span>

          <h4>
            Repeat the sampling process
          </h4>

          <p>
            Each repetition produces
            one sample mean.
          </p>

        </div>


        <div className="sampling-run-buttons">

          {[1, 10, 100, 1000].map(
            (
              count
            ) => (

              <button
                key={
                  count
                }
                type="button"
                onClick={() =>
                  runSamples(
                    count
                  )
                }
              >
                +{count.toLocaleString()}
                {" "}
                {count === 1
                  ? "sample"
                  : "samples"}
              </button>

            )
          )}

        </div>


        <button
          type="button"
          className="sampling-reset"
          onClick={
            resetSamples
          }
        >
          Reset repeated samples
        </button>

      </section>


      {/* ================================================================
          RESULTS
          ================================================================ */}

      <section className="sampling-section">

        <div className="sampling-heading">

          <span className="eyebrow">
            Sampling distribution
          </span>

          <h4>
            Distribution of sample means
          </h4>

          <p>
            This graph contains sample
            means—not individual
            observations.
          </p>

        </div>


        <div className="sampling-result-grid">

          <article>

            <span>
              Samples drawn
            </span>

            <strong>
              {sampleMeans.length.toLocaleString()}
            </strong>

          </article>


          <article>

            <span>
              Population mean
            </span>

            <strong>
              {populationSummary.mean.toFixed(
                2
              )}
            </strong>

          </article>


          <article>

            <span>
              Mean of sample means
            </span>

            <strong>
              {sampleSummary.mean ===
              null
                ? "—"
                : sampleSummary.mean.toFixed(
                    2
                  )}
            </strong>

          </article>


          <article>

            <span>
              Empirical SE
            </span>

            <strong>
              {sampleSummary.empiricalSe ===
              null
                ? "—"
                : sampleSummary.empiricalSe.toFixed(
                    3
                  )}
            </strong>

          </article>

        </div>


        {sampleSummary
          .histogram
          .length >
        0 ? (

          <div className="sampling-histogram sampling-means-histogram">

            {sampleSummary
              .histogram
              .map(
                (
                  bin,
                  index
                ) => (

                  <div
                    className="sampling-histogram-bin"
                    key={
                      index
                    }
                  >

                    <span>
                      {bin.count}
                    </span>


                    <div className="sampling-histogram-bar-area">

                      <div
                        style={{
                          height:
                            `${Math.max(
                              bin.height,
                              bin.count >
                                0
                                ? 3
                                : 0
                            )}%`,
                        }}
                      />

                    </div>


                    <small>
                      {bin.start.toFixed(
                        1
                      )}
                    </small>

                  </div>
                )
              )}

          </div>

        ) : (

          <div className="sampling-empty">

            Run repeated samples to
            create the sampling
            distribution.

          </div>

        )}

      </section>


      {/* ================================================================
          INTERPRETATION
          ================================================================ */}

      <section className="sampling-observation">

        <span>
          What should you notice?
        </span>


        {!biasedSampling ? (

          <>
            <p>
              With random sampling,
              the distribution of sample
              means should be centred
              approximately around the
              population mean.
            </p>

            <p>
              Increase the sample size.
              The sample means become
              less variable, and the
              empirical standard error
              should move towards
              σ / √n.
            </p>
          </>

        ) : (

          <>
            <p>
              The biased sampling
              process systematically
              excludes lower values.
              The sample means therefore
              tend to sit above the
              population mean.
            </p>

            <p>
              Now increase n to 100.
              The results may become
              more precise, but they
              remain centred around the
              wrong value.
            </p>

            <strong>
              A large biased sample can
              give a very precise answer
              to the wrong question.
            </strong>
          </>

        )}

      </section>

    </div>
  );
}