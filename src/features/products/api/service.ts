// ============================================================
// Product Service — Data Access Layer
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
// Current: Mock (in-memory fake data in constants/mock-api.server.ts)
// ============================================================

import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import * as z from 'zod';
import { fakeProducts } from '@/constants/mock-api.server';
import { authMiddleware } from '@/features/auth/api/middleware';
import { productSchema } from '../schemas/product';
import type { ProductByIdResponse, ProductsResponse } from './types';

const productFiltersSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  categories: z.string().optional(),
  search: z.string().optional(),
  sort: z.string().optional()
});

const productPayloadSchema = productSchema.omit({ image: true });

export const getProducts = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .validator(productFiltersSchema)
  .handler(({ data }): Promise<ProductsResponse> => fakeProducts.getProducts(data));

export const getProductById = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(async ({ data: id }) => {
    const result = await fakeProducts.getProductById(id);
    // Thrown from a loader, this renders the route's notFoundComponent (404).
    if (!result.success || !result.product) throw notFound();
    return result as ProductByIdResponse;
  });

export const createProduct = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(productPayloadSchema)
  .handler(({ data }) => fakeProducts.createProduct(data));

export const updateProduct = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), values: productPayloadSchema }))
  .handler(({ data }) => fakeProducts.updateProduct(data.id, data.values));

export const deleteProduct = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(({ data: id }) => fakeProducts.deleteProduct(id));
