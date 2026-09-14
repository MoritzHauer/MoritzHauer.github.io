# Blog style guide

How posts on this site are written. The `blog-post` skill (`.claude/skills/blog-post/`) follows
this file; so should anyone editing a post by hand. Where the skill and this file disagree, this
file wins.

## Who reads

Every post is written for engineers. The title, description and first paragraph must also work on
their own for a technical lead deciding in 30 seconds whether this person is worth talking to.

Two kinds of post, set in frontmatter as `kind`:

- **`engineering`**: projects, decisions, failures, tooling. Listed everywhere.
- **`personal`**: FabLab, foraging, anything else. No engineering tie-back required. Hidden by
  default: never in the home page's latest posts, behind a "Personal posts" switch on `/blog` and
  the timeline.

The voice, ban list and honesty rules below apply to both kinds. Structure rules differ.

## Voice

- **English, American spelling**: color, behavior, optimize.
- **Conversational.** First person, contractions, short sentences. Say what happened.
- **Feelings only when they carry information.** "I found out from a support email" does; "I was
  so frustrated" does not.
- **Non-English terms** (Pilzberatung, Hochschule) stay in the original, with a short gloss on
  first use: "the Pilzberatung, the local mushroom advice service".

### Humor and imagery

Dry remarks, wry asides, self-deprecation, vivid images and exaggeration are all allowed, under
three conditions:

1. Each one hangs off a **real detail** the author supplied.
2. An image is **specific to the situation**, never a stock phrase.
3. Roughly **one per section** (in a post without headings, one per 250–300 words). Keep it only
   if it adds information or a picture the plain sentence lacks.

The ceiling, for calibration:

> I found out from a support email, the politest possible way to learn that your sync engine is a
> shredder.

Over the line (stock, or not anchored to anything that happened):

> Debugging this was a real rollercoaster ride. Spoiler: it was a game changer.

## Banned

Each row bans the whole group. The examples show the pattern; they are not the complete list.

| Group | Examples | Rule |
|---|---|---|
| Stock openers and closers | "In today's world", "Let's dive in", "In conclusion", "I hope this helps", "Happy coding!" | Banned |
| AI vocabulary | delve, leverage, robust, seamless, unlock, elevate, landscape, realm, tapestry, crucial, journey, game changer, testament | Banned |
| Not X, but Y | "isn't just a feature, it's a mindset"; split form "It's not about speed. It's about trust." | Banned |
| Dashes as sentence breaks | "— it's a mindset", also ` - `, ` -- `, spaced `–` | At most one per post, all forms counted together. Use a period or comma instead |
| Triplets | "fast, reliable, and scalable" | Only when there really are three things |
| Headings as hype | "The Secret Sauce", "Key Takeaways" | Headings state what the section says |
| Hedging filler | "arguably", "it's worth noting that", "at the end of the day" | Banned |
| Bold for emphasis | several bolded phrases | At most one bolded span per post, the sentence a skimmer must not miss |
| Emoji | 🚀 ✨ | None |

## Structure

### Engineering posts

```
Opening paragraph   passes the 30-second test
## 2–5 sections     headings are claims, not labels
Closing             one practical line with a link, no recap
```

- **30-second test.** Title + description + first paragraph answer: what was the problem, what did
  I decide, what did it cost or teach. If they don't, fix the opening before anything else.
- **Claim headings.** "Last-write-wins loses data", not "Problems". "The queue was the
  bottleneck", not "Implementation".
- **Closing.** No summary paragraph. The last line points the reader somewhere, as a real markdown
  link: the project, the repo, or the author's LinkedIn or GitHub from `src/data/profile.ts`. Never
  invent an address, never a sales pitch.
  - "BetterBeaver is at [betterbeaver.de](https://betterbeaver.de) if you want to see the sync in
    action."
  - "If you're fighting the same sync problem, I'm happy to compare notes on
    [LinkedIn](https://www.linkedin.com/in/moritz-hauer-82795a3a9/)."

### Personal posts

```
Opening   a scene or a concrete detail, not background
Body      headings optional; if used, they say something
Ending    stop on a detail or a thought: no moral, no lesson, no call to action
```

Opening: "The ring didn't slide." Not: "I've been foraging since 2019."
Ending: "Two weeks later someone at the Pilzberatung showed me its lookalike, and I stopped being
annoyed." Not: "And that taught me to always be careful."

## Images and graphs

**Every post has at least one**: a photo, screenshot, diagram or chart. Both kinds.

- **It carries content.** It shows what a section says: the joint that didn't fit, the sync flow,
  the numbers before and after. No decorative banners.
- **Sources.** Photos and screenshots come from the author. Diagrams and charts may be drawn by
  Claude, only from what the author said; chart values exactly as given, approximate ones marked
  `~`. No AI-generated images, no stock photos.
- **Honesty applies to pixels.** No uncleared employer or client names, logos, internal UIs or
  customer data in a screenshot. Faces only with that person's consent. Strip metadata from photos
  before committing (`mogrify -strip photo.jpg`): GPS tags give away foraging spots and home
  addresses.
- **Photos and screenshots** live in `src/assets/blog/<slug>/` and are referenced relatively:
  `![What the image shows](../assets/blog/<slug>/lid-too-tight.jpg)`. Astro turns them into
  optimized webp. Alt text describes what is visible, always.
- **Diagrams and charts** are inline SVG in a `<figure>`, with `role="img"` and an `aria-label`.
  Colors come only from theme tokens (`var(--ink)`, `var(--muted)`, `var(--link)`, `var(--accent)`,
  `var(--rule)`) or `currentColor`, so they work in all three site themes, one of which is dark.
  `<figcaption>` optional.

## Length

| Kind | Target |
|---|---|
| engineering | ~800–1,500 words |
| personal | ~300–900 words |

Soft targets. Over length: drop or split a **section**, never trim sentences evenly.

**Thin material** means, before drafting:
- engineering: fewer than 2 sections that each rest on a concrete instance from the author (a
  number, an event, something someone said), or no clear decision;
- personal: no concrete opening scene;
- either kind: nothing to show as an image or graph.

Thin material is said out loud, never padded. The post may not be ready yet.

## Honesty

1. **No invented facts.** Every anecdote, number, name, decision and outcome comes from the author.
   A gap is a question to ask, never a guess or a `[placeholder]`.
2. **Numbers stay as given.** "Roughly a third" stays roughly a third; "most of a week" never
   becomes "5 days".
3. **Employers, clients and colleagues are unnamed by default.** That covers employers (even ones
   named elsewhere on this site), clients, plants, machine types, internal tools and people. Name
   one only when the author confirms it is public or cleared. A detail that isn't cleared is
   generalized ("a machine manufacturer") or dropped.
4. **No quotes** unless the author confirms the person said it.
5. **Safety-critical advice.** Mushroom edibility, electrical and mains work, machine safety: never
   reassuring, never softened for flow, and always pointing to the expert or resource the author
   names.
6. **Opinions are experience.** "Supabase doesn't scale" becomes "I hit X at Y users", unless a
   source is cited.

## Frontmatter

```yaml
---
title: "Last-write-wins lost my users' reviews"
date: 2026-09-14
description: "A merge rule that looked fine until someone owned two devices, and what replaced it."
kind: engineering
happened: 2024-03
tags: ["betterbeaver", "sync"]
draft: true
---
```

| Field | Rule | Good | Bad |
|---|---|---|---|
| `title` | A claim or a concrete subject, ≤ 60 chars, sentence case, no colon subtitle | `Last-write-wins lost my users' reviews` | `Offline-First Sync: Lessons Learned` |
| `description` | One sentence, ≤ 155 chars, adds stakes or outcome; doesn't restate the title. Also the meta description | `A merge rule that looked fine until someone owned two devices, and what replaced it.` | `In this post I talk about offline sync.` |
| `kind` | `engineering` or `personal`. Required | | |
| `tags` | 1–3, lowercase kebab-case. **The first tag must be a key of `TOPICS` in `src/data/timeline.ts`.** The timeline icon comes from the first tag that is a key, and the build does not check this. A new key needs the author's approval plus a color and an icon | `["betterbeaver", "sync"]` | `["Offline", "Web Development"]` |
| `date` | Required by the schema. While drafting: the drafting day. Changed to the publish date in the same edit that sets `draft: false`; it drives sorting and, without `happened`, the timeline position | | |
| `happened` | Optional. `YYYY` or `YYYY-MM`: when the subject took place, if not now. For a span, the moment the post is about (launch, failure, hand-in). Positions the post on the timeline | `2019-06` | `2019-06-15` |
| `draft` | `true` until the author publishes. Drafts show in `npm run dev` only | | |
| filename | Short kebab-case slug from the subject, not the full title. Becomes the URL; never change it after publishing | `betterbeaver-sync-conflicts.md` | `last-write-wins-lost-my-users-reviews.md` |
