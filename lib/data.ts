/* ==========================================================================
   MY ACADEMIC TUTOR
   Central Academic Content & Navigation Data
   ========================================================================== */


/* ==========================================================================
   TYPES
   ========================================================================== */

export type Accent =
  | "blue"
  | "violet"
  | "teal"
  | "green"
  | "orange";


export type LevelSlug =
  | "high-school"
  | "undergraduate"
  | "postgraduate"
  | "casual";


export type SubjectSlug =
  | "statistics"
  | "mathematics"
  | "data-science"
  | "bioinformatics"
  | "computer-science";


export type Subject = {
  slug: SubjectSlug;
  name: string;
  symbol: string;
  eyebrow: string;
  short: string;
  description: string;
  accent: Accent;
  topics: string[];
  outcomes: string[];
};


export type Level = {
  slug: LevelSlug;
  name: string;
  kicker: string;
  copy: string;
};


export type Course = {
  slug: string;
  title: string;
  subject: SubjectSlug;
  level: LevelSlug;
  duration: string;
  lessons: number;
  description: string;
  skills: string[];
  modules: string[];
  featured?: boolean;
};


export type Pathway = {
  slug: string;

  /*
   * Both are kept deliberately.
   * Some current components use title, while the new homepage uses name.
   */
  title: string;
  name: string;

  tag: string;
  subject: string;
  duration: string;
  description: string;
  steps: string[];
};


export type Country = {
  slug: string;
  name: string;
  flag: string;
  systems: string[];
  copy: string;
};


/* ==========================================================================
   SUBJECTS
   ========================================================================== */

export const subjects: Subject[] = [
  {
    slug: "statistics",
    name: "Statistics",
    symbol: "σ",
    eyebrow: "Reason with evidence",

    short:
      "Probability, inference, modelling and real-world decision making.",

    description:
      "Build statistical intuition from first principles and progress to modern modelling, causal inference, survival analysis, epidemiology and research applications.",

    accent: "blue",

    topics: [
      "Probability",
      "Descriptive statistics",
      "Statistical inference",
      "Regression",
      "ANOVA",
      "Experimental design",
      "Bayesian statistics",
      "Survival analysis",
      "Longitudinal data",
      "Causal inference",
      "Time series",
      "Biostatistics",
      "Epidemiology",
      "R",
      "Python",
    ],

    outcomes: [
      "Interpret data with confidence",
      "Choose and justify statistical methods",
      "Build reproducible analyses",
      "Understand uncertainty and evidence",
      "Communicate statistical results clearly",
      "Progress from foundational to advanced methods",
    ],
  },

  {
    slug: "mathematics",
    name: "Mathematics",
    symbol: "∑",
    eyebrow: "Build the foundations",

    short:
      "From algebra and calculus to proof, linear algebra and optimisation.",

    description:
      "Develop the mathematical language behind science, statistics, engineering and computing through visual explanations, rigorous reasoning and purposeful practice.",

    accent: "violet",

    topics: [
      "Arithmetic",
      "Algebra",
      "Geometry",
      "Trigonometry",
      "Functions",
      "Calculus",
      "Linear algebra",
      "Differential equations",
      "Discrete mathematics",
      "Probability",
      "Real analysis",
      "Complex analysis",
      "Optimisation",
      "Numerical methods",
      "Mathematical proofs",
    ],

    outcomes: [
      "Strengthen mathematical intuition",
      "Solve unfamiliar quantitative problems",
      "Understand mathematical notation confidently",
      "Write clear mathematical arguments",
      "Connect mathematics to statistics and computing",
      "Prepare for advanced quantitative study",
    ],
  },

  {
    slug: "data-science",
    name: "Data Science",
    symbol: "◉",
    eyebrow: "Turn data into insight",

    short:
      "Python, R, SQL, visualisation, machine learning and real projects.",

    description:
      "Learn the complete data workflow—from cleaning and exploration to modelling, visualisation, machine learning, communication and reproducible portfolio projects.",

    accent: "teal",

    topics: [
      "Python",
      "R",
      "SQL",
      "Excel",
      "Data cleaning",
      "Exploratory data analysis",
      "Data visualisation",
      "Machine learning",
      "Time series",
      "Deep learning",
      "Natural language processing",
      "Model evaluation",
      "Reproducibility",
      "Portfolio projects",
    ],

    outcomes: [
      "Work confidently with messy data",
      "Explore and visualise datasets",
      "Build and evaluate predictive models",
      "Use Python, R and SQL effectively",
      "Communicate findings clearly",
      "Deliver end-to-end data projects",
    ],
  },

  {
    slug: "bioinformatics",
    name: "Bioinformatics",
    symbol: "⌬",
    eyebrow: "Decode biological data",

    short:
      "Genomics, transcriptomics, single-cell, spatial and computational biology.",

    description:
      "Bridge biology, statistics and computing with practical workflows for sequencing data, genomics, transcriptomics, single-cell analysis and modern multi-omics research.",

    accent: "green",

    topics: [
      "Sequence analysis",
      "Biological databases",
      "Linux",
      "R for biology",
      "Python for biology",
      "Genomics",
      "Next-generation sequencing",
      "Bulk RNA-seq",
      "Single-cell RNA-seq",
      "Spatial transcriptomics",
      "GWAS",
      "Statistical genomics",
      "Epigenomics",
      "Bioconductor",
      "Seurat",
      "Reproducible workflows",
    ],

    outcomes: [
      "Understand biological data structures",
      "Use computational biology tools confidently",
      "Run reproducible omics workflows",
      "Interpret high-dimensional biological data",
      "Create publication-ready analysis outputs",
      "Connect statistics, biology and programming",
    ],
  },

  {
    slug: "computer-science",
    name: "Computer Science",
    symbol: "</>",
    eyebrow: "Think computationally",

    short:
      "Programming, algorithms, software, databases, systems and artificial intelligence.",

    description:
      "Learn to program, reason about algorithms and understand the systems that power modern computing—from beginner foundations to advanced software and artificial intelligence.",

    accent: "orange",

    topics: [
      "Programming",
      "Python",
      "Object-oriented programming",
      "Data structures",
      "Algorithms",
      "Discrete mathematics",
      "Databases",
      "Operating systems",
      "Computer networks",
      "Software engineering",
      "Web development",
      "Git & GitHub",
      "Artificial intelligence",
      "Machine learning",
      "Distributed systems",
    ],

    outcomes: [
      "Write reliable programs",
      "Think computationally",
      "Reason about algorithmic efficiency",
      "Understand core computer systems",
      "Design maintainable software",
      "Build practical programming projects",
    ],
  },
];


/* ==========================================================================
   LEARNING LEVELS
   ========================================================================== */

export const levels: Level[] = [
  {
    slug: "high-school",
    name: "High School",
    kicker: "Build confidence early",

    copy:
      "Clear explanations, exam-ready practice and curriculum-aware learning for GCSE, A-Level, AP, IB and equivalent programmes.",
  },

  {
    slug: "undergraduate",
    name: "Undergraduate",
    kicker: "Master university modules",

    copy:
      "Structured learning for lectures, problem sheets, assignments, examinations and deeper conceptual understanding at university level.",
  },

  {
    slug: "postgraduate",
    name: "Postgraduate",
    kicker: "Go beyond the textbook",

    copy:
      "Advanced methods, specialist topics, research workflows and technical support for MSc, MRes, doctoral and professional study.",
  },

  {
    slug: "casual",
    name: "Learn for Yourself",
    kicker: "Skills without the pressure",

    copy:
      "Career development, curiosity, refreshers and practical projects—learn useful quantitative and computational skills at your own pace.",
  },
];


/* ==========================================================================
   COURSES
   ========================================================================== */

export const courses: Course[] = [

  /* ========================================================================
     STATISTICS
     ======================================================================== */

  {
    slug: "statistics-foundations",
    title: "Statistics Foundations",
    subject: "statistics",
    level: "high-school",
    duration: "6 weeks",
    lessons: 26,
    featured: true,

    description:
      "A clear and intuitive introduction to data, probability, distributions, sampling, confidence intervals and statistical reasoning.",

    skills: [
      "Descriptive statistics",
      "Probability",
      "Sampling",
      "Confidence intervals",
    ],

    modules: [
      "Thinking with data",
      "Describing distributions",
      "Probability essentials",
      "Random variables",
      "Sampling and uncertainty",
      "Confidence intervals",
      "Hypothesis testing",
    ],
  },

  {
    slug: "probability-data",
    title: "Probability & Data",
    subject: "statistics",
    level: "high-school",
    duration: "5 weeks",
    lessons: 22,

    description:
      "Develop confidence with probability rules, conditional probability, random variables and data interpretation.",

    skills: [
      "Probability rules",
      "Conditional probability",
      "Expected values",
      "Data interpretation",
    ],

    modules: [
      "Probability language",
      "Counting and probability",
      "Conditional probability",
      "Random variables",
      "Expected value",
      "Probability in real problems",
    ],
  },

  {
    slug: "ap-statistics",
    title: "AP Statistics",
    subject: "statistics",
    level: "high-school",
    duration: "10 weeks",
    lessons: 44,

    description:
      "A structured AP Statistics pathway covering exploratory analysis, probability, sampling, inference and regression.",

    skills: [
      "AP Statistics",
      "Inference",
      "Regression",
      "Exam problem solving",
    ],

    modules: [
      "Exploring one-variable data",
      "Exploring two-variable data",
      "Collecting data",
      "Probability",
      "Sampling distributions",
      "Inference for proportions",
      "Inference for means",
      "Chi-square methods",
      "Regression inference",
      "AP exam review",
    ],
  },

  {
    slug: "a-level-statistics",
    title: "A-Level Statistics",
    subject: "statistics",
    level: "high-school",
    duration: "9 weeks",
    lessons: 38,

    description:
      "A focused route through the statistical ideas commonly encountered within A-Level Mathematics.",

    skills: [
      "Sampling",
      "Probability distributions",
      "Hypothesis testing",
      "Data interpretation",
    ],

    modules: [
      "Statistical sampling",
      "Data presentation",
      "Probability",
      "Binomial distributions",
      "Normal distributions",
      "Hypothesis testing",
      "Correlation and regression",
      "Exam-style applications",
    ],
  },

  {
    slug: "statistical-inference",
    title: "Statistical Inference",
    subject: "statistics",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Understand estimation, uncertainty, likelihood, confidence intervals and hypothesis testing from first principles.",

    skills: [
      "Estimation",
      "Likelihood",
      "Confidence intervals",
      "Hypothesis testing",
    ],

    modules: [
      "Populations and samples",
      "Estimators",
      "Sampling distributions",
      "Likelihood",
      "Confidence intervals",
      "Hypothesis testing",
      "Interpretation and limitations",
    ],
  },

  {
    slug: "regression-modelling",
    title: "Regression & Statistical Modelling",
    subject: "statistics",
    level: "undergraduate",
    duration: "8 weeks",
    lessons: 34,
    featured: true,

    description:
      "Move from simple linear regression to multivariable models, interactions, diagnostics and practical interpretation.",

    skills: [
      "Linear regression",
      "Multiple regression",
      "Model diagnostics",
      "Confounding",
      "Prediction",
    ],

    modules: [
      "Regression intuition",
      "Simple linear regression",
      "Multiple regression",
      "Confounding and adjustment",
      "Interactions",
      "Model diagnostics",
      "Prediction",
      "Communicating regression results",
    ],
  },

  {
    slug: "anova-experimental-design",
    title: "ANOVA & Experimental Design",
    subject: "statistics",
    level: "undergraduate",
    duration: "6 weeks",
    lessons: 27,

    description:
      "Learn how experiments are designed, compared and analysed using analysis of variance and related methods.",

    skills: [
      "ANOVA",
      "Experimental design",
      "Factorial designs",
      "Multiple comparisons",
    ],

    modules: [
      "Principles of experimentation",
      "One-way ANOVA",
      "ANOVA assumptions",
      "Multiple comparisons",
      "Two-way ANOVA",
      "Factorial designs",
      "Reporting experimental results",
    ],
  },

  {
    slug: "statistical-computing-r",
    title: "Statistical Computing with R",
    subject: "statistics",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 32,

    description:
      "Learn R for statistical analysis, reproducible workflows, data visualisation and applied modelling.",

    skills: [
      "R",
      "Data manipulation",
      "Statistical modelling",
      "Reproducible analysis",
    ],

    modules: [
      "R foundations",
      "Data structures",
      "Data manipulation",
      "Visualisation",
      "Statistical tests",
      "Regression models",
      "Reproducible reports",
    ],
  },

  {
    slug: "bayesian-statistics",
    title: "Bayesian Statistics",
    subject: "statistics",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 34,

    description:
      "Develop intuition for priors, likelihoods, posterior distributions, Bayesian modelling and decision making.",

    skills: [
      "Bayesian inference",
      "Prior specification",
      "Posterior inference",
      "Bayesian modelling",
    ],

    modules: [
      "Bayesian thinking",
      "Prior distributions",
      "Likelihood",
      "Posterior distributions",
      "Bayesian estimation",
      "Hierarchical ideas",
      "Model checking",
      "Applied Bayesian analysis",
    ],
  },

  {
    slug: "survival-analysis",
    title: "Survival Analysis",
    subject: "statistics",
    level: "postgraduate",
    duration: "7 weeks",
    lessons: 30,
    featured: true,

    description:
      "Learn time-to-event analysis from Kaplan–Meier curves to Cox regression and modern survival modelling.",

    skills: [
      "Kaplan–Meier",
      "Cox regression",
      "Hazards",
      "Model checking",
    ],

    modules: [
      "Time-to-event data",
      "Censoring",
      "Kaplan–Meier estimation",
      "Log-rank tests",
      "Cox proportional hazards",
      "Model diagnostics",
      "Extensions to survival models",
    ],
  },

  {
    slug: "longitudinal-mixed-models",
    title: "Longitudinal Data & Mixed Models",
    subject: "statistics",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 33,

    description:
      "Analyse repeated and clustered data using mixed-effects models and longitudinal modelling strategies.",

    skills: [
      "Longitudinal analysis",
      "Mixed models",
      "Random effects",
      "Repeated measures",
    ],

    modules: [
      "Longitudinal data structures",
      "Correlation within subjects",
      "Random intercept models",
      "Random slope models",
      "Model interpretation",
      "Diagnostics",
      "Applied longitudinal analysis",
    ],
  },

  {
    slug: "causal-inference",
    title: "Causal Inference",
    subject: "statistics",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 35,

    description:
      "Move beyond association using causal diagrams, potential outcomes, adjustment strategies and modern causal methods.",

    skills: [
      "DAGs",
      "Confounding",
      "Potential outcomes",
      "Causal effect estimation",
    ],

    modules: [
      "Association versus causation",
      "Potential outcomes",
      "Causal diagrams",
      "Confounding",
      "Adjustment strategies",
      "Propensity scores",
      "Inverse probability weighting",
      "Causal interpretation",
    ],
  },

  {
    slug: "statistics-everyday",
    title: "Statistics for Everyday Life",
    subject: "statistics",
    level: "casual",
    duration: "4 weeks",
    lessons: 18,

    description:
      "Learn how to interpret percentages, risk, averages, polls, medical claims and statistics in everyday life.",

    skills: [
      "Data literacy",
      "Risk interpretation",
      "Critical thinking",
      "Statistical communication",
    ],

    modules: [
      "Numbers in the news",
      "Averages and variation",
      "Understanding risk",
      "Polls and surveys",
      "Correlation and causation",
      "Reading statistical claims",
    ],
  },

  {
    slug: "statistics-excel",
    title: "Practical Statistics with Excel",
    subject: "statistics",
    level: "casual",
    duration: "4 weeks",
    lessons: 20,

    description:
      "Use Excel to summarise data, create visualisations, perform statistical tests and understand basic regression.",

    skills: [
      "Excel",
      "Summary statistics",
      "Charts",
      "Basic inference",
    ],

    modules: [
      "Organising data",
      "Descriptive statistics",
      "Visualisation",
      "Probability tools",
      "Statistical tests",
      "Correlation and regression",
    ],
  },


  /* ========================================================================
     MATHEMATICS
     ======================================================================== */

  {
    slug: "algebra-foundations",
    title: "Algebra Foundations",
    subject: "mathematics",
    level: "high-school",
    duration: "6 weeks",
    lessons: 28,

    description:
      "Build fluency with expressions, equations, inequalities, functions and the algebraic reasoning needed for advanced mathematics.",

    skills: [
      "Algebra",
      "Equations",
      "Functions",
      "Problem solving",
    ],

    modules: [
      "Expressions",
      "Linear equations",
      "Inequalities",
      "Quadratics",
      "Functions",
      "Graphs",
      "Algebraic modelling",
    ],
  },

  {
    slug: "geometry-trigonometry",
    title: "Geometry & Trigonometry",
    subject: "mathematics",
    level: "high-school",
    duration: "6 weeks",
    lessons: 27,

    description:
      "Understand shapes, angles, coordinate geometry and trigonometric relationships through visual reasoning.",

    skills: [
      "Geometry",
      "Trigonometry",
      "Coordinate geometry",
      "Spatial reasoning",
    ],

    modules: [
      "Geometric reasoning",
      "Triangles",
      "Circles",
      "Coordinate geometry",
      "Trigonometric ratios",
      "Sine and cosine rules",
      "Applications",
    ],
  },

  {
    slug: "calculus-foundations",
    title: "Calculus Foundations",
    subject: "mathematics",
    level: "high-school",
    duration: "6 weeks",
    lessons: 28,
    featured: true,

    description:
      "Build an intuitive understanding of limits, derivatives, integrals and the idea of continuous change.",

    skills: [
      "Limits",
      "Differentiation",
      "Integration",
      "Applications",
    ],

    modules: [
      "Functions and change",
      "Limits",
      "Derivatives",
      "Rules of differentiation",
      "Derivative applications",
      "Integrals",
      "The fundamental theorem of calculus",
    ],
  },

  {
    slug: "a-level-mathematics",
    title: "A-Level Mathematics",
    subject: "mathematics",
    level: "high-school",
    duration: "12 weeks",
    lessons: 52,

    description:
      "A structured route through major pure mathematics topics used across A-Level study.",

    skills: [
      "Algebra",
      "Functions",
      "Calculus",
      "Trigonometry",
    ],

    modules: [
      "Algebra and functions",
      "Coordinate geometry",
      "Sequences and series",
      "Trigonometry",
      "Exponentials and logarithms",
      "Differentiation",
      "Integration",
      "Numerical methods",
      "Vectors",
      "Exam problem solving",
    ],
  },

  {
    slug: "university-calculus",
    title: "University Calculus",
    subject: "mathematics",
    level: "undergraduate",
    duration: "9 weeks",
    lessons: 38,

    description:
      "A deeper treatment of single-variable and multivariable calculus with analytical and applied perspectives.",

    skills: [
      "Differentiation",
      "Integration",
      "Multivariable calculus",
      "Series",
    ],

    modules: [
      "Limits and continuity",
      "Differentiation",
      "Integration",
      "Sequences and series",
      "Partial derivatives",
      "Multiple integrals",
      "Vector calculus",
    ],
  },

  {
    slug: "linear-algebra",
    title: "Linear Algebra for Modern Science",
    subject: "mathematics",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 31,
    featured: true,

    description:
      "Understand vectors, matrices, linear transformations, eigenvalues and the geometry behind statistics and data science.",

    skills: [
      "Vectors",
      "Matrices",
      "Eigenvalues",
      "Linear transformations",
    ],

    modules: [
      "Vectors and spaces",
      "Matrix algebra",
      "Systems of equations",
      "Linear transformations",
      "Determinants",
      "Eigenvalues and eigenvectors",
      "Applications",
    ],
  },

  {
    slug: "differential-equations",
    title: "Differential Equations",
    subject: "mathematics",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Learn how differential equations model dynamic systems across science, engineering and quantitative research.",

    skills: [
      "ODEs",
      "Model formulation",
      "Analytical solutions",
      "Dynamic systems",
    ],

    modules: [
      "Why differential equations",
      "First-order equations",
      "Second-order equations",
      "Systems of equations",
      "Qualitative behaviour",
      "Applications",
    ],
  },

  {
    slug: "discrete-mathematics",
    title: "Discrete Mathematics",
    subject: "mathematics",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 32,

    description:
      "Explore logic, proof, combinatorics, relations, graphs and discrete structures central to computer science.",

    skills: [
      "Logic",
      "Proof",
      "Combinatorics",
      "Graph theory",
    ],

    modules: [
      "Logic",
      "Sets and relations",
      "Proof techniques",
      "Counting",
      "Recurrence",
      "Graphs",
      "Discrete applications",
    ],
  },

  {
    slug: "real-analysis",
    title: "Real Analysis",
    subject: "mathematics",
    level: "postgraduate",
    duration: "9 weeks",
    lessons: 36,

    description:
      "Develop rigorous foundations in limits, continuity, differentiation, integration and convergence.",

    skills: [
      "Mathematical proof",
      "Convergence",
      "Continuity",
      "Rigorous analysis",
    ],

    modules: [
      "Real numbers",
      "Sequences",
      "Limits",
      "Continuity",
      "Differentiation",
      "Integration",
      "Series",
      "Rigorous proof practice",
    ],
  },

  {
    slug: "advanced-optimisation",
    title: "Optimisation",
    subject: "mathematics",
    level: "postgraduate",
    duration: "7 weeks",
    lessons: 29,

    description:
      "Study unconstrained and constrained optimisation with applications across statistics, machine learning and operations research.",

    skills: [
      "Optimisation",
      "Convexity",
      "Lagrange multipliers",
      "Numerical methods",
    ],

    modules: [
      "Optimisation problems",
      "Convexity",
      "Gradient methods",
      "Constrained optimisation",
      "Lagrange multipliers",
      "Numerical optimisation",
      "Applications",
    ],
  },

  {
    slug: "probability-theory",
    title: "Probability Theory",
    subject: "mathematics",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 34,

    description:
      "Build a rigorous understanding of random variables, convergence, expectation and foundational probability theory.",

    skills: [
      "Probability spaces",
      "Random variables",
      "Expectation",
      "Convergence",
    ],

    modules: [
      "Probability spaces",
      "Random variables",
      "Expectation",
      "Conditional expectation",
      "Modes of convergence",
      "Limit theorems",
      "Applications",
    ],
  },

  {
    slug: "mathematics-data-science",
    title: "Mathematics for Data Science",
    subject: "mathematics",
    level: "casual",
    duration: "7 weeks",
    lessons: 30,
    featured: true,

    description:
      "Learn the essential linear algebra, calculus and probability needed to understand modern data science and machine learning.",

    skills: [
      "Linear algebra",
      "Calculus",
      "Probability",
      "Machine learning mathematics",
    ],

    modules: [
      "Essential algebra",
      "Vectors",
      "Matrices",
      "Functions",
      "Derivatives",
      "Probability",
      "Optimisation intuition",
    ],
  },

  {
    slug: "mathematical-thinking",
    title: "Mathematical Thinking",
    subject: "mathematics",
    level: "casual",
    duration: "4 weeks",
    lessons: 18,

    description:
      "Develop logic, pattern recognition and problem-solving habits that make advanced quantitative subjects easier to learn.",

    skills: [
      "Logic",
      "Problem solving",
      "Pattern recognition",
      "Reasoning",
    ],

    modules: [
      "Thinking mathematically",
      "Patterns",
      "Logic",
      "Problem decomposition",
      "Mathematical arguments",
      "Creative problem solving",
    ],
  },


  /* ========================================================================
     DATA SCIENCE
     ======================================================================== */

  {
    slug: "data-literacy",
    title: "Data Literacy",
    subject: "data-science",
    level: "high-school",
    duration: "4 weeks",
    lessons: 18,

    description:
      "Learn how data are collected, cleaned, visualised and interpreted in science, society and everyday decision making.",

    skills: [
      "Data literacy",
      "Visualisation",
      "Critical interpretation",
      "Data ethics",
    ],

    modules: [
      "What is data?",
      "Data quality",
      "Tables and charts",
      "Patterns and relationships",
      "Bias and misleading data",
      "Data ethics",
    ],
  },

  {
    slug: "python-young-learners",
    title: "Python Foundations",
    subject: "data-science",
    level: "high-school",
    duration: "6 weeks",
    lessons: 26,

    description:
      "Learn Python programming through small data-focused exercises and projects.",

    skills: [
      "Python",
      "Variables",
      "Loops",
      "Functions",
    ],

    modules: [
      "Python basics",
      "Variables and types",
      "Conditionals",
      "Loops",
      "Functions",
      "Lists and dictionaries",
      "Mini data project",
    ],
  },

  {
    slug: "r-data-analysis",
    title: "R for Data Analysis",
    subject: "data-science",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Learn R through practical workflows involving data wrangling, visualisation, statistical summaries and reporting.",

    skills: [
      "R",
      "Data wrangling",
      "ggplot2",
      "Reproducibility",
    ],

    modules: [
      "R foundations",
      "Data frames",
      "Data transformation",
      "Exploratory analysis",
      "Visualisation",
      "Statistical summaries",
      "Reproducible reports",
    ],
  },

  {
    slug: "exploratory-data-analysis",
    title: "Exploratory Data Analysis & Visualisation",
    subject: "data-science",
    level: "undergraduate",
    duration: "6 weeks",
    lessons: 26,

    description:
      "Learn how to explore datasets systematically and communicate patterns through clear visualisation.",

    skills: [
      "EDA",
      "Visualisation",
      "Data cleaning",
      "Communication",
    ],

    modules: [
      "Questions before charts",
      "Data quality",
      "Univariate exploration",
      "Relationships",
      "Visual design",
      "Communicating findings",
    ],
  },

  {
    slug: "machine-learning",
    title: "Machine Learning",
    subject: "data-science",
    level: "undergraduate",
    duration: "9 weeks",
    lessons: 40,
    featured: true,

    description:
      "Understand supervised and unsupervised learning through intuition, code, validation and responsible model evaluation.",

    skills: [
      "Regression",
      "Classification",
      "Trees",
      "Clustering",
      "Model evaluation",
    ],

    modules: [
      "Machine learning workflow",
      "Regression",
      "Classification",
      "Trees",
      "Ensembles",
      "Clustering",
      "Model evaluation",
      "Feature engineering",
      "Responsible machine learning",
    ],
  },

  {
    slug: "time-series-data-science",
    title: "Time Series & Forecasting",
    subject: "data-science",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Analyse time-dependent data, identify structure and build practical forecasting models.",

    skills: [
      "Time series",
      "Forecasting",
      "Trend",
      "Seasonality",
    ],

    modules: [
      "Time series structure",
      "Trend and seasonality",
      "Smoothing",
      "Autocorrelation",
      "ARIMA intuition",
      "Forecast evaluation",
      "Practical forecasting",
    ],
  },

  {
    slug: "advanced-machine-learning",
    title: "Advanced Machine Learning",
    subject: "data-science",
    level: "postgraduate",
    duration: "9 weeks",
    lessons: 38,

    description:
      "Go deeper into model selection, regularisation, ensembles, feature engineering and advanced predictive workflows.",

    skills: [
      "Regularisation",
      "Ensembles",
      "Model tuning",
      "Advanced validation",
    ],

    modules: [
      "Advanced model evaluation",
      "Regularisation",
      "Feature engineering",
      "Ensemble learning",
      "Hyperparameter tuning",
      "Imbalanced data",
      "Interpretability",
      "Advanced project",
    ],
  },

  {
    slug: "deep-learning",
    title: "Deep Learning",
    subject: "data-science",
    level: "postgraduate",
    duration: "9 weeks",
    lessons: 39,

    description:
      "Understand neural networks, optimisation, representation learning and modern deep learning architectures.",

    skills: [
      "Neural networks",
      "Backpropagation",
      "Optimisation",
      "Deep learning",
    ],

    modules: [
      "Neural network intuition",
      "Forward propagation",
      "Backpropagation",
      "Optimisation",
      "Regularisation",
      "Convolutional networks",
      "Sequence models",
      "Modern architectures",
    ],
  },

  {
    slug: "natural-language-processing",
    title: "Natural Language Processing",
    subject: "data-science",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 34,

    description:
      "Learn how computers represent, analyse and model human language using classical and modern NLP methods.",

    skills: [
      "Text processing",
      "Embeddings",
      "Language models",
      "NLP evaluation",
    ],

    modules: [
      "Text as data",
      "Pre-processing",
      "Vector representations",
      "Classification",
      "Embeddings",
      "Transformers",
      "Language models",
      "Responsible NLP",
    ],
  },

  {
    slug: "python-data-science",
    title: "Python for Data Science",
    subject: "data-science",
    level: "casual",
    duration: "8 weeks",
    lessons: 36,
    featured: true,

    description:
      "Learn Python by working with real datasets, progressing from programming fundamentals to pandas, visualisation and modelling.",

    skills: [
      "Python",
      "pandas",
      "Visualisation",
      "Data analysis",
    ],

    modules: [
      "Python essentials",
      "Working with data",
      "NumPy",
      "pandas",
      "Cleaning data",
      "Exploratory analysis",
      "Visualisation",
      "First predictive models",
      "Portfolio project",
    ],
  },

  {
    slug: "sql-data-analysis",
    title: "SQL for Data Analysis",
    subject: "data-science",
    level: "casual",
    duration: "4 weeks",
    lessons: 20,
    featured: true,

    description:
      "Query, join, summarise and analyse structured data confidently using modern SQL workflows.",

    skills: [
      "SELECT",
      "JOINs",
      "Aggregations",
      "Window functions",
    ],

    modules: [
      "SQL basics",
      "Filtering",
      "Sorting",
      "Aggregations",
      "JOINs",
      "Subqueries and CTEs",
      "Window functions",
    ],
  },

  {
    slug: "excel-data-analysis",
    title: "Excel for Data Analysis",
    subject: "data-science",
    level: "casual",
    duration: "4 weeks",
    lessons: 19,

    description:
      "Turn spreadsheets into useful analytical tools using formulas, tables, pivot tables, charts and structured workflows.",

    skills: [
      "Excel",
      "Pivot tables",
      "Data cleaning",
      "Charts",
    ],

    modules: [
      "Clean spreadsheet design",
      "Formulas",
      "Lookup functions",
      "Tables",
      "Pivot tables",
      "Visualisation",
      "Analysis project",
    ],
  },

  {
    slug: "data-analyst-path",
    title: "Data Analyst Foundations",
    subject: "data-science",
    level: "casual",
    duration: "10 weeks",
    lessons: 42,

    description:
      "A practical foundation in Excel, SQL, statistics, visualisation and Python for aspiring data analysts.",

    skills: [
      "Excel",
      "SQL",
      "Statistics",
      "Python",
      "Visualisation",
    ],

    modules: [
      "Working with data",
      "Excel analysis",
      "SQL",
      "Statistics",
      "Visualisation",
      "Python",
      "Business questions",
      "Portfolio project",
    ],
  },


  /* ========================================================================
     BIOINFORMATICS
     ======================================================================== */

  {
    slug: "genomics-young-learners",
    title: "Genomics & Bioinformatics Foundations",
    subject: "bioinformatics",
    level: "high-school",
    duration: "5 weeks",
    lessons: 20,

    description:
      "Explore DNA, genes, genomes and how computers help scientists investigate biological information.",

    skills: [
      "DNA and genes",
      "Genomics",
      "Biological data",
      "Computational thinking",
    ],

    modules: [
      "DNA and genomes",
      "Genes and proteins",
      "What is bioinformatics?",
      "Biological databases",
      "Comparing sequences",
      "Genomics in research",
    ],
  },

  {
    slug: "sequence-analysis",
    title: "Sequence Analysis",
    subject: "bioinformatics",
    level: "undergraduate",
    duration: "6 weeks",
    lessons: 26,

    description:
      "Learn how biological sequences are represented, compared and interpreted computationally.",

    skills: [
      "DNA sequences",
      "Protein sequences",
      "Alignment",
      "BLAST",
    ],

    modules: [
      "Sequence data",
      "File formats",
      "Pairwise alignment",
      "Multiple alignment",
      "Similarity searching",
      "BLAST",
      "Biological interpretation",
    ],
  },

  {
    slug: "linux-biological-data",
    title: "Linux & Biological Data",
    subject: "bioinformatics",
    level: "undergraduate",
    duration: "5 weeks",
    lessons: 22,

    description:
      "Develop the command-line skills needed to work efficiently with biological datasets and computational workflows.",

    skills: [
      "Linux",
      "Command line",
      "Text processing",
      "Workflow organisation",
    ],

    modules: [
      "Terminal foundations",
      "Files and directories",
      "Pipes and redirection",
      "Text processing",
      "Working with sequence files",
      "Shell workflows",
    ],
  },

  {
    slug: "genomics-ngs",
    title: "Genomics & Next-Generation Sequencing",
    subject: "bioinformatics",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Understand sequencing technologies, genomic data formats, alignment, variant calling and core NGS workflows.",

    skills: [
      "NGS",
      "FASTQ",
      "Alignment",
      "Variant analysis",
    ],

    modules: [
      "Sequencing technologies",
      "FASTQ and quality",
      "Read alignment",
      "SAM and BAM",
      "Variant calling",
      "Annotation",
      "Genomic interpretation",
    ],
  },

  {
    slug: "bulk-rnaseq",
    title: "Bulk RNA-seq Analysis",
    subject: "bioinformatics",
    level: "postgraduate",
    duration: "6 weeks",
    lessons: 27,
    featured: true,

    description:
      "Move from count matrices and experimental design to differential expression, interpretation and publication-ready figures.",

    skills: [
      "RNA-seq QC",
      "DESeq2",
      "Differential expression",
      "Visualisation",
    ],

    modules: [
      "RNA-seq workflow",
      "Experimental design",
      "Quality control",
      "Count matrices",
      "Normalisation",
      "DESeq2",
      "Differential expression",
      "Interpretation",
      "Publication figures",
    ],
  },

  {
    slug: "single-cell",
    title: "Single-cell RNA-seq",
    subject: "bioinformatics",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 35,
    featured: true,

    description:
      "Analyse single-cell transcriptomics from quality control and dimensionality reduction to clustering, annotation and differential expression.",

    skills: [
      "Seurat",
      "Quality control",
      "Clustering",
      "Cell annotation",
    ],

    modules: [
      "Single-cell concepts",
      "Quality control",
      "Normalisation",
      "Feature selection",
      "Dimensionality reduction",
      "Clustering",
      "Cell annotation",
      "Differential expression",
      "Biological interpretation",
    ],
  },

  {
    slug: "spatial-transcriptomics",
    title: "Spatial Transcriptomics",
    subject: "bioinformatics",
    level: "postgraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Understand modern spatial transcriptomics technologies, spatial data structures, visualisation and biological interpretation.",

    skills: [
      "Spatial omics",
      "Spatial visualisation",
      "Cell mapping",
      "Gene expression",
    ],

    modules: [
      "Spatial biology",
      "Technology overview",
      "Spatial data structures",
      "Quality control",
      "Spatial visualisation",
      "Cell-type mapping",
      "Gene expression patterns",
      "Integrated interpretation",
    ],
  },

  {
    slug: "statistical-genomics-gwas",
    title: "Statistical Genomics & GWAS",
    subject: "bioinformatics",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 34,

    description:
      "Learn the statistical foundations and analytical workflow behind genome-wide association studies.",

    skills: [
      "GWAS",
      "Population structure",
      "Genotype QC",
      "Association analysis",
    ],

    modules: [
      "Genetic variation",
      "Genotype data",
      "Quality control",
      "Population structure",
      "Association models",
      "Multiple testing",
      "Manhattan plots",
      "Interpretation",
    ],
  },

  {
    slug: "epigenomics",
    title: "Epigenomics",
    subject: "bioinformatics",
    level: "postgraduate",
    duration: "7 weeks",
    lessons: 29,

    description:
      "Explore DNA methylation, chromatin regulation, epigenomic assays and statistical approaches to epigenetic data.",

    skills: [
      "DNA methylation",
      "Epigenomic data",
      "EWAS concepts",
      "Biological interpretation",
    ],

    modules: [
      "Epigenetic regulation",
      "DNA methylation",
      "Epigenomic technologies",
      "Data preprocessing",
      "Association analysis",
      "Multiple testing",
      "Biological interpretation",
    ],
  },

  {
    slug: "bioinformatics-zero",
    title: "Bioinformatics from Zero",
    subject: "bioinformatics",
    level: "casual",
    duration: "6 weeks",
    lessons: 24,
    featured: true,

    description:
      "A friendly bridge from biology into sequence data, databases, command-line tools and reproducible computational analysis.",

    skills: [
      "Sequence data",
      "Linux",
      "Biological databases",
      "Computational workflows",
    ],

    modules: [
      "What is computational biology?",
      "DNA and sequence basics",
      "Biological databases",
      "Command-line foundations",
      "Sequence searching",
      "Reproducibility",
      "Mini project",
    ],
  },

  {
    slug: "r-for-biologists",
    title: "R for Biologists",
    subject: "bioinformatics",
    level: "casual",
    duration: "6 weeks",
    lessons: 25,

    description:
      "Learn R using biological examples, from data frames and visualisation to reproducible analysis.",

    skills: [
      "R",
      "Biological data",
      "Visualisation",
      "Data manipulation",
    ],

    modules: [
      "R foundations",
      "Biological datasets",
      "Data wrangling",
      "Visualisation",
      "Statistical summaries",
      "Reproducible analysis",
    ],
  },

  {
    slug: "python-for-biologists",
    title: "Python for Biologists",
    subject: "bioinformatics",
    level: "casual",
    duration: "6 weeks",
    lessons: 25,

    description:
      "Learn Python through biological examples involving sequences, files, data manipulation and automation.",

    skills: [
      "Python",
      "Sequence processing",
      "Automation",
      "Biological data",
    ],

    modules: [
      "Python foundations",
      "Strings and sequences",
      "Collections",
      "Functions",
      "Reading biological files",
      "Data processing",
      "Mini project",
    ],
  },


  /* ========================================================================
     COMPUTER SCIENCE
     ======================================================================== */

  {
    slug: "computer-science-foundations",
    title: "Computer Science Foundations",
    subject: "computer-science",
    level: "high-school",
    duration: "6 weeks",
    lessons: 26,

    description:
      "Understand computation, programming, algorithms, data representation and the core ideas behind computer science.",

    skills: [
      "Computational thinking",
      "Algorithms",
      "Data representation",
      "Programming concepts",
    ],

    modules: [
      "How computers represent information",
      "Computational thinking",
      "Algorithms",
      "Programming concepts",
      "Data structures",
      "Networks and the web",
      "Computer science applications",
    ],
  },

  {
    slug: "python-programming",
    title: "Python Programming",
    subject: "computer-science",
    level: "high-school",
    duration: "7 weeks",
    lessons: 32,
    featured: true,

    description:
      "Learn programming from scratch with clear explanations, coding challenges and small practical projects.",

    skills: [
      "Variables",
      "Control flow",
      "Functions",
      "Problem solving",
    ],

    modules: [
      "Thinking like a programmer",
      "Variables and types",
      "Conditionals",
      "Loops",
      "Functions",
      "Lists and dictionaries",
      "Debugging",
      "Projects",
    ],
  },

  {
    slug: "web-development-school",
    title: "Web Development Foundations",
    subject: "computer-science",
    level: "high-school",
    duration: "6 weeks",
    lessons: 25,

    description:
      "Learn how websites work and build your first responsive pages using HTML, CSS and JavaScript.",

    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Web development",
    ],

    modules: [
      "How the web works",
      "HTML",
      "CSS",
      "Responsive design",
      "JavaScript foundations",
      "Interactive pages",
      "Website project",
    ],
  },

  {
    slug: "data-structures-algorithms",
    title: "Data Structures & Algorithms",
    subject: "computer-science",
    level: "undergraduate",
    duration: "10 weeks",
    lessons: 42,
    featured: true,

    description:
      "Understand core data structures, algorithm design and computational complexity through visual examples and coding practice.",

    skills: [
      "Big-O",
      "Arrays",
      "Trees",
      "Graphs",
      "Algorithm design",
    ],

    modules: [
      "Algorithmic complexity",
      "Arrays and lists",
      "Stacks and queues",
      "Hash tables",
      "Trees",
      "Graphs",
      "Searching",
      "Sorting",
      "Greedy methods",
      "Dynamic programming",
    ],
  },

  {
    slug: "object-oriented-programming",
    title: "Object-Oriented Programming",
    subject: "computer-science",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Learn classes, objects, abstraction, inheritance, composition and maintainable software design.",

    skills: [
      "OOP",
      "Classes",
      "Software design",
      "Abstraction",
    ],

    modules: [
      "Objects and classes",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Composition",
      "Design principles",
      "Software project",
    ],
  },

  {
    slug: "database-systems",
    title: "Database Systems",
    subject: "computer-science",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 30,

    description:
      "Understand relational databases, SQL, schema design, transactions, indexing and database architecture.",

    skills: [
      "SQL",
      "Database design",
      "Normalisation",
      "Transactions",
    ],

    modules: [
      "Database concepts",
      "Relational models",
      "SQL",
      "Database design",
      "Normalisation",
      "Transactions",
      "Indexes",
      "Database applications",
    ],
  },

  {
    slug: "operating-systems",
    title: "Operating Systems",
    subject: "computer-science",
    level: "undergraduate",
    duration: "8 weeks",
    lessons: 34,

    description:
      "Understand processes, memory, files, concurrency and the core abstractions managed by modern operating systems.",

    skills: [
      "Processes",
      "Memory",
      "Concurrency",
      "File systems",
    ],

    modules: [
      "Operating system foundations",
      "Processes",
      "Threads",
      "CPU scheduling",
      "Memory management",
      "Concurrency",
      "File systems",
      "Virtualisation",
    ],
  },

  {
    slug: "computer-networks",
    title: "Computer Networks",
    subject: "computer-science",
    level: "undergraduate",
    duration: "7 weeks",
    lessons: 29,

    description:
      "Learn how information moves across networks, from protocols and routing to the modern internet.",

    skills: [
      "Networking",
      "TCP/IP",
      "Routing",
      "Internet architecture",
    ],

    modules: [
      "Network foundations",
      "Layered models",
      "IP",
      "Transport protocols",
      "Routing",
      "DNS",
      "HTTP",
      "Network security basics",
    ],
  },

  {
    slug: "advanced-algorithms",
    title: "Advanced Algorithms",
    subject: "computer-science",
    level: "postgraduate",
    duration: "9 weeks",
    lessons: 36,

    description:
      "Study advanced algorithm design, complexity, graph methods, dynamic programming and optimisation techniques.",

    skills: [
      "Advanced algorithms",
      "Complexity",
      "Graph algorithms",
      "Optimisation",
    ],

    modules: [
      "Algorithm analysis",
      "Divide and conquer",
      "Advanced graph algorithms",
      "Dynamic programming",
      "Greedy optimisation",
      "Randomised algorithms",
      "Approximation",
      "Complexity limits",
    ],
  },

  {
    slug: "distributed-systems",
    title: "Distributed Systems",
    subject: "computer-science",
    level: "postgraduate",
    duration: "8 weeks",
    lessons: 34,

    description:
      "Understand communication, consistency, fault tolerance and distributed architectures used in modern computing.",

    skills: [
      "Distributed computing",
      "Consistency",
      "Fault tolerance",
      "Scalability",
    ],

    modules: [
      "Distributed system models",
      "Communication",
      "Time and ordering",
      "Replication",
      "Consistency",
      "Consensus",
      "Fault tolerance",
      "Scalable systems",
    ],
  },

  {
    slug: "ai-foundations",
    title: "AI Foundations",
    subject: "computer-science",
    level: "casual",
    duration: "5 weeks",
    lessons: 22,
    featured: true,

    description:
      "Understand what modern artificial intelligence systems do, how they learn and how to use them thoughtfully.",

    skills: [
      "AI concepts",
      "Search",
      "Machine learning",
      "Responsible AI",
    ],

    modules: [
      "What is AI?",
      "Problem solving and search",
      "Learning from data",
      "Neural networks",
      "Generative AI",
      "AI limitations",
      "Responsible use",
    ],
  },

  {
    slug: "git-github",
    title: "Git & GitHub",
    subject: "computer-science",
    level: "casual",
    duration: "3 weeks",
    lessons: 15,

    description:
      "Learn version control, branching, collaboration and professional GitHub workflows.",

    skills: [
      "Git",
      "GitHub",
      "Version control",
      "Collaboration",
    ],

    modules: [
      "Why version control",
      "Git foundations",
      "Commits",
      "Branches",
      "GitHub repositories",
      "Pull requests",
      "Collaboration workflow",
    ],
  },

  {
    slug: "web-development-zero",
    title: "Web Development from Zero",
    subject: "computer-science",
    level: "casual",
    duration: "8 weeks",
    lessons: 34,

    description:
      "Build modern websites from scratch using HTML, CSS, JavaScript and practical development workflows.",

    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive design",
    ],

    modules: [
      "The web",
      "HTML",
      "CSS",
      "Responsive layouts",
      "JavaScript",
      "DOM interaction",
      "Forms",
      "Deployment",
      "Portfolio website",
    ],
  },

  {
    slug: "python-for-data-analysis",
    title: "Python for Data Analysis",
    subject: "data-science",
    level: "undergraduate",
    duration: "8 weeks",
    lessons: 32,
    description:
      "Build a rigorous, reproducible Python data-analysis workflow with NumPy, pandas, cleaning, joins, visualisation, statistical analysis and a complete capstone project.",
    skills: [
      "Python",
      "NumPy",
      "pandas",
      "Data cleaning",
      "Data visualisation",
      "Statistical analysis",
      "Reproducible workflows",
    ],
    modules: [
      "Python foundations for analysis",
      "NumPy for numerical work",
      "pandas foundations",
      "Cleaning and reshaping data",
      "Grouping and combining data",
      "Exploratory analysis and visualisation",
      "Time series and reproducible workflows",
      "Capstone: from raw data to decision-ready analysis",
    ],
    featured: true,
  },
];


/* ==========================================================================
   PATHWAYS
   ========================================================================== */

export const pathways: Pathway[] = [
  {
    slug: "data-scientist",

    title: "Data Scientist",
    name: "Data Scientist",

    tag: "Career pathway",
    subject: "Data Science",
    duration: "4–6 months",

    description:
      "Build a complete foundation in mathematics, statistics, Python, SQL, visualisation and machine learning.",

    steps: [
      "Mathematics foundations",
      "Statistics foundations",
      "Python for Data Science",
      "SQL for Data Analysis",
      "Exploratory data analysis",
      "Machine Learning",
      "Portfolio project",
    ],
  },

  {
    slug: "data-analyst",

    title: "Data Analyst",
    name: "Data Analyst",

    tag: "Career pathway",
    subject: "Data Science",
    duration: "3–5 months",

    description:
      "Develop practical skills in spreadsheets, SQL, statistics, visualisation and Python for real-world data analysis.",

    steps: [
      "Data literacy",
      "Excel for Data Analysis",
      "Statistics foundations",
      "SQL for Data Analysis",
      "Data visualisation",
      "Python foundations",
      "Portfolio analysis",
    ],
  },

  {
    slug: "biostatistician",

    title: "Biostatistician",
    name: "Biostatistician",

    tag: "Academic + career",
    subject: "Statistics",
    duration: "5–7 months",

    description:
      "Progress from statistical inference and regression to epidemiology, survival analysis and reproducible health-data analysis.",

    steps: [
      "Statistical inference",
      "Regression modelling",
      "Statistical Computing with R",
      "Epidemiological thinking",
      "Experimental design",
      "Survival Analysis",
      "Applied research project",
    ],
  },

  {
    slug: "statistical-researcher",

    title: "Statistical Researcher",
    name: "Statistical Researcher",

    tag: "Research pathway",
    subject: "Statistics",
    duration: "6–8 months",

    description:
      "Develop advanced statistical reasoning for research, modelling, causal questions and reproducible scientific analysis.",

    steps: [
      "Statistical inference",
      "Regression modelling",
      "Experimental design",
      "Bayesian Statistics",
      "Longitudinal Data & Mixed Models",
      "Causal Inference",
      "Research analysis project",
    ],
  },

  {
    slug: "bioinformatics-analyst",

    title: "Bioinformatics Analyst",
    name: "Bioinformatics Analyst",

    tag: "Research + career",
    subject: "Bioinformatics",
    duration: "5–7 months",

    description:
      "Combine biology, Linux, R or Python and omics workflows for modern computational biology.",

    steps: [
      "Bioinformatics from Zero",
      "Linux & Biological Data",
      "R or Python for biology",
      "Sequence Analysis",
      "Genomics & NGS",
      "Bulk RNA-seq",
      "Portfolio analysis",
    ],
  },

  {
    slug: "computational-biologist",

    title: "Computational Biologist",
    name: "Computational Biologist",

    tag: "Advanced research pathway",
    subject: "Bioinformatics",
    duration: "7–10 months",

    description:
      "Progress from biological computing foundations to genomic, transcriptomic and high-dimensional research workflows.",

    steps: [
      "Sequence analysis",
      "Statistical foundations",
      "Genomics & NGS",
      "Bulk RNA-seq",
      "Single-cell RNA-seq",
      "Spatial Transcriptomics",
      "Advanced research project",
    ],
  },

  {
    slug: "python-developer",

    title: "Python Developer",
    name: "Python Developer",

    tag: "Skills pathway",
    subject: "Computer Science",
    duration: "3–5 months",

    description:
      "Go from programming fundamentals to algorithms, software design, version control and portfolio-ready projects.",

    steps: [
      "Python Programming",
      "Problem solving",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Git & GitHub",
      "Software project",
      "Portfolio development",
    ],
  },

  {
    slug: "machine-learning-practitioner",

    title: "Machine Learning Practitioner",
    name: "Machine Learning Practitioner",

    tag: "Technical pathway",
    subject: "Data Science",
    duration: "5–7 months",

    description:
      "Build the mathematics, programming and modelling skills required to understand and apply machine learning effectively.",

    steps: [
      "Mathematics for Data Science",
      "Statistics Foundations",
      "Python for Data Science",
      "Machine Learning",
      "Advanced Machine Learning",
      "Model interpretation",
      "Machine learning project",
    ],
  },
];


/* ==========================================================================
   COUNTRIES / EDUCATION SYSTEMS
   ========================================================================== */

export const countries: Country[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",

    systems: [
      "GCSE",
      "A-Level",
      "Scottish Highers",
      "Undergraduate",
      "Postgraduate",
    ],

    copy:
      "Curriculum-aware learning routes for school qualifications and UK university study across quantitative and computational subjects.",
  },

  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",

    systems: [
      "High School",
      "AP",
      "SAT / ACT",
      "College",
      "Graduate study",
    ],

    copy:
      "Structured support for US high school, Advanced Placement, college and graduate-level quantitative learning.",
  },

  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",

    systems: [
      "Provincial curricula",
      "Secondary School",
      "College",
      "University",
      "Graduate study",
    ],

    copy:
      "Flexible learning routes for Canadian secondary, college and university students across major quantitative subjects.",
  },

  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",

    systems: [
      "Senior Secondary",
      "ATAR pathways",
      "Undergraduate",
      "Postgraduate",
    ],

    copy:
      "Support for Australian senior-secondary qualifications and university-level quantitative and computational study.",
  },

  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",

    systems: [
      "NCEA",
      "Secondary School",
      "University",
      "Postgraduate",
    ],

    copy:
      "Structured learning routes for NCEA learners and New Zealand tertiary students.",
  },

  {
    slug: "ireland",
    name: "Ireland",
    flag: "🇮🇪",

    systems: [
      "Junior Cycle",
      "Leaving Certificate",
      "Undergraduate",
      "Postgraduate",
    ],

    copy:
      "Support from secondary mathematics and computing through undergraduate and postgraduate university study.",
  },

  {
    slug: "international",
    name: "International / IB",
    flag: "🌍",

    systems: [
      "International Baccalaureate",
      "International Schools",
      "Undergraduate",
      "Postgraduate",
      "Independent learning",
    ],

    copy:
      "Globally relevant learning pathways for IB students and English-medium learners around the world.",
  },
];


/* ==========================================================================
   HELPERS
   ========================================================================== */

export function getSubject(slug: string) {
  return subjects.find((subject) => subject.slug === slug);
}


export function getLevel(slug: string) {
  return levels.find((level) => level.slug === slug);
}


export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}


export function getPathway(slug: string) {
  return pathways.find((pathway) => pathway.slug === slug);
}


export function getCountry(slug: string) {
  return countries.find((country) => country.slug === slug);
}


export function subjectCourses(
  subject: string,
  level?: string
) {
  return courses.filter(
    (course) =>
      course.subject === subject &&
      (!level || course.level === level)
  );
}


export function levelCourses(level: string) {
  return courses.filter(
    (course) => course.level === level
  );
}


export function featuredCourses() {
  return courses.filter(
    (course) => course.featured
  );
}


export function relatedCourses(
  courseSlug: string,
  limit = 3
) {
  const currentCourse = getCourse(courseSlug);

  if (!currentCourse) {
    return [];
  }

  return courses
    .filter(
      (course) =>
        course.subject === currentCourse.subject &&
        course.slug !== currentCourse.slug
    )
    .slice(0, limit);
}