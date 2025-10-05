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
import { AccountType, GetAllResponseType } from "@/lib/types";
import { ActionMenu } from "./ActionsMenu";
import { getAccounts } from "@/lib/actions/account.actions";
import { accounts, tableHeaders } from "@/lib/constants";
import { FilterBar } from "./FilterBar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { DollarSign, Minus, Plus } from "lucide-react";
import { Calendar } from "./ui/calendar";


export const MainTable = () => {
  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stateData, setStateData] = useState<GetAllResponseType>();
  const [selectedAccount, setSelectedAccounts] = useState<AccountType[]>([]);
  const [promisePending, setPromisePending] = useState(true);
  const [entry, setEntry] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  useEffect(() => {
    const fetchData = async () => {
      setPromisePending(true); // Start loading
      try {
        const data = await getAccounts(currentPage, searchParam);
        setStateData(data);
        setSelectedAccounts(data.accounts);  // Update selected accounts from fetched data
      } catch (error) {
        console.error("Error fetching accounts:", error);
        // Handle error appropriately - display a message to the user
      } finally {
        setPromisePending(false); // End loading
      }
    };

   fetchData();
  }, [currentPage, searchParam]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (promisePending) {
    return <div>Loading...</div>;
  }

  if (!stateData) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const totalPages = Math.ceil(stateData.total / stateData.pageSize); // calculate total pages


  return (
    <section>
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
              <TableRow className="border-gray-100" key={account.fullName + idx}>
                <TableCell>
                  <Drawer >
                    <DrawerTrigger>
                      <Checkbox />
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">Register Entry</DrawerTitle>
                          <DrawerDescription className="text-md">Set an entry for user <span className="font-bold">{account.fullName}</span></DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                          <div className="flex items-center justify-center">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) =>
                                date > new Date()
                              }
                              className="rounded-md border shadow-sm "
                              captionLayout="dropdown"
                            />
                          </div>
                        </div>
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
                <TableCell className="font-medium">{account.fullName}</TableCell>
                <TableCell className="p-5">
                  <Badge
                    variant="outline"
                    className={cn(
                      account.status === "Active" ? "bg-green-300 border-green-300" : "bg-red-300 border-red-300"
                    )}
                  >
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>{account.last_payment.toLocaleDateString()}</TableCell>
                <TableCell>{account.last_entry.toLocaleDateString()}</TableCell>
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
                          <DrawerDescription className="text-md">Set payment date for <span className="font-bold">{account.fullName}</span></DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                          <div className="flex items-center justify-center">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) =>
                                date > new Date()
                              }
                              className="rounded-md border shadow-sm "
                              captionLayout="dropdown"
                            />
                          </div>
                        </div>
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
                  {/* Render Pagination Items */}
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
    </section>

  )
}
