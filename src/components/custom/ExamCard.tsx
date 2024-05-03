import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Menu, ShieldQuestion, Trash2, Watch } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { ConfirmDialog } from "./ConfirmDialog";
import { deleteExam } from "@/api/exams";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ExamCard = (props: { [_key: string]: any | undefined }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-course", props?.id],
    mutationFn: (id: string) => {
      return deleteExam(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [props.queryKey || "all-exams"],
      });
    },
  });

  return (
    <Card className="pt-2 ">
      <ConfirmDialog
        open={open}
        setOpen={() => {
          setOpen(false);
        }}
        message={`the Exam ${props.name} will be deleted`}
        action={() => {
          mutation.mutate(props.id);
          setOpen(false);
        }}
      />

      <CardContent className="flex items-center gap-5 justify-between ">
        <div className="">
          <img
            src={props?.course?.coverImg}
            alt={props?.course?.name}
            className="w-24 h-24 rounded-md"
          />
          {/* <Book size={48} /> */}
        </div>
        <div className="flex flex-col px-2">
          <p className="text-xl capitalize   whitespace-nowrap text-ellipsis">
            {props?.course?.name}
          </p>
          <p className="font-light">{props?.startDate}</p>
        </div>
      </CardContent>
      <Separator className="" />
      <CardFooter className="mt-2 flex flex-col items-center">
        <div className="flex items-center justify-between px-2 w-full">
          <Watch />
          <span>{props?.duration}</span>
        </div>
        <div className="flex items-center justify-between px-2 w-full">
          <ShieldQuestion />
          <span>{props?.mark}</span>
        </div>
        <div className="flex items-center justify-between px-2 w-full">
          <Menu />
          <span>{props?.questions?.length}</span>
        </div>
        <div className=" w-full mt-5 flex items-center justify-between ">
          <Button className="bg-green-400 hover:bg-green-300" asChild>
            <Link to={`/exams/${props.id}`}>
              <Eye />
            </Link>
          </Button>
          <Button
            variant={"destructive"}
            className=""
            onClick={() => setOpen(true)}
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
