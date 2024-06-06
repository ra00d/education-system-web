import apiClient from "@/common/api";
import { CreateTeacherType } from "@/types/models";

const END_POINT = "teachers";

// GET ALL STUDENTS
export async function getAllTeachers(page = 1, limit = 20): Promise<any> {
  const data = await apiClient.get<any>(END_POINT, {
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
