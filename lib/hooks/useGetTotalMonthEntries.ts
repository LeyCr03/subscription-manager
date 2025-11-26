import { useQuery } from "@tanstack/react-query";
import { totalEntries } from "../actions/entries.actions";

export const useGetAllMonthEntries = () => {
    return useQuery({
        queryKey: ["allMonthEntries"],
        queryFn: () => totalEntries(),
    }
    );
};