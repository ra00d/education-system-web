import { getCourseInfo } from "@/api/courses";
import { LoadingPage } from "@/components/custom/LoadingPage";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, ListChecks, User2 } from "lucide-react";
import { useParams } from "react-router-dom";

export const CourseInfo = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`course-info-${id}`],
    queryFn: () => {
      return getCourseInfo(id!);
    },
    enabled: !!id,
  });
  if (!id) {
    return <div>No cousre</div>;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-5 items-baseline">
            <h1>{data.name}</h1>
            <CardDescription className="flex items-center gap-2">
              <User2 size={16} />
              {data.teacher.name}
            </CardDescription>
          </CardTitle>
          <CardDescription>
            <div className="flex gap-2">
              <div className="flex gap-1 items-center">
                <Calendar size={16} />
                <p>{format(data.startDate, "MMM do p")}</p>
              </div>
              <p>to</p>
              <div className="flex gap-1 items-center">
                <Calendar size={16} />
                <p>{format(data.endDate, "MMM do p")}</p>
              </div>
            </div>
          </CardDescription>
          <CardDescription>
            <div className="flex gap-2">
              <div className="flex gap-1 items-center">
                <ListChecks size={16} />
              </div>
              <p>Exam on</p>
              <div className="flex gap-1 items-center">
                <Calendar size={16} />
                <p>{format(data.exam.date, "MMM do p")}</p>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <p>
            <pre className="whitespace-pre-wrap">{data.description}</pre>
          </p>
          <div className="bg-muted rounded-md p-2">
            <h1>Students</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.exam.students.map((s) => (
                  <TableRow key={s?.student?.id}>
                    <TableCell>{s?.student.name}</TableCell>
                    <TableCell>--</TableCell>
                    <TableCell>{s?.mark}</TableCell>
                    <TableCell>
                      {data.exam?.mark / s?.mark >= 75 ? (
                        <Badge className="bg-green-500">"A</Badge>
                      ) : data.exam?.mark / s?.mark >= 60 ? (
                        <Badge className="bg-blue-500"> B</Badge>
                      ) : data.exam?.mark / s?.mark >= 50 ? (
                        <Badge className="bg-yellow-500"> C</Badge>
                      ) : data.exam?.mark / s?.mark >= 40 ? (
                        <Badge className="bg-orange-500"> D</Badge>
                      ) : (
                        <Badge variant={"destructive"}> F</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>{" "}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
