import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   MODULE 02 — LIMITS
   ========================================================================== */

export const calculusFoundationsModule02:
  LessonContent[] = [

  /* ========================================================================
     LESSON 05
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m2-l1-limits",

    title:
      "Approaching a value",

    subtitle:
      "Limits describe what a function approaches, even when the value at the point is missing or different.",

    estimatedMinutes:
      28,


    objectives: [
      "Explain the intuitive meaning of a limit.",
      "Distinguish between a function value and a limiting value.",
      "Describe a limit using numerical and graphical evidence.",
      "Recognise situations where a limit can exist even when the function is undefined at the point.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "In the previous module, we saw that instantaneous change can be approached by shrinking an interval. To make that idea precise, calculus needs a way to talk about what happens as an input gets closer and closer to a particular value. That is the role of a limit.",
      },


      {
        type:
          "callout",

        title:
          "Core idea",

        text:
          "A limit asks what value a function approaches as the input approaches a chosen point.",
      },


      {
        type:
          "heading",

        text:
          "Approaching is not the same as arriving",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose f(x) becomes closer and closer to 5 as x gets closer to 2. The statement about the limit concerns nearby behaviour. It does not automatically tell us what f(2) equals.",
      },


      {
        type:
          "paragraph",

        text:
          "The function might equal 5 at x = 2, it might equal some other value, or it might not be defined there at all. A limit is about the trend around the point.",
      },


      {
        type:
          "limit-explorer",

        title:
          "Limit Explorer",

        description:
          "Explore g(x) = (x² - 1)/(x - 1) near x = 1. The function is undefined at x = 1, but values from both sides approach 2.",
      },


      {
        type:
          "heading",

        text:
          "A removable hole",
      },


      {
        type:
          "paragraph",

        text:
          "For x ≠ 1, the expression (x² - 1)/(x - 1) simplifies to x + 1. At x = 1 the original expression gives 0/0 and is undefined, so the graph has a hole at (1, 2). Yet values close to x = 1 are close to 2.",
      },


      {
        type:
          "callout",

        title:
          "Important distinction",

        text:
          "The limit can exist even when the function value at the point does not exist.",
      },


      {
        type:
          "heading",

        text:
          "Limits are local",
      },


      {
        type:
          "paragraph",

        text:
          "A limit only cares about behaviour near the target input. What the function does far away is irrelevant to that particular limit.",
      },

    ],


    workedExamples: [

      {
        title:
          "Reading a simple limit",

        question:
          "Suppose h(x) approaches 7 as x approaches 3 from both sides, but h(3) = 10. What is the limiting value?",

        steps: [
          "The limit concerns nearby values, not necessarily the value at x = 3.",
          "From both the left and the right, h(x) approaches 7.",
          "The isolated value h(3) = 10 does not change the nearby trend.",
        ],

        answer:
          "The limit is 7, even though h(3) = 10.",
      },


      {
        title:
          "Undefined at the target",

        question:
          "For g(x) = (x² - 4)/(x - 2), what value does g(x) approach as x approaches 2?",

        steps: [
          "Factor the numerator: x² - 4 = (x - 2)(x + 2).",
          "For x ≠ 2, cancel x - 2 to obtain g(x) = x + 2.",
          "As x approaches 2, x + 2 approaches 4.",
          "The original formula is undefined at x = 2, but nearby values approach 4.",
        ],

        answer:
          "The limit is 4.",
      },

    ],


    exercises: [

      {
        question:
          "A graph has a hole at (4, 9), and the curve approaches the hole smoothly from both sides. What limit does the graph suggest as x approaches 4?",

        answer:
          "The limit is 9.",
      },


      {
        question:
          "Can a function have a limit at x = a if f(a) is undefined?",

        answer:
          "Yes. A limit is determined by nearby behaviour, so the function can approach a single value even if the value at x = a is missing.",
      },


      {
        question:
          "Why does changing one isolated point on a graph usually not change the limit at that point?",

        answer:
          "Because the limit depends on values arbitrarily close to the point rather than the single function value at the point itself.",
      },

    ],


    quiz: [

      {
        question:
          "Which statement best describes a limit?",

        options: [
          "The exact function value at a point only",
          "The value a function approaches as the input approaches a point",
          "The largest output of a function",
          "The average of all function values",
        ],

        correctIndex:
          1,

        explanation:
          "A limit describes nearby behaviour: the value approached as the input gets closer to a chosen point.",
      },


      {
        question:
          "If f(x) approaches 3 as x approaches 1, but f(1) = 8, what is the limit?",

        options: [
          "1",
          "3",
          "8",
          "The limit cannot exist",
        ],

        correctIndex:
          1,

        explanation:
          "The limit is controlled by nearby values, so it can be 3 even if the function value at x = 1 is 8.",
      },


      {
        question:
          "Why is g(x) = (x² - 1)/(x - 1) undefined at x = 1?",

        options: [
          "The numerator is too large",
          "The denominator becomes zero",
          "The function is always negative",
          "The graph has no nearby values",
        ],

        correctIndex:
          1,

        explanation:
          "At x = 1, the denominator x - 1 equals zero. The nearby values still approach 2.",
      },

    ],


    summary: [
      "A limit describes the value a function approaches near a target input.",
      "The function value and the limiting value are different concepts.",
      "A limit may exist even when the function is undefined at the target point.",
      "Limits depend on local behaviour near the point.",
    ],


    nextStep:
      "Next, we learn how to estimate limits systematically from tables and graphs.",
  },


  /* ========================================================================
     LESSON 06
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m2-l2-limits",

    title:
      "Estimating limits from graphs and tables",

    subtitle:
      "Limits can often be understood before any algebra is used.",

    estimatedMinutes:
      28,


    objectives: [
      "Estimate a limit from numerical values in a table.",
      "Estimate a limit by reading a graph from both sides.",
      "Distinguish left-hand and right-hand behaviour.",
      "Recognise when a two-sided limit does not exist.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A limit can be investigated numerically by evaluating a function at inputs close to the target, or visually by inspecting the graph. Both approaches focus on what happens from the left and from the right.",
      },


      {
        type:
          "heading",

        text:
          "Approaching from the left and right",
      },


      {
        type:
          "paragraph",

        text:
          "If x approaches a from values smaller than a, we call this the left-hand approach. If x approaches a from values larger than a, we call it the right-hand approach.",
      },


      {
        type:
          "callout",

        title:
          "Two-sided limit",

        text:
          "A two-sided limit exists only when the left-hand and right-hand limiting values agree.",
      },


      {
        type:
          "heading",

        text:
          "Using a table",
      },


      {
        type:
          "paragraph",

        text:
          "To estimate a limit at x = a, choose values close to a on both sides. For example, use a - 0.1, a - 0.01, a + 0.01 and a + 0.1. If the outputs settle near a common number, that number is evidence for the limit.",
      },


      {
        type:
          "paragraph",

        text:
          "The goal is not to substitute the target value repeatedly. The goal is to observe a trend as the input gets increasingly close.",
      },


      {
        type:
          "heading",

        text:
          "Using a graph",
      },


      {
        type:
          "paragraph",

        text:
          "On a graph, trace the curve toward the target x-value from the left and note the y-value approached. Then repeat from the right. If both sides approach the same height, the two-sided limit exists.",
      },


      {
        type:
          "heading",

        text:
          "When the sides disagree",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose the graph approaches y = 2 from the left but y = 5 from the right. There is no single number describing the behaviour from both sides, so the two-sided limit does not exist.",
      },


      {
        type:
          "callout",

        title:
          "Do not average the sides",

        text:
          "If the left and right limits differ, the two-sided limit does not exist. We do not average them.",
      },

    ],


    workedExamples: [

      {
        title:
          "Numerical estimation",

        question:
          "A table gives f(1.9) = 3.61, f(1.99) = 3.9601, f(2.01) = 4.0401 and f(2.1) = 4.41. What limit is suggested as x approaches 2?",

        steps: [
          "Values just below 2 produce outputs close to 4.",
          "Values just above 2 also produce outputs close to 4.",
          "Both sides show the same limiting trend.",
        ],

        answer:
          "The table suggests that the limit is 4.",
      },


      {
        title:
          "A jump in a graph",

        question:
          "A graph approaches y = 1 from the left of x = 0 and y = 4 from the right. Does the two-sided limit exist?",

        steps: [
          "The left-hand limiting value is 1.",
          "The right-hand limiting value is 4.",
          "The two values are different.",
        ],

        answer:
          "No. The two-sided limit does not exist because the left- and right-hand limits disagree.",
      },

    ],


    exercises: [

      {
        question:
          "A table of values near x = 5 approaches 12 from both sides. What limit is suggested?",

        answer:
          "The limit is 12.",
      },


      {
        question:
          "A graph approaches y = -2 from the left and y = -2 from the right, but the plotted point at x = 3 is y = 7. What is the limit as x approaches 3?",

        answer:
          "The limit is -2. The isolated function value 7 does not change the nearby limiting behaviour.",
      },


      {
        question:
          "The left-hand limit at x = 1 is 6 and the right-hand limit is 8. What is the two-sided limit?",

        answer:
          "The two-sided limit does not exist because the one-sided limits differ.",
      },

    ],


    quiz: [

      {
        question:
          "When does a two-sided limit exist?",

        options: [
          "Whenever the function is defined at the point",
          "Whenever the left- and right-hand limits agree",
          "Whenever the graph crosses the x-axis",
          "Whenever the function is increasing",
        ],

        correctIndex:
          1,

        explanation:
          "A two-sided limit requires the same limiting value from both directions.",
      },


      {
        question:
          "If the left-hand limit is 3 and the right-hand limit is 5, what should we report for the two-sided limit?",

        options: [
          "4",
          "3",
          "5",
          "It does not exist",
        ],

        correctIndex:
          3,

        explanation:
          "Different one-sided limits mean there is no single two-sided limiting value.",
      },


      {
        question:
          "Why do tables often include values on both sides of the target input?",

        options: [
          "To calculate the mean output",
          "To compare left-hand and right-hand behaviour",
          "To find the largest input",
          "To guarantee continuity",
        ],

        correctIndex:
          1,

        explanation:
          "A two-sided limit depends on agreement between behaviour from the left and right.",
      },

    ],


    summary: [
      "Tables estimate limits by tracking outputs at inputs close to the target.",
      "Graphs estimate limits by tracing the curve from both sides.",
      "Left-hand and right-hand limits must agree for a two-sided limit to exist.",
      "Different one-sided limits imply that the two-sided limit does not exist.",
    ],


    nextStep:
      "Next, we learn algebraic rules that let us evaluate many limits efficiently.",
  },


  /* ========================================================================
     LESSON 07
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m2-l3-limits",

    title:
      "Limit laws and algebraic techniques",

    subtitle:
      "Once limiting behaviour is understood, algebra can make many limits fast to evaluate.",

    estimatedMinutes:
      32,


    objectives: [
      "Apply basic limit laws to sums, differences, products and quotients.",
      "Use direct substitution when it is valid.",
      "Factor and simplify expressions that initially produce 0/0.",
      "Explain why algebraic simplification can reveal a removable discontinuity.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Many limits can be evaluated by direct substitution. If a function behaves continuously near the target, we can often replace x by the target value and calculate normally.",
      },


      {
        type:
          "heading",

        text:
          "Direct substitution",
      },


      {
        type:
          "paragraph",

        text:
          "For a polynomial such as f(x) = x² + 3x - 1, the limit as x approaches 2 is obtained by substitution: 2² + 3(2) - 1 = 9.",
      },


      {
        type:
          "callout",

        title:
          "First strategy",

        text:
          "Try direct substitution first. If it produces an ordinary finite value, that is usually the limit for the elementary functions used in this course.",
      },


      {
        type:
          "heading",

        text:
          "Limit laws",
      },


      {
        type:
          "paragraph",

        text:
          "When individual limits exist, limits behave predictably under addition, subtraction, multiplication and division. The limit of a sum is the sum of the limits, and similarly for differences and products. Quotients also work provided the limiting denominator is not zero.",
      },


      {
        type:
          "bullets",

        items: [
          "Sum: limit of [f(x) + g(x)] = limit of f(x) + limit of g(x).",
          "Difference: limits can be subtracted.",
          "Product: limits can be multiplied.",
          "Constant multiple: constants can be carried outside the limiting process.",
          "Quotient: divide the limits when the denominator limit is non-zero.",
        ],
      },


      {
        type:
          "heading",

        text:
          "What does 0/0 mean?",
      },


      {
        type:
          "paragraph",

        text:
          "If direct substitution produces 0/0, that does not mean the limit equals zero, and it does not automatically mean the limit fails to exist. It means the original expression needs more analysis.",
      },


      {
        type:
          "callout",

        title:
          "Indeterminate form",

        text:
          "The expression 0/0 is a signal to simplify or rethink the expression. It is not a final answer.",
      },


      {
        type:
          "heading",

        text:
          "Factoring to reveal the limit",
      },


      {
        type:
          "paragraph",

        text:
          "Consider (x² - 9)/(x - 3). Direct substitution gives 0/0. Factor the numerator as (x - 3)(x + 3). For x ≠ 3, the common factor cancels and the expression equals x + 3. The limit is therefore 6.",
      },


      {
        type:
          "paragraph",

        text:
          "The cancellation does not redefine the original function at x = 3. It tells us that all nearby points follow the simpler expression x + 3, which is exactly the information needed for the limit.",
      },

    ],


    workedExamples: [

      {
        title:
          "Direct substitution",

        question:
          "Evaluate the limit of 2x² - x + 4 as x approaches 3.",

        steps: [
          "The expression is a polynomial, so direct substitution is valid.",
          "Substitute x = 3.",
          "2(3²) - 3 + 4 = 18 - 3 + 4 = 19.",
        ],

        answer:
          "The limit is 19.",
      },


      {
        title:
          "Factor and cancel",

        question:
          "Evaluate the limit of (x² - 16)/(x - 4) as x approaches 4.",

        steps: [
          "Direct substitution gives 0/0.",
          "Factor x² - 16 as (x - 4)(x + 4).",
          "For x ≠ 4, cancel x - 4.",
          "The nearby expression is x + 4.",
          "As x approaches 4, x + 4 approaches 8.",
        ],

        answer:
          "The limit is 8.",
      },

    ],


    exercises: [

      {
        question:
          "Evaluate the limit of x³ + 2x as x approaches 2.",

        answer:
          "Direct substitution gives 2³ + 2(2) = 8 + 4 = 12.",
      },


      {
        question:
          "Evaluate the limit of (x² - 25)/(x - 5) as x approaches 5.",

        hint:
          "Factor the numerator as a difference of squares.",

        answer:
          "Factor to (x - 5)(x + 5), cancel the common factor for x ≠ 5, and evaluate x + 5 at 5. The limit is 10.",
      },


      {
        question:
          "Why is 0/0 called indeterminate rather than simply equal to zero?",

        answer:
          "Different expressions can produce 0/0 under direct substitution but have different limiting behaviour. More information is needed before the limit can be determined.",
      },

    ],


    quiz: [

      {
        question:
          "What should usually be tried first when evaluating an elementary limit algebraically?",

        options: [
          "Differentiate immediately",
          "Direct substitution",
          "Set the answer to zero",
          "Take an average",
        ],

        correctIndex:
          1,

        explanation:
          "Direct substitution is the natural first step. If it gives a normal finite value, the limit is usually determined.",
      },


      {
        question:
          "What does obtaining 0/0 by direct substitution mean?",

        options: [
          "The limit must be zero",
          "The limit must not exist",
          "The expression is indeterminate and needs more analysis",
          "The function must be constant",
        ],

        correctIndex:
          2,

        explanation:
          "0/0 is an indeterminate form. Factoring or another algebraic technique may reveal the limit.",
      },


      {
        question:
          "What is the limit of (x² - 4)/(x - 2) as x approaches 2?",

        options: [
          "0",
          "2",
          "4",
          "The limit does not exist",
        ],

        correctIndex:
          2,

        explanation:
          "Factor the numerator: (x - 2)(x + 2). After cancellation, nearby values follow x + 2, which approaches 4.",
      },

    ],


    summary: [
      "Direct substitution is the first strategy for many elementary limits.",
      "Limit laws allow sums, differences, products and suitable quotients to be handled component-wise.",
      "A 0/0 result is indeterminate, not a final answer.",
      "Factoring and simplification can reveal the nearby behaviour of a function.",
    ],


    nextStep:
      "Next, we connect limits to continuity and learn how different kinds of discontinuity appear.",
  },


  /* ========================================================================
     LESSON 08
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m2-l4-limits",

    title:
      "Continuity and discontinuities",

    subtitle:
      "Continuity connects a function's value to the limiting behaviour around it.",

    estimatedMinutes:
      30,


    objectives: [
      "State the three conditions for continuity at a point.",
      "Recognise removable, jump and infinite discontinuities.",
      "Use limits to decide whether a function is continuous at a point.",
      "Explain why continuity is important for later calculus ideas.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A continuous graph is often described informally as one that can be drawn without lifting your pen. Limits let us replace that informal picture with a precise local test.",
      },


      {
        type:
          "heading",

        text:
          "Three conditions for continuity",
      },


      {
        type:
          "paragraph",

        text:
          "A function f is continuous at x = a when three things are true: f(a) is defined, the limit of f(x) as x approaches a exists, and that limit equals f(a).",
      },


      {
        type:
          "bullets",

        items: [
          "The function value f(a) exists.",
          "The two-sided limit as x approaches a exists.",
          "The limiting value equals f(a).",
        ],
      },


      {
        type:
          "callout",

        title:
          "Continuity test",

        text:
          "Defined value + existing two-sided limit + agreement between them = continuity at the point.",
      },


      {
        type:
          "heading",

        text:
          "Removable discontinuity",
      },


      {
        type:
          "paragraph",

        text:
          "A removable discontinuity occurs when the nearby limit exists but the function value is missing or placed at the wrong height. Graphically, this often appears as a hole.",
      },


      {
        type:
          "heading",

        text:
          "Jump discontinuity",
      },


      {
        type:
          "paragraph",

        text:
          "A jump occurs when the function approaches different values from the left and right. Since the one-sided limits disagree, the two-sided limit does not exist.",
      },


      {
        type:
          "heading",

        text:
          "Infinite discontinuity",
      },


      {
        type:
          "paragraph",

        text:
          "An infinite discontinuity occurs when function values grow without bound near a point, often near a vertical asymptote. The function does not approach a finite real number there.",
      },


      {
        type:
          "heading",

        text:
          "Why continuity matters",
      },


      {
        type:
          "paragraph",

        text:
          "Many familiar functions are continuous across large parts of their domains. Continuity allows local behaviour to be predictable and supports many later results involving derivatives and integrals.",
      },


      {
        type:
          "callout",

        title:
          "Looking ahead",

        text:
          "Differentiability will require even more than continuity. A function can be continuous at a point and still fail to have a derivative there.",
      },

    ],


    workedExamples: [

      {
        title:
          "Checking continuity",

        question:
          "Suppose f(2) = 5 and the limit of f(x) as x approaches 2 is also 5. Is f continuous at x = 2?",

        steps: [
          "The function value f(2) exists.",
          "The two-sided limit exists.",
          "The limit equals the function value.",
        ],

        answer:
          "Yes. All three continuity conditions are satisfied.",
      },


      {
        title:
          "A removable discontinuity",

        question:
          "A graph approaches y = 4 from both sides at x = 1, but the function is undefined at x = 1. What type of discontinuity is present?",

        steps: [
          "The two-sided limit exists and equals 4.",
          "The function value is missing.",
          "The discontinuity could be removed by defining f(1) = 4.",
        ],

        answer:
          "It is a removable discontinuity.",
      },

    ],


    exercises: [

      {
        question:
          "At x = 3, a function has f(3) = 7 and the two-sided limit is 5. Is the function continuous there?",

        answer:
          "No. The function value exists and the limit exists, but they are not equal.",
      },


      {
        question:
          "What kind of discontinuity occurs when the left-hand limit is 2 and the right-hand limit is 6?",

        answer:
          "A jump discontinuity.",
      },


      {
        question:
          "Why is a vertical asymptote associated with an infinite discontinuity?",

        answer:
          "Because the function values become unbounded in magnitude near the point rather than approaching a finite real number.",
      },

    ],


    quiz: [

      {
        question:
          "Which condition is NOT sufficient by itself to guarantee continuity at x = a?",

        options: [
          "f(a) is defined",
          "The two-sided limit exists",
          "The limit equals f(a)",
          "All three conditions are required together",
        ],

        correctIndex:
          3,

        explanation:
          "Continuity requires all three conditions together: defined value, existing two-sided limit and equality between them.",
      },


      {
        question:
          "A hole in an otherwise smooth curve is usually what type of discontinuity?",

        options: [
          "Removable",
          "Jump",
          "Infinite",
          "Periodic",
        ],

        correctIndex:
          0,

        explanation:
          "A hole often represents a removable discontinuity because the limiting value exists even though the function value is missing or misplaced.",
      },


      {
        question:
          "If the left-hand and right-hand limits differ, which conclusion is correct?",

        options: [
          "The function must be continuous",
          "The two-sided limit does not exist",
          "The limit equals their average",
          "The function must equal zero",
        ],

        correctIndex:
          1,

        explanation:
          "A two-sided limit exists only when the one-sided limits agree.",
      },

    ],


    summary: [
      "Continuity at a point requires a defined function value, an existing two-sided limit and equality between them.",
      "A removable discontinuity often appears as a hole.",
      "A jump discontinuity occurs when left- and right-hand limits differ.",
      "An infinite discontinuity involves unbounded behaviour near a point.",
      "Continuity provides a foundation for later derivative and integral results.",
    ],


    nextStep:
      "Module 3 uses limits to define derivatives and formalise instantaneous rate of change.",
  },

];
