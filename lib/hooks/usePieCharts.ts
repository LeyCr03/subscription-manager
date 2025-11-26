import { useQuery } from "@tanstack/react-query";
import { agePieChart, AgePieChartData, sexPieChart, SexPieChartData } from "../actions/charts.actions";

export const useGetAgePieChart = () => {
    return useQuery<AgePieChartData[], Error>({
        queryKey: ["agePieChart"],
        queryFn: () => agePieChart(),
    }
    );
};

export const useGetSexPieChart = () => {
    return useQuery<SexPieChartData[], Error>({
        queryKey: ["sexPieChart"],
        queryFn: () => sexPieChart(),
    }
    );
};