import { useQuery } from "@tanstack/react-query";
import { AccountsChartData, newAccountsChart } from "../actions/charts.actions";

export const useGetChartNewAcc = () => {
    return useQuery<AccountsChartData[], Error>({
        queryKey: ["newAccountsData"],
        queryFn: () => newAccountsChart(),
    }
    );
};