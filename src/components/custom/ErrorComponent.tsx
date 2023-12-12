import { cn } from "@/lib/utils";
import { MdWarning } from "react-icons/md";

export type ErrorComponentPropType = {
	message?: string;
	color?: string;
};
export const ErrorComponent = ({ message, color }: ErrorComponentPropType) => {
	return (
		<div className="min-h-full flex flex-col justify-center items-center h-full">
			<MdWarning size={48} color="red"/>
			<h1 className={cn("text-red-500", color ?? "")}>
				{message ?? "Sorry something went wrong"}
			</h1>
		</div>
	);
};
