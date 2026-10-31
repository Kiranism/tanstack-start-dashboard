const DEFAULT_REDIRECT = '/dashboard/overview';

/**
 * The post-sign-in destination from the `redirect` search param, limited to
 * same-origin paths so the param can't send users to another site.
 */
export function safeRedirectPath(redirect: string | undefined) {
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return DEFAULT_REDIRECT;
  }
  return redirect;
}
