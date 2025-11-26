"use client"

import { useGetSexPieChart } from "@/lib/hooks/usePieCharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Cell, Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {  sexPieChartConfig, sexColorMap } from "@/lib/constants";
import {  Sex } from "@/lib/types";

export function SexPieChart() {
    const { data: sexData, error: sexError, isLoading: loadingSex } = useGetSexPieChart();

    const currentDate = new Date();

    const [activeSex, setActiveSex] = React.useState<Sex | undefined>(undefined);

    // Use a default value or handle the loading state appropriately
    const dataReady = !!sexData && sexData !== null && Array.isArray(sexData) && sexData.length > 0;
    const initialActiveSex = dataReady ? sexData[0].sex : undefined;

    React.useEffect(() => {
        if (initialActiveSex) {
            setActiveSex(initialActiveSex);
        }
    }, [initialActiveSex]);

    const activeIndex = React.useMemo(
        () => {
            if (!sexData || !activeSex) return -1;  // Or some other default value

            const index = sexData.findIndex((item) => item.sex === activeSex);
            return index;
        },
        [sexData, activeSex]
    );

    const sexValues: Sex[] = React.useMemo(() => {
        if (!dataReady) return [];
         return Object.values(Sex);
    }, [dataReady]);


    if (loadingSex) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (sexError) {
        return <div>Error: {sexError.message}</div>; // Or a better error display
    }

    if (!sexData) {
        return <div>No data available.</div>; // Handle the case where data is still undefined after loading
    }

    const handleValueChange = (value: Sex) => {
        setActiveSex(value);
    };
    return (
        <Card data-chart="sex-pie-interactive" className="flex w-full flex-col border-none shadow-sm">
            <ChartStyle id="sex-pie-interactive" config={sexPieChartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Age Range Distribution</CardTitle>
                    <CardDescription>Until {currentDate.toLocaleDateString()}</CardDescription>
                </div>
                <Select value={activeSex} onValueChange={handleValueChange}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Select an age range"
                    >
                        <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {sexValues.map((key) => {
                            const config = sexPieChartConfig[key as keyof typeof sexPieChartConfig]

                            if (!config) {
                                return null
                            }

                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{
                                                backgroundColor: `var(--color-${key})`,
                                            }}
                                        />
                                        {config?.label}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex justify-center pb-0">
                <ChartContainer
                    id="sex-pie-interactive"
                    config={sexPieChartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={sexData}
                            dataKey="accounts"
                            nameKey="sex"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex === -1 ? undefined : activeIndex} // Handle -1 case
                            activeShape={activeIndex === -1 ? undefined : ({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                             {sexData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={sexColorMap[entry.sex]} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (!activeSex || activeIndex === -1) return null;
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {sexData[activeIndex].accounts.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Accounts
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}