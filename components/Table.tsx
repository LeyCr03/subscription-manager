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

import React, { useContext, useEffect, useState } from "react"
import { AccountType, Status } from "@/lib/types";
import { ActionMenu } from "./ActionsMenu";
import { accounts, tableHeaders } from "@/lib/constants";
import { SearchBar } from "./FilterBar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Badge } from "./ui/badge";
import { useGetAccounts } from "@/lib/hooks/useGetAccounts";
import CreatePayment from "./dialogs/CreatePaymentDialog";
import CreateEntry from "./dialogs/CreateEntryDialog";
import LastPayment from "./lastPayment";


export const MainTable = () => {

  //!get last entry
  //!get last payment

  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entry, setEntry] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const pageSize = 10;
  const currentDate = new Date();
  const { data, isLoading, refetch } = useGetAccounts({ currentPage, pageSize });
  
  useEffect(() => {
    refetch()
  }, [searchParam])
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Server failed. try later</div>
  }

  const totalAccounts = data?.total || 0;
  const totalPages = Math.ceil(totalAccounts / pageSize);
  const selectedAccount: AccountType[] = data?.accounts;


  return (
    <div>
      <SearchBar searchParam={searchParam} setSearchParam={setSearchParam} />
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
                <TableCell className="flex justify-start">
                  <CreateEntry accountId={account.id} name={account.name} />
                </TableCell>
                <TableCell className="pl-6 font-sans text-lg font-md">{account.name}</TableCell>
                <TableCell className="p-5">
                  <Badge
                    variant={account.status === Status.ACTIVE ? 'success' : 'destructive'}>

                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <LastPayment accountId={account.id}/>
                </TableCell>
                <TableCell>{account.registered_at.toString().substring(0,10)}</TableCell>
                <TableCell className="flex justify-end  h-20 items-center pr-5">
                  <ActionMenu account={account} />
                  <CreatePayment accountId={account.id} name={account.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-white" >
            <Pagination className="p-3 mt-3">
              <PaginationContent>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                //disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                // disabled={currentPage === totalPages}
                />
              </PaginationContent>
            </Pagination>
            {isLoading && <div>Updating...</div>} {/*Show loading state when fetching the page*/}

          </TableFooter>
        </Table>
      </div>
    </div >

  )
}
