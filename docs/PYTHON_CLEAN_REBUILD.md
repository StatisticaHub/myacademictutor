# Python for Data Analysis — Clean Live-Coding Rebuild

This rebuild replaces the live-code layer rather than continuing to patch individual errors.

## What is rebuilt

- 56 runnable code examples: rewritten to be self-contained
- 32 lesson coding challenges: rewritten
- challenge checking: redesigned from multiline hidden Python scripts to independent Boolean expressions
- worker runtime: rebuilt with fresh namespaces
- Matplotlib: worker-safe Agg rendering
- data: purpose-specific clean, dirty, relational, time-series and visualisation datasets
- error handling: compact learner-readable messages instead of giant Pyodide traces
- persistence, reset, restart and live figures retained

## Why Check answer is safer

The old system executed one extra hidden Python program after learner code. If that hidden program referenced a missing object or returned a NumPy Boolean, the learner could see a large traceback.

The new system evaluates each check independently. A failing check becomes a failed test row; it does not crash the entire checker.

## Validation performed before packaging

- 56/56 rebuilt example snippets compiled and executed locally against the matching teaching datasets
- 32/32 supplied challenge solutions executed
- every challenge test expression passed against its supplied solution
- worker JavaScript syntax checked
- component TSX syntax transpiled with TypeScript
- installer shell syntax checked

The course remains `draft` until a final browser smoke test is completed.
