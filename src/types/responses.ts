import { StudentType, TeacherType } from "./models";

// ALL RESPONSE TYPES FOR THE SYSTEM
export type StudentsResponseType = {
	result: StudentType[];
	count: number;
	totalPages: number;
};

export type TeachersResponseType = {
	result: TeacherType[];
	count: number;
	totalPages: number;
};

export type DashboardInfoType = {
	students: number;
	teachers: number;
	levels: number;
	courses: number;
};
