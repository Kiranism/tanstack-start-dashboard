import { useDeferredValue } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { productsQueryOptions } from '../../api/queries';
import { columns } from './columns';
import { getProductFilters, productsSearchParams } from './search-params';

export function ProductTable() {
  const [search] = useQueryStates(productsSearchParams);
  // Query with the deferred params: a new filter keeps the current rows on
  // screen while its query suspends, instead of flashing the Suspense fallback.
  const deferredSearch = useDeferredValue(search);

  const { data } = useSuspenseQuery(productsQueryOptions(getProductFilters(deferredSearch)));

  const pageCount = Math.ceil(data.total_products / deferredSearch.perPage);

  const { table } = useDataTable({
    data: data.products,
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
