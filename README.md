# MoritzHauer.github.io

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

This is a **user page**: the repository is named `MoritzHauer.github.io`, so the site is served
at `https://MoritzHauer.github.io` with no base path. Nothing else needs configuring in
`astro.config.mjs`.

One-time setup in the repository: **Settings → Pages → Source → GitHub Actions**.

Internal links are built from `import.meta.env.BASE_URL` rather than hard-coded, so moving this
to a project page later only means adding `base: '/<repo-name>'` to `astro.config.mjs`.
