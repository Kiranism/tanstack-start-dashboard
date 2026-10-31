import { TanStackDevtools } from '@tanstack/react-devtools';
import { hotkeysDevtoolsPlugin } from '@tanstack/react-hotkeys-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  type ErrorComponentProps,
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { ActiveThemeProvider } from '@/components/themes/active-theme';
import ThemeProvider from '@/components/themes/theme-provider';
import { DEFAULT_THEME, THEMES } from '@/components/themes/theme.config';
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
  component: RootComponent,
  errorComponent: RootErrorComponent
});

function RootComponent() {
  const { activeTheme } = Route.useLoaderData();

  return (
    <RootDocument activeTheme={activeTheme}>
      {/* URL state for nuqs hooks (DiceUI's useDataTable). */}
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </RootDocument>
  );
}

// Errors thrown at the root (e.g. by its loader) would otherwise render without
// the <html> shell, so wrap them in the same document.
function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';

  return (
    <RootDocument activeTheme={DEFAULT_THEME}>
      <div className='flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center'>
        <h1 className='text-2xl font-bold'>Something went wrong</h1>
        <p className='max-w-md text-sm text-muted-foreground'>{message}</p>
        <Button
          onClick={() => {
            reset();
            void router.invalidate();
          }}
        >
          Try again
        </Button>
      </div>
    </RootDocument>
  );
}

function RootDocument({
  activeTheme,
  children
}: {
  activeTheme: string;
  children: React.ReactNode;
}) {
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
            {children}
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
