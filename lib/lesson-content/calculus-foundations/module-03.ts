import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   MODULE 03 — DERIVATIVES
   ========================================================================== */

export const calculusFoundationsModule03:
  LessonContent[] = [

  {
    courseSlug: "calculus-foundations",
    lessonKey: "m3-l1-derivatives",
    title: "The derivative as a rate of change",
    subtitle: "Derivatives turn the limit idea into a precise measure of instantaneous change.",
    estimatedMinutes: 28,
    objectives: [
      "Explain the derivative as an instantaneous rate of change.",
      "Relate average rate of change to the derivative through a limiting process.",
      "Interpret derivative values with units and context.",
      "Recognise positive, negative and zero derivative values.",
    ],
    content: [
      {
        type: "paragraph",
        text: "In Module 1, average rate of change described change across an interval. In Module 2, limits gave us a language for what happens as an interval shrinks. A derivative combines those ideas: it describes the limiting rate of change at a particular input.",
      },
      {
        type: "callout",
        title: "Derivative idea",
        text: "The derivative at a point is the limiting value approached by average rates of change over smaller and smaller intervals around that point.",
      },
      {
        type: "heading",
        text: "From average to instantaneous",
      },
      {
        type: "paragraph",
        text: "For a function f, the average rate of change from x to x + h is [f(x + h) - f(x)] / h. When h is non-zero, this is a secant slope. If these secant slopes approach a stable value as h approaches zero, that value is the derivative f′(x).",
      },
      {
        type: "heading",
        text: "What the sign tells us",
      },
      {
        type: "bullets",
        items: [
          "f′(x) > 0 means the function is increasing locally.",
          "f′(x) < 0 means the function is decreasing locally.",
          "f′(x) = 0 means the graph has a horizontal tangent at that point, though it need not be a maximum or minimum.",
          "A larger magnitude |f′(x)| corresponds to faster local change.",
        ],
      },
      {
        type: "heading",
        text: "Units of a derivative",
      },
      {
        type: "paragraph",
        text: "Derivative units are output units per input unit. If s(t) is distance in metres and t is time in seconds, then s′(t) has units metres per second.",
      },
      {
        type: "callout",
        title: "Interpretation first",
        text: "A derivative is not just a number. State what is changing, with respect to what, and in what units.",
      },
    ],
    workedExamples: [
      {
        title: "Population growth",
        question: "A population P(t) is measured in thousands of people and t in years. At t = 4, P′(4) = 1.2. Interpret this.",
        steps: [
          "P′(4) is the instantaneous population-change rate at year 4.",
          "The output unit is thousands of people and the input unit is years.",
          "The positive sign indicates growth.",
        ],
        answer: "At year 4, the population is increasing at about 1.2 thousand people per year.",
      },
      {
        title: "Temperature change",
        question: "At 3 pm, T′(3) = -2.5 °C/hour. What does this mean?",
        steps: [
          "The derivative is an instantaneous temperature-change rate.",
          "The negative sign means temperature is falling.",
          "The magnitude is 2.5 degrees per hour.",
        ],
        answer: "At 3 pm, the temperature is decreasing at about 2.5°C per hour.",
      },
    ],
    exercises: [
      {
        question: "If f′(2) = 0, what can you conclude immediately?",
        answer: "The graph has a horizontal tangent at x = 2. More information is needed to decide whether it is a maximum, minimum or neither.",
      },
      {
        question: "A revenue function R(q) is in pounds and q in items sold. What are the units of R′(q)?",
        answer: "Pounds per item.",
      },
      {
        question: "What does a negative derivative tell you?",
        answer: "The function is decreasing locally as the input increases.",
      },
    ],
    quiz: [
      {
        question: "What does f′(a) measure?",
        options: [
          "The total area under f",
          "The instantaneous rate of change of f at a",
          "The average of all values of f",
          "The x-intercept nearest a",
        ],
        correctIndex: 1,
        explanation: "A derivative is an instantaneous local rate of change.",
      },
      {
        question: "If f′(x) is positive at a point, what is the function doing locally?",
        options: [
          "Increasing",
          "Decreasing",
          "Constant everywhere",
          "Undefined",
        ],
        correctIndex: 0,
        explanation: "A positive derivative means the output rises for small increases in the input.",
      },
      {
        question: "If distance is in metres and time in seconds, what are derivative units?",
        options: [
          "metres",
          "seconds per metre",
          "metres per second",
          "square metres",
        ],
        correctIndex: 2,
        explanation: "Derivative units are output units divided by input units.",
      },
    ],
    summary: [
      "The derivative formalises instantaneous rate of change.",
      "It arises from a limit of secant slopes.",
      "The sign of a derivative describes local increase or decrease.",
      "Derivative units are output units per input unit.",
    ],
    nextStep: "Next, we connect the same derivative value to the slope of a tangent line.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m3-l2-derivatives",
    title: "The derivative as the slope of a tangent",
    subtitle: "The derivative has a geometric meaning: it is the local slope of the graph.",
    estimatedMinutes: 28,
    objectives: [
      "Explain the tangent line as the limiting position of secant lines.",
      "Connect tangent slope to derivative value.",
      "Estimate a tangent slope visually and numerically.",
      "Write a tangent-line equation from a point and derivative.",
    ],
    content: [
      {
        type: "paragraph",
        text: "The derivative has two complementary interpretations. In context it is an instantaneous rate of change. Geometrically it is the slope of the tangent line to the graph at a point.",
      },
      {
        type: "heading",
        text: "From secant to tangent",
      },
      {
        type: "paragraph",
        text: "A secant line passes through two points on the curve. As the second point moves toward the first, the secant line can settle toward a limiting line. That limiting line is the tangent.",
      },
      {
        type: "tangent-line-explorer",
        title: "Tangent Line Explorer",
        description: "For f(x) = x², move the base point and shrink h. Compare the secant slope with the tangent slope 2x and watch the two lines align.",
      },
      {
        type: "heading",
        text: "Equation of the tangent line",
      },
      {
        type: "paragraph",
        text: "If the curve passes through (a, f(a)) and has derivative f′(a), then the tangent line has slope f′(a). Using point-slope form: y - f(a) = f′(a)(x - a).",
      },
      {
        type: "callout",
        title: "Geometry and rate are the same quantity",
        text: "The slope of the tangent line and the instantaneous rate of change are two interpretations of the derivative.",
      },
    ],
    workedExamples: [
      {
        title: "Tangent to x² at x = 2",
        question: "Find the tangent line to f(x) = x² at x = 2, given f′(x) = 2x.",
        steps: [
          "The point is (2, 4).",
          "f′(2) = 4.",
          "Use y - 4 = 4(x - 2).",
        ],
        answer: "The tangent line is y - 4 = 4(x - 2), or y = 4x - 4.",
      },
      {
        title: "Horizontal tangent",
        question: "A curve has f(3) = 7 and f′(3) = 0. What is the tangent line?",
        steps: [
          "The tangent passes through (3, 7).",
          "Its slope is zero.",
          "A zero-slope line is horizontal.",
        ],
        answer: "The tangent line is y = 7.",
      },
    ],
    exercises: [
      {
        question: "A curve passes through (1, 5) and f′(1) = -2. Write its tangent-line equation.",
        answer: "y - 5 = -2(x - 1).",
      },
      {
        question: "What happens to secant lines when the second point approaches the base point on a smooth curve?",
        answer: "They can approach the tangent line at the base point.",
      },
      {
        question: "If a tangent line is steeply downward from left to right, what can you say about the derivative?",
        answer: "The derivative is negative and has relatively large magnitude.",
      },
    ],
    quiz: [
      {
        question: "Geometrically, f′(a) is the slope of which line?",
        options: [
          "The x-axis",
          "A secant through any two points",
          "The tangent at x = a",
          "A vertical asymptote",
        ],
        correctIndex: 2,
        explanation: "The derivative gives the slope of the tangent line.",
      },
      {
        question: "If f′(a) = 0, the tangent line is...",
        options: [
          "vertical",
          "horizontal",
          "always undefined",
          "always y = x",
        ],
        correctIndex: 1,
        explanation: "Zero slope means a horizontal tangent.",
      },
      {
        question: "Which equation uses the derivative to write the tangent at x = a?",
        options: [
          "y = f(a)x only",
          "y - f(a) = f′(a)(x - a)",
          "x + y = 0",
          "y = a/f′(a)",
        ],
        correctIndex: 1,
        explanation: "This is point-slope form with tangent slope f′(a).",
      },
    ],
    summary: [
      "A tangent line is the limiting position of secant lines.",
      "Its slope equals the derivative at the point.",
      "Point-slope form converts a derivative value into a tangent-line equation.",
      "Derivative geometry and rate interpretation describe the same quantity.",
    ],
    nextStep: "Next, we learn the different notations used for derivatives and how to interpret them correctly.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m3-l3-derivatives",
    title: "Derivative notation and interpretation",
    subtitle: "Different symbols express the same underlying idea of local change.",
    estimatedMinutes: 24,
    objectives: [
      "Recognise common derivative notations.",
      "Interpret derivatives evaluated at a point.",
      "Distinguish a derivative function from one derivative value.",
      "Translate derivative notation into contextual meaning.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Calculus uses several derivative notations because derivatives appear in different mathematical and applied contexts. The notation may look different, but the central idea remains local rate of change.",
      },
      {
        type: "heading",
        text: "Prime notation",
      },
      {
        type: "paragraph",
        text: "If y = f(x), then f′(x) denotes the derivative function. The expression f′(3) is one number: the derivative evaluated at x = 3.",
      },
      {
        type: "heading",
        text: "Leibniz notation",
      },
      {
        type: "paragraph",
        text: "The notation dy/dx emphasises that y changes with respect to x. It is especially useful when variable names have contextual meaning, such as dP/dt for population change with respect to time.",
      },
      {
        type: "callout",
        title: "Do not confuse them",
        text: "f′(x) is a function describing slope at many x-values. f′(a) is one particular slope.",
      },
      {
        type: "bullets",
        items: [
          "f′(x): derivative function.",
          "f′(2): derivative value at x = 2.",
          "dy/dx: derivative of y with respect to x.",
          "dV/dt: instantaneous change of volume with respect to time.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Interpreting dC/dq",
        question: "C(q) is production cost in pounds for q items. What does dC/dq represent?",
        steps: [
          "C is the output quantity: cost.",
          "q is the input: items.",
          "The derivative is local cost change per item.",
        ],
        answer: "dC/dq is the instantaneous change in cost per additional item produced.",
      },
      {
        title: "Derivative function and value",
        question: "If f′(x) = 3x², what is f′(2)?",
        steps: [
          "Substitute x = 2.",
          "3(2²)=12.",
        ],
        answer: "f′(2)=12.",
      },
    ],
    exercises: [
      {
        question: "What is the difference between f′(x) and f′(4)?",
        answer: "f′(x) is a function of x; f′(4) is one particular derivative value.",
      },
      {
        question: "A volume V changes with time t. Which notation makes the variables explicit?",
        answer: "dV/dt.",
      },
      {
        question: "Interpret T′(6) = -1.5 when T is temperature in °C and time is hours.",
        answer: "At 6 hours, temperature is decreasing at about 1.5°C per hour.",
      },
    ],
    quiz: [
      {
        question: "Which notation means derivative of y with respect to x?",
        options: [
          "y/x",
          "dy/dx",
          "yx",
          "x/y",
        ],
        correctIndex: 1,
        explanation: "Leibniz notation makes variables explicit.",
      },
      {
        question: "If f′(x) is a derivative function, f′(5) is...",
        options: [
          "A single derivative value",
          "Always zero",
          "The original function",
          "An integral",
        ],
        correctIndex: 0,
        explanation: "It is the local slope at x=5.",
      },
      {
        question: "The phrase 'with respect to time' identifies...",
        options: [
          "The output unit only",
          "The independent variable of differentiation",
          "The maximum value",
          "A constant",
        ],
        correctIndex: 1,
        explanation: "It identifies the differentiation input variable.",
      },
    ],
    summary: [
      "Prime and Leibniz notation express derivatives in different ways.",
      "A derivative function gives slopes across inputs; an evaluated derivative gives one slope.",
      "Leibniz notation makes variables explicit.",
      "Interpretations should include direction, units and context.",
    ],
    nextStep: "Next, we estimate derivatives when no derivative formula is available.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m3-l4-derivatives",
    title: "Estimating derivatives from data and graphs",
    subtitle: "Real problems often require derivative estimates rather than exact formulas.",
    estimatedMinutes: 28,
    objectives: [
      "Estimate a derivative from nearby tabulated values.",
      "Estimate derivative sign and magnitude from a graph.",
      "Use symmetric differences for improved local estimates.",
      "Recognise limitations of derivative estimates from noisy data.",
    ],
    content: [
      {
        type: "paragraph",
        text: "In many applications we do not know an exact formula. Instead, we may have a graph or measurements at selected inputs. The derivative can then be estimated using nearby rates of change.",
      },
      {
        type: "heading",
        text: "From a table",
      },
      {
        type: "paragraph",
        text: "A balanced estimate uses points on both sides: [f(a + h) - f(a - h)] / (2h). This is called a symmetric difference.",
      },
      {
        type: "heading",
        text: "From a graph",
      },
      {
        type: "paragraph",
        text: "Draw or imagine the tangent at the target point. Choose two convenient points on that tangent and estimate rise over run.",
      },
      {
        type: "callout",
        title: "Data are not exact curves",
        text: "Measurement noise can make very small intervals unstable. Smaller is not always better when the data themselves are noisy.",
      },
    ],
    workedExamples: [
      {
        title: "Central difference",
        question: "A table gives f(1.9)=3.61 and f(2.1)=4.41. Estimate f′(2).",
        steps: [
          "Use points equally spaced around 2.",
          "Output change=0.80.",
          "Input change=0.20.",
          "0.80/0.20=4.",
        ],
        answer: "f′(2) is approximately 4.",
      },
      {
        title: "Graphical slope",
        question: "A tangent appears to pass through (2,3) and (6,11). Estimate the derivative.",
        steps: [
          "Rise=8.",
          "Run=4.",
          "Slope=2.",
        ],
        answer: "The derivative is approximately 2.",
      },
    ],
    exercises: [
      {
        question: "Using f(2.9)=8.41 and f(3.1)=9.61, estimate f′(3).",
        answer: "(9.61-8.41)/(3.1-2.9)=6.",
      },
      {
        question: "Why label graph-based slopes approximate?",
        answer: "Graphs have limited visual precision.",
      },
      {
        question: "Why can a tiny interval be problematic with noisy measurements?",
        answer: "Measurement errors can become large relative to the tiny input difference.",
      },
    ],
    quiz: [
      {
        question: "Which estimate uses points on both sides of a?",
        options: [
          "f(a) only",
          "[f(a+h)-f(a-h)]/(2h)",
          "f(a+h)+f(a-h)",
          "2f(a)",
        ],
        correctIndex: 1,
        explanation: "The symmetric difference uses equally spaced points on both sides.",
      },
      {
        question: "From a graph, derivative magnitude corresponds most directly to...",
        options: [
          "height only",
          "tangent steepness",
          "x-intercept count",
          "area under the graph",
        ],
        correctIndex: 1,
        explanation: "Derivative is tangent slope.",
      },
      {
        question: "Why report graph-based derivatives as approximate?",
        options: [
          "Derivatives are never exact",
          "Graphs have finite visual precision",
          "All slopes are irrational",
          "Limits cannot be drawn",
        ],
        correctIndex: 1,
        explanation: "Coordinate reading introduces approximation.",
      },
    ],
    summary: [
      "Derivatives can be estimated from nearby data.",
      "A symmetric difference gives a balanced local estimate.",
      "Graphical derivative estimates use tangent slope.",
      "Noise limits the usefulness of extremely small intervals.",
    ],
    nextStep: "Module 4 develops rules that let us differentiate important functions directly.",
  },
];
