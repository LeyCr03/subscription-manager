"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { logIn } from "@/lib/actions/auth.actions"
import Link from "next/link"


const formSchema = z.object({
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


export function LoginForm() {

  const { mutate, isPending, isError, isSuccess } = useMutation({ mutationFn: logIn });
  const [isOpen, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
        <div className="flex flex-col items-center gap-2 text-center">
          <ShieldCheck size={60} />
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6 my-6">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" legacyBehavior>
            <a className="underline underline-offset-4">
              Sign up
            </a>
          </Link>
        </div>
      </form>
    </Form>
  )
}
