import { useQuery} from '@tanstack/react-query';
import { getAccounts } from '../actions/account.actions';

export const useGetAccounts = () => {
    return useQuery({
        queryKey: [`use-get-account`],
        queryFn: () => getAccounts()
    })
}