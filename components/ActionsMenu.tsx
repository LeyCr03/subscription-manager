
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, EllipsisVertical, PenIcon } from "lucide-react"
import { AccountType } from "@/lib/types";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "./ui/alert-dialog";
import { AlertDialogHeader } from "./ui/alert-dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ActionMenu({ account }: { account: AccountType }) {

    const clickOnEdit = () => {
    };

    const clickOnDelete = () => {
    };


    return (
        <Sheet>
            <SheetTrigger asChild>
                <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className="p-4">
                <SheetHeader >
                    <SheetTitle className="text-2xl">Account Details</SheetTitle>
                    <SheetDescription>
                        See all your profile information here and feel free to update it.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <div className="flex flex-row items-center pr-2 border rounded-md">
                            <Input id="name" defaultValue={account.fullName} className="border-none mr-2 shadow-none" />
                            <PenIcon size={20} />
                        </div>

                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="date" className="px-1">
                            Date of birth
                        </Label>
                        <Label className="w-full h-10 border rounded-md px-2 text-gray-800">{account.birth.toDateString()}</Label>
                    </div>
                    <div className="grid gap-3">
                        <Label className="px-1">Sex</Label>
                        <Label className="w-full h-10 border rounded-md px-2 text-gray-800">{account.sex}</Label>
                    </div>
                    <div className="grid gap-3"> <Label className="px-1">Status</Label>
                        <Select>
                            <SelectTrigger className="w-full border-black px-4">
                                <SelectValue placeholder={account.status} />
                            </SelectTrigger>
                            <SelectContent className="border-black">
                                <SelectGroup>
                                    <SelectItem value="active">ACTIVE</SelectItem>
                                    <SelectItem value="suspended">SUSPENDED</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select></div>


                </div>
                <SheetFooter>
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
                                ID: {account._id} {account.fullName}

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

                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>


            </SheetContent>
        </Sheet>
    )
}
