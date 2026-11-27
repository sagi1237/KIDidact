import { defineConfig } from 'vite';

// The app is still the single-file prototype (index.html with inline CSS + a
// classic <script>). Vite serves it as-is in development.
export default defineConfig(({ command, isPreview }) => ({
  root: '.',
  // GitHub Pages serves the site from /KIDidact/; the dev server stays at /.
  base: command === 'build' || isPreview ? '/KIDidact/' : '/',
  server: {
    port: 5173,
    strictPort: true,
    open: false,
  },
  build: {
    outDir: 'dist',
  },
}));
