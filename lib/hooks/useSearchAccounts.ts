import { useQuery} from '@tanstack/react-query';
import { searchAccounts } from '../actions/account.actions';

export const useSearchAccounts = ({
  currentPage = 1,
  pageSize = 10,
  search
}: {
  currentPage: number;
  pageSize: number;
  search: string;
}) => {
  return useQuery({
    queryKey: ["searchAccounts", currentPage, pageSize, search],
    queryFn: () => searchAccounts(currentPage, pageSize, search),
  }
);
};