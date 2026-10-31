import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export default function CtaGithub() {
  return (
    <a
      aria-label='View on GitHub'
      href={siteConfig.links.github}
      rel='noopener noreferrer'
      target='_blank'
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'group hidden transition-colors duration-300 hover:text-[#24292e] sm:flex dark:text-foreground dark:hover:text-yellow-400'
      )}
    >
      <Icons.github className='transition-transform duration-300 group-hover:animate-bounce' />
    </a>
  );
}
