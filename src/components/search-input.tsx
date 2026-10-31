import { useCommandPalette } from '@/components/command-palette';
import { Icons } from '@/components/icons';
import { Button } from './ui/button';

export default function SearchInput() {
  const { toggle } = useCommandPalette();
  return (
    <div className='w-full space-y-2'>
      <Button
        variant='outline'
        className='relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
        onClick={toggle}
      >
        <Icons.search className='mr-2 h-4 w-4' />
        Search...
        <kbd className='pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-6 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
    </div>
  );
}
