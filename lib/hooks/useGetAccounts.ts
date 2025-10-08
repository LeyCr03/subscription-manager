import { useQuery} from '@tanstack/react-query';
import { getAccounts } from '../actions/account.actions';

export const useGetAccounts = ({
  currentPage = 1,
  pageSize = 10,
}: {
  currentPage: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["allAccounts", currentPage, pageSize],
    queryFn: () => getAccounts(currentPage, pageSize),
  }
);
};