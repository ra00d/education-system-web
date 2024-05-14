import apiClient from "@/common/api";
import { LoadingPage } from "@/components/custom/LoadingPage";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, ChevronsUpDown, Loader2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const Question = ({
  q,
}: {
  q: {
    content: string;
    id: string;
    mark: any;
    answers: { content: string; type: boolean }[];
  };
}) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/exams/questions/${q?.id}`);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [`exam-${id}`] });
      toast.toast({
        title: "Success",
        description: "Question updated successfully",
      });
    },
    onError: () => {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    },
  });

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold flex-1">{q.content}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <Button
          variant={"destructive"}
          size="icon"
          disabled={isPending}
          onClick={async () => {
            mutate();
          }}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
        </Button>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm bg-green-300">
        {q.answers.find((val) => val.type)?.content}
      </div>
      <CollapsibleContent className="space-y-2">
        {q.answers
          .filter((val) => !val.type)
          .map((a) => (
            <div className="rounded-md border px-4 py-3 font-mono text-sm bg-red-300">
              {a.content}
            </div>
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
export const ExamDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: [`exam-${id}`],
    queryFn: async () => {
      const res = await apiClient.get(`/exams/${id}`);
      return res.data;
    },
  });
  if (!id) {
    return <div>Not found</div>;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="">
      <Tabs defaultValue="exam">
        <TabsList>
          <TabsTrigger value="exam">Exam</TabsTrigger>

          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="exam">
          <div>
            <h1>{data?.course?.name}</h1>
            <div className="flex gap-2 items-center">
              <Calendar />
              <p>{data?.date}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 items-center">
            {data?.questions?.map((q) => <Question q={q} />)}
          </div>
        </TabsContent>
        <TabsContent value="questions">
          <QuestionsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const QuestionsForm = () => {
  const { id } = useParams();
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post(`/exams/${id}/add-question`, data);
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [`exam-${id}`],
      });
    },
  });
  const form = useForm<{
    content: string;
    mark: string;
    answers: { content: string; type: boolean }[];
  }>({
    defaultValues: {
      content: "",
      mark: "",
      answers: [],
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button>Save</Button>
        <QuestionsConatiner {...form} />
      </form>
    </Form>
  );
};
const QuestionsConatiner = (
  form: UseFormReturn<{
    content: string;
    mark: string;
    answers: { content: string; type: boolean }[];
  }>,
) => {
  return (
    <div className="items-center ">
      <div>
        <div className="grid grid-cols-3 gap-5 items-end">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2 ">
                  <FormLabel>
                    <h2>Question </h2>
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
            name={`mark`}
            render={({ field }) => {
              return (
                <FormItem className="">
                  <FormLabel>Mark</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <AnswersConatiner form={form} />
        </div>
      </div>
    </div>
  );
};

const AnswersConatiner = ({
  form,
}: {
  form: UseFormReturn<{
    content: string;
    mark: string;
    answers: { content: string; type: boolean }[];
  }>;
}) => {
  const [correct, setCorrect] = useState("");
  const answers = useFieldArray({
    control: form.control,
    name: `answers`,
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
                    content: form.watch(`answers.${i}.content`),
                  };
                } else {
                  return {
                    type: false,
                    content: form.watch(`answers.${i}.content`),
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
                  name={`answers.${i}.content`}
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
                  name={`answers.${i}.type`}
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
