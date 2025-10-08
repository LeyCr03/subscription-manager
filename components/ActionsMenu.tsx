
import * as React from "react"
import { ChevronDownIcon, EllipsisVertical, PenIcon } from "lucide-react"
import { AccountType, Status } from "@/lib/types";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "./ui/alert-dialog";
import { AlertDialogHeader } from "./ui/alert-dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function ActionMenu({ account }: { account: AccountType }) {

    const clickOnEdit = () => {
    };

    const clickOnDelete = () => {
    };

    // get last entry
    //get frequency
    //get revenue
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
                    <AlertDialogTitle className="text-2xl">Account Details</AlertDialogTitle>
                    <AlertDialogDescription>
                        See all your profile information here and feel free to update it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4 py-2">
                    <div className="flex justify-center gap-4">
                        <Badge
                            variant={account.status === Status.ACTIVE ? 'success' : 'destructive'}
                        >
                            {account.status}</Badge>
                        <Badge
                            variant={'secondary'}
                        >Frequency</Badge>
                        <Badge variant={account.status === Status.ACTIVE ? 'success' : 'destructive'}>

                            Revenue</Badge>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <div className="flex flex-row items-center pr-2 border rounded-md">
                            <Input id="name" defaultValue={account.name} className="border-none rounded-r-none mr-2 shadow-none" />
                            <PenIcon size={20} />
                        </div>

                    </div>

                    <div className="flex-1 flex-row flex gap-4">
                        <div className="grid gap-3 flex-1">
                            <Label htmlFor="date" className="px-1">
                                Birth Date
                            </Label>
                            <Label className="w-full h-10 border rounded-md px-2 text-gray-800">{account.birth.toString().substring(0, 10)}</Label>
                        </div><div className="grid gap-3 w-20">
                            <Label className="px-1">Age</Label>
                            <Label className="w-full h-10 border rounded-md px-2 text-gray-800">{account.age}</Label>
                        </div>

                    </div>
                    <div className="flex-1 flex-row flex gap-4">
                        <div className="grid gap-3 flex-1">
                            <Label htmlFor="date" className="px-1">
                                Registration Date
                            </Label>
                            <Label className="w-full h-10 border rounded-md px-2 text-gray-800">{account.registered_at.toString().substring(0, 10)}</Label>
                        </div>

                        <div className="grid gap-3 w-20">
                            <Label className="px-1">Sex</Label>
                            <Label className="w-full h-10 border rounded-md px-2 text-gray-800">{account.sex}</Label>
                        </div>


                    </div>
                    <div className="grid gap-3">

                        <Label htmlFor="entries" className="px-1">
                            Entries & Payments
                        </Label>
                        <Popover >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full px-4 justify-between font-normal"
                                >
                                    {account.registered_at.toString().substring(0,10)}
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
                </div>

                <AlertDialogFooter className="px-4 py-3">
                    <Button type="submit">Save changes</Button>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button className="w-full">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader className="text-2xl">
                                Delete Account
                            </AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to delete this account? this action is irreversible.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                ID: {account.id} {account.name}

                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogAction>
                                    Delete
                                </AlertDialogAction>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialogCancel asChild>
                        <Button variant="outline">Close</Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>


            </AlertDialogContent>
        </AlertDialog>
    )
}
