import { useQuery } from "@tanstack/react-query";
import { getDatesAfterLastPayDay } from "../actions/entries.actions";

export const useGetEntriesAfterLastPayDay = ({
  accountId,
}: {
  accountId: string;
}) => {
  return useQuery({
    queryKey: ["entriesAfterLastPay", accountId],
    queryFn: () => getDatesAfterLastPayDay(accountId),
  }
);
};