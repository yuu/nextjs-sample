import { TRPCErrorShape, TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";
import { invert, type ValueOf } from "@/lib/utils";

export type AppSuccessResponse = {};

export type AppSuccessResponseWithList = {};

export const APP_ERROR_CODES_BY_KEY = {
  ...TRPC_ERROR_CODES_BY_KEY,
  RECORD_INVALID: 5000,
} as const;

export const APP_ERROR_CODES_BY_NUMBER = invert(APP_ERROR_CODES_BY_KEY);

export type APP_ERROR_CODE_NUMBER = ValueOf<typeof APP_ERROR_CODES_BY_KEY>;

export type APP_ERROR_CODE_KEY = keyof typeof APP_ERROR_CODES_BY_KEY;

export type AppErrorResponse<
  TData extends Record<string, unknown> = Record<string, unknown>,
> = TRPCErrorShape<APP_ERROR_CODE_NUMBER, TData>;

export type AppErrorResponseWithRecordInvalid = TRPCErrorShape<
  APP_ERROR_CODE_NUMBER,
  {
    details: Record<string, Array<string>>;
  }
>;

export type AppErrorResponseWithStandardError = TRPCErrorShape<
  APP_ERROR_CODE_NUMBER,
  {
    code: string;
    name: string;
  }
>;
