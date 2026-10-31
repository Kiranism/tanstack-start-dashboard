import { createFileRoute, notFound } from '@tanstack/react-router';
import { NotFound } from '@/components/not-found';
import PageContainer from '@/components/layout/page-container';
import ProductViewPage from '@/features/products/components/product-view-page';
import { productByIdOptions } from '@/features/products/api/queries';

export const Route = createFileRoute('/dashboard/product/$productId')({
  head: () => ({ meta: [{ title: 'Dashboard : Product View' }] }),
  loader: async ({ context: { queryClient }, params }) => {
    if (params.productId === 'new') return;
    const id = Number(params.productId);
    if (!Number.isInteger(id)) throw notFound();
    // getProductById throws notFound() for unknown ids, which renders the
    // notFoundComponent below with a 404 status (on the server too).
    await queryClient.query({
      ...productByIdOptions(id),
      staleTime: 'static'
    });
  },
  notFoundComponent: () => (
    <NotFound
      title='Product not found'
      description="This product doesn't exist or has been deleted."
    />
  ),
  component: ProductDetailPage
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  return (
    <PageContainer>
      <div className='flex-1 space-y-4'>
        <ProductViewPage productId={productId} />
      </div>
    </PageContainer>
  );
}
