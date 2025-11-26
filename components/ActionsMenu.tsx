
import * as React from "react"
import { ChevronDownIcon, CircleUserRoundIcon, EllipsisVertical, PenIcon, UserCircle2, UserPenIcon } from "lucide-react"
import { AccountType, Status, UserId } from "@/lib/types";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "./ui/alert-dialog";
import { AlertDialogHeader } from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { useGetFrequency } from "@/lib/hooks/useGetFrequency";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Revenue from "./revenue";
import SuspensionStatus from "./suspension.status";
import LastPayment from "./lastPayment";
import { suspend, update } from "@/lib/actions/account.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
});

type FormValues = z.infer<typeof formSchema>;



export function ActionMenu({ account }: { account: AccountType }) {
    const accountId = account.id;
    const queryClient = useQueryClient();
    const { data } = useGetFrequency({ accountId });
    //const { mutate: updateAccount } = useMutation({ mutationFn: update, mutationKey: ['update-key'] });
    const { mutate: updateAccount, isPending } = useMutation({
    mutationFn: update, 
    mutationKey: ['update-account'], 
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['account', accountId] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });

      console.log("Account updated successfully, cache invalidated.");
      reset({ name: variables.name });
    },
    onError: (error) => {
      console.error("Failed to update account", error);
    },
  });

    const { mutate: suspendAccount } = useMutation({ mutationFn: suspend, mutationKey: ['suspend-key'] });

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: account.name,
        },
    });

    const { handleSubmit, control, formState, reset } = form;

    /*const clickOnEdit = async (data: FormValues) => {
        try {
            updateAccount({
                ...data,
                id: accountId,
            });
            console.log("Account updated successfully");
            reset({ name: data.name });
        } catch (error) {
            // Handle error
            console.error("Failed to update account", error);
        }
    };*/

     const clickOnEdit = async (formData: FormValues) => {
    // Call the mutate function from useMutation
    updateAccount({
      ...formData,
      id: accountId,
    });
  };

    const clickOnSuspend = async () => {
        try {
            suspendAccount({ id: accountId });
            console.log("Account suspended successfully");
        } catch (error) {
            // Handle error
            console.error("Failed to suspend account", error);
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <EllipsisVertical />
            </AlertDialogTrigger>
            <AlertDialogContent className="p-4">

                <AlertDialogHeader className="items-center">
                    <UserCircle2 size={60} />
                    <AlertDialogTitle className="text-2xl">Account Details</AlertDialogTitle>
                    <AlertDialogDescription>
                        See all your profile information here and feel free to update it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4 py-2">
                    <div className="flex justify-center gap-4">
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge
                                    variant={account.status === Status.ACTIVE ? 'success' : 'destructive'}
                                >
                                    {account.status}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Status</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge
                                    variant={data > 24 ? 'success' : 'destructive'}
                                >{data}/30</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Frequency</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Revenue accountId={account.id} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Revenue</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <div className="flex flex-row items-center pr-2 border-none rounded-md">
                            <Label className="w-full h-10 border-none bg-secondary shadow-sm rounded-md px-2 mr-3">{account.name}</Label>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <PenIcon size={20} />
                                </AlertDialogTrigger>
                                <AlertDialogContent className="p-4">
                                    <Form {...form}>
                                        <form onSubmit={handleSubmit(clickOnEdit)} >
                                            <AlertDialogHeader className="items-center">
                                                <UserPenIcon size={40} />
                                                <AlertDialogTitle className="text-2xl items-center">Update your account name?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Save the new changes before leaving.
                                                </AlertDialogDescription>

                                            </AlertDialogHeader>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="mx-3">New Name</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Set New Name"
                                                                    className="border-secondary"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <p className="text-red-500 text-sm">{formState.errors.name?.message}</p>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <AlertDialogFooter className="py-6">
                                                <AlertDialogAction type="submit">Save Changes</AlertDialogAction>
                                                <AlertDialogCancel >
                                                    Cancel
                                                </AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </form>
                                    </Form>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>

                    </div>

                    <div className="flex-1 flex-row flex gap-4">
                        <div className="grid gap-3 flex-1">
                            <Label htmlFor="date" className="px-1">
                                Birth Date
                            </Label>
                            <Label className="w-full h-10 border-none bg-secondary shadow-sm rounded-md px-2 ">{account.birth.toString().substring(0, 10)}</Label>
                        </div><div className="grid gap-3 w-20">
                            <Label className="px-1">Age</Label>
                            <Label className="w-full h-10 border-none bg-secondary shadow-sm rounded-md px-2 ">{account.age}</Label>
                        </div>

                    </div>
                    <div className="flex-1 flex-row flex gap-4">
                        <div className="grid gap-3 flex-1">
                            <Label htmlFor="date" className="px-1">
                                Registration Date
                            </Label>
                            <Label className="w-full h-10 border-none bg-secondary shadow-sm rounded-md px-2 ">{account.registered_at.toString().substring(0, 10)}</Label>
                        </div>

                        <div className="grid gap-3 w-20">
                            <Label className="px-1">Sex</Label>
                            <Label className="w-full h-10 border-none bg-secondary shadow-sm rounded-md px-2 ">{account.sex}</Label>
                        </div>


                    </div>
                    <div className="flex-1 flex-row flex gap-4">
                        <div className="grid gap-3 flex-1">

                            <Label htmlFor="entries" className="px-1">
                                Entries & Payment
                            </Label>
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-full px-4 justify-between font-normal"
                                    >
                                        <LastPayment accountId={accountId} />
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                    <Calendar
                                        mode='single'
                                        selected={account.registered_at}
                                        captionLayout="dropdown"
                                        onSelect={() => { }}
                                        disabled={(date) =>
                                            date > new Date()
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-3 w-20">
                            <Label className="px-1">Pay Days</Label>
                            <SuspensionStatus accountId={accountId} />
                        </div>

                    </div>

                </div>

                <AlertDialogFooter className="px-4 py-3">
                    <AlertDialog>
                        <AlertDialogTrigger className="bg-primary text-secondary text-sm px-4 py-2 rounded-md">
                            Suspend Account
                        </AlertDialogTrigger>
                        <AlertDialogContent className="grid-col gap-2">
                            <AlertDialogHeader className="text-2xl font-sans text-bold text-destructive">
                                Suspend Account
                            </AlertDialogHeader>
                            <AlertDialogTitle className="fornt-sans ">
                                <span className="text-primary opacity-60"> Account:</span> {account.name}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to suspend this account? This action is irreversible.
                            </AlertDialogDescription>
                            <AlertDialogFooter className="pt-4">
                                <AlertDialogAction onClick={clickOnSuspend}>
                                    Suspend
                                </AlertDialogAction>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialogCancel >
                        Close
                    </AlertDialogCancel>
                </AlertDialogFooter>


            </AlertDialogContent>
        </AlertDialog>
    )
}


