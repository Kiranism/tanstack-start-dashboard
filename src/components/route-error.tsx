import { useTransition } from 'react';
import { type ErrorComponentProps, useRouter } from '@tanstack/react-router';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

/**
 * Default error UI for routes below the root. Renders inside the dashboard
 * layout (sidebar and header stay usable) with a retry that re-runs loaders.
 */
export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';

  const retry = () => {
    startTransition(async () => {
      await router.invalidate();
      reset();
    });
  };

  return (
    <div className='p-4 md:px-6'>
      <Alert variant='destructive'>
        <Icons.alertCircle className='h-4 w-4' />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className='flex flex-col items-start gap-3'>
          <span>{message}</span>
          <Button variant='outline' size='sm' onClick={retry} disabled={isPending}>
            {isPending ? (
              <>
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
                Retrying...
              </>
            ) : (
              'Try again'
            )}
          </Button>
          <span role='status' aria-live='polite' className='sr-only'>
            {isPending ? 'Retrying' : ''}
          </span>
        </AlertDescription>
      </Alert>
    </div>
  );
}
