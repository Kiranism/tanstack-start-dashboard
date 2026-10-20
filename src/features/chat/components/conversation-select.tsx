import { Badge } from '@/components/ui/badge';
import type { Conversation } from '../utils/types';

interface ConversationSelectProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ConversationSelect({
  conversations,
  selectedId,
  onSelect
}: ConversationSelectProps) {
  return (
    <div className='flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/75 p-3 backdrop-blur sm:gap-4 sm:rounded-3xl sm:p-4 lg:hidden'>
      <div className='flex items-center justify-between gap-2 sm:gap-3'>
        <div>
          <p className='text-xs font-semibold text-foreground sm:text-sm'>Messenger</p>
          <p className='text-[0.65rem] text-muted-foreground sm:text-xs'>
            {conversations.length} active conversation
            {conversations.length === 1 ? '' : 's'}
          </p>
        </div>
        <Badge
          variant='outline'
          className='rounded-full border border-border/50 bg-primary/15 px-2 py-0.5 text-[0.65rem] tracking-[0.2em] text-primary uppercase hover:bg-primary/15 hover:text-primary sm:px-3 sm:py-1 sm:text-[0.7rem] sm:tracking-[0.24em]'
        >
          Live
        </Badge>
      </div>
      <div className='space-y-1.5 sm:space-y-2'>
        <label
          htmlFor='messenger-conversation'
          className='text-[0.65rem] font-medium text-muted-foreground sm:text-xs'
        >
          Conversation
        </label>
        <select
          id='messenger-conversation'
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className='w-full rounded-xl border border-border/40 bg-background/70 px-2.5 py-1.5 text-xs text-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/30 focus:outline-none sm:rounded-2xl sm:px-3 sm:py-2 sm:text-sm'
        >
          {conversations.map((conversation) => (
            <option key={conversation.id} value={conversation.id}>
              {conversation.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
