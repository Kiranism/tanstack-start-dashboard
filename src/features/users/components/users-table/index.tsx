import { useDeferredValue } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { usersQueryOptions } from '../../api/queries';
import { columns } from './columns';
import { getUserFilters, usersSearchParams } from './search-params';

export function UsersTable() {
  const [search] = useQueryStates(usersSearchParams);
  // Query with the deferred params: a new filter keeps the current rows on
  // screen while its query suspends, instead of flashing the Suspense fallback.
  const deferredSearch = useDeferredValue(search);

  const { data } = useSuspenseQuery(usersQueryOptions(getUserFilters(deferredSearch)));

  const pageCount = Math.ceil(data.total_users / deferredSearch.perPage);

  const { table } = useDataTable({
    data: data.users,
    columns,
    pageCount,
    shallow: true,
    debounceMs: 500,
    initialState: {
      columnPinning: { start: [], end: ['actions'] }
    }
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className='flex flex-1 animate-pulse flex-col gap-4'>
      <div className='h-10 w-full rounded bg-muted' />
      <div className='h-96 w-full rounded-lg bg-muted' />
      <div className='h-10 w-full rounded bg-muted' />
    </div>
  );
}
