import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 06 — EXPLORATORY ANALYSIS AND VISUALISATION
   ========================================================================== */

export const pythonDataAnalysisModule06:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m6-l1-eda-visualisation",
    title: "Describing a dataset responsibly",
    subtitle: "Exploratory analysis should reveal structure, variation and data quality without overclaiming.",
    estimatedMinutes: 36,
    objectives: [
      "Create a structured descriptive overview.",
      "Choose summaries appropriate to variable type.",
      "Compare centre and spread robustly.",
      "Separate description from causal interpretation.",
    ],
    content: [
      {
        type: "paragraph",
        text: "EDA is a disciplined first look at distributions, relationships and anomalies. Its purpose is to understand what the data contain—not to turn every pattern into a causal story.",
      },
      {
        type: "code-example",
        title: "Compact descriptive audit",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nsummary = sales[\n    [\n        \"age\",\n        \"revenue\",\n    ]\n].describe(\n    percentiles=[\n        0.25,\n        0.5,\n        0.75,\n    ]\n)\n\nprint(\n    summary.round(2)\n)",
      },
      {
        type: "heading",
        text: "Match summary to variable",
      },
      {
        type: "bullets",
        items: [
          "Numeric continuous: count, median/mean, spread, quantiles, range.",
          "Categorical: counts and proportions.",
          "Dates: coverage period, gaps, frequency.",
          "Identifiers: uniqueness and missingness, not mean or median.",
        ],
      },
      {
        type: "python-data-lab",
        labKey: "eda",
        title: "EDA Lab",
        description: "Choose a variable and compare count, centre, spread and subgroup summaries on a small synthetic dataset.",
      },
      {
        type: "callout",
        title: "Description is not explanation",
        text: "A subgroup difference observed in EDA does not by itself establish why the difference exists.",
      },
    ],
    workedExamples: [
      {
        title: "Skewed revenue",
        question: "Revenue has a long right tail.",
        steps: [
          "Inspect median and quartiles.",
          "Compare mean with median.",
          "Inspect high values for validity.",
          "Use a distribution plot before choosing a summary.",
        ],
        answer: "Median and quantiles may describe typical revenue more robustly than the mean alone.",
      },
    ],
    exercises: [
      {
        question: "Why is a mean not meaningful for a customer ID?",
        answer: "The identifier's numeric encoding has no quantitative meaning.",
      },
      {
        question: "When can median be more robust than mean?",
        answer: "When a distribution is skewed or contains extreme values.",
      },
      {
        question: "What is the difference between describing an association and explaining it?",
        answer: "Description reports a pattern; explanation requires additional design, assumptions and evidence.",
      },
    ],
    quiz: [
      {
        question: "Which summary is often robust to a long right tail?",
        options: [
          "Median",
          "Maximum only",
          "ID mean",
          "File size",
        ],
        correctIndex: 0,
        explanation: "Median is less influenced by extreme values.",
      },
      {
        question: "EDA is primarily used to...",
        options: [
          "Understand structure and patterns",
          "Prove causality automatically",
          "Eliminate all uncertainty",
          "Replace data cleaning",
        ],
        correctIndex: 0,
        explanation: "EDA characterises the observed data.",
      },
      {
        question: "A customer ID should mainly be checked for...",
        options: [
          "Mean",
          "Uniqueness and missingness",
          "Standard deviation",
          "Normality",
        ],
        correctIndex: 1,
        explanation: "Identifiers are structural rather than quantitative variables.",
      },
    ],
    summary: [
      "EDA should be systematic and variable-aware.",
      "Robust summaries matter for skewed data.",
      "Identifiers require structural checks, not numeric summaries.",
      "Observed patterns should not be overinterpreted causally.",
    ],
    nextStep: "Next, we create clear plots with pandas and Matplotlib.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m6-l2-eda-visualisation",
    title: "Plotting with pandas and Matplotlib",
    subtitle: "A good plot makes one analytical point easier to see.",
    estimatedMinutes: 38,
    objectives: [
      "Create common plots with pandas and Matplotlib.",
      "Choose plots based on variable type and question.",
      "Label axes and units clearly.",
      "Avoid decorative complexity that weakens interpretation.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Visualisation is part of analysis, not decoration. Start by defining the comparison or pattern you want the viewer to understand.",
      },
      {
        type: "code-example",
        title: "A labelled histogram",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\nax = (\n    sales[\"revenue\"]\n    .plot.hist(\n        bins=20,\n        edgecolor=\"white\",\n    )\n)\n\nax.set(\n    title=\"Distribution of revenue\",\n    xlabel=\"Revenue (£)\",\n    ylabel=\"Number of records\",\n)\n\nplt.tight_layout()\nplt.show()",
      },
      {
        type: "heading",
        text: "Plot-question matching",
      },
      {
        type: "bullets",
        items: [
          "Histogram: distribution of one numeric variable.",
          "Bar chart: counts or summaries across categories.",
          "Scatter plot: relationship between two numeric variables.",
          "Line plot: ordered change, especially over time.",
        ],
      },
      {
        type: "callout",
        title: "Label units",
        text: "A y-axis called 'Value' is usually not enough. State what is measured and in which units.",
      },
      {
        type: "heading",
        text: "Use visual restraint",
      },
      {
        type: "paragraph",
        text: "Avoid 3D effects, unnecessary legends and excessive annotation. The data and comparison should dominate the visual hierarchy.",
      },
    ],
    workedExamples: [
      {
        title: "Choose a plot",
        question: "You want to examine how revenue varies with advertising spend.",
        steps: [
          "Both variables are numeric.",
          "Use a scatter plot.",
          "Label both axes with units.",
          "Inspect possible non-linearity and extreme points.",
        ],
        answer: "A scatter plot directly displays the two-variable relationship.",
      },
    ],
    exercises: [
      {
        question: "Which plot suits one numeric distribution?",
        answer: "A histogram.",
      },
      {
        question: "Which plot suits a numeric response against a numeric predictor?",
        answer: "A scatter plot.",
      },
      {
        question: "Why include units in axis labels?",
        answer: "They make magnitudes interpretable and prevent ambiguity.",
      },
    ],
    quiz: [
      {
        question: "Which plot is most suitable for two numeric variables?",
        options: [
          "Scatter plot",
          "Pie chart always",
          "Table only",
          "Histogram of labels",
        ],
        correctIndex: 0,
        explanation: "Scatter plots show paired numeric relationships.",
      },
      {
        question: "A line plot is particularly useful when the x-axis is...",
        options: [
          "Ordered, often time",
          "An unordered ID only",
          "A file path",
          "A Python function",
        ],
        correctIndex: 0,
        explanation: "Lines imply an ordered sequence.",
      },
      {
        question: "A strong plot title should usually...",
        options: [
          "State the analytical subject",
          "Say 'Chart 1' only",
          "Use no context",
          "Repeat every data point",
        ],
        correctIndex: 0,
        explanation: "Titles should orient the reader to the comparison or pattern.",
      },
    ],
    summary: [
      "Plots should answer a defined analytical question.",
      "Chart type should match variable type and structure.",
      "Labels need meaningful names and units.",
      "Simple visual design usually communicates better than decorative effects.",
    ],
    nextStep: "Next, we study distributions and relationships more critically.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m6-l3-eda-visualisation",
    title: "Distributions and relationships",
    subtitle: "Shape, spread and association are easier to understand when numerical and visual summaries agree.",
    estimatedMinutes: 38,
    objectives: [
      "Describe distribution shape and spread.",
      "Use scatter plots and grouped summaries together.",
      "Recognise non-linearity and influential observations.",
      "Avoid interpreting correlation as causation.",
    ],
    content: [
      {
        type: "paragraph",
        text: "A single summary statistic rarely captures a full distribution. Good EDA combines numerical summaries with plots and examines whether relationships differ across subgroups.",
      },
      {
        type: "code-example",
        title: "Correlation matrix for selected variables",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\ncorr = sales[\n    [\n        \"revenue\",\n        \"cost\",\n        \"ad_spend\",\n    ]\n].corr()\n\nprint(\n    corr.round(2)\n)",
      },
      {
        type: "heading",
        text: "Correlation is limited",
      },
      {
        type: "paragraph",
        text: "Correlation summarises a particular kind of association. It can miss non-linear relationships, be distorted by outliers and cannot establish causality.",
      },
      {
        type: "code-example",
        title: "Grouped numerical comparison",
        code: "import pandas as pd\n\nsales = pd.read_csv(\n    \"data/sales.csv\"\n)\n\ngrouped = (\n    sales\n    .groupby(\n        \"segment\"\n    )[\n        \"revenue\"\n    ]\n    .agg([\n        \"count\",\n        \"median\",\n        \"mean\",\n    ])\n)\n\nprint(\n    grouped.round(2)\n)",
      },
      {
        type: "callout",
        title: "Plot the relationship",
        text: "Before reporting a correlation coefficient, inspect the scatter plot and data quality.",
      },
    ],
    workedExamples: [
      {
        title: "High correlation with an outlier",
        question: "A scatter plot shows one extreme point driving an otherwise weak relationship.",
        steps: [
          "Verify the extreme point.",
          "Calculate correlation with and without it as a sensitivity check.",
          "Do not delete it solely to improve the result.",
          "Report how influential it is.",
        ],
        answer: "The analysis should show that the numerical association is sensitive to one observation.",
      },
    ],
    exercises: [
      {
        question: "Why can correlation miss a curved relationship?",
        answer: "Correlation mainly summarises linear association.",
      },
      {
        question: "What should you do before interpreting a large correlation?",
        answer: "Inspect a plot and validate influential observations.",
      },
      {
        question: "Does correlation establish causation?",
        answer: "No.",
      },
    ],
    quiz: [
      {
        question: "A correlation coefficient primarily summarises...",
        options: [
          "Linear association",
          "Causal effect",
          "Missingness only",
          "File size",
        ],
        correctIndex: 0,
        explanation: "Correlation is a measure of linear association.",
      },
      {
        question: "A single extreme point can...",
        options: [
          "Influence correlation strongly",
          "Never affect summaries",
          "Guarantee causality",
          "Only change labels",
        ],
        correctIndex: 0,
        explanation: "Correlation can be outlier-sensitive.",
      },
      {
        question: "Best practice before reporting correlation includes...",
        options: [
          "Inspecting a scatter plot",
          "Deleting all outliers",
          "Converting variables to strings",
          "Ignoring units",
        ],
        correctIndex: 0,
        explanation: "The plot reveals shape and influential observations.",
      },
    ],
    summary: [
      "Distribution shape requires more than one summary statistic.",
      "Relationships should be examined numerically and visually.",
      "Correlation can miss non-linearity and be outlier-sensitive.",
      "Association is not equivalent to causation.",
    ],
    nextStep: "Next, we assemble cleaning, summaries and plots into a repeatable EDA workflow.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m6-l4-eda-visualisation",
    title: "An end-to-end EDA workflow",
    subtitle: "Strong EDA connects data quality, transformation, summaries and communication in one traceable sequence.",
    estimatedMinutes: 40,
    objectives: [
      "Build a repeatable EDA checklist.",
      "Separate data-quality findings from substantive findings.",
      "Create a compact analysis output set.",
      "Write evidence-based exploratory conclusions.",
    ],
    content: [
      {
        type: "paragraph",
        text: "An EDA workflow should be repeatable across datasets while still adapting to the specific question. The goal is a concise record of what was checked, what changed and what patterns were found.",
      },
      {
        type: "bullets",
        items: [
          "Confirm analytical unit and row count.",
          "Audit identifiers, dtypes and missingness.",
          "Validate ranges and category values.",
          "Create documented derived variables.",
          "Summarise key variables overall and by relevant groups.",
          "Plot distributions and relationships.",
          "Record anomalies and sensitivity checks.",
          "Write conclusions that stay descriptive.",
        ],
      },
      {
        type: "code-example",
        title: "A simple pipeline outline",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\nraw = pd.read_csv(\n    \"data/raw_sales.csv\"\n)\n\ndef clean_columns(frame):\n    return frame.rename(\n        columns=lambda name:\n            name.strip()\n            .lower()\n            .replace(\n                \" \",\n                \"_\",\n            )\n    )\n\ndef validate_ranges(frame):\n    out = frame.copy()\n\n    out[\n        \"revenue_valid\"\n    ] = (\n        out[\"revenue\"]\n        .isna()\n        |\n        out[\"revenue\"]\n        .ge(0)\n    )\n\n    return out\n\ndef build_summary(frame):\n    return frame[\n        [\n            \"revenue\",\n            \"cost\",\n            \"margin\",\n        ]\n    ].describe()\n\ndef build_revenue_plot(frame):\n    fig, ax = plt.subplots()\n\n    frame[\n        \"revenue\"\n    ].dropna().plot.hist(\n        ax=ax,\n        bins=20,\n        edgecolor=\"white\",\n    )\n\n    ax.set(\n        xlabel=\"Revenue (£)\",\n        ylabel=\"Number of records\",\n    )\n\n    fig.tight_layout()\n\n    return fig\n\nclean = (\n    raw\n    .pipe(\n        clean_columns\n    )\n    .pipe(\n        validate_ranges\n    )\n    .assign(\n        margin=lambda x:\n            x[\"revenue\"]\n            - x[\"cost\"]\n    )\n)\n\nsummary = build_summary(\n    clean\n)\n\nfig = build_revenue_plot(\n    clean\n)\n\nprint(\n    summary.round(2)\n)\n\nplt.show()",
      },
      {
        type: "python-data-lab",
        labKey: "eda-workflow",
        title: "EDA Workflow Lab",
        description: "Move through a compact dataset audit and decide which issue should be handled before interpretation.",
      },
      {
        type: "callout",
        title: "Separate findings",
        text: "Keep a distinct record of data-quality findings and analytical findings. They answer different questions.",
      },
    ],
    workedExamples: [
      {
        title: "Communicate an EDA result",
        question: "North has higher median revenue than South.",
        steps: [
          "Report the observed medians and group sizes.",
          "Show the relevant distribution or grouped plot.",
          "State whether missingness or outliers differ by region.",
          "Avoid claiming region causes the difference.",
        ],
        answer: "A responsible exploratory conclusion describes the pattern and its data-quality context without causal language.",
      },
    ],
    exercises: [
      {
        question: "Why separate data-quality findings from analytical findings?",
        answer: "Quality findings describe reliability/issues in the data; analytical findings describe observed patterns.",
      },
      {
        question: "What is the benefit of .pipe in an analysis workflow?",
        answer: "It makes a sequence of named transformations explicit and composable.",
      },
      {
        question: "How should exploratory conclusions be worded?",
        answer: "As descriptions of observed data patterns, with limitations, not causal claims.",
      },
    ],
    quiz: [
      {
        question: "Which should happen before substantive interpretation?",
        options: [
          "Data-quality audit",
          "Final slide design only",
          "Deleting all missing values",
          "Publishing",
        ],
        correctIndex: 0,
        explanation: "Interpretation depends on data integrity.",
      },
      {
        question: "What does DataFrame.pipe support?",
        options: [
          "Composable transformation functions",
          "Only plotting",
          "Only joins",
          "Only file export",
        ],
        correctIndex: 0,
        explanation: "pipe applies functions within a readable workflow.",
      },
      {
        question: "EDA conclusions should generally be...",
        options: [
          "Descriptive and evidence-based",
          "Automatically causal",
          "Free of limitations",
          "Based on one statistic only",
        ],
        correctIndex: 0,
        explanation: "EDA characterises observed patterns.",
      },
    ],
    summary: [
      "EDA should follow a repeatable quality-to-interpretation sequence.",
      "Transformation steps should be traceable.",
      "Quality findings and analytical findings should be separated.",
      "Exploratory conclusions should remain descriptive and evidence-based.",
    ],
    nextStep: "Module 7 adds time-aware analysis and professional reproducibility practices.",
  },
];
