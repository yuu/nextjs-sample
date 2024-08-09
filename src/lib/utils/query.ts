import { Result, ok, err } from "neverthrow";
import type { ParsedUrlQuery } from "querystring";

export const handleQuery = <T>(
  query: ParsedUrlQuery,
  target: string,
): Result<T, null> => {
  const t = query[target] as T;
  if (t === undefined) {
    return err(null);
  }

  return ok(t);
};
