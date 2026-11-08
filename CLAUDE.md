# CLAUDE.md

This is a TanStack Start + shadcn/ui (Base UI) admin dashboard starter kit.

## Key References

- **[AGENTS.md](./AGENTS.md)**: project overview, commands, structure, conventions, deployment
- **[README.md](./README.md)**: features, TanStack Start patterns, authentication, getting started, deploy

## Critical Conventions

- **Server functions** for data: `createServerFn().middleware([authMiddleware]).validator(zod).handler(...)` in `features/*/api/service.ts`; server-only code in `*.server.ts`
- **React Query**: loaders prefetch with `void queryClient.query(opts).catch(noop)`, components use `useSuspenseQuery`; `api/mutations.ts` `mutationOptions` invalidate in `onSuccess`
- **No deprecated APIs**: `bun run lint` fails on them
- **Icons** only from `@/components/icons`; **forms** via `useAppForm` + `form.AppField`
- **Don't hand-edit** `src/components/ui/`, `src/components/data-table/`, `src/hooks/use-data-table.ts` (upstream code) or `src/routeTree.gen.ts` (generated)
- **Formatting**: single quotes, JSX single quotes, no trailing comma, 2-space indent
- **Commits**: Conventional Commits
