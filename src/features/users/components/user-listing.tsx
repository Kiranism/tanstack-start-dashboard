import { Suspense } from 'react';
import { UsersTable, UsersTableSkeleton } from './users-table';

export default function UserListingPage() {
  return (
    <Suspense fallback={<UsersTableSkeleton />}>
      <UsersTable />
    </Suspense>
  );
}
