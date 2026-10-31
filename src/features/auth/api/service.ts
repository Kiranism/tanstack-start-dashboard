import { createServerFn } from '@tanstack/react-start';
import * as z from 'zod';
import { createAccount, verifyCredentials } from './accounts.server';
import { getAppSession } from './session.server';
import type { AuthResult, SessionUser } from './types';

/** The signed-in user, or null. Read by the root route's beforeLoad. */
export const getCurrentUser = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SessionUser | null> => {
    const session = await getAppSession();
    return session.user ?? null;
  }
);

export const signInSchema = z.object({
  email: z.email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Enter your password' })
});

export const signIn = createServerFn({ method: 'POST' })
  .validator(signInSchema)
  .handler(async ({ data }): Promise<AuthResult> => {
    const user = verifyCredentials(data.email, data.password);
    if (!user) return { error: 'Incorrect email or password.' };

    const session = await getAppSession();
    session.user = user;
    await session.save();
    return { user };
  });

export const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: 'Enter your name' }),
  email: z.email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, { message: 'Use at least 8 characters' })
});

export const signUp = createServerFn({ method: 'POST' })
  .validator(signUpSchema)
  .handler(async ({ data }): Promise<AuthResult> => {
    const user = createAccount(data.name, data.email, data.password);
    if (!user) return { error: 'An account with this email already exists.' };

    const session = await getAppSession();
    session.user = user;
    await session.save();
    return { user };
  });

export const signOut = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await getAppSession();
  session.destroy();
});
