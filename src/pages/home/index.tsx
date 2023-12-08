import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentsList } from "../students";

export default function HomePage() {
	// console.log("home page");
	return (
		<div>
			<Tabs defaultValue="students" className="w-full mt-5 bg-transparent">
				<TabsList className="bg-transparent">
					<TabsTrigger value="students" className="bg-transparent">
						Students
					</TabsTrigger>
					<TabsTrigger value="teachers" className="bg-transparent">
						Teachers
					</TabsTrigger>
				</TabsList>
				<TabsContent value="students" className="font-bold text-white">
					<div className="max-h-[calc(100vh-8rem)] overflow-hidden">
						<StudentsList />
					</div>
				</TabsContent>
				<TabsContent value="teachers" className="font-bold text-white">
					Teachers
				</TabsContent>
			</Tabs>
		</div>
	);
}
