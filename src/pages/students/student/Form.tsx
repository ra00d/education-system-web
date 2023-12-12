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
import * as z from "zod";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { MdEmail } from "react-icons/md";
import { PasswordField } from "@/components/custom/PasswordField";
import { LoadingButton } from "@/components/custom/LoadingButton";

export const studentSchema = z.object({
	name: z
		.string({ invalid_type_error: "the name must be in characters" })
		.min(3, { message: "This field must be more than 3 letters" }),
	email: z.string().email({ message: "This is not a valid email" }),
	password: z.string().min(6, {
		message: "Password must be more than 6 characters",
	}),
	level: z.string(),
});
export const StudentForm = () => {
	const form = useForm<z.infer<typeof studentSchema>>({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			level: "",
		},
	});
	const onSubmit = (data: z.infer<typeof studentSchema>) => {
		console.log(data);
	};
	return (
		<div className=" h-full flex justify-center items-center ">
			{" "}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="px-10 py-5 bg-primary-tableHead border  flex flex-col gap-5 border-white rounded-md shadow-md "
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
					<LoadingButton type="submit">Add</LoadingButton>
				</form>
			</Form>
		</div>
	);
};
