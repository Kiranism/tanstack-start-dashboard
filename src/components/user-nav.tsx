import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth";
import { authQueries } from "@/services/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

interface UserNavProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserNav({
  user = { name: "Demo User", email: "demo@example.com" },
}: UserNavProps) {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    await queryClient.invalidateQueries({ queryKey: authQueries.all });
    router.invalidate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={data?.user?.image || ""}
              alt={data?.user?.name}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>
              {data?.user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
