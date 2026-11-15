import { useSyncExternalStore } from 'react';
import { useCommandPalette } from '@/components/command-palette';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';

const noopSubscribe = () => () => {};
const isApplePlatform = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

export default function SearchInput() {
  const { toggle } = useCommandPalette();
  // Server render assumes ⌘ and the client corrects it after hydration, so there's no mismatch
  const isMac = useSyncExternalStore(noopSubscribe, isApplePlatform, () => true);

  return (
    <>
      <button
        type='button'
        onClick={toggle}
        className='mr-1 hidden h-8 w-44 items-center gap-2 rounded-lg border border-input bg-card px-2.5 text-sm text-muted-foreground transition-[color,background-color,border-color,box-shadow] outline-none hover:border-foreground/20 hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex md:w-56 lg:w-72 dark:bg-input/30'
      >
        <Icons.search className='size-4 shrink-0' />
        <span className='flex-1 truncate text-left'>Search...</span>
        <Kbd>{isMac ? '⌘K' : 'Ctrl K'}</Kbd>
      </button>
      <Button
        variant='ghost'
        size='icon'
        className='sm:hidden'
        aria-label='Search'
        onClick={toggle}
      >
        <Icons.search />
      </Button>
    </>
  );
}
