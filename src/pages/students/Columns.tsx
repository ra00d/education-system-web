import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentType } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Cross, MoreHorizontal } from "lucide-react";

export const studentsTableColumns: ColumnDef<StudentType>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const student = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-4 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								student?.id && navigator.clipboard.writeText(student?.id)
							}
						>
							Copy student ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View Activities</DropdownMenuItem>
						<DropdownMenuItem>View Homeworks</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
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
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("connected");
			return status ? <Check /> : <Cross />;
		},
	},
];
