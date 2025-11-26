"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { SectionCards } from "./SectionCards";

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

import React from "react";
import { Notifications } from "./Notifications";
import { EntryChart } from "./entryChart";
import { RevenueChart } from "./revenueChart";
import { NewAccountsChart } from "./newAccountsChart";
import { AgePieChart } from "./agePieChart";
import { SexPieChart } from "./sexPieChart";

//  TODO: GET charts
//get notifications

export function Metrics() {

  return (
    <main>

      <SectionCards />
      <section className="flex h-auto gap-6 mb-8">

        <Card className="w-full border-none shadow-none">
          <Tabs defaultValue="entries" className="px-16 w-full bg-transparent">
            <TabsList className="bg-transparent">
              <TabsTrigger value="entries" className="text-xl font-sans p-5 data-[state=active]:shadow-none data-[state=active]:font-semibold font-thin">Entries</TabsTrigger>
              <TabsTrigger value="new-accounts" className="text-xl font-sans p-5 data-[state=active]:shadow-none  data-[state=active]:font-semibold font-thin">New Accounts</TabsTrigger>
              <TabsTrigger value="income" className="text-xl font-sans p-5 data-[state=active]:shadow-none  data-[state=active]:font-semibold font-thin">Income</TabsTrigger>
              <TabsTrigger value="age&sex" className="text-xl font-sans p-5 data-[state=active]:shadow-none  data-[state=active]:font-semibold font-thin">Age & Sex</TabsTrigger>

            </TabsList>
            <TabsContent value="entries" className="rounded-md">

              <EntryChart />

            </TabsContent>
            <TabsContent value="new-accounts">
             <NewAccountsChart/>
            </TabsContent>
            <TabsContent value="income">

              <RevenueChart />

            </TabsContent>
            <TabsContent value="age&sex">
              <div className="flex w-full gap-3">
                <AgePieChart/>
                <SexPieChart/>
              </div>

            </TabsContent>
            <TabsContent value='sex'>

            </TabsContent>
          </Tabs>
        </Card>
        <Card className="w-full max-w-md h-full max-h-[60vh] border-none shadow-none">
          <CardTitle className="text-center text-2xl font-sans"> Notification Alerts</CardTitle>
          <CardContent className="overflow-auto py-5">
            <Notifications />
          </CardContent>
        </Card>
      </section>

    </main>
  )
}
