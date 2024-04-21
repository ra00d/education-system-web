import apiClient from "@/common/api";

export const getAllExams = async () => {
  const data = await apiClient.get("exams");
  return data.data;
};
export const getExam = async (id: string) => {
  const data = await apiClient.get(`exams/${id}`);
  return data.data;
};

export const createExam = async (data: any) => {
  const response = await apiClient.post("exams", data);
  return response.data;
};

export const updateExam = async (id: string, data: any) => {
  const response = await apiClient.put(`exams/${id}`, data);
  return response.data;
};

export const deleteExam = async (id: string) => {
  const response = await apiClient.delete(`exams/${id}`);
  return response.data;
};
