import { Icons } from '@/components/icons';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NotificationCard } from '@/components/ui/notification-card';
import { useNotificationStore } from '../utils/store';
import { useRouter } from '@tanstack/react-router';

const MAX_VISIBLE = 5;

const actionRoutes: Record<string, string> = {
  view: '/dashboard/overview',
  'view-product': '/dashboard/product',
  billing: '/dashboard/overview',
  open: '/dashboard/kanban',
  'open-chat': '/dashboard/chat'
};

export function NotificationCenter() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();
  const router = useRouter();
  const count = unreadCount();
  const visibleNotifications = notifications.slice(0, MAX_VISIBLE);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='relative text-muted-foreground hover:text-foreground'
          />
        }
      >
        <Icons.notification />
        {count > 0 && (
          <span className='absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white tabular-nums ring-2 ring-background'>
            {count > 9 ? '9+' : count}
          </span>
        )}
        <span className='sr-only'>Notifications</span>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-[calc(100vw-2rem)] p-0 sm:w-[380px]' sideOffset={8}>
        <div className='flex h-11 items-center justify-between border-b px-3'>
          <Link to='/dashboard/notifications' className='group flex items-center gap-1'>
            <h4 className='text-sm font-semibold group-hover:underline'>Notifications</h4>
            <Icons.chevronRight className='h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5' />
          </Link>
          <div className='flex items-center gap-2'>
            {count > 0 && (
              <span className='rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground'>
                {count} new
              </span>
            )}
            {count > 0 && (
              <Button
                variant='ghost'
                size='sm'
                className='h-auto px-2 py-1 text-xs text-muted-foreground'
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className='h-[400px]'>
          {notifications.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-3 py-12'>
              <div className='flex size-10 items-center justify-center rounded-full bg-muted'>
                <Icons.notification className='size-5 text-muted-foreground' />
              </div>
              <p className='text-sm text-muted-foreground'>No notifications yet</p>
            </div>
          ) : (
            <div className='flex flex-col gap-0.5 p-1'>
              {visibleNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  body={notification.body}
                  status={notification.status}
                  createdAt={notification.createdAt}
                  actions={notification.actions}
                  onMarkAsRead={markAsRead}
                  onAction={(notifId, actionId) => {
                    const route = actionRoutes[actionId];
                    if (route) {
                      markAsRead(notifId);
                      router.navigate({ to: route });
                    }
                  }}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
