import { getAllExams } from "@/api/exams";
import { ExamCard } from "@/components/custom/ExamCard";
import { LoadingPage } from "@/components/custom/LoadingPage";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export const ExamsPage = () => {
  const { data, isLoading, isError, error, isLoadingError } = useQuery({
    queryKey: ["all-exams"],
    queryFn: () => getAllExams(),
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1>Exams</h1>
        <div>
          <Tooltip>
            <TooltipTrigger
              className={buttonVariants({ variant: "default", size: "icon" })}
            >
              <a href="/exams/new">
                <Plus />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={10}>
              <p>Add Exam</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <ScrollArea className="h-[80vh]">
        {isLoading && !isLoadingError ? (
          <div>
            <LoadingPage />
          </div>
        ) : isError || isLoadingError ? (
          <div>{(error as any).message}</div>
        ) : data?.length === 0 ? (
          <div className="flex justify-center">
            <p>No Exams</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {data.map((exam: any) => (
              <ExamCard key={exam.id} {...exam} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
