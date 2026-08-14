import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   MODULE 07 — THE FUNDAMENTAL THEOREM OF CALCULUS
   ========================================================================== */

export const calculusFoundationsModule07:
  LessonContent[] = [

  {
    courseSlug: "calculus-foundations",
    lessonKey: "m7-l1-fundamental-theorem-of-calculus",
    title: "Connecting derivatives and integrals",
    subtitle: "Differentiation and integration are inverse processes linked by accumulation.",
    estimatedMinutes: 30,
    objectives: [
      "Explain conceptually why derivatives and integrals are inverse processes.",
      "Relate a rate function to accumulated change.",
      "Use units to connect rate and accumulation.",
      "Recognise the two directions of the derivative-integral relationship.",
    ],
    content: [
      {
        type: "paragraph",
        text: "The central surprise of elementary calculus is that the two big ideas we have studied—instantaneous change and accumulation—are deeply connected. Differentiation and integration undo one another under suitable conditions.",
      },
      {
        type: "heading",
        text: "From quantity to rate",
      },
      {
        type: "paragraph",
        text: "If S(t) is an accumulated quantity, then S′(t) tells us its instantaneous rate of change.",
      },
      {
        type: "heading",
        text: "From rate back to quantity",
      },
      {
        type: "paragraph",
        text: "If r(t) is a rate, then integrating r over a time interval gives the accumulated change in the original quantity.",
      },
      {
        type: "callout",
        title: "Two-way relationship",
        text: "Differentiate an accumulation to recover its rate; integrate a rate to recover accumulated change.",
      },
      {
        type: "heading",
        text: "Units reveal the connection",
      },
      {
        type: "paragraph",
        text: "Velocity in metres per second integrates over seconds to give metres. A flow rate in litres per minute integrates over minutes to give litres.",
      },
    ],
    workedExamples: [
      {
        title: "Velocity to displacement",
        question: "A particle moves with constant velocity 4 m/s for 3 seconds. What displacement results?",
        steps: [
          "Velocity is a rate.",
          "Integrate the constant rate over 3 seconds.",
          "4×3=12.",
        ],
        answer: "The displacement is 12 metres.",
      },
      {
        title: "Accumulation to rate",
        question: "If accumulated volume is V(t)=2t² litres, what is the instantaneous inflow rate?",
        steps: [
          "Differentiate V.",
          "V′(t)=4t.",
          "Units are litres per unit time.",
        ],
        answer: "The inflow rate is 4t litres per unit time.",
      },
    ],
    exercises: [
      {
        question: "What does integrating velocity over time produce?",
        answer: "Displacement, the accumulated change in position.",
      },
      {
        question: "What does differentiating an accumulated quantity produce?",
        answer: "Its instantaneous rate of accumulation.",
      },
      {
        question: "Why is unit analysis helpful here?",
        answer: "Rate units multiplied by the input unit produce accumulated output units.",
      },
    ],
    quiz: [
      {
        question: "Integrating a rate over time gives...",
        options: [
          "an accumulated change",
          "another rate only",
          "always zero",
          "a tangent slope",
        ],
        correctIndex: 0,
        explanation: "Integration accumulates the rate.",
      },
      {
        question: "Differentiating an accumulation function gives...",
        options: [
          "the underlying local rate",
          "the total area only",
          "a constant always",
          "an x-intercept",
        ],
        correctIndex: 0,
        explanation: "The derivative recovers the local accumulation rate.",
      },
      {
        question: "Which pair best reflects inverse processes?",
        options: [
          "addition and multiplication",
          "differentiation and integration",
          "factoring and graphing",
          "sampling and averaging",
        ],
        correctIndex: 1,
        explanation: "The Fundamental Theorem links differentiation and integration.",
      },
    ],
    summary: [
      "Differentiation extracts local rates from quantities.",
      "Integration accumulates rates into total change.",
      "The two operations are inverse under suitable conditions.",
      "Units provide a powerful consistency check.",
    ],
    nextStep: "Next, we state and use the Fundamental Theorem of Calculus directly.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m7-l2-fundamental-theorem-of-calculus",
    title: "The Fundamental Theorem of Calculus",
    subtitle: "The Fundamental Theorem makes the derivative-integral connection computationally powerful.",
    estimatedMinutes: 34,
    objectives: [
      "State the evaluation form of the Fundamental Theorem.",
      "Use antiderivatives to evaluate definite integrals.",
      "Explain the accumulation-function form conceptually.",
      "Apply the theorem to simple examples.",
    ],
    content: [
      {
        type: "paragraph",
        text: "The Fundamental Theorem of Calculus (FTC) connects the limit definition of area with antiderivatives. It explains why definite integrals can be evaluated using derivatives in reverse.",
      },
      {
        type: "ftc-connection-explorer",
        title: "FTC Connection Explorer",
        description: "Explore f(x)=x² and its accumulation A(x)=∫₀ˣt²dt=x³/3. Compare the slope A′(x) with the current value f(x).",
      },
      {
        type: "heading",
        text: "Evaluation form",
      },
      {
        type: "callout",
        title: "FTC evaluation rule",
        text: "If F′(x)=f(x), then ∫ₐᵇf(x)dx=F(b)-F(a).",
      },
      {
        type: "heading",
        text: "Accumulation-function form",
      },
      {
        type: "paragraph",
        text: "Define A(x)=∫ₐˣf(t)dt. Under suitable continuity conditions, A′(x)=f(x). The instantaneous rate at which accumulated area grows equals the current height of the integrand.",
      },
      {
        type: "heading",
        text: "Why this is remarkable",
      },
      {
        type: "paragraph",
        text: "One side begins with global accumulation defined by increasingly fine sums. The other uses a local derivative. FTC proves these views are linked.",
      },
    ],
    workedExamples: [
      {
        title: "Evaluate by FTC",
        question: "Evaluate ∫₁³2x dx.",
        steps: [
          "An antiderivative is x².",
          "At 3:9.",
          "At 1:1.",
          "Subtract.",
        ],
        answer: "8.",
      },
      {
        title: "Accumulation derivative",
        question: "Let A(x)=∫₀ˣt²dt. What is A′(x)?",
        steps: [
          "FTC says the derivative of an accumulation function recovers its integrand at the upper limit.",
          "Replace t by x.",
        ],
        answer: "A′(x)=x².",
      },
    ],
    exercises: [
      {
        question: "If F′=f, how do you evaluate ∫₂⁵f(x)dx?",
        answer: "F(5)-F(2).",
      },
      {
        question: "If A(x)=∫₁ˣcos t dt, what is A′(x)?",
        answer: "cos x.",
      },
      {
        question: "Why is FTC computationally important?",
        answer: "It converts a limiting-sum definite integral into antiderivative evaluation.",
      },
    ],
    quiz: [
      {
        question: "If F′=f, ∫ₐᵇf(x)dx equals...",
        options: [
          "F(a)+F(b)",
          "F(b)-F(a)",
          "f(b)-f(a)",
          "F′(b)",
        ],
        correctIndex: 1,
        explanation: "This is the evaluation form of FTC.",
      },
      {
        question: "For A(x)=∫₀ˣf(t)dt, A′(x) is...",
        options: [
          "0",
          "f(x)",
          "A(x)²",
          "∫f",
        ],
        correctIndex: 1,
        explanation: "The derivative of accumulation recovers the integrand.",
      },
      {
        question: "FTC connects which ideas?",
        options: [
          "Only algebra and geometry",
          "Local differentiation and global accumulation",
          "Sampling and probability",
          "Matrices and vectors",
        ],
        correctIndex: 1,
        explanation: "FTC is the central derivative-integral connection.",
      },
    ],
    summary: [
      "FTC evaluates definite integrals using antiderivatives.",
      "If F′=f, then ∫ₐᵇf=F(b)-F(a).",
      "The derivative of an accumulation function recovers the integrand.",
      "FTC links local rates with global accumulation.",
    ],
    nextStep: "Next, we work directly with accumulation functions and interpret how they change.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m7-l3-fundamental-theorem-of-calculus",
    title: "Using accumulation functions",
    subtitle: "Accumulation functions translate area into a new function whose derivative is the original rate.",
    estimatedMinutes: 30,
    objectives: [
      "Interpret an accumulation function.",
      "Determine where an accumulation function increases or decreases.",
      "Relate the derivative of accumulation to the integrand.",
      "Distinguish accumulated value from current rate.",
    ],
    content: [
      {
        type: "paragraph",
        text: "An accumulation function such as A(x)=∫₀ˣf(t)dt records the signed accumulation from a fixed starting point up to a moving endpoint x.",
      },
      {
        type: "heading",
        text: "How A changes",
      },
      {
        type: "paragraph",
        text: "By FTC, A′(x)=f(x). Therefore the sign of f determines whether A is increasing or decreasing.",
      },
      {
        type: "callout",
        title: "Do not confuse height and total",
        text: "f(x) is the current accumulation rate. A(x) is the total signed amount accumulated so far.",
      },
      {
        type: "heading",
        text: "Turning points of accumulation",
      },
      {
        type: "paragraph",
        text: "If f changes from positive to negative, then A′ changes from positive to negative, so A has a local maximum. The reverse sign change gives a local minimum.",
      },
      {
        type: "heading",
        text: "Initial value",
      },
      {
        type: "paragraph",
        text: "For A(x)=∫ₐˣf(t)dt, A(a)=0 because there is no interval width at the starting point.",
      },
    ],
    workedExamples: [
      {
        title: "Sign of integrand",
        question: "A(x)=∫₀ˣf(t)dt and f(x)>0 on (1,4). What can you say about A?",
        steps: [
          "A′(x)=f(x).",
          "f>0 means A′>0.",
          "Positive derivative means A increases.",
        ],
        answer: "A is increasing on (1,4).",
      },
      {
        title: "Local maximum of accumulation",
        question: "f changes from positive to negative at x=3. What happens to A?",
        steps: [
          "A′=f.",
          "Before 3, A increases.",
          "After 3, A decreases.",
        ],
        answer: "A has a local maximum at x=3.",
      },
    ],
    exercises: [
      {
        question: "For A(x)=∫₂ˣf(t)dt, what is A(2)?",
        answer: "0.",
      },
      {
        question: "If f(x)<0, what happens to A(x)?",
        answer: "A is decreasing.",
      },
      {
        question: "Can A(x) be positive while decreasing?",
        answer: "Yes. Its total can be positive even while its current rate is negative.",
      },
    ],
    quiz: [
      {
        question: "For A(x)=∫₀ˣf(t)dt, what is A′(x)?",
        options: [
          "f(x)",
          "0",
          "A(x)",
          "f′(x)",
        ],
        correctIndex: 0,
        explanation: "FTC gives A′=f.",
      },
      {
        question: "If f is negative, A is...",
        options: [
          "increasing",
          "decreasing",
          "always zero",
          "undefined",
        ],
        correctIndex: 1,
        explanation: "A′=f is negative.",
      },
      {
        question: "A local maximum of A can occur when f changes...",
        options: [
          "negative to positive",
          "positive to negative",
          "zero to positive only",
          "without sign",
        ],
        correctIndex: 1,
        explanation: "A′ changes + to −.",
      },
    ],
    summary: [
      "An accumulation function records signed total from a fixed start to a moving endpoint.",
      "Its derivative equals the integrand.",
      "The sign of the integrand controls whether accumulation rises or falls.",
      "Accumulated value and current rate are different quantities.",
    ],
    nextStep: "Finally, we combine the entire course into one responsible calculus problem-solving workflow.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m7-l4-fundamental-theorem-of-calculus",
    title: "A complete calculus problem-solving workflow",
    subtitle: "Strong calculus work combines interpretation, algebra, derivatives, integrals and checks.",
    estimatedMinutes: 34,
    objectives: [
      "Choose between derivative and integral methods based on the question.",
      "Build a structured calculus solution from context to conclusion.",
      "Check signs, units, domains and reasonableness.",
      "Connect limits, derivatives and integrals in a unified framework.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Calculus problems become easier when you identify the mathematical role of the question before calculating. Is it asking about local change, an optimum, accumulated change or behaviour near a point?",
      },
      {
        type: "heading",
        text: "Step 1: identify the quantity",
      },
      {
        type: "paragraph",
        text: "Write down the input, output, units and what the question asks. This prevents symbolic manipulation from becoming detached from meaning.",
      },
      {
        type: "heading",
        text: "Step 2: choose the calculus object",
      },
      {
        type: "bullets",
        items: [
          "Use a limit for approaching behaviour.",
          "Use a derivative for instantaneous rate, tangent slope or optimisation.",
          "Use an integral for accumulation, signed area or total change from a rate.",
          "Use FTC when converting between rates, accumulation and antiderivative evaluation.",
        ],
      },
      {
        type: "heading",
        text: "Step 3: calculate carefully",
      },
      {
        type: "paragraph",
        text: "Apply the appropriate rule and keep track of restrictions such as denominator zeros or feasible domains.",
      },
      {
        type: "heading",
        text: "Step 4: interpret and check",
      },
      {
        type: "callout",
        title: "Final-answer checklist",
        text: "Does the sign make sense? Are the units correct? Is the answer inside the valid domain? Does the graph or context support it?",
      },
      {
        type: "heading",
        text: "A unified picture",
      },
      {
        type: "paragraph",
        text: "Functions describe relationships. Limits describe approach. Derivatives describe local change. Integrals describe accumulation. FTC links local rates and accumulated totals.",
      },
    ],
    workedExamples: [
      {
        title: "Rate to total change",
        question: "A tank fills at rate r(t)=2t+1 litres/min for 0≤t≤3. Find total volume added.",
        steps: [
          "The question asks for accumulation, so integrate.",
          "∫₀³(2t+1)dt=[t²+t]₀³.",
          "At 3 the value is 12.",
        ],
        answer: "12 litres are added.",
      },
      {
        title: "Optimise from a model",
        question: "P(x)=-x²+10x-16. Find the x-value that maximises P.",
        steps: [
          "Differentiate: P′=-2x+10.",
          "Set zero: x=5.",
          "P″=-2<0 confirms a maximum.",
        ],
        answer: "The model is maximised at x=5.",
      },
    ],
    exercises: [
      {
        question: "A question asks for instantaneous speed at t=4. Which tool is most direct?",
        answer: "Differentiate position with respect to time and evaluate at t=4.",
      },
      {
        question: "A question asks for total quantity accumulated from a varying rate. Which tool is most direct?",
        answer: "A definite integral of the rate.",
      },
      {
        question: "Why check units at the end?",
        answer: "Units verify that the operation matches the contextual quantity and can reveal mistakes.",
      },
    ],
    quiz: [
      {
        question: "Which tool is most directly associated with instantaneous change?",
        options: [
          "Derivative",
          "Definite integral",
          "Histogram",
          "Matrix",
        ],
        correctIndex: 0,
        explanation: "Derivatives describe instantaneous local rates.",
      },
      {
        question: "Which tool is most directly associated with accumulation over an interval?",
        options: [
          "Derivative",
          "Definite integral",
          "Limit only",
          "Factorisation",
        ],
        correctIndex: 1,
        explanation: "Definite integrals measure accumulated signed change.",
      },
      {
        question: "What is the best final step after obtaining a calculus answer?",
        options: [
          "Stop immediately",
          "Interpret and check it in context",
          "Remove the units",
          "Differentiate everything again",
        ],
        correctIndex: 1,
        explanation: "A responsible solution checks sign, units, domain and context.",
      },
    ],
    summary: [
      "Choose the calculus tool based on the question.",
      "Limits describe approach, derivatives local change and integrals accumulation.",
      "FTC connects derivatives and integrals.",
      "Strong solutions check signs, units, domains and context.",
      "The course forms one coherent language of change and accumulation.",
    ],
    nextStep: "Complete the final assessment to demonstrate cumulative understanding of Calculus Foundations.",
  },
];
