"use client";

import {
  useMemo,
  useState,
} from "react";


type Props = {
  title: string;
  description: string;
};


function g(
  x: number
) {
  return x + 1;
}


function clean(
  value: number,
  digits = 4
) {
  return Number(
    value.toFixed(
      digits
    )
  );
}


export default function LimitExplorer({
  title,
  description,
}: Props) {

  const [
    h,
    setH,
  ] =
    useState(
      1
    );


  const values =
    useMemo(
      () => {

        const leftX =
          1 -
          h;

        const rightX =
          1 +
          h;


        return {
          leftX,
          rightX,

          leftY:
            g(
              leftX
            ),

          rightY:
            g(
              rightX
            ),

          target:
            2,

          leftGap:
            Math.abs(
              g(
                leftX
              ) -
              2
            ),

          rightGap:
            Math.abs(
              g(
                rightX
              ) -
              2
            ),
        };
      },
      [
        h,
      ]
    );


  const plot = {
    width:
      640,
    height:
      320,

    left:
      50,

    right:
      24,

    top:
      22,

    bottom:
      42,

    xMin:
      -1,

    xMax:
      3,

    yMin:
      -0.5,

    yMax:
      4.5,
  };


  function sx(
    value: number
  ) {
    const usable =
      plot.width -
      plot.left -
      plot.right;


    return (
      plot.left +
      (
        value -
        plot.xMin
      ) /
      (
        plot.xMax -
        plot.xMin
      ) *
      usable
    );
  }


  function sy(
    value: number
  ) {
    const usable =
      plot.height -
      plot.top -
      plot.bottom;


    return (
      plot.top +
      (
        plot.yMax -
        value
      ) /
      (
        plot.yMax -
        plot.yMin
      ) *
      usable
    );
  }


  const linePoints =
    Array.from(
      {
        length:
          121,
      },
      (
        _,
        index
      ) => {

        const x =
          plot.xMin +
          index /
          120 *
          (
            plot.xMax -
            plot.xMin
          );


        return `${sx(x)},${sy(g(x))}`;
      }
    )
      .join(
        " "
      );


  const message =
    h <
    0.05
      ? "Both sides are extremely close to 2."
      : h <
          0.25
        ? "Both sides are settling near the same value."
        : "Reduce h to inspect the function closer to x = 1.";


  return (
    <section className="limit-lab">

      <div className="limit-lab-heading">

        <span className="limit-lab-kicker">
          Interactive lab
        </span>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>


      <div className="limit-lab-grid">

        <div className="limit-lab-controls">

          <div className="limit-control">

            <div className="limit-control-label">

              <label htmlFor="limit-h">
                Distance from x = 1
              </label>

              <strong>
                h ={" "}
                {clean(
                  h,
                  3
                )}
              </strong>

            </div>


            <input
              id="limit-h"
              type="range"
              min="0.01"
              max="1.5"
              step="0.01"
              value={
                h
              }
              onChange={
                (
                  event
                ) =>
                  setH(
                    Number(
                      event
                        .target
                        .value
                    )
                  )
              }
            />

          </div>


          <div className="limit-equation">

            <span>
              Function
            </span>

            <strong>
              g(x) = (x² - 1)/(x - 1)
            </strong>

            <small>
              for x ≠ 1
            </small>

          </div>


          <div className="limit-metric-grid">

            <article>

              <span>
                From the left
              </span>

              <strong>
                x ={" "}
                {clean(
                  values.leftX,
                  3
                )}
              </strong>

              <small>
                g(x) ={" "}
                {clean(
                  values.leftY,
                  3
                )}
              </small>

            </article>


            <article>

              <span>
                From the right
              </span>

              <strong>
                x ={" "}
                {clean(
                  values.rightX,
                  3
                )}
              </strong>

              <small>
                g(x) ={" "}
                {clean(
                  values.rightY,
                  3
                )}
              </small>

            </article>


            <article>

              <span>
                Function value
              </span>

              <strong>
                g(1)
              </strong>

              <small>
                undefined
              </small>

            </article>


            <article>

              <span>
                Suggested limit
              </span>

              <strong>
                2
              </strong>

              <small>
                from both sides
              </small>

            </article>

          </div>


          <div className="limit-lab-note">

            <strong>
              {message}
            </strong>

            <p>
              The point x = 1 is
              missing, but nearby
              values still approach
              the same height.
            </p>

          </div>

        </div>


        <div className="limit-chart-wrap">

          <svg
            className="limit-chart"
            viewBox={`0 0 ${plot.width} ${plot.height}`}
            role="img"
            aria-label="Graph approaching an open circle at x equals 1 and y equals 2 from both sides"
          >

            <line
              x1={
                sx(
                  plot.xMin
                )
              }
              x2={
                sx(
                  plot.xMax
                )
              }
              y1={
                sy(
                  0
                )
              }
              y2={
                sy(
                  0
                )
              }
              className="limit-axis"
            />


            <line
              x1={
                sx(
                  0
                )
              }
              x2={
                sx(
                  0
                )
              }
              y1={
                sy(
                  plot.yMin
                )
              }
              y2={
                sy(
                  plot.yMax
                )
              }
              className="limit-axis"
            />


            <polyline
              points={
                linePoints
              }
              className="limit-curve"
            />


            <circle
              cx={
                sx(
                  1
                )
              }
              cy={
                sy(
                  2
                )
              }
              r="8"
              className="limit-hole"
            />


            <circle
              cx={
                sx(
                  values.leftX
                )
              }
              cy={
                sy(
                  values.leftY
                )
              }
              r="7"
              className="limit-point left"
            />


            <circle
              cx={
                sx(
                  values.rightX
                )
              }
              cy={
                sy(
                  values.rightY
                )
              }
              r="7"
              className="limit-point right"
            />


            <line
              x1={
                sx(
                  values.leftX
                )
              }
              x2={
                sx(
                  1
                )
              }
              y1={
                sy(
                  values.leftY
                )
              }
              y2={
                sy(
                  2
                )
              }
              className="limit-guide"
            />


            <line
              x1={
                sx(
                  values.rightX
                )
              }
              x2={
                sx(
                  1
                )
              }
              y1={
                sy(
                  values.rightY
                )
              }
              y2={
                sy(
                  2
                )
              }
              className="limit-guide"
            />

          </svg>


          <div className="limit-chart-caption">

            <span>
              As h → 0
            </span>

            <strong>
              left value → 2
              {"  ·  "}
              right value → 2
            </strong>

          </div>

        </div>

      </div>

    </section>
  );
}
