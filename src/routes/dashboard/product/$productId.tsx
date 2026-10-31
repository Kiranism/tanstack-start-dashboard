import { createFileRoute, notFound } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import ProductViewPage from '@/features/products/components/product-view-page';
import { productByIdOptions } from '@/features/products/api/queries';

export const Route = createFileRoute('/dashboard/product/$productId')({
  head: () => ({ meta: [{ title: 'Dashboard : Product View' }] }),
  loader: async ({ context: { queryClient }, params }) => {
    if (params.productId === 'new') return;
    const data = await queryClient.query({
      ...productByIdOptions(Number(params.productId)),
      staleTime: 'static'
    });
    // Throw here, not in the component, so SSR renders the 404 page.
    if (!data.success || !data.product) throw notFound();
  },
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
