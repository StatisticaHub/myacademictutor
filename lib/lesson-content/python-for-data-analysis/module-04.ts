import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 04 — CLEANING AND RESHAPING DATA
   ========================================================================== */

export const pythonDataAnalysisModule04:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m4-l1-data-cleaning",
    title: "Missing data in practice",
    subtitle: "Missing values are an analytical feature of a dataset, not just blank cells to remove.",
    estimatedMinutes: 36,
    objectives: [
      "Measure missingness by variable and record.",
      "Distinguish structural, accidental and unknown missingness.",
      "Use dropna and fillna deliberately.",
      "Document missing-data decisions.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Missingness can arise because a question was not applicable, a measurement failed, a record was lost or a value was deliberately suppressed. Those mechanisms are analytically different.",
      },
      {
        type: "code-example",
        title: "Audit missingness",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nmissing = (\n    dirty\n    .isna()\n    .mean()\n    .mul(100)\n    .sort_values(\n        ascending=False\n    )\n)\n\nprint(\n    missing.round(1)\n)",
      },
      {
        type: "python-data-lab",
        labKey: "missing",
        title: "Missing Data Lab",
        description: "Compare complete-case deletion, simple filling and explicit missing-category handling on a small synthetic dataset.",
      },
      {
        type: "heading",
        text: "Do not default to dropna",
      },
      {
        type: "paragraph",
        text: "Dropping every row containing any missing value can remove a large and systematically different subset of the data.",
      },
      {
        type: "code-example",
        title: "Targeted completeness",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nanalysis = dirty.dropna(\n    subset=[\n        \"outcome\",\n        \"exposure\",\n    ]\n)\n\nprint(\n    \"Rows before:\",\n    len(dirty),\n)\n\nprint(\n    \"Rows after:\",\n    len(analysis),\n)",
      },
      {
        type: "callout",
        title: "Document the rule",
        text: "State which variables define complete cases and why. Missing-data handling should be reproducible and reviewable.",
      },
    ],
    workedExamples: [
      {
        title: "Required-variable analysis",
        question: "Your outcome and exposure are essential, but optional notes are often missing.",
        steps: [
          "Do not drop rows because notes are missing.",
          "Define complete cases using only the variables required for the analysis.",
          "Report how many rows are removed.",
          "Compare included and excluded records if relevant.",
        ],
        answer: "dropna(subset=['outcome','exposure']) encodes the intended completeness rule.",
      },
    ],
    exercises: [
      {
        question: "Why is df.dropna() often too aggressive?",
        answer: "It removes rows missing any column, including irrelevant optional variables.",
      },
      {
        question: "What does df.isna().mean() provide?",
        answer: "The proportion missing in each column.",
      },
      {
        question: "Why report row counts before and after missing-data filtering?",
        answer: "It makes the impact of the decision transparent.",
      },
    ],
    quiz: [
      {
        question: "Which expression estimates missing proportion by column?",
        options: [
          "df.isna().mean()",
          "df.mean().isna()",
          "df.shape only",
          "df.sort_values()",
        ],
        correctIndex: 0,
        explanation: "Boolean missing indicators average to proportions.",
      },
      {
        question: "Complete-case deletion should usually be defined using...",
        options: [
          "All columns automatically",
          "Variables required for the analysis",
          "Only text columns",
          "The index",
        ],
        correctIndex: 1,
        explanation: "Completeness should match the analytical variables.",
      },
      {
        question: "Missing values should be treated as...",
        options: [
          "Always random",
          "A data property requiring interpretation",
          "Always zero",
          "Only a formatting issue",
        ],
        correctIndex: 1,
        explanation: "The reason for missingness can affect conclusions.",
      },
    ],
    summary: [
      "Missingness should be measured and interpreted.",
      "Blank values can arise for different reasons.",
      "Complete-case rules should target relevant variables.",
      "Every missing-data decision should be documented.",
    ],
    nextStep: "Next, we standardise text and categorical variables so equivalent labels are actually equivalent.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m4-l2-data-cleaning",
    title: "Strings, categories and labels",
    subtitle: "Small text inconsistencies can fragment groups and invalidate summaries.",
    estimatedMinutes: 34,
    objectives: [
      "Clean whitespace and case consistently.",
      "Use pandas string methods safely.",
      "Convert stable categories to categorical dtype.",
      "Validate category sets against expected values.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Values such as 'North', ' north ', and 'NORTH' may represent the same category but appear as separate groups. Text cleaning should be systematic rather than manual.",
      },
      {
        type: "code-example",
        title: "Standardise labels",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nregion_clean = (\n    dirty[\"region\"]\n    .astype(\"string\")\n    .str.strip()\n    .str.title()\n)\n\nprint(\n    region_clean.value_counts(\n        dropna=False\n    )\n)",
      },
      {
        type: "heading",
        text: "Categories as schema",
      },
      {
        type: "code-example",
        title: "Explicit category set",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nallowed = [\n    \"North\",\n    \"South\",\n    \"East\",\n    \"West\",\n]\n\nregion_clean = (\n    dirty[\"region\"]\n    .astype(\"string\")\n    .str.strip()\n    .str.title()\n)\n\nregion_category = pd.Categorical(\n    region_clean,\n    categories=allowed,\n)\n\nprint(\n    pd.Series(\n        region_category\n    )\n    .value_counts(\n        dropna=False\n    )\n)",
      },
      {
        type: "callout",
        title: "Never silently invent mappings",
        text: "If 'N', 'North Region' and 'North' appear, document why they are equivalent before recoding them.",
      },
      {
        type: "heading",
        text: "Validate unexpected values",
      },
      {
        type: "paragraph",
        text: "Compare observed values with an allowed set. Unexpected labels should be investigated rather than automatically forced into the nearest category.",
      },
    ],
    workedExamples: [
      {
        title: "Clean department labels",
        question: "You see 'Sales', ' sales', and 'SALES'.",
        steps: [
          "Strip leading/trailing spaces.",
          "Normalise case.",
          "Check unique values after cleaning.",
          "Confirm no genuinely different labels were merged.",
        ],
        answer: "A consistent transformation reduces three textual variants to one category while preserving a documented rule.",
      },
    ],
    exercises: [
      {
        question: "What does str.strip() remove?",
        answer: "Leading and trailing whitespace.",
      },
      {
        question: "Why inspect unique values after text cleaning?",
        answer: "To verify expected consolidation and discover unexpected categories.",
      },
      {
        question: "When is categorical dtype useful?",
        answer: "When a column represents a stable finite set of categories rather than arbitrary text.",
      },
    ],
    quiz: [
      {
        question: "Which pandas accessor exposes vectorised string methods?",
        options: [
          ".str",
          ".num",
          ".txt",
          ".cat only",
        ],
        correctIndex: 0,
        explanation: "Series.str provides string operations.",
      },
      {
        question: "Why can inconsistent case affect groupby?",
        options: [
          "Equivalent labels become separate groups",
          "It changes numeric values",
          "It deletes rows",
          "It alters file paths only",
        ],
        correctIndex: 0,
        explanation: "Grouping uses exact values.",
      },
      {
        question: "Unexpected category labels should usually be...",
        options: [
          "Silently replaced",
          "Investigated and documented",
          "Converted to zero",
          "Dropped without review",
        ],
        correctIndex: 1,
        explanation: "Unexpected values may signal data-quality or coding issues.",
      },
    ],
    summary: [
      "Text normalisation prevents accidental category fragmentation.",
      "String transformations should be systematic.",
      "Categorical dtype can encode a stable category domain.",
      "Unexpected labels should trigger validation, not silent correction.",
    ],
    nextStep: "Next, we detect duplicates, implausible values and broken assumptions.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m4-l3-data-cleaning",
    title: "Duplicates, outliers and validation",
    subtitle: "Cleaning is not about making data look tidy; it is about enforcing defensible rules.",
    estimatedMinutes: 36,
    objectives: [
      "Identify exact and key-based duplicates.",
      "Separate unusual values from impossible values.",
      "Write validation checks for ranges and uniqueness.",
      "Avoid automatic outlier deletion.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Duplicate rows can be genuine repeated measurements or accidental copies. Extreme values can be true observations or data errors. Cleaning requires domain-aware rules.",
      },
      {
        type: "code-example",
        title: "Check identifier uniqueness",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nduplicate_ids = (\n    dirty[\"order_id\"]\n    .duplicated(\n        keep=False\n    )\n)\n\nprint(\n    dirty.loc[\n        duplicate_ids,\n        [\n            \"order_id\",\n            \"region\",\n            \"revenue\",\n        ],\n    ]\n)",
      },
      {
        type: "heading",
        text: "Impossible versus unusual",
      },
      {
        type: "bullets",
        items: [
          "Impossible: age=-4 when age cannot be negative.",
          "Implausible: age=140 may require verification.",
          "Unusual but possible: a very large transaction may be genuine.",
        ],
      },
      {
        type: "python-data-lab",
        labKey: "quality",
        title: "Data Quality Lab",
        description: "Toggle validation rules and see which records are flagged as duplicate, missing, impossible or merely unusual.",
      },
      {
        type: "code-example",
        title: "Executable validation",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nvalidated = (\n    dirty\n    .drop_duplicates(\n        subset=\"order_id\",\n        keep=\"first\",\n    )\n    .dropna(\n        subset=[\n            \"order_id\",\n        ]\n    )\n    .loc[\n        lambda x:\n            x[\"age\"]\n            .between(\n                0,\n                120,\n            )\n    ]\n    .loc[\n        lambda x:\n            x[\"revenue\"]\n            .isna()\n            |\n            x[\"revenue\"]\n            .ge(0)\n    ]\n)\n\nassert validated[\n    \"order_id\"\n].notna().all()\n\nassert validated[\n    \"order_id\"\n].is_unique\n\nassert validated[\n    \"age\"\n].between(\n    0,\n    120,\n).all()\n\nprint(\n    \"Validation checks passed.\"\n)",
      },
      {
        type: "callout",
        title: "Outlier rule",
        text: "Do not delete a record merely because it is statistically extreme. First determine whether it is erroneous, influential, or genuinely informative.",
      },
    ],
    workedExamples: [
      {
        title: "Duplicate customer IDs",
        question: "Two rows share the same customer_id.",
        steps: [
          "Inspect all columns for both records.",
          "Determine whether customer_id should uniquely identify a person or an observation.",
          "If repeated visits are valid, introduce a visit-level key.",
          "If duplication is accidental, document the removal rule.",
        ],
        answer: "The correct action depends on the intended unit represented by the identifier.",
      },
    ],
    exercises: [
      {
        question: "What does duplicated(keep=False) do?",
        answer: "Marks all members of duplicate groups, not only later copies.",
      },
      {
        question: "Why distinguish impossible from unusual values?",
        answer: "Impossible values violate known rules; unusual values may be genuine and informative.",
      },
      {
        question: "What does Series.is_unique check?",
        answer: "Whether all values in the Series are unique.",
      },
    ],
    quiz: [
      {
        question: "A statistically extreme observation should be...",
        options: [
          "Deleted automatically",
          "Investigated before action",
          "Set to the mean",
          "Converted to string",
        ],
        correctIndex: 1,
        explanation: "Extremeness alone does not prove error.",
      },
      {
        question: "Which property checks identifier uniqueness?",
        options: [
          "is_unique",
          "isna only",
          "dtype",
          "shape",
        ],
        correctIndex: 0,
        explanation: "is_unique reports whether values are unique.",
      },
      {
        question: "Validation rules are strongest when they are...",
        options: [
          "Implicit",
          "Executable and documented",
          "Only remembered by the analyst",
          "Applied after plotting only",
        ],
        correctIndex: 1,
        explanation: "Executable rules are reproducible and testable.",
      },
    ],
    summary: [
      "Duplicates must be interpreted relative to the unit of observation.",
      "Extreme values are not automatically errors.",
      "Validation checks should encode known rules.",
      "Cleaning decisions need evidence and documentation.",
    ],
    nextStep: "Next, we reshape tables into structures that match analytical questions.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m4-l4-data-cleaning",
    title: "Tidy data and reshaping",
    subtitle: "The shape of a table determines which analyses are easy, safe and expressive.",
    estimatedMinutes: 36,
    objectives: [
      "Explain tidy-data principles.",
      "Convert wide data to long with melt.",
      "Convert long data to wide with pivot.",
      "Choose a shape that matches the analytical unit.",
    ],
    content: [
      {
        type: "paragraph",
        text: "A tidy table typically has one variable per column, one observation per row and one value per cell. Real datasets often arrive in wide formats that encode variable names inside column names.",
      },
      {
        type: "code-example",
        title: "Wide to long",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nwide_source = (\n    dirty\n    .drop_duplicates(\n        \"id\"\n    )\n    [\n        [\n            \"id\",\n            \"score_2024\",\n            \"score_2025\",\n        ]\n    ]\n)\n\nlong = wide_source.melt(\n    id_vars=[\n        \"id\",\n    ],\n    value_vars=[\n        \"score_2024\",\n        \"score_2025\",\n    ],\n    var_name=\"year\",\n    value_name=\"score\",\n)\n\nprint(long.head())",
      },
      {
        type: "heading",
        text: "Long data for repeated measures",
      },
      {
        type: "paragraph",
        text: "Long format often simplifies groupby, plotting and time-based analysis because repeated measurements share one value column and an explicit time variable.",
      },
      {
        type: "code-example",
        title: "Long to wide",
        code: "import pandas as pd\n\ndirty = pd.read_csv(\n    \"data/dirty_orders.csv\"\n)\n\nlong = (\n    dirty\n    .drop_duplicates(\n        \"id\"\n    )\n    .melt(\n        id_vars=[\n            \"id\",\n        ],\n        value_vars=[\n            \"score_2024\",\n            \"score_2025\",\n        ],\n        var_name=\"year\",\n        value_name=\"score\",\n    )\n)\n\nwide = long.pivot(\n    index=\"id\",\n    columns=\"year\",\n    values=\"score\",\n)\n\nprint(wide.head())",
      },
      {
        type: "callout",
        title: "Shape follows question",
        text: "Do not reshape because long or wide is fashionable. Reshape because a particular representation makes the analytical unit and variables clearer.",
      },
    ],
    workedExamples: [
      {
        title: "Repeated yearly columns",
        question: "A file contains id, weight_2024 and weight_2025.",
        steps: [
          "Identify id as the observation identifier.",
          "Melt the yearly columns into year and weight.",
          "Clean the year labels.",
          "Now each id-year record is one row.",
        ],
        answer: "The long table is easier to summarise by year and plot over time.",
      },
    ],
    exercises: [
      {
        question: "What does melt usually do?",
        answer: "Converts selected wide columns into variable/value rows.",
      },
      {
        question: "What does pivot usually do?",
        answer: "Reshapes long values into separate columns indexed by identifiers.",
      },
      {
        question: "Why is long format useful for repeated measurements?",
        answer: "Time or condition becomes an explicit variable, simplifying grouping and plotting.",
      },
    ],
    quiz: [
      {
        question: "In tidy data, one variable usually corresponds to...",
        options: [
          "One column",
          "One file only",
          "One plot",
          "One function",
        ],
        correctIndex: 0,
        explanation: "Tidy data places variables in columns.",
      },
      {
        question: "Which method converts wide columns into rows?",
        options: [
          "melt",
          "merge",
          "sort_values",
          "describe",
        ],
        correctIndex: 0,
        explanation: "melt performs wide-to-long reshaping.",
      },
      {
        question: "Why reshape data?",
        options: [
          "To match the representation to the analytical task",
          "To increase file size",
          "To avoid column names",
          "Because all analyses require long data",
        ],
        correctIndex: 0,
        explanation: "Shape should support the question and unit of observation.",
      },
    ],
    summary: [
      "Table shape affects analytical clarity.",
      "melt converts wide data to long.",
      "pivot converts long data to wide.",
      "Reshaping should make the analytical unit and variables explicit.",
    ],
    nextStep: "Module 5 combines records into summaries and joins multiple tables safely.",
  },
];
