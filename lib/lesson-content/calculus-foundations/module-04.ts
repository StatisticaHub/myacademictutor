import type {
  LessonContent,
} from "../types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   MODULE 04 — RULES OF DIFFERENTIATION
   ========================================================================== */

export const calculusFoundationsModule04:
  LessonContent[] = [

  {
    courseSlug: "calculus-foundations",
    lessonKey: "m4-l1-rules-of-differentiation",
    title: "Power, constant and sum rules",
    subtitle: "Basic derivative rules turn repeated limit calculations into efficient tools.",
    estimatedMinutes: 30,
    objectives: [
      "Differentiate constants and power functions.",
      "Apply constant-multiple and sum rules.",
      "Differentiate polynomials term by term.",
      "Check derivative results using qualitative graph behaviour.",
    ],
    content: [
      {
        type: "paragraph",
        text: "The derivative definition explains what a derivative means, but using the limit definition every time would be inefficient. Differentiation rules package repeated patterns into reliable shortcuts.",
      },
      {
        type: "heading",
        text: "Constant rule",
      },
      {
        type: "paragraph",
        text: "A constant function does not change, so its derivative is zero. If f(x)=7, then f′(x)=0.",
      },
      {
        type: "heading",
        text: "Power rule",
      },
      {
        type: "callout",
        title: "Power rule",
        text: "For f(x)=xⁿ, the derivative is f′(x)=n xⁿ⁻¹.",
      },
      {
        type: "paragraph",
        text: "The exponent moves to the front as a multiplier, then decreases by one. For x⁵, the derivative is 5x⁴. For x², it is 2x.",
      },
      {
        type: "heading",
        text: "Constant multiples and sums",
      },
      {
        type: "paragraph",
        text: "Constants multiply derivatives, and sums can be differentiated term by term. Therefore the derivative of 4x³ - 2x + 7 is 12x² - 2.",
      },
      {
        type: "callout",
        title: "Reasonableness check",
        text: "Differentiation usually lowers polynomial degree by one.",
      },
    ],
    workedExamples: [
      {
        title: "Differentiate a polynomial",
        question: "Differentiate f(x)=3x⁴-5x²+8x-6.",
        steps: [
          "3x⁴ becomes 12x³.",
          "-5x² becomes -10x.",
          "8x becomes 8.",
          "The constant becomes 0.",
        ],
        answer: "f′(x)=12x³-10x+8.",
      },
      {
        title: "Evaluate a derivative",
        question: "If f(x)=x³+2x², find f′(2).",
        steps: [
          "f′(x)=3x²+4x.",
          "Substitute x=2.",
          "12+8=20.",
        ],
        answer: "f′(2)=20.",
      },
    ],
    exercises: [
      {
        question: "Differentiate 6x⁵-3x+9.",
        answer: "30x⁴-3.",
      },
      {
        question: "Differentiate x⁷.",
        answer: "7x⁶.",
      },
      {
        question: "If f(x)=2x²+4, find f′(3).",
        answer: "f′(x)=4x, so f′(3)=12.",
      },
    ],
    quiz: [
      {
        question: "What is the derivative of a constant?",
        options: [
          "The same constant",
          "1",
          "0",
          "x",
        ],
        correctIndex: 2,
        explanation: "A constant function has no change.",
      },
      {
        question: "Differentiate x⁶.",
        options: [
          "x⁵",
          "6x⁵",
          "5x⁶",
          "6x⁶",
        ],
        correctIndex: 1,
        explanation: "Power rule gives 6x⁵.",
      },
      {
        question: "Differentiate 2x³+5x.",
        options: [
          "6x²+5",
          "2x²+5",
          "6x³+5",
          "6x²",
        ],
        correctIndex: 0,
        explanation: "Differentiate term by term.",
      },
    ],
    summary: [
      "Constants differentiate to zero.",
      "The power rule sends xⁿ to n xⁿ⁻¹.",
      "Constant multiples remain as multipliers.",
      "Sums and differences are differentiated term by term.",
    ],
    nextStep: "Next, we handle products and quotients of functions.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m4-l2-rules-of-differentiation",
    title: "Product and quotient rules",
    subtitle: "Products and quotients require rules that account for both changing factors.",
    estimatedMinutes: 32,
    objectives: [
      "Apply the product rule.",
      "Apply the quotient rule.",
      "Choose between expanding first and using a formal rule.",
      "Simplify derivative expressions responsibly.",
    ],
    content: [
      {
        type: "paragraph",
        text: "The derivative of a product is not generally the product of the derivatives. Both factors change, so both contributions must be included.",
      },
      {
        type: "callout",
        title: "Product rule",
        text: "If y=u(x)v(x), then y′=u′v+uv′.",
      },
      {
        type: "heading",
        text: "Why two terms appear",
      },
      {
        type: "paragraph",
        text: "A small change in the product comes partly from u changing while v is present, and partly from v changing while u is present.",
      },
      {
        type: "heading",
        text: "Quotient rule",
      },
      {
        type: "callout",
        title: "Quotient rule",
        text: "If y=u/v, then y′=(u′v-uv′)/v², provided v≠0.",
      },
      {
        type: "heading",
        text: "Sometimes simplify first",
      },
      {
        type: "paragraph",
        text: "If an expression can be expanded or simplified easily, doing so before differentiating may be shorter. For example, x(x²+3)=x³+3x.",
      },
    ],
    workedExamples: [
      {
        title: "Product rule",
        question: "Differentiate y=x²(x+4).",
        steps: [
          "u=x², v=x+4.",
          "u′=2x, v′=1.",
          "y′=2x(x+4)+x².",
          "Simplify.",
        ],
        answer: "y′=3x²+8x.",
      },
      {
        title: "Quotient rule",
        question: "Differentiate y=(x²+1)/x.",
        steps: [
          "u=x²+1, u′=2x.",
          "v=x, v′=1.",
          "y′=[2x(x)-(x²+1)]/x².",
          "Simplify numerator.",
        ],
        answer: "y′=(x²-1)/x².",
      },
    ],
    exercises: [
      {
        question: "Differentiate (x+1)x².",
        answer: "x²+2x(x+1)=3x²+2x.",
      },
      {
        question: "Differentiate (2x+3)/x.",
        answer: "[2x-(2x+3)]/x²=-3/x².",
      },
      {
        question: "Why is d(uv)/dx not simply u′v′?",
        answer: "Because changes in each factor contribute separately, producing u′v+uv′.",
      },
    ],
    quiz: [
      {
        question: "What is the product rule?",
        options: [
          "u′v′",
          "u′v+uv′",
          "u/v",
          "u′+v′",
        ],
        correctIndex: 1,
        explanation: "The derivative of uv is u′v+uv′.",
      },
      {
        question: "In the quotient rule, what is the denominator?",
        options: [
          "v",
          "v′",
          "v²",
          "u²",
        ],
        correctIndex: 2,
        explanation: "The denominator is v².",
      },
      {
        question: "When might expanding before differentiating be sensible?",
        options: [
          "When expansion is simple and reduces complexity",
          "Never",
          "Only for constants",
          "Only for trigonometric functions",
        ],
        correctIndex: 0,
        explanation: "Simplification can make differentiation shorter.",
      },
    ],
    summary: [
      "The product rule is u′v+uv′.",
      "The quotient rule is (u′v-uv′)/v².",
      "Products do not generally differentiate by multiplying derivatives.",
      "Simplifying first can sometimes be more efficient.",
    ],
    nextStep: "Next, we differentiate composite functions using the chain rule.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m4-l3-rules-of-differentiation",
    title: "The chain rule",
    subtitle: "Composite functions require us to account for nested layers of change.",
    estimatedMinutes: 34,
    objectives: [
      "Identify inner and outer functions in a composition.",
      "Apply the chain rule to powers of functions.",
      "Use derivative notation to express nested rates.",
      "Explain the chain rule as multiplication of linked rates.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Many functions are built in layers. In (3x+1)⁵, one function raises something to the fifth power and another produces the inside quantity 3x+1. Differentiating the outside alone misses the inner rate of change.",
      },
      {
        type: "callout",
        title: "Chain rule",
        text: "Differentiate the outer function, keep the inner expression, then multiply by the derivative of the inner function.",
      },
      {
        type: "chain-rule-builder",
        title: "Chain Rule Builder",
        description: "Choose an outer power and inner linear function. See the composite function and its derivative built layer by layer.",
      },
      {
        type: "heading",
        text: "Layer language",
      },
      {
        type: "paragraph",
        text: "For y=[g(x)]ⁿ, the derivative is n[g(x)]ⁿ⁻¹g′(x). The factor g′(x) is essential because the inner input may itself change faster or slower than x.",
      },
      {
        type: "heading",
        text: "Rates through a chain",
      },
      {
        type: "paragraph",
        text: "If y changes with u and u changes with x, then dy/dx=(dy/du)(du/dx). Linked local rates multiply.",
      },
      {
        type: "callout",
        title: "Common mistake",
        text: "Do not stop after differentiating the outer layer. Always ask how the inside is changing.",
      },
    ],
    workedExamples: [
      {
        title: "Power of a linear function",
        question: "Differentiate y=(4x-1)³.",
        steps: [
          "Outer derivative: 3(4x-1)².",
          "Inner derivative: 4.",
          "Multiply.",
        ],
        answer: "y′=12(4x-1)².",
      },
      {
        title: "Nested square",
        question: "Differentiate y=(x²+2)⁴.",
        steps: [
          "Outer derivative: 4(x²+2)³.",
          "Inner derivative: 2x.",
          "Multiply.",
        ],
        answer: "y′=8x(x²+2)³.",
      },
    ],
    exercises: [
      {
        question: "Differentiate (5x+2)⁶.",
        answer: "30(5x+2)⁵.",
      },
      {
        question: "Differentiate (x³-1)².",
        answer: "6x²(x³-1).",
      },
      {
        question: "Why is the inner derivative needed?",
        answer: "Because the inner quantity may change at a rate different from 1 with respect to x.",
      },
    ],
    quiz: [
      {
        question: "Differentiate (2x+1)⁴.",
        options: [
          "4(2x+1)³",
          "8(2x+1)³",
          "8(2x+1)⁴",
          "2(2x+1)³",
        ],
        correctIndex: 1,
        explanation: "Outer derivative times inner derivative 2.",
      },
      {
        question: "The chain rule is especially needed for...",
        options: [
          "constant functions",
          "composite functions",
          "single numbers",
          "tables only",
        ],
        correctIndex: 1,
        explanation: "It differentiates nested functions.",
      },
      {
        question: "If dy/du=5 and du/dx=3, dy/dx is...",
        options: [
          "2",
          "8",
          "15",
          "5/3",
        ],
        correctIndex: 2,
        explanation: "Linked local rates multiply.",
      },
    ],
    summary: [
      "The chain rule handles composite functions.",
      "Differentiate the outer layer and multiply by the derivative of the inner layer.",
      "For [g(x)]ⁿ, the derivative is n[g(x)]ⁿ⁻¹g′(x).",
      "The chain rule expresses multiplication of linked local rates.",
    ],
    nextStep: "Next, we extend differentiation to exponential and trigonometric functions.",
  },
  {
    courseSlug: "calculus-foundations",
    lessonKey: "m4-l4-rules-of-differentiation",
    title: "Differentiating exponential and trigonometric functions",
    subtitle: "Several important functions have elegant derivative patterns.",
    estimatedMinutes: 32,
    objectives: [
      "Differentiate eˣ, sin x and cos x.",
      "Combine basic transcendental derivatives with the chain rule.",
      "Interpret radians as the natural angle unit for calculus.",
      "Differentiate simple sums involving polynomial, exponential and trigonometric terms.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Many important functions have simple derivative rules. Three foundational examples are eˣ, sin x and cos x.",
      },
      {
        type: "bullets",
        items: [
          "d/dx(eˣ)=eˣ.",
          "d/dx(sin x)=cos x.",
          "d/dx(cos x)=-sin x.",
        ],
      },
      {
        type: "heading",
        text: "Why radians matter",
      },
      {
        type: "paragraph",
        text: "The clean trigonometric derivative rules assume angles are measured in radians, the natural unit connecting circular geometry to rates of change.",
      },
      {
        type: "heading",
        text: "Modified inputs use the chain rule",
      },
      {
        type: "paragraph",
        text: "For e^(3x), the derivative is 3e^(3x). Similarly, d/dx sin(2x)=2cos(2x).",
      },
      {
        type: "callout",
        title: "Sign to remember",
        text: "The derivative of cos x is -sin x. The negative sign is essential.",
      },
    ],
    workedExamples: [
      {
        title: "Mixed function",
        question: "Differentiate f(x)=x³+2eˣ-5sin x.",
        steps: [
          "x³ becomes 3x².",
          "2eˣ becomes 2eˣ.",
          "-5sin x becomes -5cos x.",
        ],
        answer: "f′(x)=3x²+2eˣ-5cos x.",
      },
      {
        title: "Chain rule with sine",
        question: "Differentiate y=sin(4x).",
        steps: [
          "Outer derivative is cos.",
          "Keep 4x.",
          "Multiply by inner derivative 4.",
        ],
        answer: "y′=4cos(4x).",
      },
    ],
    exercises: [
      {
        question: "Differentiate e^(2x).",
        answer: "2e^(2x).",
      },
      {
        question: "Differentiate cos(3x).",
        answer: "-3sin(3x).",
      },
      {
        question: "Differentiate x²+sin x.",
        answer: "2x+cos x.",
      },
    ],
    quiz: [
      {
        question: "What is d/dx(eˣ)?",
        options: [
          "1",
          "xe^(x-1)",
          "eˣ",
          "ln x",
        ],
        correctIndex: 2,
        explanation: "eˣ is its own derivative.",
      },
      {
        question: "What is d/dx(cos x)?",
        options: [
          "sin x",
          "-sin x",
          "cos x",
          "-cos x",
        ],
        correctIndex: 1,
        explanation: "Cosine differentiates to negative sine.",
      },
      {
        question: "Differentiate sin(5x).",
        options: [
          "cos(5x)",
          "5cos(5x)",
          "-5sin(5x)",
          "5sin(5x)",
        ],
        correctIndex: 1,
        explanation: "Use the chain rule.",
      },
    ],
    summary: [
      "eˣ differentiates to itself.",
      "sin x differentiates to cos x.",
      "cos x differentiates to -sin x.",
      "Modified inputs require the chain rule.",
      "Trigonometric derivative rules use radians.",
    ],
    nextStep: "Module 5 uses derivatives to analyse curves, optimise quantities and model motion.",
  },
];
