import { createLoader, type inferParserType } from 'nuqs';
import { getDataTableQuery, getDataTableSearchParams } from '@/lib/data-table-parsers';
import type { DataTableColumnConfigs } from '@/lib/data-table-types';
import { toURLSearchParams } from '@/lib/search-params';
import type { ProductFilters } from '../../api/types';

/** Filterable/sortable columns, shared by the column defs, the URL parsers and the API query. */
export const productsColumnConfigs = {
  name: { variant: 'text' },
  category: { variant: 'multiSelect', isSortable: false }
} as const satisfies DataTableColumnConfigs;

/** nuqs parsers for the products table URL state (page, perPage, sort, filters). */
export const productsSearchParams = getDataTableSearchParams({
  columnConfigs: productsColumnConfigs
});

const loadProductsSearchParams = createLoader(productsSearchParams);

/** Maps the parsed URL state to the products API filters. */
export function getProductFilters(search: Parameters<typeof getProductsQuery>[0]): ProductFilters {
  const { page, perPage, filters, sorting } = getProductsQuery(search);
  // The mock API supports a text search and an "is any of" list, so only the
  // toolbar's plain operators (iLike, inArray) are mapped.
  const name = filters.find((filter) => filter.id === 'name' && filter.operator === 'iLike')?.value;
  const categories = filters
    .filter((filter) => filter.id === 'category' && filter.operator === 'inArray')
    .flatMap((filter) => filter.value);

  return {
    page,
    limit: perPage,
    ...(typeof name === 'string' && name && { search: name }),
    ...(categories.length > 0 && { categories: categories.join(',') }),
    ...(sorting.length > 0 && { sort: JSON.stringify(sorting) })
  };
}

/** Same as getProductFilters, from a route loader's search object. */
export function getProductFiltersFromSearch(search: Record<string, unknown>) {
  return getProductFilters(loadProductsSearchParams(toURLSearchParams(search)));
}

function getProductsQuery(search: inferParserType<typeof productsSearchParams>) {
  return getDataTableQuery(search, productsColumnConfigs);
}
