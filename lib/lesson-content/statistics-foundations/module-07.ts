import type {
  LessonContent,
} from "../types";


export const statisticsFoundationsModule07:
  LessonContent[] = [

  /* ========================================================================
     LESSON 24
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m7-l1-hypothesis-testing",

    title:
      "Claims, hypotheses and the null model",

    subtitle:
      "Hypothesis testing asks whether the observed data would be surprising under a specific benchmark model.",

    estimatedMinutes:
      40,

    objectives: [
      "Explain the purpose of a statistical hypothesis test.",
      "Distinguish null and alternative hypotheses.",
      "Describe a null model.",
      "Interpret a test statistic as a measure of discrepancy from the null model.",
      "Distinguish statistical evidence from mathematical proof.",
    ],

    content: [

      {
        type:
          "paragraph",

        text:
          "Statistical inference often begins with a claim about a population. We observe sample data and ask whether those data are reasonably compatible with that claim.",
      },


      {
        type:
          "heading",

        text:
          "The null hypothesis",
      },


      {
        type:
          "paragraph",

        text:
          "The null hypothesis specifies a benchmark model against which the observed data are compared. It commonly represents no difference, no association or a particular parameter value.",
      },


      {
        type:
          "callout",

        title:
          "Example",

        text:
          "H₀: μ = 50 states that the population mean equals 50 under the null model.",
      },


      {
        type:
          "heading",

        text:
          "The alternative hypothesis",
      },


      {
        type:
          "paragraph",

        text:
          "The alternative hypothesis describes departures from the null model that are relevant to the research question.",
      },


      {
        type:
          "bullets",

        items: [
          "Two-sided alternative: μ ≠ 50.",
          "Upper one-sided alternative: μ > 50.",
          "Lower one-sided alternative: μ < 50.",
        ],
      },


      {
        type:
          "paragraph",

        text:
          "The direction of the alternative should follow from the scientific question and should normally be specified before examining the results.",
      },


      {
        type:
          "heading",

        text:
          "What does the test statistic measure?",
      },


      {
        type:
          "paragraph",

        text:
          "A test statistic measures how far the observed data are from what the null model predicts, relative to the amount of variation we would expect.",
      },


      {
        type:
          "callout",

        title:
          "Core idea",

        text:
          "Difference alone is not enough. Statistical evidence depends on the size of the difference relative to its uncertainty.",
      },


      {
        type:
          "heading",

        text:
          "Standardising the discrepancy",
      },


      {
        type:
          "paragraph",

        text:
          "Many test statistics compare an observed estimate with its null value and divide the difference by a standard error.",
      },


      {
        type:
          "callout",

        title:
          "Conceptual form",

        text:
          "Test statistic = observed difference from null ÷ standard error.",
      },


      {
        type:
          "paragraph",

        text:
          "A difference of 5 units may be highly unusual when the standard error is 1, but quite ordinary when the standard error is 20.",
      },


      {
        type:
          "heading",

        text:
          "Evidence, not proof",
      },


      {
        type:
          "paragraph",

        text:
          "A hypothesis test does not mathematically prove that a scientific hypothesis is true or false. It measures how compatible the observed data are with a specified statistical model.",
      },


      {
        type:
          "callout",

        title:
          "Statistical language",

        text:
          "Avoid saying that a hypothesis test proves the null or proves the alternative.",
      },

    ],

    workedExamples: [

      {
        title:
          "Testing an average waiting time",

        question:
          "A hospital claims its mean waiting time is 30 minutes. A sample produces a mean of 35 minutes. Is the five-minute difference enough to reject the claim?",

        steps: [
          "State the null hypothesis: the population mean waiting time is 30 minutes.",
          "The observed sample mean is five minutes higher.",
          "However, we also need to know how variable sample means are under the null model.",
          "A five-minute difference may be large or small relative to its standard error.",
          "Therefore the observed difference alone is not sufficient for a statistical decision.",
        ],

        answer:
          "No decision should be made from the five-minute difference alone. The difference must be evaluated relative to sampling uncertainty.",
      },


      {
        title:
          "Same difference, different evidence",

        question:
          "Study A estimates a difference of 4 with SE = 1. Study B estimates a difference of 4 with SE = 8. Which result is more discrepant from a null difference of zero?",

        steps: [
          "Study A has standardised discrepancy 4/1 = 4.",
          "Study B has standardised discrepancy 4/8 = 0.5.",
          "The numerical effect estimate is identical.",
          "But Study A estimates that effect much more precisely.",
        ],

        answer:
          "Study A provides much stronger statistical evidence against a null difference of zero.",
      },

    ],

    exercises: [

      {
        question:
          "Write a null and two-sided alternative hypothesis for testing whether a population mean differs from 100.",

        answer:
          "H₀: μ = 100. H₁: μ ≠ 100.",
      },


      {
        question:
          "Why is a raw difference from the null value not enough to judge statistical evidence?",

        answer:
          "The difference must be considered relative to sampling variability or standard error.",
      },


      {
        question:
          "What does a test statistic generally quantify?",

        answer:
          "How discrepant the observed data are from the null model relative to expected random variation.",
      },

    ],

    quiz: [

      {
        question:
          "What is the role of the null hypothesis?",

        options: [
          "To guarantee that no effect exists",
          "To provide a benchmark statistical model",
          "To describe every possible result",
          "To calculate the sample size only",
        ],

        correctIndex:
          1,

        explanation:
          "The null hypothesis specifies the benchmark model against which observed data are compared.",
      },


      {
        question:
          "What does a test statistic usually measure?",

        options: [
          "Discrepancy from the null relative to uncertainty",
          "Only sample size",
          "The probability that H₀ is true",
          "The population size",
        ],

        correctIndex:
          0,

        explanation:
          "A test statistic standardises the discrepancy between observed data and the null model.",
      },


      {
        question:
          "Can a statistical hypothesis test prove that H₀ is false?",

        options: [
          "Always",
          "No; it provides evidence relative to a model",
          "Only when p = 0.05",
          "Only with large samples",
        ],

        correctIndex:
          1,

        explanation:
          "Statistical testing measures compatibility with a model rather than providing logical proof.",
      },

    ],

    summary: [
      "Hypothesis testing compares observed data with a benchmark null model.",
      "The null and alternative hypotheses represent competing statistical statements.",
      "The test statistic measures discrepancy from the null relative to expected sampling variation.",
      "The same observed difference can represent different levels of evidence depending on precision.",
      "Hypothesis testing provides statistical evidence rather than mathematical proof.",
    ],

    nextStep:
      "Next, we translate the test statistic into a p-value and examine what statistical significance does—and does not—mean.",
  },


  /* ========================================================================
     LESSON 25
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m7-l2-hypothesis-testing",

    title:
      "p-values and statistical significance",

    subtitle:
      "A p-value asks how unusual results at least this extreme would be if the null model were true.",

    estimatedMinutes:
      45,

    objectives: [
      "Define a p-value conceptually.",
      "Interpret statistical significance.",
      "Explain the role of the significance level alpha.",
      "Recognise common p-value misconceptions.",
      "Explain Type I error.",
      "Distinguish statistical significance from practical importance.",
    ],

    content: [

      {
        type:
          "heading",

        text:
          "The p-value",
      },


      {
        type:
          "paragraph",

        text:
          "Once we have measured how discrepant the observed data are from the null model, we ask how often a discrepancy at least this extreme would arise if the null model were true.",
      },


      {
        type:
          "callout",

        title:
          "p-value",

        text:
          "A p-value is the probability, under the null model, of obtaining a test statistic at least as extreme as the one observed.",
      },


      {
        type:
          "heading",

        text:
          "Small p-values",
      },


      {
        type:
          "paragraph",

        text:
          "A small p-value indicates that the observed result would be relatively unusual under the null model. This is interpreted as evidence against that model.",
      },


      {
        type:
          "heading",

        text:
          "Large p-values",
      },


      {
        type:
          "paragraph",

        text:
          "A large p-value means that the observed data are not especially unusual under the null model. It does not establish that the null hypothesis is true.",
      },


      {
        type:
          "callout",

        title:
          "Very important",

        text:
          "Failure to reject H₀ is not the same as proving H₀.",
      },


      {
        type:
          "heading",

        text:
          "Significance level",
      },


      {
        type:
          "paragraph",

        text:
          "Before analysing the data, researchers may choose a significance level such as α = 0.05. If the p-value falls below α, the result is conventionally described as statistically significant at that level.",
      },


      {
        type:
          "heading",

        text:
          "Type I error",
      },


      {
        type:
          "paragraph",

        text:
          "A Type I error occurs when a true null hypothesis is rejected. The significance threshold controls the long-run frequency of this type of error under the assumptions of the test.",
      },


      {
        type:
          "callout",

        title:
          "At α = 0.05",

        text:
          "Under repeated valid testing when the null hypothesis is true, approximately 5% of tests may cross the significance threshold by chance.",
      },


      {
        type:
          "heading",

        text:
          "What a p-value is not",
      },


      {
        type:
          "bullets",

        items: [
          "It is not the probability that H₀ is true.",
          "It is not the probability that the result happened 'by chance'.",
          "It is not the size of the effect.",
          "It is not the probability that the study will replicate.",
          "A small p-value does not prove causation.",
        ],
      },


      {
        type:
          "heading",

        text:
          "Statistical significance versus practical importance",
      },


      {
        type:
          "paragraph",

        text:
          "With a very large sample, even a tiny effect can produce a small p-value. Conversely, a meaningful effect estimated from a small noisy sample may fail to reach a conventional significance threshold.",
      },


      {
        type:
          "callout",

        title:
          "Always ask",

        text:
          "How large is the estimated effect, how uncertain is it, and does the size matter in the real-world context?",
      },


      {
        type:
          "hypothesis-test-simulator",

        title:
          "Hypothesis Testing Simulator",

        description:
          "Change the null mean, observed mean, variability, sample size and significance threshold to see how the test statistic and p-value respond.",
      },


      {
        type:
          "heading",

        text:
          "What to explore",
      },


      {
        type:
          "bullets",

        items: [
          "Keep the observed difference fixed and increase sample size.",
          "Keep sample size fixed and increase the observed difference.",
          "Increase the population standard deviation.",
          "Compare α = 0.10, 0.05 and 0.01.",
          "Simulate samples under H₀ and notice that some random results can look surprisingly extreme.",
        ],
      },

    ],

    workedExamples: [

      {
        title:
          "Interpreting p = 0.03",

        question:
          "A test gives p = 0.03. What does this mean?",

        steps: [
          "Assume the null model is true for the calculation.",
          "Consider results at least as extreme as the one observed.",
          "Under the null model, such results would occur with probability approximately 0.03.",
          "Because 0.03 is below 0.05, the result would conventionally be called statistically significant at the 5% level.",
        ],

        answer:
          "The result is relatively unusual under the null model. It does not mean there is a 3% probability that the null hypothesis is true.",
      },


      {
        title:
          "Tiny effect, tiny p-value",

        question:
          "A study with one million participants estimates an average difference of 0.1 units with p < 0.001. What additional question should we ask?",

        steps: [
          "The p-value indicates incompatibility with a precise null model.",
          "The sample is extremely large, giving high precision.",
          "The estimated difference is only 0.1 units.",
          "We therefore need to ask whether a difference of 0.1 is scientifically or practically meaningful.",
        ],

        answer:
          "We should examine effect size and real-world importance rather than relying on statistical significance alone.",
      },

    ],

    exercises: [

      {
        question:
          "A test produces p = 0.20 at α = 0.05. What is the conventional statistical decision?",

        answer:
          "Do not reject the null hypothesis at the 5% significance level.",
      },


      {
        question:
          "Does p = 0.20 mean there is a 20% probability that H₀ is true?",

        answer:
          "No. The p-value is calculated assuming the null model and does not directly provide the probability that the null hypothesis is true.",
      },


      {
        question:
          "Why can a very large study make a very small effect statistically significant?",

        answer:
          "Large samples reduce standard errors, so even small differences can become large relative to their uncertainty.",
      },

    ],

    quiz: [

      {
        question:
          "Which is the best interpretation of a p-value?",

        options: [
          "Probability that H₀ is true",
          "Probability under H₀ of a result at least as extreme as observed",
          "Size of the effect",
          "Probability that the study is unbiased",
        ],

        correctIndex:
          1,

        explanation:
          "The p-value is defined relative to the null model and extremeness of the observed test statistic.",
      },


      {
        question:
          "If p = 0.08 and α = 0.05, what is the conventional decision?",

        options: [
          "Reject H₀",
          "Do not reject H₀",
          "Prove H₀",
          "Set p to zero",
        ],

        correctIndex:
          1,

        explanation:
          "The p-value does not cross the pre-specified 0.05 threshold.",
      },


      {
        question:
          "What is a Type I error?",

        options: [
          "Rejecting a true null hypothesis",
          "Always accepting H₀",
          "Calculating a mean incorrectly",
          "Using a large sample",
        ],

        correctIndex:
          0,

        explanation:
          "Type I error is a false-positive rejection of a true null hypothesis.",
      },


      {
        question:
          "Does statistical significance imply practical importance?",

        options: [
          "Always",
          "No",
          "Only when n > 100",
          "Only when p = 0.05 exactly",
        ],

        correctIndex:
          1,

        explanation:
          "Statistical significance concerns evidence relative to uncertainty, not the magnitude or practical importance of an effect.",
      },

    ],

    summary: [
      "A p-value measures how unusual the observed result is under the null model.",
      "Small p-values provide evidence against the specified null model.",
      "A large p-value does not prove that the null hypothesis is true.",
      "Statistical significance compares the p-value with a pre-specified threshold such as α = 0.05.",
      "Type I error is rejection of a true null hypothesis.",
      "A p-value is not an effect size and does not measure practical importance.",
      "Statistical significance can depend strongly on sample size.",
    ],

    nextStep:
      "The final lesson combines everything in the course: study design, descriptive statistics, uncertainty, hypothesis testing and responsible interpretation.",
  },


  /* ========================================================================
     LESSON 26
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m7-l3-hypothesis-testing",

    title:
      "From data to a responsible conclusion",

    subtitle:
      "Good statistics connects the research question, study design, data, uncertainty and evidence into one defensible conclusion.",

    estimatedMinutes:
      50,

    objectives: [
      "Integrate the complete statistical investigation process.",
      "Interpret an effect estimate alongside its uncertainty.",
      "Use confidence intervals and p-values together.",
      "Distinguish association from causation.",
      "Recognise limitations that affect statistical conclusions.",
      "Communicate statistical results responsibly.",
    ],

    content: [

      {
        type:
          "paragraph",

        text:
          "The purpose of statistics is not to produce a p-value, calculate a mean or draw a graph. Those are tools. The purpose is to use data to answer questions while respecting variation, uncertainty and the limitations of the evidence.",
      },


      {
        type:
          "heading",

        text:
          "Return to the research question",
      },


      {
        type:
          "paragraph",

        text:
          "Every analysis should begin and end with the original question. A statistically correct calculation can still be irrelevant if it does not address the scientific or practical objective.",
      },


      {
        type:
          "heading",

        text:
          "Understand the population and sample",
      },


      {
        type:
          "paragraph",

        text:
          "Before generalising a result, identify who or what was studied and whether the observed sample can reasonably represent the intended population.",
      },


      {
        type:
          "heading",

        text:
          "Understand the variables",
      },


      {
        type:
          "paragraph",

        text:
          "Identify variable types, measurement quality, units and how important concepts were operationalised.",
      },


      {
        type:
          "heading",

        text:
          "Look at the data",
      },


      {
        type:
          "paragraph",

        text:
          "Graphs and descriptive statistics reveal the structure of the observed data: centre, variation, skewness, outliers and group differences.",
      },


      {
        type:
          "callout",

        title:
          "Do not skip exploration",

        text:
          "Inferential calculations should not replace understanding the observed data.",
      },


      {
        type:
          "heading",

        text:
          "Estimate the effect",
      },


      {
        type:
          "paragraph",

        text:
          "Whenever possible, report the estimated magnitude of the difference, association or effect. Statistical significance alone does not tell us whether the effect is important.",
      },


      {
        type:
          "heading",

        text:
          "Quantify uncertainty",
      },


      {
        type:
          "paragraph",

        text:
          "Confidence intervals communicate the precision of an estimate and show a range of parameter values compatible with the data under the model.",
      },


      {
        type:
          "heading",

        text:
          "Evaluate statistical evidence",
      },


      {
        type:
          "paragraph",

        text:
          "A hypothesis test evaluates compatibility with a specified null model. A p-value can be one component of the evidence but should not become the entire conclusion.",
      },


      {
        type:
          "heading",

        text:
          "Association versus causation",
      },


      {
        type:
          "paragraph",

        text:
          "An association between variables does not automatically establish that changing one variable would cause a change in another.",
      },


      {
        type:
          "paragraph",

        text:
          "Study design, confounding, selection, measurement and assumptions all affect whether causal interpretation is defensible.",
      },


      {
        type:
          "heading",

        text:
          "Statistical significance versus importance",
      },


      {
        type:
          "paragraph",

        text:
          "A small p-value may accompany a trivial effect when the sample is very large. A scientifically important estimate may also remain uncertain in a small study.",
      },


      {
        type:
          "callout",

        title:
          "Report together",

        text:
          "Effect size + confidence interval + relevant p-value + study limitations + context.",
      },


      {
        type:
          "heading",

        text:
          "A complete statistical workflow",
      },


      {
        type:
          "bullets",

        items: [
          "1. Define the research question.",
          "2. Identify the target population.",
          "3. Understand the sample and sampling process.",
          "4. Identify observational units and variables.",
          "5. Examine study design and potential bias.",
          "6. Visualise and describe the data.",
          "7. Estimate the quantity or effect of interest.",
          "8. Quantify uncertainty.",
          "9. Evaluate statistical evidence.",
          "10. Interpret the result in context.",
          "11. Consider alternative explanations and limitations.",
          "12. Communicate only what the evidence supports.",
        ],
      },


      {
        type:
          "callout",

        title:
          "Final principle",

        text:
          "Good statistical reasoning is not about finding the strongest claim. It is about finding the strongest claim the evidence can genuinely support.",
      },

    ],

    workedExamples: [

      {
        title:
          "Social media and sleep",

        question:
          "Researchers survey 600 teenagers. Those reporting more than four hours of social-media use per day sleep 42 minutes less on average than those reporting less than two hours. The difference has a 95% confidence interval of 18 to 66 minutes and p = 0.002. What should the conclusion say?",

        steps: [
          "The estimated difference is 42 minutes, so effect size should be reported.",
          "The confidence interval indicates uncertainty around that estimate.",
          "The small p-value indicates the observed difference is difficult to reconcile with a null difference of zero under the testing model.",
          "However, the study is observational.",
          "Social-media behaviour may be associated with factors such as school workload, mental health, family environment or existing sleep problems.",
          "Therefore causal language should be avoided unless additional design and assumptions justify it.",
        ],

        answer:
          "Higher reported social-media use was associated with shorter sleep duration in this sample, with an estimated difference of 42 minutes. The statistical evidence against no difference was strong, but the observational design does not establish that social-media use caused the shorter sleep.",
      },


      {
        title:
          "A tiny but significant treatment effect",

        question:
          "A study of 50,000 people estimates that a treatment reduces symptom score by 0.2 points on a 100-point scale, with p < 0.001. What should be considered before calling the treatment important?",

        steps: [
          "The p-value indicates strong statistical evidence relative to the null model.",
          "The estimated effect is only 0.2 points on a 100-point scale.",
          "Large sample size makes very small effects estimable with high precision.",
          "Clinical or practical importance must therefore be assessed separately from statistical significance.",
        ],

        answer:
          "The result is statistically significant, but the estimated effect may be too small to be practically or clinically meaningful.",
      },

    ],

    exercises: [

      {
        question:
          "A study reports only p = 0.01 without an effect estimate. What important information is missing?",

        answer:
          "The magnitude and practical importance of the effect are unknown. An effect estimate and preferably a confidence interval should also be reported.",
      },


      {
        question:
          "Why should limitations be discussed even when a result is highly statistically significant?",

        answer:
          "Statistical significance does not remove bias, confounding, measurement error, model limitations or problems with generalisability.",
      },


      {
        question:
          "A confidence interval is very narrow but the sample was strongly biased. Is the conclusion necessarily trustworthy?",

        answer:
          "No. The interval may show high precision around a systematically biased estimate.",
      },


      {
        question:
          "What information should ideally accompany a p-value?",

        answer:
          "The estimated effect, confidence interval or other uncertainty measure, study design, assumptions, limitations and substantive context.",
      },

    ],

    quiz: [

      {
        question:
          "What should normally be reported alongside statistical significance?",

        options: [
          "Only sample size",
          "Effect magnitude and uncertainty",
          "Only the largest observation",
          "Nothing else",
        ],

        correctIndex:
          1,

        explanation:
          "Interpretation requires understanding both the estimated effect and its uncertainty.",
      },


      {
        question:
          "Which statement about observational associations is most appropriate?",

        options: [
          "They always prove causation",
          "They may be affected by confounding and other alternative explanations",
          "They contain no useful information",
          "They never require uncertainty estimates",
        ],

        correctIndex:
          1,

        explanation:
          "Observational studies can provide important evidence, but causal interpretation requires attention to confounding and design.",
      },


      {
        question:
          "A p-value of 0.001 means what about effect size?",

        options: [
          "The effect must be large",
          "The effect must be practically important",
          "It does not by itself tell us the effect magnitude",
          "The effect is exactly 0.001 units",
        ],

        correctIndex:
          2,

        explanation:
          "The p-value measures evidence relative to a null model, not effect size.",
      },


      {
        question:
          "Which is the strongest statistical conclusion?",

        options: [
          "The one with the most dramatic wording",
          "The one that matches the study design, effect estimate, uncertainty and limitations",
          "The one with the smallest p-value regardless of design",
          "The one that ignores conflicting evidence",
        ],

        correctIndex:
          1,

        explanation:
          "Responsible conclusions should accurately reflect what the data and study design can support.",
      },


      {
        question:
          "What is the central purpose of statistical analysis?",

        options: [
          "To produce p-values",
          "To guarantee certainty",
          "To learn from data while accounting for variation and uncertainty",
          "To remove the need for scientific reasoning",
        ],

        correctIndex:
          2,

        explanation:
          "Statistical methods support disciplined learning from data under uncertainty.",
      },

    ],

    summary: [
      "Statistical analysis should remain connected to the original research question.",
      "Study design determines what kinds of conclusions may be justified.",
      "Descriptive analysis helps us understand the observed data before inference.",
      "Effect estimates communicate magnitude; confidence intervals communicate uncertainty.",
      "p-values measure evidence relative to a specified null model and should not be interpreted alone.",
      "Statistical significance is different from scientific or practical importance.",
      "Association should not automatically be interpreted as causation.",
      "Bias, confounding, measurement and model assumptions remain important regardless of statistical significance.",
      "Responsible communication states the strongest conclusion genuinely supported by the evidence.",
    ],

    nextStep:
      "You have completed Statistics Foundations. The next step is to apply these ideas to a complete dataset and continue into more advanced statistical modelling.",
  },

];