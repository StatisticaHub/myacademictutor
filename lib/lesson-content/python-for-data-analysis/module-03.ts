import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 03 — PANDAS FOUNDATIONS
   ========================================================================== */

export const pythonDataAnalysisModule03:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m3-l1-pandas-foundations",
    title: "Series and DataFrames",
    subtitle: "pandas adds labels and table semantics to Python's numerical data stack.",
    estimatedMinutes: 34,
    objectives: [
      "Create Series and DataFrames.",
      "Inspect shape, columns, index and dtypes.",
      "Explain the difference between labels and positions.",
      "Recognise why schema inspection comes before analysis.",
    ],
    content: [
      {
        type: "paragraph",
        text: "A pandas DataFrame is a two-dimensional labelled table. A Series is a one-dimensional labelled array. Together they provide the core abstraction for most tabular analysis in Python.",
      },
      {
        type: "code-example",
        title: "Build a DataFrame",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"region\": [\n        \"North\",\n        \"South\",\n        \"North\",\n    ],\n    \"revenue\": [\n        120,\n        90,\n        150,\n    ],\n})\n\nprint(df)\nprint(df.dtypes)",
        output: "(3, 2)\nregion     object\nrevenue     int64",
      },
      {
        type: "heading",
        text: "Labels matter",
      },
      {
        type: "paragraph",
        text: "pandas works with both row/column labels and integer positions. .loc uses labels; .iloc uses positions. Confusing the two can silently select the wrong data.",
      },
      {
        type: "callout",
        title: "Schema first",
        text: "Before analysing a DataFrame, inspect shape, columns, dtypes, head and missingness.",
      },
      {
        type: "python-data-lab",
        labKey: "dataframe",
        title: "DataFrame Explorer",
        description: "Inspect a small table, choose columns and filters, and see how DataFrame operations change rows without mutating the original.",
      },
    ],
    workedExamples: [
      {
        title: "Inspect a new table",
        question: "You load 50,000 rows from CSV. What should you inspect first?",
        steps: [
          "Check df.shape.",
          "Check df.columns and df.dtypes.",
          "Preview df.head().",
          "Review missing counts with df.isna().sum().",
        ],
        answer: "You now understand the table's basic schema before transforming it.",
      },
    ],
    exercises: [
      {
        question: "What does df.shape return?",
        answer: "A tuple containing number of rows and columns.",
      },
      {
        question: "What is a Series?",
        answer: "A one-dimensional labelled pandas object.",
      },
      {
        question: "What is the key difference between .loc and .iloc?",
        answer: "loc selects by labels; iloc selects by integer positions.",
      },
    ],
    quiz: [
      {
        question: "Which object is two-dimensional?",
        options: [
          "Series",
          "DataFrame",
          "set",
          "Path",
        ],
        correctIndex: 1,
        explanation: "A DataFrame is a labelled 2D table.",
      },
      {
        question: "Which accessor selects by integer position?",
        options: [
          "loc",
          "iloc",
          "groupby",
          "merge",
        ],
        correctIndex: 1,
        explanation: "iloc is position-based.",
      },
      {
        question: "Why inspect dtypes?",
        options: [
          "To choose a colour theme",
          "Because type controls valid operations",
          "To sort files",
          "To rename the index automatically",
        ],
        correctIndex: 1,
        explanation: "Data types determine how values behave.",
      },
    ],
    summary: [
      "DataFrames are labelled two-dimensional tables.",
      "Series are labelled one-dimensional arrays.",
      "loc and iloc use different selection semantics.",
      "Schema inspection should precede analysis.",
    ],
    nextStep: "Next, we select, filter and sort rows and columns precisely.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m3-l2-pandas-foundations",
    title: "Selecting, filtering and sorting",
    subtitle: "Precise selection is the difference between analysing the intended records and the wrong subset.",
    estimatedMinutes: 34,
    objectives: [
      "Select columns and rows safely.",
      "Build Boolean filters with multiple conditions.",
      "Use query and sort_values appropriately.",
      "Avoid chained-indexing ambiguity.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Most analysis begins by narrowing a table to the variables and records relevant to the question. pandas supports label-based selection, Boolean masks and expressive query syntax.",
      },
      {
        type: "code-example",
        title: "Filter with multiple conditions",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nsubset = df.loc[\n    (\n        df[\"region\"]\n        == \"North\"\n    )\n    &\n    (\n        df[\"revenue\"]\n        >= 100\n    ),\n    [\n        \"region\",\n        \"revenue\",\n    ],\n]\n\nprint(\n    subset.head()\n)",
      },
      {
        type: "heading",
        text: "Parentheses matter",
      },
      {
        type: "paragraph",
        text: "When combining pandas Boolean conditions with & or |, wrap each comparison in parentheses because operator precedence differs from ordinary English logic.",
      },
      {
        type: "code-example",
        title: "Sort for inspection",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\ntop = (\n    df\n    .sort_values(\n        \"revenue\",\n        ascending=False,\n    )\n    .head(10)\n)\n\nprint(\n    top[\n        [\n            \"order_id\",\n            \"region\",\n            \"revenue\",\n        ]\n    ]\n)",
      },
      {
        type: "callout",
        title: "Avoid chained assignment",
        text: "Use .loc[row_condition, column] = value for explicit modification rather than ambiguous chained indexing.",
      },
    ],
    workedExamples: [
      {
        title: "Top customers in one region",
        question: "Find the five highest-revenue North records.",
        steps: [
          "Filter region == 'North'.",
          "Sort revenue descending.",
          "Take head(5).",
          "Keep only columns needed for review.",
        ],
        answer: "A clear filter-sort-select pipeline answers the question reproducibly.",
      },
    ],
    exercises: [
      {
        question: "Why wrap pandas comparisons in parentheses when using &?",
        answer: "Because Python operator precedence can otherwise evaluate the expression incorrectly.",
      },
      {
        question: "How do you select two named columns?",
        answer: "df[['col1','col2']].",
      },
      {
        question: "Which method sorts a DataFrame by a column?",
        answer: "sort_values.",
      },
    ],
    quiz: [
      {
        question: "Which operator combines two pandas Boolean conditions with logical AND?",
        options: [
          "and",
          "&&",
          "&",
          "+",
        ],
        correctIndex: 2,
        explanation: "Use element-wise & with parentheses.",
      },
      {
        question: "What does ascending=False do in sort_values?",
        options: [
          "Sorts largest to smallest",
          "Drops missing values",
          "Reverses column order only",
          "Converts to string",
        ],
        correctIndex: 0,
        explanation: "False requests descending order.",
      },
      {
        question: "Which pattern is safest for conditional assignment?",
        options: [
          "df[df['x']>0]['y']=1",
          "df.loc[df['x']>0,'y']=1",
          "df.y=1 always",
          "del df['y']",
        ],
        correctIndex: 1,
        explanation: "loc makes the target rows and column explicit.",
      },
    ],
    summary: [
      "Use loc for explicit row/column selection.",
      "Boolean filters should state analytical conditions clearly.",
      "sort_values helps ranking and inspection.",
      "Avoid ambiguous chained assignment.",
    ],
    nextStep: "Next, we create new variables and transform columns without row-by-row loops.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m3-l3-pandas-foundations",
    title: "Creating and transforming columns",
    subtitle: "Most analysis value comes from turning raw columns into meaningful analytical variables.",
    estimatedMinutes: 34,
    objectives: [
      "Create derived columns vectorially.",
      "Use assign for readable pipelines.",
      "Map categories with dictionaries.",
      "Use np.where and pandas methods for conditional transformations.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Derived variables encode analytical definitions: profit from revenue and cost, age group from age, or flag variables from thresholds. These definitions should be explicit and reproducible.",
      },
      {
        type: "code-example",
        title: "Vectorised derived column",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\ndf = df.assign(\n    profit=\n        df[\"revenue\"]\n        - df[\"cost\"]\n)\n\nprint(\n    df[\n        [\n            \"revenue\",\n            \"cost\",\n            \"profit\",\n        ]\n    ]\n    .head()\n)",
      },
      {
        type: "code-example",
        title: "Map labels",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nregion_code = {\n    \"North\": \"N\",\n    \"South\": \"S\",\n    \"West\": \"W\",\n}\n\ndf[\n    \"region_code\"\n] = (\n    df[\"region\"]\n    .map(\n        region_code\n    )\n)\n\nprint(\n    df[\n        [\n            \"region\",\n            \"region_code\",\n        ]\n    ]\n    .drop_duplicates()\n)",
      },
      {
        type: "heading",
        text: "Prefer vectorised expressions",
      },
      {
        type: "paragraph",
        text: "For column-level arithmetic and logical rules, vectorised expressions are easier to read and usually much faster than iterating row by row.",
      },
      {
        type: "callout",
        title: "Definition before code",
        text: "Write the variable definition in words before implementing it. This prevents transformations from becoming unexplained technical artefacts.",
      },
    ],
    workedExamples: [
      {
        title: "Create margin percentage",
        question: "Define margin as 100×profit/revenue.",
        steps: [
          "Create profit=revenue-cost.",
          "Check revenue is not zero.",
          "Compute 100*profit/revenue.",
          "Decide how zero revenue should be represented.",
        ],
        answer: "The code should implement the documented definition and handle invalid denominators explicitly.",
      },
    ],
    exercises: [
      {
        question: "What does Series.map commonly do?",
        answer: "Maps existing values to replacement or lookup values.",
      },
      {
        question: "Why check zero denominators before calculating ratios?",
        answer: "Division by zero creates invalid or infinite results.",
      },
      {
        question: "Why prefer vectorised derived columns?",
        answer: "They are concise, efficient and align directly with column definitions.",
      },
    ],
    quiz: [
      {
        question: "Which method is useful for adding columns in a pipeline?",
        options: [
          "assign",
          "head",
          "merge only",
          "shape",
        ],
        correctIndex: 0,
        explanation: "assign returns a DataFrame with new columns.",
      },
      {
        question: "Series.map is especially useful for...",
        options: [
          "Category lookup/relabeling",
          "Reading CSV files",
          "Changing row order",
          "Computing matrix inverses",
        ],
        correctIndex: 0,
        explanation: "map applies a lookup/function to values.",
      },
      {
        question: "Before calculating a ratio, you should check...",
        options: [
          "File name length",
          "The denominator's validity",
          "Plot title",
          "Index colour",
        ],
        correctIndex: 1,
        explanation: "Zero or invalid denominators need an explicit policy.",
      },
    ],
    summary: [
      "Derived columns should implement documented definitions.",
      "Vectorised transformations are preferred for column operations.",
      "map supports clear lookup-based recoding.",
      "Ratios and conditional variables need explicit edge-case handling.",
    ],
    nextStep: "Next, we learn how data enters and leaves pandas—and why dtypes often need active management.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m3-l4-pandas-foundations",
    title: "Import, export and data types",
    subtitle: "Reliable analysis starts at the boundary where external files become typed data.",
    estimatedMinutes: 34,
    objectives: [
      "Read and write common tabular formats.",
      "Inspect parsing problems after import.",
      "Convert columns using pandas type tools.",
      "Choose safe export practices.",
    ],
    content: [
      {
        type: "paragraph",
        text: "CSV files do not store rich schema information, so pandas must infer types. That inference can be wrong when columns contain mixed values, special missing codes or inconsistent dates.",
      },
      {
        type: "code-example",
        title: "Read with selected columns",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/orders.csv\",\n    usecols=[\n        \"order_id\",\n        \"date\",\n        \"revenue\",\n    ],\n    parse_dates=[\n        \"date\",\n    ],\n)\n\nprint(df.head())\nprint(df.dtypes)",
      },
      {
        type: "code-example",
        title: "Convert safely",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/orders.csv\",\n    dtype={\n        \"revenue\":\n            \"string\",\n    },\n)\n\ndf[\n    \"revenue\"\n] = pd.to_numeric(\n    df[\"revenue\"],\n    errors=\"coerce\",\n)\n\ndf[\n    \"date\"\n] = pd.to_datetime(\n    df[\"date\"],\n    errors=\"coerce\",\n)\n\nprint(df.dtypes)",
      },
      {
        type: "heading",
        text: "Coercion creates evidence",
      },
      {
        type: "paragraph",
        text: "errors='coerce' converts unparseable values to missing. That is useful only if you then inspect which records became missing and why.",
      },
      {
        type: "callout",
        title: "Export derived data, not raw data",
        text: "Write cleaned outputs to a separate path and preserve the original source file.",
      },
    ],
    workedExamples: [
      {
        title: "Mixed numeric column",
        question: "A revenue column contains '120', '95', and 'unknown'.",
        steps: [
          "Import the column.",
          "Use pd.to_numeric(..., errors='coerce').",
          "Identify rows newly converted to NaN.",
          "Decide whether 'unknown' is genuine missingness, a data error or a special code.",
        ],
        answer: "Conversion is only the first step; the problematic source values still need interpretation.",
      },
    ],
    exercises: [
      {
        question: "Why can CSV dtype inference be unreliable?",
        answer: "CSV stores text values without an enforced schema, so mixed content can mislead inference.",
      },
      {
        question: "What does errors='coerce' do in to_numeric?",
        answer: "Converts unparseable values to NaN.",
      },
      {
        question: "Why inspect newly missing values after coercion?",
        answer: "They reveal which source entries failed parsing and may indicate data-quality problems.",
      },
    ],
    quiz: [
      {
        question: "Which function converts a column to numeric with controlled parsing?",
        options: [
          "pd.to_numeric",
          "df.plot",
          "np.merge",
          "Path.rename",
        ],
        correctIndex: 0,
        explanation: "to_numeric handles numeric conversion.",
      },
      {
        question: "What does pd.to_datetime create conceptually?",
        options: [
          "Datetime-like values",
          "Only strings",
          "Sets",
          "Boolean masks only",
        ],
        correctIndex: 0,
        explanation: "It parses date/time values.",
      },
      {
        question: "After coercing invalid values to missing, the next step should be...",
        options: [
          "Ignore them automatically",
          "Inspect and understand them",
          "Delete the raw file",
          "Convert everything to string",
        ],
        correctIndex: 1,
        explanation: "Coercion surfaces parse failures that require review.",
      },
    ],
    summary: [
      "External files need schema validation after import.",
      "pandas type conversion tools make parsing explicit.",
      "Coercion should be followed by investigation.",
      "Cleaned outputs should be separated from raw inputs.",
    ],
    nextStep: "Module 4 focuses on the most common real-world challenge: cleaning messy data without hiding analytical decisions.",
  },
];
