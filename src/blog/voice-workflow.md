---
title: "I talk to my coding agents through a headset"
date: 2026-10-16
description: "Prompts transcribed on my own laptop, two-sentence spoken replies from a local voice, and voice commands that never cost a model call."
kind: engineering
tags: ["ai", "claude-code", "voice"]
draft: true
---

I wanted to get household stuff done, like cleaning the kitchen, while thinking about my projects
at the same time and actually making progress on them. So I work with my coding agents by voice in
both directions. I dictate prompts through a headset, they are transcribed on my own laptop, and
an agent speaks only when it has a finding, a question or a suggestion, in at most two short
sentences, in a voice generated on my own machine. Housekeeping such as repeating a line or asking
what every session is doing goes through voice commands that are handled locally and never reach
the model, so they cost no model call. Several agents run at once, one per project under a
supervising agent, and work routed through that supervisor stays quiet, so only the agent I'm
talking to directly answers. I think it's perfectly nice for driving a car as well, used only in
ways that keep my eyes and attention on the road.

<figure role="img" aria-label="Flow diagram: speech from the headset is transcribed by local Whisper and typed into Claude Code. A prompt starting with 'computer' is handled by a local command hook. Any other prompt goes to the model, and the marked last line of its reply is spoken by local Kokoro text-to-speech back into the headset.">
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
    <text x="235" y="120">Local Whisper</text>
    <text x="235" y="138" fill="var(--muted)" font-size="11">types the prompt</text>
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

## Whisper transcribes my prompts on the laptop

I do not want my audio sent to the cloud, and for me that is reason enough to transcribe locally.
Speech input runs through faster-whisper with the small model on the CPU. I press the headset
button to start recording and press it again to send, and the text is typed into the active herdr
pane. On a laptop CPU that takes roughly four seconds per sentence. Whisper works fine with my
voice, and it's the option I prefer. Claude Code's built-in dictation is also a possibility, and I
can switch the headset button over to it by voice, but its audio is transcribed in the cloud.

## Agents speak only their last line

A block in my global Claude Code instructions tells every agent to end a reply with one marked
line, only when there is a finding, a question for me, or a concrete suggestion for how to
continue, kept to at most two short sentences. Routine progress and acknowledgements get no such
line and stay silent. A Stop hook speaks that line, prefixed with the project name so I know which
session is talking. Questions and permission prompts are read aloud too. Playback is queued
across sessions and pauses while a microphone is recording, so two agents finishing at once take
turns instead of talking over each other.

## I compared three families of local voices

Every text-to-speech option I tried runs locally and offline. The baseline was the system's eSpeak
NG through speech-dispatcher, which works but sounds robotic. Next I sampled nine Piper voices side
by side (lessac, ryan, amy, hfc_female, kristin, joe, alan, northern_english_male and cori), and
after that a set of Kokoro samples. I settled on Kokoro v1.0, the 82M-parameter model, run through
kokoro-onnx with the af_heart voice, because it sounds more natural.

## Voice commands never reach the model

A UserPromptSubmit hook catches any prompt that starts with "computer" and handles it locally:

| Say | Effect |
|---|---|
| computer repeat | speak this session's last line again |
| computer stop | stop playback and drop the queue |
| computer focus here / focus off | only this project speaks, or everyone does |
| computer mute / unmute | silence all speech, except replies to commands |
| computer status | what each session and second mate is doing |
| computer switch to a second mate, or to firstmate | focus that herdr tab |
| computer, a second mate's name, then a message | send the message verbatim to that second mate |
| computer whisper on / whisper off | the headset button drives local Whisper, or Claude Code's dictation |

The rule is blunt: a prompt that starts with "computer" is always taken as a command, so I can't
begin a real prompt with that word.

## Firstmate keeps the second mates quiet

The sessions run in herdr, a terminal workspace manager, and firstmate supervises one second mate
per project. Work that firstmate routes to a second mate stays silent and comes back through
firstmate; a second mate speaks only when I talk to it directly in its own window. The last two
commands in the table build on that, so I can jump to a second mate's tab or hand it a message
word for word without touching the keyboard.

## The savings are in what doesn't happen

I haven't measured any of this, so the efficiency argument is about what the setup leaves out. A
voice command costs no model call. A spoken reply is capped at two short sentences, and routine
replies don't speak at all, so listening stays short even with several sessions working. Focus and
mute decide how many of them can interrupt me. The rough edges are real, though: the headset button
only works because WirePlumber runs with global debug logging, the commands clean up after
themselves only inside herdr, and the status command keeps reporting "needs permission" until that
turn ends, even after I've granted it.

## Future features I'm working on

The roadmap for the setup has seven items so far:

- VW-01, planned: reach the running herdr session from my phone, with the full layout of firstmate,
  second mates and all tabs.
- VW-02, planned: hear the spoken replies on the phone, instead of or as well as on the PC.
- VW-03, an idea: dictate on the phone but transcribe with the PC's local Whisper, so phone audio
  stays private too.
- VW-04, an option: continue a single session from the Claude phone app through Claude Code's
  Remote Control, a nicer interface than a terminal but one session at a time, with the text going
  through Anthropic's servers.
- VW-05, planned: read long texts aloud sentence by sentence, since long input currently gets cut
  off, with "computer stop" ending a reading too.
- VW-06, an idea: "computer read full", which reads the whole last reply instead of only the
  marked line, skipping code blocks. It builds on VW-05.
- VW-07, in progress: evaluate and tune Whisper with my real voice and headset microphone, German
  and mixed-language prompts, and faster options.

If you're building something similar, I'm happy to compare notes on
[GitHub](https://github.com/MoritzHauer).

## Sources and credits

- [firstmate](https://github.com/kunchenguid/firstmate) by Kun Chen, the supervisor that runs the
  second mates, and his [treehouse](https://github.com/kunchenguid/treehouse) worktree tool.
- [herdr](https://herdr.dev), the terminal workspace manager the sessions run in.
- [Claude Code](https://code.claude.com/docs) by Anthropic, including its built-in dictation, the
  cloud-transcribed alternative.
- [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) by hexgrad, the voice model, run through
  [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) by thewh1teagle.
- [Piper](https://github.com/rhasspy/piper) and [eSpeak NG](https://github.com/espeak-ng/espeak-ng),
  the other voices in the comparison.
- [faster-whisper](https://github.com/SYSTRAN/faster-whisper) by SYSTRAN, which transcribes my
  prompts locally.
