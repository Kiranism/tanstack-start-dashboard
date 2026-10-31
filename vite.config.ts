import { devtools } from '@tanstack/devtools-vite';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';

export default defineConfig({
  server: { port: 3000 },
  // Vite 8 resolves tsconfig `paths` (the `@/*` alias) natively.
  resolve: { tsconfigPaths: true },
  plugins: [
    // Must come first. Strips the devtools from production builds.
    devtools(),
    tailwindcss(),
    tanstackStart(),
    // Nitro is the default host in TanStack's own CLI templates: it covers
    // Vercel, Railway, Render and Node.js (.output/server, matching the `start`
    // script), auto-detecting the target in CI. Override with SERVER_PRESET.
    // For Cloudflare or Netlify, the official setup swaps this for their Vite
    // plugin instead (see README > Deploy).
    nitro({ preset: process.env.SERVER_PRESET }),
    // Must come after tanstackStart().
    viteReact()
  ]
});
