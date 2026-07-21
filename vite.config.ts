import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nitro } from 'nitro/vite';

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart(),
    // Nitro auto-detects the deploy target: Vercel/Cloudflare/Netlify in their
    // CI (zero-config), and the Node.js server preset locally (.output/server,
    // matching the `start` script). Override with SERVER_PRESET to force one,
    // e.g. SERVER_PRESET=node-server / cloudflare-module / bun.
    nitro({ preset: process.env.SERVER_PRESET }),
    viteReact()
  ]
});
