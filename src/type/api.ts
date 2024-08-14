import { TRPCErrorShape } from "@trpc/server/rpc";
import { APP_ERROR_CODE_NUMBER } from "./error";

export type AppSuccessResponse = {};

export type AppSuccessResponseWithList = {};

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
