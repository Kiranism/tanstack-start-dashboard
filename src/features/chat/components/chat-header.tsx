import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Conversation } from '../utils/types';

const statusDotColor = {
  online: 'bg-green-500',
  offline: 'bg-red-500'
} as const;

interface ChatHeaderProps {
  conversation: Conversation;
}

export function ChatHeader({ conversation }: ChatHeaderProps) {
  return (
    <header className='flex flex-wrap items-center justify-between gap-3 sm:gap-4'>
      <div className='flex items-center gap-2 sm:gap-3'>
        <div className='relative'>
          <Avatar className='h-10 w-10 rounded-2xl border border-border/40 bg-card/80 text-foreground sm:h-12 sm:w-12 sm:rounded-3xl'>
            <AvatarFallback className='rounded-2xl bg-primary/20 text-sm font-semibold text-primary sm:rounded-3xl sm:text-base'>
              {conversation.initials}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              'absolute right-0 bottom-0 inline-flex h-3 w-3 rounded-full border-2 border-background sm:h-3.5 sm:w-3.5',
              statusDotColor[conversation.status]
            )}
            aria-label={conversation.status === 'online' ? 'Online' : 'Offline'}
          />
        </div>
        <div>
          <p className='text-sm font-semibold text-foreground sm:text-base'>{conversation.name}</p>
          <p className='text-xs text-muted-foreground sm:text-sm'>{conversation.title}</p>
        </div>
      </div>

      <div className='flex items-center gap-1.5 sm:gap-2'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-8 rounded-full border border-border/40 bg-background/60 text-muted-foreground transition hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-10'
          aria-label='Start audio call'
        >
          <Icons.phone className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-8 rounded-full border border-border/40 bg-background/60 text-muted-foreground transition hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-10'
          aria-label='Start video call'
        >
          <Icons.video className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-8 rounded-full border border-border/40 bg-background/60 text-muted-foreground transition hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-10'
          aria-label='Open conversation menu'
        >
          <Icons.ellipsis className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
        </Button>
      </div>
    </header>
  );
}
