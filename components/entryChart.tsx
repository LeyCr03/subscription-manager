"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import React from "react";
import { useGetChartEntries } from "@/lib/hooks/useGetEntryChart";
import { chartConfigEntries } from "@/lib/constants";

export function EntryChart() {
    // const subscriptionPrice = 600
    const { data: month_entries, error: entries_error, isLoading: entriesLoading } = useGetChartEntries();
    //const { data: month_acc } = useGetChartNewAcc();
    // const { data: month_revenue } = useGetChartRevenue({ subscriptionPrice });
    // const { data: ageData } = useGetAgePieChart();
    // const { data: sexData } = useGetSexPieChart();

    const total = React.useMemo(
        () => ({

            entries: month_entries ? month_entries.reduce((acc, curr) => acc + curr.entries, 0) : [],
        }),
        []
    )
    if (entriesLoading) {
        return <div>Loading chart data...</div>;
    }
    if (entries_error) {
        return <div>Error loading chart data: {entries_error.message}</div>;
    }
    if (!month_entries) {
        return <div>No chart data available.</div>;
    }


    return (
        <Card className="py-0 border-none">
            <CardHeader className="flex flex-col items-stretch border-none rounded-md shadow !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Metrics For Service Customers Entries</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">
                   
                            <div
                                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-none shadow px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                            >
                                <span className="text-muted-foreground text-xs">
                                    {chartConfigEntries.entries.label}
                                </span>
                                <span className="text-lg leading-none font-bold sm:text-3xl">
                                    {total.entries.toString()}
                                </span>
                            </div>
                
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 border-none">
                <ChartContainer
                    config={chartConfigEntries}
                    className="aspect-auto h-[300px] w-full border-none"
                >
                    <BarChart
                        accessibilityLayer
                        data={month_entries}
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
                        <Bar dataKey={'entries'} fill={`${chartConfigEntries.entries.color}`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
