import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function CtaGithub() {
  return (
    <Button variant='ghost' size='sm' className='group hidden sm:flex' asChild>
      <a
        aria-label='View on GitHub'
        href='https://github.com/Kiranism/next-shadcn-dashboard-starter'
        rel='noopener noreferrer'
        target='_blank'
        className='transition-colors duration-300 hover:text-[#24292e] dark:text-foreground dark:hover:text-yellow-400'
      >
        <Icons.github className='transition-transform duration-300 group-hover:animate-bounce' />
      </a>
    </Button>
  );
}
