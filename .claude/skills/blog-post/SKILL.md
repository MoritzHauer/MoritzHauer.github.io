---
name: blog-post
description: Write a blog post for this site by interviewing the author, then drafting from their answers and files, plain or playful, reviewed against docs/blog-style.md. Use for "/blog-post", "write a blog post", "new post about…", or turning notes into a post.
---

# Blog post

Posts are the author's words and experiences, never Claude's. Claude interviews, drafts from the
answers, and checks the draft. The rules for the text live in `docs/blog-style.md`: read it in full
before starting. The checklists below are pointers into it; the guide wins on any conflict.

## 1. Start

In one opening message: ask for the topic (if none was given) and offer an optional brain dump
("Paste notes or a rough paragraph if you have them, or point me to files; otherwise I'll ask.").

Create the transcript in the session scratchpad as `interview-<YYYYMMDD-HHMM>.md`. Record verbatim:
anything the author already said about the topic before the skill started, the brain dump, then
every question and answer. When the author points to files, read them and note in the transcript
what they contain, marked unconfirmed. For a secret (password, token, key), note only that it exists
and where, never its value, and tell the author.

The transcript and the confirmed file facts are the only sources for the draft. Never write the
transcript into the repo: it may hold employer details the post must not contain.

## 2. Interview

One question per message, each with one line of context and, where it helps, an example answer.
After every answer, drop every question it already covers.

**Core, always** (skip only what the transcript already answers):
1. Engineering or personal post? Is it something you built? (→ guide, Side projects)
2. What happened, in one sentence?
3. Is this about something before today? When, roughly? (→ `happened`, or omit)
4. Is an employer, client or colleague involved? Which of them may be named, which details are
   public or cleared? (→ guide, Honesty)
5. Which tag fits: offer the closest `TOPICS` keys from `src/data/timeline.ts`. If none fits, ask
   whether to add a new key, and if yes, its color and icon.
6. What can readers see? Photos or screenshots you have (file paths), or numbers or a flow worth a
   chart or diagram? (→ guide, Images and graphs; at least one is required)
7. Plain or playful? One line each on what that means for this kind (guide, Tone). Default: plain.
   For a safety-critical topic, say the jokes stay out of the safety parts.

**Follow-ups are a menu, not a checklist.** Ask only what the structure still lacks, most
important gap first.

- Engineering: what was the problem, as a user or teammate saw it · what did you try first, and
  why · how did it fail, and how did you notice · what did you end up doing instead, and why that ·
  what did it cost (time, users, money) · what would you do differently · where should a reader go
  next (project, repo, LinkedIn, GitHub)?
- Personal: where were you, what did you see or hear · what surprised you · what's the detail you'd
  tell a friend first?
- Built something: is there code, a repo or build files to point me to · which part was the most
  work · what did it actually end up being used for · where is it now?
- Safety-critical topic (edibility, mains, machine safety): which expert or resource should readers
  go to?

**Follow-up rule:** a vague answer gets a request for the concrete instance. "It was slow" → "How
slow, and how did you measure it?"

**Confirm file facts** before drafting: in one message, list the facts from the author's files the
post will lean on, and ask which are right.

**Stop** when the transcript covers the structure (guide, Structure: the kind's, or Side projects
if built). If the material is thin (guide, Length), say so after the follow-ups and stop or continue
as the author decides. If the author changes the kind, ask that kind's follow-ups before drafting.

**Author wants to skip the interview:** still ask the unanswered core questions, then draft (skip
step 3 unless asked), and flag every thin part as "needs you". Never fill it in, not even with
invented color.

## 3. Style samples (playful personal posts)

Before the full draft, write 2–3 samples of about 150 words each in the terminal, each with a
different frame (guide, Tone), each showing the hook plus one paragraph of real facts. Mark invented
lines with `(invented)`; these marks never go into the post file.

The author picks one, mixes lines, or asks for another round. Record the choice in the transcript
under `## Samples (Claude-written, not a source)`. Invented lines from a chosen sample stay invented.

## 4. Draft

Choose the slug (guide, Frontmatter). If `src/blog/<slug>.md` already exists, pick another and tell
the author. Write the post from the transcript and confirmed file facts, with `draft: true`, `date`
set to the drafting day, and `tone: playful` if chosen.

For a playful personal post, keep the invented list in the scratchpad as `invented-<slug>.md`: every
sentence that states something not in the transcript or confirmed files. Figurative wording of a
real fact is not listed.

Images: copy the author's files to `src/assets/blog/<slug>/` with short kebab-case names, run
`mogrify -strip` on the copies, and look at each one: flag uncleared names, logos, internal UIs,
secrets or faces, and write alt text from what is actually visible. Draw diagrams and charts as
inline SVG per the guide, only from facts.

Self-check against the guide, fix what you can, note what needs the author:
- every fact traces to the transcript or a confirmed file fact (guide, Honesty 1); every invented
  line is on the list and within the Honesty 1 limits, or it becomes a question for the author
- employer, client and people names only as cleared in the transcript
- Banned: whole groups, all dash forms counted together, bold spans (playful exceptions per guide)
- structure per kind, or Side projects if built; engineering: 30-second test, claim headings,
  closing link from the transcript or `src/data/profile.ts`; personal: concrete scene, no moral
- voice: structured, grown-up sentences, not runs of simple ones; answers rephrased, not pasted;
  only the details that carry the story (guide, Voice)
- humor anchored to a transcript detail or a listed invented line, dry not cute, density per tone
- at least one image or graph that carries content; alt text or `aria-label`; chart values match
  the transcript or confirmed file facts; SVG colors only theme tokens or `currentColor`; photo
  metadata stripped
- length; over → propose which section to drop or split
- frontmatter table, including the first tag being a `TOPICS` key (the build won't catch it)

## 5. Review

Spawn the `doc-reviewer` agent with **absolute paths** to the draft, `docs/blog-style.md`, the
transcript and, for playful posts, the invented list. Ask it to adversarially check, above all,
claims not backed by the transcript or confirmed file facts, including anything that should be on
the invented list or that breaks its limits (a technical, numeric, usage, outcome or people claim,
or a quote). Then names and secrets not cleared (in text and images), chart values, the 30-second
test (engineering), ban-list hits, forced, stock or unanchored humor, and safety issues. Revise from
its findings, update the invented list, and turn any invented line that is really a fact claim into
a question for the author.

## 6. Hand over

Run `npm run build` once to catch schema errors (drafts are excluded from output, but the schema
still validates them). If the error is in the new post, fix it and rebuild once. If it's anywhere
else, don't touch other files; report it as a flag.

Then show the author:

```
src/blog/<slug>.md  (draft: true, plain|playful, ~N words)
Flags:
  ⚑ <what> (fixed)
  ⚑ <what> (needs you)
  ⚑ invented: "<line>" (keep or cut)
  ⚑ is this true? "<line>" (needs you)
  ⚑ set date to the publish day when flipping draft: false (needs you)
Preview: npm run dev → /blog/<slug>
```

Stop there. Publishing (`draft: false`, final `date`, commit) is the author's.
