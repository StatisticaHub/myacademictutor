# My Academic Tutor — Course Engine

Stage 6 moves course progression into a central engine without changing the
database schema.

## What is now centralised

Each fully authored course can define:

- course slug / title / subject / level
- modules
- stable lesson keys
- lesson titles
- optional lab identifiers
- module checkpoint keys
- final assessment key
- completion rules
- certificate eligibility

The learner runtime then derives:

- lesson navigation
- module navigation
- completed lesson counts
- checkpoint counts
- final-assessment lock/ready/passed state
- next required learning action
- course completion
- certificate eligibility

## Existing catalogue courses

Courses that exist in `lib/data.ts` but do not yet have a registered engine
definition use a compatibility adapter. They do **not** automatically gain
formal checkpoint, final-assessment, or certificate requirements.

## Statistics Foundations

Statistics Foundations is the first fully registered course. Its 26 stable
lesson keys remain based on module slugs, preserving progress rows already
stored in Supabase.

Progression remains:

Module lessons
→ module checkpoint
→ next module
→ final assessment
→ completion
→ certificate

## Creating Course 2

Example:

```bash
node scripts/create-course-engine.mjs calculus-foundations
```

The command:

1. reads the course metadata already present in `lib/data.ts`
2. creates `lib/course-engine/courses/calculus-foundations.ts`
3. registers it in `lib/course-engine/courses/index.ts`
4. distributes the catalogue lesson count across its modules
5. gives every lesson a stable key
6. deliberately leaves lesson titles as `TODO`

Then author the actual lesson titles/content before changing `status` to
`published`.

Do **not** enable checkpoint/final/certificate requirements until their
assessment content exists.

## Important invariant

Once learners have started a course, do not casually change:

- course slug
- module key
- lesson key
- assessment key

Those values are persistence identifiers in Supabase.

Titles and explanatory content can change; identifiers should remain stable.
