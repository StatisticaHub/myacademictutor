import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   STATISTICS FOUNDATIONS
   MODULE 02 — DESCRIBING DISTRIBUTIONS
   ========================================================================== */

export const statisticsFoundationsModule02:
  LessonContent[] = [

  /* ========================================================================
     LESSON 05
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m2-l1-describing-distributions",

    title:
      "Seeing a distribution",

    subtitle:
      "A distribution shows how the values of a variable are spread across the observations.",

    estimatedMinutes:
      30,


    objectives: [
      "Explain what a distribution represents.",
      "Construct and interpret frequency and relative-frequency summaries.",
      "Distinguish a bar chart from a histogram.",
      "Interpret the shape of a numerical distribution.",
      "Recognise how graphical choices can affect what we see.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Once we have identified a numerical variable, an important next question is how its values are distributed. Rather than examining observations one at a time, we look at the pattern formed by the dataset as a whole.",
      },


      {
        type:
          "callout",

        title:
          "Distribution",

        text:
          "The distribution of a variable describes which values occur and how frequently they occur.",
      },


      {
        type:
          "heading",

        text:
          "From raw values to a pattern",
      },


      {
        type:
          "paragraph",

        text:
          "Consider ten examination scores: 42, 48, 51, 55, 55, 61, 64, 68, 73 and 84. Reading the numbers individually is possible, but a graph or frequency summary makes the overall pattern much easier to recognise.",
      },


      {
        type:
          "paragraph",

        text:
          "When describing a numerical distribution, we eventually want to think about where values tend to lie, how widely they vary, the overall shape and whether any observations appear unusual.",
      },


      {
        type:
          "bullets",

        items: [
          "Centre — where are typical observations located?",
          "Spread — how much do observations vary?",
          "Shape — is the distribution symmetric, skewed or multi-peaked?",
          "Unusual observations — are any values separated from the main body of data?",
        ],
      },


      {
        type:
          "heading",

        text:
          "Frequency and relative frequency",
      },


      {
        type:
          "paragraph",

        text:
          "Frequency tells us how many observations fall into a particular category or interval. Relative frequency expresses that count as a proportion or percentage of the dataset.",
      },


      {
        type:
          "callout",

        title:
          "Example",

        text:
          "If 18 of 60 students travel to school by bus, the frequency is 18 and the relative frequency is 18/60 = 0.30, or 30%.",
      },


      {
        type:
          "heading",

        text:
          "Bar charts and histograms are not the same",
      },


      {
        type:
          "paragraph",

        text:
          "Bar charts are generally used for categorical variables. Each bar represents a category, and gaps between bars emphasise that the categories are distinct.",
      },


      {
        type:
          "paragraph",

        text:
          "Histograms are used for numerical variables. Values are grouped into intervals called bins, and neighbouring bars touch because the numerical scale is continuous across the horizontal axis.",
      },


      {
        type:
          "bullets",

        items: [
          "Bar chart — categories on the horizontal axis.",
          "Histogram — numerical intervals on the horizontal axis.",
          "Histogram bars usually touch.",
          "The width and placement of histogram bins can influence the apparent shape.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Bin width matters",
      },


      {
        type:
          "paragraph",

        text:
          "A histogram is a summary rather than a perfect representation of every observation. Very wide bins may hide interesting structure, while extremely narrow bins may make random detail look important.",
      },


      {
        type:
          "callout",

        title:
          "Statistical habit",

        text:
          "Use graphs to understand data, but remember that graphical design choices can influence the story a graph appears to tell.",
      },

    ],


    workedExamples: [

      {
        title:
          "Travel time to school",

        question:
          "Twenty students report their journey times. Most are between 10 and 30 minutes, while two students travel for around 60 minutes. What features of the distribution should you notice?",

        steps: [
          "First identify where most observations occur: approximately 10–30 minutes.",
          "Notice the overall spread from the shortest to longest journeys.",
          "The two values near 60 minutes sit well above most observations.",
          "These observations may create a longer upper tail and should be examined rather than automatically removed.",
        ],

        answer:
          "The distribution is concentrated around 10–30 minutes with a longer upper tail caused by a small number of much longer journeys.",
      },


      {
        title:
          "Bar chart or histogram?",

        question:
          "Which graph is more appropriate for favourite school subject, and which is more appropriate for students' heights?",

        steps: [
          "Favourite subject is a categorical variable.",
          "A bar chart can compare the frequencies of categories such as mathematics, biology and history.",
          "Height is a continuous numerical variable.",
          "A histogram can group heights into numerical intervals and display the distribution.",
        ],

        answer:
          "Use a bar chart for favourite subject and a histogram for height.",
      },

    ],


    exercises: [

      {
        question:
          "In a class of 40 students, 14 choose mathematics as their favourite subject. Find the relative frequency.",

        hint:
          "Divide the frequency by the total number of observations.",

        answer:
          "14/40 = 0.35, so the relative frequency is 35%.",
      },


      {
        question:
          "Why would a histogram usually be inappropriate for blood group?",

        answer:
          "Blood group is categorical rather than numerical. The categories do not form numerical intervals, so a bar chart is more appropriate.",
      },


      {
        question:
          "Why might changing histogram bin widths change how a distribution appears?",

        answer:
          "Bins group observations together. Wider bins can hide detail, while narrow bins can emphasise small fluctuations, so the apparent shape can change even though the underlying data remain the same.",
      },

    ],


    quiz: [

      {
        question:
          "What does the distribution of a variable describe?",

        options: [
          "Only its largest value",
          "Which values occur and how frequently they occur",
          "The number of variables in the dataset",
          "Whether the study is experimental",
        ],

        correctIndex:
          1,

        explanation:
          "A distribution describes the pattern of values and their frequencies.",
      },


      {
        question:
          "Which graph is generally appropriate for a continuous numerical variable?",

        options: [
          "Histogram",
          "Pie chart only",
          "Category bar chart only",
          "Flow chart",
        ],

        correctIndex:
          0,

        explanation:
          "A histogram groups numerical values into intervals and displays their frequencies.",
      },


      {
        question:
          "If 25 out of 100 observations belong to a category, what is the relative frequency?",

        options: [
          "0.025",
          "0.25",
          "2.5",
          "25 observations cannot be converted to relative frequency",
        ],

        correctIndex:
          1,

        explanation:
          "25/100 = 0.25, or 25%.",
      },


      {
        question:
          "Which statement about histogram bins is correct?",

        options: [
          "Changing the bins changes the original observations",
          "Bin width can influence the apparent shape of the histogram",
          "Every histogram must use exactly ten bins",
          "Bins are only used for categorical variables",
        ],

        correctIndex:
          1,

        explanation:
          "The data stay the same, but different bin choices can make the displayed pattern look different.",
      },

    ],


    summary: [
      "A distribution describes the values of a variable and how frequently they occur.",
      "Frequency is a count; relative frequency expresses that count as a proportion or percentage.",
      "Bar charts are usually used for categorical variables.",
      "Histograms are used to examine distributions of numerical variables.",
      "When examining a distribution, consider centre, spread, shape and unusual observations.",
      "Graphical design choices such as histogram bin width can affect the pattern we perceive.",
    ],


    nextStep:
      "Next, we quantify where the centre of a distribution lies using the mean, median and other measures of typical value.",
  },


  /* ========================================================================
     LESSON 06
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m2-l2-describing-distributions",

    title:
      "Measuring the centre",

    subtitle:
      "Different measures of centre answer slightly different questions about what is typical.",

    estimatedMinutes:
      30,


    objectives: [
      "Calculate and interpret the mean, median and mode.",
      "Explain how the mean and median respond differently to extreme observations.",
      "Choose an appropriate measure of centre for a distribution.",
      "Understand the idea of a weighted mean.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A distribution may contain many observations, so we often want a single value that describes its centre. There is no universally best measure of centre. Different summaries capture different aspects of what we might call typical.",
      },


      {
        type:
          "heading",

        text:
          "The mean",
      },


      {
        type:
          "paragraph",

        text:
          "The arithmetic mean is found by adding all observations and dividing by the number of observations. Every value contributes to the mean.",
      },


      {
        type:
          "callout",

        title:
          "Mean",

        text:
          "Mean = sum of the observations ÷ number of observations.",
      },


      {
        type:
          "paragraph",

        text:
          "Because every observation contributes to the calculation, unusually large or small values can strongly influence the mean.",
      },


      {
        type:
          "heading",

        text:
          "The median",
      },


      {
        type:
          "paragraph",

        text:
          "The median is the middle observation after the values have been ordered. If there are an even number of observations, it is the average of the two middle values.",
      },


      {
        type:
          "paragraph",

        text:
          "The median depends mainly on the ordering of observations rather than their exact distances from one another. This makes it more resistant to extreme values.",
      },


      {
        type:
          "heading",

        text:
          "Mean versus median",
      },


      {
        type:
          "paragraph",

        text:
          "Consider 2, 3, 4, 5 and 6. Both the mean and median are 4. Now replace 6 with 36. The median remains 4, while the mean increases substantially.",
      },


      {
        type:
          "callout",

        title:
          "Resistance",

        text:
          "A resistant statistic is not strongly affected by a small number of extreme observations. The median is more resistant than the mean.",
      },


      {
        type:
          "heading",

        text:
          "The mode",
      },


      {
        type:
          "paragraph",

        text:
          "The mode is the most frequently occurring value or category. A dataset may have one mode, several modes or no uniquely most frequent value.",
      },


      {
        type:
          "paragraph",

        text:
          "The mode can be particularly useful for categorical data, where a numerical mean or median may not make sense.",
      },


      {
        type:
          "heading",

        text:
          "Weighted means",
      },


      {
        type:
          "paragraph",

        text:
          "Sometimes observations do not contribute equally to an overall average. A weighted mean gives different observations or components different importance.",
      },


      {
        type:
          "callout",

        title:
          "Example",

        text:
          "If coursework contributes 30% of a final grade and an examination contributes 70%, the final mark is a weighted mean rather than a simple average of the two scores.",
      },


      {
        type:
          "heading",

        text:
          "Which measure should we report?",
      },


      {
        type:
          "paragraph",

        text:
          "For a reasonably symmetric distribution without influential extreme observations, the mean can give a useful summary of centre. For strongly skewed data or data containing extreme values, the median may better represent a typical observation.",
      },


      {
        type:
          "callout",

        title:
          "Do not choose automatically",

        text:
          "The appropriate measure of centre depends on the distribution and on the question being asked.",
      },

    ],


    workedExamples: [

      {
        title:
          "The effect of one extreme salary",

        question:
          "Five employees earn £24k, £26k, £27k, £29k and £94k. Which measure better describes a typical salary?",

        steps: [
          "Order the observations. They are already ordered.",
          "The median is the middle value: £27k.",
          "The mean is £40k because the £94k salary pulls the average upward.",
          "Most employees earn much less than £40k.",
          "The median therefore better represents a typical employee in this small dataset.",
        ],

        answer:
          "The median of £27k is more representative of a typical salary because the mean is strongly affected by the unusually high £94k observation.",
      },


      {
        title:
          "A weighted course grade",

        question:
          "A student scores 80% on coursework worth 30% and 65% on an examination worth 70%. What is the final weighted mark?",

        steps: [
          "Multiply the coursework score by its weight: 80 × 0.30 = 24.",
          "Multiply the examination score by its weight: 65 × 0.70 = 45.5.",
          "Add the weighted contributions: 24 + 45.5 = 69.5.",
        ],

        answer:
          "The final weighted mark is 69.5%.",
      },

    ],


    exercises: [

      {
        question:
          "Find the mean and median of 4, 5, 5, 6 and 10.",

        answer:
          "Mean = 30/5 = 6. Median = 5.",
      },


      {
        question:
          "The waiting times are 5, 7, 8, 9, 11 and 60 minutes. Which measure of centre is likely to be more representative?",

        hint:
          "Consider the effect of the 60-minute observation.",

        answer:
          "The median is likely to be more representative because the unusually long 60-minute wait strongly increases the mean.",
      },


      {
        question:
          "A module consists of a project worth 40% and an exam worth 60%. A student scores 72 on the project and 64 on the exam. Find the weighted mark.",

        answer:
          "72 × 0.40 + 64 × 0.60 = 28.8 + 38.4 = 67.2.",
      },

    ],


    quiz: [

      {
        question:
          "Which measure of centre is generally most resistant to extreme observations?",

        options: [
          "Mean",
          "Median",
          "Weighted mean",
          "Range",
        ],

        correctIndex:
          1,

        explanation:
          "The median depends mainly on the ordering of values and is therefore less affected by extreme observations.",
      },


      {
        question:
          "What happens to the mean if one observation becomes extremely large?",

        options: [
          "It must remain unchanged",
          "It will generally be pulled upward",
          "It becomes the median",
          "It always becomes zero",
        ],

        correctIndex:
          1,

        explanation:
          "Every observation contributes to the mean, so a very large value can pull it upward.",
      },


      {
        question:
          "When can the mode be especially useful?",

        options: [
          "Only with continuous data",
          "For identifying the most common category",
          "Only when the mean equals the median",
          "Only for sample sizes above 100",
        ],

        correctIndex:
          1,

        explanation:
          "The mode identifies the most frequently occurring value or category and therefore can be meaningful for categorical variables.",
      },


      {
        question:
          "Why would we use a weighted mean?",

        options: [
          "When every observation contributes equally",
          "When different components should contribute different amounts",
          "Whenever the data are skewed",
          "To calculate the median",
        ],

        correctIndex:
          1,

        explanation:
          "A weighted mean is appropriate when components contribute unequally to the overall average.",
      },

    ],


    summary: [
      "The mean uses every observation and can be strongly influenced by extreme values.",
      "The median identifies the middle of the ordered data and is more resistant to extremes.",
      "The mode identifies the most frequently occurring value or category.",
      "A weighted mean allows components to contribute unequally.",
      "The best measure of centre depends on the distribution and the purpose of the analysis.",
    ],


    nextStep:
      "Knowing the centre is not enough. Next we measure how much observations vary around that centre.",
  },


  /* ========================================================================
     LESSON 07
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m2-l3-describing-distributions",

    title:
      "Measuring variability",

    subtitle:
      "Two datasets can have the same centre and still look completely different.",

    estimatedMinutes:
      35,


    objectives: [
      "Explain why a measure of centre alone is insufficient.",
      "Calculate and interpret the range and interquartile range.",
      "Explain the conceptual meaning of variance and standard deviation.",
      "Distinguish standard deviation from interquartile range.",
      "Compare distributions using both centre and spread.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A measure of centre tells us where a distribution is located, but it does not tell us how similar or different the observations are. To understand a distribution properly, we also need to describe its variability.",
      },


      {
        type:
          "callout",

        title:
          "Variability",

        text:
          "Variability describes how spread out the observations are.",
      },


      {
        type:
          "heading",

        text:
          "Same mean, different spread",
      },


      {
        type:
          "paragraph",

        text:
          "Consider the datasets 48, 49, 50, 51, 52 and 20, 35, 50, 65, 80. Both have a mean of 50, but the second dataset is far more variable.",
      },


      {
        type:
          "paragraph",

        text:
          "Reporting only the mean would hide this important difference.",
      },


      {
        type:
          "heading",

        text:
          "The range",
      },


      {
        type:
          "paragraph",

        text:
          "The range is the difference between the maximum and minimum observations.",
      },


      {
        type:
          "callout",

        title:
          "Range",

        text:
          "Range = maximum − minimum.",
      },


      {
        type:
          "paragraph",

        text:
          "The range is easy to understand but depends entirely on the two most extreme observations. A single unusual value can therefore change it dramatically.",
      },


      {
        type:
          "heading",

        text:
          "Quartiles and the interquartile range",
      },


      {
        type:
          "paragraph",

        text:
          "Quartiles divide ordered data into sections. The first quartile, Q1, marks approximately the 25th percentile, while the third quartile, Q3, marks approximately the 75th percentile.",
      },


      {
        type:
          "paragraph",

        text:
          "The interquartile range, or IQR, measures the width of the middle half of the observations.",
      },


      {
        type:
          "callout",

        title:
          "Interquartile range",

        text:
          "IQR = Q3 − Q1. Because it focuses on the middle 50% of observations, it is relatively resistant to extreme values.",
      },


      {
        type:
          "heading",

        text:
          "Deviation from the mean",
      },


      {
        type:
          "paragraph",

        text:
          "Another way to think about variability is to ask how far observations typically lie from the mean. For each observation, we can calculate its deviation from the mean.",
      },


      {
        type:
          "paragraph",

        text:
          "Positive and negative deviations would cancel if simply added, so variance uses squared deviations. This ensures that observations far from the mean make larger contributions.",
      },


      {
        type:
          "heading",

        text:
          "Variance and standard deviation",
      },


      {
        type:
          "paragraph",

        text:
          "Variance summarises the average squared distance from the mean. Because squared units can be difficult to interpret, we usually take the square root of the variance to obtain the standard deviation.",
      },


      {
        type:
          "callout",

        title:
          "Interpretation",

        text:
          "A larger standard deviation indicates that observations are typically more dispersed around the mean.",
      },


      {
        type:
          "paragraph",

        text:
          "Unlike the IQR, standard deviation uses every observation. This makes it informative but also sensitive to extreme values.",
      },


      {
        type:
          "heading",

        text:
          "Pair centre with spread",
      },


      {
        type:
          "paragraph",

        text:
          "Mean and standard deviation are commonly reported together for reasonably symmetric distributions without major outliers. Median and IQR are often more informative for skewed distributions or distributions containing influential extreme observations.",
      },


      {
        type:
          "bullets",

        items: [
          "Mean + standard deviation — often useful for fairly symmetric data.",
          "Median + IQR — often useful for skewed data or data containing extreme observations.",
          "Range — simple but highly sensitive to extremes.",
          "No summary should replace looking at the distribution itself.",
        ],
      },

    ],


    workedExamples: [

      {
        title:
          "Two classes with the same average",

        question:
          "Class A scores 48, 49, 50, 51, 52. Class B scores 30, 40, 50, 60, 70. Both means are 50. What differs?",

        steps: [
          "Calculate the range for Class A: 52 − 48 = 4.",
          "Calculate the range for Class B: 70 − 30 = 40.",
          "Both groups have the same centre according to the mean.",
          "However, Class B has much greater variability.",
        ],

        answer:
          "The groups have the same mean but very different spread. Class B's results are much more variable.",
      },


      {
        title:
          "Why an outlier affects standard deviation",

        question:
          "Why would changing one value from 12 to 100 usually increase the standard deviation substantially?",

        steps: [
          "Standard deviation is based on distances from the mean.",
          "A value of 100 may lie far from the rest of the observations.",
          "Its squared deviation is therefore very large.",
          "Because standard deviation uses all observations, the extreme value contributes strongly to the overall spread.",
        ],

        answer:
          "The extreme observation lies far from the mean and produces a large squared deviation, increasing the standard deviation.",
      },

    ],


    exercises: [

      {
        question:
          "Find the range of 4, 8, 9, 12 and 18.",

        answer:
          "Range = 18 − 4 = 14.",
      },


      {
        question:
          "If Q1 = 12 and Q3 = 27, find the IQR.",

        answer:
          "IQR = 27 − 12 = 15.",
      },


      {
        question:
          "Two distributions have the same mean. Distribution A has SD = 2 and Distribution B has SD = 12. Which is more variable?",

        answer:
          "Distribution B is more variable because its observations are more dispersed around the mean.",
      },


      {
        question:
          "Why might median and IQR be preferred to mean and standard deviation for household income?",

        hint:
          "Income distributions often contain a small number of extremely high values.",

        answer:
          "Household income is often strongly right-skewed with extreme high values. The median and IQR are more resistant to those extremes.",
      },

    ],


    quiz: [

      {
        question:
          "What does the range measure?",

        options: [
          "The middle observation",
          "Maximum minus minimum",
          "The average observation",
          "The number of observations",
        ],

        correctIndex:
          1,

        explanation:
          "The range is the difference between the largest and smallest observations.",
      },


      {
        question:
          "What does the IQR describe?",

        options: [
          "The entire spread from minimum to maximum",
          "The spread of the middle 50% of observations",
          "Only the largest value",
          "The distance between the mean and median",
        ],

        correctIndex:
          1,

        explanation:
          "The IQR is Q3 − Q1 and therefore describes the width of the middle half of the distribution.",
      },


      {
        question:
          "Which measure of spread uses every observation and is sensitive to extreme values?",

        options: [
          "IQR",
          "Standard deviation",
          "Median",
          "Mode",
        ],

        correctIndex:
          1,

        explanation:
          "Standard deviation is based on deviations of all observations from the mean.",
      },


      {
        question:
          "Which pair is often appropriate for a strongly skewed distribution?",

        options: [
          "Mean and range only",
          "Median and IQR",
          "Mode and variance only",
          "Maximum and sample size",
        ],

        correctIndex:
          1,

        explanation:
          "Median and IQR are resistant summaries and are often informative when a distribution is skewed or contains outliers.",
      },

    ],


    summary: [
      "Centre alone cannot describe the variability of a distribution.",
      "The range is maximum minus minimum and is sensitive to extreme observations.",
      "The IQR describes the spread of the middle 50% of observations.",
      "Variance and standard deviation describe dispersion around the mean.",
      "Standard deviation uses every observation and can be strongly influenced by extremes.",
      "Descriptions of distributions should normally combine information about centre and spread.",
    ],


    nextStep:
      "Next, we combine centre and spread with shape, skewness, outliers and box plots to compare complete distributions.",
  },


  /* ========================================================================
     LESSON 08
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m2-l4-describing-distributions",

    title:
      "Shape, outliers and comparing distributions",

    subtitle:
      "A strong statistical description brings together shape, centre, spread and unusual observations.",

    estimatedMinutes:
      40,


    objectives: [
      "Recognise symmetric, skewed, unimodal and multimodal distributions.",
      "Explain how skewness affects the relationship between mean and median.",
      "Interpret the five-number summary and box plots.",
      "Use the 1.5 × IQR rule to identify potential outliers.",
      "Compare distributions using shape, centre, spread and unusual observations.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A complete description of a distribution should not rely on a single number. We combine graphical information with measures of centre and spread to describe its overall structure.",
      },


      {
        type:
          "heading",

        text:
          "Shape",
      },


      {
        type:
          "paragraph",

        text:
          "A symmetric distribution has roughly similar shapes on either side of its centre. A skewed distribution has a longer tail on one side.",
      },


      {
        type:
          "bullets",

        items: [
          "Symmetric — left and right sides are broadly similar.",
          "Right-skewed — a longer tail extends towards larger values.",
          "Left-skewed — a longer tail extends towards smaller values.",
          "Unimodal — one prominent peak.",
          "Bimodal or multimodal — two or more prominent peaks.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Skewness and the mean",
      },


      {
        type:
          "paragraph",

        text:
          "Because the mean responds strongly to extreme observations, it tends to be pulled in the direction of a long tail. In a strongly right-skewed distribution, the mean is often larger than the median.",
      },


      {
        type:
          "callout",

        title:
          "Useful intuition",

        text:
          "The mean is pulled towards unusually extreme values more strongly than the median.",
      },


      {
        type:
          "heading",

        text:
          "The five-number summary",
      },


      {
        type:
          "paragraph",

        text:
          "A compact way to describe a distribution is the five-number summary: minimum, first quartile, median, third quartile and maximum.",
      },


      {
        type:
          "bullets",

        items: [
          "Minimum",
          "Q1",
          "Median",
          "Q3",
          "Maximum",
        ],
      },


      {
        type:
          "heading",

        text:
          "Box plots",
      },


      {
        type:
          "paragraph",

        text:
          "A box plot uses quartiles to summarise the location and spread of observations. The box represents the middle 50% of the data, and the line inside the box represents the median.",
      },


      {
        type:
          "paragraph",

        text:
          "Box plots are especially useful when comparing several groups because they present centre, spread and potential unusual observations in a compact form.",
      },


      {
        type:
          "heading",

        text:
          "Potential outliers and the 1.5 × IQR rule",
      },


      {
        type:
          "paragraph",

        text:
          "One common rule identifies observations below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR as potential outliers.",
      },


      {
        type:
          "callout",

        title:
          "Potential does not mean wrong",

        text:
          "An outlier should be investigated, not automatically deleted. It may represent a genuine unusual observation, data-entry error, measurement problem or important scientific finding.",
      },


      {
        type:
          "heading",

        text:
          "How to compare two distributions",
      },


      {
        type:
          "paragraph",

        text:
          "A useful comparison should go beyond saying that one group has a larger average. Describe several features together and make the comparison in context.",
      },


      {
        type:
          "bullets",

        items: [
          "Shape — are the distributions symmetric, skewed or multimodal?",
          "Centre — which group has the larger typical value?",
          "Spread — which group is more variable?",
          "Unusual observations — are there potential outliers or gaps?",
          "Context — what do these differences mean for the original question?",
        ],
      },


      {
        type:
          "callout",

        title:
          "Comparison framework",

        text:
          "Shape + centre + spread + unusual observations + context.",
      },


      {
        type:
          "distribution-explorer",

        title:
          "Distribution Explorer",

        description:
          "Manipulate the observations and watch the mean, median, range, IQR, standard deviation, dot plot, histogram and outlier rule respond.",
      },


      {
        type:
          "heading",

        text:
          "What should you notice in the explorer?",
      },


      {
        type:
          "paragraph",

        text:
          "Begin with the balanced dataset. Compare the mean and median. Then select the dataset containing an outlier. The mean and standard deviation should respond much more strongly than the median. This is why looking at the distribution matters before choosing summary statistics.",
      },

    ],


    workedExamples: [

      {
        title:
          "Comparing examination scores",

        question:
          "Class A has median 71 and IQR 8. Class B has median 67 and IQR 19. What can we say?",

        steps: [
          "Compare centres: Class A has the higher median.",
          "Compare spreads: Class B has the larger IQR.",
          "Therefore Class A's typical score is higher.",
          "Class B's scores are more variable across the middle half of observations.",
          "We would still inspect graphs before making a complete comparison.",
        ],

        answer:
          "Class A has a higher centre according to the median, while Class B has substantially greater variability according to the IQR.",
      },


      {
        title:
          "Checking for an outlier",

        question:
          "Suppose Q1 = 10 and Q3 = 18. Would a value of 35 be identified as a potential outlier by the 1.5 × IQR rule?",

        steps: [
          "Calculate IQR: 18 − 10 = 8.",
          "Calculate 1.5 × IQR: 1.5 × 8 = 12.",
          "Upper fence = Q3 + 12 = 30.",
          "The observation 35 is above 30.",
        ],

        answer:
          "Yes. The value 35 lies above the upper fence of 30 and would be flagged as a potential outlier.",
      },

    ],


    exercises: [

      {
        question:
          "A distribution has a long tail towards large values. How would you describe its shape?",

        answer:
          "It is right-skewed, or positively skewed.",
      },


      {
        question:
          "If Q1 = 20 and Q3 = 32, calculate the IQR and the upper 1.5 × IQR fence.",

        answer:
          "IQR = 32 − 20 = 12. Upper fence = 32 + 1.5 × 12 = 50.",
      },


      {
        question:
          "Group A has median 15 and IQR 3. Group B has median 18 and IQR 11. Give a short comparison.",

        answer:
          "Group B has a higher typical value according to the median, but it also has substantially greater variability according to the IQR.",
      },


      {
        question:
          "Why should an observation identified by the 1.5 × IQR rule not automatically be deleted?",

        answer:
          "The observation may be valid and scientifically important. It should first be investigated to determine whether it reflects a genuine value, error or other issue.",
      },

    ],


    quiz: [

      {
        question:
          "What is usually true in a strongly right-skewed distribution?",

        options: [
          "The mean may be pulled above the median",
          "The mean must equal the median",
          "There can be no outliers",
          "Every observation must be positive",
        ],

        correctIndex:
          0,

        explanation:
          "Large values in the right tail can pull the mean upward more strongly than they affect the median.",
      },


      {
        question:
          "Which values form the five-number summary?",

        options: [
          "Mean, median, mode, variance and SD",
          "Minimum, Q1, median, Q3 and maximum",
          "Q1, mean, variance, range and maximum",
          "Minimum, mean, mode, SD and maximum",
        ],

        correctIndex:
          1,

        explanation:
          "The five-number summary contains the minimum, first quartile, median, third quartile and maximum.",
      },


      {
        question:
          "What should we do when a value is identified as a potential outlier?",

        options: [
          "Always delete it immediately",
          "Automatically replace it with the mean",
          "Investigate it before deciding how it should be handled",
          "Ignore the entire dataset",
        ],

        correctIndex:
          2,

        explanation:
          "An outlier may be a valid observation or may indicate a data problem. Identification should lead to investigation, not automatic deletion.",
      },


      {
        question:
          "Which is the strongest way to compare two numerical distributions?",

        options: [
          "Compare only the means",
          "Compare only the maximum values",
          "Compare shape, centre, spread and unusual observations in context",
          "Count how many numbers are present",
        ],

        correctIndex:
          2,

        explanation:
          "A complete comparison combines multiple features of the distributions and relates them to the context.",
      },


      {
        question:
          "Why is the median usually less affected by an extreme outlier than the mean?",

        options: [
          "The median is always zero",
          "The median depends mainly on the ordering of observations",
          "The mean ignores extreme values",
          "The median uses only the maximum",
        ],

        correctIndex:
          1,

        explanation:
          "The median is determined by the middle position in the ordered data, whereas the exact magnitude of every observation contributes to the mean.",
      },

    ],


    summary: [
      "Distribution shape may be symmetric, skewed, unimodal or multimodal.",
      "The mean is generally more strongly affected by extreme observations than the median.",
      "The five-number summary contains the minimum, Q1, median, Q3 and maximum.",
      "Box plots provide a compact display of centre, spread and possible unusual observations.",
      "The 1.5 × IQR rule can identify potential outliers, but flagged observations should be investigated rather than automatically removed.",
      "Strong comparisons consider shape, centre, spread, unusual observations and context.",
    ],


    nextStep:
      "Module 3 introduces probability—the mathematical language we use to reason about randomness and uncertainty.",
  },

];