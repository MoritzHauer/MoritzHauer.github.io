# MoritzHauer.github.io

Personal site and blog. Astro 5, no UI framework, no Tailwind — the CSS is one file.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Content and logic

Personal content is kept apart from the site logic. To make the site yours, edit only these:

| Path | What |
|---|---|
| `src/data/profile.ts` | Name, links, intro text, contact text, projects. |
| `src/data/timeline.ts` | Career steps, side projects, topic icons for posts. |
| `src/data/cv.ts` | Experience entries, tech stack, CV download list, certificates (also drawn on the timeline, behind their own legend switch). |
| `src/blog/*.md` | Blog posts. |
| `public/logos/` | Logos and images referenced by the data files; `tech/` holds the stack icons ([simple-icons](https://simpleicons.org), CC0). |
| `public/cv/` | CV PDFs. A download button appears only for files listed in `cv.ts` that exist here. |
| `public/certificates/` | Certificate PDFs. A certificate links to its PDF only once the file exists here. |

Everything else, including `public/theme/`, is logic and design.

## Structure

| Path | What |
|---|---|
| `src/styles/global.css` | The entire design system. One token block per theme (nature, river, `</dev>`) at the top. |
| `src/layouts/Base.astro` | Head, header with the theme switch, footer. Every page uses it. |
| `src/pages/index.astro` | Home: intro, path timeline, projects, contact, latest three posts. |
| `src/components/Timeline.astro` | The path timeline: road, scenery, point spacing, label placement, previews. |
| `src/components/Icon.astro` | Inline SVG icons. |
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

This is a **user page**: the repository is named `MoritzHauer.github.io`, so the site is served
at `https://MoritzHauer.github.io` with no base path. Nothing else needs configuring in
`astro.config.mjs`.

One-time setup in the repository: **Settings → Pages → Source → GitHub Actions**.

Internal links are built from `import.meta.env.BASE_URL` rather than hard-coded, so moving this
to a project page later only means adding `base: '/<repo-name>'` to `astro.config.mjs`.
