import { useQuery } from "react-query";
import { clientDispatch } from "@/api";
import type { SortingColumn } from "@/features/test/components/UserTable";

type UseFetchUsers = {
  sortingColumn: SortingColumn;
  page: number;
  pageSize: number;
};

export const useFetchUsers = ({
  sortingColumn,
  page,
  pageSize,
}: UseFetchUsers) => {
  const { data, isLoading } = useQuery("/tests", async () => {
    return (await clientDispatch("fetchTests", undefined))._unsafeUnwrap();
  });

  return { users: data ?? [], isLoading };
};
