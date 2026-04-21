import { Suspense } from "react";
import { ProductTable } from "./product-tables";

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 animate-pulse flex-col gap-4">
          <div className="bg-muted h-10 w-full rounded" />
          <div className="bg-muted h-96 w-full rounded-lg" />
          <div className="bg-muted h-10 w-full rounded" />
        </div>
      }
    >
      <ProductTable />
    </Suspense>
  );
}
