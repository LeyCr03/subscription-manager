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
import { Pagination } from "./ui/pagination";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { DollarSign, Minus, Plus } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar } from "recharts";
import { Calendar } from "./ui/calendar";


export const MainTable = () => {
  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stateData, setStateData] = useState<GetAllResponseType>();
  const [selectedAccount, setSelectedAccounts] = useState<AccountType[]>(accounts);
  const [promisePending, setPromisePending] = useState(true);
  const [entry, setEntry] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())


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
                            <Button variant="outline">Cancel</Button>
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
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="border-none">
            <Pagination
            />

          </TableFooter>
        </Table>
      </div>
    </section>

  )
}
