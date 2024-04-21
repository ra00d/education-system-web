import { addStudent } from "@/api/students";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordField } from "@/components/custom/PasswordField";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
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
import { useToast } from "@/components/ui/use-toast";
import { cn, getResponseErrors } from "@/lib/utils";
import { CreateStudentType, studentSchema } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon, School } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";

export const StudentForm = () => {
  const [yearValue, setYearValue] = useState<string>("");
  const [dateOpen, setDateOpen] = useState(false);
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setYearValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      form.setValue("birthdate", date);
      // setYearValue(format(date, "y-MM-dd"));
      // form.setFocus("birthdat");
    } else {
      // form.setError("birthdat", { message: "invalid date" });
    }
  };
  const { toast } = useToast();
  // const { data } = useQuery({
  // 	queryKey: ["all-levels"],
  // 	queryFn: () => getAllLevels(),
  // 	placeholderData: [],
  // });
  const mutation = useMutation({
    mutationFn: async (newStudent: CreateStudentType) => {
      return await addStudent(newStudent);
    },
    onSuccess: () => {
      toast({
        title: "The student added successfully",
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
  const form = useForm<CreateStudentType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      level: 1,
      birthdate: new Date(),
    },
  });
  const onSubmit = (data: CreateStudentType) => {
    mutation.mutate(data);
  };

  return (
    <div className=" h-full flex justify-center  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-10 py-5 bg-card border  flex flex-col gap-2  rounded-md shadow-md "
        >
          <h2>new student</h2>
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* <FormField */}
            {/* 	control={form.control} */}
            {/* 	name="level" */}
            {/* 	render={({ field }) => { */}
            {/* 		return ( */}
            {/* 			<FormItem> */}
            {/* 				<FormLabel>Level</FormLabel> */}
            {/* 				<Select */}
            {/* 					onValueChange={(value) => field.onChange(Number(value))} */}
            {/* 				> */}
            {/* 					<FormControl> */}
            {/* 						<SelectTrigger> */}
            {/* 							<SelectValue placeholder="Select a level" /> */}
            {/* 						</SelectTrigger> */}
            {/* 					</FormControl> */}
            {/* 					<SelectContent> */}
            {/* 						{data?.map((level) => ( */}
            {/* 							<SelectItem */}
            {/* 								key={level.id} */}
            {/* 								value={level.id.toString()} */}
            {/* 							> */}
            {/* 								{level.name} */}
            {/* 							</SelectItem> */}
            {/* 						))} */}
            {/* 					</SelectContent> */}
            {/* 				</Select> */}
            {/* 				<FormMessage /> */}
            {/* 			</FormItem> */}
            {/* 		); */}
            {/* 	}} */}
            {/* /> */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={<MdEmail size={24} />} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        type="text"
                        icon={<School size={24} />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col justify-end ">
                    <FormLabel>Brithdate</FormLabel>
                    <Popover
                      open={dateOpen}
                      onOpenChange={(open) => setDateOpen(open)}
                    >
                      <PopoverTrigger asChild onClick={() => setDateOpen(true)}>
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
                          selected={form.watch("birthdate") ?? new Date(1999)}
                          month={field.value}
                          onSelect={(m) => {
                            field.onChange(m);
                            if (m) setYearValue(format(m, "y-MM-dd"));
                          }}
                          onMonthChange={(m) => {
                            field.onChange(m);
                            setYearValue(format(m, "y-MM-dd"));
                          }}
                          // disabled={(date) =>
                          // 	date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                          components={{
                            Head: () => {
                              return (
                                <thead>
                                  <tr>
                                    <th className="flex justify-center">
                                      <InputWithIcon
                                        role="cell"
                                        className="mx-2"
                                        placeholder={format(
                                          new Date(),
                                          "y-MM-dd",
                                        )}
                                        onChange={handleInputChange}
                                        value={yearValue}
                                        autoFocus
                                        // value={format(field.value, "PPP")}
                                        icon={<CalendarIcon />}
                                        size={24}
                                      />
                                    </th>
                                  </tr>
                                </thead>
                              );
                            },
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordField {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordField {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>{" "}
          <LoadingButton
            loading={mutation.isPending}
            className="text-white font-bold"
            type="submit"
          >
            Add
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};
