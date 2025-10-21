import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "../ui/calendar"
import React, { useEffect, useState } from "react"
import { ChevronDownIcon, CircleUserRoundIcon, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import z from "zod"
import { Sex } from "@/lib/types"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useMutation } from "@tanstack/react-query"
import { createAccount } from "@/lib/actions/account.actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

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

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

function SubmitButton({isPending}: {isPending: boolean}){
  return (
    <Button type="submit" className="disabled:bg-opacity-90" disabled={isPending}>
      {isPending && <Loader2 className="animate-spin" />}
      Create Account
    </Button>
  )
}


export function CreateAccountForm() {

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

  return (
    <AlertDialog onOpenChange={() => setOpen(!isOpen)} open={isOpen}>
      <AlertDialogTrigger className="bg-primary text-secondary px-4 py-2 text-sm rounded-md " >
        Add Account
      </AlertDialogTrigger>
      <AlertDialogOverlay>
        <AlertDialogContent className="p-6 space-y-4 border-none">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} >
              <AlertDialogHeader className="space-y-2 mb-5 items-center flex">
                <CircleUserRoundIcon size={70} />
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
                <SubmitButton isPending={isPending} />
                <AlertDialogCancel >
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}


