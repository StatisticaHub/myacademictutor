import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 01 — PYTHON FOUNDATIONS FOR ANALYSIS
   ========================================================================== */

export const pythonDataAnalysisModule01:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m1-l1-python-foundations",
    title: "The data-analysis workflow in Python",
    subtitle: "Good analysis is a workflow, not a sequence of disconnected commands.",
    estimatedMinutes: 30,
    objectives: [
      "Describe a reproducible Python data-analysis workflow.",
      "Distinguish data loading, cleaning, transformation, analysis and communication steps.",
      "Use notebooks without turning them into unstructured scratchpads.",
      "Recognise why reproducibility matters from the first line of code.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Python data analysis is most reliable when you treat the work as a sequence of explicit stages: define the question, load data, inspect structure, clean, transform, analyse, visualise, validate and communicate.",
      },
      {
        type: "heading",
        text: "A professional analysis loop",
      },
      {
        type: "bullets",
        items: [
          "Question: what decision or scientific claim is the analysis meant to support?",
          "Data audit: what rows, columns, types and missing values are present?",
          "Cleaning: which issues must be corrected, documented or left unchanged?",
          "Analysis: what summaries or comparisons answer the question?",
          "Communication: what should another analyst be able to reproduce?",
        ],
      },
      {
        type: "code-example",
        title: "A minimal analysis skeleton",
        code: "from pathlib import Path\nimport pandas as pd\n\nDATA = Path(\"data\")\ndf = pd.read_csv(\n    DATA / \"sales.csv\",\n    parse_dates=[\"date\"],\n)\n\nprint(\"shape:\", df.shape)\nprint(df.dtypes.head())\nprint(df.head(3))",
        output: "Inspect shape, types and first rows before transforming anything.",
      },
      {
        type: "callout",
        title: "Professional habit",
        text: "Keep raw data unchanged. Create cleaned or derived objects rather than overwriting the source file.",
      },
      {
        type: "heading",
        text: "Notebook discipline",
      },
      {
        type: "paragraph",
        text: "A notebook is useful for exploration, but cells should still run from top to bottom. Hidden state—variables created out of order—makes analysis difficult to reproduce.",
      },
      {
        type: "python-data-lab",
        labKey: "workflow",
        title: "Workflow Builder",
        description: "Arrange the stages of an analysis and inspect what can go wrong when steps are skipped.",
      },
    ],
    workedExamples: [
      {
        title: "Audit before analysis",
        question: "You receive a CSV and are asked for average revenue by region. What should happen before groupby? ",
        steps: [
          "Load the data without altering it.",
          "Inspect row count, columns and data types.",
          "Check missing values and duplicated identifiers.",
          "Confirm that revenue is numeric and region labels are consistent.",
          "Only then compute grouped summaries.",
        ],
        answer: "The grouped result is trustworthy only after the variables and records used in the calculation have been audited.",
      },
    ],
    exercises: [
      {
        question: "Why is it risky to overwrite the raw CSV during cleaning?",
        answer: "It removes the untouched source needed for verification and makes mistakes harder to reverse.",
      },
      {
        question: "What is hidden notebook state?",
        answer: "A situation where results depend on cells having been run in an undocumented order.",
      },
      {
        question: "Name the first three stages you would use for an unfamiliar dataset.",
        answer: "Define the question, load the data, and audit its structure/quality.",
      },
    ],
    quiz: [
      {
        question: "What should usually happen before calculating a business KPI from a new file?",
        options: [
          "Plot immediately",
          "Audit structure and quality",
          "Rename every column",
          "Delete missing rows",
        ],
        correctIndex: 1,
        explanation: "You need to understand the data before trusting a calculation.",
      },
      {
        question: "A reproducible notebook should ideally...",
        options: [
          "Depend on cells run in random order",
          "Run from top to bottom",
          "Overwrite the raw file",
          "Contain only charts",
        ],
        correctIndex: 1,
        explanation: "Top-to-bottom execution reduces hidden state.",
      },
      {
        question: "Why keep raw data unchanged?",
        options: [
          "To make files larger",
          "To preserve a verifiable source",
          "Because pandas cannot save data",
          "To avoid using functions",
        ],
        correctIndex: 1,
        explanation: "The original source is essential for traceability.",
      },
    ],
    summary: [
      "Analysis begins with a question and a data audit.",
      "Raw data should remain unchanged.",
      "Notebooks should run in a predictable order.",
      "Reproducibility is part of analysis quality, not an optional extra.",
    ],
    nextStep: "Next, we review the Python objects and collection types that data workflows rely on.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m1-l2-python-foundations",
    title: "Variables, types and collections",
    subtitle: "Reliable analysis depends on understanding the objects your code is manipulating.",
    estimatedMinutes: 32,
    objectives: [
      "Use numeric, string and Boolean values appropriately.",
      "Choose between lists, tuples, dictionaries and sets.",
      "Inspect and convert Python types safely.",
      "Recognise type-related bugs before they contaminate an analysis.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Python variables are names bound to objects. The type of an object controls which operations are meaningful. In data work, many errors are not mathematical errors—they are type errors or silent coercion problems.",
      },
      {
        type: "code-example",
        title: "Inspecting basic types",
        code: "age = 28\nheight = 1.78\ncity = \"Bristol\"\neligible = True\n\nfor value in [\n    age,\n    height,\n    city,\n    eligible,\n]:\n    print(\n        type(value).__name__,\n        value,\n    )",
        output: "int\nfloat\nstr\nbool",
      },
      {
        type: "heading",
        text: "Collections you will use constantly",
      },
      {
        type: "bullets",
        items: [
          "list: ordered, mutable sequence; useful for column names or records.",
          "tuple: ordered, immutable sequence; useful for fixed coordinate-like values.",
          "dict: key-value mapping; useful for configuration and lookup tables.",
          "set: unique values; useful for membership and duplicate checks.",
        ],
      },
      {
        type: "code-example",
        title: "A small analysis configuration",
        code: "config = {\n    \"target\": \"revenue\",\n    \"group\": \"region\",\n    \"min_rows\": 20,\n}\n\ncolumns = [\n    \"region\",\n    \"revenue\",\n]\n\nallowed_regions = {\n    \"North\",\n    \"South\",\n    \"West\",\n}\n\nprint(config)\nprint(columns)\nprint(allowed_regions)",
      },
      {
        type: "callout",
        title: "Type trap",
        text: "The string '12' and the integer 12 look similar but behave differently. Validate types at data boundaries.",
      },
      {
        type: "heading",
        text: "Conversion should be explicit",
      },
      {
        type: "paragraph",
        text: "Use int(), float() and str() for ordinary Python values. Later, pandas will provide safer tools such as to_numeric and astype for whole columns.",
      },
    ],
    workedExamples: [
      {
        title: "A type bug",
        question: "Why does '10' + '5' produce '105' rather than 15?",
        steps: [
          "Both values are strings.",
          "The + operator concatenates strings.",
          "Convert the values to numeric types before arithmetic.",
        ],
        answer: "int('10') + int('5') evaluates to 15.",
      },
    ],
    exercises: [
      {
        question: "When is a dictionary preferable to a list?",
        answer: "When values should be accessed by meaningful keys rather than only by position.",
      },
      {
        question: "What does a set do with duplicate values?",
        answer: "It keeps unique values only.",
      },
      {
        question: "Why should numeric-looking strings be converted before analysis?",
        answer: "String operations and ordering differ from numeric arithmetic and can produce incorrect results.",
      },
    ],
    quiz: [
      {
        question: "Which collection stores key-value pairs?",
        options: [
          "list",
          "dict",
          "tuple",
          "set",
        ],
        correctIndex: 1,
        explanation: "A dictionary maps keys to values.",
      },
      {
        question: "What is type('12')?",
        options: [
          "int",
          "float",
          "str",
          "bool",
        ],
        correctIndex: 2,
        explanation: "Quotes create a string.",
      },
      {
        question: "Which structure automatically keeps unique values?",
        options: [
          "list",
          "tuple",
          "set",
          "dict values only",
        ],
        correctIndex: 2,
        explanation: "A set contains unique elements.",
      },
    ],
    summary: [
      "Object types determine valid operations.",
      "Lists, dictionaries and sets solve different data-workflow problems.",
      "Numeric-looking strings are not numeric values.",
      "Explicit conversion prevents silent analytical mistakes.",
    ],
    nextStep: "Next, we use control flow and functions to turn one-off code into reusable analysis logic.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m1-l3-python-foundations",
    title: "Control flow and functions",
    subtitle: "Functions and clear branching turn scripts into maintainable analytical tools.",
    estimatedMinutes: 34,
    objectives: [
      "Use if/elif/else for analytical rules.",
      "Iterate safely when vectorised tools are not appropriate.",
      "Define functions with clear inputs and outputs.",
      "Avoid unnecessary global state in analysis code.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Control flow determines which code runs; functions package logic into reusable, testable units. In data analysis, functions are particularly valuable for validation, repeated transformations and reporting.",
      },
      {
        type: "code-example",
        title: "A validation function",
        code: "def classify_score(score):\n    if score >= 70:\n        return \"pass\"\n    if score >= 50:\n        return \"review\"\n    return \"fail\"\n\nfor score in [\n    76,\n    64,\n    42,\n]:\n    print(\n        score,\n        classify_score(score),\n    )",
        output: "pass",
      },
      {
        type: "heading",
        text: "Prefer return values",
      },
      {
        type: "paragraph",
        text: "A function that returns a value is easier to test and reuse than a function that only prints. Keep input arguments explicit and avoid depending on variables hidden elsewhere in the notebook.",
      },
      {
        type: "code-example",
        title: "Looping over known columns",
        code: "import pandas as pd\n\ndf = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nrequired = [\n    \"age\",\n    \"region\",\n    \"revenue\",\n]\n\nfor column in required:\n    if column not in df.columns:\n        raise ValueError(\n            f\"Missing required column: {column}\"\n        )\n\nprint(\n    \"All required columns are present.\"\n)",
      },
      {
        type: "callout",
        title: "Analysis design principle",
        text: "Write small functions that do one thing well: clean a label, validate a range, compute a summary, or create a plot.",
      },
      {
        type: "heading",
        text: "Loops are useful—but not always fastest",
      },
      {
        type: "paragraph",
        text: "Loops are appropriate for orchestration or heterogeneous tasks. For numerical array operations, NumPy and pandas vectorisation is usually clearer and faster.",
      },
    ],
    workedExamples: [
      {
        title: "Reusable validation",
        question: "You need to reject negative ages in several datasets.",
        steps: [
          "Write a function that accepts a value or Series.",
          "Define the invalid condition age < 0.",
          "Return a cleaned value or raise a clear error.",
          "Reuse the same function wherever age is validated.",
        ],
        answer: "The rule now exists in one place rather than being copied throughout the analysis.",
      },
    ],
    exercises: [
      {
        question: "Why are explicit function arguments useful?",
        answer: "They make dependencies visible and functions easier to test.",
      },
      {
        question: "What is the benefit of return over print for analytical functions?",
        answer: "Returned values can be reused, composed and tested.",
      },
      {
        question: "When might a loop be preferable to vectorisation?",
        answer: "When coordinating different tasks or iterating over heterogeneous objects rather than applying one numeric operation to an array.",
      },
    ],
    quiz: [
      {
        question: "What should a reusable calculation function usually do with its result?",
        options: [
          "Only print it",
          "Return it",
          "Store it globally",
          "Write it to raw data",
        ],
        correctIndex: 1,
        explanation: "Returned values are reusable and testable.",
      },
      {
        question: "Which construct handles alternative logical branches?",
        options: [
          "import",
          "if/elif/else",
          "class only",
          "with only",
        ],
        correctIndex: 1,
        explanation: "Conditional branches control which block runs.",
      },
      {
        question: "For large numeric arrays, repeated Python loops are often replaced by...",
        options: [
          "Vectorised NumPy operations",
          "More print statements",
          "Sets only",
          "File writes",
        ],
        correctIndex: 0,
        explanation: "Vectorisation is generally clearer and faster for array calculations.",
      },
    ],
    summary: [
      "Control flow expresses analytical rules.",
      "Functions make transformations reusable and testable.",
      "Explicit inputs and returned outputs reduce hidden dependencies.",
      "Loops are valuable, but vectorised tools are often better for numeric data.",
    ],
    nextStep: "Next, we combine these ideas into analysis-ready Python style and project structure.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m1-l4-python-foundations",
    title: "Writing analysis-ready Python",
    subtitle: "Readable code is a quality-control mechanism for data analysis.",
    estimatedMinutes: 32,
    objectives: [
      "Use clear names and small functions in analytical code.",
      "Structure paths and configuration without hard-coding.",
      "Use assertions and exceptions for defensible validation.",
      "Recognise common code smells in notebooks and scripts.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Analysis code should make intent obvious. A future reader—including you—should be able to tell what a variable represents, where data came from and which assumptions were checked.",
      },
      {
        type: "code-example",
        title: "Avoid hard-coded paths",
        code: "from pathlib import Path\nimport pandas as pd\n\nPROJECT = Path.cwd()\nDATA = PROJECT / \"data\"\nOUTPUT = PROJECT / \"outputs\"\n\nOUTPUT.mkdir(\n    parents=True,\n    exist_ok=True,\n)\n\nsales = pd.read_csv(\n    DATA / \"sales.csv\"\n)\n\nprint(\n    \"Rows loaded:\",\n    len(sales),\n)\nprint(\n    \"Output folder:\",\n    OUTPUT,\n)",
      },
      {
        type: "heading",
        text: "Use names that carry meaning",
      },
      {
        type: "bullets",
        items: [
          "Prefer monthly_revenue to mr.",
          "Prefer valid_rows to temp2.",
          "Name Boolean objects like is_valid or has_missing.",
          "Keep constants such as thresholds in one visible place.",
        ],
      },
      {
        type: "code-example",
        title: "Assert critical assumptions",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nassert sales[\n    \"revenue\"\n].notna().all()\n\nassert (\n    sales[\"revenue\"]\n    >= 0\n).all()\n\nassert sales[\n    \"order_id\"\n].is_unique\n\nprint(\n    \"Critical assumptions passed.\"\n)",
      },
      {
        type: "callout",
        title: "Fail loudly on broken assumptions",
        text: "A clean error near the source of a problem is better than a polished chart built on invalid data.",
      },
      {
        type: "heading",
        text: "Notebook smell test",
      },
      {
        type: "paragraph",
        text: "Repeated blocks, unexplained magic numbers, dozens of global variables and cells that only work after manual reordering are signals that logic should move into functions or modules.",
      },
    ],
    workedExamples: [
      {
        title: "Replace a magic number",
        question: "A notebook filters revenue > 500 in six places.",
        steps: [
          "Define HIGH_VALUE_THRESHOLD = 500 once.",
          "Use the named constant in each filter.",
          "Document why 500 is meaningful.",
          "Change the threshold in one place when requirements change.",
        ],
        answer: "A named constant makes the analytical rule visible and maintainable.",
      },
    ],
    exercises: [
      {
        question: "Why is pathlib preferable to manually concatenating path strings?",
        answer: "It creates readable, platform-aware paths and reduces separator mistakes.",
      },
      {
        question: "What is a magic number?",
        answer: "An unexplained literal value embedded in code whose meaning is not obvious.",
      },
      {
        question: "What should happen if a supposedly unique identifier is duplicated?",
        answer: "The analysis should flag or fail the assumption rather than continue silently.",
      },
    ],
    quiz: [
      {
        question: "Which variable name is clearest?",
        options: [
          "x1",
          "tmp",
          "monthly_revenue",
          "v",
        ],
        correctIndex: 2,
        explanation: "The name communicates analytical meaning.",
      },
      {
        question: "What is a useful role for assert in analysis code?",
        options: [
          "Styling charts",
          "Checking assumptions",
          "Installing packages",
          "Reading only JSON",
        ],
        correctIndex: 1,
        explanation: "Assertions make assumptions executable.",
      },
      {
        question: "Repeated transformation code is often a sign that you should...",
        options: [
          "Copy it again",
          "Wrap it in a function",
          "Delete comments",
          "Use more globals",
        ],
        correctIndex: 1,
        explanation: "Functions reduce duplication and centralise logic.",
      },
    ],
    summary: [
      "Readable code supports analytical quality.",
      "Paths and thresholds should be configured clearly.",
      "Assertions turn assumptions into checks.",
      "Repeated notebook logic should be refactored into reusable functions.",
    ],
    nextStep: "Module 2 introduces NumPy, the numerical foundation beneath much of the Python data stack.",
  },
];
