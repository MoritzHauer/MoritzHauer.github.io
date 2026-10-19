# Personal site template

A forkable personal site and blog. Astro 5, no UI framework, no Tailwind — the CSS is one file.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Content and logic

Personal content is kept apart from the site logic. To make the site yours, edit only these:

| Path | What |
|---|---|
| `astro.config.mjs` | `site`: your GitHub Pages URL, used for canonical links. |
| `src/data/profile.ts` | Name, links, intro text, contact text, projects. |
| `src/data/timeline.ts` | Career steps, side projects, topic icons for posts. |
| `src/data/cv.ts` | Experience entries, tech stack, CV download list, certificates (also drawn on the timeline, behind their own legend switch). |
| `src/blog/*.md` | Blog posts. |
| `public/logos/` | Logos and images referenced by the data files; `tech/` holds the stack icons ([simple-icons](https://simpleicons.org), CC0). |
| `public/cv/` | CV PDFs. A download button appears only for files listed in `cv.ts` that exist here. |
| `public/certificates/` | Certificate PDFs. A certificate links to its PDF only once the file exists here. |

Everything else, including the theme sprites, is logic and design. The template uses a neutral
sailboat for the river theme; the `personal` branch keeps the original site's mascot.

The code and neutral examples on `main` are MIT-licensed. Real personal content on the
`personal` branch is not. See the LICENSE on each branch.

## Structure

| Path | What |
|---|---|
| `src/styles/global.css` | The entire design system. One token block per theme (nature, river, `</dev>`) at the top. |
| `src/themes/` | Theme list and default (`index.ts`), timeline scenery per theme (`scenery.ts`), the sprite that follows the mouse (`Sprites.astro`). A new theme touches these and its token block in `global.css`. |
| `src/layouts/Base.astro` | Head, header with the theme switch, footer. Every page uses it. |
| `src/pages/index.astro` | Home: intro, path timeline, projects, contact, latest three posts. |
| `src/components/Timeline.astro` | The path timeline: road, point spacing, label placement, previews. Scenery comes from `src/themes/`. |
| `src/components/Icon.astro` | Inline SVG icons. |
| `src/pages/blog/` | Blog index and post template. |
| `src/blog/*.md` | Posts. Add a file, it appears — no registration step. |
| `src/content.config.ts` | Frontmatter schema. A post missing a field fails the build, on purpose. |
| `src/lib/posts.ts` | Draft filtering, shared by every page that lists posts. Also `happenedAt`, which turns `happened` into a timeline year and a display label. |

## Adding a post

How posts are written: [`docs/blog-style.md`](docs/blog-style.md). With Claude Code, `/blog-post`
interviews you and drafts from your answers.

Create `src/blog/my-post.md`:

```markdown
---
title: "Title"
date: 2026-09-01
description: "One sentence — shown in the list and as the meta description."
tags: ["optional"]
draft: false
kind: engineering        # or personal
# happened: 2019-06        # optional: when it took place; places the post on the timeline
---

Body in markdown.
```

`date` is the publish date and drives sorting and listing everywhere. `happened` (optional) is
when the post's subject actually took place, and only affects where it lands on the path
timeline. Personal posts never appear in the home page's latest posts.

The URL is the filename: `/blog/my-post`.

**`draft` defaults to `true`.** Drafts appear in `npm run dev` and are excluded from
`npm run build`, so an unfinished post cannot ship by accident.

## Branches and deploying to GitHub Pages

`main` is the forkable template with neutral example content. In this repository,
`personal` is a long-lived branch containing the real profile, posts, documents, and
images. Only `personal` deploys to https://moritzhauer.github.io.

The workflow listens for pushes to every branch and for manual runs, but builds and
deploys only when the branch matches the Actions repository variable `PAGES_BRANCH`.
When the variable is absent, it defaults to `main`. This repository sets
`PAGES_BRANCH=personal`. Manual runs obey the same branch check.

Merge the initial `personal` PR first, then the template PR into `main`. Going forward,
bring site improvements to the live site by merging `main` into `personal`, preserving
your personal content when resolving conflicts. Review changes to the content paths
above, blog images in `src/assets/`, and theme sprites before pushing that merge.

### Using a fork

1. Fork `main` and rename the repository to `<user>.github.io` for a user page.
2. Replace the example content in the paths above. Set `site` in `astro.config.mjs`
   to `https://<user>.github.io`.
3. In **Settings → Pages → Source**, select **GitHub Actions**. Enable Actions in
   the fork if needed. Push to `main`; no `PAGES_BRANCH` variable is required.
4. Optionally keep `main` as a template and create your own deploy branch. Set
   **Settings → Secrets and variables → Actions → Variables → PAGES_BRANCH** to
   that branch name and allow it in the `github-pages` environment's deployment
   branch policies. Commit the workflow to that branch before deploying.

Internal links use `import.meta.env.BASE_URL`. For a project page, also set
`base: '/<repo-name>'` in `astro.config.mjs` and use the corresponding project URL.
