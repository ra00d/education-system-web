import { ClassCard } from "@/components/custom/ClassCard";
import { TableContainer } from "@/components/custom/TableContainer";

export const ClassesPage = () => {
	return (
		<div className="pt-5 !z-0">
			{" "}
			<TableContainer height={8}>
				<div className="grid grid-cols-5 gap-2">
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
					<ClassCard level="level 1A" />
				</div>
			</TableContainer>
		</div>
	);
};
