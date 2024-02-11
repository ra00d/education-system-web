import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentType } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

export const studentsTableColumns: ColumnDef<StudentType>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		// accessorKey: "level",
		accessorFn: (student) => student?.level.name,
		header: "Level",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "connected",

		header: () => <div className="text-center">Actions</div>,
		cell: ({}) => {
			return (
				<div className="flex gap-8 justify-center">
					<Button variant="ghost">
						<Edit color="green" />
					</Button>
					<Button variant={"ghost"}>
						<Trash2 color="red" />
					</Button>
				</div>
			);
		},
	},
];
