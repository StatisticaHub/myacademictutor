import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   STATISTICS FOUNDATIONS
   MODULE 05 — SAMPLING AND UNCERTAINTY
   ========================================================================== */

export const statisticsFoundationsModule05:
  LessonContent[] = [

  /* ========================================================================
     LESSON 17
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m5-l1-sampling-and-uncertainty",

    title:
      "Why samples give different answers",

    subtitle:
      "Different random samples from the same population will usually produce different statistics.",

    estimatedMinutes:
      35,


    objectives: [
      "Explain sampling variability.",
      "Distinguish a population parameter from a sample estimate.",
      "Explain why two random samples need not produce identical results.",
      "Recognise uncertainty as a natural consequence of sampling.",
      "Distinguish sampling variation from errors in data collection.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Suppose two researchers independently select random samples from the same population and calculate the average height. Should they expect exactly the same answer? Usually not.",
      },


      {
        type:
          "heading",

        text:
          "Samples are only subsets",
      },


      {
        type:
          "paragraph",

        text:
          "A population may contain many different observations. A random sample captures only some of them. Another random sample will usually contain a different combination of observations.",
      },


      {
        type:
          "callout",

        title:
          "Sampling variability",

        text:
          "Sampling variability is the natural variation in a statistic that occurs because different random samples contain different observations.",
      },


      {
        type:
          "heading",

        text:
          "The population parameter is fixed",
      },


      {
        type:
          "paragraph",

        text:
          "At a particular point in time, a population parameter such as the population mean is treated as a fixed quantity. We may not know its value, but it does not change simply because we select another sample.",
      },


      {
        type:
          "paragraph",

        text:
          "The sample mean, by contrast, is a random quantity before the sample is drawn. Different samples can therefore give different sample means.",
      },


      {
        type:
          "heading",

        text:
          "Variation does not automatically mean error",
      },


      {
        type:
          "paragraph",

        text:
          "If two properly selected random samples give slightly different estimates, one does not need to be wrong. The difference may simply reflect ordinary sampling variability.",
      },


      {
        type:
          "callout",

        title:
          "Important distinction",

        text:
          "Random sampling variability is expected even when the sampling process is perfectly valid.",
      },


      {
        type:
          "heading",

        text:
          "Uncertainty enters the conclusion",
      },


      {
        type:
          "paragraph",

        text:
          "Because a sample statistic varies from sample to sample, an estimate based on one sample carries uncertainty. Statistical inference provides methods for quantifying that uncertainty.",
      },


      {
        type:
          "paragraph",

        text:
          "Later we will use standard errors and confidence intervals to describe how precise an estimate is.",
      },


      {
        type:
          "heading",

        text:
          "More data can reduce random variation",
      },


      {
        type:
          "paragraph",

        text:
          "Larger random samples generally produce more stable estimates than smaller random samples because each individual observation has less influence on the overall statistic.",
      },


      {
        type:
          "callout",

        title:
          "But remember",

        text:
          "Increasing sample size can reduce random sampling variation. It does not automatically remove bias.",
      },

    ],


    workedExamples: [

      {
        title:
          "Two election polls",

        question:
          "Two random polls of the same population report support of 46% and 48% for a candidate. Does one poll have to be incorrect?",

        steps: [
          "Both polls observe only samples rather than the entire population.",
          "Different random samples contain different individuals.",
          "The resulting sample proportions therefore need not be identical.",
          "A two-percentage-point difference may reflect ordinary sampling variation.",
        ],

        answer:
          "No. Properly conducted random samples can give different estimates simply because of sampling variability.",
      },


      {
        title:
          "Repeated sample means",

        question:
          "A population has mean 50. Samples of five observations produce means of 44, 53, 49 and 57. What does this illustrate?",

        steps: [
          "The population mean remains 50.",
          "Each sample contains a different set of observations.",
          "The calculated sample means therefore vary.",
          "The sample mean is being used as an estimate of the fixed population mean.",
        ],

        answer:
          "This illustrates sampling variability: estimates vary across samples even though the population parameter is fixed.",
      },

    ],


    exercises: [

      {
        question:
          "Why might two random samples of 100 students produce different mean examination scores?",

        answer:
          "The samples will usually contain different students, so natural differences among students create sampling variability in the sample means.",
      },


      {
        question:
          "Does sampling variability disappear completely if the sample was selected properly?",

        answer:
          "No. Random sampling variability is a natural feature of using a sample rather than observing the entire population.",
      },


      {
        question:
          "Which would normally produce more stable estimates: a random sample of 20 people or 2,000 people?",

        answer:
          "The random sample of 2,000 people would normally have less sampling variability.",
      },

    ],


    quiz: [

      {
        question:
          "What is sampling variability?",

        options: [
          "Variation caused only by incorrect data entry",
          "Natural variation in statistics from different random samples",
          "Variation in the population parameter every time a sample is taken",
          "A form of deliberate sampling bias",
        ],

        correctIndex:
          1,

        explanation:
          "Different random samples contain different observations, causing their statistics to vary naturally.",
      },


      {
        question:
          "Which quantity is treated as fixed when sampling from a population?",

        options: [
          "The sample mean before sampling",
          "The population parameter",
          "Every possible sample statistic",
          "The selected observations",
        ],

        correctIndex:
          1,

        explanation:
          "The population parameter is treated as fixed, while the sample statistic varies between samples.",
      },


      {
        question:
          "What generally happens to random sampling variability when sample size increases?",

        options: [
          "It usually decreases",
          "It always increases",
          "It becomes bias",
          "The population mean changes",
        ],

        correctIndex:
          0,

        explanation:
          "Larger random samples generally provide more stable estimates.",
      },

    ],


    summary: [
      "Different random samples usually produce different statistics.",
      "The population parameter is fixed, while a sample statistic varies across possible samples.",
      "Sampling variability is expected and does not automatically indicate an error.",
      "Sampling variability creates uncertainty in sample-based estimates.",
      "Larger random samples usually reduce random sampling variability.",
      "Increasing sample size does not automatically remove systematic bias.",
    ],


    nextStep:
      "Next, we examine how samples are actually selected and why good sampling methods matter as much as sample size.",
  },


  /* ========================================================================
     LESSON 18
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m5-l2-sampling-and-uncertainty",

    title:
      "Sampling methods and bias",

    subtitle:
      "A sample can be large and precise but still systematically misrepresent the population.",

    estimatedMinutes:
      40,


    objectives: [
      "Describe common probability and non-probability sampling methods.",
      "Explain simple random and stratified sampling.",
      "Recognise convenience and voluntary-response samples.",
      "Identify selection, non-response and measurement bias.",
      "Explain why increasing sample size cannot automatically remove systematic bias.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "The usefulness of a sample depends not only on how many observations it contains but also on how those observations entered the study.",
      },


      {
        type:
          "callout",

        title:
          "Central question",

        text:
          "Who had a realistic chance of appearing in the sample, and who may have been systematically left out?",
      },


      {
        type:
          "heading",

        text:
          "Simple random sampling",
      },


      {
        type:
          "paragraph",

        text:
          "In a simple random sample, observations are selected using a random mechanism so that samples of the specified size have a known selection process.",
      },


      {
        type:
          "paragraph",

        text:
          "Random sampling helps protect against systematically favouring particular types of individuals.",
      },


      {
        type:
          "heading",

        text:
          "Systematic sampling",
      },


      {
        type:
          "paragraph",

        text:
          "A systematic sample may select every kth unit from an ordered list after a random starting point. This can be efficient, although care is needed if the ordering contains a repeating pattern related to the outcome.",
      },


      {
        type:
          "heading",

        text:
          "Stratified sampling",
      },


      {
        type:
          "paragraph",

        text:
          "In stratified sampling, the population is divided into meaningful subgroups and observations are sampled from each subgroup.",
      },


      {
        type:
          "callout",

        title:
          "Why stratify?",

        text:
          "Stratification can ensure that important population subgroups are adequately represented.",
      },


      {
        type:
          "heading",

        text:
          "Convenience sampling",
      },


      {
        type:
          "paragraph",

        text:
          "A convenience sample selects observations that are easiest to reach. Asking only students sitting in the library about weekly study time would be convenient but could systematically favour students who study more.",
      },


      {
        type:
          "heading",

        text:
          "Voluntary-response sampling",
      },


      {
        type:
          "paragraph",

        text:
          "In a voluntary-response sample, individuals decide whether to participate. People with especially strong experiences or opinions may be more likely to respond.",
      },


      {
        type:
          "heading",

        text:
          "Selection bias",
      },


      {
        type:
          "paragraph",

        text:
          "Selection bias occurs when the mechanism determining inclusion produces systematic differences between the observed sample and the target population.",
      },


      {
        type:
          "heading",

        text:
          "Non-response bias",
      },


      {
        type:
          "paragraph",

        text:
          "Even a carefully selected sample can become biased if people who do not respond differ systematically from those who do.",
      },


      {
        type:
          "heading",

        text:
          "Measurement bias",
      },


      {
        type:
          "paragraph",

        text:
          "Sampling is not the only source of bias. Poorly worded questions, inaccurate instruments or systematic reporting errors can distort measurements after participants have been selected.",
      },


      {
        type:
          "heading",

        text:
          "Why size cannot fix everything",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose an online survey attracts 100,000 voluntary responses but systematically over-represents people with strong views. The estimate may be numerically very stable while remaining systematically different from the population value.",
      },


      {
        type:
          "callout",

        title:
          "Key principle",

        text:
          "More observations reduce random noise. They do not automatically remove systematic error.",
      },

    ],


    workedExamples: [

      {
        title:
          "Surveying student exercise",

        question:
          "A university estimates weekly exercise by surveying 2,000 students leaving its sports centre. What is the main problem?",

        steps: [
          "The target population is presumably all university students.",
          "Students visiting the sports centre are more likely to exercise than many other students.",
          "The selection mechanism therefore systematically favours more active students.",
          "Increasing the number surveyed at the sports centre does not solve this problem.",
        ],

        answer:
          "The sample has selection bias because students using the sports centre are unlikely to represent all students' exercise behaviour.",
      },


      {
        title:
          "Stratifying a school sample",

        question:
          "A school is 60% junior students and 40% senior students. Why might researchers sample separately from each group?",

        steps: [
          "Junior and senior students may differ on outcomes of interest.",
          "Sampling from each stratum ensures both groups are represented.",
          "The sampling fractions can be chosen to preserve or deliberately oversample subgroup representation.",
        ],

        answer:
          "Stratification can ensure that both junior and senior students contribute appropriately to the sample.",
      },

    ],


    exercises: [

      {
        question:
          "A news website asks readers to click yes or no on a political question. What sampling problem may arise?",

        answer:
          "Voluntary-response bias may arise because people who choose to respond may differ systematically from the wider population.",
      },


      {
        question:
          "Researchers randomly select 1,000 people, but only 300 respond. Why should they investigate the non-responders?",

        answer:
          "If responders and non-responders differ systematically on relevant characteristics, the observed sample may suffer from non-response bias.",
      },


      {
        question:
          "Why does increasing a biased sample from 1,000 to 100,000 observations not necessarily improve validity?",

        answer:
          "The larger sample can reduce random variability but the systematic selection mechanism can continue to produce a biased estimate.",
      },

    ],


    quiz: [

      {
        question:
          "Which sampling method deliberately samples within population subgroups?",

        options: [
          "Convenience sampling",
          "Stratified sampling",
          "Voluntary-response sampling",
          "Measurement sampling",
        ],

        correctIndex:
          1,

        explanation:
          "Stratified sampling divides the population into subgroups and samples within them.",
      },


      {
        question:
          "Which is an example of convenience sampling?",

        options: [
          "Randomly choosing student IDs from the full university register",
          "Surveying only people who are easiest to reach",
          "Randomly sampling from every age group",
          "Using a random-number generator",
        ],

        correctIndex:
          1,

        explanation:
          "Convenience sampling selects readily accessible observations rather than using a representative probability mechanism.",
      },


      {
        question:
          "What can increasing sample size usually reduce?",

        options: [
          "All forms of bias",
          "Random sampling variability",
          "Poorly worded questions",
          "Systematic exclusion of part of the population",
        ],

        correctIndex:
          1,

        explanation:
          "Larger samples can reduce random variability but do not automatically eliminate systematic bias.",
      },


      {
        question:
          "What is non-response bias?",

        options: [
          "Every selected person responds",
          "Non-responders systematically differ from responders",
          "The sample is too large",
          "The population mean is unknown",
        ],

        correctIndex:
          1,

        explanation:
          "Non-response becomes problematic when participation is related to characteristics relevant to the study.",
      },

    ],


    summary: [
      "How observations are selected affects whether a sample can represent its target population.",
      "Simple random sampling uses a random selection mechanism.",
      "Stratification ensures important population subgroups are represented.",
      "Convenience and voluntary-response samples can create serious selection problems.",
      "Non-response and measurement processes can introduce additional bias.",
      "Increasing sample size reduces random variability but cannot automatically remove systematic bias.",
    ],


    nextStep:
      "Next, we imagine taking many samples and study the distribution formed by their statistics: the sampling distribution.",
  },


  /* ========================================================================
     LESSON 19
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m5-l3-sampling-and-uncertainty",

    title:
      "Sampling distributions",

    subtitle:
      "A sampling distribution describes how a statistic behaves across repeated samples.",

    estimatedMinutes:
      40,


    objectives: [
      "Define a sampling distribution.",
      "Distinguish a population distribution from a sampling distribution.",
      "Explain the sampling distribution of the sample mean.",
      "Interpret standard error.",
      "Explain why a statistic may be unbiased for a population parameter.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Imagine repeatedly drawing random samples of the same size from one population. For every sample, calculate the mean. The collection of those sample means forms a new distribution.",
      },


      {
        type:
          "callout",

        title:
          "Sampling distribution",

        text:
          "A sampling distribution is the probability distribution of a statistic across repeated samples generated by the same sampling process.",
      },


      {
        type:
          "heading",

        text:
          "Two different distributions",
      },


      {
        type:
          "paragraph",

        text:
          "The population distribution describes individual observations. The sampling distribution of the mean describes possible sample means.",
      },


      {
        type:
          "bullets",

        items: [
          "Population distribution — values for individual units.",
          "Sampling distribution — values of a statistic calculated from repeated samples.",
        ],
      },


      {
        type:
          "callout",

        title:
          "Common misconception",

        text:
          "A sampling distribution is not the distribution of observations inside one sample.",
      },


      {
        type:
          "heading",

        text:
          "Centre of the sampling distribution",
      },


      {
        type:
          "paragraph",

        text:
          "Under random sampling, the sample mean is centred on the population mean. Across many possible samples, some sample means fall below the true mean and others above it.",
      },


      {
        type:
          "paragraph",

        text:
          "This is why the sample mean is described as an unbiased estimator of the population mean under the relevant sampling model.",
      },


      {
        type:
          "heading",

        text:
          "Spread of the sampling distribution",
      },


      {
        type:
          "paragraph",

        text:
          "Sample means do not all have the same value. The standard deviation of their sampling distribution measures how much they vary across repeated samples.",
      },


      {
        type:
          "callout",

        title:
          "Standard error",

        text:
          "The standard error is the standard deviation of the sampling distribution of a statistic.",
      },


      {
        type:
          "heading",

        text:
          "Standard deviation versus standard error",
      },


      {
        type:
          "paragraph",

        text:
          "Standard deviation describes variability among individual observations. Standard error describes variability among estimates from repeated samples.",
      },


      {
        type:
          "bullets",

        items: [
          "Standard deviation — how variable are individuals?",
          "Standard error — how variable is the sample statistic across repeated samples?",
        ],
      },


      {
        type:
          "heading",

        text:
          "Why standard error matters",
      },


      {
        type:
          "paragraph",

        text:
          "A smaller standard error means that repeated estimates would tend to cluster more closely together. This corresponds to greater precision.",
      },


      {
        type:
          "callout",

        title:
          "Precision",

        text:
          "Precision concerns how much an estimate would vary across repeated samples. It is different from whether the estimate is systematically biased.",
      },

    ],


    workedExamples: [

      {
        title:
          "Population versus sampling distribution",

        question:
          "A population contains individual test scores with mean 70 and SD 12. Researchers repeatedly sample 100 students and calculate each sample mean. What do the two distributions represent?",

        steps: [
          "The population distribution contains individual students' test scores.",
          "Its SD of 12 describes variability among individual students.",
          "The sampling distribution contains means from repeated samples of 100 students.",
          "Its spread describes how the sample mean changes from sample to sample.",
        ],

        answer:
          "The population distribution concerns individuals; the sampling distribution concerns repeated sample means.",
      },


      {
        title:
          "Interpreting standard error",

        question:
          "Estimator A has SE = 1.2 and Estimator B has SE = 4.8. Which is more precise under otherwise comparable conditions?",

        steps: [
          "Standard error measures repeated-sample variability.",
          "A smaller standard error means estimates cluster more tightly.",
          "Estimator A therefore varies less between hypothetical repeated samples.",
        ],

        answer:
          "Estimator A is more precise because it has the smaller standard error.",
      },

    ],


    exercises: [

      {
        question:
          "What values appear in a sampling distribution of the sample mean?",

        answer:
          "The distribution contains sample means calculated from repeated samples, not individual observations.",
      },


      {
        question:
          "What is the difference between standard deviation and standard error?",

        answer:
          "Standard deviation describes variability among observations, while standard error describes variability of a statistic across repeated samples.",
      },


      {
        question:
          "If repeated sample means are tightly clustered, would the standard error be relatively large or small?",

        answer:
          "Small, because the estimates show little repeated-sample variability.",
      },

    ],


    quiz: [

      {
        question:
          "What is a sampling distribution?",

        options: [
          "The distribution of observations inside one sample",
          "The distribution of a statistic over repeated samples",
          "The list of population labels",
          "A graph containing only outliers",
        ],

        correctIndex:
          1,

        explanation:
          "A sampling distribution describes the repeated-sample behaviour of a statistic.",
      },


      {
        question:
          "What does standard error measure?",

        options: [
          "Variation among individual observations only",
          "Variability of a statistic across repeated samples",
          "The amount of selection bias",
          "The population size",
        ],

        correctIndex:
          1,

        explanation:
          "Standard error is the standard deviation of a sampling distribution.",
      },


      {
        question:
          "A smaller standard error generally indicates what?",

        options: [
          "Less precision",
          "Greater precision",
          "More selection bias",
          "A larger population mean",
        ],

        correctIndex:
          1,

        explanation:
          "A smaller standard error means repeated estimates are more tightly concentrated.",
      },


      {
        question:
          "Which describes the population distribution?",

        options: [
          "Values of individual units in the population",
          "Only repeated sample means",
          "Only confidence limits",
          "Only p-values",
        ],

        correctIndex:
          0,

        explanation:
          "The population distribution describes the variation among individual population observations.",
      },

    ],


    summary: [
      "A sampling distribution describes the behaviour of a statistic across repeated samples.",
      "Population distributions concern individual observations; sampling distributions concern statistics.",
      "Under random sampling, the sample mean is centred on the population mean.",
      "Standard error is the standard deviation of a statistic's sampling distribution.",
      "Standard deviation and standard error describe different kinds of variability.",
      "Smaller standard error means greater precision.",
    ],


    nextStep:
      "Next, we examine why sample size changes the standard error and why sample means can become approximately normally distributed.",
  },


  /* ========================================================================
     LESSON 20
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m5-l4-sampling-and-uncertainty",

    title:
      "Sample size and the Central Limit idea",

    subtitle:
      "Larger random samples produce more precise means, and repeated sample means often become increasingly normal in shape.",

    estimatedMinutes:
      45,


    objectives: [
      "Explain how sample size affects the standard error of the mean.",
      "Interpret the relationship σ divided by square root of n.",
      "Describe the Central Limit idea conceptually.",
      "Explain why the sampling distribution can be approximately normal even when the population is not.",
      "Explain why increasing sample size cannot repair systematic sampling bias.",
    ],


    content: [

      {
        type:
          "heading",

        text:
          "Sample size and precision",
      },


      {
        type:
          "paragraph",

        text:
          "When observations are sampled independently from the same population, larger samples generally produce more stable sample means.",
      },


      {
        type:
          "callout",

        title:
          "Standard error of the mean",

        text:
          "Under the basic independent-sampling model, SE(sample mean) = σ / √n.",
      },


      {
        type:
          "paragraph",

        text:
          "The square-root relationship is important. Doubling the sample size does not halve the standard error.",
      },


      {
        type:
          "paragraph",

        text:
          "To reduce the standard error by a factor of two, we need roughly four times as many observations.",
      },


      {
        type:
          "heading",

        text:
          "Why sample means are less variable",
      },


      {
        type:
          "paragraph",

        text:
          "An average combines information from several observations. In a larger random sample, unusually high observations can be balanced by lower observations, making the sample mean more stable.",
      },


      {
        type:
          "heading",

        text:
          "The Central Limit idea",
      },


      {
        type:
          "paragraph",

        text:
          "A remarkable result in statistics is that, under suitable conditions, the sampling distribution of the sample mean becomes approximately normal as sample size increases, even when the population itself is not normally distributed.",
      },


      {
        type:
          "callout",

        title:
          "Central Limit idea",

        text:
          "As n becomes sufficiently large, the distribution of repeated sample means often becomes approximately normal, centred around the population mean.",
      },


      {
        type:
          "heading",

        text:
          "What becomes normal?",
      },


      {
        type:
          "paragraph",

        text:
          "The Central Limit idea does not say that the original observations become normally distributed. A strongly right-skewed population remains right-skewed.",
      },


      {
        type:
          "paragraph",

        text:
          "It is the distribution of the sample mean across repeated samples that tends towards a normal shape.",
      },


      {
        type:
          "callout",

        title:
          "Common misconception",

        text:
          "Increasing sample size does not make the population distribution normal.",
      },


      {
        type:
          "heading",

        text:
          "How large is large enough?",
      },


      {
        type:
          "paragraph",

        text:
          "There is no single universal minimum sample size. The amount of data required depends on the shape of the population and the statistic being studied. Strong skewness or extreme values may require larger samples.",
      },


      {
        type:
          "heading",

        text:
          "Precision does not guarantee validity",
      },


      {
        type:
          "paragraph",

        text:
          "The standard error formula describes random sampling variability under an appropriate sampling process. If the selection mechanism is biased, increasing n can make the estimate extremely stable around the wrong value.",
      },


      {
        type:
          "callout",

        title:
          "One of the most important lessons in statistics",

        text:
          "A large biased sample can give a very precise answer to the wrong question.",
      },


      {
        type:
          "sampling-simulator",

        title:
          "Sampling Distribution Simulator",

        description:
          "Take repeated samples from balanced, skewed or bimodal populations. Change n and compare random sampling with a deliberately biased selection process.",
      },


      {
        type:
          "heading",

        text:
          "Experiments to try",
      },


      {
        type:
          "bullets",

        items: [
          "Choose the right-skewed population and set n = 5. Run 1,000 samples.",
          "Increase n to 50 and repeat. Compare the spread and shape of the sample means.",
          "Compare the empirical standard error with σ / √n.",
          "Switch to biased sampling and use n = 100.",
          "Notice that the biased estimate can become very stable while remaining systematically too high.",
        ],
      },

    ],


    workedExamples: [

      {
        title:
          "Effect of increasing sample size",

        question:
          "A population has σ = 20. Compare the standard error of the mean for n = 25 and n = 100.",

        steps: [
          "For n = 25, SE = 20/√25 = 20/5 = 4.",
          "For n = 100, SE = 20/√100 = 20/10 = 2.",
          "The sample size increased by a factor of four.",
          "The standard error decreased by a factor of two.",
        ],

        answer:
          "SE is 4 for n = 25 and 2 for n = 100.",
      },


      {
        title:
          "Skewed population, sample means",

        question:
          "Individual household incomes are strongly right-skewed. Why might the means of many large random samples be much more symmetric?",

        steps: [
          "Each sample mean averages many independent observations.",
          "Averaging reduces the influence of individual observations.",
          "Under suitable conditions, the Central Limit Theorem implies that the sampling distribution of the mean approaches a normal shape as n increases.",
          "The original income distribution itself remains skewed.",
        ],

        answer:
          "The sampling distribution of the mean can become approximately normal even though the individual income distribution remains strongly right-skewed.",
      },

    ],


    exercises: [

      {
        question:
          "If σ = 12 and n = 36, calculate the standard error of the sample mean.",

        answer:
          "SE = 12/√36 = 12/6 = 2.",
      },


      {
        question:
          "If the sample size is multiplied by four, approximately what happens to the standard error?",

        answer:
          "It is divided by two because standard error changes with 1/√n.",
      },


      {
        question:
          "Does the Central Limit Theorem say that individual observations become normally distributed as n increases?",

        answer:
          "No. It concerns the sampling distribution of statistics such as the sample mean, not the shape of the original population data.",
      },


      {
        question:
          "Why can a huge convenience sample still give a poor population estimate?",

        answer:
          "Increasing sample size can reduce random variation but cannot automatically correct systematic selection bias.",
      },

    ],


    quiz: [

      {
        question:
          "How is the standard error of the sample mean related to sample size?",

        options: [
          "It generally decreases as n increases",
          "It always increases as n increases",
          "It is completely unrelated to n",
          "It equals n",
        ],

        correctIndex:
          0,

        explanation:
          "The basic relationship is SE = σ/√n, so larger n gives smaller standard error.",
      },


      {
        question:
          "If sample size is increased from 100 to 400, by approximately what factor does the standard error change?",

        options: [
          "It doubles",
          "It halves",
          "It becomes four times larger",
          "It remains identical",
        ],

        correctIndex:
          1,

        explanation:
          "The sample size increases fourfold, so √n doubles and the standard error halves.",
      },


      {
        question:
          "What tends to become approximately normal according to the Central Limit idea?",

        options: [
          "Every original population",
          "The sampling distribution of the sample mean",
          "Every individual observation",
          "All categorical variables",
        ],

        correctIndex:
          1,

        explanation:
          "The Central Limit Theorem concerns the distribution of sample means across repeated samples.",
      },


      {
        question:
          "What happens if we make a systematically biased sample extremely large?",

        options: [
          "Bias must disappear",
          "The result can become very precise while still being biased",
          "The population becomes normal",
          "The parameter changes to match the sample",
        ],

        correctIndex:
          1,

        explanation:
          "Greater sample size reduces random noise but cannot automatically eliminate systematic bias.",
      },

    ],


    summary: [
      "Larger random samples generally produce more precise sample means.",
      "For basic independent sampling, the standard error of the mean is σ/√n.",
      "A fourfold increase in sample size roughly halves the standard error.",
      "The Central Limit idea concerns the distribution of sample means, not the distribution of individual observations.",
      "Under suitable conditions, repeated sample means become increasingly normal in shape as n increases.",
      "Large sample size cannot automatically repair systematic sampling bias.",
    ],


    nextStep:
      "Module 6 uses sampling distributions and standard errors to move from a single estimate to a range of plausible population values: the confidence interval.",
  },

];