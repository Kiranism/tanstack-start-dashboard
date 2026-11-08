import { createFileRoute } from '@tanstack/react-router';
import { pokemonOptions } from '@/features/react-query-demo/api/queries';
import { PokemonInfo } from '@/features/react-query-demo/components/pokemon-info';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { PokemonSkeleton } from '@/features/react-query-demo/components/pokemon-skeleton';
import { reactQueryInfoContent } from '@/features/react-query-demo/info-content';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/react-query')({
  head: () => ({ meta: [{ title: pageTitle('React Query') }] }),
  loader: async ({ context: { queryClient } }) => {
    await queryClient.query({ ...pokemonOptions(25), staleTime: 'static' });
  },
  component: ReactQueryPage
});

function ReactQueryPage() {
  return (
    <PageContainer
      pageTitle='React Query'
      pageDescription='Server prefetch + client hydration + suspense query pattern.'
      infoContent={reactQueryInfoContent}
    >
      <Suspense fallback={<PokemonSkeleton />}>
        <PokemonInfo />
      </Suspense>
    </PageContainer>
  );
}
