import type { QueryClient } from '@tanstack/react-query';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createServerFn } from '@tanstack/react-start';

import { Toaster } from '@/components/ui/sonner';
import { ActiveThemeProvider } from '@/components/themes/active-theme';
import ThemeProvider from '@/components/themes/theme-provider';
import { DEFAULT_THEME, THEMES } from '@/components/themes/theme.config';

import appCss from '@/styles/globals.css?url';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

const getActiveTheme = createServerFn({ method: 'GET' }).handler(async () => {
  const { getCookie } = await import('@tanstack/react-start/server');
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
      { title: 'TanStack Dashboard' },
      {
        name: 'description',
        content: 'Dashboard with TanStack Start and Shadcn'
      }
    ],
    links: [{ rel: 'stylesheet', href: appCss }]
  }),
  loader: async () => {
    const activeTheme = await getActiveTheme();
    return { activeTheme };
  },
  component: RootDocument
});

function RootDocument() {
  const { activeTheme } = Route.useLoaderData();

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
      <body className='bg-background overflow-x-hidden overscroll-none font-sans antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <ActiveThemeProvider initialTheme={activeTheme}>
            <Toaster />
            <Outlet />
          </ActiveThemeProvider>
        </ThemeProvider>
        <TanStackRouterDevtools position='bottom-left' />
        <Scripts />
      </body>
    </html>
  );
}
