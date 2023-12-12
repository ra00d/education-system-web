import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
export type TeacherContentPropsType = {
	name?: string;
};
export const TeachersContent = () => {
	return (
		<div>
			<div className="flex gap-3 items-center bg-primary-background   px-1 rounded-full">
				<Avatar className="my-1">
					<AvatarImage src="" />
					<AvatarFallback className="bg-[#ffd343]">{""}</AvatarFallback>
				</Avatar>
				<h1 className="text-xs text-ellipsis font-bold text-white whitespace-nowrap">
					Ali
				</h1>
				<h1 className="text-xs text-ellipsis font-bold text-white whitespace-nowrap">
					5 classes
				</h1>
				<Button className="rounded-full text-xs bg-[#ffd343] text-black">
					delete
				</Button>
				<Button className="rounded-full text-xs bg-[#ffd343] text-black">
					add
				</Button>
				<Button className="rounded-full text-xs bg-[#ffd343] text-black">
					close
				</Button>
			</div>
		</div>
	);
};
