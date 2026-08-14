import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   MODULE 05 — DERIVATIVE APPLICATIONS
   ========================================================================== */

export const calculusFoundationsModule05:
  LessonContent[] = [

  {
    courseSlug: "calculus-foundations",
    lessonKey: "m5-l1-derivative-applications",
    title: "Increasing, decreasing and stationary points",
    subtitle: "The derivative turns a graph into a map of local behaviour.",
    estimatedMinutes: 30,
    objectives: [
      "Use derivative sign to identify increasing and decreasing intervals.",
      "Find stationary points by solving f′(x)=0.",
      "Construct a derivative sign chart.",
      "Distinguish stationary points from guaranteed extrema.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Once we can differentiate a function, we can analyse its behaviour without plotting every point. The sign of f′(x) tells us whether the original function is rising or falling.",
      },
      {
        type: "bullets",
        items: [
          "f′(x)>0: f is increasing locally.",
          "f′(x)<0: f is decreasing locally.",
          "f′(x)=0: f has a stationary point or horizontal tangent.",
        ],
      },
      {
        type: "heading",
        text: "Finding stationary points",
      },
      {
        type: "paragraph",
        text: "Stationary points occur where f′(x)=0. Solve this equation for x, then substitute into f to obtain coordinates.",
      },
      {
        type: "heading",
        text: "Sign charts",
      },
      {
        type: "paragraph",
        text: "A derivative sign chart divides the x-axis at critical values and tests the sign of f′ in each interval.",
      },
      {
        type: "callout",
        title: "Stationary does not automatically mean maximum or minimum",
        text: "A stationary point can be a maximum, a minimum or neither. The derivative sign change tells us which.",
      },
    ],
    workedExamples: [
      {
        title: "Cubic behaviour",
        question: "For f(x)=x³-3x, find stationary x-values.",
        steps: [
          "f′(x)=3x²-3.",
          "Set equal to zero.",
          "x²=1.",
          "x=±1.",
        ],
        answer: "The stationary x-values are -1 and 1.",
      },
      {
        title: "Sign chart",
        question: "For f′(x)=x-2, where is f increasing?",
        steps: [
          "f′<0 when x<2.",
          "f′=0 at x=2.",
          "f′>0 when x>2.",
        ],
        answer: "f is increasing for x>2.",
      },
    ],
    exercises: [
      {
        question: "If f′(x) is negative on (0,4), how does f behave there?",
        answer: "f is decreasing on (0,4).",
      },
      {
        question: "Find the stationary x-value for f(x)=x²-6x.",
        answer: "f′=2x-6=0 gives x=3.",
      },
      {
        question: "Why is solving f′=0 not enough to classify a stationary point?",
        answer: "Zero derivative only identifies a horizontal tangent; sign behaviour around the point determines the type.",
      },
    ],
    quiz: [
      {
        question: "If f′ changes from negative to positive at x=a, what usually happens?",
        options: [
          "Local maximum",
          "Local minimum",
          "Vertical asymptote",
          "No change",
        ],
        correctIndex: 1,
        explanation: "The function decreases then increases.",
      },
      {
        question: "Stationary points satisfy...",
        options: [
          "f(x)=0 always",
          "f′(x)=0",
          "f′(x)=1",
          "f(x)=f′(x)",
        ],
        correctIndex: 1,
        explanation: "A stationary point has a horizontal tangent.",
      },
      {
        question: "If f′>0 on an interval, f is...",
        options: [
          "increasing",
          "decreasing",
          "constant",
          "undefined",
        ],
        correctIndex: 0,
        explanation: "Positive derivative means increasing.",
      },
    ],
    summary: [
      "Derivative sign identifies increasing and decreasing behaviour.",
      "Stationary points solve f′(x)=0.",
      "Sign charts classify local behaviour.",
      "A stationary point is not automatically an extremum.",
    ],
    nextStep: "Next, we use derivative sign changes to classify maxima, minima and curve shape.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m5-l2-derivative-applications",
    title: "Maxima, minima and curve shape",
    subtitle: "Derivative sign changes reveal turning points and the overall structure of a graph.",
    estimatedMinutes: 30,
    objectives: [
      "Classify local maxima and minima using sign changes.",
      "Use the second derivative as a curvature indicator.",
      "Identify concave-up and concave-down behaviour.",
      "Connect first- and second-derivative information to graph shape.",
    ],
    content: [
      {
        type: "paragraph",
        text: "A local maximum occurs when a function changes from increasing to decreasing. A local minimum occurs when it changes from decreasing to increasing.",
      },
      {
        type: "curve-behaviour-explorer",
        title: "Curve Behaviour Explorer",
        description: "Explore f(x)=x³-3x. Move along the curve and compare f, f′ and f″ to see how slope and curvature describe shape.",
      },
      {
        type: "heading",
        text: "First derivative test",
      },
      {
        type: "bullets",
        items: [
          "f′ changes + to −: local maximum.",
          "f′ changes − to +: local minimum.",
          "No sign change: stationary point but not a turning extremum.",
        ],
      },
      {
        type: "heading",
        text: "Second derivative and curvature",
      },
      {
        type: "paragraph",
        text: "The second derivative f″ measures how the first derivative changes. When f″>0, slopes are increasing and the graph is concave up. When f″<0, slopes are decreasing and the graph is concave down.",
      },
      {
        type: "callout",
        title: "Second derivative test",
        text: "At a stationary point, f″>0 suggests a local minimum and f″<0 suggests a local maximum. If f″=0, the test is inconclusive.",
      },
    ],
    workedExamples: [
      {
        title: "Classify a quadratic",
        question: "For f(x)=x²-4x+1, classify the stationary point.",
        steps: [
          "f′=2x-4, so x=2.",
          "f″=2.",
          "Positive second derivative means concave up.",
        ],
        answer: "The point at x=2 is a local minimum.",
      },
      {
        title: "Maximum from second derivative",
        question: "For f(x)=-x²+6x, classify the stationary point.",
        steps: [
          "f′=-2x+6=0 gives x=3.",
          "f″=-2.",
          "Negative second derivative means concave down.",
        ],
        answer: "The point at x=3 is a local maximum.",
      },
    ],
    exercises: [
      {
        question: "What does f″>0 indicate about curvature?",
        answer: "The graph is concave up; tangent slopes are increasing.",
      },
      {
        question: "If f′ changes from positive to negative, what type of point occurs?",
        answer: "A local maximum.",
      },
      {
        question: "If f″(a)=0 at a stationary point, can you classify it using the second derivative test alone?",
        answer: "No. The test is inconclusive.",
      },
    ],
    quiz: [
      {
        question: "A derivative changes from − to + at x=a. What occurs?",
        options: [
          "Local maximum",
          "Local minimum",
          "No stationary point",
          "Vertical tangent always",
        ],
        correctIndex: 1,
        explanation: "Decreasing then increasing gives a local minimum.",
      },
      {
        question: "If f″(a)<0 at a stationary point, the point is typically...",
        options: [
          "a local minimum",
          "a local maximum",
          "an x-intercept",
          "undefined",
        ],
        correctIndex: 1,
        explanation: "Negative second derivative means local concave-down shape.",
      },
      {
        question: "Concave up corresponds to...",
        options: [
          "f″>0",
          "f″<0",
          "f′=0 everywhere",
          "f=0",
        ],
        correctIndex: 0,
        explanation: "Positive second derivative means increasing slopes.",
      },
    ],
    summary: [
      "First-derivative sign changes classify maxima and minima.",
      "The second derivative describes curvature.",
      "f″>0 means concave up; f″<0 means concave down.",
      "Second-derivative sign can often classify a stationary point.",
    ],
    nextStep: "Next, we turn derivative analysis into a practical optimisation method.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m5-l3-derivative-applications",
    title: "Optimisation problems",
    subtitle: "Optimisation translates real constraints into functions whose extrema answer practical questions.",
    estimatedMinutes: 34,
    objectives: [
      "Translate an optimisation context into an objective function.",
      "Use constraints to reduce a problem to one variable.",
      "Find candidate extrema using derivatives.",
      "Check that an optimum is meaningful within the feasible domain.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Optimisation problems ask for the largest or smallest possible value of a quantity: maximum area, minimum cost, shortest time, largest volume and many others.",
      },
      {
        type: "heading",
        text: "A reliable workflow",
      },
      {
        type: "bullets",
        items: [
          "Identify the quantity to maximise or minimise.",
          "Write an objective function.",
          "Use constraints to express the objective in one variable.",
          "Differentiate and solve f′(x)=0.",
          "Classify candidates and check endpoints or domain restrictions.",
          "State the answer in context with units.",
        ],
      },
      {
        type: "callout",
        title: "The modelling step matters",
        text: "Differentiation is often the easy part. The challenge is translating the context into a correct objective function.",
      },
      {
        type: "heading",
        text: "Feasible domain",
      },
      {
        type: "paragraph",
        text: "A mathematical critical point may be impossible in context. Lengths must be positive and resource constraints may restrict allowable inputs.",
      },
    ],
    workedExamples: [
      {
        title: "Maximum rectangle area",
        question: "A rectangle has perimeter 20 m. Find dimensions that maximise area.",
        steps: [
          "Let width be x and length 10-x.",
          "A=x(10-x)=10x-x².",
          "A′=10-2x=0 gives x=5.",
          "The length is also 5.",
        ],
        answer: "The maximum-area rectangle is 5 m by 5 m.",
      },
      {
        title: "Minimum quadratic cost",
        question: "C(x)=x²-8x+30 for x≥0. Find its minimum.",
        steps: [
          "C′=2x-8=0 gives x=4.",
          "C″=2>0.",
          "C(4)=14.",
        ],
        answer: "The minimum value is 14 at x=4.",
      },
    ],
    exercises: [
      {
        question: "Why should endpoints be checked in a constrained optimisation problem?",
        answer: "A global optimum on a closed interval can occur at an endpoint.",
      },
      {
        question: "A rectangle has area A(x)=x(12-x). Find the critical x-value.",
        answer: "A′=12-2x=0 gives x=6.",
      },
      {
        question: "What should be done after finding a mathematical optimum?",
        answer: "Check that it lies in the feasible domain and interpret it with units.",
      },
    ],
    quiz: [
      {
        question: "What is the first modelling step in optimisation?",
        options: [
          "Differentiate immediately",
          "Identify the quantity to optimise",
          "Assume x=0",
          "Draw only a graph",
        ],
        correctIndex: 1,
        explanation: "You need a clear objective before applying calculus.",
      },
      {
        question: "Why reduce to one variable when possible?",
        options: [
          "To use one-variable derivatives efficiently",
          "Because two variables are illegal",
          "To avoid units",
          "To force a maximum",
        ],
        correctIndex: 0,
        explanation: "Constraints can eliminate variables.",
      },
      {
        question: "A critical point outside the feasible domain is...",
        options: [
          "automatically the answer",
          "not a valid contextual solution",
          "always a maximum",
          "always a minimum",
        ],
        correctIndex: 1,
        explanation: "Contextual constraints determine admissible solutions.",
      },
    ],
    summary: [
      "Optimisation begins with a well-defined objective.",
      "Constraints help express the objective in one variable.",
      "Derivatives identify interior candidates.",
      "Endpoints and domain restrictions must be checked.",
      "Answers should be stated in context with units.",
    ],
    nextStep: "Next, we apply derivatives to motion, where position, velocity and acceleration form a natural hierarchy.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m5-l4-derivative-applications",
    title: "Motion, velocity and acceleration",
    subtitle: "Successive derivatives connect position, velocity and acceleration.",
    estimatedMinutes: 30,
    objectives: [
      "Relate position, velocity and acceleration through derivatives.",
      "Interpret signs of velocity and acceleration.",
      "Determine when a particle is stationary.",
      "Distinguish speed from velocity.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Motion is one of the clearest applications of derivatives. If s(t) describes position, then its derivative gives velocity and the derivative of velocity gives acceleration.",
      },
      {
        type: "bullets",
        items: [
          "Position: s(t).",
          "Velocity: v(t)=s′(t).",
          "Acceleration: a(t)=v′(t)=s″(t).",
          "Speed: |v(t)|, the magnitude of velocity.",
        ],
      },
      {
        type: "heading",
        text: "Direction and sign",
      },
      {
        type: "paragraph",
        text: "Positive velocity means motion in the positive coordinate direction; negative velocity means the opposite. Zero velocity means momentarily stationary.",
      },
      {
        type: "heading",
        text: "Acceleration and speeding up",
      },
      {
        type: "paragraph",
        text: "An object speeds up when velocity and acceleration have the same sign, and slows down when they have opposite signs.",
      },
      {
        type: "callout",
        title: "Common misconception",
        text: "Negative acceleration does not always mean slowing down. If velocity is also negative, speed can increase.",
      },
    ],
    workedExamples: [
      {
        title: "Polynomial motion",
        question: "A particle has s(t)=t³-6t²+9t. Find velocity and acceleration.",
        steps: [
          "Differentiate position: v=3t²-12t+9.",
          "Differentiate velocity: a=6t-12.",
        ],
        answer: "v(t)=3t²-12t+9 and a(t)=6t-12.",
      },
      {
        title: "Stationary times",
        question: "For v(t)=3t²-12t+9, when is the particle stationary?",
        steps: [
          "Set v=0.",
          "Divide by 3.",
          "Factor t²-4t+3=(t-1)(t-3).",
        ],
        answer: "At t=1 and t=3.",
      },
    ],
    exercises: [
      {
        question: "If v=-4 m/s and a=-2 m/s², is speed increasing or decreasing?",
        answer: "Increasing, because velocity and acceleration have the same sign.",
      },
      {
        question: "What is speed when velocity is -7 m/s?",
        answer: "7 m/s.",
      },
      {
        question: "If s(t)=5t², find v(t) and a(t).",
        answer: "v=10t and a=10.",
      },
    ],
    quiz: [
      {
        question: "Velocity is the derivative of...",
        options: [
          "acceleration",
          "position",
          "speed only",
          "time",
        ],
        correctIndex: 1,
        explanation: "v=s′.",
      },
      {
        question: "Acceleration is...",
        options: [
          "s′",
          "v′",
          "|v|",
          "position divided by time only",
        ],
        correctIndex: 1,
        explanation: "Acceleration is the derivative of velocity.",
      },
      {
        question: "When velocity and acceleration have opposite signs, speed is generally...",
        options: [
          "increasing",
          "decreasing",
          "always zero",
          "undefined",
        ],
        correctIndex: 1,
        explanation: "Opposite signs reduce velocity magnitude.",
      },
    ],
    summary: [
      "Velocity is the derivative of position.",
      "Acceleration is the derivative of velocity and second derivative of position.",
      "Speed is the magnitude of velocity.",
      "Sign combinations determine whether speed rises or falls.",
    ],
    nextStep: "Module 6 shifts from rates of change to accumulation and area.",
  },
];
