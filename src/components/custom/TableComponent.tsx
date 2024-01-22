import {
	ColumnDef,
	Table as TableType,
	flexRender,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { TableContainer } from "./TableContainer";
import { Button } from "../ui/button";

export const TableComponent = ({
	table,
	columns,
}: { table: TableType<any>; columns: ColumnDef<any>[] }) => {
	return (
		<div>
			<div className="max-h-[calc(100vh-15rem)] min-h-[calc(100vh-15rem)] h-[calc(100vh-15rem)]">
				<TableContainer height={15}>
					<Table className="border-separate border-spacing-y-4">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="">
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												className="sticky top-0 bg-foreground text-background z-50 first:rounded-l-md last:rounded-r-md"
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
												className="first:rounded-l-md py-2 last:rounded-r-md last:border-r last:border-r-black 
												first:border-l first:border-l-black border-t border-b border-b-black border-t-black"
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
		</div>
	);
};
