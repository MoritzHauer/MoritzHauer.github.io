# personal-site

Personal site and blog. Astro 5, no UI framework, no Tailwind — the CSS is one file.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Structure

| Path | What |
|---|---|
| `src/styles/global.css` | The entire design system. Tokens at the top; change colours there. |
| `src/layouts/Base.astro` | Head, header, footer. Every page uses it. |
| `src/pages/index.astro` | Home: intro, work, projects, focus, contact, latest three posts. |
| `src/pages/blog/` | Blog index and post template. |
| `src/blog/*.md` | Posts. Add a file, it appears — no registration step. |
| `src/content.config.ts` | Frontmatter schema. A post missing a field fails the build, on purpose. |
| `src/lib/posts.ts` | Draft filtering, shared by every page that lists posts. |

## Adding a post

Create `src/blog/my-post.md`:

```markdown
---
title: "Title"
date: 2026-09-01
description: "One sentence — shown in the list and as the meta description."
tags: ["optional"]
draft: false
---

Body in markdown.
```

The URL is the filename: `/blog/my-post`.

**`draft` defaults to `true`.** Drafts appear in `npm run dev` and are excluded from
`npm run build`, so an unfinished post cannot ship by accident.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. In the repository settings, set **Pages → Source** to **GitHub Actions**.
2. In `astro.config.mjs`, set `site` to `https://<your-user>.github.io`.

This is configured as a **project page**, served at `https://<your-user>.github.io/personal-site`,
so `base` is set to `/personal-site`. Internal links are built from `import.meta.env.BASE_URL`,
so they follow the base automatically — do not hard-code `/blog`.

For a **user page** at `https://<your-user>.github.io` instead, rename the repository to
`<your-user>.github.io` and remove the `base` line.
