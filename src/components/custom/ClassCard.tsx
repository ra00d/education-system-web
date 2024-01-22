import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
export type ClassCardProps = {
	level: string;
};
export const ClassCard = ({ level }: ClassCardProps) => {
	return (
		<Card>
			<div className="z-1  rounded-md p-2">
				{" "}
				<div className="grid grid-cols-3 gap-2">
					<div className="col-span-2">
						<Skeleton className="w-[140px] h-[130px] bg-gray-600" />
					</div>
					<div className="flex flex-col text-sm gap-2">
						<Button variant="ghost" className=" bg-gray-300 text-xs">
							delete
						</Button>
						<Button variant="ghost" className=" bg-gray-300 text-xs">
							edit
						</Button>
						<Button variant="ghost" className=" bg-gray-300 text-xs">
							apply
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-1 font-bold items-center place-items-center">
					<div className="text-xs flex flex-col">
						<span>{level}</span>
						<span>9:00 pm</span>
						<span>teacher: sam</span>
					</div>
					<div className="text-xs flex flex-col">
						<span>level 1A</span>
						<span>9:00 pm</span>
						<span>teacher: sam</span>
					</div>
				</div>
			</div>
		</Card>
	);
};
