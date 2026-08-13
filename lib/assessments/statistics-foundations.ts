import type {
  CourseAssessment,
} from "./types";


export const statisticsFoundationsAssessments:
  CourseAssessment[] = [

  {
    key: "module-01-checkpoint",
    courseSlug: "statistics-foundations",
    type: "module-checkpoint",
    moduleNumber: 1,
    title: "Module 1 Checkpoint",
    description: "Test your understanding of statistical questions, variables, populations, samples and the process of moving from a question to evidence.",
    passingPercentage: 70,
    questions: [

      {
        id: "m1-q1",
        question: "Which statement best describes statistical thinking?",
        options: [
          "Calculating as many numerical summaries as possible",
          "Using data to answer questions while accounting for variation and uncertainty",
          "Accepting the largest observed value as the best evidence",
          "Removing all uncertainty before drawing a conclusion",
        ],
        correctIndex: 1,
        explanation: "Statistical thinking connects questions, data, variation and uncertainty rather than simply performing calculations.",
      },

      {
        id: "m1-q2",
        question: "A researcher records each participant's blood group. What type of variable is blood group?",
        options: [
          "Quantitative continuous",
          "Quantitative discrete",
          "Categorical",
          "A population parameter",
        ],
        correctIndex: 2,
        explanation: "Blood group represents categories rather than numerical measurements.",
      },

      {
        id: "m1-q3",
        question: "A researcher records the number of hospital visits made by each patient during one year. What type of variable is this?",
        options: [
          "Categorical",
          "Quantitative discrete",
          "Quantitative continuous",
          "Ordinal only",
        ],
        correctIndex: 1,
        explanation: "The number of visits is a count and therefore a discrete quantitative variable.",
      },

      {
        id: "m1-q4",
        question: "A university wants to estimate the average weekly study time of all its undergraduate students. What is the population?",
        options: [
          "Only the students who respond to the survey",
          "All undergraduate students at the university",
          "The calculated sample mean",
          "The survey questionnaire",
        ],
        correctIndex: 1,
        explanation: "The population is the complete group about which the researchers want to draw conclusions.",
      },

      {
        id: "m1-q5",
        question: "What is the main difference between a population parameter and a sample statistic?",
        options: [
          "A parameter describes a population, while a statistic is calculated from a sample",
          "A parameter is always categorical",
          "A statistic cannot contain numbers",
          "There is no difference",
        ],
        correctIndex: 0,
        explanation: "Population parameters describe population characteristics; sample statistics are calculated from observed samples.",
      },

      {
        id: "m1-q6",
        question: "Which is the best example of a statistical question?",
        options: [
          "What is 7 × 8?",
          "What is one student's exact height?",
          "How much does weekly study time vary among undergraduate students?",
          "What is the definition of multiplication?",
        ],
        correctIndex: 2,
        explanation: "A statistical question anticipates variation in the data and usually requires observations from multiple units.",
      },

      {
        id: "m1-q7",
        question: "Researchers find that students who exercise more also report better sleep. What can be concluded immediately from this observation alone?",
        options: [
          "Exercise definitely causes better sleep",
          "Better sleep definitely causes exercise",
          "There is an observed association that requires further interpretation",
          "There can be no confounding variables",
        ],
        correctIndex: 2,
        explanation: "An observed association alone does not establish causation. Study design and alternative explanations must be considered.",
      },

      {
        id: "m1-q8",
        question: "Which sequence best represents a responsible statistical investigation?",
        options: [
          "Conclusion → data → question",
          "Calculation → conclusion → population",
          "Question → data → analysis → evidence → conclusion",
          "p-value → question → sample",
        ],
        correctIndex: 2,
        explanation: "Statistical investigations begin with a meaningful question, use appropriate data and analysis, and finish with a conclusion supported by the evidence.",
      }

    ],
  },

  {
    key: "module-02-checkpoint",
    courseSlug: "statistics-foundations",
    type: "module-checkpoint",
    moduleNumber: 2,
    title: "Module 2 Checkpoint",
    description: "Check your understanding of distributions, centre, variability, shape, outliers and responsible comparisons.",
    passingPercentage: 70,
    questions: [

      {
        id: "m2-q1",
        question: "Which features should usually be considered when describing a numerical distribution?",
        options: [
          "Only its maximum",
          "Centre, spread, shape and unusual observations",
          "Only its sample size",
          "Only its mean",
        ],
        correctIndex: 1,
        explanation: "A useful description considers where the data are centred, how variable they are, the distribution's shape and notable observations such as outliers.",
      },

      {
        id: "m2-q2",
        question: "A dataset contains one extremely large outlier. Which measure of centre is usually more resistant to that outlier?",
        options: [
          "Mean",
          "Median",
          "Range",
          "Standard deviation",
        ],
        correctIndex: 1,
        explanation: "The median depends on ordered position and is generally much less affected by an extreme observation than the mean.",
      },

      {
        id: "m2-q3",
        question: "If Q1 = 12 and Q3 = 20, what is the interquartile range?",
        options: [
          "8",
          "16",
          "32",
          "1.5",
        ],
        correctIndex: 0,
        explanation: "IQR = Q3 − Q1 = 20 − 12 = 8.",
      },

      {
        id: "m2-q4",
        question: "What does standard deviation primarily describe?",
        options: [
          "The number of categories",
          "The spread of observations around the mean",
          "The location of the median only",
          "Whether the sample is biased",
        ],
        correctIndex: 1,
        explanation: "Standard deviation measures the typical scale of dispersion around the mean.",
      },

      {
        id: "m2-q5",
        question: "In a strongly right-skewed distribution, which relationship is commonly observed?",
        options: [
          "The mean is pulled towards the long right tail",
          "The median must be greater than every observation",
          "The mean must equal the median",
          "The range must be zero",
        ],
        correctIndex: 0,
        explanation: "Large observations in a right tail tend to pull the mean upward more strongly than the median.",
      },

      {
        id: "m2-q6",
        question: "Using the 1.5 × IQR rule, a potential upper outlier lies above which boundary?",
        options: [
          "Q1 + 1.5 × IQR",
          "Q3 + 1.5 × IQR",
          "Mean + IQR",
          "Median + range",
        ],
        correctIndex: 1,
        explanation: "The conventional upper fence is Q3 + 1.5 × IQR.",
      },

      {
        id: "m2-q7",
        question: "Two groups have the same mean but very different standard deviations. What does this tell us?",
        options: [
          "The groups have identical distributions",
          "They have similar centres but different amounts of spread",
          "The larger-SD group must have a larger median",
          "One group must be biased",
        ],
        correctIndex: 1,
        explanation: "The same mean describes similar centres, while different standard deviations indicate different variability.",
      },

      {
        id: "m2-q8",
        question: "Why is it risky to compare two distributions using only their means?",
        options: [
          "Means cannot be calculated for numerical data",
          "Important differences in spread, shape and outliers may be hidden",
          "The mean always equals zero",
          "A mean is always biased",
        ],
        correctIndex: 1,
        explanation: "Two distributions can have the same mean while differing substantially in variability, skewness, outliers or other structural features.",
      }

    ],
  },

  {
    key: "module-03-checkpoint",
    courseSlug: "statistics-foundations",
    type: "module-checkpoint",
    moduleNumber: 3,
    title: "Module 3 Checkpoint",
    description: "Test your understanding of probability, events, conditional probability, independence, trees and simulation.",
    passingPercentage: 70,
    questions: [

      {
        id: "m3-q1",
        question: "For one roll of a fair six-sided die, what is the sample space?",
        options: [
          "{1, 2, 3, 4, 5, 6}",
          "{even, odd} only",
          "{6}",
          "All possible means",
        ],
        correctIndex: 0,
        explanation: "The sample space lists every possible outcome of the experiment.",
      },

      {
        id: "m3-q2",
        question: "If P(A) = 0.32, what is P(not A)?",
        options: [
          "0.32",
          "0.68",
          "1.32",
          "0",
        ],
        correctIndex: 1,
        explanation: "The complement rule gives P(not A) = 1 − P(A) = 0.68.",
      },

      {
        id: "m3-q3",
        question: "Why does the general addition rule subtract P(A ∩ B)?",
        options: [
          "Because probabilities cannot exceed 0.5",
          "Because the overlap is otherwise counted twice",
          "Because A and B must be independent",
          "Because intersections are impossible",
        ],
        correctIndex: 1,
        explanation: "Adding P(A) and P(B) counts outcomes belonging to both events twice, so the overlap is subtracted once.",
      },

      {
        id: "m3-q4",
        question: "If A and B are independent with P(A)=0.4 and P(B)=0.5, what is P(A ∩ B)?",
        options: [
          "0.9",
          "0.2",
          "0.4",
          "0.1",
        ],
        correctIndex: 1,
        explanation: "For independent events, P(A ∩ B) = P(A)P(B) = 0.4 × 0.5 = 0.2.",
      },

      {
        id: "m3-q5",
        question: "What does P(A | B) mean?",
        options: [
          "Probability of B given A",
          "Probability of A given B",
          "Probability that neither occurs",
          "Probability that both are impossible",
        ],
        correctIndex: 1,
        explanation: "The vertical bar is read as 'given'; P(A | B) conditions on B having occurred.",
      },

      {
        id: "m3-q6",
        question: "Which statement about independence and mutual exclusivity is correct?",
        options: [
          "They mean the same thing",
          "Independent events cannot occur together",
          "Mutually exclusive events with positive probability are not independent",
          "All mutually exclusive events have probability 0",
        ],
        correctIndex: 2,
        explanation: "Mutually exclusive positive-probability events cannot occur together, so learning one occurred changes the probability of the other to zero.",
      },

      {
        id: "m3-q7",
        question: "In a probability tree, how do you usually calculate the probability of one complete path?",
        options: [
          "Add branch probabilities along the path",
          "Multiply branch probabilities along the path",
          "Subtract the branches",
          "Take their median",
        ],
        correctIndex: 1,
        explanation: "Sequential probabilities along one path are multiplied.",
      },

      {
        id: "m3-q8",
        question: "A fair coin has produced heads five times in a row. What is the probability of tails on the next independent flip?",
        options: [
          "0",
          "0.25",
          "0.5",
          "1",
        ],
        correctIndex: 2,
        explanation: "Previous independent flips do not change the next flip's probability; tails remains 0.5.",
      }

    ],
  },

  {
    key: "module-04-checkpoint",
    courseSlug: "statistics-foundations",
    type: "module-checkpoint",
    moduleNumber: 4,
    title: "Module 4 Checkpoint",
    description: "Assess your understanding of random variables, expected value, binomial models and the normal distribution.",
    passingPercentage: 70,
    questions: [

      {
        id: "m4-q1",
        question: "Which is a discrete random variable?",
        options: [
          "Waiting time for a bus",
          "Body temperature",
          "Number of defective items in a batch",
          "Exact height",
        ],
        correctIndex: 2,
        explanation: "A count of defective items takes countable integer values and is therefore discrete.",
      },

      {
        id: "m4-q2",
        question: "What must be true for a valid discrete probability distribution?",
        options: [
          "All outcomes must have equal probability",
          "All probabilities must sum to 1 and each must lie between 0 and 1",
          "The mean must be zero",
          "There must be exactly two outcomes",
        ],
        correctIndex: 1,
        explanation: "A discrete probability distribution must assign valid probabilities and total probability 1 across all possible values.",
      },

      {
        id: "m4-q3",
        question: "What is the best interpretation of expected value?",
        options: [
          "The outcome guaranteed on the next trial",
          "The long-run probability-weighted average",
          "The maximum possible outcome",
          "The median in every distribution",
        ],
        correctIndex: 1,
        explanation: "Expected value represents the probability-weighted long-run average across repeated use of the model.",
      },

      {
        id: "m4-q4",
        question: "Two games have the same expected payout, but Game B has a much larger standard deviation. What does that imply?",
        options: [
          "Game B has more variable outcomes",
          "Game B must have a larger expected value",
          "Game B is impossible",
          "Game A must be biased",
        ],
        correctIndex: 0,
        explanation: "A larger standard deviation indicates more dispersion and therefore greater outcome uncertainty around the same expectation.",
      },

      {
        id: "m4-q5",
        question: "Which condition is required for a binomial model?",
        options: [
          "A changing success probability after every trial",
          "A fixed number of independent trials with constant success probability",
          "A continuous outcome",
          "At least three outcomes per trial",
        ],
        correctIndex: 1,
        explanation: "A binomial model requires fixed n, two outcomes per trial, independence and constant p.",
      },

      {
        id: "m4-q6",
        question: "If X ~ Binomial(40, 0.25), what is E(X)?",
        options: [
          "10",
          "20",
          "40",
          "0.25",
        ],
        correctIndex: 0,
        explanation: "For a binomial random variable, E(X)=np=40×0.25=10.",
      },

      {
        id: "m4-q7",
        question: "Approximately what percentage of a normal distribution lies within two standard deviations of its mean?",
        options: [
          "50%",
          "68%",
          "95%",
          "100%",
        ],
        correctIndex: 2,
        explanation: "The 68–95–99.7 rule gives approximately 95% within ±2 standard deviations.",
      },

      {
        id: "m4-q8",
        question: "A score is 80 in a distribution with mean 70 and SD 5. What is its z-score?",
        options: [
          "1",
          "2",
          "5",
          "10",
        ],
        correctIndex: 1,
        explanation: "z=(80−70)/5=2, so the score lies two standard deviations above the mean.",
      }

    ],
  },

  {
    key: "module-05-checkpoint",
    courseSlug: "statistics-foundations",
    type: "module-checkpoint",
    moduleNumber: 5,
    title: "Module 5 Checkpoint",
    description: "Test your understanding of sampling variability, sampling methods, standard errors and the Central Limit idea.",
    passingPercentage: 70,
    questions: [

      {
        id: "m5-q1",
        question: "Why can two valid random samples from the same population produce different sample means?",
        options: [
          "The population mean changes whenever a sample is taken",
          "Sampling variability causes different samples to contain different observations",
          "One sample must be fraudulent",
          "Means are not numerical",
        ],
        correctIndex: 1,
        explanation: "Different random samples contain different observations, so their sample statistics vary naturally.",
      },

      {
        id: "m5-q2",
        question: "Which statement best distinguishes a population parameter from a sample statistic?",
        options: [
          "Both vary every time a sample is drawn",
          "The parameter describes the population; the statistic is calculated from the sample",
          "The statistic is always known before sampling",
          "The parameter is always categorical",
        ],
        correctIndex: 1,
        explanation: "The population parameter is treated as fixed while sample statistics vary over possible samples.",
      },

      {
        id: "m5-q3",
        question: "Which method deliberately samples within defined population subgroups?",
        options: [
          "Convenience sampling",
          "Voluntary-response sampling",
          "Stratified sampling",
          "Measurement error",
        ],
        correctIndex: 2,
        explanation: "Stratified sampling divides the population into relevant subgroups and samples within each.",
      },

      {
        id: "m5-q4",
        question: "Why can a very large convenience sample still be misleading?",
        options: [
          "Large samples cannot contain numbers",
          "A large n reduces random variability but does not automatically remove selection bias",
          "Large samples always increase bias",
          "Standard error becomes undefined",
        ],
        correctIndex: 1,
        explanation: "Systematic exclusion or over-representation can persist regardless of sample size.",
      },

      {
        id: "m5-q5",
        question: "What appears in the sampling distribution of the sample mean?",
        options: [
          "Individual observations from one sample",
          "Sample means from repeated samples",
          "Only population parameters",
          "Only outliers",
        ],
        correctIndex: 1,
        explanation: "A sampling distribution describes the repeated-sample behaviour of a statistic such as the sample mean.",
      },

      {
        id: "m5-q6",
        question: "What does the standard error of the mean describe?",
        options: [
          "Variability among individuals in the population only",
          "Variability of the sample mean across repeated samples",
          "Selection bias",
          "The number of categories",
        ],
        correctIndex: 1,
        explanation: "Standard error measures repeated-sample variability of the estimator.",
      },

      {
        id: "m5-q7",
        question: "If sample size increases by a factor of four, what happens approximately to SE of the mean under the basic model?",
        options: [
          "It doubles",
          "It halves",
          "It becomes four times larger",
          "It does not change",
        ],
        correctIndex: 1,
        explanation: "SE is proportional to 1/√n, so multiplying n by four divides SE by two.",
      },

      {
        id: "m5-q8",
        question: "What does the Central Limit idea say under suitable conditions?",
        options: [
          "The original population becomes normal as n increases",
          "The sampling distribution of the sample mean becomes approximately normal as n increases",
          "Every sample has exactly the population mean",
          "Bias disappears in large samples",
        ],
        correctIndex: 1,
        explanation: "The Central Limit Theorem concerns the sampling distribution of the mean, not transformation of the original population.",
      }

    ],
  },

  {
    key: "module-06-checkpoint",
    courseSlug: "statistics-foundations",
    type: "module-checkpoint",
    moduleNumber: 6,
    title: "Module 6 Checkpoint",
    description: "Check your understanding of confidence intervals, precision, coverage and correct interpretation.",
    passingPercentage: 70,
    questions: [

      {
        id: "m6-q1",
        question: "What is a point estimate?",
        options: [
          "A range of possible sample sizes",
          "A single sample statistic used to estimate a population parameter",
          "A guaranteed true population value",
          "A significance threshold",
        ],
        correctIndex: 1,
        explanation: "A point estimate is a single-number estimate calculated from sample data.",
      },

      {
        id: "m6-q2",
        question: "An estimate is 40 with a margin of error of 3. What interval does this produce?",
        options: [
          "3 to 40",
          "37 to 43",
          "40 to 43",
          "43 to 46",
        ],
        correctIndex: 1,
        explanation: "Estimate ± margin of error gives 40−3=37 and 40+3=43.",
      },

      {
        id: "m6-q3",
        question: "Which expression captures the usual structure of many confidence intervals?",
        options: [
          "Estimate ± critical value × standard error",
          "Mean × median",
          "Sample size ± population size",
          "p-value ÷ variance",
        ],
        correctIndex: 0,
        explanation: "Many standard confidence intervals are formed from an estimate plus or minus a critical value times its standard error.",
      },

      {
        id: "m6-q4",
        question: "What generally happens to a confidence interval when sample size increases and other features stay similar?",
        options: [
          "It becomes narrower because standard error decreases",
          "It always becomes wider",
          "Its confidence level automatically becomes 100%",
          "The estimate must become zero",
        ],
        correctIndex: 0,
        explanation: "Larger samples generally reduce standard error and therefore narrow the interval.",
      },

      {
        id: "m6-q5",
        question: "What generally happens when confidence level increases from 90% to 99% with the same data?",
        options: [
          "The interval becomes narrower",
          "The interval becomes wider",
          "The point estimate doubles",
          "The standard error becomes zero",
        ],
        correctIndex: 1,
        explanation: "Higher confidence requires a larger critical value and therefore a wider interval.",
      },

      {
        id: "m6-q6",
        question: "What does 95% confidence mean in the frequentist framework used in this course?",
        options: [
          "There is a 95% probability that the fixed parameter lies in this particular observed interval",
          "Approximately 95% of intervals generated by the procedure would contain the true parameter in repeated sampling under the assumptions",
          "95% of observations must lie inside the interval",
          "The parameter changes between samples",
        ],
        correctIndex: 1,
        explanation: "The confidence level describes the long-run coverage of the interval-producing procedure.",
      },

      {
        id: "m6-q7",
        question: "Which interval generally represents greater precision when estimating the same quantity at the same confidence level?",
        options: [
          "10 to 30",
          "18 to 22",
          "Both have identical precision",
          "Precision cannot relate to interval width",
        ],
        correctIndex: 1,
        explanation: "The narrower interval indicates lower sampling uncertainty and therefore greater precision.",
      },

      {
        id: "m6-q8",
        question: "Can a narrow confidence interval from a severely biased sample still be misleading?",
        options: [
          "No, narrow intervals guarantee validity",
          "Yes, precision does not automatically remove systematic bias",
          "Only when n is exactly 30",
          "Only if the mean is negative",
        ],
        correctIndex: 1,
        explanation: "Confidence intervals quantify sampling uncertainty under assumptions; they cannot automatically repair systematic bias.",
      }

    ],
  },

  {
    key: "module-07-checkpoint",
    courseSlug: "statistics-foundations",
    type: "module-checkpoint",
    moduleNumber: 7,
    title: "Module 7 Checkpoint",
    description: "Assess your understanding of hypotheses, p-values, statistical significance and responsible conclusions.",
    passingPercentage: 70,
    questions: [

      {
        id: "m7-q1",
        question: "What is the main role of the null hypothesis?",
        options: [
          "To prove there is no effect",
          "To provide a benchmark statistical model for comparison",
          "To guarantee the sample is unbiased",
          "To specify the final conclusion before collecting data",
        ],
        correctIndex: 1,
        explanation: "The null hypothesis defines the benchmark model against which observed data are evaluated.",
      },

      {
        id: "m7-q2",
        question: "What does a test statistic generally measure?",
        options: [
          "Discrepancy from the null relative to expected uncertainty",
          "Only the sample size",
          "The probability that H₀ is true",
          "The effect size without uncertainty",
        ],
        correctIndex: 0,
        explanation: "A test statistic standardises how far the observed result lies from the null expectation.",
      },

      {
        id: "m7-q3",
        question: "Which is the best conceptual interpretation of a p-value?",
        options: [
          "The probability that H₀ is true",
          "The probability under H₀ of obtaining a result at least as extreme as observed",
          "The size of the effect",
          "The probability the study is unbiased",
        ],
        correctIndex: 1,
        explanation: "A p-value is calculated under the null model and quantifies extremeness of the observed test statistic.",
      },

      {
        id: "m7-q4",
        question: "If p = 0.03 and α = 0.05, what is the conventional decision?",
        options: [
          "Do not reject H₀",
          "Reject H₀ at the 5% level",
          "Prove the alternative hypothesis",
          "Set α equal to zero",
        ],
        correctIndex: 1,
        explanation: "Because p is below the prespecified threshold, the result is conventionally called statistically significant at α=0.05.",
      },

      {
        id: "m7-q5",
        question: "What is a Type I error?",
        options: [
          "Failing to calculate a mean",
          "Rejecting a true null hypothesis",
          "Using a large sample",
          "Reporting a confidence interval",
        ],
        correctIndex: 1,
        explanation: "A Type I error is a false-positive rejection of a null hypothesis that is actually true.",
      },

      {
        id: "m7-q6",
        question: "A study gives p = 0.30. Which conclusion is most appropriate?",
        options: [
          "The null hypothesis has been proved true",
          "Do not reject the null hypothesis at a conventional 0.05 level",
          "The effect is exactly zero",
          "The study has no uncertainty",
        ],
        correctIndex: 1,
        explanation: "A large p-value does not prove H₀; it indicates insufficient evidence to reject it at the chosen threshold.",
      },

      {
        id: "m7-q7",
        question: "Does a very small p-value imply that the effect is practically important?",
        options: [
          "Always",
          "No; effect magnitude and context must be assessed separately",
          "Only when n is above 100",
          "Only for normally distributed data",
        ],
        correctIndex: 1,
        explanation: "Statistical significance concerns evidence relative to uncertainty, not whether the effect is large or important in context.",
      },

      {
        id: "m7-q8",
        question: "An observational study finds a statistically significant association. What should be considered before making a causal claim?",
        options: [
          "Nothing else is needed",
          "Study design, confounding, selection, measurement and alternative explanations",
          "Only whether p is below 0.05",
          "Only the sample mean",
        ],
        correctIndex: 1,
        explanation: "Statistical significance alone does not establish causality; causal interpretation depends on design and assumptions.",
      }

    ],
  },

  {
    key: "final-assessment",
    courseSlug: "statistics-foundations",
    type: "final-assessment",
    title: "Statistics Foundations Final Assessment",
    description: "A cumulative assessment covering data and variables, descriptive statistics, probability, distributions, sampling, confidence intervals and hypothesis testing.",
    passingPercentage: 70,
    questions: [

      {
        id: "final-q1",
        question: "A researcher wants to estimate the mean resting heart rate of all first-year students at a university. Which quantity is the population parameter of interest?",
        options: [
          "The mean heart rate calculated from the sampled students",
          "The true mean resting heart rate of all first-year students",
          "The number of sampled students",
          "The largest observed heart rate",
        ],
        correctIndex: 1,
        explanation: "The population parameter is the true characteristic of the full target population; the sample mean is an estimator of it.",
      },

      {
        id: "final-q2",
        question: "A distribution has several extremely high observations. Which pair is generally more resistant to those observations?",
        options: [
          "Mean and standard deviation",
          "Median and IQR",
          "Mean and range",
          "Variance and maximum",
        ],
        correctIndex: 1,
        explanation: "The median and IQR are based on order and central positions, making them relatively resistant to extreme values.",
      },

      {
        id: "final-q3",
        question: "Two groups have the same mean but Group B has much larger SD. Which conclusion is justified?",
        options: [
          "Their distributions are identical",
          "Group B has greater variability around the mean",
          "Group B must have a larger sample size",
          "Group B must be biased",
        ],
        correctIndex: 1,
        explanation: "Standard deviation describes dispersion; a larger SD indicates greater spread around the mean.",
      },

      {
        id: "final-q4",
        question: "If P(A)=0.6 and P(B)=0.5 with P(A∩B)=0.3, what is P(A∪B)?",
        options: [
          "0.2",
          "0.8",
          "1.1",
          "0.3",
        ],
        correctIndex: 1,
        explanation: "Use inclusion–exclusion: 0.6+0.5−0.3=0.8.",
      },

      {
        id: "final-q5",
        question: "A diagnostic test question asks for P(disease | positive test). Why is P(positive test | disease) not automatically the answer?",
        options: [
          "Conditional probability depends on which event is used as the conditioning group",
          "The two quantities are always equal",
          "Probabilities cannot use disease status",
          "Positive tests are continuous variables",
        ],
        correctIndex: 0,
        explanation: "Reversing the condition changes the denominator and generally changes the probability.",
      },

      {
        id: "final-q6",
        question: "If X ~ Binomial(20,0.3), what is the expected number of successes?",
        options: [
          "3",
          "6",
          "10",
          "20",
        ],
        correctIndex: 1,
        explanation: "For a binomial variable, E(X)=np=20×0.3=6.",
      },

      {
        id: "final-q7",
        question: "A value is 15 in a normal distribution with mean 10 and SD 2.5. What is its z-score?",
        options: [
          "1",
          "2",
          "2.5",
          "6",
        ],
        correctIndex: 1,
        explanation: "z=(15−10)/2.5=2.",
      },

      {
        id: "final-q8",
        question: "Which statement about expected value is correct?",
        options: [
          "It must be an outcome that can occur in one trial",
          "It is the probability-weighted long-run average",
          "It is always the median",
          "It guarantees the next outcome",
        ],
        correctIndex: 1,
        explanation: "Expected value is a long-run average and need not itself be a possible single-trial outcome.",
      },

      {
        id: "final-q9",
        question: "Why do different random samples from the same population produce different estimates?",
        options: [
          "The population parameter changes each time",
          "Sampling variability",
          "Random sampling guarantees identical results",
          "The sample statistic is fixed",
        ],
        correctIndex: 1,
        explanation: "Different random samples contain different observations, causing natural repeated-sample variation.",
      },

      {
        id: "final-q10",
        question: "A survey of 50,000 people recruits only volunteers from a website. What is the strongest concern?",
        options: [
          "The sample is too large",
          "Selection or voluntary-response bias may remain despite high precision",
          "The standard error must be infinite",
          "The mean cannot be calculated",
        ],
        correctIndex: 1,
        explanation: "Large sample size reduces random variability but does not correct a systematically unrepresentative recruitment process.",
      },

      {
        id: "final-q11",
        question: "What is the sampling distribution of the sample mean?",
        options: [
          "The distribution of individual observations in one sample",
          "The distribution of sample means over repeated samples",
          "The distribution of population labels",
          "Only the extreme observations",
        ],
        correctIndex: 1,
        explanation: "Sampling distributions describe how a statistic behaves across hypothetical repeated samples.",
      },

      {
        id: "final-q12",
        question: "If the population SD is 18 and n=81, what is the standard error of the sample mean under the basic independent-sampling model?",
        options: [
          "2",
          "9",
          "18",
          "162",
        ],
        correctIndex: 0,
        explanation: "SE=σ/√n=18/9=2.",
      },

      {
        id: "final-q13",
        question: "Under suitable conditions, what does the Central Limit Theorem say as n increases?",
        options: [
          "The original population must become normal",
          "The sampling distribution of the sample mean approaches a normal distribution",
          "Selection bias disappears",
          "Every sample mean equals μ",
        ],
        correctIndex: 1,
        explanation: "The theorem concerns the repeated-sample distribution of the mean, not transformation of the original population.",
      },

      {
        id: "final-q14",
        question: "A 95% confidence interval for a mean is 42 to 50. Which statement best reflects the frequentist interpretation used in this course?",
        options: [
          "There is exactly a 95% probability that the fixed mean lies between 42 and 50",
          "The interval comes from a procedure that captures the true mean about 95% of the time in repeated sampling under the assumptions",
          "95% of observations lie between 42 and 50",
          "The population mean varies between samples",
        ],
        correctIndex: 1,
        explanation: "Confidence is a long-run property of the interval procedure.",
      },

      {
        id: "final-q15",
        question: "If the confidence level is raised from 95% to 99% while the data stay the same, what generally happens?",
        options: [
          "The interval becomes wider",
          "The interval becomes narrower",
          "The point estimate doubles",
          "The standard error becomes zero",
        ],
        correctIndex: 0,
        explanation: "A larger critical value is required for greater long-run coverage, widening the interval.",
      },

      {
        id: "final-q16",
        question: "Study A estimates an effect of 5 with SE=1. Study B estimates the same effect of 5 with SE=5. Which study has the larger standardised discrepancy from a null effect of zero?",
        options: [
          "Study A",
          "Study B",
          "They are identical",
          "It cannot be determined because the effect estimates are equal",
        ],
        correctIndex: 0,
        explanation: "Study A has statistic 5/1=5, whereas Study B has 5/5=1.",
      },

      {
        id: "final-q17",
        question: "A test yields p=0.004. Which statement is correct?",
        options: [
          "There is a 0.4% probability that H₀ is true",
          "Results at least as extreme as observed would be uncommon under H₀",
          "The effect is necessarily large",
          "Causation has been proved",
        ],
        correctIndex: 1,
        explanation: "The p-value is a probability calculated under the null model; it is not the probability that H₀ is true or an effect-size measure.",
      },

      {
        id: "final-q18",
        question: "A very large study reports a tiny effect with p<0.001. What should be assessed before calling the result important?",
        options: [
          "Only whether p can be made even smaller",
          "Effect size, uncertainty and practical or scientific context",
          "Only whether the mean is positive",
          "Nothing else",
        ],
        correctIndex: 1,
        explanation: "Statistical significance can arise for tiny effects in large samples, so magnitude and substantive importance must also be examined.",
      },

      {
        id: "final-q19",
        question: "An observational study reports a strong association with a narrow confidence interval. Which statement is most responsible?",
        options: [
          "The exposure definitely causes the outcome",
          "The association is precisely estimated, but causal interpretation still depends on design, confounding and other assumptions",
          "A narrow interval removes all bias",
          "The p-value alone determines causality",
        ],
        correctIndex: 1,
        explanation: "Precision does not transform an observational association into a causal effect; design and causal assumptions remain essential.",
      },

      {
        id: "final-q20",
        question: "Which sequence best represents responsible statistical reasoning across the whole course?",
        options: [
          "Find a small p-value → make the strongest claim possible",
          "Question → design and data → describe variation → estimate → quantify uncertainty → evaluate evidence → conclude within limitations",
          "Calculate the mean → ignore study design → report significance",
          "Collect the largest possible sample → assume bias is gone",
        ],
        correctIndex: 1,
        explanation: "Good statistical reasoning links the research question, design, data, variation, estimation, uncertainty, evidence and limitations.",
      }

    ],
  }

];
