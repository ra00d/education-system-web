import { ExamCard } from "@/components/custom/ExamCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ExamsPage = () => {
	return (
		<ScrollArea className="h-[80vh]">
			{" "}
			<div className="grid grid-cols-4 gap-2">
				<ExamCard />
				<ExamCard />
				<ExamCard />
				<ExamCard />
				<ExamCard />
			</div>
		</ScrollArea>
	);
};
