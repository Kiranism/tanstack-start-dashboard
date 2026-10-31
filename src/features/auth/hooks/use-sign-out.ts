import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { authKeys } from '../api/queries';
import { signOut } from '../api/service';

/** Clears the session cookie, then the cached user and data, and goes to sign-in. */
export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOutFn = useServerFn(signOut);

  return async () => {
    await signOutFn();
    // Clear the cached user first, or the /auth guard would send us straight back.
    queryClient.setQueryData(authKeys.user, null);
    await router.navigate({ to: '/auth/sign-in' });
    // Everything else in the cache belonged to the signed-out user.
    queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== authKeys.user[0] });
  };
}
