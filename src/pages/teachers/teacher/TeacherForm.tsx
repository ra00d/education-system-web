import { addTeacher } from "@/api/teachers";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordField } from "@/components/custom/PasswordField";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getResponseErrors } from "@/lib/utils";
import { CreateTeacherType, teacherSchema } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";

export const TeacherForm = () => {
	const { toast } = useToast();

	const mutation = useMutation({
		mutationFn: async (newTeacher: CreateTeacherType) => {
			return await addTeacher(newTeacher);
		},
		onSuccess: () => {
			toast({
				title: "The teacher added successfully",
				className: "bg-green-200 dark:text-white font-bold dark:bg-green-500",
			});
		},
		onError: (err: any) => {
			//@ts-ignore
			const errors = err.response?.data?.errors;
			toast({
				title: err.response?.data?.message,
				className: "bg-destructive text-destructive-foreground dark:text-white",
				duration: 2000,
			});
			getResponseErrors(err?.response, form.setError);
		},
	});
	const form = useForm<CreateTeacherType>({
		resolver: zodResolver(teacherSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			degree: "",
		},
	});
	const onSubmit = (data: CreateTeacherType) => {
		mutation.mutate(data);
	};

	return (
		<div className=" h-full flex justify-center items-center ">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="px-10 py-5 bg-card border  flex flex-col gap-5 border-white rounded-md shadow-md "
				>
					<h2>new student</h2>
					<div className="grid grid-cols-2 gap-5">
						{" "}
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
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<InputWithIcon icon={<MdEmail size={24} />} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="degree"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Degree</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordField {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="password_confirmation"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Confirm password</FormLabel>
										<FormControl>
											<PasswordField {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>{" "}
					<LoadingButton
						loading={mutation.isPending}
						className="text-white font-bold"
						type="submit"
					>
						Add
					</LoadingButton>
				</form>
			</Form>
		</div>
	);
};
