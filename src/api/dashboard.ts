import apiClient from "@/common/api";
import { DashboardInfoType } from "@/types/responses";
const END_POINT = "dashboard";
export async function getDashboardInfo() {
	const data = await apiClient.get<DashboardInfoType>(END_POINT);
	return data.data;
}
