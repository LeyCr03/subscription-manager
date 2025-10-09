"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import z from "zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserAccount } from "@/lib/actions/auth.actions"
import { Loader2, UserCircle2Icon } from "lucide-react"

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number",
    }),
});

type FormValues = z.infer<typeof formSchema>;  // Define the form values type

export function RegisterForm() {

  const { mutate, isPending, isError, isSuccess } = useMutation({ mutationFn: createUserAccount });
  const [isOpen, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control, setValue, formState, watch, reset } = form;



  const onSubmit = async (values: FormValues) => {
    mutate({
      ...values
    }, {
      onSuccess: (data) => {
        console.log(data)
        setOpen(false)
      },
      onError: (error) => {
        //toast("Failed", {type: 'error'})
      }
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center my-5">
          <UserCircle2Icon size={60} />
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter requested data to create your account
          </p>
        </div>
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
                    className="border-gray-300 shadow-sm"
                    {...field}
                  />
                </FormControl>
                <p className="text-red-500 text-sm">{formState.errors.name?.message}</p>
              </FormItem>
            )}
          />
          <div className="grid gap-3">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@email.com"
                      className="border-gray-300 shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-red-500 text-sm">{formState.errors.email?.message}</p>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Save*Pa5sword"
                      className="border-gray-300 shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-red-500 text-sm">{formState.errors.password?.message}</p>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full my-5" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Register
          </Button>
        </div>
      </form>
    </Form>

  )
}

