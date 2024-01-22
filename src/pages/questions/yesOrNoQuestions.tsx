import { LoadingButton } from "@/components/custom/LoadingButton";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export const YesOrNoQuestions = () => {
	const form = useForm<{ question: string; answer: boolean }>();
	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2"
					>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>question</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="answer"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
										<label htmlFor="answer-switch" className="space-y-0.5">
											<FormLabel>True answer</FormLabel>
											<FormDescription>
												the answer will be true if checked .
											</FormDescription>
										</label>
										<FormControl>
											<Switch
												id="answer-switch"
												className="data-[state=checked]:bg-green-500"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<LoadingButton>save</LoadingButton>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
