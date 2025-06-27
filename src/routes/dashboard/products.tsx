import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "@/features/products/product-table/columns";
import { productsQueryOptions, ProductsFilters } from "@/utils/products";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/features/products/product-form";
import { Product } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import ProductPage from "@/features/products";

const productsSearchSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.union([z.literal("asc"), z.literal("desc"), z.undefined()]),
  name: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/products")({
  component: ProductPage,
  validateSearch: (search) => productsSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page,
    pageSize: search.pageSize,
    sortBy: search.sortBy,
    sortOrder: search.sortOrder,
    name: search.name,
    category: search.category,
    status: search.status,
  }),
  loader: async ({ context, deps }) => {
    const filters: ProductsFilters = {
      page: deps.page,
      pageSize: deps.pageSize,
      sortBy: deps.sortBy,
      sortOrder: deps.sortOrder,
      name: deps.name,
      category: deps.category,
      status: deps.status,
    };

    // Prefetch data using React Query
    await context.queryClient.ensureQueryData(productsQueryOptions(filters));
    return {
      crumb: "Products",
    };
  },
});
