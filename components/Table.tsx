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


export const  MainTable = () => {
  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stateData, setStateData] = useState<GetAllResponseType>();
  const [selectedAccount, setSelectedAccounts] = useState<AccountType[]>(accounts);
  const [promisePending, setPromisePending] = useState(true);

  return (
    <section>
      <FilterBar searchParam={searchParam} setSearchParam={setSearchParam} />
      <div className="p-4 border border-gray-100 rounded-md shadow-sm">
        <Table className="p-5">
        <TableHeader>
          <TableRow  className="border-gray-300">
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
              <TableCell><Checkbox /></TableCell>
              <TableCell className="font-medium">{account.fullName}</TableCell>
              <TableCell className="p-5">
                <Badge>
                  {account.status}
                </Badge>
              </TableCell>
              <TableCell>{account.last_payment.toLocaleDateString()}</TableCell>
              <TableCell>{account.last_entry.toLocaleDateString()}</TableCell>
              <TableCell className="justify-end">
                <ActionMenu account={account} />
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
