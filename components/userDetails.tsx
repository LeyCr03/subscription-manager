import { PenIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function UserDetails (){
    return (
        <Sheet>
                    <SheetTrigger asChild>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-4">
                        <SheetHeader >
                            <SheetTitle>Account Details</SheetTitle>
                            <SheetDescription>
                                See all your profile information here and feel free to update it.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="flex flex-col">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-gray-800">Profile Image</p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <div className="flex flex-row items-center border-gray-200 shadow-sm pr-2 rounded-md">
                                    <Input id="name" defaultValue="User Name" className="border-none rounded-r-none shadow-none" />
                                    <PenIcon size={20} className="ml-2" />
                                </div>

                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <div className="flex flex-row items-center pr-2 border rounded-md border-gray-200 shadow-sm ">
                                    <Input id="email" defaultValue="Email" className="border-none rounded-r-none shadow-none" />
                                    <PenIcon size={20} className="ml-2" />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <div className="flex flex-row items-center  pr-2 border rounded-md border-gray-200 shadow-sm">
                                    <Input id="password" defaultValue="password" className="border-none rounded-r-none shadow-none" />
                                    <PenIcon size={20} className="ml-2"/>
                                </div>
                            </div>
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                            <Button >Delete Account</Button>
                            <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
    )
}