# KIDidact

Spelling & writing practice app for kids — Hebrew and English.

Two activities today (both in the prototype): a **dictation game** (listen to a
word, type it) and a **practice hub** with three mini-games (Word Builder,
"Which one's correct?", Race against time).

## Status

**Phase 0 — repo scaffold.** The whole app is still the original single-file
prototype at [`frontend/index.html`](frontend/index.html) (~2200 lines: inline
CSS + one classic `<script>`, no build step). It has been moved into the
`frontend/` workspace and now runs under Vite, unchanged. Nothing has been
refactored yet.

See the migration plan and locked decisions in
[`docs/decisions/0001-stack-and-scope.md`](docs/decisions/0001-stack-and-scope.md).

## Stack (target)

| Layer    | Choice                                             |
| -------- | ------------------------------------------------- |
| Frontend | React + TypeScript (Vite)                          |
| Backend  | Supabase (auth + Postgres + storage) — no custom server |
| Hosting  | GitHub Pages (frontend only)                       |

## Repo layout

```
kididact/
├── frontend/        # the app (Phase 0: the prototype, served by Vite)
├── docs/
│   └── decisions/   # architecture decision records
└── package.json      # npm workspaces root
```

More workspaces (`shared/`, `supabase/`) will be added in later phases.

## Getting started

Requires Node >= 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

> **Voice:** the dictation uses the browser's Web Speech API. Hebrew/English
> text-to-speech depends on voices installed in the OS/browser. Use the
> "בדיקת קול / Test sound" button on the setup screen to check.

## Scripts

Run from the repo root:

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the Vite dev server (frontend)  |
| `npm run build`   | Production build to `frontend/dist/`  |
| `npm run preview` | Serve the production build locally    |
