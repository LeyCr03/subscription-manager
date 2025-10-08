'use client';
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import React from "react"
import { CreateAccountForm } from "./forms/CreateAccountForm";

interface FilterBarProps {
  searchParam: string;
  setSearchParam: (searchParam: string) => void;
}


export const SearchBar: React.FC<FilterBarProps> = ({ searchParam, setSearchParam }) => {
  // TODO: search accounts 

  const onSearch = (search: string) => {
    setSearchParam(search);
  }



  return (
    <section className="py-4">
      <div className="flex items-center justify-between gap-6 text-2xl my-4">
        <div className="font-sans font-bold text-3xl">
          Subscribed Accounts
        </div>
        <div className="flex max-w-sm items-center gap-2">
          <div className="flex flex-row gap-2 rounded-md bg-white items-center border border-gray-100 shadow-sm pr-2">
            <Input
              onChange={(e) => onSearch(e.target.value)}
              value={searchParam}
              className="border-none shadow-none rounded-r-none"
              type="search"
              placeholder="Search..."
            />
            <Search color="black" width={20} height={20} />
          </div>

         <CreateAccountForm/>
          
        </div>
      </div>
    </section>
  );
}

