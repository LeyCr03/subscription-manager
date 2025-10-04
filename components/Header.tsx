import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Eclipse, PenIcon, UserRound } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Input } from "./ui/input"
export default function Header() {
    return (
        <header className="flex py-5 items-center gap-2 border-b border-gray-200">
            <div className="mb-1 flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
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
                                <div className="flex flex-row items-center px-2 border rounded-md">
                                    <Input id="name" defaultValue="User Name" className="border-none  shadow-none" />
                                    <PenIcon size={20} />
                                </div>

                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <div className="flex flex-row items-center px-2 border rounded-md">
                                    <Input id="email" defaultValue="Email" className="border-none shadow-none" />
                                    <PenIcon size={20} />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <div className="flex flex-row items-center px-2 border rounded-md">
                                    <Input id="password" defaultValue="password" className="border-none shadow-none" />
                                    <PenIcon size={20} />
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
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-6"
                />
                <Label className="font-sans text-2xl">UserName</Label>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" asChild size="sm" className="hidden sm:flex">
                        <a
                            className="dark:text-foreground"
                        >
                            Logout
                        </a>
                    </Button>

                    <Switch id="mode" className="h-5" />
                    <Eclipse className="h-6 w-6" />

                </div>
            </div>
        </header>

    )

    {/* <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet> */}

}
