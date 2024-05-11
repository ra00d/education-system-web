import { deleteStudent } from "@/api/students";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentType } from "@/types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useState } from "react";

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
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: (props) => {
      const [open, setOpen] = useState(false);
      const client = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: async () => {
          const res = await deleteStudent(props.row.original.id);
          return res;
        },
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["all-students"] });
        },
      });
      return (
        <>
          <ConfirmDialog
            open={open}
            setOpen={() => {
              setOpen(false);
            }}
            message={`the student ${props.row.original.name} will be deleted`}
            action={() => {
              mutate();
              setOpen(false);
            }}
          />
          <div className="flex gap-8 justify-center">
            <Button variant="ghost" onClick={() => setOpen(true)}>
              <Edit color="green" />
            </Button>
            {/* <Button */}
            {/*   variant={"ghost"} */}
            {/*   onClick={() => { */}
            {/*     setOpen(true); */}
            {/*   }} */}
            {/* > */}
            {/*   <Trash2 color="red" /> */}
            {/* </Button> */}
          </div>
        </>
      );
    },
  },
];
