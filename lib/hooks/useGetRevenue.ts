import { useQuery } from '@tanstack/react-query';
import { getRevenue } from '../actions/account.actions';

export const useGetRevenue = ({
    accountId,
    pricePerEntry = 30,
    subscriptionPrice = 600,
}: {
    accountId: string,
    pricePerEntry: number;
    subscriptionPrice: number;
}) => {
    return useQuery({
        queryKey: ["revenue",accountId, pricePerEntry, subscriptionPrice],
        queryFn: () => getRevenue(accountId, pricePerEntry, subscriptionPrice),
    }
    );
};