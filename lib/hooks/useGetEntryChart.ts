import { useQuery } from "@tanstack/react-query";
import { entryChart, EntryChartData } from "../actions/charts.actions";

export const useGetChartEntries = () => {
    return useQuery<EntryChartData[], Error>({
        queryKey: ["entriesData"],
        queryFn: () => entryChart(),
    }
    );
};