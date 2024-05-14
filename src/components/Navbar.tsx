import { navItems } from "@/common/config/navigation";
import { cn } from "@/lib/utils";
import { TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LogOut, Printer } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth } from "@/common/stores/auth";

export const Navbar = () => {
  const setUser = useAuth((state) => state.setUser);
  return (
    <div className="flex mt-2 py-2 flex-col gap-5  items-center">
      <NavLink to="/">
        <div>
          <Printer />
        </div>
      </NavLink>
      <Separator />
      {navItems.map((item) => (
        <TooltipProvider key={item.path}>
          <Tooltip delayDuration={100}>
            <NavLink
              to={item.path}
              className={({ isActive, isPending }) => {
                return cn(
                  isPending
                    ? "pending"
                    : isActive
                      ? "bg-card-foreground text-card"
                      : "bg-gray-200 bg-card text-card-foreground",
                  "px-2 py-2 rounded-md hover:bg-purple-500 hover:shadow-md hover:text-white",
                );
              }}
            >
              <TooltipTrigger>{item.icon}</TooltipTrigger>
            </NavLink>
            <TooltipPortal>
              <TooltipContent
                side="right"
                alignOffset={10}
                avoidCollisions={false}
              >
                <p className="z-50">{item.title}</p>
                <TooltipArrow color="white" />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      ))}
      <Button
        variant="ghost"
        onClick={() => {
          localStorage.clear();
          setUser(null);
          window.location.href = "/login";
        }}
      >
        <LogOut />
      </Button>
    </div>
  );
};
