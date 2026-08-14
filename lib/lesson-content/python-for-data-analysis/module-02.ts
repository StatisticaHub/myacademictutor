import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   PYTHON FOR DATA ANALYSIS
   MODULE 02 — NUMPY FOR NUMERICAL WORK
   ========================================================================== */

export const pythonDataAnalysisModule02:
  LessonContent[] = [

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m2-l1-numpy",
    title: "Arrays and vectorisation",
    subtitle: "NumPy replaces many element-by-element loops with fast, expressive array operations.",
    estimatedMinutes: 34,
    objectives: [
      "Create and inspect NumPy arrays.",
      "Explain array shape, dtype and ndim.",
      "Use vectorised arithmetic.",
      "Contrast vectorisation with Python-level loops.",
    ],
    content: [
      {
        type: "paragraph",
        text: "NumPy arrays store homogeneous numerical data in a compact structure. They are the foundation for efficient numerical computing in Python and underpin much of pandas, SciPy and machine learning.",
      },
      {
        type: "code-example",
        title: "Create and inspect an array",
        code: "import numpy as np\n\nx = np.array([\n    2,\n    4,\n    6,\n    8,\n])\n\nprint(\n    \"shape:\",\n    x.shape,\n)\nprint(\n    \"dtype:\",\n    x.dtype,\n)\nprint(\n    \"mean:\",\n    x.mean(),\n)",
        output: "(4,)\nint64\n5.0",
      },
      {
        type: "heading",
        text: "Vectorised arithmetic",
      },
      {
        type: "paragraph",
        text: "Operations such as x * 2 or x - x.mean() apply to the whole array without writing a Python loop.",
      },
      {
        type: "code-example",
        title: "Centre values",
        code: "import numpy as np\n\nx = np.array([\n    2,\n    4,\n    6,\n    8,\n])\n\ncentred = (\n    x\n    - x.mean()\n)\n\nprint(centred)\nprint(\n    \"centred mean:\",\n    centred.mean(),\n)",
        output: "[-3. -1.  1.  3.]",
      },
      {
        type: "python-data-lab",
        labKey: "numpy",
        title: "Vectorisation Lab",
        description: "Adjust an array transformation and compare element-wise logic with a vectorised NumPy result.",
      },
      {
        type: "callout",
        title: "Why it matters",
        text: "Vectorised operations are usually shorter, clearer and faster than manual Python loops for numerical data.",
      },
    ],
    workedExamples: [
      {
        title: "Standardise a small vector",
        question: "Transform [10,12,14] by subtracting its mean.",
        steps: [
          "Create the array.",
          "Compute the mean 12.",
          "Subtract 12 from every element using one vectorised expression.",
        ],
        answer: "The centred vector is [-2, 0, 2].",
      },
    ],
    exercises: [
      {
        question: "What does array.shape describe?",
        answer: "The size of each array dimension.",
      },
      {
        question: "What does dtype describe?",
        answer: "The stored data type of array elements.",
      },
      {
        question: "Why is vectorisation useful?",
        answer: "It expresses whole-array operations clearly and uses efficient compiled numerical routines.",
      },
    ],
    quiz: [
      {
        question: "Which library provides ndarray?",
        options: [
          "pandas",
          "NumPy",
          "pathlib",
          "json",
        ],
        correctIndex: 1,
        explanation: "NumPy provides ndarray.",
      },
      {
        question: "What does x*2 do for a numeric NumPy array?",
        options: [
          "Duplicates the object reference",
          "Multiplies each element by 2",
          "Adds two rows",
          "Converts to a list",
        ],
        correctIndex: 1,
        explanation: "Arithmetic is vectorised element-wise.",
      },
      {
        question: "shape is used to inspect...",
        options: [
          "File size",
          "Array dimensions",
          "Variable names",
          "Missing labels",
        ],
        correctIndex: 1,
        explanation: "shape reports dimension sizes.",
      },
    ],
    summary: [
      "NumPy arrays are compact numerical containers.",
      "shape, ndim and dtype describe array structure.",
      "Arithmetic is vectorised across elements.",
      "Vectorisation is central to efficient numerical Python.",
    ],
    nextStep: "Next, we select subsets of arrays using indexing, Boolean masks and broadcasting.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m2-l2-numpy",
    title: "Indexing, masks and broadcasting",
    subtitle: "Powerful array analysis comes from selecting and combining values without manual loops.",
    estimatedMinutes: 34,
    objectives: [
      "Slice one- and two-dimensional arrays.",
      "Use Boolean masks to filter values.",
      "Explain broadcasting conceptually.",
      "Avoid shape-mismatch errors.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Indexing chooses positions; Boolean masks choose values satisfying a condition. Broadcasting lets NumPy combine compatible shapes without explicitly copying data.",
      },
      {
        type: "code-example",
        title: "Boolean masking",
        code: "import numpy as np\n\nscores = np.array([\n    48,\n    72,\n    65,\n    91,\n    54,\n])\n\npassed = scores[\n    scores >= 70\n]\n\nprint(passed)",
        output: "[72 91]",
      },
      {
        type: "heading",
        text: "Two-dimensional indexing",
      },
      {
        type: "code-example",
        title: "Rows and columns",
        code: "import numpy as np\n\nx = np.array([\n    [1, 10],\n    [2, 20],\n    [3, 30],\n])\n\nsecond_column = x[\n    :,\n    1,\n]\n\nprint(second_column)",
        output: "[10 20 30]",
      },
      {
        type: "heading",
        text: "Broadcasting",
      },
      {
        type: "paragraph",
        text: "When compatible, a smaller array can be applied across a larger array. Subtracting a column mean vector from every row of a matrix is a classic example.",
      },
      {
        type: "callout",
        title: "Shape first",
        text: "When an operation fails unexpectedly, inspect .shape for every participating array before changing the code.",
      },
    ],
    workedExamples: [
      {
        title: "Filter high values",
        question: "Keep values greater than the array mean.",
        steps: [
          "Compute mean = x.mean().",
          "Build mask x > x.mean().",
          "Use x[mask].",
        ],
        answer: "The result contains only elements above the mean.",
      },
    ],
    exercises: [
      {
        question: "What type of object is x>5 for a NumPy array?",
        answer: "A Boolean array with one True/False value per compared element.",
      },
      {
        question: "What does x[:,0] select in a 2D array?",
        answer: "All rows from the first column.",
      },
      {
        question: "What should you inspect first after a broadcasting error?",
        answer: "The shapes of the arrays involved.",
      },
    ],
    quiz: [
      {
        question: "A Boolean mask is primarily used to...",
        options: [
          "Rename variables",
          "Filter elements by condition",
          "Read files",
          "Sort dictionaries",
        ],
        correctIndex: 1,
        explanation: "Masks select elements where the condition is True.",
      },
      {
        question: "What does x[:, 1] mean for a matrix?",
        options: [
          "Second row",
          "All rows, second column",
          "First column",
          "Every second element only",
        ],
        correctIndex: 1,
        explanation: "Colon selects all rows and 1 selects the second column.",
      },
      {
        question: "Broadcasting concerns...",
        options: [
          "Compatible array shapes",
          "File paths",
          "Plot labels",
          "Python package installation",
        ],
        correctIndex: 0,
        explanation: "Broadcasting defines how operations extend across compatible shapes.",
      },
    ],
    summary: [
      "Indexing selects array positions.",
      "Boolean masks select values by logical condition.",
      "Broadcasting combines compatible shapes efficiently.",
      "Shape inspection is the first debugging step for array operations.",
    ],
    nextStep: "Next, we calculate robust numerical summaries and handle missing values in arrays.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m2-l3-numpy",
    title: "Numerical summaries and missing values",
    subtitle: "Summary functions are only useful when you understand how missing values and dimensions affect them.",
    estimatedMinutes: 32,
    objectives: [
      "Compute array summaries along selected axes.",
      "Recognise np.nan and its effects.",
      "Use NaN-aware summary functions.",
      "Interpret axis arguments correctly.",
    ],
    content: [
      {
        type: "paragraph",
        text: "NumPy can summarise an entire array or operate along rows or columns. The axis argument is therefore analytical, not merely syntactic.",
      },
      {
        type: "code-example",
        title: "Column means",
        code: "import numpy as np\n\nx = np.array([\n    [1, 10],\n    [3, 20],\n    [5, 30],\n])\n\ncolumn_means = x.mean(\n    axis=0\n)\n\nprint(column_means)",
        output: "[ 3. 20.]",
      },
      {
        type: "heading",
        text: "Missing numerical values",
      },
      {
        type: "paragraph",
        text: "np.nan represents a missing floating-point value. Ordinary means can propagate NaN, while functions such as np.nanmean ignore NaN values.",
      },
      {
        type: "code-example",
        title: "NaN-aware summary",
        code: "import numpy as np\n\nx = np.array([\n    2.0,\n    np.nan,\n    6.0,\n])\n\nprint(\n    \"ordinary mean:\",\n    np.mean(x),\n)\n\nprint(\n    \"NaN-aware mean:\",\n    np.nanmean(x),\n)",
        output: "nan\n4.0",
      },
      {
        type: "callout",
        title: "Ignoring is a decision",
        text: "Using nanmean is not the same as solving missing-data problems. You still need to understand why values are missing and whether exclusion is appropriate.",
      },
      {
        type: "heading",
        text: "Axis intuition",
      },
      {
        type: "bullets",
        items: [
          "axis=0 collapses rows and returns one result per column.",
          "axis=1 collapses columns and returns one result per row.",
          "No axis usually summarises all elements.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Row totals",
        question: "A 3×2 matrix contains two measurements per person. How do you get one total per person?",
        steps: [
          "People are rows.",
          "You need to collapse the columns.",
          "Use sum(axis=1).",
        ],
        answer: "axis=1 produces one total for each row.",
      },
    ],
    exercises: [
      {
        question: "Why might np.mean return nan?",
        answer: "Because at least one array value is NaN and the ordinary mean propagates it.",
      },
      {
        question: "What does np.nanmean do?",
        answer: "Computes the mean while ignoring NaN values.",
      },
      {
        question: "What does axis=0 usually return for a 2D table-like array?",
        answer: "One summary per column.",
      },
    ],
    quiz: [
      {
        question: "Which function ignores NaN values when calculating a mean?",
        options: [
          "np.mean",
          "np.nanmean",
          "np.array",
          "np.shape",
        ],
        correctIndex: 1,
        explanation: "np.nanmean is NaN-aware.",
      },
      {
        question: "For a rows-by-columns matrix, mean(axis=0) returns...",
        options: [
          "One mean per column",
          "One mean per row",
          "One global mean only",
          "No result",
        ],
        correctIndex: 0,
        explanation: "axis=0 collapses rows.",
      },
      {
        question: "Using nanmean should be treated as...",
        options: [
          "A complete missing-data strategy",
          "A numerical operation whose analytical appropriateness still needs justification",
          "Always wrong",
          "Only a plotting command",
        ],
        correctIndex: 1,
        explanation: "The missing-data mechanism still matters.",
      },
    ],
    summary: [
      "NumPy summaries can operate globally or by axis.",
      "np.nan can propagate through ordinary numerical functions.",
      "NaN-aware functions exist but do not replace missing-data reasoning.",
      "Axis choices should match the analytical unit you want to summarise.",
    ],
    nextStep: "Next, we use NumPy's random generator for reproducible simulation.",
  },

  {
    courseSlug: "python-for-data-analysis",
    lessonKey: "m2-l4-numpy",
    title: "Randomness and simulation",
    subtitle: "Reproducible random-number generation supports simulation, resampling and testing.",
    estimatedMinutes: 34,
    objectives: [
      "Create a NumPy random generator.",
      "Use a fixed seed for reproducibility.",
      "Generate random samples from simple distributions.",
      "Use simulation to check analytical intuition.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Simulation is useful for understanding variability, testing code and creating realistic examples. Reproducibility requires explicit control of the random generator.",
      },
      {
        type: "code-example",
        title: "Modern NumPy random generator",
        code: "import numpy as np\n\nrng = np.random.default_rng(\n    2026\n)\n\nsample = rng.normal(\n    loc=100,\n    scale=15,\n    size=5,\n)\n\nprint(\n    sample.round(1)\n)",
        note: "Using a fixed seed makes the generated sequence reproducible.",
      },
      {
        type: "heading",
        text: "Why a generator object?",
      },
      {
        type: "paragraph",
        text: "A dedicated generator makes random state explicit and avoids hidden reliance on global random state.",
      },
      {
        type: "code-example",
        title: "Simulate sample means",
        code: "import numpy as np\n\nrng = np.random.default_rng(\n    2026\n)\n\nmeans = np.array([\n    rng.normal(\n        100,\n        15,\n        size=30,\n    ).mean()\n    for _\n    in range(1000)\n])\n\nprint(\n    \"mean of means:\",\n    means.mean().round(2),\n)\n\nprint(\n    \"SD of means:\",\n    means.std().round(2),\n)",
      },
      {
        type: "callout",
        title: "Reproducibility rule",
        text: "Set a seed for teaching, testing and reproducible analysis. Do not repeatedly reset the seed inside a simulation loop.",
      },
      {
        type: "heading",
        text: "Simulation is a model",
      },
      {
        type: "paragraph",
        text: "Random output reflects the distributional assumptions you supplied. A simulation can clarify consequences of assumptions; it cannot prove those assumptions are correct.",
      },
    ],
    workedExamples: [
      {
        title: "Reproducible test data",
        question: "You need synthetic ages for a unit test.",
        steps: [
          "Create rng=np.random.default_rng(123).",
          "Generate the required sample.",
          "Keep the seed fixed in the test.",
          "Assert properties of the output rather than eyeballing it.",
        ],
        answer: "The test receives the same pseudo-random data every run.",
      },
    ],
    exercises: [
      {
        question: "Why use a fixed seed in a reproducible example?",
        answer: "It makes the pseudo-random sequence repeatable.",
      },
      {
        question: "Why should you avoid resetting the seed inside every loop iteration?",
        answer: "It can repeatedly generate the same values rather than independent draws from the generator sequence.",
      },
      {
        question: "Does simulation validate a distributional assumption?",
        answer: "No. It shows consequences under the assumed model.",
      },
    ],
    quiz: [
      {
        question: "Which object is recommended for modern NumPy random generation?",
        options: [
          "np.random.default_rng()",
          "open()",
          "pd.Series()",
          "Path()",
        ],
        correctIndex: 0,
        explanation: "default_rng creates a Generator.",
      },
      {
        question: "A fixed seed mainly supports...",
        options: [
          "Faster internet",
          "Reproducibility",
          "Automatic normality",
          "Missing-value removal",
        ],
        correctIndex: 1,
        explanation: "The pseudo-random sequence becomes repeatable.",
      },
      {
        question: "Simulation results depend on...",
        options: [
          "Only Python version",
          "The assumptions and distributions used to generate data",
          "Plot colour only",
          "Column names only",
        ],
        correctIndex: 1,
        explanation: "Simulation reflects the chosen data-generating model.",
      },
    ],
    summary: [
      "NumPy generators make random state explicit.",
      "Seeds support reproducible pseudo-random output.",
      "Simulation is useful for learning, testing and uncertainty exploration.",
      "Simulation reflects assumptions rather than validating them.",
    ],
    nextStep: "Module 3 moves from numerical arrays to labelled tabular data with pandas.",
  },
];
