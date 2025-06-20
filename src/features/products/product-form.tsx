import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useCallback } from "react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/data/products";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the categories from the sample data
const CATEGORIES = [
  "Electronics",
  "Computer Accessories",
  "Audio",
  "Office Furniture",
  "Storage",
];

// Define the form schema with validation
const ProductFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number.",
  }),
});

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (product: Product) => void;
  initialData?: Partial<Product>;
}

export function ProductForm({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: ProductFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!initialData?.id;

  // Create form with validation
  const form = useAppForm({
    validators: { onChange: ProductFormSchema },
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      price: initialData?.price ? String(initialData.price) : "",
      stock: initialData?.stock ? String(initialData.stock) : "",
    },
    onSubmit: async ({ value }) => {
      // Create a new product object
      const newProduct: Product = {
        id: initialData?.id || `PROD-${Math.floor(Math.random() * 1000)}`,
        name: value.name,
        category: value.category,
        price: Number(value.price),
        stock: Number(value.stock),
        // Determine status based on stock
        status:
          Number(value.stock) === 0
            ? "out_of_stock"
            : Number(value.stock) <= 10
              ? "low_stock"
              : "in_stock",
        createdAt: initialData?.createdAt || new Date().toISOString(),
      };

      // In a real app, you would call an API here
      // For now, we'll just invalidate the query to refresh the data
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(newProduct);
      }

      // Close the dialog
      onOpenChange(false);
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form.AppForm>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <form.AppField
              name="name"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Product Name</field.FormLabel>
                  <field.FormControl>
                    <Input
                      placeholder="Premium Headphones"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="category"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Category</field.FormLabel>
                  <field.FormControl>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      onOpenChange={field.handleBlur}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="price"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Price</field.FormLabel>
                  <field.FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </span>
                      <Input
                        type="text"
                        inputMode="decimal"
                        className="pl-6"
                        placeholder="99.99"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </div>
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="stock"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Stock</field.FormLabel>
                  <field.FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="10"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormDescription>
                    Enter 0 for out of stock items.
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  );
}
