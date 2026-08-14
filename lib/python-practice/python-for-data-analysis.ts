import type {
  PythonLessonChallenge,
} from "@/lib/python-runtime/types";


export const pythonForDataAnalysisChallenges:
  PythonLessonChallenge[] = [

  {
    lessonKey: "m1-l1-python-foundations",
    anchorTitle: "A minimal analysis skeleton",
    title: "Turn a file into two summaries",
    instructions: "Read `data/sales.csv` into `df`, then create `rows` for the row count and `mean_revenue` for the mean revenue.",
    starterCode: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nrows = ...\nmean_revenue = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `len(df)` and `df['revenue'].mean()`.",
    solution: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nrows = len(df)\n\nmean_revenue = (\n    df[\"revenue\"]\n    .mean()\n)",
    tests: [
      {
        name: "240 rows are loaded",
        expression: "rows == 240",
      },
      {
        name: "mean_revenue matches the column mean",
        expression: "abs(mean_revenue - df[\"revenue\"].mean()) < 1e-9",
      },
    ],
    successMessage: "You created reproducible summaries directly from source data.",
  },

  {
    lessonKey: "m1-l2-python-foundations",
    anchorTitle: "Inspecting basic types",
    title: "Create a labelled Python record",
    instructions: "Create a dictionary called `participant` with `id='P001'`, `age=28`, and `eligible=True`.",
    starterCode: "participant = {\n    # add the three values\n}",
    packages: [
    ],
    hint: "Dictionary entries have the form `\"key\": value`.",
    solution: "participant = {\n    \"id\": \"P001\",\n    \"age\": 28,\n    \"eligible\": True,\n}",
    tests: [
      {
        name: "participant is a dictionary",
        expression: "isinstance(participant, dict)",
      },
      {
        name: "all required values are correct",
        expression: "participant.get(\"id\") == \"P001\" and participant.get(\"age\") == 28 and participant.get(\"eligible\") is True",
      },
    ],
    successMessage: "You represented one observation using labelled Python values.",
  },

  {
    lessonKey: "m1-l3-python-foundations",
    anchorTitle: "A validation function",
    title: "Write a reusable score classifier",
    instructions: "Complete `classify_score(score)`: 70+ is `pass`, 50–69 is `review`, otherwise `fail`.",
    starterCode: "def classify_score(score):\n    # write the conditions\n    pass",
    packages: [
    ],
    hint: "Test the highest threshold first.",
    solution: "def classify_score(score):\n    if score >= 70:\n        return \"pass\"\n\n    if score >= 50:\n        return \"review\"\n\n    return \"fail\"",
    tests: [
      {
        name: "76 is classified as pass",
        expression: "classify_score(76) == \"pass\"",
      },
      {
        name: "64 is classified as review",
        expression: "classify_score(64) == \"review\"",
      },
      {
        name: "42 is classified as fail",
        expression: "classify_score(42) == \"fail\"",
      },
      {
        name: "boundary 70 is pass",
        expression: "classify_score(70) == \"pass\"",
      },
    ],
    successMessage: "Your function handles both typical values and boundaries.",
  },

  {
    lessonKey: "m1-l4-python-foundations",
    anchorTitle: "Avoid hard-coded paths",
    title: "Create a portable output path",
    instructions: "Create `output_file` as the project-relative path `outputs/summary.csv` using `pathlib.Path`.",
    starterCode: "from pathlib import Path\n\noutput_file = ...",
    packages: [
    ],
    hint: "Combine `Path('outputs')` with the filename using `/`.",
    solution: "from pathlib import Path\n\noutput_file = (\n    Path(\"outputs\")\n    / \"summary.csv\"\n)",
    tests: [
      {
        name: "output_file is a Path",
        expression: "isinstance(output_file, Path)",
      },
      {
        name: "path is portable and correct",
        expression: "output_file.as_posix() == \"outputs/summary.csv\"",
      },
    ],
    successMessage: "You created a portable path rather than a machine-specific one.",
  },

  {
    lessonKey: "m2-l1-numpy",
    anchorTitle: "Create and inspect an array",
    title: "Vectorise a transformation",
    instructions: "Create `x = [2,4,6,8]` as a NumPy array and create `squared` containing its element-wise squares.",
    starterCode: "import numpy as np\n\nx = np.array([\n    2,\n    4,\n    6,\n    8,\n])\n\nsquared = ...",
    packages: [
      "numpy",
    ],
    hint: "NumPy arithmetic is element-wise: try `x ** 2`.",
    solution: "import numpy as np\n\nx = np.array([\n    2,\n    4,\n    6,\n    8,\n])\n\nsquared = x ** 2",
    tests: [
      {
        name: "squared is a NumPy array",
        expression: "isinstance(squared, np.ndarray)",
      },
      {
        name: "all squares are correct",
        expression: "np.array_equal(squared, np.array([4, 16, 36, 64]))",
      },
    ],
    successMessage: "You used vectorised NumPy arithmetic.",
  },

  {
    lessonKey: "m2-l2-numpy",
    anchorTitle: "Boolean masking",
    title: "Filter with a Boolean mask",
    instructions: "From `scores`, create `passed` containing only scores greater than or equal to 70.",
    starterCode: "import numpy as np\n\nscores = np.array([\n    48,\n    72,\n    65,\n    91,\n    54,\n])\n\npassed = ...",
    packages: [
      "numpy",
    ],
    hint: "Build the Boolean condition inside square brackets.",
    solution: "import numpy as np\n\nscores = np.array([\n    48,\n    72,\n    65,\n    91,\n    54,\n])\n\npassed = scores[\n    scores >= 70\n]",
    tests: [
      {
        name: "only qualifying scores remain",
        expression: "np.array_equal(passed, np.array([72, 91]))",
      },
    ],
    successMessage: "Your Boolean mask selected exactly the qualifying observations.",
  },

  {
    lessonKey: "m2-l3-numpy",
    anchorTitle: "Column means",
    title: "Calculate NaN-aware column means",
    instructions: "Create `column_means` for the two columns of `x`, ignoring missing values.",
    starterCode: "import numpy as np\n\nx = np.array([\n    [1.0, 10.0],\n    [3.0, np.nan],\n    [5.0, 30.0],\n])\n\ncolumn_means = ...",
    packages: [
      "numpy",
    ],
    hint: "Use `np.nanmean(..., axis=0)`.",
    solution: "import numpy as np\n\nx = np.array([\n    [1.0, 10.0],\n    [3.0, np.nan],\n    [5.0, 30.0],\n])\n\ncolumn_means = np.nanmean(\n    x,\n    axis=0,\n)",
    tests: [
      {
        name: "one result is returned per column",
        expression: "column_means.shape == (2,)",
      },
      {
        name: "missingness is handled correctly",
        expression: "np.allclose(column_means, np.array([3.0, 20.0]))",
      },
    ],
    successMessage: "You summarised numerical columns without letting NaN contaminate the result.",
  },

  {
    lessonKey: "m2-l4-numpy",
    anchorTitle: "Modern NumPy random generator",
    title: "Make a simulation reproducible",
    instructions: "Create `rng` with seed 2026 and draw five integer dice rolls from 1 through 6 into `rolls`.",
    starterCode: "import numpy as np\n\nrng = ...\nrolls = ...",
    packages: [
      "numpy",
    ],
    hint: "Use `np.random.default_rng(2026)` and remember the upper bound of `integers` is excluded.",
    solution: "import numpy as np\n\nrng = np.random.default_rng(\n    2026\n)\n\nrolls = rng.integers(\n    1,\n    7,\n    size=5,\n)",
    tests: [
      {
        name: "five rolls are generated",
        expression: "len(rolls) == 5",
      },
      {
        name: "rolls are within 1 to 6",
        expression: "bool(((rolls >= 1) & (rolls <= 6)).all())",
      },
      {
        name: "the seeded result is reproducible",
        expression: "np.array_equal(rolls, np.random.default_rng(2026).integers(1, 7, size=5))",
      },
    ],
    successMessage: "Your simulation is both valid and reproducible.",
  },

  {
    lessonKey: "m3-l1-pandas-foundations",
    anchorTitle: "Build a DataFrame",
    title: "Build a small DataFrame",
    instructions: "Create `df_small` with columns `region=['North','South']` and `revenue=[120,90]`.",
    starterCode: "import pandas as pd\n\ndf_small = ...",
    packages: [
      "pandas",
    ],
    hint: "Pass a dictionary of equal-length lists to `pd.DataFrame`.",
    solution: "import pandas as pd\n\ndf_small = pd.DataFrame({\n    \"region\": [\n        \"North\",\n        \"South\",\n    ],\n    \"revenue\": [\n        120,\n        90,\n    ],\n})",
    tests: [
      {
        name: "df_small is a DataFrame",
        expression: "isinstance(df_small, pd.DataFrame)",
      },
      {
        name: "columns are correct",
        expression: "list(df_small.columns) == [\"region\", \"revenue\"]",
      },
      {
        name: "revenue values are correct",
        expression: "df_small[\"revenue\"].tolist() == [120, 90]",
      },
    ],
    successMessage: "You created a labelled tabular object.",
  },

  {
    lessonKey: "m3-l2-pandas-foundations",
    anchorTitle: "Filter with multiple conditions",
    title: "Filter rows and columns",
    instructions: "Load `data/sales.csv` and create `subset` containing North-region rows with revenue at least 100; retain only `region` and `revenue`.",
    starterCode: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nsubset = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.loc[row_condition, ['region','revenue']]`.",
    solution: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nsubset = df.loc[\n    (\n        df[\"region\"]\n        == \"North\"\n    )\n    &\n    (\n        df[\"revenue\"]\n        >= 100\n    ),\n    [\n        \"region\",\n        \"revenue\",\n    ],\n]",
    tests: [
      {
        name: "only requested columns are kept",
        expression: "list(subset.columns) == [\"region\", \"revenue\"]",
      },
      {
        name: "every row is North",
        expression: "bool((subset[\"region\"] == \"North\").all())",
      },
      {
        name: "every revenue is at least 100",
        expression: "bool((subset[\"revenue\"] >= 100).all())",
      },
      {
        name: "the filter returns at least one row",
        expression: "len(subset) > 0",
      },
    ],
    successMessage: "You combined row conditions with explicit column selection.",
  },

  {
    lessonKey: "m3-l3-pandas-foundations",
    anchorTitle: "Vectorised derived column",
    title: "Create a vectorised profit column",
    instructions: "Load `data/sales.csv` and create `with_profit` with `profit = revenue - cost`.",
    starterCode: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nwith_profit = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.assign(profit=...)` or assign a new column directly.",
    solution: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nwith_profit = df.assign(\n    profit=\n        df[\"revenue\"]\n        - df[\"cost\"]\n)",
    tests: [
      {
        name: "profit column exists",
        expression: "\"profit\" in with_profit.columns",
      },
      {
        name: "profit equals revenue minus cost",
        expression: "bool(((with_profit[\"profit\"] - (with_profit[\"revenue\"] - with_profit[\"cost\"])).abs() < 1e-9).all())",
      },
    ],
    successMessage: "You created a derived variable using vectorised pandas operations.",
  },

  {
    lessonKey: "m3-l4-pandas-foundations",
    anchorTitle: "Read with selected columns",
    title: "Import selected columns with dates",
    instructions: "Read `data/orders.csv` into `orders_small`, keeping `order_id`, `date`, and `revenue`; parse `date` during import.",
    starterCode: "import pandas as pd\n\norders_small = pd.read_csv(\n    \"data/orders.csv\",\n    # add usecols and parse_dates\n)",
    packages: [
      "pandas",
    ],
    hint: "Use the `usecols` and `parse_dates` arguments.",
    solution: "import pandas as pd\n\norders_small = pd.read_csv(\n    \"data/orders.csv\",\n    usecols=[\n        \"order_id\",\n        \"date\",\n        \"revenue\",\n    ],\n    parse_dates=[\n        \"date\",\n    ],\n)",
    tests: [
      {
        name: "only three requested columns are loaded",
        expression: "set(orders_small.columns) == {\"order_id\", \"date\", \"revenue\"}",
      },
      {
        name: "date is datetime",
        expression: "pd.api.types.is_datetime64_any_dtype(orders_small[\"date\"])",
      },
    ],
    successMessage: "You controlled the import schema at the point data entered the analysis.",
  },

  {
    lessonKey: "m4-l1-data-cleaning",
    anchorTitle: "Audit missingness",
    title: "Audit missingness",
    instructions: "Load `data/dirty_orders.csv` and create `missing_pct`: percentage missing in each column, sorted descending.",
    starterCode: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nmissing_pct = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.isna().mean().mul(100).sort_values(ascending=False)`.",
    solution: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nmissing_pct = (\n    dirty\n    .isna()\n    .mean()\n    .mul(100)\n    .sort_values(\n        ascending=False\n    )\n)",
    tests: [
      {
        name: "one result per column",
        expression: "len(missing_pct) == dirty.shape[1]",
      },
      {
        name: "revenue missingness is detected",
        expression: "missing_pct[\"revenue\"] > 0",
      },
      {
        name: "values are sorted descending",
        expression: "missing_pct.is_monotonic_decreasing",
      },
    ],
    successMessage: "You quantified missingness before deciding how to handle it.",
  },

  {
    lessonKey: "m4-l2-data-cleaning",
    anchorTitle: "Standardise labels",
    title: "Standardise inconsistent region labels",
    instructions: "Load `data/dirty_orders.csv` and create `region_clean` by stripping whitespace and converting labels to title case.",
    starterCode: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nregion_clean = ...",
    packages: [
      "pandas",
    ],
    hint: "Chain `.astype('string').str.strip().str.title()`.",
    solution: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nregion_clean = (\n    dirty[\"region\"]\n    .astype(\"string\")\n    .str.strip()\n    .str.title()\n)",
    tests: [
      {
        name: "non-missing labels are standardised",
        expression: "set(region_clean.dropna()) == {\"North\", \"South\", \"West\"}",
      },
      {
        name: "no non-missing label starts with whitespace",
        expression: "bool((~region_clean.dropna().str.startswith(\" \")).all())",
      },
    ],
    successMessage: "Equivalent region labels now map to consistent categories.",
  },

  {
    lessonKey: "m4-l3-data-cleaning",
    anchorTitle: "Check identifier uniqueness",
    title: "Create quality flags",
    instructions: "Load `data/dirty_orders.csv` and create `quality` with Boolean columns `duplicate_order`, `revenue_invalid`, and `age_invalid`.",
    starterCode: "import pandas as pd\n\nquality = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\n# add three Boolean flags",
    packages: [
      "pandas",
    ],
    hint: "Use `.duplicated(keep=False)`, revenue `< 0`, and `~age.between(0,120)`.",
    solution: "import pandas as pd\n\nquality = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nquality[\n    \"duplicate_order\"\n] = (\n    quality[\"order_id\"]\n    .duplicated(\n        keep=False\n    )\n)\n\nquality[\n    \"revenue_invalid\"\n] = (\n    quality[\"revenue\"]\n    .notna()\n    &\n    quality[\"revenue\"]\n    .lt(0)\n)\n\nquality[\n    \"age_invalid\"\n] = ~quality[\n    \"age\"\n].between(\n    0,\n    120,\n)",
    tests: [
      {
        name: "duplicate flag exists",
        expression: "\"duplicate_order\" in quality.columns",
      },
      {
        name: "negative revenue flag exists",
        expression: "\"revenue_invalid\" in quality.columns",
      },
      {
        name: "age flag exists",
        expression: "\"age_invalid\" in quality.columns",
      },
      {
        name: "the demo data actually contains a duplicate",
        expression: "bool(quality[\"duplicate_order\"].any())",
      },
      {
        name: "the demo data actually contains invalid revenue",
        expression: "bool(quality[\"revenue_invalid\"].any())",
      },
      {
        name: "the demo data actually contains invalid age",
        expression: "bool(quality[\"age_invalid\"].any())",
      },
    ],
    successMessage: "You made data-quality problems explicit instead of silently deleting them.",
  },

  {
    lessonKey: "m4-l4-data-cleaning",
    anchorTitle: "Wide to long",
    title: "Reshape repeated scores to long form",
    instructions: "Load `data/dirty_orders.csv`, deduplicate by `id`, and create `long_scores` with columns `id`, `year`, and `score` from the 2024/2025 score columns.",
    starterCode: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nsource = dirty.drop_duplicates(\n    \"id\"\n)\n\nlong_scores = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.melt(...)` with `id_vars`, `value_vars`, `var_name`, and `value_name`.",
    solution: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nsource = dirty.drop_duplicates(\n    \"id\"\n)\n\nlong_scores = source.melt(\n    id_vars=[\n        \"id\",\n    ],\n    value_vars=[\n        \"score_2024\",\n        \"score_2025\",\n    ],\n    var_name=\"year\",\n    value_name=\"score\",\n)",
    tests: [
      {
        name: "long table has two rows per participant",
        expression: "len(long_scores) == 2 * source['id'].nunique()",
      },
      {
        name: "long-form columns are correct",
        expression: "list(long_scores.columns) == [\"id\", \"year\", \"score\"]",
      },
      {
        name: "both score years are represented",
        expression: "set(long_scores[\"year\"]) == {\"score_2024\", \"score_2025\"}",
      },
    ],
    successMessage: "You converted repeated measurements into tidy long form.",
  },

  {
    lessonKey: "m5-l1-grouping-combining",
    anchorTitle: "Named aggregation",
    title: "Build a grouped summary",
    instructions: "Load `data/sales.csv` and create `region_summary_live` with `n`, `mean_revenue`, and `total_revenue` for each region.",
    starterCode: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nregion_summary_live = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.groupby('region', as_index=False).agg(...)` with named aggregations.",
    solution: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nregion_summary_live = (\n    sales\n    .groupby(\n        \"region\",\n        as_index=False,\n    )\n    .agg(\n        n=(\n            \"revenue\",\n            \"size\",\n        ),\n        mean_revenue=(\n            \"revenue\",\n            \"mean\",\n        ),\n        total_revenue=(\n            \"revenue\",\n            \"sum\",\n        ),\n    )\n)",
    tests: [
      {
        name: "three regions are summarised",
        expression: "set(region_summary_live[\"region\"]) == {\"North\", \"South\", \"West\"}",
      },
      {
        name: "required summary columns exist",
        expression: "{\"n\", \"mean_revenue\", \"total_revenue\"}.issubset(region_summary_live.columns)",
      },
      {
        name: "group counts reconcile to 240",
        expression: "int(region_summary_live['n'].sum()) == len(sales) == 240",
      },
    ],
    successMessage: "Your grouped table reconciles with the source data.",
  },

  {
    lessonKey: "m5-l2-grouping-combining",
    anchorTitle: "Pivot table",
    title: "Create a pivot table",
    instructions: "Load `data/sales.csv` and create `revenue_pivot` showing mean revenue by region (rows) and channel (columns).",
    starterCode: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nrevenue_pivot = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `pd.pivot_table` with `index`, `columns`, `values`, and `aggfunc`.",
    solution: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nrevenue_pivot = pd.pivot_table(\n    sales,\n    index=\"region\",\n    columns=\"channel\",\n    values=\"revenue\",\n    aggfunc=\"mean\",\n)",
    tests: [
      {
        name: "region is the row dimension",
        expression: "revenue_pivot.index.name == \"region\"",
      },
      {
        name: "channel is the column dimension",
        expression: "revenue_pivot.columns.name == \"channel\"",
      },
      {
        name: "both channels are present",
        expression: "{\"Web\", \"Store\"}.issubset(set(revenue_pivot.columns))",
      },
    ],
    successMessage: "You created a two-dimensional numerical summary.",
  },

  {
    lessonKey: "m5-l3-grouping-combining",
    anchorTitle: "Validated left join",
    title: "Perform a validated merge",
    instructions: "Load orders and customers, then create `combined_live` using a left `many_to_one` merge on `customer_id` with `indicator=True`.",
    starterCode: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\ncombined_live = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.merge(..., how='left', validate='many_to_one', indicator=True)`.",
    solution: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\ncombined_live = orders.merge(\n    customers,\n    on=\"customer_id\",\n    how=\"left\",\n    validate=\"many_to_one\",\n    indicator=True,\n)",
    tests: [
      {
        name: "left row count is preserved",
        expression: "len(combined_live) == len(orders)",
      },
      {
        name: "customer information is attached",
        expression: "\"customer_segment\" in combined_live.columns",
      },
      {
        name: "merge indicator exists",
        expression: "\"_merge\" in combined_live.columns",
      },
      {
        name: "every demo order matched",
        expression: "set(combined_live[\"_merge\"].astype(str)) == {\"both\"}",
      },
    ],
    successMessage: "You encoded the intended key relationship and audited the join.",
  },

  {
    lessonKey: "m5-l4-grouping-combining",
    anchorTitle: "Within-group centring",
    title: "Centre revenue within region",
    instructions: "Load `data/sales.csv` and create `revenue_centred` equal to each revenue minus its own region mean.",
    starterCode: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nrevenue_centred = ...",
    packages: [
      "pandas",
      "numpy",
    ],
    hint: "Use `groupby('region')['revenue'].transform('mean')` so the means align back to rows.",
    solution: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nrevenue_centred = (\n    sales[\"revenue\"]\n    -\n    sales.groupby(\n        \"region\"\n    )[\"revenue\"]\n    .transform(\n        \"mean\"\n    )\n)",
    tests: [
      {
        name: "one centred value per row",
        expression: "len(revenue_centred) == len(sales)",
      },
      {
        name: "regional centred means are approximately zero",
        expression: "bool((sales.assign(revenue_centred=revenue_centred).groupby(\"region\")[\"revenue_centred\"].mean().abs() < 1e-10).all())",
      },
    ],
    successMessage: "You performed a within-group transformation without collapsing the table.",
  },

  {
    lessonKey: "m6-l1-eda-visualisation",
    anchorTitle: "Compact descriptive audit",
    title: "Create an EDA summary",
    instructions: "Load `data/sales.csv` and create `eda_summary` for age and revenue using count, mean, standard deviation, median, minimum, and maximum.",
    starterCode: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\neda_summary = ...",
    packages: [
      "pandas",
    ],
    hint: "Select the two columns and use `.agg([...])`.",
    solution: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\neda_summary = sales[\n    [\n        \"age\",\n        \"revenue\",\n    ]\n].agg([\n    \"count\",\n    \"mean\",\n    \"std\",\n    \"median\",\n    \"min\",\n    \"max\",\n])",
    tests: [
      {
        name: "both variables are summarised",
        expression: "list(eda_summary.columns) == [\"age\", \"revenue\"]",
      },
      {
        name: "all requested statistics are present",
        expression: "{\"count\", \"mean\", \"std\", \"median\", \"min\", \"max\"}.issubset(set(eda_summary.index))",
      },
      {
        name: "revenue count reflects the full sales table",
        expression: "int(eda_summary.loc[\"count\", \"revenue\"]) == 240",
      },
    ],
    successMessage: "You created a compact, auditable descriptive summary.",
  },

  {
    lessonKey: "m6-l2-eda-visualisation",
    anchorTitle: "A labelled histogram",
    title: "Build a meaningful histogram",
    instructions: "Load `data/sales.csv`, plot revenue as a 20-bin histogram, store the axes as `ax_live`, and label x=`Revenue (£)`, y=`Number of records`.",
    starterCode: "import pandas as pd\nimport matplotlib.pyplot as plt\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nax_live = ...\n\n# add axis labels\n\nplt.tight_layout()\nplt.show()",
    packages: [
      "pandas",
      "matplotlib",
    ],
    hint: "Use `sales['revenue'].plot.hist(bins=20, edgecolor='white')`, then `ax_live.set(...)`.",
    solution: "import pandas as pd\nimport matplotlib.pyplot as plt\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nax_live = (\n    sales[\"revenue\"]\n    .plot.hist(\n        bins=20,\n        edgecolor=\"white\",\n    )\n)\n\nax_live.set(\n    xlabel=\"Revenue (£)\",\n    ylabel=\"Number of records\",\n)\n\nplt.tight_layout()\nplt.show()",
    tests: [
      {
        name: "x-axis label is correct",
        expression: "ax_live.get_xlabel() == \"Revenue (£)\"",
      },
      {
        name: "y-axis label is correct",
        expression: "ax_live.get_ylabel() == \"Number of records\"",
      },
      {
        name: "histogram contains the 240 sales observations",
        expression: "abs(sum(patch.get_height() for patch in ax_live.patches) - 240) < 1e-9",
      },
    ],
    successMessage: "You produced a labelled histogram from enough observations to inspect a distribution.",
  },

  {
    lessonKey: "m6-l3-eda-visualisation",
    anchorTitle: "Correlation matrix for selected variables",
    title: "Inspect a correlation structure",
    instructions: "Load `data/sales.csv`, create `corr_live` for revenue, cost and ad_spend, then store the revenue–cost correlation in `revenue_cost_corr`.",
    starterCode: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nvariables = [\n    \"revenue\",\n    \"cost\",\n    \"ad_spend\",\n]\n\ncorr_live = ...\nrevenue_cost_corr = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `sales[variables].corr()` then `.loc['revenue','cost']`.",
    solution: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nvariables = [\n    \"revenue\",\n    \"cost\",\n    \"ad_spend\",\n]\n\ncorr_live = sales[\n    variables\n].corr()\n\nrevenue_cost_corr = corr_live.loc[\n    \"revenue\",\n    \"cost\",\n]",
    tests: [
      {
        name: "correlation matrix is 3 by 3",
        expression: "corr_live.shape == (3, 3)",
      },
      {
        name: "diagonal correlation is one",
        expression: "abs(corr_live.loc[\"cost\", \"cost\"] - 1.0) < 1e-12",
      },
      {
        name: "stored correlation matches the matrix",
        expression: "abs(revenue_cost_corr - corr_live.loc[\"revenue\", \"cost\"]) < 1e-12",
      },
    ],
    successMessage: "You quantified a relationship while retaining the full correlation structure.",
  },

  {
    lessonKey: "m6-l4-eda-visualisation",
    anchorTitle: "A simple pipeline outline",
    title: "Build a small EDA pipeline",
    instructions: "Load `data/raw_sales.csv`, standardise region labels, add margin, and create `clean_live` plus `summary_live` describing revenue, cost and margin.",
    starterCode: "import pandas as pd\n\nraw = pd.read_csv(\n    \"data/raw_sales.csv\"\n)\n\nclean_live = ...\n\nsummary_live = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.assign(...)` for cleaned region and margin, then select three columns and call `.describe()`.",
    solution: "import pandas as pd\n\nraw = pd.read_csv(\n    \"data/raw_sales.csv\"\n)\n\nclean_live = raw.assign(\n    region=\n        raw[\"region\"]\n        .astype(\"string\")\n        .str.strip()\n        .str.title(),\n    margin=\n        raw[\"revenue\"]\n        - raw[\"cost\"],\n)\n\nsummary_live = clean_live[\n    [\n        \"revenue\",\n        \"cost\",\n        \"margin\",\n    ]\n].describe()",
    tests: [
      {
        name: "margin exists",
        expression: "\"margin\" in clean_live.columns",
      },
      {
        name: "region labels are standardised",
        expression: "set(clean_live[\"region\"].dropna()) == {\"North\", \"South\", \"West\"}",
      },
      {
        name: "summary contains the three analytical variables",
        expression: "set(summary_live.columns) == {\"revenue\", \"cost\", \"margin\"}",
      },
    ],
    successMessage: "You combined cleaning, derivation and descriptive analysis in one readable pipeline.",
  },

  {
    lessonKey: "m7-l1-time-reproducibility",
    anchorTitle: "Parse and inspect dates",
    title: "Parse and order dates safely",
    instructions: "Load `data/sales.csv`, parse date with `errors='coerce'`, sort the rows, and store the result as `time_data`.",
    starterCode: "import pandas as pd\n\ntime_data = pd.read_csv(\n    \"data/sales.csv\"\n)\n\n# parse date and sort",
    packages: [
      "pandas",
    ],
    hint: "Use `pd.to_datetime(..., errors='coerce')` then `.sort_values('date')`.",
    solution: "import pandas as pd\n\ntime_data = pd.read_csv(\n    \"data/sales.csv\"\n)\n\ntime_data[\n    \"date\"\n] = pd.to_datetime(\n    time_data[\"date\"],\n    errors=\"coerce\",\n)\n\ntime_data = time_data.sort_values(\n    \"date\"\n)",
    tests: [
      {
        name: "date is a datetime dtype",
        expression: "pd.api.types.is_datetime64_any_dtype(time_data[\"date\"])",
      },
      {
        name: "dates are sorted",
        expression: "time_data['date'].is_monotonic_increasing",
      },
      {
        name: "all 240 records remain",
        expression: "len(time_data) == 240",
      },
    ],
    successMessage: "You created a correctly parsed and ordered time-aware table.",
  },

  {
    lessonKey: "m7-l2-time-reproducibility",
    anchorTitle: "Monthly totals",
    title: "Create monthly revenue totals",
    instructions: "Load `data/sales.csv`, parse date, and create `monthly_live`: month-start revenue totals.",
    starterCode: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\",\n    parse_dates=[\n        \"date\",\n    ],\n)\n\nmonthly_live = ...",
    packages: [
      "pandas",
    ],
    hint: "Set date as the index, select revenue, then `.resample('MS').sum()`.",
    solution: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\",\n    parse_dates=[\n        \"date\",\n    ],\n)\n\nmonthly_live = (\n    sales\n    .set_index(\n        \"date\"\n    )[\"revenue\"]\n    .resample(\n        \"MS\"\n    )\n    .sum()\n)",
    tests: [
      {
        name: "monthly result has a DatetimeIndex",
        expression: "isinstance(monthly_live.index, pd.DatetimeIndex)",
      },
      {
        name: "at least seven months are represented",
        expression: "len(monthly_live) >= 7",
      },
      {
        name: "monthly totals reconcile with the source total",
        expression: "abs(monthly_live.sum() - sales[\"revenue\"].sum()) < 1e-6",
      },
    ],
    successMessage: "You aggregated daily-dated records into a monthly time series.",
  },

  {
    lessonKey: "m7-l3-time-reproducibility",
    anchorTitle: "Composable cleaning functions",
    title: "Compose reusable transformations",
    instructions: "Load `data/raw_sales.csv`, write `clean_region(frame)` and `add_margin(frame)`, then create `pipeline_result` with `.pipe(...)`.",
    starterCode: "import pandas as pd\n\nraw = pd.read_csv(\n    \"data/raw_sales.csv\"\n)\n\ndef clean_region(frame):\n    # return cleaned frame\n    pass\n\ndef add_margin(frame):\n    # return frame with margin\n    pass\n\npipeline_result = ...",
    packages: [
      "pandas",
    ],
    hint: "Each function should return a DataFrame. Then chain `raw.pipe(clean_region).pipe(add_margin)`.",
    solution: "import pandas as pd\n\nraw = pd.read_csv(\n    \"data/raw_sales.csv\"\n)\n\ndef clean_region(frame):\n    return frame.assign(\n        region=\n            frame[\"region\"]\n            .astype(\"string\")\n            .str.strip()\n            .str.title()\n    )\n\ndef add_margin(frame):\n    return frame.assign(\n        margin=\n            frame[\"revenue\"]\n            - frame[\"cost\"]\n    )\n\npipeline_result = (\n    raw\n    .pipe(\n        clean_region\n    )\n    .pipe(\n        add_margin\n    )\n)",
    tests: [
      {
        name: "margin is created",
        expression: "\"margin\" in pipeline_result.columns",
      },
      {
        name: "regions are standardised",
        expression: "set(pipeline_result[\"region\"].dropna()) == {\"North\", \"South\", \"West\"}",
      },
      {
        name: "row count is preserved",
        expression: "len(pipeline_result) == len(raw)",
      },
    ],
    successMessage: "You built transformations that can be tested and composed independently.",
  },

  {
    lessonKey: "m7-l4-time-reproducibility",
    anchorTitle: "A small validation test",
    title: "Turn a data assumption into a test",
    instructions: "Write `assert_valid_revenue(frame)` that raises `AssertionError` when any non-missing revenue is negative and returns `True` otherwise.",
    starterCode: "import pandas as pd\n\ndef assert_valid_revenue(frame):\n    # add validation\n    pass\n\nvalid_example = pd.DataFrame({\n    \"revenue\": [\n        10.0,\n        None,\n        3.0,\n    ],\n})\n\ninvalid_example = pd.DataFrame({\n    \"revenue\": [\n        10.0,\n        -1.0,\n    ],\n})\n\nvalid_result = None\ninvalid_raised = False\n\ntry:\n    valid_result = assert_valid_revenue(\n        valid_example\n    )\nexcept Exception:\n    valid_result = None\n\ntry:\n    assert_valid_revenue(\n        invalid_example\n    )\nexcept AssertionError:\n    invalid_raised = True",
    packages: [
      "pandas",
    ],
    hint: "Create a Boolean validity Series, assert `.all()`, then return True.",
    solution: "import pandas as pd\n\ndef assert_valid_revenue(frame):\n    valid = (\n        frame[\"revenue\"]\n        .isna()\n        |\n        frame[\"revenue\"]\n        .ge(0)\n    )\n\n    assert valid.all(), (\n        \"Negative revenue found\"\n    )\n\n    return True\n\nvalid_example = pd.DataFrame({\n    \"revenue\": [\n        10.0,\n        None,\n        3.0,\n    ],\n})\n\ninvalid_example = pd.DataFrame({\n    \"revenue\": [\n        10.0,\n        -1.0,\n    ],\n})\n\nvalid_result = None\ninvalid_raised = False\n\ntry:\n    valid_result = assert_valid_revenue(\n        valid_example\n    )\nexcept Exception:\n    valid_result = None\n\ntry:\n    assert_valid_revenue(\n        invalid_example\n    )\nexcept AssertionError:\n    invalid_raised = True",
    tests: [
      {
        name: "valid data return True",
        expression: "valid_result is True",
      },
      {
        name: "negative revenue raises AssertionError",
        expression: "invalid_raised is True",
      },
    ],
    successMessage: "You expressed a data-quality assumption as executable validation.",
  },

  {
    lessonKey: "m8-l1-capstone",
    anchorTitle: "Initial audit",
    title: "Create a structural data audit",
    instructions: "Load `data/orders.csv` and create `audit_live` with rows, columns, duplicate_orders, and missing_revenue.",
    starterCode: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\naudit_live = {\n    # add four fields\n}",
    packages: [
      "pandas",
    ],
    hint: "Use `len`, `.shape[1]`, `.duplicated().sum()`, and `.isna().sum()`.",
    solution: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\naudit_live = {\n    \"rows\":\n        len(orders),\n    \"columns\":\n        orders.shape[1],\n    \"duplicate_orders\":\n        int(\n            orders[\n                \"order_id\"\n            ]\n            .duplicated()\n            .sum()\n        ),\n    \"missing_revenue\":\n        int(\n            orders[\n                \"revenue\"\n            ]\n            .isna()\n            .sum()\n        ),\n}",
    tests: [
      {
        name: "all four audit fields exist",
        expression: "set(audit_live) == {\"rows\", \"columns\", \"duplicate_orders\", \"missing_revenue\"}",
      },
      {
        name: "row count is 180",
        expression: "audit_live[\"rows\"] == 180",
      },
      {
        name: "order IDs are unique in the capstone data",
        expression: "audit_live[\"duplicate_orders\"] == 0",
      },
      {
        name: "missing revenue is detected",
        expression: "audit_live[\"missing_revenue\"] == 4",
      },
    ],
    successMessage: "You audited structure and quality before substantive analysis.",
  },

  {
    lessonKey: "m8-l2-capstone",
    anchorTitle: "Validated analysis table",
    title: "Build a validated analysis table",
    instructions: "Load orders and customers, perform a validated many-to-one left merge, standardise region, and add `margin`; store the result as `analysis_live`.",
    starterCode: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\nanalysis_live = ...",
    packages: [
      "pandas",
    ],
    hint: "Use `.assign(...)`, `.merge(..., validate='many_to_one')`, then another `.assign(margin=...)`.",
    solution: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\nanalysis_live = (\n    orders\n    .assign(\n        region=lambda x:\n            x[\"region\"]\n            .astype(\"string\")\n            .str.strip()\n            .str.title()\n    )\n    .merge(\n        customers,\n        on=\"customer_id\",\n        how=\"left\",\n        validate=\"many_to_one\",\n    )\n    .assign(\n        margin=lambda x:\n            x[\"revenue\"]\n            - x[\"cost\"]\n    )\n)",
    tests: [
      {
        name: "left row count is preserved",
        expression: "len(analysis_live) == len(orders) == 180",
      },
      {
        name: "customer segment is attached",
        expression: "\"customer_segment\" in analysis_live.columns",
      },
      {
        name: "margin is created",
        expression: "\"margin\" in analysis_live.columns",
      },
      {
        name: "regions are standardised",
        expression: "set(analysis_live[\"region\"]) == {\"North\", \"South\", \"West\"}",
      },
    ],
    successMessage: "You built an analysis-ready table while preserving key assumptions.",
  },

  {
    lessonKey: "m8-l3-capstone",
    anchorTitle: "Region summary",
    title: "Create a decision-ready regional summary",
    instructions: "Load orders, create margin, and build `decision_summary` with orders, revenue and margin by region.",
    starterCode: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\norders = orders.assign(\n    margin=\n        orders[\"revenue\"]\n        - orders[\"cost\"]\n)\n\ndecision_summary = ...",
    packages: [
      "pandas",
    ],
    hint: "Group by region and use named aggregations.",
    solution: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\norders = orders.assign(\n    margin=\n        orders[\"revenue\"]\n        - orders[\"cost\"]\n)\n\ndecision_summary = (\n    orders\n    .groupby(\n        \"region\",\n        as_index=False,\n    )\n    .agg(\n        orders=(\n            \"order_id\",\n            \"size\",\n        ),\n        revenue=(\n            \"revenue\",\n            \"sum\",\n        ),\n        margin=(\n            \"margin\",\n            \"sum\",\n        ),\n    )\n)",
    tests: [
      {
        name: "one row per region",
        expression: "set(decision_summary[\"region\"]) == {\"North\", \"South\", \"West\"}",
      },
      {
        name: "required metrics exist",
        expression: "{\"orders\", \"revenue\", \"margin\"}.issubset(decision_summary.columns)",
      },
      {
        name: "order counts reconcile to 180",
        expression: "int(decision_summary['orders'].sum()) == len(orders) == 180",
      },
    ],
    successMessage: "You produced a compact summary whose counts reconcile with the analysis table.",
  },

  {
    lessonKey: "m8-l4-capstone",
    anchorTitle: "Save derived outputs",
    title: "Save a reproducible output",
    instructions: "Load orders, create a regional revenue/margin summary, save it to `outputs/region_summary_live.csv`, and store the Path in `saved_path`.",
    starterCode: "from pathlib import Path\nimport pandas as pd\n\nOUTPUT = Path(\n    \"outputs\"\n)\n\nOUTPUT.mkdir(\n    parents=True,\n    exist_ok=True,\n)\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\n# create region_summary_live\n\nsaved_path = ...",
    packages: [
      "pandas",
    ],
    hint: "Create margin, group by region, then call `.to_csv(saved_path, index=False)`.",
    solution: "from pathlib import Path\nimport pandas as pd\n\nOUTPUT = Path(\n    \"outputs\"\n)\n\nOUTPUT.mkdir(\n    parents=True,\n    exist_ok=True,\n)\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\norders = orders.assign(\n    margin=\n        orders[\"revenue\"]\n        - orders[\"cost\"]\n)\n\nregion_summary_live = (\n    orders\n    .groupby(\n        \"region\",\n        as_index=False,\n    )\n    .agg(\n        revenue=(\n            \"revenue\",\n            \"sum\",\n        ),\n        margin=(\n            \"margin\",\n            \"sum\",\n        ),\n    )\n)\n\nsaved_path = (\n    OUTPUT\n    / \"region_summary_live.csv\"\n)\n\nregion_summary_live.to_csv(\n    saved_path,\n    index=False,\n)",
    tests: [
      {
        name: "saved_path is correct",
        expression: "saved_path.as_posix() == \"outputs/region_summary_live.csv\"",
      },
      {
        name: "output file exists",
        expression: "saved_path.exists()",
      },
      {
        name: "saved table has one row per region",
        expression: "len(pd.read_csv(saved_path)) == 3",
      },
    ],
    successMessage: "You generated and verified a reproducible analysis artefact.",
  },

];


const challengeMap =
  new Map(
    pythonForDataAnalysisChallenges
      .map(
        (
          challenge
        ) => [
          challenge.lessonKey,
          challenge,
        ] as const
      )
  );


export function getPythonLessonChallenge(
  lessonKey:
    string
) {
  return challengeMap.get(
    lessonKey
  );
}
