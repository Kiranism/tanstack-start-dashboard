import { noop } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import UserListingPage from '@/features/users/components/user-listing';
import { usersInfoContent } from '@/features/users/info-content';
import { UserFormSheetTrigger } from '@/features/users/components/user-form-sheet';
import { getUserFiltersFromSearch } from '@/features/users/components/users-table/search-params';
import { usersQueryOptions } from '@/features/users/api/queries';

export const Route = createFileRoute('/dashboard/users')({
  head: () => ({ meta: [{ title: 'Dashboard: Users' }] }),
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps }) => {
    // Kick off the fetch without blocking; useSuspenseQuery picks it up.
    void queryClient.query(usersQueryOptions(getUserFiltersFromSearch(deps))).catch(noop);
  },
  component: UsersPage
});

function UsersPage() {
  return (
    <PageContainer
      pageTitle='Users'
      pageDescription='Manage users (React Query + search params table pattern.)'
      infoContent={usersInfoContent}
      pageHeaderAction={<UserFormSheetTrigger />}
    >
      <UserListingPage />
    </PageContainer>
  );
}
