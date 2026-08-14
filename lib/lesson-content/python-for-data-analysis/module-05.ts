import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 05 — GROUPING AND COMBINING DATA
   ========================================================================== */

export const pythonDataAnalysisModule05:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m5-l1-grouping-combining",
    title: "GroupBy and aggregation",
    subtitle: "Grouped summaries convert row-level data into interpretable comparisons.",
    estimatedMinutes: 36,
    objectives: [
      "Use groupby for split-apply-combine analysis.",
      "Apply multiple aggregation functions.",
      "Create named aggregations.",
      "Check group sizes before interpreting summaries.",
    ],
    content: [
      {
        type: "paragraph",
        text: "GroupBy divides data into groups, applies calculations within each group and combines the results. It is one of the most important patterns in tabular analysis.",
      },
      {
        type: "code-example",
        title: "Named aggregation",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nsummary = (\n    sales\n    .groupby(\n        \"region\",\n        as_index=False,\n    )\n    .agg(\n        n=(\n            \"revenue\",\n            \"size\",\n        ),\n        mean_revenue=(\n            \"revenue\",\n            \"mean\",\n        ),\n        total_revenue=(\n            \"revenue\",\n            \"sum\",\n        ),\n    )\n)\n\nprint(\n    summary.round(2)\n)",
      },
      {
        type: "python-data-lab",
        labKey: "groupby",
        title: "GroupBy Lab",
        description: "Choose a grouping variable and metric and compare counts, means and totals across groups.",
      },
      {
        type: "heading",
        text: "Always look at n",
      },
      {
        type: "paragraph",
        text: "A large mean based on three records is not comparable to a mean based on three thousand without context. Include group counts alongside summaries.",
      },
      {
        type: "callout",
        title: "Grouping changes the unit",
        text: "After aggregation, each row represents a group rather than an individual record. Keep track of that shift in unit of analysis.",
      },
    ],
    workedExamples: [
      {
        title: "Revenue by region",
        question: "Create mean and total revenue by region.",
        steps: [
          "Group by region.",
          "Use named aggregation for count, mean and sum.",
          "Reset the index if you want region as an ordinary column.",
          "Sort or visualise only after confirming group sizes.",
        ],
        answer: "The result has one row per region with transparent group counts and revenue summaries.",
      },
    ],
    exercises: [
      {
        question: "What three words summarise the groupby pattern?",
        answer: "Split, apply, combine.",
      },
      {
        question: "Why include group size in summaries?",
        answer: "It provides context for how much data supports each result.",
      },
      {
        question: "What does reset_index often do after groupby?",
        answer: "Moves grouping labels from the index back into ordinary columns.",
      },
    ],
    quiz: [
      {
        question: "Which method creates grouped calculations?",
        options: [
          "groupby",
          "merge",
          "melt",
          "read_csv",
        ],
        correctIndex: 0,
        explanation: "groupby performs split-apply-combine.",
      },
      {
        question: "Why report n with a group mean?",
        options: [
          "To provide sample-size context",
          "To change the mean",
          "To remove missingness",
          "To create dates",
        ],
        correctIndex: 0,
        explanation: "Group size affects interpretation.",
      },
      {
        question: "After aggregation, each output row usually represents...",
        options: [
          "An original record",
          "A group",
          "A file",
          "A Python package",
        ],
        correctIndex: 1,
        explanation: "Aggregation changes the unit from record to group.",
      },
    ],
    summary: [
      "GroupBy implements split-apply-combine.",
      "Named aggregations make outputs self-explanatory.",
      "Group counts should accompany summaries.",
      "Aggregation changes the unit represented by each row.",
    ],
    nextStep: "Next, we build matrix-like summaries with pivot tables and cross-tabulations.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m5-l2-grouping-combining",
    title: "Pivot tables and cross-tabulations",
    subtitle: "Two-dimensional summaries reveal how categories interact.",
    estimatedMinutes: 34,
    objectives: [
      "Create pivot tables with aggregation.",
      "Build cross-tabulations of categorical variables.",
      "Add margins and normalised proportions.",
      "Distinguish counts, percentages and means.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Pivot tables summarise a numeric value across combinations of categories. Cross-tabulations focus on counts or proportions across categorical variables.",
      },
      {
        type: "code-example",
        title: "Pivot table",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\npivot = pd.pivot_table(\n    sales,\n    index=\"region\",\n    columns=\"channel\",\n    values=\"revenue\",\n    aggfunc=\"mean\",\n)\n\nprint(\n    pivot.round(2)\n)",
      },
      {
        type: "code-example",
        title: "Row-normalised cross-tab",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nshare = pd.crosstab(\n    sales[\"region\"],\n    sales[\"channel\"],\n    normalize=\"index\",\n)\n\nprint(\n    share.round(3)\n)",
      },
      {
        type: "heading",
        text: "Percent of what?",
      },
      {
        type: "paragraph",
        text: "A normalised table is only interpretable when the denominator is clear. Row percentages answer a different question from column percentages or overall percentages.",
      },
      {
        type: "callout",
        title: "Label the denominator",
        text: "Whenever you present percentages, state whether they are within row, within column or across the whole table.",
      },
    ],
    workedExamples: [
      {
        title: "Channel mix by region",
        question: "Find the percentage of records in each channel within each region.",
        steps: [
          "Use pd.crosstab(region, channel, normalize='index').",
          "Multiply by 100 if percentages are preferred.",
          "Check each row sums to approximately 100%.",
        ],
        answer: "The table describes channel composition within each region.",
      },
    ],
    exercises: [
      {
        question: "What does normalize='index' mean in crosstab?",
        answer: "Each row is divided by its row total.",
      },
      {
        question: "How does a pivot table differ from a raw reshaping pivot?",
        answer: "pivot_table can aggregate multiple observations per cell.",
      },
      {
        question: "Why should percentages state their denominator?",
        answer: "Different denominators answer different analytical questions.",
      },
    ],
    quiz: [
      {
        question: "Which function is designed for categorical frequency tables?",
        options: [
          "pd.crosstab",
          "pd.read_csv",
          "np.mean",
          "Path",
        ],
        correctIndex: 0,
        explanation: "crosstab summarises categorical combinations.",
      },
      {
        question: "normalize='index' produces...",
        options: [
          "Row proportions",
          "Column names",
          "Raw means only",
          "Missing counts",
        ],
        correctIndex: 0,
        explanation: "It normalises within each row.",
      },
      {
        question: "A pivot table can...",
        options: [
          "Aggregate values across category combinations",
          "Only rename columns",
          "Only read Excel",
          "Never compute means",
        ],
        correctIndex: 0,
        explanation: "pivot_table supports aggregation functions.",
      },
    ],
    summary: [
      "Pivot tables summarise numeric values across categorical dimensions.",
      "Cross-tabs summarise categorical counts and proportions.",
      "Normalisation defines the denominator.",
      "Percentages must be labelled with their reference population.",
    ],
    nextStep: "Next, we combine separate tables using explicit join keys and validation.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m5-l3-grouping-combining",
    title: "Merging and joining tables",
    subtitle: "Joins are powerful because they can also silently multiply or lose records.",
    estimatedMinutes: 38,
    objectives: [
      "Use inner and left joins appropriately.",
      "Choose and validate merge keys.",
      "Use validate to enforce relationship assumptions.",
      "Audit row counts and unmatched keys after merges.",
    ],
    content: [
      {
        type: "paragraph",
        text: "A merge combines tables using one or more keys. The key relationship—one-to-one, one-to-many or many-to-many—determines what row expansion is expected.",
      },
      {
        type: "code-example",
        title: "Validated left join",
        code: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\ncombined = orders.merge(\n    customers,\n    on=\"customer_id\",\n    how=\"left\",\n    validate=\"many_to_one\",\n    indicator=True,\n)\n\nprint(\n    combined[\n        [\n            \"order_id\",\n            \"customer_id\",\n            \"customer_segment\",\n            \"_merge\",\n        ]\n    ]\n    .head()\n)",
      },
      {
        type: "python-data-lab",
        labKey: "merge",
        title: "Merge Lab",
        description: "Switch between inner and left joins and inspect matched, left-only and row-multiplication outcomes.",
      },
      {
        type: "heading",
        text: "Why validate matters",
      },
      {
        type: "paragraph",
        text: "If each customer should appear once in the customer table, validate='many_to_one' turns that assumption into an executable check.",
      },
      {
        type: "code-example",
        title: "Audit match status",
        code: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\ncombined = orders.merge(\n    customers,\n    on=\"customer_id\",\n    how=\"left\",\n    validate=\"many_to_one\",\n    indicator=True,\n)\n\nprint(\n    combined[\"_merge\"]\n    .value_counts()\n)",
      },
      {
        type: "callout",
        title: "Never trust a merge by appearance",
        text: "Compare row counts, key uniqueness and unmatched records before using joined variables downstream.",
      },
    ],
    workedExamples: [
      {
        title: "Orders plus customer attributes",
        question: "Each order has customer_id; customer table should have one row per customer.",
        steps: [
          "Check customer_id is unique in the customer table.",
          "Use a left merge from orders to customers.",
          "Set validate='many_to_one'.",
          "Inspect _merge counts for unmatched orders.",
        ],
        answer: "The join preserves all orders while enforcing the expected key relationship.",
      },
    ],
    exercises: [
      {
        question: "What does a left join preserve?",
        answer: "All rows from the left table, adding matches from the right when available.",
      },
      {
        question: "What does validate='one_to_one' enforce?",
        answer: "Both merge keys must be unique on their respective tables.",
      },
      {
        question: "Why can a many-to-many merge be dangerous?",
        answer: "Matching duplicates on both sides can multiply rows unexpectedly.",
      },
    ],
    quiz: [
      {
        question: "Which join keeps every row from the left table?",
        options: [
          "inner",
          "left",
          "right only",
          "cross only",
        ],
        correctIndex: 1,
        explanation: "A left join preserves left rows.",
      },
      {
        question: "Which argument can enforce expected key cardinality?",
        options: [
          "validate",
          "ascending",
          "dtype",
          "usecols",
        ],
        correctIndex: 0,
        explanation: "validate checks merge relationships.",
      },
      {
        question: "After a merge you should inspect...",
        options: [
          "Only the first row",
          "Row counts, key uniqueness and unmatched records",
          "Only column names",
          "Plot colour",
        ],
        correctIndex: 1,
        explanation: "Merge QA is essential.",
      },
    ],
    summary: [
      "Joins depend on key cardinality.",
      "Left and inner joins answer different retention questions.",
      "validate makes key assumptions executable.",
      "Every merge should be audited for unmatched and multiplied records.",
    ],
    nextStep: "Next, we use transform, apply and rolling operations for within-group and local calculations.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m5-l4-grouping-combining",
    title: "Transform, apply and window operations",
    subtitle: "Choose operations based on the shape of output you need.",
    estimatedMinutes: 38,
    objectives: [
      "Distinguish agg, transform and apply.",
      "Create group-level values aligned back to original rows.",
      "Use rolling windows for local summaries.",
      "Avoid apply when a vectorised operation exists.",
    ],
    content: [
      {
        type: "paragraph",
        text: "pandas offers several group-level interfaces. agg reduces groups, transform returns a result aligned to the original rows, and apply is a flexible fallback when standard methods do not fit.",
      },
      {
        type: "code-example",
        title: "Within-group centring",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nsales[\n    \"revenue_centre\"\n] = (\n    sales[\"revenue\"]\n    -\n    sales.groupby(\n        \"region\"\n    )[\"revenue\"]\n    .transform(\n        \"mean\"\n    )\n)\n\nprint(\n    sales.groupby(\n        \"region\"\n    )[\n        \"revenue_centre\"\n    ]\n    .mean()\n    .round(10)\n)",
      },
      {
        type: "heading",
        text: "Rolling calculations",
      },
      {
        type: "code-example",
        title: "Seven-period rolling mean",
        code: "import pandas as pd\n\ndaily = pd.read_csv(\n    \"data/daily.csv\",\n    parse_dates=[\n        \"date\",\n    ],\n)\n\ndaily[\n    \"rolling_mean\"\n] = (\n    daily[\"value\"]\n    .rolling(\n        window=7,\n        min_periods=1,\n    )\n    .mean()\n)\n\nprint(\n    daily.head(10)\n)",
      },
      {
        type: "callout",
        title: "Prefer specialised methods",
        text: "Use built-in vectorised operations, agg or transform when possible. apply is flexible but often slower and harder to reason about.",
      },
      {
        type: "heading",
        text: "Output shape is the clue",
      },
      {
        type: "bullets",
        items: [
          "agg: one or a few rows per group.",
          "transform: same row count as the original data.",
          "apply: custom shape, requiring extra care.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Group-relative value",
        question: "Calculate each person's score minus their group's mean.",
        steps: [
          "Compute group means with transform('mean').",
          "Subtract the aligned mean Series from score.",
          "Store the difference as a derived column.",
        ],
        answer: "Every original row receives a group-relative score without merging a separate summary table.",
      },
    ],
    exercises: [
      {
        question: "When is transform preferable to agg?",
        answer: "When you need a group-derived value aligned to every original row.",
      },
      {
        question: "What does a rolling mean represent?",
        answer: "A summary calculated over a moving local window of observations.",
      },
      {
        question: "Why avoid apply for simple arithmetic?",
        answer: "Vectorised built-ins are usually faster, clearer and easier to validate.",
      },
    ],
    quiz: [
      {
        question: "Which method usually returns the same number of rows as the input?",
        options: [
          "agg",
          "transform",
          "groupby.size only",
          "pivot_table always",
        ],
        correctIndex: 1,
        explanation: "transform aligns group results to original rows.",
      },
      {
        question: "A rolling window is useful for...",
        options: [
          "Local moving summaries",
          "Merging files",
          "Changing dtypes only",
          "Creating dictionaries",
        ],
        correctIndex: 0,
        explanation: "Rolling operations summarise nearby observations.",
      },
      {
        question: "apply should often be...",
        options: [
          "The first choice for every operation",
          "A fallback when specialised vectorised methods do not fit",
          "Used only for imports",
          "Avoided even when necessary",
        ],
        correctIndex: 1,
        explanation: "Prefer specialised pandas operations when available.",
      },
    ],
    summary: [
      "agg reduces groups; transform preserves row alignment.",
      "Rolling operations calculate local window summaries.",
      "Output shape helps choose the correct method.",
      "Use apply deliberately rather than by default.",
    ],
    nextStep: "Module 6 develops exploratory analysis and visual communication.",
  },
];
