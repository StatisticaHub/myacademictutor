# Statistics Foundations - Final Production QA

Use this after the certificate migration, installer and build all succeed.

## 1. Authentication and access

- Logged-out learner cannot download a certificate.
- Logged-out learner cannot open the private completion page.
- Learner who is enrolled but incomplete cannot open `/courses/statistics-foundations/complete`.
- Learner who is incomplete receives 403 from `/courses/statistics-foundations/certificate`.
- A completed learner can access both completion and PDF routes.

## 2. Learning progression

- Continue starts at the first incomplete lesson.
- A module checkpoint remains locked until every lesson in that module is complete.
- After a module checkpoint is passed, Continue advances into the next module.
- Final assessment stays locked until 26/26 lessons and 7/7 checkpoints are complete.
- Passing the final assessment changes the course to Complete.

## 3. Assessment persistence

- Failed attempts remain in Supabase.
- A later higher score becomes Previous best.
- A passed checkpoint remains passed after a later failed retake.
- Final assessment pass remains recorded after refresh.

## 4. Certificate issuance

- Only a completed learner gets a row in `public.certificates`.
- Reopening the completion page does not generate a second certificate.
- `certificate_code` is stable after issuance.
- Certificate learner name matches `profiles.full_name`.
- Certificate course title is correct.
- Completion date is sensible.
- Best passed final-assessment percentage is shown.
- PDF downloads successfully.
- PDF filename is readable.

## 5. Public verification

- `/certificate/<valid-code>` shows Valid certificate.
- Verification reveals learner name, course, completion date, score and issue date only.
- Verification does not expose user UUID, email or assessment answers.
- A made-up code returns Not verified.
- A revoked certificate does not show as valid.

## 6. PDF visual QA

Check the downloaded certificate at desktop size and when printed:

- Logo renders.
- Learner name is not clipped.
- Course title is not clipped.
- Completion date is correct.
- Certificate ID is legible.
- Verification URL is legible.
- No unexpected black boxes or missing glyphs.
- Landscape A4 proportions look balanced.

## 7. Mobile UI

Test approximately 390 px width:

- Dashboard course requirements stack correctly.
- Completion card remains readable.
- Download and Verify buttons do not overflow.
- Verification details stack correctly.
- No horizontal page scrolling.

## 8. Production build

Run:

```bash
node scripts/audit-certificate-setup.mjs
npm run build
```

Then run any existing project audits:

```bash
node scripts/audit-routes.mjs
node scripts/audit-links.mjs
node scripts/audit-content.mjs
```

## 9. Production deployment smoke test

After deploying:

1. Sign in using a test learner.
2. Open Dashboard.
3. Confirm course progress.
4. Complete or use an already-completed course.
5. Open completion page.
6. Download PDF.
7. Copy certificate ID.
8. Sign out.
9. Open public verification URL in a private/incognito window.
10. Confirm it verifies without revealing private account data.
