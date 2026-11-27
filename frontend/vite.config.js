import { defineConfig } from 'vite';

// Phase 0: the app is still the single-file prototype (index.html with inline
// CSS + a classic <script>). Vite serves it as-is with zero transforms.
// This config only pins the dev server so the URL is stable across machines.
export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    strictPort: true,
    open: false,
  },
  build: {
    outDir: 'dist',
  },
});
