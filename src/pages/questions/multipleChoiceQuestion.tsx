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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export const MultiChoiceQuestions = () => {
	const form = useForm<{ question: string; answer?: any }>();
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
									<FormItem>
										<FormLabel>Answer</FormLabel>
										<FormControl>
											<div>
												<Input type="radio" {...field} value={"something"} />
												<Input
													type="radio"
													{...field}
													value={"something else"}
												/>
												<Input type="radio" {...field} value={"djkjdkfj"} />
											</div>
										</FormControl>
										<FormDescription>this field is optional</FormDescription>
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
