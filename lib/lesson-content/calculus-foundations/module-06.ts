import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   MODULE 06 — INTEGRALS
   ========================================================================== */

export const calculusFoundationsModule06:
  LessonContent[] = [

  {
    courseSlug: "calculus-foundations",
    lessonKey: "m6-l1-integrals",
    title: "Accumulation and area",
    subtitle: "Integration begins by adding many small contributions.",
    estimatedMinutes: 30,
    objectives: [
      "Explain integration as accumulation.",
      "Approximate area using rectangles.",
      "Interpret a definite integral as signed accumulation.",
      "Relate finer partitions to improved area approximations.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Derivatives analyse local change. Integrals address the complementary question: how do many small changes accumulate into a total? Area under a graph is the geometric model for this idea.",
      },
      {
        type: "heading",
        text: "Adding small pieces",
      },
      {
        type: "paragraph",
        text: "Suppose a rate r(t) changes over time. Over a short interval Δt, the accumulated amount is approximately r(t)Δt. Adding these contributions over many intervals approximates a total.",
      },
      {
        type: "riemann-sum-explorer",
        title: "Riemann Sum Explorer",
        description: "Approximate the area under f(x)=x² on [0,2]. Increase the number of rectangles and watch the estimate settle toward the exact integral 8/3.",
      },
      {
        type: "heading",
        text: "Riemann sums",
      },
      {
        type: "paragraph",
        text: "A Riemann sum divides an interval into subintervals, builds rectangles with chosen heights and adds their areas. As the rectangles become narrower, the approximation can approach a limiting value.",
      },
      {
        type: "callout",
        title: "Integral idea",
        text: "A definite integral is the limit of increasingly fine sums of small contributions.",
      },
      {
        type: "heading",
        text: "Signed area",
      },
      {
        type: "paragraph",
        text: "Area above the x-axis contributes positively; area below contributes negatively. A definite integral is signed accumulation, not always ordinary geometric area.",
      },
    ],
    workedExamples: [
      {
        title: "Constant rate",
        question: "A flow rate is 4 litres/min for 3 minutes. What accumulation occurs?",
        steps: [
          "For a constant rate, accumulation is rate × time.",
          "4×3=12.",
        ],
        answer: "12 litres accumulate.",
      },
      {
        title: "Rectangle estimate",
        question: "Approximate area under f(x)=x on [0,2] using two right-endpoint rectangles of width 1.",
        steps: [
          "Right endpoints are 1 and 2.",
          "Heights are 1 and 2.",
          "Area estimate=1·1+1·2=3.",
        ],
        answer: "The right-endpoint estimate is 3 square units.",
      },
    ],
    exercises: [
      {
        question: "Why do narrower rectangles usually improve a Riemann-sum approximation?",
        answer: "They capture local variation more closely.",
      },
      {
        question: "What sign does area below the x-axis contribute?",
        answer: "Negative.",
      },
      {
        question: "A rate is 6 units/hour for 2.5 hours. What accumulates if it is constant?",
        answer: "15 units.",
      },
    ],
    quiz: [
      {
        question: "A definite integral is best understood as...",
        options: [
          "a single tangent slope",
          "a limit of sums of small contributions",
          "an x-intercept",
          "a derivative value only",
        ],
        correctIndex: 1,
        explanation: "Definite integrals formalise accumulation via limiting sums.",
      },
      {
        question: "Area below the x-axis contributes...",
        options: [
          "positively",
          "negatively",
          "nothing",
          "undefined",
        ],
        correctIndex: 1,
        explanation: "Definite integrals use signed area.",
      },
      {
        question: "More equal-width rectangles over the same interval means each rectangle is...",
        options: [
          "wider",
          "narrower",
          "taller by definition",
          "negative",
        ],
        correctIndex: 1,
        explanation: "More partitions mean smaller widths.",
      },
    ],
    summary: [
      "Integration measures accumulation.",
      "Riemann sums add many small contributions.",
      "Finer partitions can improve approximation.",
      "Definite integrals are signed accumulations.",
    ],
    nextStep: "Next, we reverse differentiation and introduce antiderivatives.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m6-l2-integrals",
    title: "Antiderivatives and indefinite integrals",
    subtitle: "An antiderivative reverses differentiation, but includes a family of possible constants.",
    estimatedMinutes: 30,
    objectives: [
      "Define an antiderivative.",
      "Apply the reverse power rule.",
      "Explain the constant of integration.",
      "Check an antiderivative by differentiating.",
    ],
    content: [
      {
        type: "paragraph",
        text: "If differentiation asks what rate a function produces, antidifferentiation asks the reverse question: which function has this derivative?",
      },
      {
        type: "callout",
        title: "Antiderivative",
        text: "F is an antiderivative of f when F′(x)=f(x).",
      },
      {
        type: "heading",
        text: "Reverse power rule",
      },
      {
        type: "paragraph",
        text: "For n≠-1, an antiderivative of xⁿ is xⁿ⁺¹/(n+1). The exponent increases by one, then we divide by the new exponent.",
      },
      {
        type: "heading",
        text: "Why + C appears",
      },
      {
        type: "paragraph",
        text: "Differentiating any constant gives zero, so x², x²+5 and x²-100 all have derivative 2x. An indefinite integral therefore represents a family and includes +C.",
      },
      {
        type: "callout",
        title: "Always check",
        text: "Differentiate your proposed antiderivative. If you recover the original integrand, the result is correct.",
      },
    ],
    workedExamples: [
      {
        title: "Reverse power rule",
        question: "Find ∫3x² dx.",
        steps: [
          "An antiderivative of x² is x³/3.",
          "Multiply by 3.",
          "Add C.",
        ],
        answer: "x³+C.",
      },
      {
        title: "Term-by-term integration",
        question: "Find ∫(4x³-2x+5)dx.",
        steps: [
          "4x³ integrates to x⁴.",
          "-2x integrates to -x².",
          "5 integrates to 5x.",
          "Add C.",
        ],
        answer: "x⁴-x²+5x+C.",
      },
    ],
    exercises: [
      {
        question: "Find ∫6x⁵ dx.",
        answer: "x⁶+C.",
      },
      {
        question: "Why do indefinite integrals include C?",
        answer: "Because constants disappear under differentiation.",
      },
      {
        question: "Check that F(x)=x³+7 is an antiderivative of 3x².",
        answer: "F′(x)=3x².",
      },
    ],
    quiz: [
      {
        question: "What is an antiderivative of 2x?",
        options: [
          "x²+C",
          "2+C",
          "2x²+C",
          "1/x+C",
        ],
        correctIndex: 0,
        explanation: "d/dx(x²)=2x.",
      },
      {
        question: "Why is +C required?",
        options: [
          "To change units",
          "Because derivatives of constants are zero",
          "Because x must be positive",
          "To make every integral definite",
        ],
        correctIndex: 1,
        explanation: "All antiderivatives can differ by a constant.",
      },
      {
        question: "For n≠-1, integrating xⁿ generally...",
        options: [
          "decreases exponent by one",
          "increases exponent by one and divides by the new exponent",
          "leaves it unchanged",
          "always gives zero",
        ],
        correctIndex: 1,
        explanation: "This is the reverse power rule.",
      },
    ],
    summary: [
      "Antidifferentiation reverses differentiation.",
      "The reverse power rule increases the exponent and divides by the new exponent.",
      "Indefinite integrals include +C.",
      "Differentiation provides a direct check.",
    ],
    nextStep: "Next, we use antiderivatives to calculate definite integrals over intervals.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m6-l3-integrals",
    title: "Definite integrals",
    subtitle: "A definite integral produces a numerical accumulation over a specified interval.",
    estimatedMinutes: 30,
    objectives: [
      "Distinguish definite from indefinite integrals.",
      "Evaluate a definite integral using an antiderivative.",
      "Interpret bounds of integration.",
      "Connect integral values to signed accumulation.",
    ],
    content: [
      {
        type: "paragraph",
        text: "An indefinite integral gives a family of antiderivatives. A definite integral instead asks for the accumulated value between two specific input bounds.",
      },
      {
        type: "heading",
        text: "Bounds",
      },
      {
        type: "paragraph",
        text: "In ∫ₐᵇ f(x)dx, a is the lower bound and b the upper bound. The notation describes accumulation from a to b.",
      },
      {
        type: "heading",
        text: "Evaluate using an antiderivative",
      },
      {
        type: "paragraph",
        text: "If F′=f, then the definite integral from a to b is F(b)-F(a). This is part of the Fundamental Theorem of Calculus.",
      },
      {
        type: "callout",
        title: "Constants cancel",
        text: "Any constant C appears in both F(b) and F(a), so definite-integral answers do not need +C.",
      },
      {
        type: "heading",
        text: "Signed accumulation",
      },
      {
        type: "paragraph",
        text: "A definite integral can be negative when negative contributions dominate. Positive and negative regions can cancel.",
      },
    ],
    workedExamples: [
      {
        title: "Polynomial definite integral",
        question: "Evaluate ∫₀²3x² dx.",
        steps: [
          "An antiderivative is x³.",
          "At 2:8.",
          "At 0:0.",
          "Subtract.",
        ],
        answer: "8.",
      },
      {
        title: "Constant integral",
        question: "Evaluate ∫₁⁴5 dx.",
        steps: [
          "An antiderivative is 5x.",
          "F(4)=20.",
          "F(1)=5.",
          "Subtract.",
        ],
        answer: "15.",
      },
    ],
    exercises: [
      {
        question: "Evaluate ∫₀¹2x dx.",
        answer: "An antiderivative is x², giving 1.",
      },
      {
        question: "Why is +C omitted in a definite-integral final answer?",
        answer: "It cancels between upper and lower antiderivative values.",
      },
      {
        question: "Can a definite integral be negative?",
        answer: "Yes, because below-axis contributions are negative.",
      },
    ],
    quiz: [
      {
        question: "What do a and b represent in ∫ₐᵇf(x)dx?",
        options: [
          "Derivative orders",
          "Lower and upper bounds",
          "Function values only",
          "Constants of integration",
        ],
        correctIndex: 1,
        explanation: "They define the interval.",
      },
      {
        question: "If F′=f, ∫ₐᵇf equals...",
        options: [
          "F(a)+F(b)",
          "F(b)-F(a)",
          "f(b)-f(a)",
          "F′(b)",
        ],
        correctIndex: 1,
        explanation: "Upper minus lower antiderivative value.",
      },
      {
        question: "Why may a definite integral be zero while f is not zero everywhere?",
        options: [
          "Positive and negative areas can cancel",
          "Integrals ignore values",
          "Bounds are always equal",
          "Only derivatives matter",
        ],
        correctIndex: 0,
        explanation: "Signed accumulation permits cancellation.",
      },
    ],
    summary: [
      "A definite integral gives numerical accumulation over an interval.",
      "Bounds specify where accumulation starts and ends.",
      "Antiderivatives evaluate definite integrals via F(b)-F(a).",
      "Signed accumulation may be negative or zero.",
    ],
    nextStep: "Next, we practise basic integration techniques and distinguish signed area from total geometric area.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m6-l4-integrals",
    title: "Basic techniques and interpreting signed area",
    subtitle: "Integration combines algebraic technique with careful interpretation of accumulated value.",
    estimatedMinutes: 32,
    objectives: [
      "Integrate sums and constant multiples.",
      "Use simple reverse-chain-rule pattern recognition.",
      "Distinguish signed integral from total geometric area.",
      "Split an interval when a function changes sign.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Many basic integrals can be handled term by term, just as sums can be differentiated term by term. Interpretation becomes especially important when the integrand changes sign.",
      },
      {
        type: "heading",
        text: "Linearity",
      },
      {
        type: "paragraph",
        text: "Constants can be factored through an integral, and sums can be integrated term by term.",
      },
      {
        type: "heading",
        text: "Recognising an inner derivative",
      },
      {
        type: "paragraph",
        text: "Some integrals reverse the chain rule. For example, ∫2x(x²+1)³dx matches the inner derivative of x²+1.",
      },
      {
        type: "heading",
        text: "Signed area versus total area",
      },
      {
        type: "paragraph",
        text: "If a graph lies below the x-axis, its integral contribution is negative. If a problem asks for total geometric area, split at zeros and count each piece positively.",
      },
      {
        type: "callout",
        title: "Read the wording",
        text: "'Evaluate the integral' and 'find the total area' are not always the same task.",
      },
    ],
    workedExamples: [
      {
        title: "Term-by-term integration",
        question: "Evaluate ∫₀¹(3x²+2x)dx.",
        steps: [
          "An antiderivative is x³+x².",
          "At 1:2.",
          "At 0:0.",
        ],
        answer: "2.",
      },
      {
        title: "Signed versus total area",
        question: "A function has area 3 above the axis then area 2 below it. What are signed integral and total area?",
        steps: [
          "Above contributes +3.",
          "Below contributes -2 to the integral.",
          "Signed integral=1.",
          "Total area=5.",
        ],
        answer: "Signed integral 1; total geometric area 5.",
      },
    ],
    exercises: [
      {
        question: "Evaluate ∫₀²x dx.",
        answer: "x²/2 from 0 to 2 gives 2.",
      },
      {
        question: "If a graph contributes -4 to an integral below the axis, what geometric area does that region have?",
        answer: "4 square units.",
      },
      {
        question: "Why split at x-intercepts when total area is requested?",
        answer: "Because sign changes there, and each geometric region should be counted positively.",
      },
    ],
    quiz: [
      {
        question: "If geometric area 6 lies below the x-axis, its integral contribution is...",
        options: [
          "6",
          "-6",
          "0",
          "undefined",
        ],
        correctIndex: 1,
        explanation: "Definite integrals use signed area.",
      },
      {
        question: "For total geometric area, below-axis regions should be...",
        options: [
          "discarded",
          "counted negatively",
          "counted by positive magnitude",
          "always doubled",
        ],
        correctIndex: 2,
        explanation: "Total area sums magnitudes.",
      },
      {
        question: "Which differentiation rule is conceptually reversed by simple substitution patterns?",
        options: [
          "Chain rule",
          "Constant rule only",
          "Quotient rule only",
          "No rule",
        ],
        correctIndex: 0,
        explanation: "Substitution recognises composite structures related to the chain rule.",
      },
    ],
    summary: [
      "Integrals are linear over sums and constant multiples.",
      "Some integration patterns reverse the chain rule.",
      "Definite integrals measure signed accumulation.",
      "Total geometric area uses positive magnitudes.",
      "Splitting at zeros distinguishes signed and total area.",
    ],
    nextStep: "Module 7 connects differentiation and integration through the Fundamental Theorem of Calculus.",
  },
];
