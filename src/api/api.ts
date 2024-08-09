import { ResultAsync } from "neverthrow";
import { type Test } from "@/model/test";
import { type AppError } from "@/error";

export type Nothing = any;

type TestFromApi = Omit<Test, "createdAt"> & { createdAt: string };

type ApiPaginationResult<T> = {
  items: Array<T>;
  pagesCount: number;
  totalItemCount: number;
};

const fetchTests = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): ResultAsync<ApiPaginationResult<Test>, AppError> => {
  const query = new URLSearchParams({
    page: page.toString(),
    per: pageSize.toString(),
  });
  const ret = ResultAsync.fromPromise(
    fetch(`/api/tests?${query}`),
    (e) => e as AppError,
  )
    .map((res) => res.json() as Promise<ApiPaginationResult<TestFromApi>>)
    .map((result) => {
      return {
        items: result.items.map((row) => ({
          ...row,
          createdAt: new Date(row.createdAt),
        })) as Array<Test>,
        pagesCount: result.pagesCount,
        totalItemCount: result.totalItemCount,
      };
    });

  return ret;
};

const actions = {
  fetchTests,
};

type Actions = typeof actions;

export const clientDispatch = <
  T extends keyof Actions,
  Payload = Parameters<Actions[T]>[0],
>(
  type: T,
  payload: Payload,
): ReturnType<Actions[T]> => {
  return actions[type](payload as any) as ReturnType<Actions[T]>;
};
