import { useQuery} from '@tanstack/react-query';
import { getFrequency } from '../actions/account.actions';

export const useGetFrequency = ({
  accountId,
}: {
  accountId: string;
}) => {
  return useQuery({
    queryKey: ["frequency", accountId],
    queryFn: () => getFrequency(accountId),
  }
);
};