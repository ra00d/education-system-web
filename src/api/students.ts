// ALL FUNCTIONS TO DEAL WITH THE SYSTEM API

import apiClient from "@/common/api";
import { CreateStudentType } from "@/types/models";

const END_POINT = "students";

// GET ALL STUDENTS
export async function getAllStudent(page: number, limit: number): Promise<any> {
  const data = await apiClient.get<any>(END_POINT, {
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
// UPDATE STUDENT
export async function updateStudent(
  id: string,
  body: CreateStudentType,
): Promise<any> {
  const response = await apiClient.put(`${END_POINT}/${id}`, body);
  return response.data;
}

//
// DELETE STUDENT
export async function deleteStudent(id: string): Promise<any> {
  const response = await apiClient.delete(`${END_POINT}/${id}`);
  return response.data;
}
