import {
  loadPyodide,
} from "https://cdn.jsdelivr.net/pyodide/v314.0.2/full/pyodide.mjs";


const PYODIDE_INDEX_URL =
  "https://cdn.jsdelivr.net/pyodide/v314.0.2/full/";


let pyodidePromise =
  null;


function getPyodide() {
  if (
    !pyodidePromise
  ) {
    pyodidePromise =
      loadPyodide({
        indexURL:
          PYODIDE_INDEX_URL,
      });
  }


  return pyodidePromise;
}


function compactError(
  error
) {
  const raw =
    error instanceof Error
      ? error.message
      : String(
          error
        );


  const lines =
    raw
    .split(
      "\n"
    )
    .map(
      (
        line
      ) =>
        line.trimEnd()
    )
    .filter(
      Boolean
    );


  const execIndex =
    lines.findLastIndex(
      (
        line
      ) =>
        line.includes(
          'File "<exec>"'
        )
    );


  if (
    execIndex >=
      0
  ) {
    return lines
      .slice(
        execIndex,
        execIndex +
          6
      )
      .join(
        "\n"
      );
  }


  return lines
    .slice(
      -4
    )
    .join(
      "\n"
    );
}


function needsTeachingFiles(
  code
) {
  return (
    code.includes(
      "data/"
    ) ||
    code.includes(
      "outputs/"
    )
  );
}


function needsMatplotlib(
  code
) {
  return (
    /\bmatplotlib\b/.test(
      code
    ) ||
    /\bplt\./.test(
      code
    ) ||
    /\.plot(?:\.|\()/.test(
      code
    ) ||
    /\bfig\b/.test(
      code
    ) ||
    /\bax\b/.test(
      code
    )
  );
}


async function ensurePackages(
  pyodide,
  code,
  explicitPackages =
    []
) {
  const packages =
    new Set(
      explicitPackages
    );


  if (
    needsTeachingFiles(
      code
    )
  ) {
    packages.add(
      "numpy"
    );

    packages.add(
      "pandas"
    );
  }


  if (
    needsMatplotlib(
      code
    )
  ) {
    packages.add(
      "matplotlib"
    );
  }


  if (
    packages.size
  ) {
    await pyodide.loadPackage(
      [
        ...packages,
      ]
    );
  }


  await pyodide.loadPackagesFromImports(
    code
  );
}


async function resetTeachingFiles(
  pyodide
) {
  await pyodide.loadPackage(
    [
      "numpy",
      "pandas",
    ]
  );


  await pyodide.runPythonAsync(`
from pathlib import Path
import numpy as np
import pandas as pd

DATA = Path("data")
OUTPUT = Path("outputs")

DATA.mkdir(
    parents=True,
    exist_ok=True,
)

OUTPUT.mkdir(
    parents=True,
    exist_ok=True,
)

rng = np.random.default_rng(
    2026
)

n_sales = 240

revenue = np.clip(
    rng.lognormal(
        mean=np.log(145),
        sigma=0.32,
        size=n_sales,
    ),
    45,
    360,
).round(2)

cost = (
    revenue
    * rng.uniform(
        0.52,
        0.78,
        n_sales,
    )
).round(2)

ad_spend = (
    revenue
    * rng.uniform(
        0.05,
        0.16,
        n_sales,
    )
).round(2)

sales = pd.DataFrame({
    "id": [
        f"S{i + 1:03d}"
        for i
        in range(n_sales)
    ],
    "order_id": [
        f"O{i + 1:04d}"
        for i
        in range(n_sales)
    ],
    "customer_id": [
        f"C{(i % 60) + 1:03d}"
        for i
        in range(n_sales)
    ],
    "region":
        rng.choice(
            [
                "North",
                "South",
                "West",
            ],
            size=n_sales,
            p=[
                0.38,
                0.34,
                0.28,
            ],
        ),
    "channel":
        rng.choice(
            [
                "Web",
                "Store",
            ],
            size=n_sales,
            p=[
                0.65,
                0.35,
            ],
        ),
    "revenue":
        revenue,
    "cost":
        cost,
    "ad_spend":
        ad_spend,
    "age":
        rng.integers(
            18,
            70,
            n_sales,
        ),
    "score_2024":
        rng.integers(
            40,
            90,
            n_sales,
        ),
    "date":
        pd.date_range(
            "2025-01-01",
            periods=n_sales,
            freq="D",
        ),
    "outcome":
        rng.integers(
            0,
            2,
            n_sales,
        ),
    "exposure":
        rng.choice(
            [
                "A",
                "B",
            ],
            n_sales,
        ),
    "segment":
        rng.choice(
            [
                "A",
                "B",
                "C",
            ],
            n_sales,
            p=[
                0.4,
                0.4,
                0.2,
            ],
        ),
    "value":
        rng.normal(
            100,
            12,
            n_sales,
        ).round(2),
})

sales["score_2025"] = np.clip(
    sales["score_2024"]
    + rng.integers(
        -5,
        16,
        n_sales,
    ),
    0,
    100,
)

customers = pd.DataFrame({
    "customer_id": [
        f"C{i + 1:03d}"
        for i
        in range(60)
    ],
    "customer_segment":
        rng.choice(
            [
                "A",
                "B",
                "C",
            ],
            60,
        ),
})

orders = sales.iloc[
    :180
].copy()

orders.loc[
    [
        17,
        59,
        111,
        149,
    ],
    "revenue",
] = np.nan

raw_sales = sales.iloc[
    :90
].copy()

raw_sales.loc[
    raw_sales.index[
        ::7
    ],
    "region",
] = (
    raw_sales.loc[
        raw_sales.index[
            ::7
        ],
        "region",
    ]
    .str.lower()
    .map(
        lambda value:
            f" {value} "
    )
)

raw_sales.loc[
    raw_sales.index[
        ::23
    ],
    "revenue",
] = np.nan

dirty = pd.DataFrame({
    "id": [
        "P01",
        "P02",
        "P03",
        "P04",
        "P05",
        "P06",
        "P07",
        "P08",
    ],
    "order_id": [
        "D001",
        "D002",
        "D003",
        "D003",
        "D005",
        "D006",
        "D007",
        "D008",
    ],
    "region": [
        " north ",
        "SOUTH",
        "North",
        "North",
        " west ",
        "WEST",
        "South",
        None,
    ],
    "revenue": [
        120.0,
        np.nan,
        85.0,
        85.0,
        -10.0,
        140.0,
        99.0,
        170.0,
    ],
    "cost": [
        70.0,
        50.0,
        44.0,
        44.0,
        30.0,
        80.0,
        60.0,
        100.0,
    ],
    "age": [
        28,
        35,
        41,
        41,
        150,
        31,
        22,
        47,
    ],
    "outcome": [
        1.0,
        0.0,
        np.nan,
        np.nan,
        1.0,
        0.0,
        1.0,
        0.0,
    ],
    "exposure": [
        "A",
        "B",
        "A",
        "A",
        None,
        "B",
        "A",
        "B",
    ],
    "score_2024": [
        68,
        61,
        77,
        77,
        55,
        70,
        64,
        82,
    ],
    "score_2025": [
        72,
        65,
        84,
        84,
        58,
        77,
        69,
        88,
    ],
})

daily = pd.DataFrame({
    "date":
        pd.date_range(
            "2026-01-01",
            periods=90,
            freq="D",
        ),
})

daily["value"] = (
    100
    + np.linspace(
        0,
        12,
        90,
    )
    + 8
    * np.sin(
        np.arange(90)
        * 2
        * np.pi
        / 14
    )
    + rng.normal(
        0,
        2.5,
        90,
    )
).round(2)

sales.to_csv(
    DATA / "sales.csv",
    index=False,
)

orders.to_csv(
    DATA / "orders.csv",
    index=False,
)

customers.to_csv(
    DATA / "customers.csv",
    index=False,
)

raw_sales.to_csv(
    DATA / "raw_sales.csv",
    index=False,
)

dirty.to_csv(
    DATA / "dirty_orders.csv",
    index=False,
)

daily.to_csv(
    DATA / "daily.csv",
    index=False,
)
  `);
}


async function configureMatplotlib(
  pyodide,
  code
) {
  if (
    !needsMatplotlib(
      code
    )
  ) {
    return;
  }


  await pyodide.loadPackage(
    "matplotlib"
  );


  await pyodide.runPythonAsync(`
import matplotlib

matplotlib.use(
    "Agg",
    force=True,
)

import matplotlib.pyplot as plt

plt.close(
    "all"
)

def _mat_show(
    *args,
    **kwargs
):
    return None

plt.show = _mat_show
  `);
}


async function captureFigures(
  pyodide
) {
  const jsonText =
    await pyodide.runPythonAsync(`
import base64
import io
import json
import sys

images = []

if "matplotlib.pyplot" in sys.modules:
    import matplotlib.pyplot as plt

    for number in plt.get_fignums():
        figure = plt.figure(
            number
        )

        buffer = io.BytesIO()

        figure.savefig(
            buffer,
            format="png",
            dpi=140,
            bbox_inches="tight",
        )

        images.append(
            base64.b64encode(
                buffer.getvalue()
            ).decode(
                "ascii"
            )
        )

    plt.close(
        "all"
    )

json.dumps(
    images
)
  `);


  return JSON.parse(
    jsonText ||
    "[]"
  );
}


async function evaluateTests(
  pyodide,
  namespace,
  tests =
    []
) {
  const results =
    [];


  for (
    const test
    of tests
  ) {
    try {
      const expression =
        JSON.stringify(
          test.expression
        );


      const value =
        await pyodide.runPythonAsync(
          `int(bool(eval(${expression}, globals(), globals())))`,
          {
            globals:
              namespace,
          }
        );


      results.push({
        name:
          test.name,

        passed:
          Number(
            value
          ) ===
          1,
      });


      if (
        value &&
        typeof value.destroy ===
          "function"
      ) {
        value.destroy();
      }
    } catch (
      error
    ) {
      results.push({
        name:
          test.name,

        passed:
          false,

        message:
          compactError(
            error
          ),
      });
    }
  }


  return results;
}


async function execute(
  message
) {
  const started =
    performance.now();


  const pyodide =
    await getPyodide();


  const combinedCode =
    [
      message.code,
      ...(message.tests ||
        []).map(
        (
          test
        ) =>
          test.expression
      ),
    ].join(
      "\n"
    );


  await ensurePackages(
    pyodide,
    combinedCode,
    message.packages ||
    []
  );


  if (
    needsTeachingFiles(
      combinedCode
    )
  ) {
    await resetTeachingFiles(
      pyodide
    );
  }


  await configureMatplotlib(
    pyodide,
    combinedCode
  );


  const stdout =
    [];


  const stderr =
    [];


  pyodide.setStdout({
    batched:
      (
        text
      ) =>
        stdout.push(
          text
        ),
  });


  pyodide.setStderr({
    batched:
      (
        text
      ) =>
        stderr.push(
          text
        ),
  });


  const dict =
    pyodide.globals.get(
      "dict"
    );


  const namespace =
    dict();


  dict.destroy();


  try {
    let resultText =
      "";


    const result =
      await pyodide.runPythonAsync(
        message.code,
        {
          globals:
            namespace,
        }
      );


    if (
      result !==
        undefined &&
      result !==
        null
    ) {
      try {
        resultText =
          String(
            result
          );
      } finally {
        if (
          typeof result.destroy ===
            "function"
        ) {
          result.destroy();
        }
      }
    }


    const tests =
      message.action ===
        "check"
        ? await evaluateTests(
            pyodide,
            namespace,
            message.tests ||
            []
          )
        : undefined;


    const figures =
      await captureFigures(
        pyodide
      );


    return {
      id:
        message.id,

      ok:
        true,

      stdout:
        stdout.join(
          "\n"
        ),

      stderr:
        stderr.join(
          "\n"
        ),

      result:
        resultText,

      figures,

      tests,

      durationMs:
        Math.round(
          performance.now()
          -
          started
        ),
    };
  } finally {
    namespace.destroy();
  }
}


self.onmessage =
  async (
    event
  ) => {
    const started =
      performance.now();


    try {
      self.postMessage(
        await execute(
          event.data
        )
      );
    } catch (
      error
    ) {
      self.postMessage({
        id:
          event.data.id,

        ok:
          false,

        stdout:
          "",

        stderr:
          "",

        figures:
          [],

        error:
          compactError(
            error
          ),

        durationMs:
          Math.round(
            performance.now()
            -
            started
          ),
      });
    }
  };
