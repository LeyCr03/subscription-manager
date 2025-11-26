"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import React from "react";
import { chartConfigRevenue } from "@/lib/constants";
import { useGetChartRevenue } from "@/lib/hooks/useGetRevenueChart";

export function RevenueChart() {
    const subscriptionPrice = 600
    const { data: month_revenue, error: revenue_error, isLoading: revenueLoading } = useGetChartRevenue({ subscriptionPrice });

    const total = React.useMemo(
        () => ({

            revenue: month_revenue ? month_revenue.reduce((acc, curr) => acc + curr.revenue, 0) : [],
        }),
        []
    )
    if (revenueLoading) {
        return <div>Loading chart data...</div>;
    }
    if (revenue_error) {
        return <div>Error loading chart data: {revenue_error.message}</div>;
    }
    if (!month_revenue) {
        return <div>No chart data available.</div>;
    }


    return (
        <Card className="py-0 border-none">
            <CardHeader className="flex flex-col items-stretch border-none rounded-md shadow !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Metrics For Income Data</CardTitle>
                    <CardDescription>
                        Showing total income in the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">

                    <div
                        className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-none shadow px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                    >
                        <span className="text-muted-foreground text-xs">
                            {chartConfigRevenue.income.label}
                        </span>
                        <span className="text-lg leading-none font-bold sm:text-3xl">
                            {total.revenue.toString()}
                        </span>
                    </div>

                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 border-none">
                <ChartContainer
                    config={chartConfigRevenue}
                    className="aspect-auto h-[300px] w-full border-none"
                >
                    <BarChart
                        accessibilityLayer
                        data={month_revenue}
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
                        <Bar dataKey={'revenue'} fill={`${chartConfigRevenue.income.color}`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
