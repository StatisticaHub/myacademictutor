"use client";

import {
  useMemo,
  useState,
} from "react";


type ProbabilitySimulatorProps = {
  title?: string;
  description?: string;
};


type SimulationPoint = {
  trial: number;
  proportion: number;
};


export default function ProbabilitySimulator({
  title = "Probability Simulator",
  description =
    "Run repeated random trials and compare experimental probability with theoretical probability.",
}: ProbabilitySimulatorProps) {

  const [
    probability,
    setProbability,
  ] = useState(0.5);


  const [
    totalTrials,
    setTotalTrials,
  ] = useState(0);


  const [
    successes,
    setSuccesses,
  ] = useState(0);


  const [
    history,
    setHistory,
  ] = useState<
    SimulationPoint[]
  >([]);


  const experimentalProbability =
    totalTrials > 0
      ? successes /
        totalTrials
      : 0;


  const difference =
    totalTrials > 0
      ? Math.abs(
          experimentalProbability -
            probability
        )
      : 0;


  const theoreticalPercent =
    probability * 100;


  const experimentalPercent =
    experimentalProbability *
    100;


  function runTrials(
    numberOfTrials: number
  ) {
    let newSuccesses = 0;

    const newHistory:
      SimulationPoint[] = [];

    let runningTrials =
      totalTrials;

    let runningSuccesses =
      successes;


    for (
      let index = 0;
      index <
      numberOfTrials;
      index += 1
    ) {
      const success =
        Math.random() <
        probability;

      if (success) {
        newSuccesses += 1;
      }


      runningTrials += 1;

      runningSuccesses +=
        success ? 1 : 0;


      if (
        numberOfTrials <=
          100 ||
        index %
          Math.max(
            1,
            Math.floor(
              numberOfTrials /
                100
            )
          ) ===
          0 ||
        index ===
          numberOfTrials -
            1
      ) {
        newHistory.push({
          trial:
            runningTrials,

          proportion:
            runningSuccesses /
            runningTrials,
        });
      }
    }


    setTotalTrials(
      (current) =>
        current +
        numberOfTrials
    );


    setSuccesses(
      (current) =>
        current +
        newSuccesses
    );


    setHistory(
      (current) =>
        [
          ...current,
          ...newHistory,
        ].slice(-200)
    );
  }


  function reset() {
    setTotalTrials(0);
    setSuccesses(0);
    setHistory([]);
  }


  const chartPoints =
    useMemo(
      () => {

        if (
          history.length ===
          0
        ) {
          return "";
        }


        const width =
          600;

        const height =
          180;


        const minimumTrial =
          history[0].trial;

        const maximumTrial =
          history[
            history.length -
              1
          ].trial;


        const trialRange =
          Math.max(
            1,
            maximumTrial -
              minimumTrial
          );


        return history
          .map(
            (
              point,
              index
            ) => {

              const x =
                history.length ===
                1
                  ? width
                  : (
                      (
                        point.trial -
                        minimumTrial
                      ) /
                      trialRange
                    ) *
                    width;


              const y =
                height -
                point.proportion *
                  height;


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
          .join(" ");
      },
      [
        history,
      ]
    );


  const theoreticalY =
    180 -
    probability *
      180;


  return (
    <div className="probability-simulator">

      <div className="probability-simulator-header">

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


      <div className="probability-simulator-body">

        {/* ================================================================
            PROBABILITY CONTROL
            ================================================================ */}

        <section className="probability-control-panel">

          <div>

            <span className="eyebrow">
              Theoretical probability
            </span>

            <h4>
              Choose P(success)
            </h4>

            <p>
              Imagine repeating the
              same random experiment
              under identical
              conditions.
            </p>

          </div>


          <div className="probability-slider-row">

            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={
                probability
              }
              onChange={(
                event
              ) => {
                setProbability(
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
              {probability.toFixed(
                2
              )}
            </strong>

          </div>


          <div className="probability-quick-values">

            {[
              0.25,
              0.5,
              0.75,
            ].map(
              (value) => (

                <button
                  key={
                    value
                  }
                  type="button"
                  onClick={() => {
                    setProbability(
                      value
                    );

                    reset();
                  }}
                >
                  P ={" "}
                  {value}
                </button>

              )
            )}

          </div>

        </section>


        {/* ================================================================
            RUN TRIALS
            ================================================================ */}

        <section className="probability-run-panel">

          <span className="eyebrow">
            Simulation
          </span>

          <h4>
            Run repeated trials
          </h4>


          <div className="probability-run-buttons">

            {[1, 10, 100, 1000].map(
              (count) => (

                <button
                  key={
                    count
                  }
                  type="button"
                  onClick={() =>
                    runTrials(
                      count
                    )
                  }
                >
                  +{count.toLocaleString()}
                  {" "}
                  {count === 1
                    ? "trial"
                    : "trials"}
                </button>

              )
            )}

          </div>


          <button
            type="button"
            className="probability-reset-button"
            onClick={
              reset
            }
          >
            Reset simulation
          </button>

        </section>


        {/* ================================================================
            RESULTS
            ================================================================ */}

        <section className="probability-stat-grid">

          <article>

            <span>
              Trials
            </span>

            <strong>
              {totalTrials.toLocaleString()}
            </strong>

          </article>


          <article>

            <span>
              Successes
            </span>

            <strong>
              {successes.toLocaleString()}
            </strong>

          </article>


          <article>

            <span>
              Theoretical
            </span>

            <strong>
              {theoreticalPercent.toFixed(
                1
              )}
              %
            </strong>

          </article>


          <article>

            <span>
              Experimental
            </span>

            <strong>
              {totalTrials >
              0
                ? `${experimentalPercent.toFixed(
                    1
                  )}%`
                : "—"}
            </strong>

          </article>

        </section>


        {/* ================================================================
            VISUAL COMPARISON
            ================================================================ */}

        <section className="probability-comparison">

          <div className="probability-comparison-heading">

            <span className="eyebrow">
              Compare
            </span>

            <h4>
              Theoretical versus
              experimental probability
            </h4>

          </div>


          <div className="probability-bars">

            <div>

              <span>
                Theoretical
              </span>

              <div className="probability-bar-track">

                <div
                  style={{
                    width:
                      `${theoreticalPercent}%`,
                  }}
                />

              </div>

              <strong>
                {theoreticalPercent.toFixed(
                  1
                )}
                %
              </strong>

            </div>


            <div>

              <span>
                Experimental
              </span>

              <div className="probability-bar-track">

                <div
                  style={{
                    width:
                      `${experimentalPercent}%`,
                  }}
                />

              </div>

              <strong>
                {totalTrials >
                0
                  ? `${experimentalPercent.toFixed(
                      1
                    )}%`
                  : "—"}
              </strong>

            </div>

          </div>

        </section>


        {/* ================================================================
            CONVERGENCE GRAPH
            ================================================================ */}

        <section className="probability-chart-panel">

          <div className="probability-comparison-heading">

            <span className="eyebrow">
              Long-run behaviour
            </span>

            <h4>
              Watch the relative
              frequency stabilise
            </h4>

            <p>
              The horizontal reference
              line is the theoretical
              probability.
            </p>

          </div>


          <div className="probability-chart">

            <svg
              viewBox="0 0 600 180"
              role="img"
              aria-label="Experimental probability over repeated trials"
            >

              <line
                x1="0"
                x2="600"
                y1={
                  theoreticalY
                }
                y2={
                  theoreticalY
                }
                className="probability-theoretical-line"
              />


              {chartPoints && (
                <path
                  d={
                    chartPoints
                  }
                  className="probability-history-line"
                />
              )}

            </svg>


            {history.length ===
              0 && (
              <div className="probability-chart-empty">
                Run some trials to
                generate the graph.
              </div>
            )}

          </div>

        </section>


        {/* ================================================================
            INTERPRETATION
            ================================================================ */}

        <section className="probability-observation">

          <span>
            What should you notice?
          </span>


          {totalTrials ===
          0 ? (

            <p>
              Run 10 trials first.
              Then add 100 and finally
              1,000 trials.
            </p>

          ) : (

            <p>
              After{" "}
              <strong>
                {totalTrials.toLocaleString()}
              </strong>{" "}
              trials, the experimental
              probability is{" "}
              <strong>
                {experimentalProbability.toFixed(
                  3
                )}
              </strong>
              . It differs from the
              theoretical probability
              by{" "}
              <strong>
                {difference.toFixed(
                  3
                )}
              </strong>
              .
            </p>

          )}


          <p>
            A small number of trials
            can fluctuate considerably.
            With many repeated trials,
            the relative frequency
            tends to become more stable
            around the theoretical
            probability.
          </p>

        </section>

      </div>

    </div>
  );
}