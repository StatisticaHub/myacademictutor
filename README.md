# My Academic Tutor — Premium Rebuild

A complete new Next.js App Router website for **My Academic Tutor**, centred on five core disciplines:

- Statistics
- Mathematics
- Data Science
- Bioinformatics
- Computer Science

The platform is organised by subject, learning level, course and pathway, with tutoring and interactive learning integrated into the same product.

## What is already included

- Premium responsive homepage
- Full desktop mega-menu + mobile navigation
- All five subject landing pages
- High School / Undergraduate / Postgraduate / Learn-for-yourself routes for every subject
- Complete course catalogue and data-driven individual course pages
- Career / academic pathway catalogue and pathway pages
- Interactive Labs page
- 1-to-1 Tutoring page
- Resource library
- Pricing page
- About + academic integrity section
- Contact form using a safe mail client fallback
- Search across subjects, courses and pathways
- Learner dashboard UI
- 404 page
- SEO metadata, sitemap and robots file
- Your supplied My Academic Tutor logo
- Responsive design system with no external UI framework

## Local setup

Requirements: Node.js 20.9+ is recommended for modern Next.js.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## GitHub

```bash
git init
git add .
git commit -m "Complete My Academic Tutor premium rebuild"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Vercel

1. Push the repository to GitHub.
2. In Vercel choose **Add New → Project**.
3. Import the GitHub repository.
4. Vercel will detect Next.js automatically.
5. Add environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://www.myacademictutor.com`
6. Deploy.
7. Add `myacademictutor.com` and `www.myacademictutor.com` under the Vercel project Domains settings.
8. Follow the DNS records Vercel shows for your registrar.

## Before taking payments or collecting production learner data

The visual/product architecture is complete, but these integrations intentionally require your final business choices:

- authentication provider (e.g. Clerk/Auth.js/Supabase)
- database / learner progress storage
- payment provider and final pricing
- scheduling provider for tutoring
- transactional email provider
- final legally reviewed Privacy Policy / Terms / Refund policy
- analytics and cookie-consent configuration

The repository has been designed so these can be added without redesigning the public site.

## Content editing

Most structured course/subject/pathway content lives in:

`lib/data.ts`

Adding a new course there automatically makes it available to the catalogue and dynamic course route.

## Logo

Your uploaded logo is stored at:

`public/logo.png`
