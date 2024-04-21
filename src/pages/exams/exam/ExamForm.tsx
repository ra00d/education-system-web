import { getAllCourses } from "@/api/courses";
import { createExam } from "@/api/exams";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { getResponseErrors } from "@/lib/utils";
import { examSchema, type CreateExamType } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Plus, Trash2, WatchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";

export const ExamForm = () => {
  const { data } = useQuery({
    queryKey: ["all-courses"],
    queryFn: () => getAllCourses(),
  });
  const form = useForm<CreateExamType>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      duration: 2,
      questions: [],
      mark: 0,
    },
  });
  const { toast } = useToast();
  // const { data } = useQuery({
  // 	queryKey: ["all-levels"],
  // 	queryFn: () => getAllLevels(),
  // 	placeholderData: [],
  // });
  const mutation = useMutation({
    mutationFn: async (exam: any) => {
      return await createExam(exam);
    },
    onSuccess: () => {
      toast({
        title: "The exam added successfully",
        className: "bg-green-200 dark:text-white font-bold dark:bg-green-500",
      });
    },
    onError: (err: any) => {
      toast({
        title: err.response?.data?.message,
        className: "bg-destructive text-destructive-foreground dark:text-white",
        duration: 2000,
      });
      getResponseErrors(err.response, form.setError);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  return (
    <div className=" h-full flex justify-center items-center  ">
      <Form {...form}>
        <ScrollArea className=" overflow-y-scroll max-h-[calc(100vh-6rem)] ">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-10 py-5 bg-card border  flex flex-col gap-5 border-white rounded-md shadow-md"
          >
            <h2>New exam</h2>
            <div className="grid grid-cols-2 gap-5 ">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Input
                        {...field}
                        value={format(field.value, "yyyy-MM-dd HH:mm")}
                        onChange={(e) => {
                          field.onChange(new Date(e.target.value.toString()));
                        }}
                        type="datetime-local"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                name="mark"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Marks</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="duration"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          {...field}
                          type="number"
                          icon={
                            <div className="flex gap-2 items-center">
                              <p>H</p>
                              <WatchIcon />
                            </div>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="course"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger type="button">
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.map((level: any) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <QuestionsConatiner {...form} />
            </div>
            <LoadingButton
              // loading={mutation.isPending}
              className="text-white font-bold"
              type="submit"
            >
              Add
            </LoadingButton>
          </form>
        </ScrollArea>
      </Form>
    </div>
  );
};

const QuestionsConatiner = (form: UseFormReturn<CreateExamType>) => {
  const questions = useFieldArray({
    control: form.control,
    name: "questions",
  });
  return (
    <div className="col-span-2">
      <div className="flex justify-between">
        <h1>Questions</h1>
        <Button
          type="button"
          size="icon"
          onClick={() =>
            questions.append({
              content: "",
              mark: 0,
              answers: [],
            })
          }
        >
          <Plus />
        </Button>
      </div>
      <div>
        {questions.fields.map((item, index) => (
          <div className="grid grid-cols-3 gap-5" key={item.id}>
            <FormField
              control={form.control}
              name={`questions.${index}.content`}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      <h2>Question {index + 1}</h2>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={`questions.${index}.mark`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Mark</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <AnswersConatiner form={form} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

const AnswersConatiner = ({
  form,
  index,
}: {
  form: UseFormReturn<CreateExamType>;
  index: number;
}) => {
  const [correct, setCorrect] = useState("");
  const answers = useFieldArray({
    control: form.control,
    name: `questions.${index}.answers` as "questions.0.answers",
  });
  const switchRef = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="col-span-3 space-y-5">
      <div className="flex justify-between items-center">
        <h3>Answers</h3>
        <Button
          type="button"
          size="icon"
          onClick={() =>
            answers.append({
              content: "",
              type: false,
            })
          }
        >
          <Plus />
        </Button>
      </div>
      <div className="space-y-5">
        <ToggleGroup
          type="single"
          value={correct}
          onValueChange={(value) => {
            setCorrect(value);
            answers.replace(
              answers.fields.map((_, i) => {
                if (i === +value) {
                  return {
                    type: true,
                    content: form.watch(
                      `questions.${index}.answers.${i}.content`,
                    ),
                  };
                } else {
                  return {
                    type: false,
                    content: form.watch(
                      `questions.${index}.answers.${i}.content`,
                    ),
                  };
                }
              }),
            );
          }}
          className="flex flex-col space-y-5 items-stretch justify-center"
        >
          {answers.fields.map((item, i) => {
            return (
              <div
                className="flex justify-between gap-5 items-center"
                key={item.id}
              >
                <h5>Answer {i + 1}</h5>
                <FormField
                  control={form.control}
                  name={`questions.${index}.answers.${i}.content`}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={`questions.${index}.answers.${i}.type`}
                  render={({ field }) => {
                    return (
                      <FormItem className="">
                        <ToggleGroupItem
                          ref={(el) => (switchRef.current[i] = el)}
                          className="z-50 relative"
                          value={i.toString()}
                          role="radio"
                          type="button"
                          asChild
                        >
                          <FormControl>
                            <div>
                              <Switch
                                type="button"
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  if (checked && switchRef.current[i])
                                    switchRef.current[i]?.click();
                                }}
                              />
                            </div>
                          </FormControl>
                        </ToggleGroupItem>
                      </FormItem>
                    );
                  }}
                />
                <div className="flex justify-between gap-2 items-center">
                  <Button
                    type="button"
                    size="icon"
                    onClick={() =>
                      answers.append({
                        content: "",
                        type: false,
                      })
                    }
                  >
                    <Plus />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => answers.remove(i)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            );
          })}
        </ToggleGroup>
      </div>
    </div>
  );
};
