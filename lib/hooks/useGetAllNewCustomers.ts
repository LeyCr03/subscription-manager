import { useQuery } from "@tanstack/react-query";
import { getNewCustomers } from "../actions/account.actions";

export const useGetAllNewCustomers = () => {
    return useQuery({
        queryKey: ["allNewCustomers"],
        queryFn: () => getNewCustomers(),
    }
    );
};