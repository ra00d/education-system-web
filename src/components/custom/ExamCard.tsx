import {
	Book,
	LocateFixedIcon,
	Menu,
	ShieldQuestion,
	Watch,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

export const ExamCard = () => {
	return (
		<Card className="pt-2 ">
			<CardContent className="flex items-center gap-5 justify-between ">
				<div className="">
					<Book size={48} />
				</div>
				<div className="flex flex-col px-2">
					<p className="text-xl capitalize   whitespace-nowrap text-ellipsis">
						Course Math
					</p>
					<p className="font-light">01:13</p>
				</div>
			</CardContent>
			<Separator className="" />
			<CardFooter className="mt-2 flex flex-col items-center">
				<div className="flex items-center justify-between px-2 w-full">
					<Watch />
					<span>01:25</span>
				</div>
				<div className="flex items-center justify-between px-2 w-full">
					<LocateFixedIcon />
					<span>405</span>
				</div>
				<div className="flex items-center justify-between px-2 w-full">
					<ShieldQuestion />
					<span>30</span>
				</div>
				<div className="flex items-center justify-between px-2 w-full">
					<Menu />
					<span>30</span>
				</div>
			</CardFooter>
		</Card>
	);
};
