import { Option, Some, None } from 'ts-results'
import type { ParsedUrlQuery } from 'querystring'

export const handleQuery = <T>(query: ParsedUrlQuery, target: string): Option<T> => {
  const t = query[target] as T
  if (t === undefined) {
    return None
  }

  return Some(t)
}
