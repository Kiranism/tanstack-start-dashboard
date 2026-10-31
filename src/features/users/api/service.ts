// ============================================================
// User Service — Data Access Layer
// ============================================================
// This is the ONLY file you modify when connecting to your backend.
// Queries (queries.ts) and components import from here — they never change.
//
// Every export is a TanStack Start server function: the handler only runs on
// the server (the client gets an RPC stub), the validator checks the input on
// the server, and authMiddleware rejects signed-out callers.
//
// Replace the handler bodies with your data source:
//
// 1. ORM / database (Prisma, Drizzle, Supabase): query it directly in the
//    handler. Keep the client in a `*.server.ts` file so it never ships to the
//    browser.
//
// 2. External backend (Laravel, Go, etc.): `fetch()` it from the handler, which
//    keeps API keys on the server.
//
// Current: Mock (in-memory fake data in constants/mock-api-users.server.ts)
// ============================================================

import { createServerFn } from '@tanstack/react-start';
import * as z from 'zod';
import { fakeUsers } from '@/constants/mock-api-users.server';
import { authMiddleware } from '@/features/auth/api/middleware';
import { userSchema } from '../schemas/user';
import type { UsersResponse } from './types';

const userFiltersSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  roles: z.string().optional(),
  search: z.string().optional(),
  sort: z.string().optional()
});

export const getUsers = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .validator(userFiltersSchema)
  .handler(({ data }): Promise<UsersResponse> => fakeUsers.getUsers(data));

export const createUser = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(userSchema)
  .handler(({ data }) => fakeUsers.createUser(data));

export const updateUser = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), values: userSchema }))
  .handler(({ data }) => fakeUsers.updateUser(data.id, data.values));

export const deleteUser = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(({ data: id }) => fakeUsers.deleteUser(id));
