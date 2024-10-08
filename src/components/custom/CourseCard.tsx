import { deleteCourse } from "@/api/courses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Book,
	CircleUserRound,
	DollarSign,
	Edit,
	Eye,
	Trash,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { ConfirmDialog } from "./ConfirmDialog";

type CourseCardProps = {
	level: string;
	name: string;
	id: number;
	description: string;
	cover: string;
	startAt: string;
	queryKey?: string;
	deleteAction?: (id: number) => void;
};

export const CourseCard = (props: CourseCardProps) => {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const mutation = useMutation({
		mutationKey: ["delete-course", props.id],
		//@ts-ignore
		mutationFn: (id: number) => {
			return props.deleteAction ? props.deleteAction(id) : deleteCourse(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [props.queryKey || "courses"],
			});
		},
	});
	return (
		<Card className="shadow-md animate-in  slide-in-from-top ">
			<ConfirmDialog
				open={open}
				setOpen={() => {
					setOpen(false);
				}}
				message={`the course ${props.name} will be deleted`}
				action={() => {
					mutation.mutate(props.id);
					setOpen(false);
				}}
			/>
			<div className="grid md:grid-cols-2 gap-2   rounded-md p-2">
				<div className=" grid md:grid-cols-3 col-span-2 gap-4">
					<div className=" col-span-1">
						{/* <Skeleton className="w-[120px] h-[120px] bg-gray-400" /> */}
						<img
							className="w-[120px] h-[120px]"
							src={`${props.cover.replace("10.0.2.2", "localhost")}`}
							alt={props.name}
						/>
					</div>
					<div className=" mx-2 col-span-2">
						<div className="flex flex-col gap-1 mx-3 text-base">
							<p className="flex gap-1 ">
								<Book />
								{props.name}
							</p>
							<p className=" flex gap-1">
								<DollarSign />
								{props.level}
							</p>
							<p className="flex gap-1 ">
								<CircleUserRound />
								{new Intl.DateTimeFormat("en-US").format(
									new Date(props.startAt),
								)}
							</p>
						</div>
						<Separator />
						<div className="flex gap-2">
							{props.deleteAction && (
								<Button variant="ghost">
									<Link to={`${props.id}`}>
										<Edit />
									</Link>
								</Button>
							)}
							<Button variant="ghost">
								<Link to={`${props.id}/info`}>
									<Eye />
								</Link>
							</Button>
							{props.deleteAction && (
								<Button
									onClick={() => {
										setOpen(true);
									}}
									variant="ghost"
								>
									<Trash color="red" />
								</Button>
							)}{" "}
						</div>
					</div>
				</div>
				<div className="  text-sm gap-2 col-span-2 line-clamp-3 ">
					<p>{props.description}</p>
				</div>
			</div>
		</Card>
	);
};
