import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

export type ErrorComponentPropType = {
	message?: string;
	color?: string;
};
export const ErrorComponent = ({ message, color }: ErrorComponentPropType) => {
	return (
		<div className="min-h-full text-red-500 flex flex-col justify-center items-center h-full">
			<AlertTriangle size={48} />
			<h1 className={cn("text-red-500", color ?? "")}>
				{message ?? "Sorry something went wrong"}
			</h1>
		</div>
	);
};
