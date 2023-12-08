import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoBook } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
	first_name: z.string({ required_error: "first name is required" }),
	last_name: z.string({ required_error: "last name is required" }),
	email: z.string().email({ message: "this is not a valid email" }),
	password_hash: z.string(),
	// password_confirmation
});
export default function SignUp() {
	const navigate = useNavigate();
	const [showPass, setShowPass] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password_hash: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		axios
			.post("http://localhost:3000/auth/sign-up", values)
			.then(() => navigate("/home"))
			.catch((err) => {
				setErrMsg(err.response.data.message);
			});
		console.log(values);
	}
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-white p-8 flex flex-col justify-center rounded shadow-md w-96">
				<div className="">
					<IoBook size="124" className="mx-auto" />
				</div>
				<h2 className="text-2xl font-semibold mb-6">Login</h2>
				<p className="lead text-red-500">{errMsg}</p>
				<Form {...form}>
					<form
						autoComplete="false"
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-3"
					>
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start">
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input className="bg-[#F7F7F8]" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start">
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input className="bg-[#F7F7F8]" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="bg-[#F7F7F8]"
											placeholder="e.g user@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password_hash"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-col items-start">
										<FormLabel>Password</FormLabel>
										<div
											className={cn(
												"flex bg-[#F7F7F8] rounded-md w-full items-center pr-7",
												"focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
											)}
										>
											<FormControl>
												<Input
													type={showPass ? "text" : "password"}
													className="bg-transparent pointer-events-auto border-none focus-visible:ring-0 focus-visible:ring-offset-0"
													{...field}
												/>
											</FormControl>
											{showPass ? (
												<MdVisibility
													size="24"
													className="cursor-pointer z-10"
													onClick={() => {
														setShowPass((prev) => !prev);
													}}
												/>
											) : (
												<MdVisibilityOff
													size="24"
													className="cursor-pointer z-10"
													onClick={() => {
														setShowPass((prev) => !prev);
													}}
												/>
											)}
										</div>
										<FormMessage />
									</FormItem>
								);
							}}
						/>

						<Button
							type="submit"
							className="bg-[#ED553B] text-white px-4 py-2 w-full rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
						>
							Sgin Up
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
