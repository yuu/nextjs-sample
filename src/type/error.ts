import { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";
import { invert, type ValueOf, getCauseFromUnknown } from "@/lib/utils";

export const APP_ERROR_CODES_BY_KEY = {
  ...TRPC_ERROR_CODES_BY_KEY,
  RECORD_INVALID: 5000,
} as const;

export const APP_ERROR_CODES_BY_NUMBER = invert(APP_ERROR_CODES_BY_KEY);

export type APP_ERROR_CODE_NUMBER = ValueOf<typeof APP_ERROR_CODES_BY_KEY>;

export type APP_ERROR_CODE_KEY = keyof typeof APP_ERROR_CODES_BY_KEY;

export class AppError extends Error {
  public override readonly cause?: Error;
  public readonly code;

  constructor(opts: {
    code: APP_ERROR_CODE_KEY;
    message?: string;
    cause?: unknown;
  }) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? opts.code;

    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.code = opts.code;
    this.name = "AppError";

    if (!this.cause) {
      // < ES2022 / < Node 16.9.0 compatability
      this.cause = cause;
    }
  }
}
