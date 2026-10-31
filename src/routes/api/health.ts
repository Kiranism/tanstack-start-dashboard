import { createFileRoute } from '@tanstack/react-router';

// A server route: plain HTTP handlers, no React. Use these for webhooks, public
// REST endpoints or uptime checks; use server functions for your own UI.
export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: () => Response.json({ status: 'ok', time: new Date().toISOString() })
    }
  }
});
