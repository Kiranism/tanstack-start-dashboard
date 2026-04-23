import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import SheetFormDemo from '@/features/forms/components/sheet-form-demo';

export const Route = createFileRoute('/dashboard/forms/sheet-form')({
  head: () => ({ meta: [{ title: 'Dashboard: Sheet Form' }] }),
  component: () => (
    <PageContainer
      pageTitle='Sheet & Dialog Forms'
      pageDescription='Form patterns inside sheets and dialogs with external submit buttons.'
    >
      <SheetFormDemo />
    </PageContainer>
  )
});
