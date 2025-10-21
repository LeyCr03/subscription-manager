import { PenIcon, UserCheck2 } from "lucide-react";
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
                    <SheetContent side="left" className="p-4 border-none">
                        <SheetHeader className="items-center">
                            <SheetTitle className="text-2xl"><div className="flex flex-row gap-3"><UserCheck2 size={30}/> Account Details</div></SheetTitle>
                            <SheetDescription className="text-center">
                                See all your profile information here and feel free to update it.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="flex flex-col items-center">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="text-sm">Profile Image</p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <div className="flex flex-row items-center border-none shadow-md pr-2 rounded-md">
                                    <Input id="name" defaultValue="User Name" className="border-none rounded-r-none shadow-none" />
                                    <PenIcon size={20} className="ml-2" />
                                </div>

                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <div className="flex flex-row items-center pr-2 border-none rounded-md shadow-md ">
                                    <Input id="email" defaultValue="email@example.com" className="border-none rounded-r-none shadow-none" />
                                    <PenIcon size={20} className="ml-2" />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <div className="flex flex-row items-center  pr-2 border-none rounded-md  shadow-md">
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