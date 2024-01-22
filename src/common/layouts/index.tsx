import { Navbar } from "@/components/Navbar";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { Moon, Search, Sun, User } from "lucide-react";
import { MdVerifiedUser } from "react-icons/md";
import { Link, Outlet, UIMatch, useMatches } from "react-router-dom";
import { RouteDataType } from "../config/routes";
import { Button } from "@/components/ui/button";
import { useTheme } from "../context/theme-context";
import { Separator } from "@/components/ui/separator";

const Layout = () => {
	const { setTheme, theme } = useTheme();
	const [
		_,
		{
			data: { pageName },
		},
	] = useMatches() as UIMatch<RouteDataType>[];

	return (
		<div className="flex  p-0 h-screen overflow-hidden bg-background text-foreground ">
			<div className="shadow-md  bg-card w-fit pb-2   px-2   ">
				<Navbar />
			</div>
			<div className="flex flex-col  z-10  flex-1">
				<div className="flex items-center justify-between px-2 py-2 pb-[.60rem] w-full h-fit shadow-sm border-x-0 	 ">
					<div className="flex items-center w-full pb-2">
						<h2 className="capitalize ">{pageName ?? ""}</h2>
					</div>
					<div
						className="  w-full flex  items-center  justify-between gap-3"
						// dir="rtl"
					>
						<InputWithIcon icon={<Search />} className="  w-full" />
						<Link to={"#"} className=" px-2 py-2 h-full rounded-md">
							<User size="26" />
						</Link>
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
				<div className="pb-0 shadow-md flex-1 mt-5">
					<div className="col-span-11 py-2 px-4 w-full min-h-[calc(100vh-13rem)]">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
