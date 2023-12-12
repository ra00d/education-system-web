import { CourseCard } from "@/components/custom/CourseCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CoursesPage = () => {
	return (
		<ScrollArea className="h-[80vh]">
			{" "}
			<div className="grid grid-cols-5 gap-3">
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
				<CourseCard level="level 1A" />
			</div>
		</ScrollArea>
	);
};
