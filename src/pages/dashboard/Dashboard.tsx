import { School2, Users2 } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getDashboardInfo } from "@/api/dashboard";
import { ErrorComponent } from "@/components/custom/ErrorComponent";
import { LoadingPage } from "@/components/custom/LoadingPage";
export const DashboardPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["dashboard-info"],
		queryFn: () => getDashboardInfo(),
	});
	if (isError) {
		return <ErrorComponent />;
	}
	if (isLoading) {
		return <LoadingPage />;
	}
	return (
		<div className="flex flex-col">
			<div className="flex gap-4 justify-between px-4">
				<AnalyticsCard
					icon={<Users2 size={48} />}
					title="students"
					value={data?.students}
				/>
				<AnalyticsCard
					icon={<School2 size={48} />}
					title="Levels"
					value={data?.levels ?? 0}
				/>
				<AnalyticsCard
					icon={<FaChalkboardTeacher size={48} />}
					title="Teachers"
					value={data?.teachers ?? 0}
				/>
				<AnalyticsCard
					icon={<MdOutlineClass size={48} />}
					title="Courses"
					value={data?.courses}
				/>
			</div>
		</div>
	);
};
