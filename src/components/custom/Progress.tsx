import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const Loading = ({
	className,
	size,
	color,
}: { className?: string; size?: number; color?: string }) => {
	return (
		<div className="flex flex-col items-center">
			<Loader2
				size={size ?? 24}
				color={color ?? "black"}
				className={cn("animate-spin", className)}
			/>
			<p>Loading...</p>
		</div>
	);
};
