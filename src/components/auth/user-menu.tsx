import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/common/stores/auth";

export const UserMenu = () => {
  const user = useAuth((state) => state.getUser());
  const setUser = useAuth((state) => state.setUser);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <User size="26" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className=" min-w-[14rem]"
          align="end"
          alignOffset={-2}
          sideOffset={10}
          side="bottom"
        >
          <div className="flex justify-between   gap-3">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>option</DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between"
            onClick={() => {
              localStorage.clear();
              setUser(null);
              window.location.href = "/login";
            }}
          >
            <p> logout</p> <LogOut size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
