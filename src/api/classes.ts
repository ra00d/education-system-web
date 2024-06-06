import apiClient from "@/common/api";
import { CreateClassType } from "@/types/models";

const END_POINT = "classes";

export async function getAllClasses() {
	const data = await apiClient.get(`${END_POINT}/all`);
	return data.data;
}

export async function getClass(id: string) {
	const data = await apiClient.get(`${END_POINT}/${id}/info`, {});
	return data.data;
}

export async function addClass(data: CreateClassType) {
	return await apiClient.post(END_POINT, data, {});
}

export async function deleteClass(id: number) {
	const data = await apiClient.delete(`${END_POINT}/${id}`, {});
	return data.data;
}

export async function updateClass(data: Partial<CreateClassType>, id: number) {
	return await apiClient.put(`${END_POINT}/${id}`, data);
}
