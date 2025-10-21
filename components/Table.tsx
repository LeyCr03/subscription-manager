'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import React, { useEffect, useState } from "react"
import { AccountType, Status } from "@/lib/types";
import { ActionMenu } from "./ActionsMenu";
import { tableHeaders } from "@/lib/constants";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Badge } from "./ui/badge";
import { useGetAccounts } from "@/lib/hooks/useGetAccounts";
import CreatePayment from "./dialogs/CreatePaymentDialog";
import CreateEntry from "./dialogs/CreateEntryDialog";
import LastPayment from "./lastPayment";
import LastEntry from "./lastEntry";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { CreateAccountForm } from "./forms/CreateAccountForm";
import { useSearchAccounts } from "@/lib/hooks/useSearchAccounts";


export const MainTable = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Fixed page size
  const [searchParam, setSearchParam] = useState('');

  // Use different hooks based on whether there is a search term
  const { data: allAccountsData, isLoading: isLoadingAll, refetch: refetchAll } = useGetAccounts({
    currentPage: currentPage,
    pageSize: pageSize,
  });

  const { data: searchedAccountsData, isLoading: isLoadingSearch, refetch: refetchSearch } = useSearchAccounts({
    currentPage: currentPage,
    pageSize: pageSize,
    search: searchParam,
  });

  const isLoading = searchParam ? isLoadingSearch : isLoadingAll; // Determine loading state
  const data = searchParam ? searchedAccountsData : allAccountsData; // Determine which data to use
  const refetch = searchParam ? refetchSearch : refetchAll;  //Determine what data to refetch

  // Effects to refetch data when dependencies change
  useEffect(() => {
    refetch();
  }, [currentPage, searchParam, refetch]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const onSearch = (search: string) => {
    setCurrentPage(1); // Reset to the first page when searching
    setSearchParam(search);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Server failed. try later</div>;
  }

  const totalAccounts = data?.total || 0;
  const totalPages = Math.ceil(totalAccounts / pageSize);
  const selectedAccount: AccountType[] = data?.accounts; // Properly type this variable


  return (
    <div>
      <section className="py-4">
        <div className="flex items-center justify-between gap-6 text-2xl my-4">
          <div className="font-sans font-bold text-3xl">
            Subscribed Accounts
          </div>
          <div className="flex max-w-sm items-center gap-2">
            <div className="flex flex-row gap-2 rounded-md  items-center border border-none shadow-sm pr-2">
              <Input
                onChange={(e) => onSearch(e.target.value)}
                value={searchParam}
                className="border-none shadow-none rounded-r-none"
                type="search"
                placeholder="Search..."
              />
              <Search width={20} height={20} />
            </div>

            <CreateAccountForm />

          </div>
        </div>
      </section>
      <div className="p-4 border border-none rounded-md shadow-sm">
        <Table className="p-5">
          <TableHeader>
            <TableRow className="border-secondary">
              {tableHeaders.map(({ key, label, className }) => (
                <TableHead key={key} className={className}>
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedAccount.map((account, idx) => (
              <TableRow className="border-secondary" key={account.name + idx}>
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
                  <LastPayment accountId={account.id} />
                </TableCell>
                <TableCell>
                  <LastEntry accountId={account.id} />
                </TableCell>
                <TableCell className="flex justify-end  h-20 items-center pr-5">
                  <ActionMenu account={account} />
                  <CreatePayment accountId={account.id} name={account.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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


      </div>
    </div >

  )
}

