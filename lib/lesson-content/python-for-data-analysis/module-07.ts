import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 07 — TIME SERIES AND REPRODUCIBLE WORKFLOWS
   ========================================================================== */

export const pythonDataAnalysisModule07:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m7-l1-time-reproducibility",
    title: "Dates, times and time indexes",
    subtitle: "Time-aware analysis begins with correctly parsed dates and an explicit temporal index.",
    estimatedMinutes: 36,
    objectives: [
      "Parse date columns safely.",
      "Use datetime accessors for calendar features.",
      "Set and use a DatetimeIndex.",
      "Recognise timezone and ordering issues.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Dates stored as strings cannot support reliable time arithmetic. Convert them explicitly, inspect failed parses and sort observations before calculating time-based summaries.",
      },
      {
        type: "code-example",
        title: "Parse and inspect dates",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\ndf[\n    \"date\"\n] = pd.to_datetime(\n    df[\"date\"],\n    errors=\"coerce\",\n)\n\nprint(\n    \"Unparsed dates:\",\n    df[\"date\"]\n    .isna()\n    .sum(),\n)\n\ndf = df.sort_values(\n    \"date\"\n)\n\nprint(\n    df[\n        [\n            \"date\",\n            \"revenue\",\n        ]\n    ]\n    .head()\n)",
      },
      {
        type: "heading",
        text: "Calendar features",
      },
      {
        type: "code-example",
        title: "Extract month and weekday",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\",\n    parse_dates=[\n        \"date\",\n    ],\n)\n\ndf = df.assign(\n    month=\n        df[\"date\"]\n        .dt.month,\n    weekday=\n        df[\"date\"]\n        .dt.day_name(),\n)\n\nprint(\n    df[\n        [\n            \"date\",\n            \"month\",\n            \"weekday\",\n        ]\n    ]\n    .head()\n)",
      },
      {
        type: "callout",
        title: "Time is more than a label",
        text: "Time order changes the meaning of differences, rolling windows and train/test splits. Always confirm ordering before temporal analysis.",
      },
      {
        type: "python-data-lab",
        labKey: "time",
        title: "Time Series Lab",
        description: "Change the resampling frequency and rolling window to see how time aggregation alters the signal.",
      },
    ],
    workedExamples: [
      {
        title: "Monthly sales data",
        question: "A CSV has one row per transaction and a date string.",
        steps: [
          "Parse the date column.",
          "Inspect unparseable values.",
          "Sort by date.",
          "Optionally set date as the index when using time-series methods.",
        ],
        answer: "The table is now ready for resampling and rolling summaries.",
      },
    ],
    exercises: [
      {
        question: "Why use pd.to_datetime?",
        answer: "It converts date-like values into a time-aware dtype that supports temporal operations.",
      },
      {
        question: "Why sort by date before calculating changes?",
        answer: "Differences and rolling operations depend on observation order.",
      },
      {
        question: "What does .dt.month return?",
        answer: "The calendar month number for each datetime value.",
      },
    ],
    quiz: [
      {
        question: "Which function parses a date-like Series?",
        options: [
          "pd.to_datetime",
          "pd.merge",
          "np.std",
          "Path",
        ],
        correctIndex: 0,
        explanation: "to_datetime parses dates and times.",
      },
      {
        question: "Why can errors='coerce' be useful?",
        options: [
          "It exposes invalid date strings as missing values",
          "It sorts data",
          "It creates joins",
          "It removes time zones",
        ],
        correctIndex: 0,
        explanation: "Failed parses become NaT for inspection.",
      },
      {
        question: "Before a time-based difference, rows should usually be...",
        options: [
          "Randomly shuffled",
          "Sorted chronologically",
          "Converted to sets",
          "Grouped by file name",
        ],
        correctIndex: 1,
        explanation: "Temporal calculations depend on order.",
      },
    ],
    summary: [
      "Datetime parsing enables real temporal operations.",
      "Failed parses should be inspected.",
      "Calendar features come from the .dt accessor.",
      "Chronological order is part of the data structure.",
    ],
    nextStep: "Next, we resample and smooth time series using frequency-aware operations.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m7-l2-time-reproducibility",
    title: "Resampling and rolling summaries",
    subtitle: "Time aggregation and moving windows answer different questions about temporal data.",
    estimatedMinutes: 38,
    objectives: [
      "Resample observations to a new frequency.",
      "Compute rolling statistics.",
      "Distinguish calendar aggregation from moving windows.",
      "Avoid leakage from future observations.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Resampling groups observations into calendar periods such as days or months. Rolling operations calculate statistics over moving windows. Both are useful, but they answer different questions.",
      },
      {
        type: "code-example",
        title: "Monthly totals",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\",\n    parse_dates=[\n        \"date\",\n    ],\n)\n\nmonthly = (\n    df\n    .set_index(\n        \"date\"\n    )[\n        \"revenue\"\n    ]\n    .resample(\n        \"MS\"\n    )\n    .sum()\n)\n\nprint(\n    monthly.round(2)\n)",
      },
      {
        type: "code-example",
        title: "Seven-day rolling mean",
        code: "import pandas as pd\n\ndaily = pd.read_csv(\n    \"data/daily.csv\",\n    parse_dates=[\n        \"date\",\n    ],\n)\n\ndaily[\n    \"rolling_7d\"\n] = (\n    daily[\"value\"]\n    .rolling(\n        window=7,\n        min_periods=1,\n    )\n    .mean()\n)\n\nprint(\n    daily.head(10)\n)",
      },
      {
        type: "heading",
        text: "Look-ahead leakage",
      },
      {
        type: "paragraph",
        text: "A feature used to predict the future should not accidentally include future values. Centred rolling windows or full-period summaries can leak information across the prediction boundary.",
      },
      {
        type: "callout",
        title: "Temporal validation",
        text: "Whenever the analysis has a predictive or forecasting interpretation, ask whether each feature would have been available at the time of prediction.",
      },
    ],
    workedExamples: [
      {
        title: "Daily to monthly revenue",
        question: "You have transaction dates and revenue.",
        steps: [
          "Set a datetime index.",
          "Choose a monthly frequency.",
          "Use sum for total revenue or mean for average transaction size, depending on the question.",
          "Label the resulting unit clearly.",
        ],
        answer: "Resampling changes the unit from transactions or days to calendar months.",
      },
    ],
    exercises: [
      {
        question: "How does resample differ from rolling?",
        answer: "Resample aggregates into calendar-based periods; rolling uses moving local windows.",
      },
      {
        question: "What is look-ahead leakage?",
        answer: "Using future information in a feature or analysis that is supposed to represent a past-time decision.",
      },
      {
        question: "What does min_periods control?",
        answer: "The minimum number of observations required before a rolling statistic is returned.",
      },
    ],
    quiz: [
      {
        question: "Which method is designed for calendar-frequency aggregation?",
        options: [
          "resample",
          "merge",
          "melt",
          "astype",
        ],
        correctIndex: 0,
        explanation: "resample groups datetime-indexed data by frequency.",
      },
      {
        question: "A rolling mean uses...",
        options: [
          "A moving window",
          "Only the first row",
          "A join key",
          "A category code",
        ],
        correctIndex: 0,
        explanation: "Rolling statistics move through neighbouring observations.",
      },
      {
        question: "Why avoid future information in predictive features?",
        options: [
          "It causes leakage and unrealistic performance",
          "It slows plotting only",
          "It changes file paths",
          "It always creates missing values",
        ],
        correctIndex: 0,
        explanation: "Leakage violates the intended time ordering of prediction.",
      },
    ],
    summary: [
      "Resampling changes calendar frequency.",
      "Rolling summaries use moving windows.",
      "Aggregation functions should match the question.",
      "Temporal analyses must guard against look-ahead leakage.",
    ],
    nextStep: "Next, we structure transformations into reusable analysis pipelines.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m7-l3-time-reproducibility",
    title: "Reusable analysis pipelines",
    subtitle: "A reproducible analysis separates configuration, transformations, validation and outputs.",
    estimatedMinutes: 38,
    objectives: [
      "Break analysis into reusable functions.",
      "Use pipe to compose transformations.",
      "Separate configuration from logic.",
      "Save outputs with clear provenance.",
    ],
    content: [
      {
        type: "paragraph",
        text: "As analyses grow, notebooks should become thinner while reusable functions become richer. This makes the work easier to test, review and rerun on new data.",
      },
      {
        type: "code-example",
        title: "Composable cleaning functions",
        code: "import pandas as pd\n\nraw = pd.read_csv(\n    \"data/raw_sales.csv\"\n)\n\ndef clean_region(frame):\n    return frame.assign(\n        region=\n            frame[\"region\"]\n            .astype(\"string\")\n            .str.strip()\n            .str.title()\n    )\n\ndef add_margin(frame):\n    return frame.assign(\n        margin=\n            frame[\"revenue\"]\n            - frame[\"cost\"]\n    )\n\nclean = (\n    raw\n    .pipe(\n        clean_region\n    )\n    .pipe(\n        add_margin\n    )\n)\n\nprint(\n    clean[\n        [\n            \"region\",\n            \"revenue\",\n            \"margin\",\n        ]\n    ]\n    .head()\n)",
      },
      {
        type: "heading",
        text: "Separate configuration",
      },
      {
        type: "paragraph",
        text: "File paths, thresholds, category mappings and analysis dates should be visible configuration rather than scattered literals.",
      },
      {
        type: "code-example",
        title: "A configuration dictionary",
        code: "CONFIG = {\n    \"high_value_threshold\":\n        200,\n    \"analysis_date\":\n        \"2026-08-14\",\n    \"rolling_window\":\n        7,\n}\n\nprint(CONFIG)",
      },
      {
        type: "callout",
        title: "Reproducibility includes environment",
        text: "Record package versions and the commands required to run the analysis, not only the Python source code.",
      },
    ],
    workedExamples: [
      {
        title: "Rerun on next month's data",
        question: "A notebook contains 20 manual cleaning cells.",
        steps: [
          "Move each coherent transformation into a function.",
          "Compose functions in a pipeline.",
          "Keep input/output paths in configuration.",
          "Run the same pipeline on the new file.",
          "Validate row counts and assumptions again.",
        ],
        answer: "The analysis is repeatable without manually replaying ad hoc notebook edits.",
      },
    ],
    exercises: [
      {
        question: "Why keep configuration separate from logic?",
        answer: "It makes assumptions and parameters visible and easier to change without rewriting functions.",
      },
      {
        question: "What is a benefit of DataFrame.pipe?",
        answer: "It expresses ordered transformations as a readable pipeline.",
      },
      {
        question: "What else besides code should be captured for reproducibility?",
        answer: "Dependencies/package versions, inputs, parameters and execution instructions.",
      },
    ],
    quiz: [
      {
        question: "A reusable cleaning step should usually be implemented as...",
        options: [
          "A function",
          "A screenshot",
          "A raw-file overwrite",
          "A hidden notebook state",
        ],
        correctIndex: 0,
        explanation: "Functions centralise and test transformation logic.",
      },
      {
        question: "Configuration is a good place for...",
        options: [
          "Thresholds and paths",
          "Every intermediate DataFrame",
          "Random copied code",
          "Unrelated comments only",
        ],
        correctIndex: 0,
        explanation: "Configuration stores parameters that control execution.",
      },
      {
        question: "Reproducibility requires...",
        options: [
          "Only the final chart",
          "Code plus inputs, parameters and environment information",
          "No documentation",
          "Manual cell execution order",
        ],
        correctIndex: 1,
        explanation: "A rerun needs more than source code alone.",
      },
    ],
    summary: [
      "Reusable functions make analyses maintainable.",
      "pipe supports explicit transformation sequences.",
      "Configuration should be separated from implementation logic.",
      "Reproducibility includes dependencies and execution instructions.",
    ],
    nextStep: "Next, we learn how to debug, test and improve analytical code without guessing.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m7-l4-time-reproducibility",
    title: "Debugging, testing and performance",
    subtitle: "Reliable analysis code is checked systematically rather than trusted because it ran once.",
    estimatedMinutes: 38,
    objectives: [
      "Debug using small reproducible examples.",
      "Write simple assertions and tests.",
      "Profile before optimising performance.",
      "Recognise common pandas performance anti-patterns.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Debugging begins by reducing uncertainty: identify the smallest failing input, inspect intermediate objects and test assumptions one at a time.",
      },
      {
        type: "code-example",
        title: "A small validation test",
        code: "import pandas as pd\n\ndef clean_region(frame):\n    return frame.assign(\n        region=\n            frame[\"region\"]\n            .astype(\"string\")\n            .str.strip()\n            .str.title()\n    )\n\nresult = clean_region(\n    pd.DataFrame({\n        \"region\": [\n            \" north \",\n        ],\n    })\n)\n\nassert (\n    result.loc[\n        0,\n        \"region\",\n    ]\n    == \"North\"\n)\n\nprint(\n    \"Validation test passed.\"\n)",
      },
      {
        type: "heading",
        text: "Test analytical invariants",
      },
      {
        type: "bullets",
        items: [
          "Identifiers expected to be unique remain unique.",
          "Row counts change only when intended.",
          "Totals before and after a reshape reconcile.",
          "Joins do not unexpectedly multiply records.",
          "Derived variables stay within valid ranges.",
        ],
      },
      {
        type: "heading",
        text: "Performance comes after correctness",
      },
      {
        type: "paragraph",
        text: "Use vectorisation and efficient pandas methods, but profile the real bottleneck before rewriting code for speed.",
      },
      {
        type: "callout",
        title: "Optimisation rule",
        text: "Correct, clear code is the baseline. Faster wrong code is not an improvement.",
      },
    ],
    workedExamples: [
      {
        title: "Slow row-wise apply",
        question: "A calculation uses df.apply(..., axis=1) on one million rows.",
        steps: [
          "Confirm the output is correct on a small sample.",
          "Ask whether the logic can be expressed with vectorised Series operations.",
          "Benchmark the alternatives.",
          "Keep the clearest correct approach that meets performance needs.",
        ],
        answer: "Vectorised expressions often improve both clarity and speed, but optimisation should be measured.",
      },
    ],
    exercises: [
      {
        question: "What is a minimal reproducible example?",
        answer: "The smallest input and code that still demonstrates the bug.",
      },
      {
        question: "Why test row counts after a merge?",
        answer: "Unexpected changes can reveal unmatched or multiplied records.",
      },
      {
        question: "When should performance optimisation begin?",
        answer: "After correctness, using profiling or measurement to identify a real bottleneck.",
      },
    ],
    quiz: [
      {
        question: "The best first debugging step is often to...",
        options: [
          "Add random code",
          "Reduce the problem to a small failing example",
          "Delete tests",
          "Optimise immediately",
        ],
        correctIndex: 1,
        explanation: "A small example isolates the issue.",
      },
      {
        question: "Which is a useful analytical invariant?",
        options: [
          "A supposedly unique ID remains unique",
          "Every chart has five colours",
          "The notebook is long",
          "All variables are strings",
        ],
        correctIndex: 0,
        explanation: "Invariants encode important data assumptions.",
      },
      {
        question: "Performance work should be guided by...",
        options: [
          "Guessing",
          "Profiling and measurement",
          "File names",
          "Plot titles",
        ],
        correctIndex: 1,
        explanation: "Measure the actual bottleneck before optimising.",
      },
    ],
    summary: [
      "Debugging should reduce the problem systematically.",
      "Tests can encode analytical invariants.",
      "Vectorised operations often improve performance.",
      "Correctness and clarity come before optimisation.",
    ],
    nextStep: "Module 8 brings the whole course together in a realistic capstone analysis.",
  },
];
