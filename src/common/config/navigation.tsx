import { Book, ListIcon, Monitor, User } from "lucide-react";
import { ReactNode } from "react";
import { MdClass } from "react-icons/md";

export type NavItem = {
	path: string;
	icon: ReactNode;
	title: string;
};

export const navItems: NavItem[] = [
	{
		path: "/",
		title: "acounts",
		icon: <User size="28" />,
	},
	{
		path: "classes",
		title: "Classes",
		icon: <MdClass size="28" />,
	},
	{
		path: "courses",
		title: "Courses",
		icon: <Book size="28" />,
	},
	{
		path: "exams",
		title: "Exams",
		icon: <ListIcon size="28" />,
	},
	{
		path: "monitoring",
		title: "Monitoring",
		icon: <Monitor size="28" />,
	},
];
