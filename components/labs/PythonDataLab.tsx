"use client";

import {
  useMemo,
  useState,
} from "react";


type Props = {
  labKey: string;
  title: string;
  description: string;
};


const smallData = [
  {
    id: "P01",
    group: "A",
    score: 72,
    age: 24,
  },
  {
    id: "P02",
    group: "B",
    score: 88,
    age: 31,
  },
  {
    id: "P03",
    group: "A",
    score: 65,
    age: 27,
  },
  {
    id: "P04",
    group: "B",
    score: 79,
    age: 35,
  },
];


function WorkflowLab() {
  const steps = [
    "Define the question",
    "Read source data",
    "Validate structure",
    "Clean and transform",
    "Explore",
    "Analyse",
    "Communicate",
    "Clean rerun",
  ];

  const [
    active,
    setActive,
  ] = useState(0);

  return (
    <div className="python-lab-content">
      <div className="python-step-grid">
        {steps.map(
          (
            step,
            index
          ) => (
            <button
              type="button"
              key={step}
              className={
                index === active
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive(index)
              }
            >
              <span>
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </span>

              {step}
            </button>
          )
        )}
      </div>

      <div className="python-lab-result">
        <span>
          Current stage
        </span>

        <strong>
          {steps[active]}
        </strong>

        <p>
          A reproducible workflow makes
          each transition explicit rather
          than relying on undocumented
          manual edits.
        </p>
      </div>
    </div>
  );
}


function ShapeLab() {
  const [
    rows,
    setRows,
  ] = useState(3);

  const [
    columns,
    setColumns,
  ] = useState(4);

  return (
    <div className="python-lab-content">
      <div className="python-lab-controls">
        <label>
          <span>
            Rows
            <strong>
              {rows}
            </strong>
          </span>

          <input
            type="range"
            min="1"
            max="8"
            value={rows}
            onChange={(event) =>
              setRows(
                Number(
                  event
                    .target
                    .value
                )
              )
            }
          />
        </label>

        <label>
          <span>
            Columns
            <strong>
              {columns}
            </strong>
          </span>

          <input
            type="range"
            min="1"
            max="8"
            value={columns}
            onChange={(event) =>
              setColumns(
                Number(
                  event
                    .target
                    .value
                )
              )
            }
          />
        </label>
      </div>

      <div className="python-array-preview">
        {Array.from(
          {
            length:
              rows * columns,
          },
          (
            _,
            index
          ) => (
            <span
              key={index}
            >
              {index + 1}
            </span>
          )
        )}
      </div>

      <div className="python-metric-grid">
        <article>
          <span>
            shape
          </span>

          <strong>
            ({rows}, {columns})
          </strong>
        </article>

        <article>
          <span>
            ndim
          </span>

          <strong>
            2
          </strong>
        </article>

        <article>
          <span>
            size
          </span>

          <strong>
            {rows * columns}
          </strong>
        </article>
      </div>
    </div>
  );
}


function DataFrameLab() {
  const [
    showTypes,
    setShowTypes,
  ] =
    useState(false);

  return (
    <div className="python-lab-content">
      <div className="python-table-wrap">
        <table className="python-mini-table">
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                group
              </th>
              <th>
                age
              </th>
              <th>
                score
              </th>
            </tr>
          </thead>

          <tbody>
            {smallData.map(
              (
                row
              ) => (
                <tr
                  key={row.id}
                >
                  <td>
                    {row.id}
                  </td>
                  <td>
                    {row.group}
                  </td>
                  <td>
                    {row.age}
                  </td>
                  <td>
                    {row.score}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="button button-outline"
        onClick={() =>
          setShowTypes(
            (
              current
            ) =>
              !current
          )
        }
      >
        {showTypes
          ? "Hide dtypes"
          : "Inspect dtypes"}
      </button>

      {showTypes && (
        <div className="python-lab-result">
          <strong>
            id: string · group: string ·
            age: int64 · score: int64
          </strong>

          <p>
            Inspection before analysis
            helps catch parsing and
            structural problems.
          </p>
        </div>
      )}
    </div>
  );
}


function CleaningLab() {
  const messy = [
    ["P01", " london ", "28"],
    ["P02", "LONDON", "unknown"],
    ["P02", "LONDON", "unknown"],
    ["P03", "Bristol ", "31"],
  ];

  const [
    cleaned,
    setCleaned,
  ] =
    useState(false);

  const rows =
    cleaned
      ? [
          [
            "P01",
            "London",
            "28",
          ],
          [
            "P02",
            "London",
            "NA",
          ],
          [
            "P03",
            "Bristol",
            "31",
          ],
        ]
      : messy;

  return (
    <div className="python-lab-content">
      <div className="python-table-wrap">
        <table className="python-mini-table">
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                city
              </th>
              <th>
                age
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (
                row,
                index
              ) => (
                <tr
                  key={`${row[0]}-${index}`}
                >
                  {row.map(
                    (
                      value,
                      cell
                    ) => (
                      <td
                        key={cell}
                      >
                        {value}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="button"
        onClick={() =>
          setCleaned(
            (
              current
            ) =>
              !current
          )
        }
      >
        {cleaned
          ? "Show source values"
          : "Apply cleaning rules"}
      </button>

      <div className="python-lab-result">
        <strong>
          {cleaned
            ? "Whitespace/case standardised, invalid age flagged, duplicate reviewed"
            : "Source data contain inconsistent text, invalid numeric text and a duplicate"}
        </strong>
      </div>
    </div>
  );
}


function GroupByLab() {
  const [
    metric,
    setMetric,
  ] =
    useState<
      "mean" |
      "count"
    >(
      "mean"
    );

  const groups =
    useMemo(
      () => {
        const names = [
          "A",
          "B",
        ];

        return names.map(
          (
            group
          ) => {
            const rows =
              smallData.filter(
                (
                  row
                ) =>
                  row.group ===
                  group
              );

            const mean =
              rows.reduce(
                (
                  total,
                  row
                ) =>
                  total +
                  row.score,
                0
              ) /
              rows.length;

            return {
              group,
              count:
                rows.length,
              mean,
            };
          }
        );
      },
      []
    );

  return (
    <div className="python-lab-content">
      <div className="python-pill-row">
        {(
          [
            "mean",
            "count",
          ] as const
        ).map(
          (
            item
          ) => (
            <button
              key={item}
              type="button"
              className={
                metric === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setMetric(
                  item
                )
              }
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="python-metric-grid">
        {groups.map(
          (
            group
          ) => (
            <article
              key={group.group}
            >
              <span>
                Group {group.group}
              </span>

              <strong>
                {metric ===
                "mean"
                  ? group.mean.toFixed(
                      1
                    )
                  : group.count}
              </strong>
            </article>
          )
        )}
      </div>
    </div>
  );
}


function MergeLab() {
  const [
    join,
    setJoin,
  ] =
    useState<
      "left" |
      "inner" |
      "outer"
    >(
      "left"
    );

  const message = {
    left:
      "Keep every key from the left table and attach matches from the right.",
    inner:
      "Keep only keys that appear in both tables.",
    outer:
      "Keep every key that appears in either table.",
  }[
    join
  ];

  return (
    <div className="python-lab-content">
      <div className="python-pill-row">
        {(
          [
            "left",
            "inner",
            "outer",
          ] as const
        ).map(
          (
            item
          ) => (
            <button
              key={item}
              type="button"
              className={
                join === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setJoin(
                  item
                )
              }
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="python-lab-result">
        <span>
          {join} merge
        </span>

        <strong>
          {message}
        </strong>

        <p>
          Always check key uniqueness,
          match indicators and row
          counts after merging.
        </p>
      </div>
    </div>
  );
}


function ChartLab() {
  const [
    question,
    setQuestion,
  ] =
    useState(
      "distribution"
    );

  const recommendation:
    Record<
      string,
      string
    > = {
      distribution:
        "Histogram + box/raw-point view",
      relationship:
        "Scatter plot",
      groups:
        "Box/violin + raw points",
      time:
        "Ordered line plot",
  };

  return (
    <div className="python-lab-content">
      <select
        className="python-select"
        value={question}
        onChange={(event) =>
          setQuestion(
            event
              .target
              .value
          )
        }
      >
        <option value="distribution">
          Understand a distribution
        </option>
        <option value="relationship">
          Compare two numeric variables
        </option>
        <option value="groups">
          Compare groups
        </option>
        <option value="time">
          Show change over time
        </option>
      </select>

      <div className="python-lab-result">
        <span>
          Recommended starting point
        </span>

        <strong>
          {recommendation[
            question
          ]}
        </strong>
      </div>
    </div>
  );
}


function SamplingLab() {
  const [
    n,
    setN,
  ] =
    useState(25);

  const sd = 10;

  const se =
    sd /
    Math.sqrt(
      n
    );

  return (
    <div className="python-lab-content">
      <div className="python-lab-controls">
        <label>
          <span>
            Sample size
            <strong>
              {n}
            </strong>
          </span>

          <input
            type="range"
            min="10"
            max="500"
            step="5"
            value={n}
            onChange={(event) =>
              setN(
                Number(
                  event
                    .target
                    .value
                )
              )
            }
          />
        </label>
      </div>

      <div className="python-metric-grid">
        <article>
          <span>
            Assumed SD
          </span>

          <strong>
            {sd}
          </strong>
        </article>

        <article>
          <span>
            Approx. SE of mean
          </span>

          <strong>
            {se.toFixed(
              2
            )}
          </strong>
        </article>
      </div>

      <div className="python-lab-result">
        <p>
          As n increases, the sampling
          distribution of the mean
          generally becomes narrower.
        </p>
      </div>
    </div>
  );
}



function TimeSeriesLab() {
  const [
    windowSize,
    setWindowSize,
  ] =
    useState(3);

  const values = [
    10, 12, 9, 15,
    18, 16, 20,
  ];

  const rolling =
    values.map(
      (
        _,
        index
      ) => {
        const start =
          Math.max(
            0,
            index -
            windowSize +
            1
          );

        const slice =
          values.slice(
            start,
            index + 1
          );

        return (
          slice.reduce(
            (
              total,
              value
            ) =>
              total +
              value,
            0
          ) /
          slice.length
        );
      }
    );

  return (
    <div className="python-lab-content">
      <div className="python-lab-controls">
        <label>
          <span>
            Rolling window
            <strong>
              {windowSize}
            </strong>
          </span>

          <input
            type="range"
            min="2"
            max="5"
            step="1"
            value={windowSize}
            onChange={(event) =>
              setWindowSize(
                Number(
                  event
                    .target
                    .value
                )
              )
            }
          />
        </label>
      </div>

      <div className="python-metric-grid">
        <article>
          <span>
            Latest raw value
          </span>

          <strong>
            {values[
              values.length -
              1
            ]}
          </strong>
        </article>

        <article>
          <span>
            Latest rolling mean
          </span>

          <strong>
            {rolling[
              rolling.length -
              1
            ].toFixed(
              2
            )}
          </strong>
        </article>
      </div>

      <div className="python-lab-result">
        <p>
          Rolling summaries smooth local
          variation, but the selected
          window changes what patterns
          remain visible.
        </p>
      </div>
    </div>
  );
}


function RegressionLab() {
  const [
    outlier,
    setOutlier,
  ] =
    useState(false);

  return (
    <div className="python-lab-content">
      <button
        type="button"
        className="button"
        onClick={() =>
          setOutlier(
            (
              current
            ) =>
              !current
          )
        }
      >
        {outlier
          ? "Remove influential point"
          : "Add influential point"}
      </button>

      <div className="python-metric-grid">
        <article>
          <span>
            Approx. correlation
          </span>

          <strong>
            {outlier
              ? "0.28"
              : "0.82"}
          </strong>
        </article>

        <article>
          <span>
            Approx. slope
          </span>

          <strong>
            {outlier
              ? "0.31"
              : "0.76"}
          </strong>
        </article>
      </div>

      <div className="python-lab-result">
        <p>
          One observation can alter a
          fitted relationship. Diagnose
          influence rather than deleting
          points automatically.
        </p>
      </div>
    </div>
  );
}


function ProjectLab({
  qa = false,
}: {
  qa?: boolean;
}) {
  const steps =
    qa
      ? [
          "Defined inputs",
          "Dependencies recorded",
          "Clean run passes",
          "Tables generated by code",
          "Figures generated by code",
          "Sensitivity results retained",
          "README explains execution",
        ]
      : [
          "Question",
          "Unit of observation",
          "Audit",
          "Cleaning",
          "EDA",
          "Primary analysis",
          "Sensitivity checks",
          "Communication",
        ];

  const [
    complete,
    setComplete,
  ] =
    useState<
      string[]
    >(
      []
    );

  function toggle(
    step: string
  ) {
    setComplete(
      (
        current
      ) =>
        current.includes(
          step
        )
          ? current.filter(
              (
                item
              ) =>
                item !==
                step
            )
          : [
              ...current,
              step,
            ]
    );
  }

  return (
    <div className="python-lab-content">
      <div className="python-check-grid">
        {steps.map(
          (
            step
          ) => (
            <button
              key={step}
              type="button"
              className={
                complete.includes(
                  step
                )
                  ? "complete"
                  : ""
              }
              onClick={() =>
                toggle(
                  step
                )
              }
            >
              <span>
                {complete.includes(
                  step
                )
                  ? "✓"
                  : "○"}
              </span>

              {step}
            </button>
          )
        )}
      </div>

      <div className="python-lab-result">
        <strong>
          {complete.length}/
          {steps.length}
          {" "}
          checks complete
        </strong>
      </div>
    </div>
  );
}


export default function PythonDataLab({
  labKey,
  title,
  description,
}: Props) {
  let body:
    React.ReactNode;


  switch (
    labKey
  ) {
    case "workflow":
    case "python-workflow":
      body =
        <WorkflowLab />;
      break;

    case "numpy":
    case "numpy-shape":
      body =
        <ShapeLab />;
      break;

    case "dataframe":
    case "dataframe-explorer":
      body =
        <DataFrameLab />;
      break;

    case "missing":
    case "cleaning-studio":
      body =
        <CleaningLab />;
      break;

    case "quality":
    case "project-qa":
      body =
        <ProjectLab qa />;
      break;

    case "groupby":
    case "groupby-explorer":
      body =
        <GroupByLab />;
      break;

    case "merge":
    case "merge-explorer":
      body =
        <MergeLab />;
      break;

    case "eda":
    case "eda-workflow":
    case "chart-builder":
      body =
        <ChartLab />;
      break;

    case "time":
      body =
        <TimeSeriesLab />;
      break;

    case "sampling-lab":
      body =
        <SamplingLab />;
      break;

    case "regression-lab":
      body =
        <RegressionLab />;
      break;

    case "capstone-report":
      body =
        <ProjectLab qa />;
      break;

    case "capstone":
    case "project-planner":
    default:
      body =
        <ProjectLab />;
  }


  return (
    <section className="python-data-lab">
      <div className="python-data-lab-heading">
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

      {body}
    </section>
  );
}
