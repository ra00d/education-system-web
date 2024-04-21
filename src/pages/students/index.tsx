import { getAllStudent } from "@/api/students";
import { ErrorComponent } from "@/components/custom/ErrorComponent";
import { Loading } from "@/components/custom/Progress";
import { TableComponent } from "@/components/custom/TableComponent";
import { useQuery } from "@tanstack/react-query";
// biome-ignore lint/style/useImportType: <explanation>
import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { studentsTableColumns } from "./Columns";
// import { ScrollArea } from "@/components/ui/scroll-area";

export const StudentsList = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  const pagination = useMemo(
    () => ({ pageSize, pageIndex }),
    [pageIndex, pageSize],
  );
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["all-students", pageIndex, pageSize],
    queryFn: () => getAllStudent(pageIndex, pageSize),
  });
  const table = useReactTable({
    data: data ?? [],
    columns: studentsTableColumns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <div className="min-h-full w-full flex justify-center items-center">
        <Loading size={48} />
      </div>
    );
  if (isError) return <ErrorComponent message={error?.message} />;
  return <TableComponent table={table} columns={studentsTableColumns} />;
};
