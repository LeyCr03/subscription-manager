
import * as React from "react"
import { ChevronDownIcon, EllipsisVertical, PenIcon, UserCircle2 } from "lucide-react"
import { AccountType, Status } from "@/lib/types";
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

export function ActionMenu({ account }: { account: AccountType }) {

    const accountId = account.id;
    const { data } = useGetFrequency({ accountId });


    const clickOnEdit = () => {
    };

    const clickOnDelete = () => {
    };

    // get last entry 
    //get days since last payment
    //get account entries since last payment
    // update account name
    //delete account


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
                        <div className="flex flex-row items-center pr-2 border-none bg-secondary shadow-sm rounded-md">
                            <Input id="name" defaultValue={account.name} className="border-none rounded-r-none mr-2 shadow-none" />
                            <PenIcon size={20} />
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
                                        {account.registered_at.toString().substring(0, 10)}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                    <Calendar
                                        mode="single"
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
                            <SuspensionStatus accountId={accountId}/>
                        </div>

                    </div>

                </div>

                <AlertDialogFooter className="px-4 py-3">
                    <Button type="submit">Save changes</Button>
                    <AlertDialog>
                        <AlertDialogTrigger className="bg-primary text-secondary text-sm px-4 py-2 rounded-md">
                            Delete Account
                        </AlertDialogTrigger>
                        <AlertDialogContent className="grid-col gap-2">
                            <AlertDialogHeader className="text-2xl font-sans text-bold text-destructive">
                                Delete Account
                            </AlertDialogHeader>
                            <AlertDialogTitle className="fornt-sans ">
                                <span className="text-primary opacity-60"> Account:</span> {account.name}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this account? This action is irreversible.
                            </AlertDialogDescription>
                            <AlertDialogFooter className="pt-4">
                                <AlertDialogAction>
                                    Delete
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
