import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { columns, createColumns } from "./columns";
import { Product } from "@/data/products";

interface ProductTableProps {
  data: {
    products: Product[];
    pagination: {
      page: number;
      pageSize: number;
      totalPages: number;
    };
  };
  handlePaginationChange: (page: number, pageSize: number) => void;
  handleSortingChange: (sorting: SortingState) => void;
  handleFilterChange: (filters: ColumnFiltersState) => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (product: Product) => void;
}

export function ProductTable({
  data,
  handlePaginationChange,
  handleSortingChange,
  handleFilterChange,
  onEditProduct,
  onDeleteProduct,
}: ProductTableProps) {
  // Create columns with action handlers
  const tableColumns = createColumns({
    onEdit: onEditProduct,
    onDelete: onDeleteProduct,
  });

  return (
    <DataTable
      columns={tableColumns}
      data={data.products}
      searchKey="name"
      onPaginationChange={handlePaginationChange}
      onSortingChange={handleSortingChange}
      onFilterChange={handleFilterChange}
      serverSide={true}
      pagination={{
        pageIndex: data.pagination.page,
        pageSize: data.pagination.pageSize,
        pageCount: data.pagination.totalPages,
      }}
    />
  );
}
