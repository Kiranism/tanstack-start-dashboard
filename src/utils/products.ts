import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "@/data/products";

export type ProductsFilters = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  name?: string;
  category?: string;
  status?: string;
};

export const productsQueryOptions = (filters: ProductsFilters = {}) =>
  queryOptions({
    queryKey: ["products", filters],
    queryFn: () =>
      getProducts({
        data: {
          page: filters.page ?? 0,
          pageSize: filters.pageSize ?? 10,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          filters: {
            name: filters.name,
            category: filters.category,
            status: filters.status,
          },
        },
      }),
  });
