"use client"

import { useGetAgePieChart } from "@/lib/hooks/usePieCharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Cell, Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ageColorMap, agePieChartConfig } from "@/lib/constants";
import { AgeRange } from "@/lib/types";

export function AgePieChart() {
    const { data: ageData, error: ageError, isLoading: loadingAge } = useGetAgePieChart();

    const currentDate = new Date();

    const [activeAge, setActiveAge] = React.useState<AgeRange | undefined>(undefined);

    // Use a default value or handle the loading state appropriately
    const dataReady = !!ageData && ageData.length > 0;
    const initialActiveAge = dataReady ? ageData[0].age : undefined;

    React.useEffect(() => {
        if (initialActiveAge) {
            setActiveAge(initialActiveAge);
        }
    }, [initialActiveAge]);

    const activeIndex = React.useMemo(
        () => {
            if (!ageData || !activeAge) return -1;  // Or some other default value

            const index = ageData.findIndex((item) => item.age === activeAge);
            return index;
        },
        [ageData, activeAge]
    );

    const age: AgeRange[] = React.useMemo(() => {
        if (!ageData) return [];
        return ageData.map((item) => item.age);
    }, [ageData]);


    if (loadingAge) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (ageError) {
        return <div>Error: {ageError.message}</div>; // Or a better error display
    }

    if (!ageData) {
        return <div>No data available.</div>; // Handle the case where data is still undefined after loading
    }

    const handleValueChange = (value: AgeRange) => {
        setActiveAge(value);
    };
    return (
        <Card data-chart="pie-interactive" className="flex w-full flex-col border-none shadow-sm">
            <ChartStyle id="pie-interactive" config={agePieChartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Age Range Distribution</CardTitle>
                    <CardDescription>Until {currentDate.toLocaleDateString()}</CardDescription>
                </div>
                <Select value={activeAge} onValueChange={handleValueChange}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Select an age range"
                    >
                        <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {age.map((key) => {
                            const config = agePieChartConfig[key as keyof typeof agePieChartConfig]

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
                    id="pie-interactive"
                    config={agePieChartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={ageData}
                            dataKey="accounts"
                            nameKey="age"
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
                            {ageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ageColorMap[entry.age]} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (!activeAge || activeIndex === -1) return null;
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
                                                    {ageData[activeIndex].accounts.toLocaleString()}
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