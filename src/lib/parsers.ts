import { z } from "zod";

import { dataTableConfig } from "@/config/data-table";

import type { ExtendedColumnFilter, ExtendedColumnSort } from "@/types/data-table";

const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
});

export function parseSortingState<TData>(
  value: string | undefined,
  columnIds?: string[] | Set<string>,
): ExtendedColumnSort<TData>[] {
  if (!value) return [];
  const validKeys = columnIds ? (columnIds instanceof Set ? columnIds : new Set(columnIds)) : null;

  try {
    const parsed = JSON.parse(value);
    const result = z.array(sortingItemSchema).safeParse(parsed);
    if (!result.success) return [];
    if (validKeys && result.data.some((item) => !validKeys.has(item.id))) return [];
    return result.data as ExtendedColumnSort<TData>[];
  } catch {
    return [];
  }
}

export function serializeSortingState<TData>(value: ExtendedColumnSort<TData>[]): string {
  return JSON.stringify(value);
}

const filterItemSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  variant: z.enum(dataTableConfig.filterVariants),
  operator: z.enum(dataTableConfig.operators),
  filterId: z.string(),
});

export type FilterItemSchema = z.infer<typeof filterItemSchema>;

export function parseFiltersState<TData>(
  value: string | undefined,
  columnIds?: string[] | Set<string>,
): ExtendedColumnFilter<TData>[] {
  if (!value) return [];
  const validKeys = columnIds ? (columnIds instanceof Set ? columnIds : new Set(columnIds)) : null;

  try {
    const parsed = JSON.parse(value);
    const result = z.array(filterItemSchema).safeParse(parsed);
    if (!result.success) return [];
    if (validKeys && result.data.some((item) => !validKeys.has(item.id))) return [];
    return result.data as ExtendedColumnFilter<TData>[];
  } catch {
    return [];
  }
}

export function serializeFiltersState<TData>(value: ExtendedColumnFilter<TData>[]): string {
  return JSON.stringify(value);
}

// Legacy export for backward compatibility
export const getSortingStateParser = <TData>(columnIds?: string[] | Set<string>) => ({
  parse: (value: string) => parseSortingState<TData>(value, columnIds),
  serialize: (value: ExtendedColumnSort<TData>[]) => serializeSortingState(value),
});

export const getFiltersStateParser = <TData>(columnIds?: string[] | Set<string>) => ({
  parse: (value: string) => parseFiltersState<TData>(value, columnIds),
  serialize: (value: ExtendedColumnFilter<TData>[]) => serializeFiltersState(value),
});
