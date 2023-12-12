import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PanelLeft } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

// TODO add type for this card
export type AnalayticsCardPropType = {
	icon: ReactNode;
	title: string;
	value: string;
	link?: string;
};
export const AnalyticsCard = ({
	icon,
	title,
	value,
	link,
}: AnalayticsCardPropType) => {
	return (
		<Card className="pt-2 px-2">
			<CardContent className="grid grid-cols-2">
				<div className="">{icon}</div>
				<div className="flex flex-col">
					<p className="text-2xl capitalize">{title}</p>
					<p>{value}</p>
				</div>
			</CardContent>
			<Separator className="" />
			<CardFooter>
				<Link to={link ?? "#"} className="flex gap-4 items-center">
					<PanelLeft />
					<span className={buttonVariants({ variant: "link" })}>more</span>
				</Link>
			</CardFooter>
		</Card>
	);
};
