import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronDownIcon, PenIcon, Search } from "lucide-react"
import { useContext, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { CreateAccountForm } from "./forms/CreateAccountForm"
import { Drawer, DrawerTrigger } from "./ui/drawer"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import React from "react"
import { Calendar } from "./ui/calendar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

export const FilterBar = ({
  searchParam,
  setSearchParam,
}: {
  searchParam: string;
  setSearchParam: (searchParam: string) => void;
}) => {
  const [filterParam, setFilterParam] = useState("");
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const onSearch = (search: string) => {
    setSearchParam(search);
  }

  const onFilter = (filterParam: string) => {
    setFilterParam(filterParam);

  }

  return (
    <section className="py-4">
      <div className="flex items-center justify-between gap-6 text-2xl my-4">

        <div className="font-sans font-bold text-3xl">
          Subscribed Accounts
        </div>


        <div className="flex max-w-sm items-center gap-2">
          <div className="flex flex-row gap-2 rounded-md bg-white items-center border border-gray-100 shadow-sm pr-2">

            <Input onChange={(e) => onSearch(e.target.value)}
              value={searchParam}
              className="border-none shadow-none rounded-r-none"
              type="search"
              placeholder="Search..."
            />
            <Search color="black" width={20} height={20} />
          </div>
          <Sheet >
            <SheetTrigger>
              <Button>
                Add Account
              </Button>
            </SheetTrigger>
            <SheetContent className="p-4">
              <SheetHeader >
                <SheetTitle className="text-xl">Create Account</SheetTitle>
                <SheetDescription>
                  Provide all information needed below to create a new account.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="User Name" className="border-black" />

                </div>
                <div className="grid gap-3">
                  <Label htmlFor="date" className="px-1">
                    Date of birth
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full px-4 justify-between font-normal"
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
                  <Label className="px-1">Sex</Label>
                <Select>
                  <SelectTrigger className="w-full border-black px-4">
                    <SelectValue placeholder="Select a sex" />
                  </SelectTrigger>
                  <SelectContent className="border-black">
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              </div>
              
              <SheetFooter>
                <Button >Create Account</Button>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section >

  )
}

