---
name: blog-post
description: Write a blog post for this site by interviewing the author, then drafting only from their answers, reviewed against docs/blog-style.md. Use for "/blog-post", "write a blog post", "new post about…", or turning notes into a post.
---

# Blog post

Posts are the author's words and experiences, never Claude's. Claude interviews, drafts from the
answers, and checks the draft. The rules for the text live in `docs/blog-style.md`: read it in full
before starting. The checklists below are pointers into it; the guide wins on any conflict.

## 1. Start

In one opening message: ask for the topic (if none was given) and offer an optional brain dump
("Paste notes or a rough paragraph if you have them; otherwise I'll ask.").

Create the transcript in the session scratchpad as `interview-<YYYYMMDD-HHMM>.md`. Record verbatim:
anything the author already said about the topic before the skill started, the brain dump, then
every question and answer. The transcript is the only source for the draft. Never write it into the
repo: it may hold employer details the post must not contain.

## 2. Interview

One question per message, each with one line of context and, where it helps, an example answer.
After every answer, drop every question it already covers.

**Core, always** (skip only what the transcript already answers):
1. Engineering or personal post?
2. What happened, in one sentence?
3. Is this about something before today? When, roughly? (→ `happened`, or omit)
4. Is an employer, client or colleague involved? Which of them may be named, which details are
   public or cleared? (→ guide, Honesty)
5. Which tag fits: offer the closest `TOPICS` keys from `src/data/timeline.ts`. If none fits, ask
   whether to add a new key, and if yes, its color and icon.
6. What can readers see? Photos or screenshots you have (file paths), or numbers or a flow worth a
   chart or diagram? (→ guide, Images and graphs; at least one is required)

**Follow-ups are a menu, not a checklist.** Ask only what the structure still lacks, most
important gap first.

- Engineering: what was the problem, as a user or teammate saw it · what did you try first, and
  why · how did it fail, and how did you notice · what did you end up doing instead, and why that ·
  what did it cost (time, users, money) · what would you do differently · where should a reader go
  next (project, repo, LinkedIn, GitHub)?
- Personal: where were you, what did you see or hear · what surprised you · what's the detail you'd
  tell a friend first?
- Safety-critical topic (edibility, mains, machine safety): which expert or resource should readers
  go to?

**Follow-up rule:** a vague answer gets a request for the concrete instance. "It was slow" → "How
slow, and how did you measure it?"

**Stop** when the transcript covers the structure for the kind (guide, Structure). If the material
is thin (guide, Length), say so after the follow-ups and stop or continue as the author decides.
If the author changes the kind, ask that kind's follow-ups before drafting.

**Author wants to skip the interview:** still ask the unanswered core questions, then draft, and
flag every thin part as "needs you". Never fill it in.

## 3. Draft

Choose the slug (guide, Frontmatter). If `src/blog/<slug>.md` already exists, pick another and tell
the author. Write the post using only transcript content, with `draft: true` and `date` set to the
drafting day.

Images: copy the author's files to `src/assets/blog/<slug>/` with short kebab-case names, run
`mogrify -strip` on the copies, and look at each one: flag uncleared names, logos, internal UIs or
faces, and write alt text from what is actually visible. Draw diagrams and charts as inline SVG per
the guide, only from transcript facts and numbers.

Self-check against the guide, fix what you can, note what needs the author:
- every fact, number, name, decision and quote traces to the transcript
- employer, client and people names only as cleared in the transcript
- Banned: whole groups, all dash forms counted together, bold spans
- engineering: 30-second test, claim headings, closing link taken from the transcript or
  `src/data/profile.ts`; personal: scene opening, no moral
- humor anchored to a transcript detail, density per the guide
- at least one image or graph that carries content; alt text or `aria-label`; chart values match
  the transcript; SVG colors only theme tokens or `currentColor`; photo metadata stripped
- length; over → propose which section to drop or split
- frontmatter table, including the first tag being a `TOPICS` key (the build won't catch it)

## 4. Review

Spawn the `doc-reviewer` agent with **absolute paths** to the draft, `docs/blog-style.md` and the
transcript. Ask it to adversarially check, above all, claims not backed by the transcript, then
names not cleared (in text and images), chart values not in the transcript, the 30-second test (engineering), ban-list hits, forced or unanchored humor, and
safety issues. Revise from its findings.

## 5. Hand over

Run `npm run build` once to catch schema errors (drafts are excluded from output, but the schema
still validates them). If the error is in the new post, fix it and rebuild once. If it's anywhere
else, don't touch other files; report it as a flag.

Then show the author:

```
src/blog/<slug>.md  (draft: true, ~N words)
Flags:
  ⚑ <what> (fixed)
  ⚑ <what> (needs you)
  ⚑ set date to the publish day when flipping draft: false (needs you)
Preview: npm run dev → /blog/<slug>
```

Stop there. Publishing (`draft: false`, final `date`, commit) is the author's.
