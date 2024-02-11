import * as z from "zod";

export type User = {
	id: number | string;
	name: string;
	email: string;
	phone: string;
};

// STUDENT TYPES
export const studentSchema = z
	.object({
		name: z
			.string({ invalid_type_error: "the name must be in characters" })
			.min(3, { message: "This field must be more than 3 letters" }),
		email: z.string().email({ message: "This is not a valid email" }),
		password: z.string().min(2, {
			message: "Password must be more than 6 characters",
		}),
		password_confirmation: z.string({
			required_error: "password does not match",
		}),

		level: z.number({ required_error: "level is required" }),
		birthdat: z.date({ required_error: "birth date is required" }),
		grade: z.string({ required_error: "the grade is required" }),
	})
	.refine(
		({ password, password_confirmation }) => password_confirmation === password,
		{
			message: "passwords does not match",
			path: ["password_confirmation"],
		},
	);
export type CreateStudentType = z.infer<typeof studentSchema>;

// TEACHER TYPES
export const teacherSchema = z
	.object({
		name: z
			.string({ invalid_type_error: "the name must be in characters" })
			.min(3, { message: "This field must be more than 3 letters" }),
		email: z.string().email({ message: "This is not a valid email" }),
		password: z.string().min(6, {
			message: "Password must be more than 6 characters",
		}),
		password_confirmation: z.string({
			required_error: "password does not match",
		}),
		degree: z.string(),
	})
	.refine(
		({ password, password_confirmation }) => password_confirmation === password,
		{
			message: "passwords does not match",
			path: ["password_confirmation"],
		},
	);
export type CreateTeacherType = z.infer<typeof teacherSchema>;

export const examSchema = z.object({
	time: z.date({ required_error: "Exam date is required" }),
	course: z.number({ required_error: "The course is required" }),
	teacher: z.number({}),
});
export type CreateExamType = z.infer<typeof examSchema>;

export const courseSchema = z.object({
	name: z.string({ required_error: "the name is required" }),
	description: z.string({ required_error: "the description is required" }),
	start_at: z.date({ required_error: "the start at date is required" }),
	end_at: z.date({ required_error: "the end at date is required" }),
	cover_img: z.any({ required_error: "the cover image is required" }),
	price: z.number({ required_error: "the price is required" }),
	level: z.number({
		required_error: "the level is required",
		invalid_type_error: "the level must be a number",
	}),
});
export type CreateCourseType = z.infer<typeof courseSchema>;

export const classSchema = z.object({
	name: z.string({ required_error: "the name filed is required" }),
	description: z.string({
		required_error: "the description filed is required",
	}),
	level_id: z.number({ required_error: "the level filed is required" }),
	course_id: z.number({ required_error: "the course filed is required" }),
	teacher_id: z.number({ required_error: "the teacher filed is required" }),
	start_at: z.date({ required_error: "the starting time is required" }),
	end_at: z.date({ required_error: "the finishing time is required" }),
});
export type CreateClassType = z.infer<typeof classSchema>;

export type StudentType = {
	name: string;
	email: string;
	phone?: string;
	id: string;
	level: LevelType;
};
export type TeacherType = {
	name: string;
	email: string;
	phone?: string;
	id: string;
	degree: string;
};
export type LevelType = {
	id: number;
	name: string;
};
