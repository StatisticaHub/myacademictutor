"use client";

import {
  useMemo,
  useState,
} from "react";


/* ==========================================================================
   DATASETS
   ========================================================================== */

const presets = {
  balanced: [
    2,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    8,
  ],

  skewed: [
    2,
    2,
    3,
    3,
    3,
    4,
    4,
    5,
    7,
    10,
  ],

  outlier: [
    3,
    4,
    4,
    5,
    5,
    5,
    6,
    6,
    7,
    15,
  ],
};


/* ==========================================================================
   HELPERS
   ========================================================================== */

function calculateMean(
  values: number[]
) {
  if (
    values.length === 0
  ) {
    return 0;
  }

  return (
    values.reduce(
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


function calculateMedian(
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

  const middle =
    Math.floor(
      sorted.length /
        2
    );

  if (
    sorted.length % 2 ===
    0
  ) {
    return (
      (
        sorted[
          middle - 1
        ] +
        sorted[
          middle
        ]
      ) /
      2
    );
  }

  return sorted[
    middle
  ];
}


function calculateQuartiles(
  values: number[]
) {
  const sorted =
    [...values].sort(
      (a, b) =>
        a - b
    );

  if (
    sorted.length <
    2
  ) {
    return {
      q1:
        sorted[0] ?? 0,

      q3:
        sorted[0] ?? 0,
    };
  }

  const midpoint =
    Math.floor(
      sorted.length /
        2
    );

  const lower =
    sorted.slice(
      0,
      midpoint
    );

  const upper =
    sorted.length %
      2 ===
    0
      ? sorted.slice(
          midpoint
        )
      : sorted.slice(
          midpoint + 1
        );

  return {
    q1:
      calculateMedian(
        lower
      ),

    q3:
      calculateMedian(
        upper
      ),
  };
}


function calculateStandardDeviation(
  values: number[]
) {
  if (
    values.length <= 1
  ) {
    return 0;
  }

  const mean =
    calculateMean(
      values
    );

  const squaredDifferences =
    values.map(
      (value) =>
        Math.pow(
          value - mean,
          2
        )
    );

  const variance =
    squaredDifferences.reduce(
      (
        total,
        value
      ) =>
        total + value,
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
   COMPONENT
   ========================================================================== */

type DistributionExplorerProps = {
  title?: string;
  description?: string;
};


export default function DistributionExplorer({
  title =
    "Distribution Explorer",

  description =
    "Change the observations and see how the distribution and summary statistics respond.",
}: DistributionExplorerProps) {

  const [
    values,
    setValues,
  ] =
    useState<number[]>(
      presets.balanced
    );


  /* ------------------------------------------------------------------------
     SUMMARY
     ------------------------------------------------------------------------ */

  const summary =
    useMemo(
      () => {

        const sorted =
          [...values].sort(
            (a, b) =>
              a - b
          );


        const mean =
          calculateMean(
            values
          );


        const median =
          calculateMedian(
            values
          );


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


        const {
          q1,
          q3,
        } =
          calculateQuartiles(
            values
          );


        const iqr =
          q3 - q1;


        const lowerFence =
          q1 -
          1.5 * iqr;


        const upperFence =
          q3 +
          1.5 * iqr;


        const outliers =
          sorted.filter(
            (value) =>
              value <
                lowerFence ||
              value >
                upperFence
          );


        const standardDeviation =
          calculateStandardDeviation(
            values
          );


        return {
          sorted,
          mean,
          median,
          minimum,
          maximum,
          range,
          q1,
          q3,
          iqr,
          outliers,
          standardDeviation,
        };
      },
      [
        values,
      ]
    );


  /* ------------------------------------------------------------------------
     HISTOGRAM
     ------------------------------------------------------------------------ */

  const histogram =
    useMemo(
      () => {

        const binCount =
          5;


        const minimum =
          summary.minimum;


        const maximum =
          summary.maximum;


        const spread =
          maximum -
          minimum;


        const binWidth =
          spread === 0
            ? 1
            : spread /
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
              spread === 0
                ? 0
                : Math.floor(
                    (
                      value -
                      minimum
                    ) /
                      binWidth
                  );


            const index =
              Math.min(
                binCount -
                  1,
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


        const maxCount =
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
                binWidth;


            const end =
              index ===
              binCount - 1
                ? maximum
                : minimum +
                  (
                    index +
                    1
                  ) *
                    binWidth;


            return {
              count,

              height:
                (
                  count /
                  maxCount
                ) *
                100,

              label:
                `${start.toFixed(
                  1
                )}–${end.toFixed(
                  1
                )}`,
            };
          }
        );
      },
      [
        values,
        summary.minimum,
        summary.maximum,
      ]
    );


  /* ------------------------------------------------------------------------
     UPDATE VALUE
     ------------------------------------------------------------------------ */

  function updateValue(
    index: number,
    rawValue: string
  ) {
    const parsed =
      Number(
        rawValue
      );


    if (
      !Number.isFinite(
        parsed
      )
    ) {
      return;
    }


    setValues(
      (current) =>
        current.map(
          (
            value,
            currentIndex
          ) =>
            currentIndex ===
            index
              ? parsed
              : value
        )
    );
  }


  /* ------------------------------------------------------------------------
     PRESET
     ------------------------------------------------------------------------ */

  function usePreset(
    preset:
      keyof typeof presets
  ) {
    setValues(
      [
        ...presets[
          preset
        ],
      ]
    );
  }


  /* ------------------------------------------------------------------------
     PLOT RANGE
     ------------------------------------------------------------------------ */

  const plotSpread =
    summary.maximum -
    summary.minimum;


  return (
    <div className="distribution-explorer">

      <div className="distribution-explorer-header">

        <span>
          Interactive lab
        </span>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>


      {/* ================================================================
          PRESETS
          ================================================================ */}

      <div className="distribution-presets">

        <button
          type="button"
          onClick={() =>
            usePreset(
              "balanced"
            )
          }
        >
          Balanced
        </button>


        <button
          type="button"
          onClick={() =>
            usePreset(
              "skewed"
            )
          }
        >
          Right-skewed
        </button>


        <button
          type="button"
          onClick={() =>
            usePreset(
              "outlier"
            )
          }
        >
          Add an outlier
        </button>

      </div>


      {/* ================================================================
          DATA EDITOR
          ================================================================ */}

      <section className="distribution-panel">

        <div className="distribution-panel-heading">

          <span>
            Data
          </span>

          <h4>
            Edit the observations
          </h4>

          <p>
            Change any value and watch
            the summaries and graphs
            update immediately.
          </p>

        </div>


        <div className="distribution-data-grid">

          {values.map(
            (
              value,
              index
            ) => (

              <label
                key={
                  index
                }
              >

                <span>
                  {index + 1}
                </span>

                <input
                  type="number"
                  value={
                    value
                  }
                  step="0.5"
                  onChange={(
                    event
                  ) =>
                    updateValue(
                      index,
                      event
                        .target
                        .value
                    )
                  }
                  aria-label={`Observation ${
                    index + 1
                  }`}
                />

              </label>
            )
          )}

        </div>

      </section>


      {/* ================================================================
          SUMMARY STATISTICS
          ================================================================ */}

      <section className="distribution-summary-grid">

        <article>
          <span>
            Mean
          </span>

          <strong>
            {summary.mean.toFixed(
              2
            )}
          </strong>
        </article>


        <article>
          <span>
            Median
          </span>

          <strong>
            {summary.median.toFixed(
              2
            )}
          </strong>
        </article>


        <article>
          <span>
            Range
          </span>

          <strong>
            {summary.range.toFixed(
              2
            )}
          </strong>
        </article>


        <article>
          <span>
            IQR
          </span>

          <strong>
            {summary.iqr.toFixed(
              2
            )}
          </strong>
        </article>


        <article>
          <span>
            Sample SD
          </span>

          <strong>
            {summary.standardDeviation.toFixed(
              2
            )}
          </strong>
        </article>

      </section>


      {/* ================================================================
          DOT PLOT
          ================================================================ */}

      <section className="distribution-panel">

        <div className="distribution-panel-heading">

          <span>
            Dot plot
          </span>

          <h4>
            Where are the observations?
          </h4>

        </div>


        <div className="distribution-dotplot">

          <div className="distribution-axis" />


          {summary.sorted.map(
            (
              value,
              index
            ) => {

              const position =
                plotSpread === 0
                  ? 50
                  : (
                      (
                        value -
                        summary.minimum
                      ) /
                      plotSpread
                    ) *
                    100;


              return (
                <span
                  key={`${value}-${index}`}
                  className="distribution-dot"
                  title={String(
                    value
                  )}
                  style={{
                    left:
                      `${position}%`,

                    bottom:
                      `${
                        18 +
                        (
                          index %
                          3
                        ) *
                          18
                      }px`,
                  }}
                />
              );
            }
          )}


          <span className="distribution-axis-min">
            {summary.minimum}
          </span>


          <span className="distribution-axis-max">
            {summary.maximum}
          </span>

        </div>

      </section>


      {/* ================================================================
          HISTOGRAM
          ================================================================ */}

      <section className="distribution-panel">

        <div className="distribution-panel-heading">

          <span>
            Histogram
          </span>

          <h4>
            How is the data distributed?
          </h4>

          <p>
            These values are grouped
            into five equal-width
            intervals.
          </p>

        </div>


        <div className="distribution-histogram">

          {histogram.map(
            (
              bin,
              index
            ) => (

              <div
                key={
                  index
                }
                className="distribution-histogram-bin"
              >

                <span className="distribution-histogram-count">
                  {bin.count}
                </span>


                <div className="distribution-histogram-bar-area">

                  <div
                    className="distribution-histogram-bar"
                    style={{
                      height:
                        `${Math.max(
                          bin.height,
                          bin.count >
                            0
                            ? 8
                            : 0
                        )}%`,
                    }}
                  />

                </div>


                <small>
                  {bin.label}
                </small>

              </div>
            )
          )}

        </div>

      </section>


      {/* ================================================================
          OUTLIERS
          ================================================================ */}

      <section className="distribution-outlier-panel">

        <span>
          1.5 × IQR rule
        </span>


        <h4>
          Potential outliers
        </h4>


        {summary.outliers.length >
        0 ? (

          <p>
            This dataset contains{" "}
            <strong>
              {summary.outliers.join(
                ", "
              )}
            </strong>{" "}
            outside the usual
            1.5 × IQR fences.
          </p>

        ) : (

          <p>
            No observations are
            currently identified as
            outliers using the
            1.5 × IQR rule.
          </p>

        )}


        <div className="distribution-fences">

          <span>
            Q1 ={" "}
            {summary.q1.toFixed(
              2
            )}
          </span>

          <span>
            Q3 ={" "}
            {summary.q3.toFixed(
              2
            )}
          </span>

          <span>
            IQR ={" "}
            {summary.iqr.toFixed(
              2
            )}
          </span>

        </div>

      </section>


      <div className="distribution-explorer-prompt">

        <span>
          Try this
        </span>

        <p>
          Start with the balanced
          dataset. Then choose{" "}
          <strong>
            Add an outlier
          </strong>.
          Which changes more: the mean
          or the median? What happens to
          the standard deviation?
        </p>

      </div>

    </div>
  );
}