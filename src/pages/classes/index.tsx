import { ScrollArea } from "@/components/ui/scroll-area";
import { ClassesHeader } from "./ClassesHeader";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { deleteClass, getAllClasses } from "@/api/classes";
import { Loading } from "@/components/custom/Progress";
import { CourseCard } from "@/components/custom/CourseCard";

export const ClassesPage = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["classes"],
		queryFn: () => getAllClasses(),
	});

	return (
		<Card className="p-2 ">
			<ClassesHeader />
			<ScrollArea className=" h-[calc(100vh-11rem)]">
				<div className="grid grid-cols-5 gap-2">
					{isLoading ? (
						<Loading />
					) : (
						data?.map((item: any) => {
							return (
								<CourseCard
									cover={item?.course?.cover_img}
									startAt={item?.start_at}
									key={item?.id}
									name={item?.name}
									level={item?.level.name}
									id={item?.id}
									description={item?.description}
									deleteAction={deleteClass}
									queryKey="classes"
								/>
							);
						})
					)}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
					{/* <ClassCard level="level 1A" /> */}
				</div>
			</ScrollArea>
		</Card>
	);
};
