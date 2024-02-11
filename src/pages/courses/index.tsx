import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CoursesHeader } from "./CoursesHeader";
import { CourseCard } from "@/components/custom/CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "@/api/courses";
import { Loading } from "@/components/custom/Progress";

export const CoursesPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["courses"],
		queryFn: async () => {
			return await getAllCourses();
		},
		placeholderData: [],
	});
	console.log(data);

	return (
		<Card className="p-2 ">
			<h1>Courses</h1>
			<CoursesHeader />
			<ScrollArea className="h-[calc(100vh-13rem)]">
				{isLoading ? (
					<Loading />
				) : isError ? (
					<div>Sorry something went wrong</div>
				) : (
					<div className="grid md:grid-cols-3 gap-3 p-2 h-full">
						{data.length > 0 &&
							data?.map((item: any) => (
								<CourseCard
									cover={item?.cover_img}
									startAt={item?.start_at}
									key={item?.id}
									name={item?.name}
									level={item?.price}
									id={item?.id}
									description={item?.description}
								/>
							))}
					</div>
				)}
			</ScrollArea>
		</Card>
	);
};
