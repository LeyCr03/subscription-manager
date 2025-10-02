import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Eclipse, UserRound } from "lucide-react"
import { Switch } from "./ui/switch"
export default function Header() {
    return (
        <header className="flex py-5 items-center gap-2 border-b border-gray-200">
            <div className="mb-1 flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                < UserRound className="!size-7" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-6"
                />
                <h1 className="font-sans text-2xl">UserName</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                        <a
                            className="dark:text-foreground"
                        >
                            Logout
                        </a>
                    </Button>

                    <Switch id="mode" className="h-5"/>
                    <Eclipse className="h-6 w-6"/>

                </div>
            </div>
        </header>

    )
    {/*
        IMPLEMENT LOGOUT LOGIC
        IMPLEMENT PROFILE IMAGE FOR USER
        --ONCLICK SEE PROFILE AND ACTIONS
        */}
}
