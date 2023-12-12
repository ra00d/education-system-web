import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type NewType = {
	level: string;
};

export const CourseCard = ({ level }: NewType) => {
	return (
		<Card className="">
			<div className="grid grid-cols-3 gap-2 bg-[#EDEEFF]  rounded-md p-2">
				<div className="col-span-2">
					<Skeleton className="w-[120px] h-[120px] bg-gray-400" />
					<h1 className="text-3xl font-bold">{level}</h1>
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
		</Card>
	);
};
