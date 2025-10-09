"use client"
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
import { chartConfig, chartData } from "@/lib/constants";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Notifications } from "./Notifications";

//  TODO: GET charts
//get notifications

export function Metrics() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("accounts")

  const total = React.useMemo(
    () => ({
      accounts: chartData.reduce((acc, curr) => acc + curr.accounts, 0),
      others: chartData.reduce((acc, curr) => acc + curr.others, 0),
    }),
    []
  )
  return (
    <main>

      <SectionCards />
      <section className="flex h-auto gap-6 mb-8">

        <Card className="w-full border-none shadow-none">
          <Tabs defaultValue="entries" className="px-16 w-full bg-transparent">
            <TabsList className="bg-transparent">
              <TabsTrigger value="entries" className="text-xl font-sans p-5 data-[state=active]:shadow-none data-[state=active]:font-semibold font-thin">Entries</TabsTrigger>
              <TabsTrigger value="new-accounts" className="text-xl font-sans p-5 data-[state=active]:shadow-none  data-[state=active]:font-semibold font-thin">New Accounts</TabsTrigger>
              <TabsTrigger value="revenue" className="text-xl font-sans p-5 data-[state=active]:shadow-none  data-[state=active]:font-semibold font-thin">Revenue</TabsTrigger>
            </TabsList>
            <TabsContent value="entries" className="rounded-md">

              <Card className="py-0 border-none">
                <CardHeader className="flex flex-col items-stretch border-none rounded-md shadow !p-0 sm:flex-row">
                  <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Metrics For Service Customers Entries</CardTitle>
                    <CardDescription>
                      Showing total visitors for the last 3 months
                    </CardDescription>
                  </div>
                  <div className="flex">
                    {["accounts", "others"].map((key) => {
                      const chart = key as keyof typeof chartConfig
                      return (
                        <button
                          key={chart}
                          data-active={activeChart === chart}
                          className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-none shadow px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                          onClick={() => setActiveChart(chart)}
                        >
                          <span className="text-muted-foreground text-xs">
                            {chartConfig[chart].label}
                          </span>
                          <span className="text-lg leading-none font-bold sm:text-3xl">
                            {total[key as keyof typeof total].toLocaleString()}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6 border-none">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[300px] w-full border-none"
                  >
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="views"
                            labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            }}
                          />
                        }
                      />
                      <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

            </TabsContent>
            <TabsContent value="new-accounts">
              <Card className="py-0 border-none">
                <CardHeader className="flex flex-col items-stretch border-none rounded-md shadow !p-0 sm:flex-row">
                  <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Metrics For Costumers Growth</CardTitle>
                    <CardDescription>
                      Showing accounts created in the last 3 months
                    </CardDescription>
                  </div>
                  <div className="flex">
                    {["accounts", "others"].map((key) => {
                      const chart = key as keyof typeof chartConfig
                      return (
                        <button
                          key={chart}
                          data-active={activeChart === chart}
                          className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-none shadow px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                          onClick={() => setActiveChart(chart)}
                        >
                          <span className="text-muted-foreground text-xs">
                            {chartConfig[chart].label}
                          </span>
                          <span className="text-lg leading-none font-bold sm:text-3xl">
                            {total[key as keyof typeof total].toLocaleString()}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6 border-none">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[300px] w-full border-none"
                  >
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="views"
                            labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            }}
                          />
                        }
                      />
                      <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="revenue">
              <Card className="py-0 border-none">
                <CardHeader className="flex flex-col items-stretch border-none rounded-md shadow !p-0 sm:flex-row">
                  <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Metrics For Service Revenue</CardTitle>
                    <CardDescription>
                      Showing total revenue in the last 3 months
                    </CardDescription>
                  </div>
                  <div className="flex">
                    {["accounts", "others"].map((key) => {
                      const chart = key as keyof typeof chartConfig
                      return (
                        <button
                          key={chart}
                          data-active={activeChart === chart}
                          className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-none shadow px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                          onClick={() => setActiveChart(chart)}
                        >
                          <span className="text-muted-foreground text-xs">
                            {chartConfig[chart].label}
                          </span>
                          <span className="text-lg leading-none font-bold sm:text-3xl">
                            {total[key as keyof typeof total].toLocaleString()}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6 border-none">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[300px] w-full border-none"
                  >
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="views"
                            labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            }}
                          />
                        }
                      />
                      <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="w-full max-w-md h-full max-h-[60vh] border-none shadow-none">
          <CardTitle className="text-center text-2xl text-red-700 font-sans"> Notification Alerts</CardTitle>
          <CardContent className="overflow-auto py-5">
            <Notifications/>
          </CardContent>
        </Card>
      </section>

    </main>
  )
}
