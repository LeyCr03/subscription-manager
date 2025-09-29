import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserRound } from "lucide-react"
export default function Header() {
    return (

        
        <header className="flex h-(--header-height) items-center gap-2 border-b">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                < UserRound className="!size-5" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">UserName</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                        <a
                            className="dark:text-foreground"
                        >
                            Logout
                        </a>
                    </Button>
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
