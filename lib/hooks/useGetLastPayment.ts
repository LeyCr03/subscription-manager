import { useQuery } from "@tanstack/react-query";
import { getLasPayment } from "../actions/account.actions";

export const useGetLastPayment = ({
  accountId
}: {
  accountId: string;
}) => {
  return useQuery({
    queryKey: ["getLastPayment", accountId],
    queryFn: () => getLasPayment(accountId),
  }
);
};