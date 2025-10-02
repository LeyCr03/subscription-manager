import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "../ui/calendar"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"


export function CreateAccountForm({
    className,
    ...props
}: React.ComponentProps<"form">) {

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-muted-foreground text-sm text-balance">
                Enter requested data to create account
            </p>
        </div>
        <div className="grid gap-6">
            <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="name" placeholder="John Doe" required />
            </div>
            <Label htmlFor="date" className="px-1">
                Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
        <div className="grid gap-3">
            <Label htmlFor="sex">Sex</Label>
            <RadioGroup>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="female" id="r1" />
                    <Label htmlFor="r1">Female</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="male" id="r2" />
                    <Label htmlFor="r2">Male</Label>
                </div>
            </RadioGroup>
        </div>

        <Button type="submit" className="w-full">
            Create
        </Button>
       
        </form >
    )
}
