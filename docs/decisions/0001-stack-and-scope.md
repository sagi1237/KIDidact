# 0001 — Stack, privacy model, and migration scope

- **Status:** accepted
- **Date:** 2026-09-01

## Context

KIDidact started as a single-file HTML prototype
(`dictation-game-prototype.html`, ~2200 lines) containing a dictation game plus
a practice hub with three mini-games, bilingual (Hebrew / English). It has no
build step, no persistence, and no backend. We want to turn it into a real,
maintainable project without a rewrite — decompose in place, phase by phase.

## Decisions

### 1. Frontend framework

**React + TypeScript**, built with Vite.

The prototype already has real client-side state (current session, in-memory
mistake bank, saved lists) that today is read back out of the DOM. Components +
a state store will make that tractable. TypeScript gives us a typed contract to
share with Supabase.

### 2. Backend

**Supabase** — authentication, Postgres database, and file storage. **No custom
backend server.** The frontend talks to Supabase directly (with Row Level
Security enforcing access).

### 3. Hebrew spelling-check rule

When comparing a typed answer to the stored word:

- **Ignore nikud entirely** — strip all niqqud marks from both sides before
  comparing.
- **Stay strict on ktiv male / ktiv haser** — the stored spelling is
  authoritative; a male/haser variant that differs from what is stored is
  wrong.
- **Trim surrounding whitespace** before comparing (internal spacing still
  matters).

Case handling for English stays as today (trim only). This rule lives in one
pure module reused everywhere grading happens (dictation, builder, choose,
race).

### 4. Privacy model

- An account belongs to a **parent or teacher**.
- A **child profile is just a first name + an avatar.** No email, no birth
  date, no other personal data collected about the child.
- Collect no unnecessary personal information anywhere.
- **Deleting the account deletes everything** associated with it (profiles,
  saved lists, progress, mistake history).

### 5. Hosting

Frontend deployed to **Netlify or Vercel** (final pick deferred). No separate
server to host — Supabase is the backend.

## Migration phases

| Phase | Goal |
| ----- | ---- |
| **0** | Repo scaffold: `git init`, npm-workspaces monorepo, prototype moved into `frontend/` and running under Vite, unchanged. **(this change)** |
| 1 | Extract content: `WORD_BANKS` and `TXT` → JSON data files. |
| 2 | Modularise the script into ES modules (`tts`, `grading`, `wordSource`, one per game); introduce TypeScript. No behaviour change. |
| 3 | Wrap the pure logic (spelling check, `generateMisspellings`) in tests. |
| 4 | Componentise screens in React; add a state store; replace `.hidden` toggling with real screen routing. |
| 5 | `storage` interface with a `localStorage` implementation — fixes "lost on reload" locally. |
| 6 | Supabase: parent/teacher auth, child profiles, saved lists + progress; swap the `storage` implementation to Supabase. |
| 7 | Word bank moves to Supabase with content management; optionally move OCR/PDF/Excel extraction server-side. |
| 8 | PWA (offline), then deploy. |

Work pauses for review at the end of each phase before the next begins.

## Notes

- pnpm is not installed on the dev machine; using **npm workspaces**.
- The repo lives inside a Google Drive folder. `.git/` in a synced folder can
  corrupt under concurrent sync — consider pausing Drive sync during work, or
  moving the working copy off the synced path and pushing to a remote.
