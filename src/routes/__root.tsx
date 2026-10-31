import { TanStackDevtools } from '@tanstack/react-devtools';
import { hotkeysDevtoolsPlugin } from '@tanstack/react-hotkeys-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

import { Toaster } from '@/components/ui/sonner';
import { ActiveThemeProvider } from '@/components/themes/active-theme';
import ThemeProvider from '@/components/themes/theme-provider';
import { DEFAULT_THEME, THEMES } from '@/components/themes/theme.config';
import { currentUserQueryOptions } from '@/features/auth/api/queries';
import { seo } from '@/lib/seo';

import appCss from '@/styles/globals.css?url';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

const getActiveTheme = createServerFn({ method: 'GET' }).handler(() => {
  const cookieValue = getCookie('active_theme');
  if (cookieValue) {
    const isValid = THEMES.some((t) => t.value === cookieValue);
    if (isValid) return cookieValue;
  }
  return DEFAULT_THEME;
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  // Every route gets `context.user` (null when signed out). Cached in the query
  // client, so only the first load and sign in/out hit the server.
  beforeLoad: async ({ context }) => ({
    user: await context.queryClient.ensureQueryData(currentUserQueryOptions())
  }),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: META_THEME_COLORS.light },
      ...seo()
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/favicon.svg' }
    ]
  }),
  loader: async () => {
    const activeTheme = await getActiveTheme();
    return { activeTheme };
  },
  // The theme cookie is read once for SSR; after that ActiveThemeProvider owns
  // it on the client, so don't re-run the server function on every navigation.
  staleTime: Infinity,
  // The shell renders the <html> document around every match, including
  // errors and not-found pages, so they keep the theme and styles.
  shellComponent: RootDocument
});

function RootDocument({ children }: { children: React.ReactNode }) {
  // Undefined when the root beforeLoad or loader failed and the shell is
  // rendering the error, so fall back to the default theme.
  const activeTheme = Route.useLoaderData({ select: (data) => data?.activeTheme }) ?? DEFAULT_THEME;

  return (
    <html lang='en' suppressHydrationWarning data-theme={activeTheme}>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body className='overflow-x-hidden overscroll-none bg-background font-sans antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <ActiveThemeProvider initialTheme={activeTheme}>
            <Toaster />
            {/* URL state for nuqs hooks (DiceUI's useDataTable). */}
            <NuqsAdapter>{children}</NuqsAdapter>
          </ActiveThemeProvider>
        </ThemeProvider>
        {/* Keep the plugins inline: devtools() in vite.config.ts strips this
            element and its imports from production builds, but would leave
            module-level plugin calls behind (and they crash SSR). */}
        <TanStackDevtools
          config={{ position: 'bottom-left' }}
          plugins={[
            { name: 'TanStack Router', render: <TanStackRouterDevtoolsPanel /> },
            { name: 'TanStack Query', render: <ReactQueryDevtoolsPanel /> },
            formDevtoolsPlugin(),
            hotkeysDevtoolsPlugin()
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
