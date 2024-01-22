import apiClient from "@/common/api";
import { LevelType } from "@/types/models";

const END_POINT = "level";
export async function getAllLevels() {
	const data = await apiClient.get<LevelType[]>(END_POINT);
	return data.data;
}
