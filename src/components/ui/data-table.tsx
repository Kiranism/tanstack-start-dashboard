"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  OnChangeFn,
  Updater,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "./input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
  serverSide?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onPaginationChange,
  onSortingChange,
  onFilterChange,
  serverSide = false,
  pagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: serverSide ? undefined : getPaginationRowModel(),
    manualPagination: serverSide,
    manualSorting: serverSide,
    manualFiltering: serverSide,
    pageCount: serverSide && pagination ? pagination.pageCount : undefined,
    onSortingChange: (updaterOrValue) => {
      setSorting(updaterOrValue);
      if (serverSide && onSortingChange) {
        // If it's a function, call it with the current state to get the new value
        const newValue =
          typeof updaterOrValue === "function"
            ? updaterOrValue(sorting)
            : updaterOrValue;
        onSortingChange(newValue);
      }
    },
    onColumnFiltersChange: (updaterOrValue) => {
      setColumnFilters(updaterOrValue);
      if (serverSide && onFilterChange) {
        // If it's a function, call it with the current state to get the new value
        const newValue =
          typeof updaterOrValue === "function"
            ? updaterOrValue(columnFilters)
            : updaterOrValue;
        onFilterChange(newValue);
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: serverSide
      ? (updaterOrValue) => {
          if (onPaginationChange) {
            const newValue =
              typeof updaterOrValue === "function"
                ? updaterOrValue(table.getState().pagination)
                : updaterOrValue;
            onPaginationChange(newValue.pageIndex, newValue.pageSize);
          }
        }
      : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(serverSide && pagination
        ? {
            pagination: {
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
            },
          }
        : {}),
    },
  });

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center py-4">
          <Input
            placeholder={`Filter by ${searchKey}...`}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DataTableViewOptions table={table} />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
