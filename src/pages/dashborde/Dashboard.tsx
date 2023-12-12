import { School2, Users2 } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
export const DashboardPage = () => {
	return (
		<div className="flex flex-col">
			<div className="flex gap-4 justify-between px-4">
				<AnalyticsCard
					icon={<Users2 size={48} />}
					title="students"
					value="120"
				/>
				<AnalyticsCard
					icon={<School2 size={48} />}
					title="students"
					value="120"
				/>
				<AnalyticsCard
					icon={<FaChalkboardTeacher size={48} />}
					title="students"
					value="120"
				/>
				<AnalyticsCard
					icon={<MdOutlineClass size={48} />}
					title="students"
					value="120"
				/>
			</div>
		</div>
	);
};
