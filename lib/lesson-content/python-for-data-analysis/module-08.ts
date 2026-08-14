import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 08 — CAPSTONE: FROM RAW DATA TO DECISION-READY ANALYSIS
   ========================================================================== */

export const pythonDataAnalysisModule08:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m8-l1-capstone",
    title: "Frame the question and audit the data",
    subtitle: "A strong capstone begins by defining the decision, analytical unit and data limitations.",
    estimatedMinutes: 40,
    objectives: [
      "Translate a broad business question into measurable analysis objectives.",
      "Define the analytical unit.",
      "Create a data-quality audit plan.",
      "Prioritise issues that could change conclusions.",
    ],
    content: [
      {
        type: "paragraph",
        text: "The capstone uses a synthetic retail dataset with transactions, customers and regional information. The goal is not merely to produce charts; it is to answer a decision-relevant question with a transparent workflow.",
      },
      {
        type: "callout",
        title: "Capstone question",
        text: "Which regions and customer segments are driving revenue and margin, and where should the business investigate underperformance?",
      },
      {
        type: "heading",
        text: "Define the unit",
      },
      {
        type: "paragraph",
        text: "The transaction table has one row per order. Customer attributes live in a separate table. Mixing order-level and customer-level quantities without acknowledging the unit can produce misleading summaries.",
      },
      {
        type: "code-example",
        title: "Initial audit",
        code: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\naudit = {\n    \"rows\":\n        len(orders),\n    \"columns\":\n        orders.shape[1],\n    \"duplicate_orders\":\n        int(\n            orders[\n                \"order_id\"\n            ]\n            .duplicated()\n            .sum()\n        ),\n    \"missing_revenue\":\n        int(\n            orders[\n                \"revenue\"\n            ]\n            .isna()\n            .sum()\n        ),\n}\n\nprint(audit)",
      },
      {
        type: "python-data-lab",
        labKey: "capstone",
        title: "Capstone Decision Lab",
        description: "Choose a KPI and region filter to inspect how revenue, cost, margin and customer mix change across the synthetic case study.",
      },
      {
        type: "heading",
        text: "Prioritise consequential issues",
      },
      {
        type: "bullets",
        items: [
          "Broken identifiers can invalidate joins.",
          "Invalid revenue or cost affects every financial KPI.",
          "Missing segment labels affect subgroup comparisons.",
          "Date problems affect trend analysis.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Turn a vague request into objectives",
        question: "Management asks: 'Which areas are doing well?'",
        steps: [
          "Define 'doing well' using revenue, margin and growth.",
          "Specify whether the unit is transaction, customer or region.",
          "Choose the time period.",
          "Identify relevant comparison groups.",
          "State what the analysis cannot establish.",
        ],
        answer: "The question becomes measurable and reviewable rather than subjective.",
      },
    ],
    exercises: [
      {
        question: "Why define the analytical unit before summarising?",
        answer: "Because counts, averages and joins mean different things at transaction, customer and regional levels.",
      },
      {
        question: "Which data issue should be prioritised: inconsistent chart colour or duplicated order IDs?",
        answer: "Duplicated order IDs, because they can alter financial totals.",
      },
      {
        question: "Why state what the capstone cannot establish?",
        answer: "It prevents descriptive results from being interpreted beyond the available design and data.",
      },
    ],
    quiz: [
      {
        question: "The analytical unit is...",
        options: [
          "What one row represents",
          "The plotting library",
          "The file extension",
          "The final slide count",
        ],
        correctIndex: 0,
        explanation: "The unit determines how observations should be counted and summarised.",
      },
      {
        question: "Which issue most threatens revenue totals?",
        options: [
          "Duplicate order IDs",
          "Long column names",
          "Plot title wording",
          "Notebook theme",
        ],
        correctIndex: 0,
        explanation: "Duplicated transactions can double-count revenue.",
      },
      {
        question: "A good capstone question should be...",
        options: [
          "Measurable and linked to a decision",
          "As broad as possible",
          "Purely decorative",
          "Independent of the data structure",
        ],
        correctIndex: 0,
        explanation: "Clear objectives guide the workflow.",
      },
    ],
    summary: [
      "Capstone work begins with a measurable question.",
      "The analytical unit must be explicit.",
      "Data-quality issues should be prioritised by analytical consequence.",
      "Limitations should be defined before interpretation.",
    ],
    nextStep: "Next, we build a reusable cleaning, joining and KPI pipeline for the capstone data.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m8-l2-capstone",
    title: "Build the analysis pipeline",
    subtitle: "The capstone pipeline turns raw tables into validated analysis-ready data.",
    estimatedMinutes: 44,
    objectives: [
      "Combine cleaning functions into a pipeline.",
      "Merge multiple tables with cardinality validation.",
      "Create revenue, cost and margin KPIs.",
      "Add executable post-merge checks.",
    ],
    content: [
      {
        type: "paragraph",
        text: "A capstone pipeline should be rerunnable from raw inputs. Every transformation should have a name, and every merge should state the expected key relationship.",
      },
      {
        type: "code-example",
        title: "Validated analysis table",
        code: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\nanalysis = (\n    orders\n    .assign(\n        region=lambda x:\n            x[\"region\"]\n            .astype(\"string\")\n            .str.strip()\n            .str.title()\n    )\n    .merge(\n        customers,\n        on=\"customer_id\",\n        how=\"left\",\n        validate=\"many_to_one\",\n    )\n    .assign(\n        margin=lambda x:\n            x[\"revenue\"]\n            - x[\"cost\"],\n        margin_pct=lambda x:\n            100\n            * x[\"margin\"]\n            / x[\"revenue\"],\n    )\n)\n\nassert analysis[\n    \"order_id\"\n].is_unique\n\nprint(\n    analysis.head()\n)",
      },
      {
        type: "heading",
        text: "Reconcile totals",
      },
      {
        type: "paragraph",
        text: "After cleaning or joining, compare key totals and row counts with the previous stage. A successful script run is not evidence that records were preserved correctly.",
      },
      {
        type: "code-example",
        title: "Reconciliation check",
        code: "import numpy as np\nimport pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\ncustomers = pd.read_csv(\n    \"data/customers.csv\"\n)\n\nanalysis = orders.merge(\n    customers,\n    on=\"customer_id\",\n    how=\"left\",\n    validate=\"many_to_one\",\n)\n\nraw_total = orders[\n    \"revenue\"\n].sum()\n\nanalysis_total = analysis[\n    \"revenue\"\n].sum()\n\nassert np.isclose(\n    raw_total,\n    analysis_total,\n)\n\nprint(\n    \"Revenue reconciles:\",\n    round(\n        raw_total,\n        2,\n    ),\n)",
      },
      {
        type: "callout",
        title: "Pipeline principle",
        text: "Every transformation should either preserve an invariant or intentionally change it. Know which.",
      },
    ],
    workedExamples: [
      {
        title: "Customer merge",
        question: "Orders are many-to-one with customers.",
        steps: [
          "Check customer_id uniqueness in customers.",
          "Left join customers onto orders.",
          "Set validate='many_to_one'.",
          "Inspect missing customer matches.",
          "Confirm order row count is unchanged.",
        ],
        answer: "The joined dataset adds customer attributes without unintended row multiplication.",
      },
    ],
    exercises: [
      {
        question: "Why use validate='many_to_one' here?",
        answer: "Many orders can belong to one customer, while the customer table should contain one row per customer.",
      },
      {
        question: "Why reconcile revenue totals after a merge?",
        answer: "To detect unintended row multiplication or record loss.",
      },
      {
        question: "What should happen if revenue is zero before margin_pct is calculated?",
        answer: "The pipeline needs an explicit rule to avoid invalid division.",
      },
    ],
    quiz: [
      {
        question: "A capstone pipeline should ideally start from...",
        options: [
          "Raw input data",
          "A manually edited spreadsheet",
          "The final chart",
          "A screenshot",
        ],
        correctIndex: 0,
        explanation: "Reproducibility requires raw inputs and explicit transformations.",
      },
      {
        question: "Which join validation fits many orders to one customer record?",
        options: [
          "many_to_one",
          "one_to_many from the left perspective only",
          "many_to_many always",
          "one_to_one always",
        ],
        correctIndex: 0,
        explanation: "The left table has many orders per customer; the right should have one customer record.",
      },
      {
        question: "Why reconcile totals?",
        options: [
          "To detect unintended changes",
          "To improve chart colours",
          "To rename variables",
          "To parse dates",
        ],
        correctIndex: 0,
        explanation: "Reconciliation is a data-integrity check.",
      },
    ],
    summary: [
      "Capstone transformations should form a reproducible pipeline.",
      "Merges must enforce expected key relationships.",
      "KPI definitions should be explicit.",
      "Reconciliation checks protect against silent data loss or multiplication.",
    ],
    nextStep: "Next, we compare regions and segments using summaries and plots that support a defensible narrative.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m8-l3-capstone",
    title: "Visualise, compare and explain",
    subtitle: "The goal is not to show every chart; it is to build a coherent evidence chain.",
    estimatedMinutes: 44,
    objectives: [
      "Select KPIs aligned with the capstone question.",
      "Compare regions and segments with counts and rates.",
      "Create a concise visual narrative.",
      "Separate observed patterns from explanations.",
    ],
    content: [
      {
        type: "paragraph",
        text: "A strong analysis report uses a small set of complementary views: overall scale, profitability, customer mix and trend. Each chart should answer a specific part of the capstone question.",
      },
      {
        type: "code-example",
        title: "Region summary",
        code: "import pandas as pd\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\norders = orders.assign(\n    margin=\n        orders[\"revenue\"]\n        - orders[\"cost\"]\n)\n\nregion_summary = (\n    orders\n    .groupby(\n        \"region\"\n    )\n    .agg(\n        orders=(\n            \"order_id\",\n            \"size\",\n        ),\n        revenue=(\n            \"revenue\",\n            \"sum\",\n        ),\n        margin=(\n            \"margin\",\n            \"sum\",\n        ),\n        median_order=(\n            \"revenue\",\n            \"median\",\n        ),\n    )\n    .assign(\n        margin_pct=lambda x:\n            100\n            * x[\"margin\"]\n            / x[\"revenue\"]\n    )\n)\n\nprint(\n    region_summary.round(2)\n)",
      },
      {
        type: "heading",
        text: "Compare scale and efficiency",
      },
      {
        type: "paragraph",
        text: "Revenue can be high because a region is large, while margin percentage can be low because costs are high. Looking at both prevents one-dimensional ranking.",
      },
      {
        type: "code-example",
        title: "Plot one decision metric",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\norders = orders.assign(\n    margin=\n        orders[\"revenue\"]\n        - orders[\"cost\"]\n)\n\nregion_summary = (\n    orders\n    .groupby(\n        \"region\"\n    )\n    .agg(\n        revenue=(\n            \"revenue\",\n            \"sum\",\n        ),\n        margin=(\n            \"margin\",\n            \"sum\",\n        ),\n    )\n    .assign(\n        margin_pct=lambda x:\n            100\n            * x[\"margin\"]\n            / x[\"revenue\"]\n    )\n)\n\nax = (\n    region_summary\n    .sort_values(\n        \"margin_pct\"\n    )[\n        \"margin_pct\"\n    ]\n    .plot.barh()\n)\n\nax.set(\n    xlabel=\"Margin (%)\",\n    ylabel=\"Region\",\n    title=\"Margin percentage by region\",\n)\n\nplt.tight_layout()\nplt.show()",
      },
      {
        type: "callout",
        title: "Do not narrate the chart pixel by pixel",
        text: "Lead with the analytical takeaway, then provide the numbers that support it.",
      },
    ],
    workedExamples: [
      {
        title: "High revenue, low margin",
        question: "Region A leads total revenue but has the lowest margin percentage.",
        steps: [
          "Report both revenue and margin percentage.",
          "Check whether the pattern is driven by product or customer mix.",
          "Inspect cost components if available.",
          "Describe the pattern as a target for investigation rather than a causal conclusion.",
        ],
        answer: "The region is commercially important but less efficient on the observed margin measure, warranting deeper investigation.",
      },
    ],
    exercises: [
      {
        question: "Why report both total revenue and margin percentage?",
        answer: "They describe scale and profitability efficiency, which can rank regions differently.",
      },
      {
        question: "Why include order counts with regional KPIs?",
        answer: "Counts provide context for the amount of data and activity behind each summary.",
      },
      {
        question: "What wording is safer than 'Region causes low margin'?",
        answer: "'Region A has lower observed margin in this dataset and should be investigated further.'",
      },
    ],
    quiz: [
      {
        question: "A region with highest revenue must also have...",
        options: [
          "The highest margin percentage",
          "Not necessarily the highest margin percentage",
          "The most customers always",
          "No missing values",
        ],
        correctIndex: 1,
        explanation: "Scale and efficiency are different metrics.",
      },
      {
        question: "A strong visual narrative should...",
        options: [
          "Use a small set of purposeful charts",
          "Show every possible chart",
          "Avoid numbers",
          "Ignore data quality",
        ],
        correctIndex: 0,
        explanation: "Each chart should support a specific analytical question.",
      },
      {
        question: "Observed subgroup differences should initially be described as...",
        options: [
          "Associations/patterns",
          "Proven causal effects",
          "Random errors only",
          "Software bugs",
        ],
        correctIndex: 0,
        explanation: "Descriptive data do not establish causality by themselves.",
      },
    ],
    summary: [
      "Capstone KPIs should map directly to the decision question.",
      "Counts, totals and rates provide complementary perspectives.",
      "A few purposeful visuals are stronger than an exhaustive chart gallery.",
      "Interpretation should remain within the evidence supported by the data.",
    ],
    nextStep: "Finally, we package the analysis into a reproducible report another analyst can rerun and review.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m8-l4-capstone",
    title: "Produce a reproducible analysis report",
    subtitle: "A professional analysis ends with traceable evidence, limitations and reusable outputs.",
    estimatedMinutes: 46,
    objectives: [
      "Structure a concise analysis report.",
      "Document data, methods, assumptions and limitations.",
      "Export reusable tables and figures.",
      "Create a final reproducibility checklist.",
    ],
    content: [
      {
        type: "paragraph",
        text: "The final deliverable should let a reader understand the question, data, transformations, results and limitations without reading every line of code.",
      },
      {
        type: "heading",
        text: "A practical report structure",
      },
      {
        type: "bullets",
        items: [
          "Question and decision context.",
          "Data sources and analytical unit.",
          "Quality checks and exclusions.",
          "Key transformations and KPI definitions.",
          "Results with concise tables and figures.",
          "Sensitivity checks or unresolved issues.",
          "Limitations and next analytical steps.",
          "Reproducibility information.",
        ],
      },
      {
        type: "code-example",
        title: "Save derived outputs",
        code: "from pathlib import Path\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\nOUTPUT = Path(\n    \"outputs\"\n)\n\nOUTPUT.mkdir(\n    parents=True,\n    exist_ok=True,\n)\n\norders = pd.read_csv(\n    \"data/orders.csv\"\n)\n\norders = orders.assign(\n    margin=\n        orders[\"revenue\"]\n        - orders[\"cost\"]\n)\n\nregion_summary = (\n    orders\n    .groupby(\n        \"region\"\n    )\n    .agg(\n        revenue=(\n            \"revenue\",\n            \"sum\",\n        ),\n        margin=(\n            \"margin\",\n            \"sum\",\n        ),\n    )\n    .assign(\n        margin_pct=lambda x:\n            100\n            * x[\"margin\"]\n            / x[\"revenue\"]\n    )\n)\n\nregion_summary.to_csv(\n    OUTPUT\n    / \"region_summary.csv\"\n)\n\nfig, ax = plt.subplots()\n\nregion_summary[\n    \"margin_pct\"\n].sort_values().plot.barh(\n    ax=ax\n)\n\nax.set(\n    xlabel=\"Margin (%)\",\n    ylabel=\"Region\",\n)\n\nfig.tight_layout()\n\nfig.savefig(\n    OUTPUT\n    / \"margin_by_region.png\",\n    dpi=160,\n    bbox_inches=\"tight\",\n)\n\nplt.show()\n\nprint(\n    \"Saved outputs.\"\n)",
      },
      {
        type: "heading",
        text: "Final reproducibility check",
      },
      {
        type: "code-example",
        title: "Record package versions",
        code: "import pandas as pd\nimport numpy as np\nimport matplotlib\n\nprint(\n    \"pandas\",\n    pd.__version__,\n)\n\nprint(\n    \"numpy\",\n    np.__version__,\n)\n\nprint(\n    \"matplotlib\",\n    matplotlib.__version__,\n)",
      },
      {
        type: "callout",
        title: "Definition of done",
        text: "Another analyst should be able to rerun the project from documented inputs and obtain the same key outputs without manually repairing the notebook.",
      },
      {
        type: "python-data-lab",
        labKey: "capstone-report",
        title: "Capstone Report Lab",
        description: "Review a compact analysis summary and identify whether each statement is evidence, method, limitation or unsupported interpretation.",
      },
    ],
    workedExamples: [
      {
        title: "Turn analysis into a decision-ready conclusion",
        question: "The analysis finds one region with low margin and high order volume.",
        steps: [
          "State the observed metrics.",
          "Explain the data period and unit.",
          "Mention relevant data-quality limitations.",
          "Recommend a specific next investigation, such as cost mix or product composition.",
          "Do not claim a cause without evidence.",
        ],
        answer: "The report converts an observed pattern into a justified next action while preserving analytical uncertainty.",
      },
    ],
    exercises: [
      {
        question: "Why export summary tables as well as figures?",
        answer: "Tables preserve exact values and make review or downstream use easier.",
      },
      {
        question: "What should a limitations section contain?",
        answer: "Important data, design and analytical constraints that affect interpretation.",
      },
      {
        question: "What is the final reproducibility test?",
        answer: "A second analyst can rerun the documented workflow from inputs to key outputs.",
      },
    ],
    quiz: [
      {
        question: "Which belongs in a professional analysis report?",
        options: [
          "KPI definitions and limitations",
          "Only screenshots",
          "Undocumented manual edits",
          "Causal claims without evidence",
        ],
        correctIndex: 0,
        explanation: "Definitions and limitations are essential for interpretation.",
      },
      {
        question: "Why record package versions?",
        options: [
          "To support reproducibility",
          "To change the data",
          "To increase revenue",
          "To avoid functions",
        ],
        correctIndex: 0,
        explanation: "Library behaviour can change between versions.",
      },
      {
        question: "A good final recommendation should be...",
        options: [
          "Linked to observed evidence and limitations",
          "More certain than the data allow",
          "Unrelated to the question",
          "Based only on aesthetics",
        ],
        correctIndex: 0,
        explanation: "Recommendations should follow from the evidence and acknowledged uncertainty.",
      },
    ],
    summary: [
      "Professional analysis reports make methods and assumptions visible.",
      "Outputs should include reusable tables and figures.",
      "Limitations are part of the result, not an embarrassment to hide.",
      "Reproducibility means another analyst can rerun the workflow and recover the key outputs.",
      "The course culminates in a complete raw-data-to-report analytical workflow.",
    ],
    nextStep: "Complete the final assessment to demonstrate cumulative mastery of Python for Data Analysis.",
  },
];
