// ALL FUNCTIONS TO DEAL WITH THE SYSTEM API

import apiClient from "@/common/api";
import { CreateStudentType } from "@/types/models";
import { StudentsResponseType } from "@/types/responses";

const END_POINT = "student";

// GET ALL STUDENTS
export async function getAllStudent(
	page: number,
	limit: number,
): Promise<StudentsResponseType> {
	const data = await apiClient.get<StudentsResponseType>(END_POINT, {
		params: {
			page,
			limit,
		},
	});
	return data.data;
}

// ADD STUDENT
export async function addStudent(
	body: CreateStudentType,
): Promise<{ id: string }> {
	const response = await apiClient.post(END_POINT, body);
	return response.data;
}
