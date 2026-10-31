<h1 align="center">Admin Dashboard with TanStack Start & Shadcn UI</h1>

<div align="center">Open source admin dashboard starter built with TanStack Start, shadcn/ui, Tailwind CSS, TypeScript</div>

<br />

<div align="center">
  <a href="https://dub.sh/tanstack-start-dashboard"><strong>View Demo</strong></a>
</div>
<br />
<div align="center">
  <img src="/public/tanstack-dashboard.png" alt="TanStack Start Dashboard Cover" style="max-width: 100%; border-radius: 8px;" />
</div>

<p align="center">
  <a href="https://github.com/Kiranism/tanstack-start-dashboard/stargazers"><img src="https://img.shields.io/github/stars/Kiranism/tanstack-start-dashboard?style=social" alt="GitHub stars" /></a>
  <a href="https://github.com/Kiranism/tanstack-start-dashboard/network/members"><img src="https://img.shields.io/github/forks/Kiranism/tanstack-start-dashboard?style=social" alt="Forks" /></a>
  <a href="https://github.com/Kiranism/tanstack-start-dashboard/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/TanStack_Start-1.x-FF4154" alt="TanStack Start" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
</p>

## Overview

This is an **open source admin dashboard starter** built with **TanStack Start, Shadcn UI, TypeScript, and Tailwind CSS**.

It gives you a production-ready **dashboard UI** with charts, tables, forms, and a feature-based folder structure, perfect for **SaaS apps, internal tools, and admin panels**.

### Tech Stack

| Category           | Technology                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Framework          | [TanStack Start](https://tanstack.com/start)                                                                                 |
| Language           | [TypeScript](https://www.typescriptlang.org)                                                                                 |
| Build Tool         | [Vite 7](https://vite.dev)                                                                                                   |
| Deployment         | [Nitro](https://nitro.build) (Vercel, Cloudflare, Node.js)                                                                   |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com)                                                                                   |
| Components         | [Shadcn-ui](https://ui.shadcn.com)                                                                                           |
| Routing            | [TanStack Router](https://tanstack.com/router) (file-based, type-safe)                                                       |
| Data Fetching      | [TanStack React Query](https://tanstack.com/query)                                                                           |
| Tables             | [TanStack Table](https://tanstack.com/table)                                                                                 |
| Forms              | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev)                                                          |
| Charts             | [Recharts](https://recharts.org)                                                                                             |
| State Management   | [Zustand](https://zustand-demo.pmnd.rs)                                                                                      |
| Command+K          | [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete) + [TanStack Hotkeys](https://tanstack.com/hotkeys) |
| Themes             | [tweakcn](https://tweakcn.com/)                                                                                              |
| Linter / Formatter | [OxLint](https://oxc.rs/docs/guide/usage/linter) / [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)                        |

_If you are looking for a Next.js dashboard template, here is the [repo](https://git.new/shadcn-dashboard)._

## Features

- **Admin dashboard layout** (sidebar, header, content area)

- **Analytics overview** page with cards and Suspense-based independent loading

- **Data tables** with React Query route loaders, client-side cache, search, filter & pagination

- **Type-safe file-based routing** with TanStack Router (auto-generated route tree)

- **Authentication** with encrypted cookie sessions, a guarded `/dashboard` layout and auth middleware on every data server function (demo account included)

- **Server functions** via `createServerFn()` with Zod validators for all data access, so mock data and secrets stay on the server

- **Server routes** (`src/routes/api/*`) for plain HTTP endpoints such as webhooks and health checks

- **Infobar component** to show helpful tips, status messages, or contextual info on any page

- **Shadcn UI components** with Tailwind CSS styling

- **Multi-theme support** with 10+ beautiful themes and easy theme switching

- **Feature-based folder structure** for scalable projects

- **Kanban board** with drag-n-drop (dnd-kit + Zustand)

- **Chat interface** with conversation list, message bubbles, and auto-reply demo

- **Notification center** with bell icon badge, popover preview, and full page view

- **Command palette** (Cmd+K) for quick navigation

- **Deploy anywhere**: Vercel, Railway, Render and Node.js via Nitro; Cloudflare and Netlify via their official Vite plugins

## Pages

| Page                                          | Description                                                                                                                |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| [Dashboard Overview](/dashboard/overview)     | Cards with Recharts graphs. Suspense boundaries for independent loading/error per section.                                 |
| [Product List (Table)](/dashboard/product)    | TanStack Table + React Query (route loader prefetch + client cache) with URL search params for search, filter, pagination. |
| [Create Product Form](/dashboard/product/new) | TanStack Form + Zod with `useMutation` for create/update. Cache invalidation on success.                                   |
| [Users (Table)](/dashboard/users)             | Users table with React Query + URL state pattern. Same architecture as Products.                                           |
| [React Query Demo](/dashboard/react-query)    | Pokemon API showcase demonstrating route loader + `useSuspenseQuery` pattern with client-side cache.                       |
| [Kanban Board](/dashboard/kanban)             | Drag n Drop task management board with dnd-kit and Zustand. Column sorting, task cards with priority badges.               |
| [Chat](/dashboard/chat)                       | Messaging UI with conversation list, message bubbles, quick replies, file attachments.                                     |
| [Notifications](/dashboard/notifications)     | Notification center with bell icon badge, popover preview, and dedicated full page with tabs.                              |
| [Forms](/dashboard/forms/basic)               | Basic, Multi-step, Sheet/Dialog, and Advanced form patterns with TanStack Form + Zod.                                      |
| [Not Found](/notfound)                        | Custom 404 page via TanStack Router's `defaultNotFoundComponent`.                                                          |

## Feature-based Organization

```plaintext
src/
├── routes/                        # TanStack Router file-based routes
│   ├── __root.tsx                 # Root layout (providers, theme, HTML shell)
│   ├── index.tsx                  # Home (redirects to the dashboard)
│   ├── api/                       # Server routes (HTTP handlers, e.g. /api/health)
│   ├── auth.tsx                   # Auth layout (sends signed-in users onward)
│   ├── auth/                      # Auth pages (sign-in, sign-up)
│   ├── dashboard.tsx              # Dashboard layout + auth guard (sidebar, header, command palette)
│   └── dashboard/                 # Dashboard pages
│       ├── overview.tsx           # Analytics with Suspense boundaries
│       ├── product/               # Product CRUD (route loaders + React Query)
│       ├── users.tsx              # Users table (route loaders + React Query)
│       ├── react-query.tsx        # React Query demo page
│       ├── kanban.tsx             # Task board page
│       ├── chat.tsx               # Messaging page
│       ├── notifications.tsx      # Notifications page
│       ├── forms/                 # Form examples
│       └── elements/              # UI showcase
│
├── components/                    # Shared components
│   ├── ui/                        # UI primitives (buttons, inputs, kanban, etc.)
│   ├── layout/                    # Layout components (header, sidebar, etc.)
│   ├── themes/                    # Theme system (selector, mode toggle, config)
│   └── command-palette/           # Command+K interface
│
├── features/                      # Feature-based modules
│   ├── overview/                  # Dashboard analytics (charts, cards)
│   ├── products/                  # Product listing, form, tables (React Query)
│   ├── users/                     # User management table (React Query)
│   ├── react-query-demo/          # React Query demo (Pokemon API)
│   ├── kanban/                    # Drag-drop task board
│   ├── chat/                      # Messaging (conversations, bubbles, composer)
│   ├── notifications/             # Notification center & store
│   ├── auth/                      # Session, sign in/up/out server functions, auth middleware, forms
│   └── forms/                     # Form showcases
│
├── lib/                           # Core utilities (query-client, parsers, etc.)
├── hooks/                         # Custom hooks (use-data-table, use-media-query, etc.)
├── config/                        # Navigation, infobar, data table config
├── constants/                     # Mock data (`*.server.ts`, never sent to the browser)
├── styles/                        # Global CSS & theme files
│   └── themes/                    # Individual theme CSS files (OKLCH)
└── types/                         # TypeScript types
```

## TanStack Start Patterns

The starter follows the conventions of the official [TanStack Start examples](https://github.com/TanStack/router/tree/main/examples/react) (`start-basic`, `start-basic-auth`, `start-supabase-basic`, `start-basic-authjs`, `start-basic-static`, `start-basic-cloudflare`):

| Pattern                                                                                       | Where                                                            |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Router factory per request (`getRouter`) with default error, not-found and pending components | `src/router.tsx`                                                 |
| HTML document as the root `shellComponent`, so errors and 404s keep the theme                 | `src/routes/__root.tsx`                                          |
| Current user loaded in the root `beforeLoad` and exposed as `context.user`                    | `src/routes/__root.tsx`                                          |
| Layout route guard: `beforeLoad` + `redirect()` with a `redirect` search param                | `src/routes/dashboard.tsx`, `src/routes/auth.tsx`                |
| Data access through `createServerFn()` with Zod validators and auth middleware                | `src/features/*/api/service.ts`                                  |
| Server-only modules via the `*.server.ts` suffix (enforced by Start's import protection)      | `src/constants/*.server.ts`, `src/features/auth/api/*.server.ts` |
| `throw notFound()` from server functions and loaders, with per-route `notFoundComponent`      | `src/routes/dashboard/product/$productId.tsx`                    |
| Server routes with HTTP handlers                                                              | `src/routes/api/health.ts`                                       |
| CSRF protection for server functions                                                          | `src/start.ts`                                                   |

### Authentication

Sessions are encrypted, httpOnly cookies ([iron-session](https://github.com/vvo/iron-session) over Start's cookie helpers), the same approach as `start-basic-auth`. Accounts live in memory (`src/features/auth/api/accounts.server.ts`); sign in with **demo@example.com / demo1234** or create an account.

To use a real backend, replace `verifyCredentials` and `createAccount` with database calls, or swap the auth feature for a provider by following the matching official example: [Supabase](https://github.com/TanStack/router/tree/main/examples/react/start-supabase-basic), [Auth.js](https://github.com/TanStack/router/tree/main/examples/react/start-basic-authjs). The route guards and `authMiddleware` stay the same: only `getCurrentUser` and the session helper change.

## Getting Started

> [!NOTE]
> This admin dashboard starter uses **TanStack Start** with **React 19**, **Vite 8**, and **Shadcn UI**. Follow these steps to run it locally:

Clone the repo:

```bash
git clone https://github.com/Kiranism/tanstack-start-dashboard.git
cd tanstack-start-dashboard
```

Install dependencies and run:

```bash
bun install
cp env.example.txt .env
bun run dev
```

You should now be able to access the application at http://localhost:3000. Sign in with the demo account (**demo@example.com / demo1234**, prefilled on the sign-in page).

`vite dev` works without any environment variables. Production builds require `SESSION_SECRET` (at least 32 characters, e.g. `openssl rand -base64 32`).

## Deploy

The starter builds with [Nitro](https://nitro.build), the default host in TanStack's own CLI templates (`npm create @tanstack/start`). Set `SESSION_SECRET` (at least 32 characters) wherever you deploy.

| Host               | Setup                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel             | Import the repo. `vercel.json` selects the TanStack Start framework preset; build command `bun run build`.                                                                                                                             |
| Railway, Render    | Connect the repo; they detect the Nitro build.                                                                                                                                                                                         |
| Node.js / Docker   | `bun run build`, then `bun run start` (`node .output/server/index.mjs`).                                                                                                                                                               |
| Cloudflare Workers | Official setup: replace `nitro()` in `vite.config.ts` with `@cloudflare/vite-plugin` and add a `wrangler.jsonc`, as in [`start-basic-cloudflare`](https://github.com/TanStack/router/tree/main/examples/react/start-basic-cloudflare). |
| Netlify            | Official setup: replace `nitro()` with [`@netlify/vite-plugin-tanstack-start`](https://www.npmjs.com/package/@netlify/vite-plugin-tanstack-start).                                                                                     |

Nitro detects the target in each host's CI. To force one, set `SERVER_PRESET` at build time (for example `SERVER_PRESET=node-server bun run build`). See TanStack's [hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for details.

For fully static marketing pages, see the `prerender` option in [`start-basic-static`](https://github.com/TanStack/router/tree/main/examples/react/start-basic-static).

## Key Differences from Next.js Version

| Concept       | Next.js                                 | TanStack Start                               |
| ------------- | --------------------------------------- | -------------------------------------------- |
| Routing       | App Router (`app/`)                     | File-based (`routes/`) with type-safe params |
| Data Fetching | Server Components + `HydrationBoundary` | Route `loader` + `useSuspenseQuery`          |
| Layouts       | `layout.tsx` nesting                    | Layout routes with `<Outlet />`              |
| Server Code   | `'use server'` actions                  | `createServerFn()` + middleware              |
| Build Tool    | Webpack/Turbopack                       | Vite                                         |
| Deployment    | `next start`                            | Nitro (any platform)                         |
| URL State     | nuqs                                    | nuqs (TanStack Router adapter)               |
| Auth          | Clerk                                   | Cookie session + `beforeLoad` guards         |

### Support

If you find this template helpful, please consider giving it a star!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=flat-square&logo=buymeacoffee)](https://buymeacoffee.com/kir4n)

Cheers!

<!--

SEO keywords:

tanstack start dashboard, tanstack start admin template, vite dashboard template,

shadcn ui dashboard, admin dashboard starter, tanstack router, typescript dashboard,

dashboard ui template, react admin dashboard, tailwind css admin dashboard,

tanstack start shadcn admin panel

-->
