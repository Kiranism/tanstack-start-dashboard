import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { parseSortingState } from "@/lib/parsers";
import { productsQueryOptions } from "../../api/queries";
import { columns } from "./columns";

const columnIds = columns.map((c) => c.id).filter(Boolean) as string[];

export function ProductTable() {
  const search = useSearch({ strict: false }) as Record<string, unknown>;

  const page = (search.page as number) ?? 1;
  const perPage = (search.perPage as number) ?? 10;
  const name = search.name as string | undefined;
  const category = search.category as string | undefined;
  const sortStr = search.sort as string | undefined;
  const sort = parseSortingState(sortStr, columnIds);

  const filters = {
    page,
    limit: perPage,
    ...(name && { search: name }),
    ...(category && { categories: category }),
    ...(sort.length > 0 && { sort: JSON.stringify(sort) }),
  };

  const { data } = useSuspenseQuery(productsQueryOptions(filters));

  const pageCount = Math.ceil(data.total_products / perPage);

  const { table } = useDataTable({
    data: data.products,
    columns,
    pageCount,
    shallow: true,
    debounceMs: 500,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
