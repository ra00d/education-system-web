import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentsList } from "../students";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeachersList } from "../teachers/Teachers";
// type tabs=['student','teacher']  const;
export default function HomePage() {
	const navigate = useNavigate();
	const [type, setType] = useState("student");
	return (
		<div className="p-3 pt-1 bg-card  rounded-md shadow-md h-[calc(100vh-6rem)] max-h-fit mr-3 ">
			<Tabs
				defaultValue={type}
				onValueChange={(value) => setType(value)}
				className="w-full mt-5 bg-transparent h-full"
			>
				<div className="flex w-full  justify-between items-center">
					<TabsList className="bg-transparent">
						<TabsTrigger value="student" className="bg-transparent">
							Students
						</TabsTrigger>
						<TabsTrigger value="teacher" className="bg-transparent">
							Teachers
						</TabsTrigger>
					</TabsList>
					<Tooltip>
						<TooltipTrigger>
							<Plus
								size={24}
								className={buttonVariants({
									variant: "default",
									size: "icon",
									className: "cursor-pointer text-white",
								})}
								onClick={() => {
									type === "student"
										? navigate("/students/new")
										: navigate("/teachers/new");
								}}
							/>
						</TooltipTrigger>
						<TooltipContent>
							add new <span className="capitalize"> {type}</span>
						</TooltipContent>
					</Tooltip>
				</div>
				<TabsContent value="student" className="h-full  ">
					<StudentsList />
				</TabsContent>
				<TabsContent value="teacher" className="h-full ">
					<TeachersList />
				</TabsContent>
			</Tabs>
		</div>
	);
}
