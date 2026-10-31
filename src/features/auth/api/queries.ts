import { queryOptions } from '@tanstack/react-query';
import { getCurrentUser } from './service';

export const authKeys = {
  user: ['auth', 'user'] as const
};

/**
 * The current user, cached for the whole session so the root beforeLoad doesn't
 * call the server on every navigation. Sign in/out update this entry directly.
 */
export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.user,
    queryFn: () => getCurrentUser(),
    staleTime: Infinity
  });
