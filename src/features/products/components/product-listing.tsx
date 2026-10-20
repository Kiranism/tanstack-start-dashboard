import { Suspense } from 'react';
import { ProductTable } from './product-tables';

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className='flex flex-1 animate-pulse flex-col gap-4'>
          <div className='h-10 w-full rounded bg-muted' />
          <div className='h-96 w-full rounded-lg bg-muted' />
          <div className='h-10 w-full rounded bg-muted' />
        </div>
      }
    >
      <ProductTable />
    </Suspense>
  );
}
