'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, UserRound } from "lucide-react"
import { useEffect, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import React from "react"
import { Calendar } from "./ui/calendar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useForm } from "react-hook-form";
import { iso, z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CreateAccount, Sex } from "@/lib/types";
import { createAccount } from "@/lib/actions/account.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  sex: z.enum([Sex.MALE, Sex.FEMALE]),
  birth: z.date({ error: "Please select a date of birth." }),
  age: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;  // Define the form values type

interface FilterBarProps {
  searchParam: string;
  setSearchParam: (searchParam: string) => void;
}

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const FilterBar: React.FC<FilterBarProps> = ({ searchParam, setSearchParam }) => {
  // TODO: search accounts 

  const defaultDate = new Date();
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const { mutate, isPending, isError, isSuccess } = useMutation({ mutationFn: createAccount });
  const [isOpen, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sex: Sex.MALE,
      birth: defaultDate,
    },
  });

  const { handleSubmit, control, setValue, formState, watch, reset } = form;
  // Watch for changes in birthdate and calculate age
  const birthDate = watch("birth");
  useEffect(() => {
    if (birthDate) {
      const calculatedAge = calculateAge(birthDate);
      setValue("age", calculatedAge, { shouldValidate: false });
  }
  }, [birthDate, setValue]);


  const onSubmit = async (values: FormValues) => {
    mutate({
      ...values, age: calculateAge(values.birth),
    }, {
      onSuccess: (data) => {
        console.log(data)
        setOpen(false)
       // toast('Hello', {success: {message: ''}})
      },
      onError: (error) => {
        //toast("Failed", {type: 'error'})
      }
    })
  };

  const onSearch = (search: string) => {
    setSearchParam(search);
  }



  return (
    <section className="py-4">
      <div className="flex items-center justify-between gap-6 text-2xl my-4">
        <div className="font-sans font-bold text-3xl">
          Subscribed Accounts
        </div>
        <div className="flex max-w-sm items-center gap-2">
          <div className="flex flex-row gap-2 rounded-md bg-white items-center border border-gray-100 shadow-sm pr-2">
            <Input
              onChange={(e) => onSearch(e.target.value)}
              value={searchParam}
              className="border-none shadow-none rounded-r-none"
              type="search"
              placeholder="Search..."
            />
            <Search color="black" width={20} height={20} />
          </div>

          <AlertDialog onOpenChange={() => setOpen(!isOpen)} open={isOpen}>
            <AlertDialogTrigger>
              <Button>Add Account</Button>
            </AlertDialogTrigger>
         <AlertDialogOverlay>
            <AlertDialogContent className="p-6 space-y-4">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <AlertDialogHeader className="space-y-2 mb-5 items-center flex">
                    <UserRound /> 
                    <AlertDialogTitle className="text-xl">Create Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Provide all information needed below to create a new account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="User Name"
                                className="border-black"
                                {...field}
                              />
                            </FormControl>
                            <p className="text-red-500 text-sm">{formState.errors.name?.message}</p>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={control}
                        name="birth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full px-4 justify-between font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? field.value.toLocaleDateString() : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  captionLayout="dropdown"
                                  onSelect={(selectedDate) => {
                                    field.onChange(selectedDate); // Update form value through react-hook-form
                                    setDate(selectedDate); // Keep local state in sync for display
                                  }}
                                  disabled={(date) => date > new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                            <p className="text-red-500 text-sm">{formState.errors.birth?.message}</p>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={control}
                        name="sex"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sex</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full border-black px-4">
                                  <SelectValue placeholder="Select a sex" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value={Sex.MALE}>Male</SelectItem>
                                  <SelectItem value={Sex.FEMALE}>Female</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <p className="text-red-500 text-sm">{formState.errors.sex?.message}</p>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <AlertDialogFooter className="py-6">
                    <Button type="submit" className="disabled:bg-opacity-90" disabled={isPending}>
                      {isPending && <Loader2 className="animate-spin" />}
                      Create Account
                    </Button>
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
}

