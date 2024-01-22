import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { YesOrNoQuestions } from "./yesOrNoQuestions";
import { RegularQuestions } from "./regularQuestion";
import { MultiChoiceQuestions } from "./multipleChoiceQuestion";
export const Questions = () => {
	const [tab, setTab] = useState("regular");
	return (
		<Tabs
			defaultValue={tab}
			defaultChecked
			onValueChange={(val) => {
				setTab(val);
			}}
		>
			<TabsList>
				<TabsTrigger value="regular">regular</TabsTrigger>
				<TabsTrigger value="yes_or_no">yes or no</TabsTrigger>
				<TabsTrigger value="multiple">multiple</TabsTrigger>
			</TabsList>
			<TabsContent value="regular">
				<RegularQuestions />
			</TabsContent>
			<TabsContent value="yes_or_no">
				<YesOrNoQuestions />
			</TabsContent>
			<TabsContent value="multiple">
				<MultiChoiceQuestions />
			</TabsContent>
		</Tabs>
	);
};
