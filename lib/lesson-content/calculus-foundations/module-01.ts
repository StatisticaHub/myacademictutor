import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   MODULE 01 — FUNCTIONS AND CHANGE
   ========================================================================== */

export const calculusFoundationsModule01:
  LessonContent[] = [

  /* ========================================================================
     LESSON 01
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m1-l1-functions-and-change",

    title:
      "Functions as relationships",

    subtitle:
      "Calculus begins by describing how one quantity changes with another.",

    estimatedMinutes:
      24,


    objectives: [
      "Explain a function as a rule that connects an input to exactly one output.",
      "Recognise functions represented by formulas, tables, graphs and verbal descriptions.",
      "Identify independent and dependent variables in a context.",
      "Interpret function notation such as f(x) in words.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Calculus is the mathematics of change and accumulation. Before we can study how something changes, we need a precise way to describe the relationship between quantities. That is the role of a function.",
      },


      {
        type:
          "callout",

        title:
          "Core idea",

        text:
          "A function takes an input and assigns it exactly one output. It is a relationship, not merely a formula.",
      },


      {
        type:
          "heading",

        text:
          "Inputs, outputs and dependence",
      },


      {
        type:
          "paragraph",

        text:
          "Suppose the total cost of buying cinema tickets depends on how many tickets you buy. If each ticket costs £8, then the number of tickets is the input and the total cost is the output. We could describe the relationship by C(n) = 8n.",
      },


      {
        type:
          "paragraph",

        text:
          "The notation C(n) means 'the value of the function C when the input is n'. It does not mean C multiplied by n. If n = 4, then C(4) = 8 × 4 = 32, so four tickets cost £32.",
      },


      {
        type:
          "bullets",

        items: [
          "Input — the quantity we choose, control or observe first.",
          "Output — the quantity determined by the input.",
          "Independent variable — another name often used for the input.",
          "Dependent variable — the output, because its value depends on the input.",
        ],
      },


      {
        type:
          "heading",

        text:
          "A function can appear in several forms",
      },


      {
        type:
          "paragraph",

        text:
          "Functions are often written as equations, but that is only one representation. The same relationship can be communicated through a table, a graph, a verbal rule or a computer program.",
      },


      {
        type:
          "bullets",

        items: [
          "Formula: f(x) = x² + 1.",
          "Table: a list of x-values and corresponding f(x)-values.",
          "Graph: points whose coordinates are (x, f(x)).",
          "Words: 'take a number, square it, then add one'.",
        ],
      },


      {
        type:
          "callout",

        title:
          "Why this matters for calculus",

        text:
          "Later, derivatives will tell us how quickly the output of a function changes when its input changes. Integrals will tell us how small changes accumulate.",
      },


      {
        type:
          "heading",

        text:
          "What makes a relation a function?",
      },


      {
        type:
          "paragraph",

        text:
          "For every allowed input, a function must give exactly one output. Different inputs may share the same output, but one input cannot produce two different outputs at the same time.",
      },


      {
        type:
          "paragraph",

        text:
          "For example, y = x² is a function because every x has one squared value. The relation 'x is the square root of y' can require more care because a positive y may have two possible square roots unless we specify which branch we mean.",
      },

    ],


    workedExamples: [

      {
        title:
          "Temperature conversion",

        question:
          "The Celsius temperature C is converted to Fahrenheit using F(C) = 1.8C + 32. Interpret F(20).",

        steps: [
          "The input is a Celsius temperature.",
          "The output is the corresponding Fahrenheit temperature.",
          "Substitute C = 20 into the function.",
          "F(20) = 1.8 × 20 + 32 = 68.",
        ],

        answer:
          "F(20) = 68 means that 20°C corresponds to 68°F.",
      },


      {
        title:
          "Distance travelled",

        question:
          "A cyclist travels at a constant speed of 15 km/h. If d(t) = 15t, what do the variables mean and what is d(2.5)?",

        steps: [
          "The input t represents time in hours.",
          "The output d(t) represents distance in kilometres.",
          "Substitute t = 2.5.",
          "d(2.5) = 15 × 2.5 = 37.5.",
        ],

        answer:
          "After 2.5 hours, the cyclist has travelled 37.5 km.",
      },

    ],


    exercises: [

      {
        question:
          "A streaming service charges £6 per month plus £2 for each film rented. Write a function C(f) for the monthly cost when f films are rented.",

        hint:
          "Separate the fixed charge from the amount that depends on f.",

        answer:
          "C(f) = 6 + 2f.",
      },


      {
        question:
          "For f(x) = 3x - 5, calculate f(4) and explain what the notation means.",

        answer:
          "f(4) = 3(4) - 5 = 7. The notation means the output of the function f when the input is 4.",
      },


      {
        question:
          "Why is the rule 'each person is assigned all of their possible heights during adulthood' not a function from person to height?",

        answer:
          "A single person could be associated with more than one output height. A function requires exactly one output for each input.",
      },

    ],


    quiz: [

      {
        question:
          "Which statement best describes a function?",

        options: [
          "A formula containing x and y.",
          "A rule assigning each allowed input exactly one output.",
          "A graph that must be a straight line.",
          "Any list of numerical values.",
        ],

        correctIndex:
          1,

        explanation:
          "A function is defined by the input-output relationship. It does not have to be linear or even be presented as a formula.",
      },


      {
        question:
          "If f(x) = x² + 3, what is f(2)?",

        options: [
          "4",
          "5",
          "7",
          "10",
        ],

        correctIndex:
          2,

        explanation:
          "f(2) = 2² + 3 = 4 + 3 = 7.",
      },


      {
        question:
          "In the model d(t) = 60t for a car travelling at constant speed, what is the dependent variable?",

        options: [
          "Time t",
          "The number 60",
          "Distance d(t)",
          "The unit hours",
        ],

        correctIndex:
          2,

        explanation:
          "Distance depends on the time travelled, so d(t) is the dependent variable.",
      },

    ],


    summary: [
      "A function assigns every allowed input exactly one output.",
      "Functions can be represented by formulas, tables, graphs or words.",
      "Function notation such as f(x) describes the output associated with input x.",
      "Calculus studies how function outputs change and how changes accumulate.",
    ],


    nextStep:
      "Next, we learn how to read the behaviour of a function directly from its graph.",
  },


  /* ========================================================================
     LESSON 02
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m1-l2-functions-and-change",

    title:
      "Reading and interpreting graphs",

    subtitle:
      "A graph turns a function into a picture of behaviour and change.",

    estimatedMinutes:
      26,


    objectives: [
      "Interpret coordinates on the graph of a function.",
      "Identify intercepts and intervals where a function increases or decreases.",
      "Distinguish between the value of a function and the way the function is changing.",
      "Use graphs to describe a relationship in context.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "A formula can tell us exactly how a function is calculated, but a graph often reveals its behaviour more quickly. Calculus relies heavily on graphs because change can be seen geometrically through slopes, steepness, turning points and accumulated area.",
      },


      {
        type:
          "heading",

        text:
          "Every point tells a story",
      },


      {
        type:
          "paragraph",

        text:
          "A point (x, y) on the graph of y = f(x) means that when the input is x, the output is y. Equivalently, y = f(x). If the point (3, 7) lies on the graph, then f(3) = 7.",
      },


      {
        type:
          "callout",

        title:
          "Read coordinates before shape",

        text:
          "A graph is not just a picture. Horizontal position represents the input; vertical position represents the corresponding output.",
      },


      {
        type:
          "heading",

        text:
          "Intercepts",
      },


      {
        type:
          "paragraph",

        text:
          "The y-intercept occurs where x = 0. It tells us the output at the starting input zero. An x-intercept occurs where f(x) = 0, so the graph crosses or touches the horizontal axis.",
      },


      {
        type:
          "paragraph",

        text:
          "In applications, intercepts can have useful meanings. A y-intercept might represent an initial amount, fixed charge or starting position. An x-intercept might represent a break-even point, the time when an amount reaches zero or a solution to an equation.",
      },


      {
        type:
          "heading",

        text:
          "Increasing and decreasing",
      },


      {
        type:
          "paragraph",

        text:
          "A function is increasing over an interval when larger x-values correspond to larger function values. It is decreasing when the outputs fall as x increases.",
      },


      {
        type:
          "paragraph",

        text:
          "Notice the language: increasing and decreasing describe what happens as we move from left to right. They do not simply describe whether the function values themselves are positive or negative.",
      },


      {
        type:
          "callout",

        title:
          "Common misconception",

        text:
          "A function can be negative and still be increasing. For example, a graph may rise from -10 to -2. The outputs remain negative, but they are increasing.",
      },


      {
        type:
          "heading",

        text:
          "Value versus change",
      },


      {
        type:
          "paragraph",

        text:
          "This distinction is fundamental in calculus. The height of a graph tells us the value of the function. The steepness of the graph tells us something about how rapidly that value is changing.",
      },


      {
        type:
          "bullets",

        items: [
          "High on the graph does not necessarily mean increasing quickly.",
          "Low on the graph does not necessarily mean decreasing.",
          "A horizontal section has little or no change even if its function value is large.",
          "A steep upward section represents rapid positive change.",
          "A steep downward section represents rapid negative change.",
        ],
      },

    ],


    workedExamples: [

      {
        title:
          "Water in a tank",

        question:
          "A graph shows the volume V(t) of water in a tank. From t = 0 to 5 minutes the graph rises, from 5 to 8 minutes it is horizontal, and after 8 minutes it falls. Interpret the three stages.",

        steps: [
          "A rising graph means the volume increases with time.",
          "A horizontal graph means the volume stays constant.",
          "A falling graph means the volume decreases.",
          "Translate each graphical behaviour back into the physical context.",
        ],

        answer:
          "The tank is filling from 0 to 5 minutes, its volume is unchanged from 5 to 8 minutes, and it is draining after 8 minutes.",
      },


      {
        title:
          "Interpreting an intercept",

        question:
          "A taxi fare is modelled by C(d) = 3.5 + 1.8d, where d is distance in kilometres. What does the y-intercept mean?",

        steps: [
          "The y-intercept occurs when d = 0.",
          "C(0) = 3.5.",
          "The customer pays this amount before any distance-dependent charge is added.",
        ],

        answer:
          "The y-intercept £3.50 represents the fixed starting fare.",
      },

    ],


    exercises: [

      {
        question:
          "A graph passes through (2, 9). What does this tell you about f(2)?",

        answer:
          "It tells us f(2) = 9.",
      },


      {
        question:
          "A function rises from -6 to -1 as x increases. Is the function increasing or decreasing?",

        answer:
          "It is increasing because the function values become larger as x increases, even though the values are still negative.",
      },


      {
        question:
          "A population graph is horizontal for several years. What does that say about the rate of change of the population over that period?",

        answer:
          "The population has zero rate of change over that interval because its value is constant.",
      },

    ],


    quiz: [

      {
        question:
          "What does an x-intercept of a graph y = f(x) represent?",

        options: [
          "A point where x = 0.",
          "A point where f(x) = 0.",
          "The maximum value of f.",
          "The steepest part of the graph.",
        ],

        correctIndex:
          1,

        explanation:
          "At an x-intercept the vertical coordinate is zero, so f(x) = 0.",
      },


      {
        question:
          "Which statement is correct?",

        options: [
          "If f(x) is negative, the function must be decreasing.",
          "If a graph is high, its rate of change must be large.",
          "A horizontal graph has zero rate of change.",
          "Every increasing function must cross the x-axis.",
        ],

        correctIndex:
          2,

        explanation:
          "A horizontal section has no change in output as the input changes, so its rate of change is zero.",
      },


      {
        question:
          "Moving left to right, a graph falls from y = 8 to y = 3. How should its behaviour be described?",

        options: [
          "Increasing",
          "Decreasing",
          "Constant",
          "Undefined",
        ],

        correctIndex:
          1,

        explanation:
          "The output becomes smaller as x increases, so the function is decreasing.",
      },

    ],


    summary: [
      "A point (x, y) on a function graph means y = f(x).",
      "Intercepts often have useful contextual interpretations.",
      "Increasing and decreasing describe how outputs behave as x moves from left to right.",
      "Function value and rate of change are different ideas.",
      "Graph steepness prepares us for the calculus idea of slope.",
    ],


    nextStep:
      "Next, we put a number on change by calculating average rate of change.",
  },


  /* ========================================================================
     LESSON 03
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m1-l3-functions-and-change",

    title:
      "Average rate of change",

    subtitle:
      "Change becomes measurable when we compare differences in output with differences in input.",

    estimatedMinutes:
      30,


    objectives: [
      "Calculate average rate of change over an interval.",
      "Interpret average rate of change in context and with units.",
      "Connect average rate of change to the slope of a secant line.",
      "Explain how interval width affects what an average rate tells us.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Suppose a car travels 120 kilometres in two hours. Saying that its average speed was 60 km/h gives us more information than simply reporting the total distance. We have compared a change in distance with the change in time over which it occurred.",
      },


      {
        type:
          "callout",

        title:
          "Average rate of change",

        text:
          "Average rate of change = change in output ÷ change in input.",
      },


      {
        type:
          "paragraph",

        text:
          "For a function f over the interval from x = a to x = b, the average rate of change is [f(b) - f(a)] / (b - a). The numerator measures the vertical change and the denominator measures the horizontal change.",
      },


      {
        type:
          "heading",

        text:
          "The Δ notation",
      },


      {
        type:
          "paragraph",

        text:
          "The Greek capital letter delta, Δ, is commonly used to mean 'change in'. We can therefore write average rate of change as Δy / Δx. This is not a new formula; it is simply compact notation for vertical change divided by horizontal change.",
      },


      {
        type:
          "heading",

        text:
          "A geometric interpretation",
      },


      {
        type:
          "paragraph",

        text:
          "Choose two points on the graph of a function. Draw the straight line connecting them. This is called a secant line. Its slope is exactly the average rate of change of the function between those two input values.",
      },


      {
        type:
          "secant-slope-explorer",

        title:
          "Secant Slope Explorer",

        description:
          "Move the base point and interval width for f(x) = x². Watch how the secant slope changes as the second point moves closer to the first.",
      },


      {
        type:
          "heading",

        text:
          "Units matter",
      },


      {
        type:
          "paragraph",

        text:
          "A rate inherits units from output divided by input. If distance is measured in kilometres and time in hours, the rate is kilometres per hour. If temperature is measured in degrees Celsius and altitude in kilometres, the rate is degrees Celsius per kilometre.",
      },


      {
        type:
          "callout",

        title:
          "Interpret, do not just calculate",

        text:
          "A rate of change should usually be reported with its sign, units and meaning in context.",
      },


      {
        type:
          "heading",

        text:
          "The interval matters",
      },


      {
        type:
          "paragraph",

        text:
          "Average rate of change summarises an entire interval using one number. On a curved graph, different intervals can have very different average rates. A wide interval gives a broad summary; a narrow interval gives a more local description.",
      },

    ],


    workedExamples: [

      {
        title:
          "Quadratic function",

        question:
          "For f(x) = x², find the average rate of change from x = 1 to x = 4.",

        steps: [
          "Calculate the two function values: f(1) = 1 and f(4) = 16.",
          "Find the output change: 16 - 1 = 15.",
          "Find the input change: 4 - 1 = 3.",
          "Divide: 15 / 3 = 5.",
        ],

        answer:
          "The average rate of change is 5 units of output per unit of input.",
      },


      {
        title:
          "Population growth",

        question:
          "A town's population rises from 24,000 to 27,600 over six years. Find and interpret the average rate of change.",

        steps: [
          "Population change = 27,600 - 24,000 = 3,600 people.",
          "Time change = 6 years.",
          "Average rate = 3,600 / 6 = 600 people per year.",
          "Interpret this as an average across the entire six-year interval.",
        ],

        answer:
          "The population increased at an average rate of 600 people per year over the six years.",
      },

    ],


    exercises: [

      {
        question:
          "For f(x) = 3x + 2, calculate the average rate of change from x = 2 to x = 7.",

        hint:
          "Calculate f(2) and f(7), then divide the output difference by 7 - 2.",

        answer:
          "f(2) = 8 and f(7) = 23. The average rate is (23 - 8) / 5 = 3.",
      },


      {
        question:
          "A temperature falls from 18°C to 6°C over four hours. What is the average rate of change?",

        answer:
          "The change is 6 - 18 = -12°C over 4 hours, so the average rate is -3°C per hour.",
      },


      {
        question:
          "Why might an average speed of 50 km/h fail to describe what a vehicle was doing at one particular moment?",

        answer:
          "The average combines behaviour over an interval. The vehicle could have travelled faster, slower or even stopped at particular moments while still having an average of 50 km/h.",
      },

    ],


    quiz: [

      {
        question:
          "For a function f, what does [f(b) - f(a)] / (b - a) represent?",

        options: [
          "The value of f at b.",
          "The average rate of change from a to b.",
          "The maximum value of f.",
          "The x-intercept of f.",
        ],

        correctIndex:
          1,

        explanation:
          "The expression divides the output change by the input change across the interval from a to b.",
      },


      {
        question:
          "Geometrically, average rate of change is the slope of which line?",

        options: [
          "A vertical line",
          "A tangent line at one point",
          "A secant line through two points",
          "The x-axis",
        ],

        correctIndex:
          2,

        explanation:
          "A secant line connects the two points used to define the interval, and its slope is the average rate of change.",
      },


      {
        question:
          "A quantity decreases by 20 units over 5 seconds. What is its average rate of change?",

        options: [
          "4 units/s",
          "-4 units/s",
          "15 units/s",
          "-25 units/s",
        ],

        correctIndex:
          1,

        explanation:
          "The output change is -20 and the input change is 5, so the rate is -20 / 5 = -4 units per second.",
      },

    ],


    summary: [
      "Average rate of change compares output change with input change.",
      "For f from a to b, the rate is [f(b) - f(a)] / (b - a).",
      "The same quantity is the slope of the secant line through the two endpoints.",
      "Rates should be interpreted with sign, units and context.",
      "Narrower intervals begin to describe more local behaviour.",
    ],


    nextStep:
      "Next, we ask the key question that leads to calculus: what happens when the interval becomes extremely small?",
  },


  /* ========================================================================
     LESSON 04
     ======================================================================== */

  {
    courseSlug:
      "calculus-foundations",

    lessonKey:
      "m1-l4-functions-and-change",

    title:
      "From average change to instantaneous change",

    subtitle:
      "The central leap of calculus is to move from change over an interval to change at a moment.",

    estimatedMinutes:
      30,


    objectives: [
      "Explain why average rate of change does not necessarily describe behaviour at one instant.",
      "Describe how secant slopes can approach a tangent slope.",
      "Use shrinking intervals to motivate instantaneous rate of change.",
      "Connect instantaneous change to the idea of a derivative without relying on formal limit notation yet.",
    ],


    content: [

      {
        type:
          "paragraph",

        text:
          "Average rate of change answers a useful question: how much did the output change per unit input across an interval? But many real questions are more local. What is a car's speed right now? How quickly is a population growing at this moment? How steep is a curve at one particular point?",
      },


      {
        type:
          "heading",

        text:
          "Why one point is difficult",
      },


      {
        type:
          "paragraph",

        text:
          "Slope normally requires two points because we calculate vertical change divided by horizontal change. If we try to use the same point twice, both changes are zero and we obtain 0/0, which is undefined.",
      },


      {
        type:
          "paragraph",

        text:
          "Calculus solves this problem indirectly. Instead of using the same point twice, we use a second nearby point and then move it closer and closer to the first.",
      },


      {
        type:
          "callout",

        title:
          "The calculus strategy",

        text:
          "Do not calculate change over a zero-width interval. Study what the average rate approaches as the interval width tends toward zero.",
      },


      {
        type:
          "heading",

        text:
          "Secant lines become tangent lines",
      },


      {
        type:
          "paragraph",

        text:
          "For a curved graph, a secant line joins two distinct points. As the second point approaches the first, the secant line often settles toward a limiting position. That limiting line is the tangent line, and its slope represents the instantaneous rate of change.",
      },


      {
        type:
          "paragraph",

        text:
          "Return to the Secant Slope Explorer from the previous lesson. Keep the base point fixed and make the interval width smaller. For f(x) = x² at x = 2, the secant slope approaches 4. That value is the instantaneous rate of change of x² at x = 2.",
      },


      {
        type:
          "heading",

        text:
          "A numerical view",
      },


      {
        type:
          "paragraph",

        text:
          "For f(x) = x² at x = 2, compare the point x = 2 with nearby points. Using x = 3 gives a secant slope of 5. Using x = 2.5 gives 4.5. Using x = 2.1 gives 4.1. Using x = 2.01 gives 4.01. The values suggest that the slope is approaching 4.",
      },


      {
        type:
          "bullets",

        items: [
          "Wide interval: useful average, but not very local.",
          "Narrow interval: better description near the chosen point.",
          "Interval shrinking toward zero: secant slope may approach a stable value.",
          "That limiting slope motivates the instantaneous rate of change.",
        ],
      },


      {
        type:
          "heading",

        text:
          "The derivative is coming",
      },


      {
        type:
          "paragraph",

        text:
          "The derivative is the mathematical object that formalises instantaneous rate of change. We are not yet ready for its full definition because we first need a precise language for 'approaches'. That language is the theory of limits, which is the focus of the next module.",
      },


      {
        type:
          "callout",

        title:
          "Module connection",

        text:
          "Functions describe relationships. Average rates describe change across intervals. Limits let intervals shrink in a controlled way. Derivatives capture instantaneous change.",
      },

    ],


    workedExamples: [

      {
        title:
          "Approaching the slope at x = 1",

        question:
          "For f(x) = x², compute the average rate of change from x = 1 to x = 1.5, then from x = 1 to x = 1.1. What seems to be happening?",

        steps: [
          "From 1 to 1.5: [2.25 - 1] / 0.5 = 2.5.",
          "From 1 to 1.1: [1.21 - 1] / 0.1 = 2.1.",
          "The second interval is narrower and its secant slope is closer to 2.",
          "Further shrinking would produce values such as 2.01 and 2.001.",
        ],

        answer:
          "The secant slopes appear to approach 2, suggesting an instantaneous slope of 2 at x = 1.",
      },


      {
        title:
          "Average speed versus speedometer reading",

        question:
          "Why can a speedometer show an instantaneous speed even though the usual speed formula uses a distance interval divided by a time interval?",

        steps: [
          "Average speed uses distance change over a non-zero time interval.",
          "To describe speed at one moment, measurements can be taken over very short intervals.",
          "As the interval becomes smaller, those average speeds approximate the instantaneous speed more closely.",
          "Calculus formalises the ideal limiting value.",
        ],

        answer:
          "Instantaneous speed is understood as the limiting value approached by average speeds over shorter and shorter time intervals.",
      },

    ],


    exercises: [

      {
        question:
          "For f(x) = x² at x = 3, the secant slope from x = 3 to x = 3.1 is 6.1 and from x = 3 to x = 3.01 is 6.01. What instantaneous slope do these values suggest?",

        answer:
          "They suggest an instantaneous slope of 6.",
      },


      {
        question:
          "Why can we not simply substitute the same x-value into both endpoints of the average-rate formula?",

        answer:
          "The denominator becomes zero because the input change is zero, giving an undefined 0/0 expression. Calculus instead studies the value approached as the second point moves toward the first.",
      },


      {
        question:
          "Describe in words the difference between a secant line and a tangent line.",

        answer:
          "A secant line passes through two distinct points on a curve and represents average change across an interval. A tangent line represents the limiting local direction of the curve at a point and is associated with instantaneous change.",
      },

    ],


    quiz: [

      {
        question:
          "What happens to a secant line when its second point moves toward the first point on a smooth curve?",

        options: [
          "Its slope must become zero.",
          "It can approach the tangent line at the first point.",
          "It becomes vertical in every case.",
          "It stops representing any rate of change.",
        ],

        correctIndex:
          1,

        explanation:
          "For a smooth function, shrinking the interval can make the secant line approach the tangent line.",
      },


      {
        question:
          "Why is instantaneous rate of change not obtained by directly setting b = a in [f(b) - f(a)] / (b - a)?",

        options: [
          "The numerator becomes too large.",
          "The function becomes linear.",
          "The denominator becomes zero.",
          "The graph loses its intercepts.",
        ],

        correctIndex:
          2,

        explanation:
          "If b = a, both numerator and denominator are zero. Calculus instead asks what the quotient approaches as b approaches a.",
      },


      {
        question:
          "Which mathematical idea will allow us to define 'approaches' precisely?",

        options: [
          "Averages",
          "Limits",
          "Histograms",
          "Matrices",
        ],

        correctIndex:
          1,

        explanation:
          "Limits provide the rigorous language needed to describe values approached as an input or interval changes.",
      },

    ],


    summary: [
      "Average rates describe change across non-zero intervals.",
      "Instantaneous change concerns behaviour at a particular input.",
      "Secant slopes over shrinking intervals can approach a tangent slope.",
      "The derivative will formalise instantaneous rate of change.",
      "Limits are the next tool needed to make the idea of 'approaching' precise.",
    ],


    nextStep:
      "Module 2 develops limits, the language that turns this intuitive idea into rigorous calculus.",
  },

];
