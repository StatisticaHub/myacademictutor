# Course Publication Control

My Academic Tutor has three course publication states.

## `published`

A fully available learner course.

- appears in public course discovery
- public course page is available
- can be enrolled in
- lessons and assessments are accessible
- can be indexed by search engines
- can participate in completion and certificate logic

Example:

```ts
status: "published"
```

`Statistics Foundations` uses this state.

---

## `catalogue`

A public course concept that exists in `lib/data.ts` but does not yet have a
published learner runtime.

- appears in public course discovery
- public course information page is available
- cannot be enrolled in
- lesson runtime is inaccessible
- assessment runtime is inaccessible
- may be indexed
- course page offers interest/contact rather than enrolment

The legacy course adapter uses this state by default.

---

## `draft`

A course actively under development.

- visible in local `next dev`
- can be enrolled in locally for testing
- lessons and assessments work locally
- never indexable
- hidden on the public production deployment
- direct public production course URLs resolve as unavailable/not found

Example:

```ts
status: "draft"
```

`Calculus Foundations` stays in this state until all required content and
assessment work is complete.

---

# Previewing a draft in a production-like deployment

Local development automatically enables draft preview.

If a separate preview deployment needs access to drafts, set the **server-only**
environment variable:

```env
COURSE_PREVIEW_MODE=true
```

Do **not** set this on the public production deployment.

---

# Publishing a course

A course should only move from `draft` to `published` after:

1. all intended modules and lessons are authored
2. interactive labs render correctly
3. module checkpoints exist
4. final assessment exists if required
5. course completion policy is correct
6. certificate policy is correct
7. build passes
8. route/link/content audits pass
9. mobile and accessibility QA pass
10. production smoke test passes

Publishing then becomes a deliberate one-line engine change:

```ts
status: "published"
```

Identifiers such as the course slug, lesson keys and assessment keys must remain
stable after learners begin using the course.
