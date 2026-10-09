# Blog style guide

How posts on this site are written. The `blog-post` skill (`.claude/skills/blog-post/`) follows
this file; so should anyone editing a post by hand. Where the skill and this file disagree, this
file wins.

## Who reads

Every post is written for engineers. The title, description and first paragraph must also work on
their own for a technical lead deciding in 30 seconds whether this person is worth talking to.

Two kinds of post, set in frontmatter as `kind`:

- **`engineering`**: projects, decisions, failures, tooling. Listed everywhere.
- **`personal`**: FabLab, foraging, side projects, anything else. No engineering tie-back required,
  but technical depth is welcome (see Side projects). Hidden by default: never in the home page's
  latest posts, behind a "Personal posts" switch on `/blog` and the timeline.

The voice, ban list and honesty rules below apply to both kinds. Structure rules differ.

## Voice

- **English, American spelling**: color, behavior, optimize.
- **Conversational, grown-up.** First person, contractions. Say what happened. Sentences don't
  have to be long, but they need structure: subordinate clauses, cause and effect joined inside the
  sentence, varied rhythm. A run of simple subject-verb-period sentences reads like a school essay.
- **The author's wording is material, not text.** Rephrase answers freely; keep facts, not
  formulations.
- **Selective.** Not every fact from the interview goes in. Keep the details that carry the story
  and drop the rest, even if they're true and interesting; prose paragraphs over bullet lists of
  features.
- **Feelings only when they carry information.** "I found out from a support email" does; "I was
  so frustrated" does not.
- **Non-English terms** (Pilzberatung, Hochschule) stay in the original, with a short gloss on
  first use: "the Pilzberatung, the local mushroom advice service".

### Tone

Set in frontmatter as `tone`: `plain` (default, may be omitted) or `playful`. The author picks.

- **`plain`**: the humor rules below apply as written. Nothing is invented.
- **`playful`**, `personal` posts: joke density and pun headings per the rules below, invented
  color per Honesty 1, and optionally a **frame**, a device that runs through the whole post, such
  as:
  - a running pun: "Once upon a Lack", "A Lack of floor space", "Lack-luster retirement"
  - a format parody: release notes, a manual, a product review
  - the subject as a character: the table's life story, or the table telling it
- **`playful`**, `engineering` posts: joke density and pun headings only. No invented color, no
  format parody.

### Humor and imagery

Dry remarks, wry asides, self-deprecation, vivid images and exaggeration are all allowed, under
three conditions:

1. Each one hangs off a **real detail** the author supplied. In a `playful` personal post it may
   also hang off listed invented color (Honesty 1).
2. An image is **specific to the situation**, never a stock phrase. Humor is dry and adult: the
   absurdity of the situation, not cute personification ("The table is patient.").
3. **Density.** `plain`: roughly one per section (in a post without headings, one per 250–300
   words). `playful`: up to one per paragraph, a list item counting as a paragraph, as long as a
   skimmer can still pull the real facts out. Either way, keep it only if it adds information or a
   picture the plain sentence lacks.

The ceiling for `plain`:

> I found out from a support email, the politest possible way to learn that your sync engine is a
> shredder.

The level for `playful`:

> That's a lot of code for something whose favorite feature turned out to be getting slowly
> brighter.

Over the line in either tone (stock, or not anchored to anything):

> Debugging this was a real rollercoaster ride. Spoiler: it was a game changer.

## Banned

Each row bans the whole group. The examples show the pattern; they are not the complete list.

| Group | Examples | Rule |
|---|---|---|
| Stock openers and closers | "In today's world", "Let's dive in", "Let's fix that", "In conclusion", "I hope this helps", "Happy coding!" | Banned |
| AI vocabulary | delve, leverage, robust, seamless, unlock, elevate, landscape, realm, tapestry, crucial, journey, game changer, testament | Banned |
| Not X, but Y | "isn't just a feature, it's a mindset"; split form "It's not about speed. It's about trust." | Banned |
| Dashes as sentence breaks | "— it's a mindset", also ` - `, ` -- `, spaced `–` | At most one per post, all forms counted together. Use a period or comma instead |
| Triplets | "fast, reliable, and scalable" | Only when there really are three things |
| Headings as hype | "The Secret Sauce", "Key Takeaways" | Headings state what the section says. `playful`: a pun is fine if it still says it ("A Lack of floor space"); "Plot twist" is not |
| Hedging filler | "arguably", "it's worth noting that", "at the end of the day" | Banned |
| Bold for emphasis | several bolded phrases | At most one bolded span per post, the sentence a skimmer must not miss. A `playful` format parody may also bold short labels at the start of a list item or line ("**Breaking change:**") |
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

### Side projects

For something the author built. A `personal` post uses this order. An `engineering` post keeps the
Engineering structure (30-second opening, claim headings, closing link) and uses this only to order
the sections in between.

```
Hook           2–5 sentences: a real anecdote, or in playful the frame's premise
What I built   accurate technical sections: hardware, code, the decisions behind them
Story          where it was used, what changed, what replaced it
Ending         a detail or a punchline, no moral
```

A hook with a real anecdote counts as the personal opening scene. A premise hook ("Every IKEA Lack
table dreams of the same life") does not, so the post still needs a concrete scene from the author
somewhere, and Thin material still applies. A format parody keeps this order inside its own shape:
in release notes, the first version is what I built and later versions are the story.

## Images and graphs

**Every post has at least one**: a photo, screenshot, diagram or chart. Both kinds.

- **It carries content.** It shows what a section says: the joint that didn't fit, the sync flow,
  the numbers before and after. No decorative banners.
- **Sources.** Photos and screenshots come from the author; so may diagrams, for example from their
  files. Claude may draw diagrams and charts only from facts under Honesty 1, never from invented
  color; chart values exactly as given, approximate ones marked `~`. No AI-generated images, no
  stock photos.
- **Honesty applies to pixels.** No uncleared employer or client names, logos, internal UIs,
  customer data, or passwords, tokens, keys and WiFi names in a screenshot. Faces only with that
  person's consent. Strip metadata from photos before committing (`mogrify -strip photo.jpg`): GPS
  tags give away foraging spots and home addresses.
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
- personal: no concrete opening scene from the author;
- either kind: nothing to show as an image or graph.

Thin material is said out loud, never padded, and invented color never fills it. The post may not be
ready yet.

## Honesty

1. **No invented facts.** Everything that happened comes from the author or the author's files (rule
   7): events, anecdotes, numbers, dates, names, hardware, code, technical claims, decisions and
   their reasons, how much effort or time something took, whether and how often something was used,
   outcomes, and anything about other people. A gap is a question to ask, never a guess or a
   `[placeholder]`. Figurative wording of a real fact ("waits for a comeback tour" for "waits to be
   installed again") is not invented.
   - **Invented color, `playful` personal posts only.** A line that is obviously non-literal
     (personification, exaggeration no reader takes at face value) or a trivial scene detail ("Drinks
     on top"). It never states or implies any item in the list above, never puts words in quotation
     marks (the author's own included), and never appears in the title or description. Test: if a
     sceptical reader could ask "is that true?" and the answer matters, it is a fact, so ask the
     author.
   - **Frame devices** (version numbers, chapter names, a parody's labels) are not facts, but must
     not imply a date, count or order that didn't happen.
   - Every invented line is listed at handover, and the author keeps or cuts each one.
2. **Numbers stay as given.** "Roughly a third" stays roughly a third; "most of a week" never
   becomes "5 days"; "several years" never becomes "five years".
3. **Employers, clients and colleagues are unnamed by default.** That covers employers (even ones
   named elsewhere on this site), clients, plants, machine types, internal tools and people. Name
   one only when the author confirms it is public or cleared. A detail that isn't cleared is
   generalized ("a machine manufacturer") or dropped.
4. **No quotes** unless the author confirms the person said it.
5. **Safety-critical advice.** Mushroom edibility, electrical and mains work, machine safety: never
   reassuring, never softened for flow, never joked into looking harmless, and always pointing to
   the expert or resource the author names.
6. **Opinions are experience.** "Supabase doesn't scale" becomes "I hit X at Y users", unless a
   source is cited.
7. **The author's files are sources.** A repo, firmware, diagram or spreadsheet the author points to
   may supply facts, once the author confirms them. Secrets found there (passwords, tokens, keys)
   never go into a post, and the author is told they exist.

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
| `title` | A claim or a concrete subject, ≤ 60 chars, sentence case, no colon subtitle. `playful`: may be the frame's pun or format | `Last-write-wins lost my users' reviews`, `Once upon a Lack` | `Offline-First Sync: Lessons Learned` |
| `description` | One sentence, ≤ 155 chars, adds stakes or outcome; doesn't restate the title. Also the meta description, so it says plainly what the post is about even when the title is a pun | `A merge rule that looked fine until someone owned two devices, and what replaced it.` | `In this post I talk about offline sync.` |
| `kind` | `engineering` or `personal`. Required | | |
| `tone` | `plain` or `playful`. Optional, defaults to `plain`. Tells anyone editing or reviewing later which rules apply | `playful` | |
| `tags` | 1–3, lowercase kebab-case. **The first tag must be a key of `TOPICS` in `src/data/timeline.ts`.** The timeline icon comes from the first tag that is a key, and the build does not check this. A new key needs the author's approval plus a color and an icon | `["betterbeaver", "sync"]` | `["Offline", "Web Development"]` |
| `date` | Required by the schema. While drafting: the drafting day. Changed to the publish date in the same edit that sets `draft: false`; it drives sorting and, without `happened`, the timeline position | | |
| `happened` | Optional. `YYYY` or `YYYY-MM`: when the subject took place, if not now. For a span, the moment the post is about (launch, failure, hand-in). Positions the post on the timeline | `2019-06` | `2019-06-15` |
| `draft` | `true` until the author publishes. Drafts show in `npm run dev` only | | |
| filename | Short kebab-case slug from the subject, not the full title. Becomes the URL; never change it after publishing | `betterbeaver-sync-conflicts.md` | `last-write-wins-lost-my-users-reviews.md` |
