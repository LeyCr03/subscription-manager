import { useQuery } from "@tanstack/react-query";
import { getLasEntry } from "../actions/account.actions";

export const useGetLastEntry = ({
  accountId
}: {
  accountId: string;
}) => {
  return useQuery({
    queryKey: ["getLastEntry", accountId],
    queryFn: () => getLasEntry(accountId),
  }
);
};