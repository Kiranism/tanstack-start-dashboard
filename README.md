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

| Category           | Technology                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Framework          | [TanStack Start](https://tanstack.com/start)                                                          |
| Language           | [TypeScript](https://www.typescriptlang.org)                                                          |
| Build Tool         | [Vite 7](https://vite.dev)                                                                            |
| Deployment         | [Nitro](https://nitro.build) (Vercel, Cloudflare, Node.js)                                            |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com)                                                            |
| Components         | [Shadcn-ui](https://ui.shadcn.com)                                                                    |
| Routing            | [TanStack Router](https://tanstack.com/router) (file-based, type-safe)                                |
| Data Fetching      | [TanStack React Query](https://tanstack.com/query)                                                    |
| Tables             | [TanStack Table](https://tanstack.com/table)                                                          |
| Forms              | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev)                                   |
| Charts             | [Recharts](https://recharts.org)                                                                      |
| State Management   | [Zustand](https://zustand-demo.pmnd.rs)                                                               |
| Command+K          | [kbar](https://kbar.vercel.app/)                                                                      |
| Themes             | [tweakcn](https://tweakcn.com/)                                                                       |
| Linter / Formatter | [OxLint](https://oxc.rs/docs/guide/usage/linter) / [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) |

_If you are looking for a Next.js dashboard template, here is the [repo](https://git.new/shadcn-dashboard)._

## Features

- **Admin dashboard layout** (sidebar, header, content area)

- **Analytics overview** page with cards and Suspense-based independent loading

- **Data tables** with React Query route loaders, client-side cache, search, filter & pagination

- **Type-safe file-based routing** with TanStack Router (auto-generated route tree)

- **Server functions** via `createServerFn()` for server-side logic

- **Infobar component** to show helpful tips, status messages, or contextual info on any page

- **Shadcn UI components** with Tailwind CSS styling

- **Multi-theme support** with 10+ beautiful themes and easy theme switching

- **Feature-based folder structure** for scalable projects

- **Kanban board** with drag-n-drop (dnd-kit + Zustand)

- **Chat interface** with conversation list, message bubbles, and auto-reply demo

- **Notification center** with bell icon badge, popover preview, and full page view

- **Command palette** (Cmd+K) for quick navigation

- **Deploy anywhere** — Vercel, Cloudflare, Node.js via Nitro presets

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
│   ├── index.tsx                  # Home (auth redirect)
│   ├── auth/                      # Auth pages (sign-in, sign-up)
│   ├── dashboard.tsx              # Dashboard layout (sidebar, header, KBar)
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
│   └── kbar/                      # Command+K interface
│
├── features/                      # Feature-based modules
│   ├── overview/                  # Dashboard analytics (charts, cards)
│   ├── products/                  # Product listing, form, tables (React Query)
│   ├── users/                     # User management table (React Query)
│   ├── react-query-demo/          # React Query demo (Pokemon API)
│   ├── kanban/                    # Drag-drop task board
│   ├── chat/                      # Messaging (conversations, bubbles, composer)
│   ├── notifications/             # Notification center & store
│   ├── auth/                      # Auth components
│   └── forms/                     # Form showcases
│
├── lib/                           # Core utilities (query-client, parsers, etc.)
├── hooks/                         # Custom hooks (use-data-table, use-media-query, etc.)
├── config/                        # Navigation, infobar, data table config
├── constants/                     # Mock data
├── styles/                        # Global CSS & theme files
│   └── themes/                    # Individual theme CSS files (OKLCH)
└── types/                         # TypeScript types
```

## Getting Started

> [!NOTE]
> This admin dashboard starter uses **TanStack Start** with **React 19**, **Vite 7**, and **Shadcn UI**. Follow these steps to run it locally:

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

You should now be able to access the application at http://localhost:3000.

## Deploy

### Vercel (Recommended)

The project uses **Nitro** with the `vercel` preset. Just connect your GitHub repo to Vercel:

- **Build Command:** `bun run build`
- **Output Directory:** leave blank (auto-detected)
- **Framework Preset:** Other

### Other Platforms

Change the Nitro preset in `vite.config.ts`:

```ts
// Cloudflare Pages
nitro({ preset: 'cloudflare-pages' });

// Node.js server
nitro({ preset: 'node-server' });

// Netlify
nitro({ preset: 'netlify' });
```

Then run locally with:

```bash
bun run build
bun run start
```

## Key Differences from Next.js Version

| Concept       | Next.js                                 | TanStack Start                                   |
| ------------- | --------------------------------------- | ------------------------------------------------ |
| Routing       | App Router (`app/`)                     | File-based (`routes/`) with type-safe params     |
| Data Fetching | Server Components + `HydrationBoundary` | Route `loader` + `useSuspenseQuery`              |
| Layouts       | `layout.tsx` nesting                    | Layout routes with `<Outlet />`                  |
| Server Code   | `'use server'` actions                  | `createServerFn()`                               |
| Build Tool    | Webpack/Turbopack                       | Vite                                             |
| Deployment    | `next start`                            | Nitro (any platform)                             |
| URL State     | nuqs                                    | TanStack Router `useSearch()` + `validateSearch` |

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
