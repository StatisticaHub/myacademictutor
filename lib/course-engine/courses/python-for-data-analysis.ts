import type {
  CourseEngineDefinition,
} from "../types";


export const pythonForDataAnalysisCourse:
  CourseEngineDefinition = {

  slug:
    "python-for-data-analysis",

  version:
    1,

  title:
    "Python for Data Analysis",

  subject:
    "data-science",

  level:
    "undergraduate",

  status:
    "draft",

  modules: [

    {
      key: "module-01",
      title: "Python foundations for analysis",
      checkpointKey: "module-01-checkpoint",

      lessons: [
        {
          key: "m1-l1-python-foundations",
          title: "The data-analysis workflow in Python",
          contentKey: "m1-l1-python-foundations",
          estimatedMinutes: 30,
          labKey: "workflow",
        },
        {
          key: "m1-l2-python-foundations",
          title: "Variables, types and collections",
          contentKey: "m1-l2-python-foundations",
          estimatedMinutes: 32,
        },
        {
          key: "m1-l3-python-foundations",
          title: "Control flow and functions",
          contentKey: "m1-l3-python-foundations",
          estimatedMinutes: 34,
        },
        {
          key: "m1-l4-python-foundations",
          title: "Writing analysis-ready Python",
          contentKey: "m1-l4-python-foundations",
          estimatedMinutes: 32,
        },
      ],
    },

    {
      key: "module-02",
      title: "NumPy for numerical work",
      checkpointKey: "module-02-checkpoint",

      lessons: [
        {
          key: "m2-l1-numpy",
          title: "Arrays and vectorisation",
          contentKey: "m2-l1-numpy",
          estimatedMinutes: 34,
          labKey: "numpy",
        },
        {
          key: "m2-l2-numpy",
          title: "Indexing, masks and broadcasting",
          contentKey: "m2-l2-numpy",
          estimatedMinutes: 34,
        },
        {
          key: "m2-l3-numpy",
          title: "Numerical summaries and missing values",
          contentKey: "m2-l3-numpy",
          estimatedMinutes: 32,
        },
        {
          key: "m2-l4-numpy",
          title: "Randomness and simulation",
          contentKey: "m2-l4-numpy",
          estimatedMinutes: 34,
        },
      ],
    },

    {
      key: "module-03",
      title: "pandas foundations",
      checkpointKey: "module-03-checkpoint",

      lessons: [
        {
          key: "m3-l1-pandas-foundations",
          title: "Series and DataFrames",
          contentKey: "m3-l1-pandas-foundations",
          estimatedMinutes: 34,
          labKey: "dataframe",
        },
        {
          key: "m3-l2-pandas-foundations",
          title: "Selecting, filtering and sorting",
          contentKey: "m3-l2-pandas-foundations",
          estimatedMinutes: 34,
        },
        {
          key: "m3-l3-pandas-foundations",
          title: "Creating and transforming columns",
          contentKey: "m3-l3-pandas-foundations",
          estimatedMinutes: 34,
        },
        {
          key: "m3-l4-pandas-foundations",
          title: "Import, export and data types",
          contentKey: "m3-l4-pandas-foundations",
          estimatedMinutes: 34,
        },
      ],
    },

    {
      key: "module-04",
      title: "Cleaning and reshaping data",
      checkpointKey: "module-04-checkpoint",

      lessons: [
        {
          key: "m4-l1-data-cleaning",
          title: "Missing data in practice",
          contentKey: "m4-l1-data-cleaning",
          estimatedMinutes: 36,
          labKey: "missing",
        },
        {
          key: "m4-l2-data-cleaning",
          title: "Strings, categories and labels",
          contentKey: "m4-l2-data-cleaning",
          estimatedMinutes: 34,
        },
        {
          key: "m4-l3-data-cleaning",
          title: "Duplicates, outliers and validation",
          contentKey: "m4-l3-data-cleaning",
          estimatedMinutes: 36,
          labKey: "quality",
        },
        {
          key: "m4-l4-data-cleaning",
          title: "Tidy data and reshaping",
          contentKey: "m4-l4-data-cleaning",
          estimatedMinutes: 36,
        },
      ],
    },

    {
      key: "module-05",
      title: "Grouping and combining data",
      checkpointKey: "module-05-checkpoint",

      lessons: [
        {
          key: "m5-l1-grouping-combining",
          title: "GroupBy and aggregation",
          contentKey: "m5-l1-grouping-combining",
          estimatedMinutes: 36,
          labKey: "groupby",
        },
        {
          key: "m5-l2-grouping-combining",
          title: "Pivot tables and cross-tabulations",
          contentKey: "m5-l2-grouping-combining",
          estimatedMinutes: 34,
        },
        {
          key: "m5-l3-grouping-combining",
          title: "Merging and joining tables",
          contentKey: "m5-l3-grouping-combining",
          estimatedMinutes: 38,
          labKey: "merge",
        },
        {
          key: "m5-l4-grouping-combining",
          title: "Transform, apply and window operations",
          contentKey: "m5-l4-grouping-combining",
          estimatedMinutes: 38,
        },
      ],
    },

    {
      key: "module-06",
      title: "Exploratory analysis and visualisation",
      checkpointKey: "module-06-checkpoint",

      lessons: [
        {
          key: "m6-l1-eda-visualisation",
          title: "Describing a dataset responsibly",
          contentKey: "m6-l1-eda-visualisation",
          estimatedMinutes: 36,
          labKey: "eda",
        },
        {
          key: "m6-l2-eda-visualisation",
          title: "Plotting with pandas and Matplotlib",
          contentKey: "m6-l2-eda-visualisation",
          estimatedMinutes: 38,
        },
        {
          key: "m6-l3-eda-visualisation",
          title: "Distributions and relationships",
          contentKey: "m6-l3-eda-visualisation",
          estimatedMinutes: 38,
        },
        {
          key: "m6-l4-eda-visualisation",
          title: "An end-to-end EDA workflow",
          contentKey: "m6-l4-eda-visualisation",
          estimatedMinutes: 40,
          labKey: "eda-workflow",
        },
      ],
    },

    {
      key: "module-07",
      title: "Time series and reproducible workflows",
      checkpointKey: "module-07-checkpoint",

      lessons: [
        {
          key: "m7-l1-time-reproducibility",
          title: "Dates, times and time indexes",
          contentKey: "m7-l1-time-reproducibility",
          estimatedMinutes: 36,
          labKey: "time",
        },
        {
          key: "m7-l2-time-reproducibility",
          title: "Resampling and rolling summaries",
          contentKey: "m7-l2-time-reproducibility",
          estimatedMinutes: 38,
        },
        {
          key: "m7-l3-time-reproducibility",
          title: "Reusable analysis pipelines",
          contentKey: "m7-l3-time-reproducibility",
          estimatedMinutes: 38,
        },
        {
          key: "m7-l4-time-reproducibility",
          title: "Debugging, testing and performance",
          contentKey: "m7-l4-time-reproducibility",
          estimatedMinutes: 38,
        },
      ],
    },

    {
      key: "module-08",
      title: "Capstone: from raw data to decision-ready analysis",
      checkpointKey: "module-08-checkpoint",

      lessons: [
        {
          key: "m8-l1-capstone",
          title: "Frame the question and audit the data",
          contentKey: "m8-l1-capstone",
          estimatedMinutes: 40,
          labKey: "capstone",
        },
        {
          key: "m8-l2-capstone",
          title: "Build the analysis pipeline",
          contentKey: "m8-l2-capstone",
          estimatedMinutes: 44,
        },
        {
          key: "m8-l3-capstone",
          title: "Visualise, compare and explain",
          contentKey: "m8-l3-capstone",
          estimatedMinutes: 44,
        },
        {
          key: "m8-l4-capstone",
          title: "Produce a reproducible analysis report",
          contentKey: "m8-l4-capstone",
          estimatedMinutes: 46,
          labKey: "capstone-report",
        },
      ],
    },

  ],

  completion: {
    requireAllLessons:
      true,

    requireAllCheckpoints:
      true,

    requireFinalAssessment:
      true,

    finalAssessmentKey:
      "final-assessment",

    certificateEnabled:
      true,
  },
};
