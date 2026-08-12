export type Subject = {
  slug: string;
  name: string;
  symbol: string;
  eyebrow: string;
  short: string;
  description: string;
  accent: string;
  topics: string[];
  outcomes: string[];
};

export type Course = {
  slug: string;
  title: string;
  subject: string;
  level: string;
  duration: string;
  lessons: number;
  description: string;
  skills: string[];
  modules: string[];
  featured?: boolean;
};

export const subjects: Subject[] = [
  {
    slug: "statistics",
    name: "Statistics",
    symbol: "σ",
    eyebrow: "Reason with evidence",
    short: "Probability, inference, modelling and real-world decision making.",
    description: "Build statistical intuition from first principles and progress to modern modelling, causal inference, survival analysis and research applications.",
    accent: "blue",
    topics: ["Probability", "Statistical inference", "Regression", "ANOVA", "Bayesian statistics", "Survival analysis", "Causal inference", "Time series", "Biostatistics", "R & Python"],
    outcomes: ["Interpret data with confidence", "Choose and justify statistical methods", "Build reproducible analyses", "Communicate evidence clearly"]
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    symbol: "∑",
    eyebrow: "Build the foundations",
    short: "From algebra and calculus to proof, linear algebra and optimisation.",
    description: "Develop the mathematical language behind science, statistics, computing and quantitative careers through visual explanations and rigorous practice.",
    accent: "violet",
    topics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Linear algebra", "Differential equations", "Discrete mathematics", "Real analysis", "Optimisation", "Numerical methods"],
    outcomes: ["Strengthen mathematical intuition", "Solve unfamiliar problems", "Write clear mathematical arguments", "Prepare for quantitative study"]
  },
  {
    slug: "data-science",
    name: "Data Science",
    symbol: "◉",
    eyebrow: "Turn data into insight",
    short: "Python, R, SQL, visualisation, machine learning and projects.",
    description: "Learn the complete data workflow—from cleaning and exploration to modelling, visualisation, machine learning and reproducible portfolio projects.",
    accent: "teal",
    topics: ["Python", "R", "SQL", "Data cleaning", "Visualisation", "Machine learning", "Time series", "Deep learning", "NLP", "Model deployment"],
    outcomes: ["Work confidently with messy data", "Build predictive models", "Create compelling visualisations", "Deliver end-to-end projects"]
  },
  {
    slug: "bioinformatics",
    name: "Bioinformatics",
    symbol: "⌬",
    eyebrow: "Decode biological data",
    short: "Genomics, transcriptomics, single-cell, spatial and computational biology.",
    description: "Bridge biology, statistics and computing with practical workflows for sequencing data, genomics, transcriptomics and modern multi-omics research.",
    accent: "green",
    topics: ["Sequence analysis", "Genomics", "Transcriptomics", "Bulk RNA-seq", "Single-cell RNA-seq", "Spatial transcriptomics", "GWAS", "Epigenomics", "Bioconductor", "Seurat"],
    outcomes: ["Understand biological data structures", "Run reproducible omics workflows", "Interpret high-dimensional results", "Prepare publication-ready analysis"]
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    symbol: "</>",
    eyebrow: "Think computationally",
    short: "Programming, algorithms, systems, databases and artificial intelligence.",
    description: "Learn to program, reason about algorithms and understand the systems that power modern computing—from beginner foundations to advanced AI.",
    accent: "orange",
    topics: ["Python", "Programming", "Data structures", "Algorithms", "Databases", "Operating systems", "Networks", "Software engineering", "AI", "Web development"],
    outcomes: ["Write reliable programs", "Reason about algorithmic efficiency", "Understand core computer systems", "Build practical software projects"]
  }
];

export const levels = [
  { slug: "high-school", name: "High School", kicker: "Build confidence early", copy: "Clear explanations, exam-ready practice and curriculum-aware routes for GCSE, A-Level, AP, IB and equivalent programmes." },
  { slug: "undergraduate", name: "Undergraduate", kicker: "Master university modules", copy: "Structured pathways for lectures, problem sheets, assignments and deeper conceptual understanding." },
  { slug: "postgraduate", name: "Postgraduate", kicker: "Go beyond the textbook", copy: "Advanced methods, research workflows, coding and specialist support for MSc, MRes and doctoral study." },
  { slug: "casual", name: "Learn for Yourself", kicker: "Skills without the pressure", copy: "Career change, curiosity, refreshers and practical projects—learn at your own pace with no academic prerequisites." }
];

export const courses: Course[] = [
  { slug:"statistics-foundations", title:"Statistics Foundations", subject:"statistics", level:"high-school", duration:"6 weeks", lessons:26, featured:true, description:"A visual, intuitive introduction to data, probability, distributions, sampling and inference.", skills:["Descriptive statistics","Probability","Sampling","Confidence intervals"], modules:["Thinking with data","Probability essentials","Random variables","Sampling and uncertainty","Confidence intervals","Hypothesis testing"] },
  { slug:"regression-modelling", title:"Regression & Statistical Modelling", subject:"statistics", level:"undergraduate", duration:"8 weeks", lessons:34, featured:true, description:"Move from simple linear regression to multivariable models, diagnostics and interpretation.", skills:["Linear regression","Model diagnostics","Confounding","Prediction"], modules:["Regression intuition","Simple linear regression","Multiple regression","Interactions","Diagnostics","Model communication"] },
  { slug:"survival-analysis", title:"Survival Analysis", subject:"statistics", level:"postgraduate", duration:"7 weeks", lessons:30, description:"Time-to-event methods from Kaplan–Meier curves to Cox models and flexible survival modelling.", skills:["Kaplan–Meier","Cox regression","Hazards","Model checking"], modules:["Time-to-event data","Kaplan–Meier","Log-rank tests","Cox models","Proportional hazards","Extensions"] },
  { slug:"calculus-foundations", title:"Calculus Foundations", subject:"mathematics", level:"high-school", duration:"6 weeks", lessons:28, featured:true, description:"Build an intuitive understanding of limits, derivatives, integrals and their applications.", skills:["Limits","Differentiation","Integration","Applications"], modules:["Functions and change","Limits","Derivatives","Derivative applications","Integrals","Fundamental theorem"] },
  { slug:"linear-algebra", title:"Linear Algebra for Modern Science", subject:"mathematics", level:"undergraduate", duration:"7 weeks", lessons:31, description:"Vectors, matrices, linear transformations, eigenvalues and the geometry behind data science.", skills:["Vectors","Matrices","Eigenvalues","Linear transformations"], modules:["Vectors and spaces","Matrix algebra","Linear systems","Transformations","Eigenvalues","Applications"] },
  { slug:"python-data-science", title:"Python for Data Science", subject:"data-science", level:"casual", duration:"8 weeks", lessons:36, featured:true, description:"Learn Python by working with real datasets, from fundamentals to pandas, visualisation and modelling.", skills:["Python","pandas","Visualisation","Data analysis"], modules:["Python essentials","Working with data","Cleaning","Exploration","Visualisation","First models","Project"] },
  { slug:"machine-learning", title:"Machine Learning", subject:"data-science", level:"undergraduate", duration:"9 weeks", lessons:40, featured:true, description:"Understand supervised and unsupervised learning through intuition, code and model evaluation.", skills:["Regression","Classification","Trees","Clustering"], modules:["ML workflow","Regression","Classification","Trees and ensembles","Clustering","Evaluation","Responsible ML"] },
  { slug:"sql-data-analysis", title:"SQL for Data Analysis", subject:"data-science", level:"casual", duration:"4 weeks", lessons:20, description:"Query, join, summarise and analyse data confidently using modern SQL patterns.", skills:["SELECT","JOINs","Aggregations","Window functions"], modules:["SQL basics","Filtering","Aggregations","JOINs","CTEs","Window functions"] },
  { slug:"bioinformatics-zero", title:"Bioinformatics from Zero", subject:"bioinformatics", level:"casual", duration:"6 weeks", lessons:24, featured:true, description:"A friendly bridge from biology into command line, sequence data, databases and reproducible analysis.", skills:["Sequence data","Linux","Biological databases","R/Python context"], modules:["Computational biology","Sequence basics","Databases","Command line","Reproducibility","Mini project"] },
  { slug:"bulk-rnaseq", title:"Bulk RNA-seq Analysis", subject:"bioinformatics", level:"postgraduate", duration:"6 weeks", lessons:27, featured:true, description:"From count matrices and experimental design to differential expression and publication-ready figures.", skills:["RNA-seq QC","DESeq2","Differential expression","Visualisation"], modules:["RNA-seq workflow","QC and counts","Experimental design","DESeq2","Interpretation","Publication figures"] },
  { slug:"single-cell", title:"Single-cell RNA-seq", subject:"bioinformatics", level:"postgraduate", duration:"8 weeks", lessons:35, description:"Analyse single-cell transcriptomics with Seurat—from QC and clustering to annotation and differential expression.", skills:["Seurat","QC","Clustering","Cell annotation"], modules:["Single-cell concepts","QC","Normalisation","Dimensionality reduction","Clustering","Annotation","Differential analysis"] },
  { slug:"python-programming", title:"Python Programming", subject:"computer-science", level:"high-school", duration:"7 weeks", lessons:32, featured:true, description:"Learn programming from scratch with clear explanations, interactive challenges and small projects.", skills:["Variables","Control flow","Functions","Problem solving"], modules:["Thinking like a programmer","Variables","Conditionals","Loops","Functions","Collections","Projects"] },
  { slug:"data-structures-algorithms", title:"Data Structures & Algorithms", subject:"computer-science", level:"undergraduate", duration:"10 weeks", lessons:42, featured:true, description:"Understand core data structures, algorithm design and complexity with visual examples and coding practice.", skills:["Big-O","Arrays","Trees","Graphs"], modules:["Complexity","Arrays and lists","Stacks and queues","Hashing","Trees","Graphs","Sorting","Dynamic programming"] },
  { slug:"ai-foundations", title:"AI Foundations", subject:"computer-science", level:"casual", duration:"5 weeks", lessons:22, description:"Understand what modern AI systems do, how they learn and how to use them responsibly.", skills:["AI concepts","Search","Learning","Responsible AI"], modules:["What is AI?","Problem solving","Learning from data","Neural networks","Generative AI","Responsible use"] }
];

export const pathways = [
  { slug:"data-scientist", title:"Data Scientist", tag:"Career pathway", subject:"Data Science", duration:"4–6 months", description:"Build a complete foundation in mathematics, statistics, Python, SQL, visualisation and machine learning.", steps:["Mathematics foundations","Statistics foundations","Python for data science","SQL for data analysis","Data visualisation","Machine learning","Portfolio project"] },
  { slug:"biostatistician", title:"Biostatistician", tag:"Academic + career", subject:"Statistics", duration:"5–7 months", description:"Progress from regression and inference to clinical research, survival analysis and reproducible statistical programming.", steps:["Statistical inference","Regression modelling","R programming","Epidemiology","Clinical trials","Survival analysis","Research project"] },
  { slug:"bioinformatics-analyst", title:"Bioinformatics Analyst", tag:"Research pathway", subject:"Bioinformatics", duration:"5–7 months", description:"Combine biology, Linux, R/Python and omics workflows for modern computational biology.", steps:["Biology refresher","Linux and command line","R/Python foundations","Genomics","Bulk RNA-seq","Single-cell analysis","Portfolio analysis"] },
  { slug:"python-developer", title:"Python Developer", tag:"Skills pathway", subject:"Computer Science", duration:"3–5 months", description:"Go from programming fundamentals to algorithms, software design, APIs and portfolio-ready projects.", steps:["Python foundations","Problem solving","Object-oriented programming","Data structures","Algorithms","Git & GitHub","Capstone project"] }
];

export function getSubject(slug:string){ return subjects.find(s=>s.slug===slug); }
export function getCourse(slug:string){ return courses.find(c=>c.slug===slug); }
export function getPathway(slug:string){ return pathways.find(p=>p.slug===slug); }
export function subjectCourses(subject:string, level?:string){ return courses.filter(c=>c.subject===subject && (!level || c.level===level)); }

export const countries = [
  { slug:"uk", name:"United Kingdom", flag:"🇬🇧", systems:["GCSE","A-Level","Scottish Highers","University"], copy:"Curriculum-aware learning routes for school qualifications and UK university study." },
  { slug:"usa", name:"United States", flag:"🇺🇸", systems:["High School","AP","SAT/ACT","College"], copy:"Structured support for US high school, advanced placement and college-level quantitative subjects." },
  { slug:"canada", name:"Canada", flag:"🇨🇦", systems:["Provincial curricula","University","College"], copy:"Flexible routes that map to Canadian secondary and higher-education learning goals." },
  { slug:"australia", name:"Australia", flag:"🇦🇺", systems:["Senior Secondary","ATAR pathways","University"], copy:"Support for Australian senior-secondary study and university quantitative modules." },
  { slug:"new-zealand", name:"New Zealand", flag:"🇳🇿", systems:["NCEA","University"], copy:"Learning routes for NCEA learners and New Zealand university students." },
  { slug:"ireland", name:"Ireland", flag:"🇮🇪", systems:["Junior Cycle","Leaving Certificate","University"], copy:"Support from school-level mathematics and statistics through university study." },
  { slug:"international", name:"International / IB", flag:"🌍", systems:["IB","International schools","University"], copy:"Globally relevant pathways for IB and English-medium learners around the world." }
];
