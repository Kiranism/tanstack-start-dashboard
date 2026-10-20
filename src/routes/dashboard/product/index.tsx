import { noop } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import ProductListingPage from '@/features/products/components/product-listing';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { productInfoContent } from '@/config/infoconfig';
import { getProductFiltersFromSearch } from '@/features/products/components/product-tables/search-params';
import { productsQueryOptions } from '@/features/products/api/queries';

export const Route = createFileRoute('/dashboard/product/')({
  head: () => ({ meta: [{ title: 'Dashboard: Products' }] }),
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps }) => {
    // Kick off the fetch without blocking; useSuspenseQuery picks it up.
    void queryClient.query(productsQueryOptions(getProductFiltersFromSearch(deps))).catch(noop);
  },
  component: ProductPage
});

function ProductPage() {
  return (
    <PageContainer
      pageTitle='Products'
      pageDescription='Manage products (React Query + search params table pattern.)'
      infoContent={productInfoContent}
      pageHeaderAction={
        <Link
          to='/dashboard/product/$productId'
          params={{ productId: 'new' }}
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <Icons.add className='mr-2 h-4 w-4' /> Add New
        </Link>
      }
    >
      <ProductListingPage />
    </PageContainer>
  );
}
