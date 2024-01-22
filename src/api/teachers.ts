import apiClient from "@/common/api";
import { CreateTeacherType } from "@/types/models";
import { TeachersResponseType } from "@/types/responses";

const END_POINT = "teacher";

// GET ALL STUDENTS
export async function getAllTeachers(
	page = 1,
	limit = 20,
): Promise<TeachersResponseType> {
	const data = await apiClient.get<TeachersResponseType>(END_POINT, {
		params: {
			page,
			limit,
		},
	});
	return data.data;
}

// ADD STUDENT
export async function addTeacher(
	body: CreateTeacherType,
): Promise<{ id: string }> {
	const response = await apiClient.post(END_POINT, body);
	return response.data;
}
