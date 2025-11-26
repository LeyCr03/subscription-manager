"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import React from "react";
import { chartConfigAccounts } from "@/lib/constants";
import { useGetChartNewAcc } from "@/lib/hooks/useGetNewAcChart";

export function NewAccountsChart() {
    const { data: month_acc, error: acc_error, isLoading: accLoading } = useGetChartNewAcc();

    const total = React.useMemo(
        () => ({

            accounts: month_acc ? month_acc.reduce((acc, curr) => acc + curr.accounts, 0) : [],
        }),
        []
    )
    if (accLoading) {
        return <div>Loading chart data...</div>;
    }
    if (acc_error) {
        return <div>Error loading chart data: {acc_error.message}</div>;
    }
    if (!month_acc) {
        return <div>No chart data available.</div>;
    }


    return (
        <Card className="py-0 border-none">
            <CardHeader className="flex flex-col items-stretch border-none rounded-md shadow !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Metrics For Costumers Growth</CardTitle>
                    <CardDescription>
                        Showing accounts created in the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">

                    <div
                        className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-none shadow px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                    >
                        <span className="text-muted-foreground text-xs">
                            {chartConfigAccounts.accounts.label}
                        </span>
                        <span className="text-lg leading-none font-bold sm:text-3xl">
                            {total.accounts.toString()}
                        </span>
                    </div>

                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 border-none">
                <ChartContainer
                    config={chartConfigAccounts}
                    className="aspect-auto h-[300px] w-full border-none"
                >
                    <BarChart
                        accessibilityLayer
                        data={month_acc}
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
                        <Bar dataKey={'accounts'} fill={`${chartConfigAccounts.accounts.color}`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
