'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  Search } from "lucide-react"
import {  useEffect, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import React from "react"
import { Calendar } from "./ui/calendar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CreateAccount, Sex } from "@/lib/types";
import { createAccount } from "@/lib/actions/account.actions";

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
  const defaultDate = new Date();
  const [date, setDate] = useState<Date | undefined>(defaultDate);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sex: Sex.MALE,
      birth: defaultDate,
    },
  });

  const { handleSubmit, control, setValue, formState, watch, reset } = form; // Destructure all form methods
  // Watch for changes in birthdate and calculate age
  const birthDate = watch("birth");
  useEffect(() => {
    if (birthDate) {
      const calculatedAge = calculateAge(birthDate);
      setValue("age", calculatedAge, { shouldValidate: false }); // Don't trigger validation when setting age
    }
  }, [birthDate, setValue]);


  const onSubmit = async (values: FormValues) => {
    try {
      // Include registered_at during account creation
      const accountData: CreateAccount = {
        ...values,
        age: calculateAge(values.birth),
        registered_at: defaultDate,
      };

      await createAccount(accountData);
      console.log("Account created successfully!", accountData);
      reset(); // Reset the form

    } catch (error) {
      console.error("Error creating account:", error);
    }
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

          <Sheet>
            <SheetTrigger>
              <Button>Add Account</Button>
            </SheetTrigger>
            <SheetContent className="p-4">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <SheetHeader>
                    <SheetTitle className="text-xl">Create Account</SheetTitle>
                    <SheetDescription>
                      Provide all information needed below to create a new account.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
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

                  <SheetFooter>
                    <Button type="submit">Create Account</Button>
                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                  </SheetFooter>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}