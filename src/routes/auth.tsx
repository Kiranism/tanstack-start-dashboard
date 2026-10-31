import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import * as z from 'zod';
import { safeRedirectPath } from '@/features/auth/utils';

export const Route = createFileRoute('/auth')({
  // Where to go after signing in, set by the dashboard guard.
  validateSearch: z.object({ redirect: z.string().optional() }),
  beforeLoad: ({ context, search }) => {
    if (context.user) {
      throw redirect({ href: safeRedirectPath(search.redirect) });
    }
  },
  component: AuthLayout
});

function AuthLayout() {
  return <Outlet />;
}
