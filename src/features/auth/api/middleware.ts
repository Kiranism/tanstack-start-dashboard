import { createMiddleware } from '@tanstack/react-start';
import { setResponseStatus } from '@tanstack/react-start/server';
import { getAppSession } from './session.server';

/**
 * Server function middleware that rejects signed-out callers and passes the
 * user to the handler as `context.user`. Route guards only control navigation;
 * every server function that touches private data needs this as well.
 *
 *   createServerFn().middleware([authMiddleware]).handler(({ context }) => context.user)
 */
export const authMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const session = await getAppSession();
  if (!session.user) {
    setResponseStatus(401);
    throw new Error('Unauthorized');
  }
  return next({ context: { user: session.user } });
});
