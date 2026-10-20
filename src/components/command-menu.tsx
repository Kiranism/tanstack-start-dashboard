import * as React from 'react';
import { useRouter } from '@tanstack/react-router';
import { useHotkey, useHotkeys, type HotkeySequence } from '@tanstack/react-hotkeys';
import { useTheme } from 'next-themes';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from '@/components/ui/command';
import { navGroups } from '@/config/nav-config';
import { useFilteredNavGroups } from '@/hooks/use-nav';
import { useThemeConfig } from '@/components/themes/active-theme';
import { THEMES } from '@/components/themes/theme.config';

type CommandMenuContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};

const CommandMenuContext = React.createContext<CommandMenuContextValue | null>(null);

/** Open/close the ⌘K command palette from anywhere in the dashboard tree. */
export function useCommandMenu() {
  const context = React.useContext(CommandMenuContext);
  if (!context) {
    throw new Error('useCommandMenu must be used within <CommandMenu>');
  }
  return context;
}

// Sequences owned by the global theme shortcuts. A nav item carrying the same
// combo (Dashboard's `d d`) yields to the theme toggle and is not bound or
// badged as a navigation sequence.
const RESERVED_SEQUENCES = new Set(['t,t', 'd,d']);
const isReserved = (shortcut?: string[]) =>
  !!shortcut?.length && RESERVED_SEQUENCES.has(shortcut.join(','));

type PaletteItem = {
  id: string;
  name: string;
  shortcut?: string[];
  url: string;
};

export default function CommandMenu({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const toggle = React.useCallback(() => setOpen((prev) => !prev), []);

  const { theme, setTheme } = useTheme();
  const { activeTheme, setActiveTheme } = useThemeConfig();

  const cycleTheme = React.useCallback(() => {
    const currentIndex = THEMES.findIndex((t) => t.value === activeTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setActiveTheme(THEMES[nextIndex].value);
  }, [activeTheme, setActiveTheme]);

  const toggleDarkLight = React.useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  // Global shortcuts. react-hotkeys calls preventDefault, and by default
  // ignores single-key hotkeys (like the T T / D D sequences) while typing in a
  // form field, so they stay out of the way. Mod+K still fires inside inputs.
  useHotkey('Mod+K', toggle);
  useHotkey(['T', 'T'], cycleTheme);
  useHotkey(['D', 'D'], toggleDarkLight);

  const filteredGroups = useFilteredNavGroups(navGroups);

  // Mirror the previous kbar grouping: leaf items under "Navigation", nested
  // items under their parent's title.
  const sections = React.useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    const push = (section: string, item: PaletteItem) => {
      const items = map.get(section) ?? [];
      items.push(item);
      map.set(section, items);
    };

    for (const group of filteredGroups) {
      for (const navItem of group.items) {
        if (navItem.url !== '#') {
          push('Navigation', {
            id: navItem.title,
            name: navItem.title,
            shortcut: navItem.shortcut,
            url: navItem.url
          });
        }
        for (const child of navItem.items ?? []) {
          push(navItem.title, {
            id: `${navItem.title}-${child.title}`,
            name: child.title,
            shortcut: child.shortcut,
            url: child.url
          });
        }
      }
    }

    return [...map.entries()];
  }, [filteredGroups]);

  const runAndClose = React.useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const navigateTo = React.useCallback(
    (url: string) => {
      runAndClose(() => router.navigate({ to: url }));
    },
    [router, runAndClose]
  );

  // Every nav item with a shortcut becomes a global sequence, except combos the
  // theme owns.
  const navSequences = React.useMemo(
    () =>
      sections
        .flatMap(([, items]) => items)
        .filter(
          (item): item is PaletteItem & { shortcut: string[] } =>
            !!item.shortcut?.length && !isReserved(item.shortcut)
        ),
    [sections]
  );

  // One registration for the whole dynamic list; useHotkeys accepts a
  // variable-length array without breaking the rules of hooks.
  useHotkeys(
    navSequences.map((item) => ({
      hotkey: item.shortcut.map((key) => key.toUpperCase()) as HotkeySequence,
      callback: () => navigateTo(item.url)
    }))
  );

  const value = React.useMemo<CommandMenuContextValue>(
    () => ({ open, setOpen, toggle }),
    [open, toggle]
  );

  return (
    <CommandMenuContext.Provider value={value}>
      {children}

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title='Command Palette'
        description='Search for a page or run a command'
      >
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {sections.map(([section, items]) => (
            <CommandGroup key={section} heading={section}>
              {items.map((item) => (
                <CommandItem key={item.id} value={item.name} onSelect={() => navigateTo(item.url)}>
                  <span>{item.name}</span>
                  {item.shortcut?.length && !isReserved(item.shortcut) ? (
                    <CommandShortcut>{item.shortcut.join('').toUpperCase()}</CommandShortcut>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandGroup heading='Theme'>
            <CommandItem value='Switch Theme' onSelect={() => runAndClose(cycleTheme)}>
              <span>Switch Theme</span>
              <CommandShortcut>TT</CommandShortcut>
            </CommandItem>
            <CommandItem
              value='Toggle Dark Light Mode'
              onSelect={() => runAndClose(toggleDarkLight)}
            >
              <span>Toggle Dark/Light Mode</span>
              <CommandShortcut>DD</CommandShortcut>
            </CommandItem>
            <CommandItem
              value='Set Light Theme'
              onSelect={() => runAndClose(() => setTheme('light'))}
            >
              <span>Set Light Theme</span>
            </CommandItem>
            <CommandItem
              value='Set Dark Theme'
              onSelect={() => runAndClose(() => setTheme('dark'))}
            >
              <span>Set Dark Theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandMenuContext.Provider>
  );
}
