import { useQuery } from "@tanstack/react-query";
import { totalRevenue } from "../actions/account.actions";

export const useGetTotalRevenue = ({
    pricePerEntry = 30,
    subscriptionPrice = 600,
}: {
    pricePerEntry: number;
    subscriptionPrice: number;
}) => {
    return useQuery({
        queryKey: ["total-revenue", pricePerEntry, subscriptionPrice],
        queryFn: () => totalRevenue( pricePerEntry, subscriptionPrice),
    }
    );
};