# @kididact/frontend

The KIDidact web app.

## Phase 0 (current)

This workspace currently contains **only the original prototype**,
[`index.html`](index.html) — a single self-contained file:

- all CSS inline in one `<style>` block
- all logic in one classic `<script>` (~1330 lines, global scope, `onclick=`
  handlers in markup)
- built-in word banks (`WORD_BANKS`) and UI strings (`TXT`) for `he` / `en`
- import features (Excel / PDF / image OCR) lazy-load libraries from CDN at
  runtime: SheetJS, pdf.js, tesseract.js

Vite serves this file with no transformation. There is no React and no
TypeScript here **yet** — that starts in a later phase.

## Run

```bash
# from the repo root
npm install
npm run dev
```

http://localhost:5173

## Known gaps (to be addressed in later phases)

- No persistence — saved lists, progress, and the mistake bank live in memory
  and reset on reload.
- Spelling check is exact string match. Target rule (locked): ignore Hebrew
  nikud entirely, stay strict on ktiv male/haser exactly as stored, trim
  surrounding whitespace.
- Import features need network (CDN) and won't work offline.
- Core logic (grading, distractor generation) is entangled with the DOM and has
  no test seam.
