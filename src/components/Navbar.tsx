import { navItems } from "@/common/config/navigation";
import { cn } from "@/lib/utils";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { NavLink } from "react-router-dom";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

export const Navbar = () => {
	return (
		<div className="flex mt-10 flex-col gap-5 z-50 items-center">
			{navItems.map((item) => (
				<TooltipProvider key={item.path}>
					<Tooltip delayDuration={100} disableHoverableContent>
						<NavLink
							to={item.path}
							className={({ isActive, isPending }) => {
								return cn(
									isPending
										? "pending"
										: isActive
										? "bg-[#2c3681] text-white"
										: "bg-gray-200 ",
									"px-2 py-2 rounded-md hover:bg-purple-500 hover:shadow-md hover:text-white",
								);
							}}
						>
							<TooltipTrigger>{item.icon}</TooltipTrigger>
						</NavLink>
						<TooltipContent
							side="top"
							sideOffset={8}
							align="start"
							alignOffset={10}
							avoidCollisions={false}
						>
							<p className="z-50">{item.title}</p>
							<TooltipArrow />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			))}
			;
		</div>
	);
};
