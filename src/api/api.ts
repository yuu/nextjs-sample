import { ResultAsync } from "neverthrow";
import { type Test } from "@/model/test";
import { type AppError } from "@/error";

type Nothing = any;

type TestFromApi = Omit<Test, "createdAt"> & { createdAt: string };

// TODO: 最大値を返す必要がある
const fetchTests = (_: Nothing): ResultAsync<Array<Test>, AppError> => {
  const ret = ResultAsync.fromPromise(fetch("/api/tests"), (e) => e as AppError)
    .map((res) => res.json() as Promise<Array<TestFromApi>>)
    .map(
      (tests) =>
        tests.map((row) => ({
          ...row,
          createdAt: new Date(row.createdAt),
        })) as Array<Test>,
    );

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
