import { ClassCard } from "@/components/custom/ClassCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeachersContent } from "./TeachersContent";
import { useState } from "react";
const Classes = () => (
	<>
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
	</>
);
const Days = ({ day }: { day: number }) => (
	<>
		<div className="rounded-full bg-gray-200 p-10 border-[10px] border-gray-500 flex justify-center items-center w-[50px] h-[50px]">
			<h4 className=" whitespace-nowrap">Day {day}</h4>{" "}
		</div>
	</>
);
const arr = new Array(30);
arr.fill(1);
export const MonitoringPage = () => {
	const [displayType, setDisplayType] = useState("teachers");
	return (
		<div>
			<div className="grid grid-cols-12  gap-3 py-5">
				<div className="flex flex-col col-span-8">
					<div className="avatar flex gap-4 mb-10">
						<Avatar className="shadow-md">
							<AvatarImage src="" />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
						<h1 className="text-3xl font-bold">Ali</h1>
					</div>

					{displayType === "teachers" ? (
						<ScrollArea className="w-full pr-2 h-[calc(100dvh-10rem)] pb-10 animate-in duration-1000 delay-1000 ">
							<div className="grid grid-cols-3 gap-4 animate-in duration-1000 delay-1000">
								<Classes />
							</div>{" "}
						</ScrollArea>
					) : (
						<ScrollArea className="w-full pr-2 h-[400px] pb-10 ">
							<div className="grid grid-cols-6 gap-4">
								{arr.map((_, index) => (
									<Days day={index + 1} />
								))}
							</div>
						</ScrollArea>
					)}{" "}
				</div>
				<div className="bg-gray-200 w-fit h-fit col-span-2 px-4 py-2  rounded-[30px]">
					<Tabs
						defaultValue={displayType}
						onValueChange={(value) => setDisplayType(value)}
					>
						<TabsList>
							<TabsTrigger value="teachers">teachers</TabsTrigger>
							<TabsTrigger value="students">students</TabsTrigger>
						</TabsList>
						<TabsContent value="teachers" className="flex flex-col gap-3">
							<TeachersContent />
							<TeachersContent />
							<TeachersContent />
							<TeachersContent />
						</TabsContent>
						<TabsContent className="flex flex-col gap-3" value="students">
							<TeachersContent />
							<TeachersContent />
							<TeachersContent />
							<TeachersContent />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};
