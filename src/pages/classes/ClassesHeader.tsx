import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const ClassesHeader = () => {
	return (
		<div className="grid grid-cols-3 gap-4 w-full  my-2 ">
			<div className="col-span-2">
				<InputWithIcon icon={<Search />} />
			</div>
			<div className="flex justify-end">
				<Button className="text-background">
					<Link to="new">new</Link>
				</Button>
			</div>
		</div>
	);
};
