export type ValueOf<TObj> = TObj[keyof TObj];

type KeyFromValue<TValue, TType extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof TType]: TValue extends TType[K] ? K : never;
}[keyof TType];

type Invert<TType extends Record<PropertyKey, PropertyKey>> = {
  [TValue in TType[keyof TType]]: KeyFromValue<TValue, TType>;
};

export function invert<TRecord extends Record<PropertyKey, PropertyKey>>(
  obj: TRecord,
): Invert<TRecord> {
  const newObj = Object.create(null);
  for (const key in obj) {
    const v = obj[key];
    newObj[v] = key;
  }
  return newObj;
}

function isObject(value: unknown): value is Record<string, unknown> {
  // check that value is object
  return !!value && !Array.isArray(value) && typeof value === "object";
}

class UnknownCauseError extends Error {
  [key: string]: unknown;
}

export function getCauseFromUnknown(cause: unknown): Error | undefined {
  if (cause instanceof Error) {
    return cause;
  }

  const type = typeof cause;
  if (type === "undefined" || type === "function" || cause === null) {
    return undefined;
  }

  // Primitive types just get wrapped in an error
  if (type !== "object") {
    return new Error(String(cause));
  }

  // If it's an object, we'll create a synthetic error
  if (isObject(cause)) {
    const err = new UnknownCauseError();
    for (const key in cause) {
      err[key] = cause[key];
    }
    return err;
  }

  return undefined;
}
