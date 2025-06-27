import { Link, useRouter } from "@tanstack/react-router";
import {
  ChevronUp,
  User2,
  LogOut,
  Settings as SettingsIcon,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navigationItems, userMenuItems } from "@/data/navigation";
import { signOut, useSession } from "@/lib/auth";
import { authQueries } from "@/services/queries";
import { useQueryClient } from "@tanstack/react-query";

interface AppSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    await queryClient.invalidateQueries({ queryKey: authQueries.all });
    router.invalidate();
  };

  const defaultUser = {
    name: data?.user?.name || "John Doe",
    email: data?.user?.email || "john.doe@example.com",
    avatar: data?.user?.image || "",
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <User2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Your App</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2"
                      activeOptions={{
                        exact: true,
                      }}
                      activeProps={{
                        className: "bg-primary text-primary-foreground",
                      }}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={defaultUser.avatar}
                      alt={defaultUser.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {defaultUser.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {defaultUser.name}
                    </span>
                    <span className="truncate text-xs">
                      {defaultUser.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    {item.title === "Logout" ? (
                      <div
                        className="flex items-center gap-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="size-4" />
                        {item.title}
                      </div>
                    ) : (
                      <Link to={item.href} className="flex items-center gap-2">
                        {item.title === "Profile" && (
                          <User className="size-4" />
                        )}
                        {item.title === "Account Settings" && (
                          <SettingsIcon className="size-4" />
                        )}
                        {item.title}
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
