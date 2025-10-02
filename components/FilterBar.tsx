import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, Search } from "lucide-react"
import { useContext, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { CreateAccountForm } from "./forms/CreateAccountForm"

export const FilterBar = ({
  searchParam,
  setSearchParam,
}: {
  searchParam: string;
  setSearchParam: (searchParam: string) => void;
}) => {
  const [filterParam, setFilterParam] = useState("");

  const onSearch = (search: string) => {
    setSearchParam(search);
  }

  const onFilter = (filterParam: string) => {
    setFilterParam(filterParam);
  }

  return (
    <section className="py-4">
      <div className="flex items-center justify-between gap-6 text-2xl my-4">
        <div className="flex h-8 items-center text-2xl space-x-3 ">
          <div>Last Payment</div>
          <ChevronDown onClick={() => onFilter("last payment")} />
          <Separator orientation="vertical" />
          <div>Status</div>
          <ChevronDown onClick={() => onFilter("status")} />
          <Separator orientation="vertical" />
          <div>Sex</div>
          <ChevronDown onClick={() => onFilter("sex")} />
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
          <Dialog>
            <DialogTrigger>
              <Button>
                Add Account
              </Button>
            </DialogTrigger>
          <DialogContent>
            <CreateAccountForm />
          </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>

  )
}

