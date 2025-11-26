import { useQuery } from "@tanstack/react-query";
import { revenueChart, RevenueChartData } from "../actions/charts.actions";

export const useGetChartRevenue = ({subscriptionPrice = 600 }: {subscriptionPrice: number}) => {
    return useQuery<RevenueChartData[], Error>({
        queryKey: ["revenueData", subscriptionPrice],
        queryFn: () => revenueChart(subscriptionPrice),
    }
    );
};