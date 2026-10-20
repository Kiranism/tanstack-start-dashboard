import { createLoader, type inferParserType } from 'nuqs';
import { getDataTableQuery, getDataTableSearchParams } from '@/lib/data-table-parsers';
import type { DataTableColumnConfigs } from '@/lib/data-table-types';
import { toURLSearchParams } from '@/lib/search-params';
import type { UserFilters } from '../../api/types';

/** Filterable/sortable columns, shared by the column defs, the URL parsers and the API query. */
export const usersColumnConfigs = {
  name: { variant: 'text' },
  role: { variant: 'multiSelect', isSortable: false }
} as const satisfies DataTableColumnConfigs;

/** nuqs parsers for the users table URL state (page, perPage, sort, filters). */
export const usersSearchParams = getDataTableSearchParams({ columnConfigs: usersColumnConfigs });

const loadUsersSearchParams = createLoader(usersSearchParams);

/** Maps the parsed URL state to the users API filters. */
export function getUserFilters(search: Parameters<typeof getUsersQuery>[0]): UserFilters {
  const { page, perPage, filters, sorting } = getUsersQuery(search);
  // The mock API supports a text search and an "is any of" list, so only the
  // toolbar's plain operators (iLike, inArray) are mapped.
  const name = filters.find((filter) => filter.id === 'name' && filter.operator === 'iLike')?.value;
  const roles = filters
    .filter((filter) => filter.id === 'role' && filter.operator === 'inArray')
    .flatMap((filter) => filter.value);

  return {
    page,
    limit: perPage,
    ...(typeof name === 'string' && name && { search: name }),
    ...(roles.length > 0 && { roles: roles.join(',') }),
    ...(sorting.length > 0 && { sort: JSON.stringify(sorting) })
  };
}

/** Same as getUserFilters, from a route loader's search object. */
export function getUserFiltersFromSearch(search: Record<string, unknown>) {
  return getUserFilters(loadUsersSearchParams(toURLSearchParams(search)));
}

function getUsersQuery(search: inferParserType<typeof usersSearchParams>) {
  return getDataTableQuery(search, usersColumnConfigs);
}
