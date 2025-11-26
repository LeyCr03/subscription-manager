"use client"
import { PenIcon, UserCheck2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useRef, useState } from "react";
import { UserType } from "@/lib/types";


export default function UserDetails({ user }: { user: UserType }) {
//TODO: setup uploadThing
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false)

    const nameRef = useRef<HTMLInputElement>(null);


    const handleNameClick = () => {
        setEditName(!editName);
    };

    const handleEmailClick = () => {
        setEditEmail(!editEmail);
    }
    const handlePasswordClick = () => {
        setEditPassword(!editPassword);
    }

    const handleSave = () => {

        setEditName(false);
        setEditEmail(false);
        setEditPassword(false);
    };

    const handleDeleteUser = () => {

    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-full text-muted-foreground">
                <p>No user data available. Please log in.</p>
            </div>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Avatar>
                    <AvatarImage src={user.image || "https://github.com/shadcn.png"} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "CN"}</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 border-none">
                <SheetHeader className="items-center">
                    <SheetTitle className="text-2xl"><div className="flex flex-row gap-3"><UserCheck2 size={30} /> Account Details</div></SheetTitle>
                    <SheetDescription className="text-center">
                        See all your profile information here and feel free to update it.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="flex flex-col items-center">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={user.image || "https://github.com/shadcn.png"} alt={user.name} />
                            <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "CN"}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">Profile Image</p>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <div className="flex flex-row items-center border-none shadow-md pr-2 rounded-md">
                            <Input
                                id="name"
                                defaultValue={user.name}
                                disabled={!editName}
                                className="border-none rounded-r-none shadow-none"
                                ref={nameRef}
                            />
                            <PenIcon size={20} className="ml-2" onClick={handleNameClick} style={{ cursor: 'pointer' }} />

                        </div>

                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex flex-row items-center pr-2 border-none rounded-md shadow-md ">
                            <Input
                                id="email"
                                defaultValue={user.email}
                                disabled={!editEmail}
                                className="border-none rounded-r-none shadow-none"
                            />
                            <PenIcon size={20} className="ml-2" onClick={handleEmailClick} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <div className="flex flex-row items-center  pr-2 border-none rounded-md  shadow-md">
                            <Input
                                id="password"
                                defaultValue="*******"
                                disabled={!editPassword}
                                className="border-none rounded-r-none shadow-none"
                            />
                            <PenIcon size={20} className="ml-2" onClick={handlePasswordClick} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                    <Button >Delete Account</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    )
}