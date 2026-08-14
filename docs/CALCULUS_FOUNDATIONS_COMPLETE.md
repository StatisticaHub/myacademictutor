# Calculus Foundations — Complete Course

## Course structure

### Module 1 — Functions and change
1. Functions as relationships
2. Reading and interpreting graphs
3. Average rate of change
4. From average change to instantaneous change

Interactive lab: **Secant Slope Explorer**

### Module 2 — Limits
5. Approaching a value
6. Estimating limits from graphs and tables
7. Limit laws and algebraic techniques
8. Continuity and discontinuities

Interactive lab: **Limit Explorer**

### Module 3 — Derivatives
9. The derivative as a rate of change
10. The derivative as the slope of a tangent
11. Derivative notation and interpretation
12. Estimating derivatives from data and graphs

Interactive lab: **Tangent Line Explorer**

### Module 4 — Rules of differentiation
13. Power, constant and sum rules
14. Product and quotient rules
15. The chain rule
16. Differentiating exponential and trigonometric functions

Interactive lab: **Chain Rule Builder**

### Module 5 — Derivative applications
17. Increasing, decreasing and stationary points
18. Maxima, minima and curve shape
19. Optimisation problems
20. Motion, velocity and acceleration

Interactive lab: **Curve Behaviour Explorer**

### Module 6 — Integrals
21. Accumulation and area
22. Antiderivatives and indefinite integrals
23. Definite integrals
24. Basic techniques and interpreting signed area

Interactive lab: **Riemann Sum Explorer**

### Module 7 — The Fundamental Theorem of Calculus
25. Connecting derivatives and integrals
26. The Fundamental Theorem of Calculus
27. Using accumulation functions
28. A complete calculus problem-solving workflow

Interactive lab: **FTC Connection Explorer**

## Formal assessment

- Module 1 checkpoint — 8 questions
- Module 2 checkpoint — 8 questions
- Module 3 checkpoint — 8 questions
- Module 4 checkpoint — 10 questions
- Module 5 checkpoint — 8 questions
- Module 6 checkpoint — 8 questions
- Module 7 checkpoint — 8 questions
- Final cumulative assessment — 24 questions
- Passing threshold — 70%

**Total formal assessment bank: 82 questions.**

The existing assessment runner continues to grade server-side and save every
attempt to `assessment_attempts`.

## Completion

Formal completion requires:

1. all 28 lessons complete
2. all seven module checkpoints passed
3. final assessment passed

Certificate eligibility is enabled after those conditions are satisfied.

## Publication

The course intentionally remains:

```ts
status: "draft"
```

This means it remains available in local development but hidden from the public
production deployment by the publication-control system.

Only change it to:

```ts
status: "published"
```

after the final QA checklist passes.

## Final QA before publishing

- clean `npm run build`
- `audit-calculus-complete.mjs`
- `audit-course-engine.mjs`
- all seven interactive labs checked
- all seven checkpoints tested
- final assessment tested
- dashboard Continue flow checked from beginning to completion
- completion page checked
- certificate PDF checked
- public certificate verification checked
- production-mode draft protection checked
- route/link/content audits checked
- mobile layout checked
