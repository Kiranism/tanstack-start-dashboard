# AGENTS.md - AI Coding Agent Reference

This file gives AI coding agents the project-specific details, conventions and commands they need. It complements the [README](./README.md).

---

## Project Overview

**TanStack Start Dashboard** is an admin dashboard starter built with:

- **Framework**: TanStack Start v1 (TanStack Router, file-based routing) on Vite 8
- **Server**: Nitro (default host of TanStack's CLI templates)
- **Language**: TypeScript 7, strict mode
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (base-nova style, Base UI primitives). No Radix.
- **Authentication**: encrypted cookie sessions (iron-session) with `beforeLoad` route guards
- **Data**: TanStack Query, TanStack Table, TanStack Form + Zod
- **Charts**: Recharts
- **Containerization**: Docker (Node.js and Bun Dockerfiles)
- **Package Manager**: Bun

It is the twin of the [Next.js version](https://github.com/Kiranism/next-shadcn-dashboard-starter). `src/components/ui/` and the styling are kept identical; only the framework layer differs.

---

## Commands

| Command                | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `bun run dev`          | Dev server on http://localhost:3000 (no env vars needed)     |
| `bun run build`        | `vite build && tsc --noEmit` (production build + type check) |
| `bun run start`        | Run the built server (`node .output/server/index.mjs`)       |
| `bun run preview`      | Preview the production build with Vite                       |
| `bun run typecheck`    | `tsc --noEmit`                                               |
| `bun run lint`         | oxlint, then `lint:deprecated` (fails on any deprecated API) |
| `bun run format`       | oxfmt                                                        |
| `bun run format:check` | oxfmt in check mode (CI runs this)                           |

Git hooks (husky): pre-commit formats staged files with oxfmt (lint-staged), pre-push runs `bun run build`. CI (`.github/workflows/ci.yml`) runs `format:check`, `lint` and `build` on every PR.

Production needs `SESSION_SECRET` (32+ characters, `openssl rand -base64 32`). See `env.example.txt`.

---

## Project Structure

```plaintext
src/
├── routes/                 # File-based routes (routeTree.gen.ts is generated, never edit it)
│   ├── __root.tsx          # shellComponent (HTML document), head/SEO, root beforeLoad -> context.user
│   ├── dashboard.tsx       # Dashboard layout + auth guard (beforeLoad redirect)
│   ├── auth.tsx            # Auth layout (sends signed-in users onward)
│   └── api/                # Server routes (server.handlers), e.g. /api/health
├── router.tsx              # getRouter(): QueryClient per request, default error/404/pending
├── start.ts                # createStart(): CSRF middleware for server functions
├── features/<feature>/     # Feature modules: api/, components/, schemas/, hooks/
├── components/ui/          # shadcn/ui primitives (upstream code, keep verbatim)
├── components/data-table/  # DiceUI data table (upstream code, keep verbatim)
├── components/forms/       # TanStack Form field components
├── components/layout/      # Sidebar, header, page container
├── config/                 # site.ts (SEO), nav-config.ts, infoconfig.ts
├── constants/              # Mock data, *.server.ts (never shipped to the browser)
├── lib/                    # seo.ts, form.ts, utils, data table helpers
├── hooks/                  # Shared hooks
└── styles/                 # globals.css + themes/ (OKLCH)
```

---

## Critical Conventions

### Data access: server functions

Each feature has `api/types.ts` -> `api/service.ts` -> `api/queries.ts` (+ `api/mutations.ts` for writes).

- `service.ts` exports server functions: `createServerFn({ method }).middleware([authMiddleware]).validator(zodSchema).handler(...)`. This is the only file to change when connecting a real backend.
- `queries.ts` exports query key factories and `queryOptions` that call the server functions (`getProducts({ data: filters })`).
- Components and loaders import from `service.ts` and `queries.ts`, never from `constants/mock-api*.server.ts`.
- Every server function that touches private data needs `authMiddleware`. Route guards only control navigation.
- Server-only modules use the `.server.ts` suffix; Start's import protection keeps them out of the client bundle.

### Routing and loading

- Loaders prefetch with `void context.queryClient.query(opts).catch(noop)` (or `query({ ...opts, staleTime: 'static' })` when the loader needs the data); components read with `useSuspenseQuery`. `prefetchQuery` and `ensureQueryData` are deprecated, and `lint:deprecated` fails on them.
- Missing records: `throw notFound()` from the server function or loader, never from a component (breaks SSR). Routes can set `notFoundComponent`.
- Guards: `beforeLoad` + `throw redirect({ to, search: { redirect: location.href } })`.
- Mutations: `api/mutations.ts` exports `mutationOptions` that call the server function and invalidate the feature's keys in `onSuccess` (`context.client.invalidateQueries`); components call `useMutation(createProductMutation)`.
- URL state (table search, filters, pagination) uses nuqs with the TanStack Router adapter.

### SEO

- Public routes use `head: () => ({ meta: seo({ title, description, path }) })` from `src/lib/seo.ts`. Site-wide values live in `src/config/site.ts`.
- Dashboard pages only set a title; the `/dashboard` layout adds `noindex`.
- `public/sitemap.xml` and `public/robots.txt` hardcode the site URL: update them with `siteConfig.url`.

### UI

- **Icons**: import from `@/components/icons` only, never from `@tabler/icons-react` directly.
- **Forms**: `useAppForm` from `@/lib/form` + `form.AppField` rendering `field.TextField`, `field.SelectField`, etc.; form-level Zod `onSubmit` validators; add `noValidate` to `<form>` so Zod messages show instead of native ones.
- **Page headers**: use `PageContainer` props (`pageTitle`, `pageDescription`, `pageHeaderAction`).
- **Base UI**: compose with the `render` prop (not `asChild`). Combobox and Autocomplete take an `items` prop.
- **Hydration**: values that differ between server and client (times, random data) render after `useHydrated()`.
- `src/components/ui/`, `src/components/data-table/` and `src/hooks/use-data-table.ts` are upstream registry code. Update them from upstream instead of editing by hand.

### Formatting and commits

- Single quotes, JSX single quotes, no trailing commas, 2-space indent (oxfmt enforces it).
- Commits and PR titles follow Conventional Commits (`feat:`, `fix:`, `chore(deps):`). A workflow checks PR titles.
- Dependencies: Renovate opens grouped weekly PRs and waits 7 days after each release; `bunfig.toml` applies the same 7-day minimum to `bun add`.

---

## Deployment

Nitro picks the target from the host's CI (Vercel, Railway, Render, Node.js). Force one with `SERVER_PRESET` at build time. Docker: `Dockerfile` (Node.js) and `Dockerfile.bun` (Bun) build a self-contained `.output/`. Set `SESSION_SECRET` at runtime everywhere. See README > Deploy.
