import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

export const TableContainer = ({
	children,
	// width = 13,
	height = 13,
}: {
	children: ReactNode;
	height?: number;
	width?: number;
}) => {
	return (
		<ScrollArea
			className={`max-h-[calc(100vh-${height}rem)] min-h-[calc(100vh-${height}rem)] h-[calc(100vh-${height}rem)]`}
		>
			{children}
		</ScrollArea>
	);
};
