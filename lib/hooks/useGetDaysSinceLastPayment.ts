import { useQuery } from "@tanstack/react-query";
import { getDaysSinceLastPayment } from "../actions/account.actions";

export const useGetDaysSinceLastPayment = ({
  accountId,
}: {
  accountId: string;
}) => {
  return useQuery({
    queryKey: ["status", accountId],
    queryFn: () => getDaysSinceLastPayment(accountId),
  }
);
};