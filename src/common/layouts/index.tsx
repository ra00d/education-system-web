import { Navbar } from "@/components/Navbar";
import { UserMenu } from "@/components/auth/user-menu";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Moon, Search, Sun } from "lucide-react";
import { Outlet, useMatches } from "react-router-dom";
import { useTheme } from "../context/theme-context";

const Layout = () => {
  const { setTheme, theme } = useTheme();
  const matches = useMatches();

  return (
    <div className="flex  p-0  overflow-hidden bg-background text-foreground relative h-screen ">
      <div className="shadow-md  bg-card w-fit pb-2   px-2  sticky top-0 h-screen ">
        <Navbar />
      </div>
      <div className="flex flex-col  z-10  flex-1">
        <div className="flex items-center justify-between px-2 py-2 pb-[.60rem] w-full h-fit shadow-sm border-x-0 	 ">
          <div className="flex items-center w-full pb-2">
            <h2 className="capitalize ">
              {(matches.at(1)?.data as any)?.pageName ?? ""}
            </h2>
          </div>
          <div
            className="  w-full flex  items-center  justify-between gap-3"
            // dir="rtl"
          >
            <InputWithIcon icon={<Search />} className="  w-full" />
            <UserMenu />
            <Button
              variant="ghost"
              onClick={() => {
                const newThem = theme === "dark" ? "light" : "dark";
                setTheme(newThem);
              }}
            >
              {theme === "dark" ? (
                <Sun size={26} className="animate-in animate-ping" />
              ) : (
                <Moon size={26} />
              )}
            </Button>
          </div>
        </div>
        <Separator />
        <div className="pb-0 shadow-md flex-1 mt-2 overflow-y-auto">
          <div className="px-4">
            <Breadcrumbs />
          </div>
          <div className="col-span-11 py-2 px-4 w-full">
            {/* {isMobile() ? "isMobile" : "desktop"} */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
