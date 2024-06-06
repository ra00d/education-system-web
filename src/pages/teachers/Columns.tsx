import { Checkbox } from "@/components/ui/checkbox";
import { TeacherType } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";

export const teachersTableColumns: ColumnDef<TeacherType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
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
    accessorKey: "degree",
    header: "Degree",
  },
  // {
  //   id: "actions",
  //   header: () => <div className="text-center">Actions</div>,
  //   cell: ({}) => {
  //     return (
  //       <div className="flex gap-8 justify-center">
  //         {/* <Button variant="ghost"> */}
  //         {/*   <Edit color="green" /> */}
  //         {/* </Button> */}
  //         {/* <Button variant={"ghost"}> */}
  //         {/*   <Trash2 color="red" /> */}
  //         {/* </Button> */}
  //       </div>
  //     );
  //   },
  // },
];
