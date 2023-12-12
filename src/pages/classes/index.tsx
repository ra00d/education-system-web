import { ClassCard } from "@/components/custom/ClassCard";
import { TableContainer } from "@/components/custom/TableContainer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ClassesPage = () => {
	return (
		<ScrollArea className=" !z-0 h-[80vh]">
			{" "}
				<div className="grid grid-cols-5 gap-2">
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
				</div>
		</ScrollArea>
	);
};
