'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Checkbox } from "./ui/checkbox"
import React, { useContext, useEffect, useState } from "react"
import { AccountType, GetAllResponseType, Status } from "@/lib/types";
import { ActionMenu } from "./ActionsMenu";
import { getAccounts } from "@/lib/actions/account.actions";
import { accounts, tableHeaders } from "@/lib/constants";
import { FilterBar } from "./FilterBar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { DollarSign } from "lucide-react";
import { Label } from "./ui/label";
import { useGetAccounts } from "@/lib/hooks/useGetAccounts";


export const MainTable = () => {

  //get account
  //get last entry
  //get last payment
  //create entry
  //create payment


  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entry, setEntry] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const { data, isLoading, refetch } = useGetAccounts();

  console.log({ data, isLoading })

  useEffect(() => {
    refetch()
  }, [searchParam])

  const currentDate = new Date();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!data){
    return <div>Server failed. try later</div>
  }

  const totalPages = Math.ceil((data? data.total: 1) / 3); // calculate total pages
  const selectedAccount: AccountType[] = data?.accounts;
  return (
     <div>
       <FilterBar searchParam={searchParam} setSearchParam={setSearchParam} />
      <div className="p-4 border border-gray-100 rounded-md shadow-sm">
        <Table className="p-5">
          <TableHeader>
            <TableRow className="border-gray-300">
              {tableHeaders.map(({ key, label, className }) => (
                <TableHead key={key} className={className}>
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedAccount.map((account, idx) => (
              <TableRow className="border-gray-100" key={account.name + idx}>
                <TableCell>
                  <Drawer >
                    <DrawerTrigger>
                      <Checkbox />
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">Register Entry</DrawerTitle>
                          <DrawerDescription className="text-md">Set an entry for user <span className="font-bold">{account.name}</span></DrawerDescription>
                        </DrawerHeader>
                        <Label className="flex justify-center">{currentDate.toLocaleDateString()}</Label>
                        <DrawerFooter>
                          <Button>Submit</Button>
                          <DrawerClose asChild>
                            Cancel
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </TableCell>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell className="p-5">
                  <Badge
                    variant="outline"
                    className={cn(
                      account.status === Status.ACTIVE ? "bg-green-300 border-green-300" : "bg-red-300 border-red-300"
                    )}
                  >
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>{account.registered_at.toString()}</TableCell>
                <TableCell>{account.registered_at.toString()}</TableCell>
                <TableCell className="flex justify-end  h-20 items-center pr-5">
                  <ActionMenu account={account} />
                  <Drawer >
                    <DrawerTrigger>
                      <DollarSign />
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">Register Payment</DrawerTitle>
                          <DrawerDescription className="text-md">Set payment date for <span className="font-bold">{account.name}</span></DrawerDescription>
                        </DrawerHeader>
                        <Label className="text-center">{currentDate.toISOString()}</Label>
                        <DrawerFooter>
                          <Button>Submit</Button>
                          <DrawerClose asChild>
                            Cancel
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter >
            <Pagination>
              <PaginationContent >
                <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationContent>
            </Pagination>

          </TableFooter>
        </Table>
      </div>
     </div>

  )
}
