import { useMemo, useState } from 'react';
import { Icons } from '@/components/icons';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Conversation } from '../utils/types';

const statusDotColor = {
  online: 'bg-green-500',
  offline: 'bg-red-500'
} as const;

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return conversations;
    const q = search.toLowerCase();
    return conversations.filter(
      (c) => c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
    );
  }, [conversations, search]);

  return (
    <div className='hidden h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/40 bg-background/75 p-3 backdrop-blur lg:col-start-1 lg:col-end-2 lg:flex lg:rounded-3xl lg:p-4'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <p className='text-sm font-semibold text-foreground'>Messenger</p>
          <p className='text-xs text-muted-foreground'>
            {conversations.length} active conversation
            {conversations.length === 1 ? '' : 's'}
          </p>
        </div>
        <Badge
          variant='outline'
          className='rounded-full border border-border/50 bg-primary/15 px-3 py-1 text-[0.7rem] tracking-[0.24em] text-primary uppercase hover:bg-primary/15 hover:text-primary'
        >
          Live
        </Badge>
      </div>

      <label htmlFor='messenger-search' className='sr-only'>
        Search conversations
      </label>
      <div className='relative'>
        <Icons.search
          className='pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground/70'
          aria-hidden='true'
        />
        <Input
          id='messenger-search'
          type='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search conversations'
          className='w-full rounded-2xl border-border/40 bg-background/60 pl-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/40'
        />
      </div>

      <div
        className='flex-1 space-y-2 overflow-y-auto pr-1'
        aria-label='Conversation list'
        role='list'
      >
        {filtered.length === 0 ? (
          <p className='py-8 text-center text-xs text-muted-foreground'>No conversations found</p>
        ) : null}
        {filtered.map((conversation) => {
          const isActive = conversation.id === selectedId;
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          return (
            <motion.button
              key={conversation.id}
              type='button'
              onClick={() => onSelect(conversation.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group relative flex w-full items-start gap-3 rounded-2xl border border-transparent p-3 text-left transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
                isActive
                  ? 'border-primary/40 bg-primary/10'
                  : 'bg-background/70 hover:border-border/40 hover:bg-muted/40'
              )}
              role='listitem'
            >
              <div className='relative shrink-0'>
                <Avatar className='h-10 w-10 rounded-2xl border border-border/40 bg-background/80 text-foreground'>
                  <AvatarFallback className='rounded-2xl bg-primary/15 text-sm font-medium text-primary'>
                    {conversation.initials}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    'absolute right-0 bottom-0 inline-flex h-3 w-3 rounded-full border-2 border-background',
                    statusDotColor[conversation.status]
                  )}
                  aria-label={conversation.status === 'online' ? 'Online' : 'Offline'}
                />
              </div>
              <div className='min-w-0 flex-1 space-y-1'>
                <div className='flex items-start justify-between gap-2'>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-semibold text-foreground'>{conversation.name}</p>
                    <p className='text-xs text-muted-foreground'>{conversation.title}</p>
                  </div>
                  {lastMessage && (
                    <span className='shrink-0 text-[0.65rem] text-muted-foreground'>
                      {lastMessage.timestamp}
                    </span>
                  )}
                </div>
                {lastMessage ? (
                  <p className='line-clamp-2 text-xs text-muted-foreground'>
                    {lastMessage.author}: {lastMessage.text}
                  </p>
                ) : (
                  <p className='text-xs text-muted-foreground'>No messages yet</p>
                )}
              </div>
              {conversation.unread > 0 && (
                <span className='ml-2 inline-flex min-h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full bg-primary text-[0.7rem] font-semibold text-primary-foreground shadow-lg'>
                  {conversation.unread}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
