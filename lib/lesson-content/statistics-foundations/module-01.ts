import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   STATISTICS FOUNDATIONS
   MODULE 01 — THINKING WITH DATA
   ========================================================================== */

export const statisticsFoundationsModule01:
  LessonContent[] = [

  /* ========================================================================
     LESSON 01
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m1-l1-thinking-with-data",

    title:
      "What does it mean to think with data?",

    subtitle:
      "Statistics begins with questions—not calculations.",

    estimatedMinutes:
      25,


    objectives: [
      "Explain what statistics is and why it is useful.",
      "Distinguish between data, information and evidence.",
      "Recognise the role of variation in statistical thinking.",
      "Identify the question, population and variables in a simple study.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Statistics is often introduced as a collection of formulas, graphs and calculations. But its real purpose is much broader. Statistics gives us a disciplined way to learn from data when there is uncertainty and variation.",
      },


      {
        type:
          "paragraph",

        text:
          "A statistical investigation usually begins with a question. We collect or obtain data that may help answer that question, examine patterns in those data, quantify uncertainty and decide what conclusions are justified.",
      },


      {
        type:
          "callout",

        title:
          "Central idea",

        text:
          "Statistics is the science of learning from data while recognising uncertainty and variation.",
      },


      {
        type:
          "heading",

        text:
          "Data are observations, not conclusions",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose we record the heights of 100 students. Those measurements are data. The average height is a summary calculated from those data. A statement such as 'students at this school are taller than students nationally' is a conclusion that requires additional evidence and comparison.",
      },


      {
        type:
          "paragraph",

        text:
          "Keeping these stages separate matters. Data do not automatically tell us what conclusion to make. Statistical reasoning connects observations to conclusions.",
      },


      {
        type:
          "heading",

        text:
          "Why variation matters",
      },


      {
        type:
          "paragraph",

        text:
          "If every observation were identical, many statistical problems would be easy. Real data vary. People have different heights, examination scores differ, temperatures change from day to day and repeated measurements contain random fluctuation.",
      },


      {
        type:
          "paragraph",

        text:
          "Statistics helps us determine which differences appear meaningful and which might simply reflect ordinary variation.",
      },


      {
        type:
          "bullets",

        items: [
          "Individuals differ from one another.",
          "Measurements are rarely perfectly precise.",
          "Samples differ from other samples.",
          "Observed patterns can partly arise through chance variation.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Four questions to ask first",
      },


      {
        type:
          "paragraph",

        text:
          "Before calculating anything, understand the problem. A useful statistical habit is to identify the question, the population of interest, the observations being studied and the variables being measured.",
      },


      {
        type:
          "bullets",

        items: [
          "Question — what are we trying to learn?",
          "Population — who or what do we ultimately care about?",
          "Observations — what units were actually measured?",
          "Variables — what characteristics were recorded?",
        ],
      },


      {
        type:
          "callout",

        title:
          "Good statistical habit",

        text:
          "Never begin with a statistical test. Begin by understanding the question and the data.",
      },

    ],


    workedExamples: [

      {
        title:
          "Study time and examination performance",

        question:
          "A school records weekly study hours and final examination scores for 200 students. What are the observations, variables and likely population?",

        steps: [
          "Identify what each row of the dataset represents. Here, each row represents one student.",
          "The observations are therefore the 200 students whose information was recorded.",
          "The measured variables include weekly study hours and final examination score.",
          "The population depends on the research question. If the school wants to understand all of its students, then all students at the school form the target population.",
        ],

        answer:
          "Observations: the 200 students. Variables: weekly study hours and examination score. Population: the wider group of students the investigation aims to understand.",
      },


      {
        title:
          "Comparing two treatments",

        question:
          "Researchers compare recovery times for patients receiving Treatment A and Treatment B. Why is variation important?",

        steps: [
          "Patients will not all recover at exactly the same speed.",
          "Recovery times will vary even among patients receiving the same treatment.",
          "A difference between the two group averages could reflect a genuine treatment difference, ordinary patient-to-patient variation or both.",
          "Statistical reasoning asks whether the observed difference is convincing relative to the amount of variation present.",
        ],

        answer:
          "Variation matters because the observed difference between treatments must be interpreted relative to the natural variability in recovery times.",
      },

    ],


    exercises: [

      {
        question:
          "A researcher records daily screen time and hours of sleep for 500 teenagers. Identify the observations and variables.",

        hint:
          "Ask what each row of the dataset represents.",

        answer:
          "The observations are the 500 teenagers. The variables include daily screen time and hours of sleep.",
      },


      {
        question:
          "Why could calculating an average before understanding how the observations were selected be misleading?",

        hint:
          "Think about whether the observations represent the population of interest.",

        answer:
          "A mathematically correct average may still provide misleading evidence if the sample is biased, poorly measured or not representative of the population we want to understand.",
      },


      {
        question:
          "Give one example of natural variation and one example of measurement variation.",

        answer:
          "Natural variation could be differences in blood pressure between people. Measurement variation could arise if repeated blood-pressure readings differ slightly because of instrument precision or measurement conditions.",
      },

    ],


    quiz: [

      {
        question:
          "Which statement best describes the purpose of statistics?",

        options: [
          "To calculate averages",
          "To eliminate uncertainty from data",
          "To learn from data while accounting for uncertainty and variation",
          "To prove that an observed pattern must always be true",
        ],

        correctIndex:
          2,

        explanation:
          "Statistics is fundamentally about learning from data while recognising uncertainty and variation.",
      },


      {
        question:
          "In a dataset containing one row per patient, what does each row usually represent?",

        options: [
          "A variable",
          "An observation",
          "A population",
          "A statistical model",
        ],

        correctIndex:
          1,

        explanation:
          "Each patient is an observational unit, so each row represents an observation.",
      },


      {
        question:
          "Why is variation important in statistics?",

        options: [
          "Because every measurement should be different",
          "Because variation helps distinguish meaningful patterns from ordinary fluctuation",
          "Because averages cannot be calculated without variation",
          "Because variation always indicates measurement error",
        ],

        correctIndex:
          1,

        explanation:
          "Statistical reasoning asks whether observed patterns are convincing relative to the variation present in the data.",
      },

    ],


    summary: [
      "Statistics is about reasoning from data, not simply performing calculations.",
      "Data are observations; conclusions require interpretation.",
      "Variation is a fundamental feature of real-world data.",
      "Before analysing data, identify the question, population, observations and variables.",
      "Good statistical analysis begins by understanding the problem rather than choosing a statistical test.",
    ],


    nextStep:
      "Next, we will examine different types of variables and why the type of data determines which summaries, graphs and analyses make sense.",
  },


  /* ========================================================================
     LESSON 02
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m1-l2-thinking-with-data",

    title:
      "Types of data and variables",

    subtitle:
      "Before choosing a graph or calculation, understand what kind of variable you have.",

    estimatedMinutes:
      30,


    objectives: [
      "Explain the difference between an observation, a variable and a value.",
      "Distinguish categorical variables from numerical variables.",
      "Recognise nominal and ordinal categorical variables.",
      "Distinguish discrete from continuous numerical variables.",
      "Recognise when numbers are being used as labels rather than quantities.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A dataset usually consists of observations and variables. Each observation represents a unit being studied, such as a person, school, hospital or country. Variables record characteristics of those observations.",
      },


      {
        type:
          "paragraph",

        text:
          "If each row of a table represents one student, then age, height, examination grade and preferred subject could all be variables. The particular entry for one student is the value of that variable for that observation.",
      },


      {
        type:
          "callout",

        title:
          "Three different ideas",

        text:
          "Observation = the unit being studied. Variable = a characteristic recorded about the unit. Value = the particular result recorded for one observation.",
      },


      {
        type:
          "heading",

        text:
          "Categorical variables",
      },


      {
        type:
          "paragraph",

        text:
          "Categorical variables place observations into groups or categories. Examples include blood group, country of residence, treatment group and whether a student passed an examination.",
      },


      {
        type:
          "paragraph",

        text:
          "Some categorical variables have no natural order. These are often called nominal variables. Blood groups A, B, AB and O are an example: one category is not naturally higher or lower than another.",
      },


      {
        type:
          "paragraph",

        text:
          "Other categorical variables do have a meaningful order. These are ordinal variables. A satisfaction response such as dissatisfied, neutral and satisfied has a natural ordering even though the distance between categories is not necessarily measurable.",
      },


      {
        type:
          "bullets",

        items: [
          "Nominal categorical variable — categories have no natural ranking.",
          "Ordinal categorical variable — categories have a meaningful order.",
          "Binary variable — a categorical variable with exactly two possible categories.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Numerical variables",
      },


      {
        type:
          "paragraph",

        text:
          "Numerical variables represent quantities for which arithmetic has meaningful interpretation. Height, age, income, examination score and number of hospital visits are examples.",
      },


      {
        type:
          "paragraph",

        text:
          "Numerical variables can often be divided into discrete and continuous variables. A discrete variable takes separate countable values. A continuous variable can, in principle, take any value within a range.",
      },


      {
        type:
          "bullets",

        items: [
          "Number of siblings — discrete because it is a count.",
          "Number of goals scored — discrete because only whole numbers are possible.",
          "Height — continuous because intermediate values are meaningful.",
          "Time taken to finish a race — continuous even if the stopwatch records only to the nearest second.",
        ],
      },


      {
        type:
          "heading",

        text:
          "A number is not always numerical data",
      },


      {
        type:
          "paragraph",

        text:
          "A common mistake is to classify a variable as numerical simply because it is stored using numbers. Numbers can also be labels. A student identification number such as 10482 identifies a student, but averaging several student IDs would have no useful meaning.",
      },


      {
        type:
          "paragraph",

        text:
          "Similarly, a dataset might code Treatment A as 1 and Treatment B as 2. Those numbers represent categories. The mean of 1 and 2 does not represent an intermediate treatment.",
      },


      {
        type:
          "callout",

        title:
          "Useful test",

        text:
          "Ask whether arithmetic on the values would have a meaningful interpretation. If not, the numbers may simply be labels or codes.",
      },


      {
        type:
          "heading",

        text:
          "Why variable type matters",
      },


      {
        type:
          "paragraph",

        text:
          "The type of variable affects how we summarise, visualise and analyse it. A bar chart may be appropriate for categories, while a histogram can describe the distribution of a numerical variable. A mean makes sense for many numerical variables but not for categories such as blood group.",
      },


      {
        type:
          "callout",

        title:
          "Statistical habit",

        text:
          "Before choosing a graph, summary statistic or statistical method, identify the type of each variable.",
      },

    ],


    workedExamples: [

      {
        title:
          "Classifying variables in a student survey",

        question:
          "A survey records student ID, age, number of siblings, favourite subject and satisfaction with school on a scale of low, medium or high. Classify each variable.",

        steps: [
          "Student ID uses numbers but functions only as an identifier, so it should be treated as a label rather than a numerical measurement.",
          "Age is numerical and may be treated as continuous when measured precisely.",
          "Number of siblings is numerical and discrete because it is a count.",
          "Favourite subject is categorical and nominal because the categories have no natural order.",
          "Satisfaction level is categorical and ordinal because low, medium and high have a meaningful ordering.",
        ],

        answer:
          "Student ID: identifier. Age: numerical, usually continuous. Number of siblings: numerical discrete. Favourite subject: categorical nominal. Satisfaction: categorical ordinal.",
      },


      {
        title:
          "Numbers used as category codes",

        question:
          "A clinical dataset records treatment using 0 = standard care and 1 = new treatment. Is treatment a numerical variable?",

        steps: [
          "The values 0 and 1 look numerical.",
          "However, they represent two named treatment categories.",
          "Adding or averaging the codes does not create a meaningful intermediate treatment.",
          "Therefore the variable should be understood as categorical and binary.",
        ],

        answer:
          "Treatment is a binary categorical variable even though the categories are stored using the numbers 0 and 1.",
      },

    ],


    exercises: [

      {
        question:
          "Classify each variable: blood group, body temperature, number of pets and pain rating of mild/moderate/severe.",

        hint:
          "Decide first whether each variable represents categories or quantities.",

        answer:
          "Blood group: categorical nominal. Body temperature: numerical continuous. Number of pets: numerical discrete. Pain rating: categorical ordinal.",
      },


      {
        question:
          "A postcode is stored using letters and numbers. Is it categorical or numerical?",

        hint:
          "Ask whether arithmetic with postcode values would make sense.",

        answer:
          "A postcode is categorical because it acts as a location label. The presence of digits does not make it a numerical measurement.",
      },


      {
        question:
          "A digital scale reports body mass only to the nearest kilogram. Does that automatically make body mass discrete?",

        answer:
          "No. Body mass is conceptually continuous because intermediate values exist. The measuring instrument has simply rounded the recorded value.",
      },

    ],


    quiz: [

      {
        question:
          "Which variable is discrete numerical?",

        options: [
          "Height",
          "Blood group",
          "Number of hospital visits",
          "Satisfaction category",
        ],

        correctIndex:
          2,

        explanation:
          "The number of hospital visits is a count and therefore takes separate whole-number values.",
      },


      {
        question:
          "Which variable is ordinal?",

        options: [
          "Country of birth",
          "Student identification number",
          "Poor / fair / good / excellent rating",
          "Body temperature",
        ],

        correctIndex:
          2,

        explanation:
          "The categories poor, fair, good and excellent have a meaningful order.",
      },


      {
        question:
          "A dataset codes urban = 1 and rural = 2. What type of variable is residence?",

        options: [
          "Continuous numerical",
          "Discrete numerical",
          "Categorical",
          "A measurement of magnitude",
        ],

        correctIndex:
          2,

        explanation:
          "The numbers are category codes. Arithmetic on them has no meaningful quantitative interpretation.",
      },


      {
        question:
          "Why does identifying variable type matter?",

        options: [
          "It determines how many observations are required",
          "It helps determine appropriate summaries, graphs and analyses",
          "Categorical variables cannot be analysed statistically",
          "All numerical variables must be normally distributed",
        ],

        correctIndex:
          1,

        explanation:
          "Different variable types require different ways of summarising, visualising and analysing the data.",
      },

    ],


    summary: [
      "Observations are the units being studied; variables are characteristics recorded about them.",
      "Categorical variables describe groups or categories.",
      "Nominal categories have no natural ordering, whereas ordinal categories do.",
      "Numerical variables can often be described as discrete counts or continuous measurements.",
      "Numbers can represent labels or codes and are not automatically numerical variables.",
      "Variable type influences which summaries, graphs and statistical methods are appropriate.",
    ],


    nextStep:
      "Next, we move from individual observations to the wider groups we want to understand: populations, samples and statistical studies.",
  },


  /* ========================================================================
     LESSON 03
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m1-l3-thinking-with-data",

    title:
      "Populations, samples and studies",

    subtitle:
      "Most statistical questions concern a large population, but we usually observe only a sample.",

    estimatedMinutes:
      30,


    objectives: [
      "Define a population, target population and sample.",
      "Distinguish a parameter from a statistic.",
      "Identify the observational unit in a study.",
      "Explain why representativeness matters.",
      "Recognise why a large sample is not automatically a good sample.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Many statistical investigations aim to understand a group that is too large, expensive or impractical to measure completely. Instead, we collect information from a smaller group and use those observations to learn about the wider population.",
      },


      {
        type:
          "heading",

        text:
          "Population and sample",
      },


      {
        type:
          "paragraph",

        text:
          "The population is the complete set of individuals or units about which we want information. The sample is the subset of that population that is actually observed.",
      },


      {
        type:
          "callout",

        title:
          "Core relationship",

        text:
          "We observe the sample because we want to learn something about the population.",
      },


      {
        type:
          "paragraph",

        text:
          "For example, suppose a university wants to estimate average weekly study time among all of its undergraduate students. All undergraduate students at the university form the target population. If 600 students complete a survey, those 600 students form the sample.",
      },


      {
        type:
          "heading",

        text:
          "The target population",
      },


      {
        type:
          "paragraph",

        text:
          "It is useful to be precise about the population the study aims to represent. This is often called the target population. A survey of students at one school cannot automatically tell us about all teenagers nationally.",
      },


      {
        type:
          "paragraph",

        text:
          "Statistical conclusions should therefore match the population that the study design can reasonably represent.",
      },


      {
        type:
          "heading",

        text:
          "Parameters and statistics",
      },


      {
        type:
          "paragraph",

        text:
          "A numerical feature of the population is called a parameter. A corresponding value calculated from the sample is called a statistic.",
      },


      {
        type:
          "bullets",

        items: [
          "Population mean height — parameter.",
          "Mean height of 200 sampled students — statistic.",
          "True percentage of all voters supporting a candidate — parameter.",
          "Percentage supporting the candidate in a survey of 1,000 voters — statistic.",
        ],
      },


      {
        type:
          "callout",

        title:
          "Parameter versus statistic",

        text:
          "A parameter describes the population. A statistic is calculated from the sample and is often used to estimate the parameter.",
      },


      {
        type:
          "heading",

        text:
          "Observational units",
      },


      {
        type:
          "paragraph",

        text:
          "The observational unit is the entity on which measurements are made. In many datasets this is a person, but it could also be a household, hospital, country, school, animal, experiment or day.",
      },


      {
        type:
          "paragraph",

        text:
          "Identifying the observational unit helps us understand what each row represents and prevents confusion about the level at which data were collected.",
      },


      {
        type:
          "heading",

        text:
          "Why representativeness matters",
      },


      {
        type:
          "paragraph",

        text:
          "A sample is useful only if the connection between the sample and the population is credible. If certain types of people are systematically more likely to be included than others, the sample may produce a distorted picture.",
      },


      {
        type:
          "paragraph",

        text:
          "For example, estimating average physical activity among all students using only members of university sports clubs would likely overestimate activity levels.",
      },


      {
        type:
          "heading",

        text:
          "Large does not automatically mean representative",
      },


      {
        type:
          "paragraph",

        text:
          "A sample containing thousands of observations can still be biased. Increasing sample size can reduce random sampling variation, but it does not automatically repair a poor selection process.",
      },


      {
        type:
          "callout",

        title:
          "Important principle",

        text:
          "A smaller well-selected sample can provide more trustworthy evidence than a huge biased sample.",
      },

    ],


    workedExamples: [

      {
        title:
          "A school wellbeing survey",

        question:
          "A school has 2,400 students. Researchers invite 300 randomly selected students to complete a wellbeing survey, and 250 respond. Identify the target population, invited sample and observed sample.",

        steps: [
          "The research question concerns all students at the school, so the 2,400 students form the target population.",
          "The 300 selected students form the intended sample.",
          "Only 250 students actually responded and therefore supplied observations.",
          "The difference between invited and observed samples matters because non-response may affect representativeness.",
        ],

        answer:
          "Target population: all 2,400 students. Selected sample: 300 invited students. Observed sample: 250 respondents.",
      },


      {
        title:
          "A national opinion poll",

        question:
          "A poll of 1,200 adults reports that 48% support a proposal. Which value is a statistic and what population quantity is it trying to estimate?",

        steps: [
          "The value 48% was calculated from the surveyed sample.",
          "Therefore 48% is a sample statistic.",
          "The quantity of real interest is the percentage of adults in the target population who support the proposal.",
          "That unknown population percentage is a parameter.",
        ],

        answer:
          "The 48% is a statistic. It is being used to estimate the population parameter: the true proportion of adults in the target population who support the proposal.",
      },

    ],


    exercises: [

      {
        question:
          "A researcher measures blood pressure in 500 adults to estimate average blood pressure among adults living in a city. Identify the population, sample and observational unit.",

        answer:
          "Population: adults in the city who the study aims to represent. Sample: the 500 measured adults. Observational unit: one adult.",
      },


      {
        question:
          "A website asks visitors to voluntarily vote on whether public transport should be free. It receives 50,000 responses. Why might the large sample still be misleading?",

        hint:
          "Think about who chooses to participate.",

        answer:
          "The respondents are self-selected. People with especially strong opinions may be more likely to participate, so the large sample may not represent the wider population.",
      },


      {
        question:
          "Explain the difference between the mean examination score of all students at a school and the mean score among 100 sampled students.",

        answer:
          "The mean for all students is a population parameter. The mean calculated from the 100 sampled students is a statistic used to estimate that parameter.",
      },

    ],


    quiz: [

      {
        question:
          "Which statement correctly distinguishes a parameter from a statistic?",

        options: [
          "A parameter describes a sample and a statistic describes a population",
          "A parameter describes a population and a statistic is calculated from a sample",
          "Parameters are always known exactly",
          "Statistics can only be percentages",
        ],

        correctIndex:
          1,

        explanation:
          "Parameters describe populations, while statistics are quantities calculated from samples.",
      },


      {
        question:
          "What is the observational unit in a dataset containing one row for every hospital?",

        options: [
          "A patient",
          "A hospital",
          "A variable",
          "The entire healthcare system",
        ],

        correctIndex:
          1,

        explanation:
          "Each row represents one hospital, so the hospital is the observational unit.",
      },


      {
        question:
          "Why does representativeness matter?",

        options: [
          "A representative sample guarantees there is no uncertainty",
          "It helps make the sample relevant to the population we want to understand",
          "Representative samples must contain the entire population",
          "It allows us to ignore how the sample was collected",
        ],

        correctIndex:
          1,

        explanation:
          "Inference from sample to population is credible only when the sample has a reasonable connection to the target population.",
      },


      {
        question:
          "Which statement about sample size is correct?",

        options: [
          "Any sample above 1,000 observations must be representative",
          "A large sample automatically removes bias",
          "A large biased sample can still give misleading results",
          "Small samples can never be useful",
        ],

        correctIndex:
          2,

        explanation:
          "Increasing sample size reduces some forms of random variability but does not automatically remove systematic selection bias.",
      },

    ],


    summary: [
      "The population is the complete group we want to understand.",
      "The sample is the subset that is actually observed.",
      "A parameter describes a population, while a statistic is calculated from a sample.",
      "The observational unit identifies what each row of a dataset represents.",
      "Statistical conclusions should match the target population that the study can reasonably represent.",
      "A large sample can still be misleading if the selection process is biased.",
    ],


    nextStep:
      "Next, we bring the ideas together by asking how statistical questions, study design and evidence determine what conclusions we can responsibly make.",
  },


  /* ========================================================================
     LESSON 04
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m1-l4-thinking-with-data",

    title:
      "From questions to evidence",

    subtitle:
      "Good statistical analysis begins with the question and ends with a conclusion that the evidence can actually support.",

    estimatedMinutes:
      35,


    objectives: [
      "Recognise what makes a question statistical.",
      "Distinguish descriptive, comparative, association and prediction questions.",
      "Explain the difference between observational studies and experiments.",
      "Recognise the role of confounding when interpreting associations.",
      "Distinguish association from causation.",
      "Write conclusions that match the strength and limitations of the evidence.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Statistics is most useful when the question comes before the method. Before collecting data or choosing an analysis, we should be clear about what we want to learn.",
      },


      {
        type:
          "heading",

        text:
          "What makes a question statistical?",
      },


      {
        type:
          "paragraph",

        text:
          "A statistical question anticipates variation in the data. Asking 'How tall is one particular student?' has a single factual answer. Asking 'How tall are students at this school?' expects different students to have different heights and therefore requires us to reason about a distribution.",
      },


      {
        type:
          "callout",

        title:
          "Statistical question",

        text:
          "A statistical question is one for which we expect variation in the observations and use data to understand that variation.",
      },


      {
        type:
          "heading",

        text:
          "Different questions require different reasoning",
      },


      {
        type:
          "paragraph",

        text:
          "Not every statistical investigation asks the same kind of question. Recognising the goal helps determine what data and methods are appropriate.",
      },


      {
        type:
          "bullets",

        items: [
          "Descriptive question — what does this group or dataset look like?",
          "Comparative question — how do two or more groups differ?",
          "Association question — are two variables related?",
          "Prediction question — can one set of variables help predict another outcome?",
          "Causal question — what would happen if we changed an exposure or intervention?",
        ],
      },


      {
        type:
          "heading",

        text:
          "Observational studies",
      },


      {
        type:
          "paragraph",

        text:
          "In an observational study, researchers measure what naturally occurs rather than assigning the exposure of interest. For example, researchers might record students' study time and examination scores without deciding how long each student studies.",
      },


      {
        type:
          "paragraph",

        text:
          "Observational studies can reveal associations, but interpreting those associations requires care because other variables may help explain the relationship.",
      },


      {
        type:
          "heading",

        text:
          "Experiments",
      },


      {
        type:
          "paragraph",

        text:
          "In an experiment, researchers deliberately assign an intervention or condition and compare outcomes. Carefully designed randomised experiments can provide much stronger evidence about causal effects because random assignment helps create comparable groups.",
      },


      {
        type:
          "paragraph",

        text:
          "Not every question can or should be studied experimentally. Ethical and practical constraints often mean that observational studies are necessary.",
      },


      {
        type:
          "heading",

        text:
          "Association does not automatically imply causation",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose students who study more hours tend to achieve higher examination scores. The two variables are associated, but that observation alone does not prove that additional study time caused the difference.",
      },


      {
        type:
          "paragraph",

        text:
          "Students who study more may differ in motivation, prior attainment, attendance, access to resources or many other characteristics. These additional variables can complicate causal interpretation.",
      },


      {
        type:
          "heading",

        text:
          "Confounding",
      },


      {
        type:
          "paragraph",

        text:
          "A confounding variable is a third factor related to both the exposure and the outcome that can distort or partly explain an observed association.",
      },


      {
        type:
          "callout",

        title:
          "Example",

        text:
          "Ice-cream sales and sunburn cases may rise together because both increase during hot sunny weather. Temperature is a plausible confounding factor; buying ice cream does not cause sunburn.",
      },


      {
        type:
          "heading",

        text:
          "From data to responsible evidence",
      },


      {
        type:
          "paragraph",

        text:
          "A strong conclusion should answer the original question while respecting the design of the study, the quality of the data and the uncertainty that remains.",
      },


      {
        type:
          "bullets",

        items: [
          "Describe what was actually observed.",
          "Distinguish association from causation.",
          "Consider possible bias and confounding.",
          "Avoid making the conclusion broader than the population studied.",
          "Acknowledge uncertainty and limitations.",
        ],
      },


      {
        type:
          "callout",

        title:
          "Responsible conclusion",

        text:
          "Say what the evidence supports—not what would make the strongest headline.",
      },


      {
        type:
          "heading",

        text:
          "A complete statistical investigation",
      },


      {
        type:
          "paragraph",

        text:
          "The ideas from this first module can be combined into a simple workflow. Begin with the question. Identify the population and observations. Understand the variables. Examine how the data were collected. Analyse the patterns and variation. Then make a conclusion that matches the evidence.",
      },


      {
        type:
          "bullets",

        items: [
          "Question",
          "Population",
          "Sample",
          "Observational units",
          "Variables",
          "Study design",
          "Patterns and variation",
          "Uncertainty",
          "Evidence",
          "Conclusion",
        ],
      },

    ],


    workedExamples: [

      {
        title:
          "Does study time improve examination performance?",

        question:
          "Researchers find that students reporting more weekly study time tend to have higher examination scores. Can they conclude that increasing study time causes higher scores?",

        steps: [
          "The researchers observed study behaviour rather than assigning study time.",
          "The study is therefore observational.",
          "The association between study time and examination score may be genuine.",
          "However, students who study more may differ in motivation, prior achievement, attendance or other factors.",
          "Those differences could confound the relationship.",
          "Therefore the observational association alone does not establish causation.",
        ],

        answer:
          "The researchers can report an association between study time and examination performance, but the observational data alone do not prove that increasing study time causes the higher scores.",
      },


      {
        title:
          "Comparing two teaching approaches",

        question:
          "Two hundred students are randomly assigned to either a standard teaching programme or a new programme. Their examination scores are compared at the end of the term. Why does this design provide stronger evidence about causation?",

        steps: [
          "The teaching approach is assigned by the researchers rather than merely observed.",
          "Students are randomly allocated to the two groups.",
          "Random assignment helps balance both measured and unmeasured characteristics between groups on average.",
          "A systematic difference in outcomes is therefore more plausibly attributable to the assigned teaching approach than in a purely observational comparison.",
        ],

        answer:
          "Randomised assignment makes the groups more comparable and therefore provides stronger evidence about the causal effect of the teaching programme.",
      },

    ],


    exercises: [

      {
        question:
          "Is the question 'How many pets does Rahul own?' a statistical question? What about 'How many pets do students in this class own?'",

        hint:
          "Think about whether variation among observations is expected.",

        answer:
          "The first asks for one fixed value and is not primarily statistical. The second anticipates variation across students and is a statistical question.",
      },


      {
        question:
          "A survey finds that people who exercise more report better mental wellbeing. Give two reasons why this association alone does not prove that exercise caused the difference.",

        answer:
          "Possible explanations include confounding factors such as health, income or social circumstances, and reverse-direction possibilities such as people with better wellbeing being more likely to exercise. Observational association alone does not establish causal direction.",
      },


      {
        question:
          "Researchers observe that students attending optional revision sessions score higher on average than students who do not attend. Identify one plausible confounder.",

        answer:
          "Motivation is a plausible confounder because more motivated students may be more likely to attend revision sessions and may also perform better independently of the sessions.",
      },


      {
        question:
          "Rewrite the claim 'Using social media causes poor sleep' into a more responsible conclusion if it came from an observational survey showing that heavier social-media users slept fewer hours.",

        answer:
          "A more appropriate conclusion would be: 'Greater reported social-media use was associated with fewer hours of sleep in this survey. The observational design does not establish that social-media use caused the difference.'",
      },

    ],


    quiz: [

      {
        question:
          "Which is a statistical question?",

        options: [
          "What is the temperature outside right now?",
          "What is Rahul's age?",
          "How much sleep do students at this school typically get?",
          "What is the serial number of this laptop?",
        ],

        correctIndex:
          2,

        explanation:
          "The sleep question anticipates variation among many students and therefore requires statistical reasoning.",
      },


      {
        question:
          "Researchers record coffee consumption and examination scores without assigning coffee intake. What type of study is this?",

        options: [
          "Randomised experiment",
          "Observational study",
          "Census",
          "Simulation",
        ],

        correctIndex:
          1,

        explanation:
          "Researchers are observing naturally occurring exposure rather than assigning it.",
      },


      {
        question:
          "What is confounding?",

        options: [
          "Random arithmetic error",
          "A third variable that can help explain an observed exposure-outcome association",
          "Having too few observations",
          "Using more than one numerical variable",
        ],

        correctIndex:
          1,

        explanation:
          "Confounding occurs when another factor is related to both the exposure and outcome and complicates interpretation of their association.",
      },


      {
        question:
          "Which conclusion is most appropriate from an observational study finding that students who sleep more obtain higher grades?",

        options: [
          "Sleeping more definitely causes better grades",
          "Grades cause students to sleep more",
          "More sleep was associated with higher grades, but the study alone does not establish causation",
          "The association must be due to chance",
        ],

        correctIndex:
          2,

        explanation:
          "Observational studies can provide evidence of association, but causal conclusions generally require stronger assumptions or study designs.",
      },


      {
        question:
          "Why can random assignment strengthen causal evidence?",

        options: [
          "It guarantees every participant has the same outcome",
          "It helps create comparable groups with respect to other characteristics",
          "It removes all random variation",
          "It makes sample size irrelevant",
        ],

        correctIndex:
          1,

        explanation:
          "Random assignment helps distribute other characteristics across groups, reducing systematic differences that could otherwise confound the comparison.",
      },

    ],


    summary: [
      "Statistical questions anticipate variation in the observations.",
      "Statistical questions may be descriptive, comparative, associational, predictive or causal.",
      "Observational studies measure naturally occurring differences, while experiments assign interventions or conditions.",
      "Association does not automatically demonstrate causation.",
      "Confounding can distort or partly explain an observed association.",
      "Conclusions should reflect the population studied, the study design, uncertainty and possible limitations.",
      "A responsible statistical investigation connects the question, data, design, analysis and conclusion.",
    ],


    nextStep:
      "Module 2 begins by moving from individual observations to entire distributions: how data are organised, visualised and described.",
  },

];