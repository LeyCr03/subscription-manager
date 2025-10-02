import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { SectionCards } from "./SectionCards";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


export function Metrics() {

  return (
    <main>

      <SectionCards />
      <section className="py-4">
        <div className="flex items-center justify-between gap-6 text-2xl my-4">
          <div className="flex h-8 items-center text-2xl space-x-3 ">
            <div>Visitors</div>
            <Separator orientation="vertical" />
            <div>New Accounts</div>
            <Separator orientation="vertical" />
            <div>Revenue</div>
          </div>
         
        </div>

      </section>
      <section className="flex items-center gap-6 mb-10">
        <Card className="w-2/3 h-100">
          <CardTitle>Chart for stats</CardTitle>
        </Card>
        <Card className="w-1/3 h-100">
          <CardTitle> Notifications</CardTitle>
          <CardTitle> SUSPENSION ALERTS</CardTitle>
          <CardContent>
            SOME ACCOUNTS ARE ABOUT TO BE SUSPENDED
          </CardContent>
        </Card>
      </section>

    </main>
  )
}
