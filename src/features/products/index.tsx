import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/data/products";
import { Route } from "@/routes/dashboard/products";
import { ProductsFilters, productsQueryOptions } from "@/utils/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { ProductForm } from "./product-form";
import { ProductTable } from "./product-table";

export default function ProductPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filters: ProductsFilters = {
    page: search.page,
    pageSize: search.pageSize,
    sortBy: search.sortBy,
    sortOrder: search.sortOrder,
    name: search.name,
    category: search.category,
    status: search.status,
  };

  // Use React Query to fetch data
  const { data, isFetching } = useSuspenseQuery(productsQueryOptions(filters));

  // Handle pagination change
  const handlePaginationChange = (page: number, pageSize: number) => {
    navigate({
      search: {
        ...search,
        page: page,
        pageSize: pageSize,
      },
      replace: true,
    });
  };

  // Handle sorting change
  const handleSortingChange = (updatedSorting: SortingState) => {
    setSorting(updatedSorting);

    if (updatedSorting.length > 0) {
      navigate({
        search: {
          ...search,
          sortBy: updatedSorting[0].id,
          sortOrder: updatedSorting[0].desc ? "desc" : "asc",
        },
        replace: true,
      });
    } else {
      const { sortBy, sortOrder, ...rest } = search;
      navigate({
        search: rest,
        replace: true,
      });
    }
  };

  // Handle filter change
  const handleFilterChange = (updatedFilters: ColumnFiltersState) => {
    setColumnFilters(updatedFilters);

    const nameFilter = updatedFilters.find((filter) => filter.id === "name");
    const categoryFilter = updatedFilters.find(
      (filter) => filter.id === "category"
    );
    const statusFilter = updatedFilters.find(
      (filter) => filter.id === "status"
    );

    navigate({
      search: {
        ...search,
        name: nameFilter?.value as string | undefined,
        category: categoryFilter?.value as string | undefined,
        status: statusFilter?.value as string | undefined,
        page: 0, // Reset to first page on filter change
      },
      replace: true,
    });
  };

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  // Handle delete product
  const handleDeleteProduct = (product: Product) => {
    toast({
      title: "Product deleted",
      description: `${product.name} has been deleted.`,
    });
  };

  return (
    <div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-sm text-gray-500">
              Manage your products inventory with advanced filtering and
              sorting.
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setIsAddProductOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>
        <div>
          <ProductTable
            data={data}
            handlePaginationChange={handlePaginationChange}
            handleSortingChange={handleSortingChange}
            handleFilterChange={handleFilterChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </div>
      <ProductForm
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        initialData={editingProduct || undefined}
        onSuccess={(product: Product) => {
          toast({
            title: editingProduct ? "Product updated" : "Product added",
            description: `${product.name} has been ${editingProduct ? "updated" : "added"}.`,
          });
        }}
      />
    </div>
  );
}
