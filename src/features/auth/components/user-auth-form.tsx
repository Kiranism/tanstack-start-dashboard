import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';
import { authKeys } from '../api/queries';
import { signIn, signInSchema, signUp, signUpSchema } from '../api/service';
import type { AuthResult } from '../api/types';
import { DEMO_ACCOUNT } from '../constants';
import { safeRedirectPath } from '../utils';

/** Stores the signed-in user and continues to the page the guard redirected from. */
function useCompleteAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { redirect } = useSearch({ from: '/auth' });
  const [error, setError] = useState<string | null>(null);

  const run = async (submit: () => Promise<AuthResult>) => {
    setError(null);
    try {
      const result = await submit();
      if (result.error) {
        setError(result.error);
        return;
      }
      // Seed the cache the root beforeLoad reads, so the dashboard guard passes.
      queryClient.setQueryData(authKeys.user, result.user);
      await router.navigate({ href: safeRedirectPath(redirect) });
    } catch {
      setError("Couldn't reach the server. Try again.");
    }
  };

  return { error, run };
}

function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role='alert' className='text-sm text-destructive'>
      {message}
    </p>
  );
}

export function SignInForm() {
  const signInFn = useServerFn(signIn);
  const { error, run } = useCompleteAuth();

  const form = useAppForm({
    defaultValues: {
      email: DEMO_ACCOUNT.email as string,
      password: DEMO_ACCOUNT.password as string
    },
    validators: { onSubmit: signInSchema },
    onSubmit: ({ value }) => run(() => signInFn({ data: value }))
  });

  return (
    <form
      noValidate
      className='w-full space-y-4'
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name='email'
          children={(field) => <field.TextField label='Email' type='email' autoComplete='email' />}
        />
        <form.AppField
          name='password'
          children={(field) => (
            <field.TextField label='Password' type='password' autoComplete='current-password' />
          )}
        />
      </FieldGroup>
      <FormError message={error} />
      <form.AppForm>
        <form.SubmitButton className='w-full'>Sign in</form.SubmitButton>
      </form.AppForm>
      <p className='text-center text-xs text-muted-foreground'>
        Demo account: {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
      </p>
    </form>
  );
}

export function SignUpForm() {
  const signUpFn = useServerFn(signUp);
  const { error, run } = useCompleteAuth();

  const form = useAppForm({
    defaultValues: { name: '', email: '', password: '' },
    validators: { onSubmit: signUpSchema },
    onSubmit: ({ value }) => run(() => signUpFn({ data: value }))
  });

  return (
    <form
      noValidate
      className='w-full space-y-4'
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name='name'
          children={(field) => <field.TextField label='Name' autoComplete='name' />}
        />
        <form.AppField
          name='email'
          children={(field) => <field.TextField label='Email' type='email' autoComplete='email' />}
        />
        <form.AppField
          name='password'
          children={(field) => (
            <field.TextField
              label='Password'
              type='password'
              autoComplete='new-password'
              description='At least 8 characters.'
            />
          )}
        />
      </FieldGroup>
      <FormError message={error} />
      <form.AppForm>
        <form.SubmitButton className='w-full'>Create account</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
