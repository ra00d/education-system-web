import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { MdEmail } from "react-icons/md";
import { PasswordField } from "@/components/custom/PasswordField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { CreateStudentType, studentSchema } from "@/types/models";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllLevels } from "@/api/levels";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { addStudent } from "@/api/students";
import { useToast } from "@/components/ui/use-toast";
import { getResponseErrors } from "@/lib/utils";

export const StudentForm = () => {
	const { toast } = useToast();
	const { data } = useQuery({
		queryKey: ["all-levels"],
		queryFn: () => getAllLevels(),
		placeholderData: [],
	});
	const mutation = useMutation({
		mutationFn: async (newStudent: CreateStudentType) => {
			return await addStudent(newStudent);
		},
		onSuccess: () => {
			toast({
				title: "The student added successfully",
				className: "bg-green-200 dark:text-white font-bold dark:bg-green-500",
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
	const form = useForm<CreateStudentType>({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const onSubmit = (data: CreateStudentType) => {
		console.log(data);
		mutation.mutate(data);
	};

	return (
		<div className=" h-full flex justify-center items-center ">
			{" "}
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
							name="level"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Level</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a level" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{data?.map((level) => (
													<SelectItem
														key={level.id}
														value={level.id.toString()}
													>
														{level.name}
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
							name="password"
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
