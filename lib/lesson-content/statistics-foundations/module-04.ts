import type {
  LessonContent,
} from "../types";


export const statisticsFoundationsModule04:
  LessonContent[] = [

  /* ========================================================================
     LESSON 13
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m4-l1-random-variables",

    title:
      "Random variables and probability distributions",

    subtitle:
      "A random variable converts the outcomes of a random process into numerical values.",

    estimatedMinutes:
      35,


    objectives: [
      "Define a random variable.",
      "Distinguish discrete and continuous random variables.",
      "Interpret a probability distribution.",
      "Check whether a discrete probability distribution is valid.",
      "Calculate probabilities from simple discrete distributions.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Probability describes uncertain events. A random variable allows us to represent the numerical outcome of a random process in a systematic way.",
      },


      {
        type:
          "callout",

        title:
          "Random variable",

        text:
          "A random variable assigns a numerical value to each possible outcome of a random experiment.",
      },


      {
        type:
          "heading",

        text:
          "A simple example",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose a fair coin is flipped twice and X represents the number of heads. The possible sequences are HH, HT, TH and TT, but the random variable X can take only the values 0, 1 or 2.",
      },


      {
        type:
          "bullets",

        items: [
          "TT gives X = 0.",
          "HT or TH gives X = 1.",
          "HH gives X = 2.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Discrete random variables",
      },


      {
        type:
          "paragraph",

        text:
          "A discrete random variable takes a countable set of possible values. Examples include the number of heads in ten coin flips, the number of customers entering a shop or the number of defective products in a batch.",
      },


      {
        type:
          "heading",

        text:
          "Continuous random variables",
      },


      {
        type:
          "paragraph",

        text:
          "A continuous random variable can take any value within an interval. Examples include height, reaction time, temperature and waiting time.",
      },


      {
        type:
          "heading",

        text:
          "Probability distributions",
      },


      {
        type:
          "paragraph",

        text:
          "A probability distribution describes the possible values of a random variable and the probabilities associated with those values.",
      },


      {
        type:
          "callout",

        title:
          "Valid discrete distribution",

        text:
          "Every probability must lie between 0 and 1, and the probabilities across all possible values must sum to 1.",
      },


      {
        type:
          "heading",

        text:
          "Random variable versus observed value",
      },


      {
        type:
          "paragraph",

        text:
          "Before the experiment, X represents an uncertain quantity. After the experiment occurs, we observe one particular value of X. Keeping the random variable separate from its realised value is important in probability modelling.",
      },

    ],


    workedExamples: [

      {
        title:
          "Number of heads",

        question:
          "A fair coin is flipped twice. Let X be the number of heads. Construct the probability distribution of X.",

        steps: [
          "The equally likely sequences are HH, HT, TH and TT.",
          "X = 0 occurs only for TT, so P(X = 0) = 1/4.",
          "X = 1 occurs for HT and TH, so P(X = 1) = 2/4.",
          "X = 2 occurs only for HH, so P(X = 2) = 1/4.",
          "Check that 1/4 + 2/4 + 1/4 = 1.",
        ],

        answer:
          "P(X=0)=0.25, P(X=1)=0.50 and P(X=2)=0.25.",
      },


      {
        title:
          "Checking a distribution",

        question:
          "A proposed distribution assigns probabilities 0.2, 0.4 and 0.5 to three possible values. Is it valid?",

        steps: [
          "Each individual probability lies between 0 and 1.",
          "Add the probabilities: 0.2 + 0.4 + 0.5 = 1.1.",
          "The total exceeds 1.",
        ],

        answer:
          "No. A valid probability distribution must have total probability exactly equal to 1.",
      },

    ],


    exercises: [

      {
        question:
          "Is the number of emails received in one hour a discrete or continuous random variable?",

        answer:
          "Discrete, because it is a count taking values such as 0, 1, 2 and so on.",
      },


      {
        question:
          "Is waiting time for a bus discrete or continuous?",

        answer:
          "Conceptually continuous, because waiting time can take any value within an interval.",
      },


      {
        question:
          "A variable X takes values 1, 2 and 3 with probabilities 0.3, 0.4 and 0.3. Find P(X ≥ 2).",

        answer:
          "P(X ≥ 2) = 0.4 + 0.3 = 0.7.",
      },

    ],


    quiz: [

      {
        question:
          "What does a random variable do?",

        options: [
          "Removes randomness from an experiment",
          "Assigns numerical values to outcomes",
          "Guarantees equal probabilities",
          "Calculates only averages",
        ],

        correctIndex:
          1,

        explanation:
          "A random variable maps outcomes of a random experiment to numerical values.",
      },


      {
        question:
          "Which is a discrete random variable?",

        options: [
          "Height",
          "Reaction time",
          "Number of hospital visits",
          "Temperature",
        ],

        correctIndex:
          2,

        explanation:
          "The number of hospital visits is a count and therefore discrete.",
      },


      {
        question:
          "What must be true of a valid discrete probability distribution?",

        options: [
          "All probabilities must be equal",
          "Probabilities must sum to 1",
          "The mean must be zero",
          "There must be exactly two outcomes",
        ],

        correctIndex:
          1,

        explanation:
          "All possible outcomes together must account for total probability 1.",
      },

    ],


    summary: [
      "A random variable assigns numerical values to outcomes of a random experiment.",
      "Discrete random variables take countable values.",
      "Continuous random variables can take values throughout an interval.",
      "A probability distribution describes possible values and their probabilities.",
      "For a discrete distribution, probabilities must lie between 0 and 1 and sum to 1.",
    ],


    nextStep:
      "Next, we summarise an entire probability distribution using expected value and variability.",
  },


  /* ========================================================================
     LESSON 14
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m4-l2-random-variables",

    title:
      "Expected value and variability",

    subtitle:
      "Probability distributions have a centre and spread just as observed datasets do.",

    estimatedMinutes:
      35,


    objectives: [
      "Interpret expected value as a long-run average.",
      "Calculate the expected value of a simple discrete random variable.",
      "Explain variability in a probability distribution.",
      "Interpret variance and standard deviation for random variables.",
      "Compare decisions using both expected outcome and risk.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A probability distribution tells us what values a random variable may take and how likely each value is. We can summarise that distribution using measures of centre and variability.",
      },


      {
        type:
          "heading",

        text:
          "Expected value",
      },


      {
        type:
          "paragraph",

        text:
          "The expected value is the probability-weighted average of the possible values of a random variable.",
      },


      {
        type:
          "callout",

        title:
          "Expected value",

        text:
          "For a discrete random variable, multiply each possible value by its probability and add the results.",
      },


      {
        type:
          "paragraph",

        text:
          "Expected value is best interpreted as a long-run average over many repetitions. It does not need to be a value that can occur in a single trial.",
      },


      {
        type:
          "callout",

        title:
          "Important",

        text:
          "The expected number of children in a statistical model might be 1.7 even though no family can literally have 1.7 children.",
      },


      {
        type:
          "heading",

        text:
          "Expected value is not a guarantee",
      },


      {
        type:
          "paragraph",

        text:
          "A game with expected winnings of £2 does not guarantee that a player wins £2 each time. Individual outcomes may vary widely around that long-run average.",
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
          "Just as we measure variability in observed data, we can measure variability in a probability distribution. Variance considers squared deviations from the expected value, while standard deviation expresses spread on the original scale.",
      },


      {
        type:
          "paragraph",

        text:
          "Two games can have the same expected value but very different levels of uncertainty or risk.",
      },


      {
        type:
          "heading",

        text:
          "Expected reward versus risk",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose Game A always pays £5. Game B pays either £0 or £10 with equal probability. Both have expected value £5, but Game B is much more variable.",
      },


      {
        type:
          "callout",

        title:
          "Statistical decision making",

        text:
          "Expected value describes average outcome; variability describes how uncertain individual outcomes are.",
      },

    ],


    workedExamples: [

      {
        title:
          "Expected winnings",

        question:
          "A game pays £0 with probability 0.5, £4 with probability 0.3 and £10 with probability 0.2. Find the expected payout.",

        steps: [
          "Multiply each outcome by its probability.",
          "0 × 0.5 = 0.",
          "4 × 0.3 = 1.2.",
          "10 × 0.2 = 2.",
          "Add the contributions: 0 + 1.2 + 2 = 3.2.",
        ],

        answer:
          "The expected payout is £3.20 per play in the long run.",
      },


      {
        title:
          "Same expectation, different risk",

        question:
          "Game A always pays £5. Game B pays £0 or £10 with equal probability. Compare them.",

        steps: [
          "Game A has expected value £5.",
          "Game B has expected value 0 × 0.5 + 10 × 0.5 = £5.",
          "Game A has no variability.",
          "Game B varies substantially between outcomes.",
        ],

        answer:
          "Both games have the same expected value, but Game B has greater variability and therefore greater outcome uncertainty.",
      },

    ],


    exercises: [

      {
        question:
          "X takes values 0 and 1 with probabilities 0.7 and 0.3. Find E(X).",

        answer:
          "E(X) = 0 × 0.7 + 1 × 0.3 = 0.3.",
      },


      {
        question:
          "Why can an expected value be a number that never occurs as an actual outcome?",

        answer:
          "Expected value represents a probability-weighted long-run average rather than necessarily being one of the possible individual outcomes.",
      },


      {
        question:
          "Two investments have the same expected return, but Investment B has a much larger standard deviation. What does that suggest?",

        answer:
          "Investment B has more variable and therefore less predictable outcomes around the same expected return.",
      },

    ],


    quiz: [

      {
        question:
          "What is the best interpretation of expected value?",

        options: [
          "The outcome that must occur next",
          "The long-run probability-weighted average",
          "The maximum possible value",
          "The median of every distribution",
        ],

        correctIndex:
          1,

        explanation:
          "Expected value describes the long-run average outcome under repeated use of the probability model.",
      },


      {
        question:
          "Can expected value be a value that is impossible in one individual trial?",

        options: [
          "No",
          "Yes",
          "Only for continuous variables",
          "Only if probability equals zero",
        ],

        correctIndex:
          1,

        explanation:
          "An expected value is an average and need not be one of the possible outcomes.",
      },


      {
        question:
          "What does a larger standard deviation of a random variable indicate?",

        options: [
          "Greater variability in possible outcomes",
          "A larger sample size",
          "A probability above 1",
          "A guaranteed larger expected value",
        ],

        correctIndex:
          0,

        explanation:
          "Standard deviation measures how dispersed possible outcomes are around the expected value.",
      },

    ],


    summary: [
      "Expected value is the probability-weighted mean of a random variable.",
      "It represents a long-run average rather than a guaranteed individual outcome.",
      "Variance and standard deviation describe variability in possible outcomes.",
      "Two distributions can have the same expected value but different risks.",
      "Good decisions often require considering both expected outcome and variability.",
    ],


    nextStep:
      "Next, we study one of the most important discrete probability models: the binomial distribution.",
  },


  /* ========================================================================
     LESSON 15
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m4-l3-random-variables",

    title:
      "The binomial distribution",

    subtitle:
      "The binomial model describes the number of successes across repeated independent trials.",

    estimatedMinutes:
      40,


    objectives: [
      "Recognise when a binomial model is appropriate.",
      "Interpret the parameters n and p.",
      "Calculate simple binomial probabilities.",
      "Find the mean and standard deviation of a binomial distribution.",
      "Explain how changing n and p changes the distribution.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Many probability problems count the number of times an event occurs across a fixed number of repeated trials. Under specific conditions, these counts follow a binomial distribution.",
      },


      {
        type:
          "heading",

        text:
          "When is a binomial model appropriate?",
      },


      {
        type:
          "bullets",

        items: [
          "There is a fixed number of trials, n.",
          "Each trial has two possible outcomes, often called success and failure.",
          "The trials are independent.",
          "The probability of success, p, remains constant across trials.",
        ],
      },


      {
        type:
          "callout",

        title:
          "Notation",

        text:
          "X ~ Binomial(n, p) means that X counts the number of successes in n independent trials, each with probability p of success.",
      },


      {
        type:
          "heading",

        text:
          "Exactly x successes",
      },


      {
        type:
          "paragraph",

        text:
          "The probability of exactly x successes combines two ideas: the probability of one particular sequence containing x successes, and the number of different sequences in which those successes could occur.",
      },


      {
        type:
          "heading",

        text:
          "Centre and spread",
      },


      {
        type:
          "callout",

        title:
          "Binomial summaries",

        text:
          "For X ~ Binomial(n,p), the mean is np and the standard deviation is √[np(1−p)].",
      },


      {
        type:
          "paragraph",

        text:
          "The mean tells us the expected number of successes. For example, if n = 100 and p = 0.20, the expected count is 20 successes.",
      },


      {
        type:
          "heading",

        text:
          "How p affects shape",
      },


      {
        type:
          "paragraph",

        text:
          "When p is near 0.5, a binomial distribution is often relatively symmetric. When p is close to 0 or 1, the distribution becomes more skewed, especially for smaller values of n.",
      },


      {
        type:
          "distribution-model-explorer",

        title:
          "Binomial and Normal Explorer",

        description:
          "Use the binomial controls first. Change n, p and x to see how probability, expected value, variability and distribution shape respond.",
      },

    ],


    workedExamples: [

      {
        title:
          "Ten independent trials",

        question:
          "Suppose X ~ Binomial(10, 0.4). What is the expected number of successes?",

        steps: [
          "For a binomial random variable, E(X) = np.",
          "Here n = 10 and p = 0.4.",
          "Calculate 10 × 0.4.",
        ],

        answer:
          "The expected number of successes is 4.",
      },


      {
        title:
          "Probability of exactly two successes",

        question:
          "If X ~ Binomial(5, 0.2), what does P(X = 2) represent?",

        steps: [
          "X counts successes across five independent trials.",
          "The event X = 2 means exactly two of those five trials are successes.",
          "The remaining three trials are failures.",
          "The binomial probability accounts for all possible arrangements of the two successes.",
        ],

        answer:
          "P(X = 2) is the probability of obtaining exactly two successes among five independent trials when each success probability is 0.2.",
      },

    ],


    exercises: [

      {
        question:
          "A fair coin is flipped 20 times and X counts heads. Give the binomial model.",

        answer:
          "X ~ Binomial(20, 0.5).",
      },


      {
        question:
          "If X ~ Binomial(50, 0.1), find E(X).",

        answer:
          "E(X) = np = 50 × 0.1 = 5.",
      },


      {
        question:
          "Why would a binomial model be inappropriate if the success probability changes after every trial?",

        answer:
          "The binomial model requires the probability of success p to remain constant across trials.",
      },

    ],


    quiz: [

      {
        question:
          "Which condition is required for a binomial model?",

        options: [
          "The probability of success changes every trial",
          "There are exactly three outcomes",
          "There is a fixed number of trials",
          "The trials must have numerical measurements",
        ],

        correctIndex:
          2,

        explanation:
          "A binomial model requires a fixed number of trials.",
      },


      {
        question:
          "For X ~ Binomial(n,p), what is E(X)?",

        options: [
          "n + p",
          "np",
          "n/p",
          "p − n",
        ],

        correctIndex:
          1,

        explanation:
          "The expected number of successes is n multiplied by p.",
      },


      {
        question:
          "What does p represent in X ~ Binomial(n,p)?",

        options: [
          "Number of trials",
          "Probability of success on each trial",
          "Observed number of successes",
          "Standard deviation",
        ],

        correctIndex:
          1,

        explanation:
          "p is the constant probability of success on each trial.",
      },


      {
        question:
          "When is a binomial distribution often most symmetric?",

        options: [
          "When p is near 0.5",
          "Only when p = 0",
          "When n = 1",
          "When p changes across trials",
        ],

        correctIndex:
          0,

        explanation:
          "With moderate or large n, p values near 0.5 generally produce a more symmetric binomial distribution.",
      },

    ],


    summary: [
      "The binomial distribution counts successes across a fixed number of trials.",
      "Each trial has two outcomes, constant success probability and independence.",
      "The notation is X ~ Binomial(n,p).",
      "The expected value is np.",
      "The standard deviation is √[np(1−p)].",
      "Changing n and p changes the centre, spread and shape of the distribution.",
    ],


    nextStep:
      "Next, we move from a discrete distribution to one of the most important continuous models in statistics: the normal distribution.",
  },


  /* ========================================================================
     LESSON 16
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m4-l4-random-variables",

    title:
      "The normal distribution",

    subtitle:
      "The normal distribution provides a useful mathematical model for many continuous quantities and statistical estimates.",

    estimatedMinutes:
      45,


    objectives: [
      "Recognise the main features of a normal distribution.",
      "Interpret the parameters μ and σ.",
      "Use the 68–95–99.7 rule.",
      "Calculate and interpret z-scores.",
      "Explain how changes in mean and standard deviation affect a normal curve.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "The normal distribution is one of the most widely used probability models in statistics. It is continuous, symmetric and bell-shaped.",
      },


      {
        type:
          "heading",

        text:
          "The role of μ and σ",
      },


      {
        type:
          "paragraph",

        text:
          "A normal distribution is determined by two parameters. The mean μ controls its centre, while the standard deviation σ controls its spread.",
      },


      {
        type:
          "bullets",

        items: [
          "Changing μ shifts the curve left or right.",
          "Increasing σ makes the curve wider and flatter.",
          "Decreasing σ makes the curve narrower and taller.",
          "The normal distribution is symmetric around μ.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Area represents probability",
      },


      {
        type:
          "paragraph",

        text:
          "For a continuous probability distribution, probability is represented by area under the curve. The total area under a probability density curve equals 1.",
      },


      {
        type:
          "callout",

        title:
          "Continuous probability",

        text:
          "For a continuous random variable, probabilities apply to intervals rather than individual exact points.",
      },


      {
        type:
          "heading",

        text:
          "The 68–95–99.7 rule",
      },


      {
        type:
          "bullets",

        items: [
          "Approximately 68% of values lie within 1 standard deviation of the mean.",
          "Approximately 95% lie within 2 standard deviations.",
          "Approximately 99.7% lie within 3 standard deviations.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Standardisation",
      },


      {
        type:
          "paragraph",

        text:
          "A z-score expresses how far an observation lies from the mean in standard-deviation units.",
      },


      {
        type:
          "callout",

        title:
          "z-score",

        text:
          "z = (x − μ) / σ.",
      },


      {
        type:
          "paragraph",

        text:
          "A z-score of 0 means the observation equals the mean. A z-score of 2 means it is two standard deviations above the mean, while −1.5 means it lies 1.5 standard deviations below the mean.",
      },


      {
        type:
          "heading",

        text:
          "Why z-scores are useful",
      },


      {
        type:
          "paragraph",

        text:
          "Standardisation puts values measured on different scales onto a common scale. This helps us judge how unusual an observation is relative to its own distribution.",
      },


      {
        type:
          "distribution-model-explorer",

        title:
          "Binomial and Normal Explorer",

        description:
          "Use the normal controls to move the mean, change the standard deviation and standardise an observed value using its z-score.",
      },


      {
        type:
          "heading",

        text:
          "Normal does not mean universal",
      },


      {
        type:
          "paragraph",

        text:
          "Not every variable follows a normal distribution. Strongly skewed data, bounded measurements and multimodal distributions may be poorly represented by a normal model.",
      },


      {
        type:
          "callout",

        title:
          "Good modelling habit",

        text:
          "A mathematical model is useful only when its assumptions provide a reasonable approximation to the situation being studied.",
      },

    ],


    workedExamples: [

      {
        title:
          "Interpreting a z-score",

        question:
          "Examination scores have mean 70 and standard deviation 8. A student scores 86. Find and interpret the z-score.",

        steps: [
          "Subtract the mean: 86 − 70 = 16.",
          "Divide by the standard deviation: 16/8 = 2.",
          "Interpret the result in standard-deviation units.",
        ],

        answer:
          "z = 2. The student's score is two standard deviations above the mean.",
      },


      {
        title:
          "Using the empirical rule",

        question:
          "Heights are approximately normal with mean 170 cm and SD 6 cm. Roughly what percentage would lie between 158 cm and 182 cm?",

        steps: [
          "158 is 12 cm below the mean.",
          "182 is 12 cm above the mean.",
          "12 cm corresponds to 2 standard deviations because 12/6 = 2.",
          "Approximately 95% of a normal distribution lies within ±2 SD.",
        ],

        answer:
          "Approximately 95%.",
      },

    ],


    exercises: [

      {
        question:
          "A distribution has μ = 100 and σ = 15. Find the z-score for x = 130.",

        answer:
          "z = (130 − 100)/15 = 2.",
      },


      {
        question:
          "What proportion of an approximately normal distribution lies within one standard deviation of the mean?",

        answer:
          "Approximately 68%.",
      },


      {
        question:
          "What happens to a normal curve if the standard deviation increases while the mean stays fixed?",

        answer:
          "The curve becomes wider and flatter while remaining centred at the same mean.",
      },


      {
        question:
          "Why should we inspect the shape of observed data before applying a normal model?",

        answer:
          "Not every distribution is approximately normal. Strong skewness, multiple peaks or other features may make the normal model inappropriate.",
      },

    ],


    quiz: [

      {
        question:
          "What parameter controls the centre of a normal distribution?",

        options: [
          "σ",
          "μ",
          "n",
          "p",
        ],

        correctIndex:
          1,

        explanation:
          "μ is the mean and therefore determines the centre of the normal distribution.",
      },


      {
        question:
          "What does z = −2 mean?",

        options: [
          "Two standard deviations below the mean",
          "Two units below zero",
          "Twice the mean",
          "Probability equals −2",
        ],

        correctIndex:
          0,

        explanation:
          "A z-score measures distance from the mean in standard-deviation units.",
      },


      {
        question:
          "Approximately what percentage of a normal distribution lies within two standard deviations of the mean?",

        options: [
          "50%",
          "68%",
          "95%",
          "99.99%",
        ],

        correctIndex:
          2,

        explanation:
          "The empirical rule gives approximately 95% within ±2 standard deviations.",
      },


      {
        question:
          "What happens when σ increases?",

        options: [
          "The curve becomes wider",
          "The mean automatically becomes zero",
          "The distribution becomes discrete",
          "Total probability exceeds 1",
        ],

        correctIndex:
          0,

        explanation:
          "Larger standard deviation represents greater spread.",
      },

    ],


    summary: [
      "The normal distribution is continuous, symmetric and bell-shaped.",
      "The mean μ determines its centre and standard deviation σ determines its spread.",
      "Probability corresponds to area under the curve.",
      "Approximately 68%, 95% and 99.7% of observations lie within 1, 2 and 3 SD of the mean.",
      "A z-score expresses an observation's position in standard-deviation units.",
      "Normality is a modelling assumption and should not be applied automatically.",
    ],


    nextStep:
      "Module 5 moves from probability models to statistical inference by examining sampling variability and why different samples give different answers.",
  },

];