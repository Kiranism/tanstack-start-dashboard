import { createFileRoute } from '@tanstack/react-router';
import SignInViewPage from '@/features/auth/components/sign-in-view';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/auth/sign-in/')({
  head: () => ({
    meta: [{ title: pageTitle('Sign In') }]
  }),
  component: SignInViewPage
});
