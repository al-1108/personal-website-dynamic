# Alex Lu — personal site

Personal site for Alex Lu. Next.js app router, Tailwind, and Supabase for content.

## Running locally

```sh
npm install
npm run dev
```

Create `.env.local` with the Supabase project URL and anon key:

```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

## Where things live

- `app/page.jsx` – home page; reads every section from Supabase on each request
- `app/experience/page.jsx` – full experience list
- `app/blogs/[slug]/page.jsx` – blog post; paragraphs split on blank lines, media is an image or a YouTube Short
- `app/components/` – header, footer, section wrapper, theme toggle, mobile nav
- `app/globals.css` – colour tokens for the light and dark themes
- `app/api/keep-alive/` – pinged daily by a Vercel cron so the free Supabase project stays awake
- `supabase/migrations/` – schema changes

## Content tables

`welcome`, `education`, `skills`, `experiences`, `projects`, `blogs`. Images referenced by these rows live in `public/images/`.
