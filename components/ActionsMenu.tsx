
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { AccountType } from "@/lib/types";

export function ActionMenu({ account }: { account: AccountType }) {

    const clickOnEdit = () => {
    };

    const clickOnDelete = () => {
    };

    const clickOnDetails = () => {
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clickOnDetails}>Details</DropdownMenuItem>
                <DropdownMenuItem onClick={clickOnEdit}>Edit Status</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clickOnDelete} className="text-red-700">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
