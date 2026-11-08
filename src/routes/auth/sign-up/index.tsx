import { createFileRoute } from '@tanstack/react-router';
import SignUpViewPage from '@/features/auth/components/sign-up-view';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/auth/sign-up/')({
  head: () => ({
    meta: [{ title: pageTitle('Sign Up') }]
  }),
  component: SignUpViewPage
});
