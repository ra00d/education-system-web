import apiClient from "@/common/api";
import { CreateCourseType } from "@/types/models";

const END_POINT = "course";

export async function getAllCourses() {
	const data = await apiClient.get(END_POINT);
	return data.data;
}

export async function getCourse(id: number) {
	const data = await apiClient.get(`${END_POINT}/${id}`, {});
	return data.data;
}

export async function addCourse(data: FormData) {
	return await apiClient.postForm(END_POINT, data, {});
}

export async function deleteCourse(id: number) {
	const data = await apiClient.delete(`${END_POINT}/${id}`, {});
	return data.data;
}

export async function updateCourse(data: FormData, id: number) {
	return await apiClient.putForm(`${END_POINT}/${id}`, data);
}
