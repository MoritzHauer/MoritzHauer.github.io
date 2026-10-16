---
title: "I talk to my coding agents through a headset"
date: 2026-10-16
description: "Dictated prompts, two-sentence spoken replies and local voice commands that never cost a model call, across several Claude Code sessions."
kind: engineering
tags: ["ai", "claude-code", "voice"]
draft: true
---

I've set my coding agents up so I can work with them without looking at the screen. I dictate prompts
through a headset into Claude Code, hear a short spoken summary when an agent has something to
say, and handle the small stuff, like repeating a line or checking what every session is doing,
with voice commands that are answered locally and never reach the model. The sessions run in
herdr, a terminal workspace manager, with firstmate supervising one second mate per project. The
decision behind all of it was to keep both directions short: I speak a prompt instead of typing
it, and an agent speaks only when it has a finding, a question or a suggestion, in at most two
sentences.

<figure role="img" aria-label="Flow diagram: speech from the headset goes into Claude Code's voice input. A prompt starting with 'computer' is handled by a local command hook. Any other prompt goes to the model, and the marked last line of its reply is spoken by local Kokoro text-to-speech back into the headset.">
<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="inherit" font-size="13">
  <defs>
    <marker id="vw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10z" fill="var(--muted)"/>
    </marker>
  </defs>
  <g fill="none" stroke="var(--rule)" stroke-width="1.5">
    <rect x="10" y="95" width="110" height="56" rx="8"/>
    <rect x="170" y="95" width="130" height="56" rx="8"/>
    <rect x="360" y="20" width="150" height="56" rx="8"/>
    <rect x="360" y="170" width="150" height="56" rx="8"/>
  </g>
  <rect x="540" y="170" width="90" height="56" rx="8" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
  <g fill="var(--ink)" text-anchor="middle">
    <text x="65" y="120">Headset</text>
    <text x="65" y="138" fill="var(--muted)" font-size="11">speech in</text>
    <text x="235" y="120">Claude Code</text>
    <text x="235" y="138" fill="var(--muted)" font-size="11">voice input</text>
    <text x="435" y="45">Local command hook</text>
    <text x="435" y="63" fill="var(--muted)" font-size="11">no model call</text>
    <text x="435" y="195">Model</text>
    <text x="435" y="213" fill="var(--muted)" font-size="11">marked last line</text>
    <text x="585" y="195">Kokoro</text>
    <text x="585" y="213" fill="var(--muted)" font-size="11">speech out</text>
  </g>
  <g fill="none" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#vw-arrow)">
    <path d="M120 123 H166"/>
    <path d="M300 112 C330 112 330 48 356 48"/>
    <path d="M300 134 C330 134 330 198 356 198"/>
    <path d="M510 198 H536"/>
    <path d="M510 48 C585 48 585 110 585 166"/>
  </g>
  <g fill="var(--muted)" font-size="11" text-anchor="middle">
    <text x="235" y="84">"computer …"</text>
    <text x="235" y="170">any other prompt</text>
  </g>
</svg>
</figure>

## Dictation uses Claude Code's own voice input

The input side is the least custom part. Claude Code has built-in voice input, which I run in tap
mode with auto-submit, so a dictated prompt is sent as soon as I stop recording. The only thing I
added is the trigger: a small service turns the headset's button into a Space keypress, which
starts and stops the recording. Getting there needed one awkward detour. The service learns about
the button press from WirePlumber's debug log, where the headset's hang-up command shows up, so
WirePlumber has to run with global debug logging switched on to let the button work while the
microphone is in use.

## Agents speak only their last line

Spoken output is where the time would go if every reply were read aloud, so agents don't read
their replies at all. A block in my global
Claude Code instructions tells every agent to end a reply with one marked line, only when there
is a finding, a question for me, or a concrete suggestion for how to continue, written casually and
kept to at most two short sentences. Routine progress and acknowledgements get no such line and
stay silent.

A Stop hook picks up that line and speaks it with Kokoro, a text-to-speech model that runs
locally, prefixed with the project name so I know which session is talking. Questions and
permission prompts are read aloud too, since those are exactly the moments an agent is waiting on
me. Playback is queued across sessions, so two agents finishing at once take turns instead of
talking over each other, and it pauses while a microphone is recording.

## Voice commands never reach the model

Some things I want to say aren't prompts at all. A UserPromptSubmit hook catches any prompt that
starts with "computer" and handles it locally, so the model never sees it and no model call is
spent on it:

| Say | Effect |
|---|---|
| computer repeat | speak this session's last line again |
| computer stop | stop playback and drop the queue |
| computer focus here / focus off | only this project speaks, or everyone does |
| computer mute / unmute | silence all speech, except replies to commands |
| computer status | what each session and second mate is doing |
| computer switch to a second mate, or to firstmate | focus that herdr tab |
| computer, a second mate's name, then a message | send the message verbatim to that second mate |

The rule is blunt: a prompt that starts with "computer" is always taken as a command, so I can't
begin a real prompt with that word. There is also a herdr dependency here. Claude Code puts a
blocked prompt back into the input box, and the hook clears it again through herdr, which means
the commands only clean up after themselves inside herdr.

## Firstmate keeps the second mates quiet

With several projects running, the risk is a headset full of agents. Firstmate supervises a
second mate per project, and work that firstmate routes to a second mate stays silent and comes
back through firstmate. A second mate speaks only when I talk to it directly in its own window.
The last two commands in the table above build on that: I can jump to a second mate's tab, or
hand it a message word for word, without going through firstmate and without touching the
keyboard.

## The savings are in what doesn't happen

I haven't measured any of this, so the efficiency argument is about what the setup leaves out.
A voice command costs no model call. A spoken reply is capped at two short sentences, and routine
replies don't speak at all, so listening stays short even with several sessions working.
Focus and mute decide how many of them can interrupt me. The rough edges are real, though: besides
the WirePlumber logging and the reserved word, the status command keeps reporting "needs
permission" until that turn ends, even after I've granted it.

The supervising layer is [firstmate](https://github.com/kunchenguid/firstmate), and if you're
building something similar, I'm happy to compare notes on
[GitHub](https://github.com/MoritzHauer).
