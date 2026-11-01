import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { navGroups } from '@/config/nav-config';
import { useFilteredNavGroups } from '@/hooks/use-nav';
import type { NavItem } from '@/types';
import { Link } from '@tanstack/react-router';
import { useLocation, useRouteContext, useRouter } from '@tanstack/react-router';
import { useSignOut } from '@/features/auth/hooks/use-sign-out';
import { Icons } from '../icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';

export default function AppSidebar() {
  const { pathname } = useLocation();
  const router = useRouter();
  const { user } = useRouteContext({ from: '/dashboard' });
  const signOut = useSignOut();
  const filteredGroups = useFilteredNavGroups(navGroups);

  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              render={<Link to='/dashboard/overview' aria-label='Dashboard' />}
            >
              <div className='flex aspect-square size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground'>
                <Icons.logo className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>TanStack Start</span>
                <span className='truncate text-xs text-muted-foreground'>Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        {filteredGroups.map((group) => (
          <SidebarGroup key={group.label || 'ungrouped'} className='py-0'>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {group.items.map((item) => (
                <NavMainItem key={item.title} item={item} pathname={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size='lg'
                    className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
                  />
                }
              >
                <div className='flex aspect-square size-8 shrink-0 items-center justify-center rounded-full bg-muted'>
                  <Icons.account className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user.name}</span>
                  <span className='truncate text-xs text-muted-foreground'>{user.email}</span>
                </div>
                <Icons.chevronsDown className='ml-auto size-4' />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--anchor-width) min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.navigate({ to: '/dashboard/notifications' })}
                  >
                    <Icons.notification className='mr-2 h-4 w-4' />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <Icons.logout className='mr-2 h-4 w-4' />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function isActivePath(pathname: string, url: string) {
  return pathname === url || (url !== '/' && pathname.startsWith(`${url}/`));
}

function NavMainItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const { state, isMobile } = useSidebar();
  const Icon = item.icon ? Icons[item.icon] : Icons.logo;
  const children = item.items ?? [];

  if (children.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          render={<Link to={item.url} aria-label={item.title} />}
          tooltip={item.title}
          isActive={pathname === item.url}
        >
          <Icon />
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  const hasActiveChild = children.some((child) => isActivePath(pathname, child.url));

  // The icon rail hides sub-items, so a group opens its links in a menu to the right instead
  if (state === 'collapsed' && !isMobile) {
    return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                tooltip={item.title}
                isActive={hasActiveChild}
                className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
              />
            }
          >
            <Icon />
            <span>{item.title}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side='right'
            align='start'
            sideOffset={8}
            className='w-auto min-w-48'
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {children.map((child) => {
                const ChildIcon = child.icon ? Icons[child.icon] : null;
                const active = isActivePath(pathname, child.url);
                return (
                  <DropdownMenuItem
                    key={child.title}
                    render={
                      <Link
                        to={child.url}
                        aria-label={child.title}
                        aria-current={active ? 'page' : undefined}
                      />
                    }
                    className={active ? 'bg-accent font-medium text-accent-foreground' : undefined}
                  >
                    {ChildIcon && <ChildIcon />}
                    {child.title}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible defaultOpen={item.isActive || hasActiveChild} render={<SidebarMenuItem />}>
      <CollapsibleTrigger
        render={
          <SidebarMenuButton
            tooltip={item.title}
            isActive={pathname === item.url}
            className='group/collapsible'
          />
        }
      >
        {item.icon && <Icon />}
        <span>{item.title}</span>
        <Icons.chevronRight className='ml-auto transition-transform duration-200 group-data-panel-open/collapsible:rotate-90' />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {children.map((child) => (
            <SidebarMenuSubItem key={child.title}>
              <SidebarMenuSubButton
                render={<Link to={child.url} aria-label={child.title} />}
                isActive={pathname === child.url}
              >
                <span>{child.title}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}
