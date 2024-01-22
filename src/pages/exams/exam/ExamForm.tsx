import { DatePicker } from "@/components/custom/DatePicker";
import { LoadingButton } from "@/components/custom/LoadingButton";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { CreateExamType, examSchema } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ExamForm = () => {
	const form = useForm<CreateExamType>({
		resolver: zodResolver(examSchema),
		defaultValues: {
			teacher: 1,
			course: 1,
			time: new Date(),
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<div className=" h-full flex justify-center items-center ">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="px-10 py-5 bg-card border  flex flex-col gap-5 border-white rounded-md shadow-md "
				>
					<h2>new exam</h2>
					<div className="grid grid-cols-2 gap-5">
						<FormField
							name="time"
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem className="flex flex-col">
										<FormLabel>Date</FormLabel>
										<DatePicker {...field} />
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<LoadingButton
						// loading={mutation.isPending}
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
