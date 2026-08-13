import type {
  LessonContent,
} from "../types";


export const statisticsFoundationsModule03:
  LessonContent[] = [

  /* ========================================================================
     LESSON 09
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m3-l1-probability-essentials",

    title:
      "Probability, outcomes and events",

    subtitle:
      "Probability gives us a language for describing uncertainty.",

    estimatedMinutes:
      30,


    objectives: [
      "Explain probability as a numerical measure of uncertainty.",
      "Define an outcome, sample space and event.",
      "Interpret probabilities between 0 and 1.",
      "Distinguish theoretical probability from empirical probability.",
      "Calculate probabilities for simple equally likely outcomes.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Statistics deals with variation and uncertainty. Probability gives us a mathematical language for describing that uncertainty.",
      },


      {
        type:
          "heading",

        text:
          "The probability scale",
      },


      {
        type:
          "paragraph",

        text:
          "A probability lies between 0 and 1. A probability of 0 represents an impossible event, while a probability of 1 represents an event that is certain under the stated conditions.",
      },


      {
        type:
          "bullets",

        items: [
          "P(A) = 0 means event A is impossible.",
          "P(A) = 1 means event A is certain.",
          "P(A) = 0.5 means the event has probability one-half.",
          "Probabilities can also be expressed as fractions or percentages.",
        ],
      },


      {
        type:
          "callout",

        title:
          "Probability",

        text:
          "Probability measures how likely an event is under a specified model or set of conditions.",
      },


      {
        type:
          "heading",

        text:
          "Random experiments",
      },


      {
        type:
          "paragraph",

        text:
          "A random experiment is a process whose exact outcome is uncertain before it occurs, even though we may understand the possible outcomes.",
      },


      {
        type:
          "paragraph",

        text:
          "Examples include rolling a die, selecting a person at random from a population or observing whether a randomly chosen patient responds to a treatment.",
      },


      {
        type:
          "heading",

        text:
          "Outcomes and sample spaces",
      },


      {
        type:
          "paragraph",

        text:
          "An outcome is one possible result of the experiment. The sample space is the set of all possible outcomes.",
      },


      {
        type:
          "callout",

        title:
          "Example",

        text:
          "For one roll of a standard six-sided die, the sample space is {1, 2, 3, 4, 5, 6}.",
      },


      {
        type:
          "heading",

        text:
          "Events",
      },


      {
        type:
          "paragraph",

        text:
          "An event is a collection of one or more outcomes. For a die roll, the event 'roll an even number' contains the outcomes {2, 4, 6}.",
      },


      {
        type:
          "paragraph",

        text:
          "If all six outcomes are equally likely, the probability of an even result is 3/6 = 1/2.",
      },


      {
        type:
          "heading",

        text:
          "Theoretical and empirical probability",
      },


      {
        type:
          "paragraph",

        text:
          "Theoretical probability comes from a mathematical model. Empirical probability is estimated from observed repetitions of an experiment.",
      },


      {
        type:
          "callout",

        title:
          "Long-run idea",

        text:
          "If a random experiment is repeated many times under stable conditions, the observed relative frequency often becomes increasingly stable around the underlying probability.",
      },

    ],


    workedExamples: [

      {
        title:
          "Rolling a die",

        question:
          "What is the probability of rolling a number greater than 4 on a fair six-sided die?",

        steps: [
          "The sample space is {1, 2, 3, 4, 5, 6}.",
          "The event greater than 4 contains {5, 6}.",
          "There are 2 favourable outcomes among 6 equally likely outcomes.",
          "Therefore the probability is 2/6 = 1/3.",
        ],

        answer:
          "P(number greater than 4) = 1/3.",
      },


      {
        title:
          "Empirical probability",

        question:
          "A basketball player makes 72 of 100 free throws. What is the empirical probability of a successful free throw based on these observations?",

        steps: [
          "Count the successful outcomes: 72.",
          "Count the total attempts: 100.",
          "Divide successes by attempts.",
        ],

        answer:
          "The empirical probability is 72/100 = 0.72, or 72%.",
      },

    ],


    exercises: [

      {
        question:
          "For a fair six-sided die, find P(rolling a 3).",

        answer:
          "There is one favourable outcome among six equally likely outcomes, so P(3) = 1/6.",
      },


      {
        question:
          "For a fair six-sided die, find P(rolling an odd number).",

        answer:
          "The odd outcomes are {1, 3, 5}, so P(odd) = 3/6 = 1/2.",
      },


      {
        question:
          "A machine produced 12 defective items among 400 inspected items. Find the empirical defective proportion.",

        answer:
          "12/400 = 0.03, or 3%.",
      },

    ],


    quiz: [

      {
        question:
          "What is a sample space?",

        options: [
          "Only the most likely outcome",
          "The set of all possible outcomes",
          "The observed mean",
          "A sample from a population",
        ],

        correctIndex:
          1,

        explanation:
          "The sample space contains every possible outcome of the random experiment.",
      },


      {
        question:
          "What does P(A) = 0 mean?",

        options: [
          "A is certain",
          "A is impossible under the model",
          "A occurs half the time",
          "The probability is unknown",
        ],

        correctIndex:
          1,

        explanation:
          "A probability of zero represents an impossible event under the stated model.",
      },


      {
        question:
          "Which is an empirical probability?",

        options: [
          "A fair coin has probability 0.5 of heads",
          "38 of 50 observed customers paid by card",
          "A fair die has six equally likely outcomes",
          "The probability of certainty is 1",
        ],

        correctIndex:
          1,

        explanation:
          "The probability is being estimated from observed data.",
      },

    ],


    summary: [
      "Probability describes uncertainty using values between 0 and 1.",
      "A random experiment has an uncertain outcome.",
      "An outcome is one possible result, while the sample space contains all possible results.",
      "An event is a collection of outcomes.",
      "Theoretical probabilities come from models; empirical probabilities come from observed frequencies.",
    ],


    nextStep:
      "Next, we learn the basic rules for combining events and calculating more complicated probabilities.",
  },


  /* ========================================================================
     LESSON 10
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m3-l2-probability-essentials",

    title:
      "Rules of probability",

    subtitle:
      "Probability rules help us reason about events that overlap, combine or occur together.",

    estimatedMinutes:
      35,


    objectives: [
      "Use the complement rule.",
      "Understand unions and intersections of events.",
      "Recognise mutually exclusive events.",
      "Apply the addition rule.",
      "Apply the multiplication rule in simple settings.",
    ],


    content: [

      {
        type:
          "heading",

        text:
          "The complement rule",
      },


      {
        type:
          "paragraph",

        text:
          "The complement of event A consists of all outcomes in the sample space that are not in A.",
      },


      {
        type:
          "callout",

        title:
          "Complement rule",

        text:
          "P(not A) = 1 − P(A).",
      },


      {
        type:
          "paragraph",

        text:
          "If the probability of rain tomorrow is 0.30, then under the same model the probability of no rain is 1 − 0.30 = 0.70.",
      },


      {
        type:
          "heading",

        text:
          "Union: A or B",
      },


      {
        type:
          "paragraph",

        text:
          "The union of A and B contains outcomes belonging to A, B or both. It is written A ∪ B.",
      },


      {
        type:
          "heading",

        text:
          "Intersection: A and B",
      },


      {
        type:
          "paragraph",

        text:
          "The intersection of A and B contains outcomes that belong to both events. It is written A ∩ B.",
      },


      {
        type:
          "heading",

        text:
          "Mutually exclusive events",
      },


      {
        type:
          "paragraph",

        text:
          "Two events are mutually exclusive if they cannot occur simultaneously. Their intersection is empty.",
      },


      {
        type:
          "callout",

        title:
          "Example",

        text:
          "On one roll of a die, the events 'roll a 2' and 'roll a 5' are mutually exclusive. The events 'roll an even number' and 'roll a number greater than 3' are not, because 4 and 6 belong to both events.",
      },


      {
        type:
          "heading",

        text:
          "Addition rule",
      },


      {
        type:
          "paragraph",

        text:
          "When events overlap, simply adding their probabilities counts the overlap twice. We therefore subtract the intersection once.",
      },


      {
        type:
          "callout",

        title:
          "General addition rule",

        text:
          "P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
      },


      {
        type:
          "paragraph",

        text:
          "If A and B are mutually exclusive, P(A ∩ B) = 0, so the rule simplifies to P(A ∪ B) = P(A) + P(B).",
      },


      {
        type:
          "heading",

        text:
          "Multiplication",
      },


      {
        type:
          "paragraph",

        text:
          "When we want the probability that events occur together or sequentially, multiplication often appears. For independent events, the probability that both occur is the product of their individual probabilities.",
      },


      {
        type:
          "callout",

        title:
          "Independent multiplication",

        text:
          "If A and B are independent, P(A ∩ B) = P(A) × P(B).",
      },

    ],


    workedExamples: [

      {
        title:
          "At least one six",

        question:
          "A fair die is rolled once. What is the probability of not rolling a six?",

        steps: [
          "P(6) = 1/6.",
          "Use the complement rule.",
          "P(not 6) = 1 − 1/6.",
        ],

        answer:
          "P(not 6) = 5/6.",
      },


      {
        title:
          "Two overlapping events",

        question:
          "On a fair die, let A = 'even number' and B = 'number greater than 3'. Find P(A ∪ B).",

        steps: [
          "A = {2, 4, 6}, so P(A) = 3/6.",
          "B = {4, 5, 6}, so P(B) = 3/6.",
          "A ∩ B = {4, 6}, so P(A ∩ B) = 2/6.",
          "Apply the addition rule: 3/6 + 3/6 − 2/6 = 4/6.",
        ],

        answer:
          "P(A ∪ B) = 4/6 = 2/3.",
      },

    ],


    exercises: [

      {
        question:
          "If P(A) = 0.37, find P(not A).",

        answer:
          "1 − 0.37 = 0.63.",
      },


      {
        question:
          "If mutually exclusive events A and B have probabilities 0.25 and 0.40, find P(A or B).",

        answer:
          "Because the events are mutually exclusive, P(A ∪ B) = 0.25 + 0.40 = 0.65.",
      },


      {
        question:
          "Two independent fair coin flips are performed. What is the probability of two heads?",

        answer:
          "P(HH) = 0.5 × 0.5 = 0.25.",
      },

    ],


    quiz: [

      {
        question:
          "What is the complement of event A?",

        options: [
          "The outcomes belonging to A",
          "All outcomes not belonging to A",
          "The intersection of A with itself",
          "Only impossible outcomes",
        ],

        correctIndex:
          1,

        explanation:
          "The complement contains every outcome in the sample space that is outside A.",
      },


      {
        question:
          "When are two events mutually exclusive?",

        options: [
          "When they always occur together",
          "When they cannot occur at the same time",
          "When both have probability 0.5",
          "When they are independent",
        ],

        correctIndex:
          1,

        explanation:
          "Mutually exclusive events have no common outcomes.",
      },


      {
        question:
          "Why does the general addition rule subtract P(A ∩ B)?",

        options: [
          "Because probabilities must be negative",
          "Because the overlap would otherwise be counted twice",
          "Because A and B must be independent",
          "Because intersections are impossible",
        ],

        correctIndex:
          1,

        explanation:
          "Adding P(A) and P(B) counts outcomes in both events twice, so the overlap is subtracted once.",
      },

    ],


    summary: [
      "The complement rule gives P(not A) = 1 − P(A).",
      "A ∪ B means A or B or both.",
      "A ∩ B means A and B.",
      "Mutually exclusive events cannot occur together.",
      "The general addition rule accounts for overlapping events.",
      "For independent events, joint probability is the product of individual probabilities.",
    ],


    nextStep:
      "Next, we examine conditional probability and the important distinction between independence and dependence.",
  },


  /* ========================================================================
     LESSON 11
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m3-l3-probability-essentials",

    title:
      "Conditional probability and independence",

    subtitle:
      "Probabilities often change when we learn new information.",

    estimatedMinutes:
      40,


    objectives: [
      "Interpret conditional probability.",
      "Calculate conditional probabilities from tables.",
      "Distinguish P(A | B) from P(B | A).",
      "Explain statistical independence.",
      "Determine whether simple events appear independent.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Probability changes when our information changes. Conditional probability asks about the probability of one event when we already know that another event has occurred.",
      },


      {
        type:
          "callout",

        title:
          "Conditional probability",

        text:
          "P(A | B) means the probability of event A given that event B has occurred.",
      },


      {
        type:
          "heading",

        text:
          "Restrict the sample space",
      },


      {
        type:
          "paragraph",

        text:
          "When we condition on B, we restrict attention to observations or outcomes for which B is true. We then ask what proportion of this reduced group also satisfies A.",
      },


      {
        type:
          "heading",

        text:
          "Direction matters",
      },


      {
        type:
          "paragraph",

        text:
          "P(A | B) and P(B | A) are generally different quantities. Reversing the condition changes the group on which the probability is based.",
      },


      {
        type:
          "callout",

        title:
          "Important distinction",

        text:
          "The probability of a positive test given disease is not the same as the probability of disease given a positive test.",
      },


      {
        type:
          "heading",

        text:
          "Independence",
      },


      {
        type:
          "paragraph",

        text:
          "Events A and B are independent when knowing whether B occurred does not change the probability of A.",
      },


      {
        type:
          "callout",

        title:
          "Independence",

        text:
          "If A and B are independent, then P(A | B) = P(A).",
      },


      {
        type:
          "paragraph",

        text:
          "For independent events, the joint probability is P(A ∩ B) = P(A)P(B).",
      },


      {
        type:
          "heading",

        text:
          "Independence is not the same as mutual exclusivity",
      },


      {
        type:
          "paragraph",

        text:
          "Mutually exclusive events cannot occur together. Independent events can occur together, but occurrence of one does not alter the probability of the other.",
      },


      {
        type:
          "callout",

        title:
          "Common misconception",

        text:
          "Two events with positive probability cannot be both mutually exclusive and independent.",
      },

    ],


    workedExamples: [

      {
        title:
          "Conditional probability from a table",

        question:
          "Among 200 students, 120 study mathematics. Of those 120, 72 passed an exam. What is P(pass | mathematics)?",

        steps: [
          "Condition on students studying mathematics.",
          "This restricts the denominator to 120 students.",
          "Among those 120 students, 72 passed.",
          "Calculate 72/120.",
        ],

        answer:
          "P(pass | mathematics) = 0.60.",
      },


      {
        title:
          "Testing independence",

        question:
          "Suppose P(A) = 0.40 and P(A | B) = 0.40. What does this suggest?",

        steps: [
          "Compare the unconditional probability P(A) with the conditional probability P(A | B).",
          "They are equal.",
          "Knowing B has not changed the probability of A.",
        ],

        answer:
          "This is consistent with A and B being independent.",
      },

    ],


    exercises: [

      {
        question:
          "Of 80 people who exercise regularly, 52 report good sleep. Find P(good sleep | regular exercise).",

        answer:
          "52/80 = 0.65.",
      },


      {
        question:
          "Explain why P(disease | positive test) is not automatically equal to P(positive test | disease).",

        answer:
          "The two probabilities use different conditioning groups. One considers people with positive tests; the other considers people who have the disease.",
      },


      {
        question:
          "If P(A) = 0.3 and P(B) = 0.4 and A and B are independent, find P(A ∩ B).",

        answer:
          "0.3 × 0.4 = 0.12.",
      },

    ],


    quiz: [

      {
        question:
          "What does P(A | B) mean?",

        options: [
          "Probability of A and B being impossible",
          "Probability of A given that B occurred",
          "Probability of B given that A occurred",
          "Probability of neither A nor B",
        ],

        correctIndex:
          1,

        explanation:
          "The vertical bar is read as 'given'.",
      },


      {
        question:
          "If A and B are independent, what must be true?",

        options: [
          "P(A | B) = 0",
          "P(A | B) = P(A)",
          "A and B cannot occur together",
          "P(A) = P(B)",
        ],

        correctIndex:
          1,

        explanation:
          "Independence means learning that B occurred does not change the probability of A.",
      },


      {
        question:
          "Which statement is correct?",

        options: [
          "Mutually exclusive always means independent",
          "Independent events cannot happen together",
          "Independence and mutual exclusivity are different ideas",
          "Conditional probabilities are always equal in both directions",
        ],

        correctIndex:
          2,

        explanation:
          "Mutual exclusivity concerns whether events can occur together; independence concerns whether one event changes the probability of another.",
      },

    ],


    summary: [
      "Conditional probability updates probability after additional information is known.",
      "P(A | B) restricts attention to cases where B is true.",
      "P(A | B) and P(B | A) are generally different.",
      "Independent events do not change one another's probabilities.",
      "For independent events, P(A ∩ B) = P(A)P(B).",
      "Independence is different from mutual exclusivity.",
    ],


    nextStep:
      "Next, we use probability trees and simulation to understand repeated random processes and long-run behaviour.",
  },


  /* ========================================================================
     LESSON 12
     ======================================================================== */

  {
    courseSlug:
      "statistics-foundations",

    lessonKey:
      "m3-l4-probability-essentials",

    title:
      "Probability through trees and simulation",

    subtitle:
      "Repeated random experiments reveal the long-run behaviour behind probability.",

    estimatedMinutes:
      40,


    objectives: [
      "Use probability trees for sequential events.",
      "Calculate probabilities along branches.",
      "Combine mutually exclusive paths.",
      "Explain simulation as a method for studying random processes.",
      "Describe the long-run behaviour of relative frequencies.",
    ],


    content: [

      {
        type:
          "heading",

        text:
          "Sequential events",
      },


      {
        type:
          "paragraph",

        text:
          "Many random processes contain several stages. A probability tree provides a structured way to represent the possible paths through those stages.",
      },


      {
        type:
          "heading",

        text:
          "Multiplying along a path",
      },


      {
        type:
          "paragraph",

        text:
          "To calculate the probability of following a complete path through a probability tree, multiply the probabilities along the branches.",
      },


      {
        type:
          "callout",

        title:
          "Tree rule",

        text:
          "Multiply probabilities along a path. Add probabilities across mutually exclusive paths that lead to the same event of interest.",
      },


      {
        type:
          "heading",

        text:
          "Simulation",
      },


      {
        type:
          "paragraph",

        text:
          "Simulation imitates a random process using repeated random trials. It can help us investigate probabilities that are difficult to derive analytically and can also build intuition about randomness.",
      },


      {
        type:
          "heading",

        text:
          "Short-run randomness",
      },


      {
        type:
          "paragraph",

        text:
          "A fair coin does not have to produce exactly five heads in ten flips. Random variation can produce large differences over short runs.",
      },


      {
        type:
          "callout",

        title:
          "Random does not mean evenly alternating",

        text:
          "A genuinely random sequence can contain runs, clusters and short-term imbalances.",
      },


      {
        type:
          "heading",

        text:
          "Long-run stability",
      },


      {
        type:
          "paragraph",

        text:
          "As the number of repeated independent trials increases, the observed relative frequency tends to stabilise around the theoretical probability.",
      },


      {
        type:
          "probability-simulator",

        title:
          "Probability Simulator",

        description:
          "Choose a theoretical probability and run repeated trials. Watch the experimental probability fluctuate at first and then become more stable as the number of trials increases.",
      },


      {
        type:
          "heading",

        text:
          "What the simulation does not say",
      },


      {
        type:
          "paragraph",

        text:
          "Long-run stability does not mean that every short sequence will look balanced or that an outcome becomes more likely simply because it has not occurred recently.",
      },


      {
        type:
          "callout",

        title:
          "Gambler's fallacy",

        text:
          "After several heads from independent fair coin flips, tails is not 'due'. The next flip still has probability 0.5 of tails.",
      },

    ],


    workedExamples: [

      {
        title:
          "Two coin flips",

        question:
          "A fair coin is flipped twice. What is the probability of exactly one head?",

        steps: [
          "The possible paths are HH, HT, TH and TT.",
          "Exactly one head occurs on HT or TH.",
          "Each path has probability 0.5 × 0.5 = 0.25.",
          "The two qualifying paths are mutually exclusive, so add them.",
        ],

        answer:
          "P(exactly one head) = 0.25 + 0.25 = 0.50.",
      },


      {
        title:
          "Why simulation varies",

        question:
          "A fair coin produces 7 heads in its first 10 flips. Does this suggest the probability of heads is 0.7?",

        steps: [
          "The observed relative frequency is 7/10 = 0.7.",
          "However, ten trials are a small number.",
          "Short random sequences often fluctuate considerably.",
          "More trials are required before the empirical proportion becomes stable.",
        ],

        answer:
          "The empirical proportion is 0.7 after 10 flips, but that short-run result is entirely compatible with an underlying probability of 0.5.",
      },

    ],


    exercises: [

      {
        question:
          "A fair coin is flipped twice. Find P(two heads).",

        answer:
          "0.5 × 0.5 = 0.25.",
      },


      {
        question:
          "Why might 20 coin flips produce an experimental probability quite different from 0.5?",

        answer:
          "Random variation can be substantial over a small number of trials. Relative frequency becomes more stable only over larger numbers of repetitions.",
      },


      {
        question:
          "A fair coin has produced heads five times consecutively. What is the probability that the next flip is tails?",

        answer:
          "0.5. Independent previous flips do not alter the probability of the next outcome.",
      },

    ],


    quiz: [

      {
        question:
          "How are probabilities combined along a complete path of a probability tree?",

        options: [
          "Add them",
          "Multiply them",
          "Subtract them",
          "Average them",
        ],

        correctIndex:
          1,

        explanation:
          "Joint sequential probabilities are obtained by multiplying the relevant branch probabilities.",
      },


      {
        question:
          "What usually happens to experimental relative frequency as the number of independent trials becomes very large?",

        options: [
          "It must become exactly zero",
          "It tends to stabilise around the theoretical probability",
          "It becomes completely unpredictable",
          "It alternates perfectly between outcomes",
        ],

        correctIndex:
          1,

        explanation:
          "Long-run relative frequencies tend to become increasingly stable around the underlying probability.",
      },


      {
        question:
          "A fair coin produces four heads in a row. What is P(head on the next flip)?",

        options: [
          "0",
          "0.25",
          "0.5",
          "1",
        ],

        correctIndex:
          2,

        explanation:
          "Independent coin flips do not remember previous results.",
      },


      {
        question:
          "What is simulation useful for?",

        options: [
          "Eliminating all uncertainty",
          "Imitating random processes through repeated trials",
          "Guaranteeing every sequence has the expected proportion",
          "Proving that probability models cannot fail",
        ],

        correctIndex:
          1,

        explanation:
          "Simulation uses repeated random trials to investigate random processes and probabilities.",
      },

    ],


    summary: [
      "Probability trees represent sequential random events.",
      "Multiply probabilities along a path and add mutually exclusive qualifying paths.",
      "Simulation imitates random processes through repeated trials.",
      "Short-run relative frequencies can fluctuate substantially.",
      "With many repetitions, empirical probabilities tend to stabilise around theoretical probabilities.",
      "Independent random events do not compensate for previous outcomes.",
    ],


    nextStep:
      "Module 4 introduces random variables and probability distributions, connecting individual random outcomes to mathematical models.",
  },

];