import { addCourse, getCourse, updateCourse } from "@/api/courses";
import { getAllTeachers } from "@/api/teachers";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn, getResponseErrors } from "@/lib/utils";
import { courseSchema, type CreateCourseType } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const CourseForm = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>();
  const { id } = useParams();
  console.log(id);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourse(id ?? ""),
    enabled: id !== "new",
  });
  // TOAST HOOKS
  const { toast } = useToast();
  // FORM HOOKS
  const form = useForm<CreateCourseType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      price: 0,
    },
  });
  // GET ALL LEVEL
  const { data } = useQuery({
    queryKey: ["all-teachers"],
    queryFn: () => getAllTeachers(),
    placeholderData: [],
  });

  // MUATION HOOKS
  const { mutate, isPending } = useMutation({
    mutationFn: async (newCourse: FormData) => {
      return id === "new"
        ? await addCourse(newCourse)
        : await updateCourse(newCourse, id ?? "");
    },
    onSuccess: () => {
      // refetch();
      toast({
        title: `The course ${id === "new" ? "added" : "updated"} successfully`,
        className:
          "bg-green-400 text-white dark:text-white font-bold dark:bg-green-500",
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
  const onSubmit = (data: Record<string, any>) => {
    const formData = new FormData();
    for (const key in data) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
      if (data.hasOwnProperty(key) && key !== "cover_img") {
        const element = data[key];
        formData.append(key, element);
      }
    }
    formData.append("cover_img", data.cover_img);
    mutate(formData);
  };

  useEffect(() => {
    if (id !== "new" && !isLoading) {
      form.setValue("description", course?.description);
      form.setValue("name", course?.name);
      form.setValue("price", course?.price);
      form.setValue("startDate", new Date(course?.startDate));
      form.setValue("endDate", new Date(course?.endDate));
      form.setValue("seats", course?.seats);
      form.setValue("availableSeats", course?.availableSeats);
      form.setValue("teacher", course?.teacher.id);

      setImage(`${course?.coverImg}`);
    }
  }, [id, course, form, isLoading]);

  return (
    <>
      <Card className=" h-fit p-2">
        <CardHeader>
          <CardTitle className="text-start">New Course</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form
            className="px-10 grid grid-cols-2 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Course name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Seats number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={Number(field.value)}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="availableSeats"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Available seats number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={Number(field.value)}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          type="number"
                          icon={<DollarSign />}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>

                      {/* <Select */}
                      {/* 	value={form.watch("level")?.toString()} */}
                      {/* 	onValueChange={(value) => field.onChange(Number(value))} */}
                      {/* > */}
                      {/* 	<FormControl> */}
                      {/* 		<SelectTrigger> */}
                      {/* 			<SelectValue placeholder="Select a level" /> */}
                      {/* 		</SelectTrigger> */}
                      {/* 	</FormControl> */}
                      {/* 	<SelectContent> */}
                      {/* 		{data?.map((level) => ( */}
                      {/* 			<SelectItem */}
                      {/* 				key={level.id} */}
                      {/* 				value={level.id.toString()} */}
                      {/* 			> */}
                      {/* 				{level.name} */}
                      {/* 			</SelectItem> */}
                      {/* 		))} */}
                      {/* 	</SelectContent> */}
                      {/* </Select> */}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="the course description"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col py-2">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " h-10 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          // 	date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription> */}
                    {/* 	When the course is going to start */}
                    {/* </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col py-2">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " h-10 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          // 	date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription> */}
                    {/* 	When the course is going to start */}
                    {/* </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Teacher</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a teacher" />
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
              <FormField
                control={form.control}
                name="coverImg"
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <FormItem className="grid md:grid-cols-3 gap-2">
                      <Card className=" col-span-2 p-2 h-[150px] shadow-md flex items-center justify-center cursor-pointer">
                        {image === null || image === undefined ? (
                          <></>
                        ) : (
                          <img src={image.toString()} alt="cover" />
                        )}
                      </Card>
                      <div>
                        <FormLabel>select cover image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            // value={value}
                            accept="image/*"
                            // className="hidden"
                            id="cover_img"
                            {...field}
                            onChange={(event) => {
                              const fileInput = event.target;
                              // Check if a file is selected
                              if (fileInput.files?.[0]) {
                                const reader = new FileReader();
                                onChange(fileInput.files[0]);

                                // Read the selected file as a data URL
                                reader.onload = (e) => {
                                  setImage(e.target?.result);
                                };

                                // Load the selected file as a data URL
                                reader.readAsDataURL(fileInput.files[0]);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          an image to show for the course
                        </FormDescription>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>
            <LoadingButton loading={isPending} className="w-full  my-2">
              {id === "new" ? "save" : "update"}
            </LoadingButton>
          </form>
        </Form>
      </Card>
    </>
  );
};
