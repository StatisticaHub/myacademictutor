"use client";

import {
  useMemo,
  useState,
} from "react";


type Props = {
  title: string;
  description: string;
};


function f(
  x: number
) {
  return x * x;
}


function clean(
  value: number,
  digits = 3
) {
  const rounded =
    Number(
      value.toFixed(
        digits
      )
    );


  return Object.is(
    rounded,
    -0
  )
    ? 0
    : rounded;
}


export default function SecantSlopeExplorer({
  title,
  description,
}: Props) {

  const [
    x,
    setX,
  ] =
    useState(
      1.5
    );


  const [
    h,
    setH,
  ] =
    useState(
      2
    );


  const values =
    useMemo(
      () => {

        const x2 =
          x + h;


        const y1 =
          f(
            x
          );


        const y2 =
          f(
            x2
          );


        const slope =
          (
            y2 -
            y1
          ) /
          (
            x2 -
            x
          );


        const tangentSlope =
          2 *
          x;


        return {
          x2,
          y1,
          y2,
          slope,
          tangentSlope,

          difference:
            Math.abs(
              slope -
              tangentSlope
            ),
        };
      },
      [
        x,
        h,
      ]
    );


  const plot = {
    width:
      640,
    height:
      330,
    left:
      50,
    right:
      24,
    top:
      22,
    bottom:
      42,
    xMin:
      -4,
    xMax:
      4,
    yMin:
      -2,
    yMax:
      18,
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


  const curvePoints =
    Array.from(
      {
        length:
          121,
      },
      (
        _,
        index
      ) => {

        const px =
          plot.xMin +
          index /
          120 *
          (
            plot.xMax -
            plot.xMin
          );


        return `${sx(px)},${sy(f(px))}`;
      }
    )
    .join(
      " "
    );


  const lineX1 =
    plot.xMin;


  const lineX2 =
    plot.xMax;


  const lineY1 =
    values.y1 +
    values.slope *
    (
      lineX1 -
      x
    );


  const lineY2 =
    values.y1 +
    values.slope *
    (
      lineX2 -
      x
    );


  const closeness =
    values.difference <
      0.05
      ? "Very close to the tangent slope"
      : values.difference <
          0.25
        ? "Getting close to the tangent slope"
        : "A wider interval gives a broader average";


  return (
    <section className="secant-lab">

      <div className="secant-lab-heading">

        <span className="secant-lab-kicker">
          Interactive lab
        </span>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>


      <div className="secant-lab-grid">

        <div className="secant-lab-controls">

          <div className="secant-control">

            <div className="secant-control-label">

              <label htmlFor="secant-x">
                Base point x
              </label>

              <strong>
                {clean(
                  x,
                  2
                )}
              </strong>

            </div>


            <input
              id="secant-x"
              type="range"
              min="-2.5"
              max="2.5"
              step="0.1"
              value={
                x
              }
              onChange={
                (
                  event
                ) =>
                  setX(
                    Number(
                      event
                        .target
                        .value
                    )
                  )
              }
            />

          </div>


          <div className="secant-control">

            <div className="secant-control-label">

              <label htmlFor="secant-h">
                Interval width h
              </label>

              <strong>
                {clean(
                  h,
                  3
                )}
              </strong>

            </div>


            <input
              id="secant-h"
              type="range"
              min="0.02"
              max="3"
              step="0.02"
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


          <div className="secant-equation">

            <span>
              Function
            </span>

            <strong>
              f(x) = x²
            </strong>

          </div>


          <div className="secant-metric-grid">

            <article>

              <span>
                First point
              </span>

              <strong>
                (
                {clean(
                  x,
                  2
                )}
                ,{" "}
                {clean(
                  values.y1,
                  2
                )}
                )
              </strong>

            </article>


            <article>

              <span>
                Second point
              </span>

              <strong>
                (
                {clean(
                  values.x2,
                  2
                )}
                ,{" "}
                {clean(
                  values.y2,
                  2
                )}
                )
              </strong>

            </article>


            <article>

              <span>
                Secant slope
              </span>

              <strong>
                {clean(
                  values.slope,
                  3
                )}
              </strong>

            </article>


            <article>

              <span>
                Tangent slope at x
              </span>

              <strong>
                {clean(
                  values.tangentSlope,
                  3
                )}
              </strong>

            </article>

          </div>


          <div className="secant-lab-note">

            <strong>
              {closeness}
            </strong>

            <p>
              For f(x) = x², the
              secant slope gets closer
              to 2x as h gets closer
              to zero.
            </p>

          </div>

        </div>


        <div className="secant-chart-wrap">

          <svg
            className="secant-chart"
            viewBox={`0 0 ${plot.width} ${plot.height}`}
            role="img"
            aria-label="Graph of x squared with two points and the secant line joining them"
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
              className="secant-axis"
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
              className="secant-axis"
            />


            <polyline
              points={
                curvePoints
              }
              className="secant-curve"
            />


            <line
              x1={
                sx(
                  lineX1
                )
              }
              y1={
                sy(
                  lineY1
                )
              }
              x2={
                sx(
                  lineX2
                )
              }
              y2={
                sy(
                  lineY2
                )
              }
              className="secant-line"
            />


            <circle
              cx={
                sx(
                  x
                )
              }
              cy={
                sy(
                  values.y1
                )
              }
              r="7"
              className="secant-point first"
            />


            <circle
              cx={
                sx(
                  values.x2
                )
              }
              cy={
                sy(
                  values.y2
                )
              }
              r="7"
              className="secant-point second"
            />


            <text
              x={
                sx(
                  x
                ) +
                10
              }
              y={
                sy(
                  values.y1
                ) -
                10
              }
              className="secant-label"
            >
              A
            </text>


            <text
              x={
                sx(
                  values.x2
                ) +
                10
              }
              y={
                sy(
                  values.y2
                ) -
                10
              }
              className="secant-label"
            >
              B
            </text>

          </svg>


          <div className="secant-formula">

            <span>
              Average rate of change
            </span>

            <strong>
              [
              {clean(
                values.y2,
                2
              )}
              {" - "}
              {clean(
                values.y1,
                2
              )}
              ] / [
              {clean(
                values.x2,
                2
              )}
              {" - "}
              {clean(
                x,
                2
              )}
              ]
              {" = "}
              {clean(
                values.slope,
                3
              )}
            </strong>

          </div>

        </div>

      </div>

    </section>
  );
}
