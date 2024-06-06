import { getAllClasses } from "@/api/classes";
import { ClassCard } from "@/components/custom/ClassCard";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ClassesHeader } from "./ClassesHeader";
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
							console.log(item);

							return (
								<CourseCard
									cover={item?.course?.coverImg}
									startAt={item?.caretedAt}
									key={item?.id}
									name={item?.course?.name}
									level={item?.course.price}
									id={item?.id}
									description={item?.course?.description}
									queryKey="classes"
								/>
							);
						})
					)}
				</div>
			</ScrollArea>
		</Card>
	);
};
