import { useQuery } from "@tanstack/react-query";
import { getActiveAccounts } from "../actions/account.actions";

export const useGetAllActiveAccounts = () => {
    return useQuery({
        queryKey: ["allActiveAccounts"],
        queryFn: () => getActiveAccounts(),
    }
    );
};