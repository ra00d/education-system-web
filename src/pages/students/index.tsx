import apiClient from "@/common/api";
import { useQuery } from "react-query";
import {
	ColumnDef,
	PaginationState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Check, Cross, MoreHorizontal } from "lucide-react";
import { Loading } from "@/components/custom/Progress";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLayoutEffect, useMemo, useState } from "react";
import { useBearStore } from "@/common/stores";
import { TableContainer } from "@/components/custom/TableContainer";
import { ErrorComponent } from "@/components/custom/ErrorComponent";
// import { ScrollArea } from "@/components/ui/scroll-area";
export type Student = {
	email: string;
	id: number;
	connected: boolean;
	name?: string;
	level: string;
};

export const columns: ColumnDef<Student>[] = [
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
								navigator.clipboard.writeText(student.id.toString())
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
		accessorKey: "level",
		// accessorFn: (student) => student.level.name,
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
export const StudentsList = () => {
	const changePage = useBearStore((state) => state.changePage);
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageSize: 20,
		pageIndex: 0,
	});
	const pagination = useMemo(
		() => ({ pageSize, pageIndex }),
		[pageIndex, pageSize],
	);
	const { data, isError, isLoading, error } = useQuery<
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		any,
		{ message?: string }
	>(["all-student", { pageSize, pageIndex }], {
		// queryKey: "all-students",
		refetchOnMount: "always",
		retry: 2,
		staleTime: 0,
		queryFn: async () => {
			return await apiClient.get(
				`student/?page=${pageIndex + 1}&limit=${pageSize}`,
			);
		},
	});
	const table = useReactTable({
		data: data?.data?.result,
		columns,
		pageCount: data?.data?.totalPages ?? -1,
		state: {
			pagination,
		},
		// autoResetAll:true,
		onPaginationChange: setPagination,
		manualPagination: true,
		getCoreRowModel: getCoreRowModel(),
		// getPaginationRowModel: getPaginationRowModel(),
	});

	useLayoutEffect(() => {
		changePage("Students");
		console.log("changed");
	}, [changePage]);
	if (isLoading)
		return (
			<div className="min-h-full w-full flex justify-center items-center">
				<Loading size={48} />
			</div>
		);
	if (isError) return <ErrorComponent message={error?.message} />;
	return (
		<div className="max-h-[calc(100vh-15rem)] min-h-[calc(100vh-15rem)] h-[calc(100vh-15rem)]">
			<TableContainer height={15}>
				<Table className="border-separate border-spacing-y-4">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className="sticky top-0 bg-background z-50 first:rounded-l-md last:rounded-r-md"
											key={header.id}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className=""
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="first:rounded-l-md h-fit last:rounded-r-md last:border-r last:border-r-black  first:border-l first:border-l-black border-t border-b border-b-black border-t-black"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<div className="flex z-10 rounded-md items-center justify-center gap-2 py-2">
				<Button
					variant="outline"
					className="text-black"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					className="text-black"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
};
