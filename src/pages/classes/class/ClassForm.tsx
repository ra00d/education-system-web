import { addClass, updateClass } from "@/api/classes";
import { getAllCourses } from "@/api/courses";
import { getAllLevels } from "@/api/levels";
import { getAllTeachers } from "@/api/teachers";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getResponseErrors } from "@/lib/utils";
import { CreateClassType, classSchema } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { UseFormReturn, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const ClassForm = () => {
	const { id } = useParams();
	const form = useForm<CreateClassType>({
		resolver: zodResolver(classSchema),
		defaultValues: {
			name: "",
			description: "",
			start_at: new Date(),
			end_at: new Date(),
		},
	});
	const { isLoading, levels, courses, mutate, teachers } = useClassFormData(
		id,
		{
			form,
		},
	);
	const onSubmit = (data: CreateClassType) => {
		// console.log(data.start_at);

		mutate(data);
	};
	return (
		<Card className="p-2">
			<Form {...form}>
				<form
					className="grid md:grid-cols-2 gap-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{/* <FormField */}
						{/* 	control={form.control} */}
						{/* 	name="level_id" */}
						{/* 	render={({ field }) => { */}
						{/* 		return ( */}
						{/* 			<FormItem> */}
						{/* 				<FormLabel>Level</FormLabel> */}
						{/* 				<Select */}
						{/* 					value={form.watch("level_id")?.toString()} */}
						{/* 					onValueChange={(value) => field.onChange(Number(value))} */}
						{/* 				> */}
						{/* 					<FormControl> */}
						{/* 						<SelectTrigger> */}
						{/* 							<SelectValue placeholder="Select a level" /> */}
						{/* 						</SelectTrigger> */}
						{/* 					</FormControl> */}
						{/* 					<SelectContent> */}
						{/* 						{levels?.map((level) => ( */}
						{/* 							<SelectItem */}
						{/* 								key={level.id} */}
						{/* 								value={level.id.toString()} */}
						{/* 							> */}
						{/* 								{level.name} */}
						{/* 							</SelectItem> */}
						{/* 						))} */}
						{/* 					</SelectContent> */}
						{/* 				</Select> */}
						{/* 				<FormMessage /> */}
						{/* 			</FormItem> */}
						{/* 		); */}
						{/* 	}} */}
						{/* /> */}
						<FormField
							control={form.control}
							name="course_id"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Course</FormLabel>
										<Select
											value={form.watch("course_id")?.toString()}
											onValueChange={(value) => field.onChange(Number(value))}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a course" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{courses?.map((course: any) => (
													<SelectItem
														key={course.id}
														value={course.id.toString()}
													>
														{course.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="teacher_id"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Teacher</FormLabel>
										<Select
											value={form.watch("teacher_id")?.toString()}
											onValueChange={(value) => field.onChange(Number(value))}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a teacher" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{teachers?.result?.map((teacher: any) => (
													<SelectItem
														key={teacher.id}
														value={teacher.id.toString()}
													>
														{teacher.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												className="min-h-[112px]"
												placeholder="the course description"
												{...field}
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<div className="grid grid-cols-2 gap-2">
							<FormField
								control={form.control}
								name="start_at"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>start at</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													value={format(field.value, "HH:mm")}
													onChange={(val) => {
														field.onChange(
															parse(val.target.value, "HH:m", new Date()),
														);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
							<FormField
								control={form.control}
								name="end_at"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>ends at</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													value={format(field.value, "HH:mm")}
													onChange={(val) => {
														field.onChange(
															parse(val.target.value, "HH:m", new Date()),
														);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						</div>{" "}
					</div>
					<LoadingButton loading={isLoading} className="w-full  my-2">
						{id === "new" ? "save" : "update"}
					</LoadingButton>
				</form>
			</Form>
		</Card>
	);
};

const useClassFormData = (
	id: string | undefined,
	{
		form,
	}: {
		form: UseFormReturn<CreateClassType>;
	},
) => {
	const { data: courses, refetch } = useQuery({
		queryKey: ["courses"],
		queryFn: () => getAllCourses(),
	});
	// TOAST HOOKS
	const { toast } = useToast();

	// GET ALL LEVEL
	const { data: levels } = useQuery({
		queryKey: ["all-levels"],
		queryFn: () => getAllLevels(),
		placeholderData: [],
	});
	const { data: teachers } = useQuery({
		queryKey: ["teachers"],
		queryFn: () => getAllTeachers(),
	});
	// MUATION HOOKS
	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreateClassType) => {
			return id === "new" ? addClass(data) : updateClass(data, Number(id));
		},
		onSuccess: () => {
			refetch();
			toast({
				title: `The class ${id === "new" ? "added" : "updated"} successfully`,
				className:
					"bg-green-400 text-white dark:text-white font-bold dark:bg-green-500",
			});
		},
		onError: (err: any) => {
			toast({
				title: err.response?.data?.message,
				className: "bg-destructive text-destructive-foreground dark:text-white",
				duration: 2000,
			});
			getResponseErrors(err.response, form.setError);
		},
	});
	return {
		isLoading: isPending,
		courses,
		teachers,
		levels,
		mutate,
	};
};
