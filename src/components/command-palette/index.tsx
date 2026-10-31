import * as React from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { Dialog } from '@base-ui/react/dialog';
import { useRouter } from '@tanstack/react-router';
import { useHotkey, useHotkeys, type HotkeySequence } from '@tanstack/react-hotkeys';
import { useTheme } from 'next-themes';
import { Kbd } from '@/components/ui/kbd';
import { navGroups } from '@/config/nav-config';
import { useFilteredNavGroups } from '@/hooks/use-nav';
import { useThemeConfig } from '@/components/themes/active-theme';
import { THEMES } from '@/components/themes/theme.config';

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);

/** Open/close the ⌘K command palette from anywhere in the dashboard tree. */
export function useCommandPalette() {
  const context = React.useContext(CommandPaletteContext);
  if (!context) {
    throw new Error('useCommandPalette must be used within <CommandPalette>');
  }
  return context;
}

type PaletteAction = {
  id: string;
  name: string;
  section: string;
  subtitle?: string;
  shortcut?: string[];
  perform: () => void;
};

type PaletteGroup = {
  value: string;
  items: PaletteAction[];
};

// Sequences owned by the theme actions. A nav item carrying the same combo
// (Dashboard's `d d`) yields to the theme toggle, as it does in kbar.
const RESERVED_SEQUENCES = new Set(['t,t', 'd,d']);
const isReserved = (shortcut?: string[]) =>
  !!shortcut?.length && RESERVED_SEQUENCES.has(shortcut.join(','));

/**
 * ⌘K palette with the same look as the Next.js starter's kbar, built on Base UI
 * Dialog + Autocomplete (no cmdk/kbar, so no Radix underneath).
 */
export default function CommandPalette({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const toggle = React.useCallback(() => setOpen((prev) => !prev), []);

  const { resolvedTheme, setTheme } = useTheme();
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const filteredGroups = useFilteredNavGroups(navGroups);

  const actions = React.useMemo<PaletteAction[]>(() => {
    const navigateTo = (url: string) => router.navigate({ to: url });

    const navActions = filteredGroups
      .flatMap((group) => group.items)
      .flatMap((navItem) => {
        const baseAction: PaletteAction[] =
          navItem.url !== '#'
            ? [
                {
                  id: `${navItem.title.toLowerCase()}Action`,
                  name: navItem.title,
                  shortcut: navItem.shortcut,
                  section: 'Navigation',
                  subtitle: `Go to ${navItem.title}`,
                  perform: () => navigateTo(navItem.url)
                }
              ]
            : [];
        const childActions = (navItem.items ?? []).map((childItem) => ({
          id: `${childItem.title.toLowerCase()}Action`,
          name: childItem.title,
          shortcut: childItem.shortcut,
          section: navItem.title,
          subtitle: `Go to ${childItem.title}`,
          perform: () => navigateTo(childItem.url)
        }));
        return [...baseAction, ...childActions];
      });

    const themeActions: PaletteAction[] = [
      {
        id: 'cycleTheme',
        name: 'Switch Theme',
        shortcut: ['t', 't'],
        section: 'Theme',
        perform: () => {
          const currentIndex = THEMES.findIndex((t) => t.value === activeTheme);
          setActiveTheme(THEMES[(currentIndex + 1) % THEMES.length].value);
        }
      },
      {
        id: 'toggleDarkLight',
        name: 'Toggle Dark/Light Mode',
        shortcut: ['d', 'd'],
        section: 'Theme',
        // resolvedTheme, not theme: with 'system' the latter would always pick light.
        perform: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      },
      {
        id: 'setLightTheme',
        name: 'Set Light Theme',
        section: 'Theme',
        perform: () => setTheme('light')
      },
      {
        id: 'setDarkTheme',
        name: 'Set Dark Theme',
        section: 'Theme',
        perform: () => setTheme('dark')
      }
    ];

    return [
      ...navActions.map((action) =>
        isReserved(action.shortcut) ? { ...action, shortcut: undefined } : action
      ),
      ...themeActions
    ];
  }, [router, filteredGroups, resolvedTheme, setTheme, activeTheme, setActiveTheme]);

  const groups = React.useMemo<PaletteGroup[]>(() => {
    const map = new Map<string, PaletteAction[]>();
    for (const action of actions) {
      map.set(action.section, [...(map.get(action.section) ?? []), action]);
    }
    return [...map.entries()].map(([value, items]) => ({ value, items }));
  }, [actions]);

  // react-hotkeys ignores single-key sequences while typing in a form field;
  // Mod+K still fires inside inputs.
  useHotkey('Mod+K', toggle);
  useHotkeys(
    actions
      .filter(
        (action): action is PaletteAction & { shortcut: string[] } => !!action.shortcut?.length
      )
      .map((action) => ({
        hotkey: action.shortcut.map((key) => key.toUpperCase()) as HotkeySequence,
        callback: action.perform
      }))
  );

  const value = React.useMemo<CommandPaletteContextValue>(
    () => ({ open, setOpen, toggle }),
    [open, toggle]
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className='fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs' />
          <Dialog.Viewport className='fixed inset-0 z-50 flex items-start justify-center p-4 pt-[14vh]'>
            <Dialog.Popup
              aria-label='Command palette'
              className='relative mx-auto w-full max-w-[600px] overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10 transition-[scale,opacity] duration-150 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0'
            >
              <Autocomplete.Root
                open
                inline
                items={groups}
                itemToStringValue={(action: PaletteAction) => action.name}
                autoHighlight='always'
                keepHighlight
              >
                <div className='sticky top-0 z-10 border-b bg-popover'>
                  <Autocomplete.Input
                    aria-label='Search commands'
                    placeholder='Type a command or search…'
                    className='w-full border-none bg-transparent px-4 py-3.5 text-sm outline-hidden placeholder:text-muted-foreground'
                  />
                </div>
                <Dialog.Close className='sr-only'>Close command palette</Dialog.Close>

                <div className='h-[400px] scroll-py-2 overflow-y-auto overscroll-contain'>
                  <Autocomplete.Empty className='flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground empty:hidden'>
                    No results found.
                  </Autocomplete.Empty>
                  <Autocomplete.List className='pb-1.5'>
                    {(group: PaletteGroup) => (
                      <Autocomplete.Group key={group.value} items={group.items}>
                        <Autocomplete.GroupLabel className='px-4 pt-3 pb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase'>
                          {group.value}
                        </Autocomplete.GroupLabel>
                        <Autocomplete.Collection>
                          {(action: PaletteAction) => (
                            <Autocomplete.Item
                              key={action.id}
                              value={action}
                              onClick={() => {
                                setOpen(false);
                                action.perform();
                              }}
                              className='relative mx-1.5 flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground'
                            >
                              <div className='flex flex-col'>
                                <span>{action.name}</span>
                                {action.subtitle && (
                                  <span className='text-xs text-muted-foreground'>
                                    {action.subtitle}
                                  </span>
                                )}
                              </div>
                              {action.shortcut?.length ? (
                                <div className='grid grid-flow-col gap-1'>
                                  {action.shortcut.map((key, i) => (
                                    <Kbd key={key + i}>{key}</Kbd>
                                  ))}
                                </div>
                              ) : null}
                            </Autocomplete.Item>
                          )}
                        </Autocomplete.Collection>
                      </Autocomplete.Group>
                    )}
                  </Autocomplete.List>
                </div>

                <div className='flex items-center gap-3 border-t px-3 py-2 text-xs text-muted-foreground'>
                  <span className='flex items-center gap-1'>
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd> navigate
                  </span>
                  <span className='flex items-center gap-1'>
                    <Kbd>↵</Kbd> open
                  </span>
                  <span className='flex items-center gap-1'>
                    <Kbd>esc</Kbd> close
                  </span>
                </div>
              </Autocomplete.Root>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandPaletteContext.Provider>
  );
}
