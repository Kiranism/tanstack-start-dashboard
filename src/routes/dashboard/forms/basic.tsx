import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import DemoForm from '@/components/forms/demo-form';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/forms/basic')({
  head: () => ({ meta: [{ title: pageTitle('Basic Form') }] }),
  component: () => (
    <PageContainer
      pageTitle='Basic Form'
      pageDescription='A comprehensive form demo with all field types.'
    >
      <DemoForm />
    </PageContainer>
  )
});
