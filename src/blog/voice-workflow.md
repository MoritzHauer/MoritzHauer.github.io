---
title: "I talk to my coding agents through a headset"
date: 2026-10-16
description: "Making progress on coding projects during housework, with local speech processing, short spoken replies, and control over interruptions."
kind: engineering
tags: ["ai", "claude-code", "voice"]
draft: true
---

I wanted to think through my projects and make progress while cleaning the kitchen. With a
headset, I can dictate prompts to coding agents, hear short replies, and switch between sessions
without returning to the keyboard. Local Whisper transcribes my speech and Kokoro reads the
answers; the tradeoff is a transcription delay of roughly four seconds per sentence on my laptop.
I think the setup suits the car just as well, used only in ways that keep my eyes and attention on
the road.

<figure role="img" aria-label="Flow diagram: speech from the headset is transcribed by local Whisper and typed into Claude Code. A prompt starting with 'computer' is handled by a local command hook. Any other prompt goes to the model, and a Stop hook passes the marked last line of its reply to local Kokoro text-to-speech, which speaks it back into the headset. Replies to commands are spoken the same way.">
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
    <text x="435" y="195">Model + Stop hook</text>
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
    <text x="322" y="70" text-anchor="end">"computer …"</text>
    <text x="322" y="184" text-anchor="end">any other prompt</text>
  </g>
</svg>
</figure>

## Whisper keeps my audio on the laptop

I don't want my audio sent to the cloud, so I prefer local Whisper for speech input. I press the
headset button to start recording and press it again to stop. Faster-whisper's small model
transcribes on the CPU and types the text into the active pane of herdr, the terminal workspace
manager my sessions run in.

Whisper works well for me. Claude Code's built-in dictation is another option, although its audio
is transcribed in the cloud. Both use the same headset button; I can switch between them by saying
"computer whisper on" or "computer whisper off".

## Short replies keep listening manageable

An agent speaks only when it has a finding, a question, or a concrete suggestion for how to
continue. Its spoken summary is capped at two short sentences. Routine progress and
acknowledgements stay silent, while the full reply remains in the terminal.

The agent marks its final line for playback, and a hook sends that line to local Kokoro
text-to-speech. Each summary starts with the project name so I know which session is talking.
Questions and permission prompts are read aloud too. Playback is queued across sessions and
pauses while a microphone records, so agents take turns speaking and don't talk over my dictation.

I compared eSpeak NG, Piper, and Kokoro, all running locally and offline. eSpeak NG worked but
sounded robotic. After trying several Piper voices, I chose Kokoro because it sounds more natural.

## Voice commands cost no model call

My sessions are organized by firstmate, which supervises a second mate for each project, each in its
own herdr tab. Work routed to a second mate stays silent and returns through firstmate; a second
mate speaks only when I talk to it directly in its own window. That keeps delegated work from
producing a separate stream of spoken updates.

Prompts starting with "computer" are intercepted locally and never reach the model. I can repeat
the last summary, stop playback, mute agent speech, or ask for session status. "Computer focus here"
limits speech to the current project, and "computer focus off" lets all projects speak again.
Commands can also switch to a second mate's tab or send it a message verbatim.

These controls let me decide which projects can interrupt me without spending a model call on
housekeeping. Together with the short replies, they let me direct the work while my hands are
busy, without having to listen to every agent's progress updates.

There are limits: a real prompt can't begin with "computer", because it will be treated as a
command. The status command can also keep reporting "needs permission" until the turn ends, even
after I've granted it.

## Future features I'm working on

Reading long texts aloud already works: input is split into sentence-sized pieces, and
"computer stop" ends the whole reading. My next steps include phone access and more speech controls:

- Planned: reach the running herdr session from my phone, with the full layout of firstmate,
  second mates and all tabs.
- Planned: hear the spoken replies on the phone, instead of or as well as on the laptop.
- An idea: dictate on the phone but transcribe with the laptop's local Whisper, so phone
  audio stays private too.
- An option: continue a single session from the Claude phone app through Claude Code's
  Remote Control, a nicer interface than a terminal but one session at a time, with the text going
  through Anthropic's servers.
- An idea: "computer read full", which reads the whole last reply instead of only the
  marked line, skipping code blocks, on top of the long-text reading.
- In use, with tuning still open: evaluate Whisper with my real voice and headset microphone,
  German and mixed-language prompts, and faster options.

## Sources and credits

- [firstmate](https://github.com/kunchenguid/firstmate) by Kun Chen, the supervisor that runs the
  second mates, and his [treehouse](https://github.com/kunchenguid/treehouse) worktree tool.
- [herdr](https://herdr.dev), the terminal workspace manager the sessions run in.
- [Claude Code](https://code.claude.com/docs) by Anthropic, including its built-in dictation, the
  cloud-transcribed alternative.
- [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) by hexgrad, the voice model, run through
  [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) by thewh1teagle.
- [Piper](https://github.com/OHF-Voice/piper1-gpl) and [eSpeak NG](https://github.com/espeak-ng/espeak-ng),
  the other voices in the comparison.
- [faster-whisper](https://github.com/SYSTRAN/faster-whisper) by SYSTRAN, which transcribes my
  prompts locally.

If you're building something similar, I'm happy to compare notes on
[GitHub](https://github.com/MoritzHauer).
