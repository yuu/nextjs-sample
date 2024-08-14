import { match, P } from "ts-pattern";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { APP_ERROR_CODES_BY_KEY } from "@/type/error";
import {
  AppErrorResponse,
  AppErrorResponseWithRecordInvalid,
  AppErrorResponseWithStandardError,
} from "@/type/api";
import type { Context } from "@/type/trpc/server";

// TODO: error handling
const parsePrismaErrorCode = (error: Prisma.PrismaClientKnownRequestError) =>
  match(error)
    .returnType<
      | AppErrorResponse
      | AppErrorResponseWithRecordInvalid
      | AppErrorResponseWithStandardError
    >()
    .with(
      { code: "P2002" },
      (e) =>
        ({
          code: APP_ERROR_CODES_BY_KEY["RECORD_INVALID"],
          message: e.message,
          data: {
            details: match(e.meta?.target)
              .with(P.nullish, () => ({}))
              .with(P.array(P.string), (targets) =>
                targets.reduce(
                  (acc, target) => {
                    if (!acc[target]) {
                      acc[target] = [];
                    }
                    acc[target].push("taken");

                    return acc;
                  },
                  {} as AppErrorResponseWithRecordInvalid["data"]["details"],
                ),
              )
              .otherwise(() => ({})),
          },
        }) satisfies AppErrorResponseWithRecordInvalid,
    )
    .otherwise((e) => ({
      code: APP_ERROR_CODES_BY_KEY["INTERNAL_SERVER_ERROR"],
      message: "internal server error",
      data: {
        code: e.code,
        name: e.name,
      },
    }));

// TODO: error handling
const parsePrismaInitErrorCode = (
  error: Prisma.PrismaClientInitializationError,
) =>
  match(error).otherwise((e) => ({
    code: APP_ERROR_CODES_BY_KEY["INTERNAL_SERVER_ERROR"],
    message: "internal server error",
    data: {
      code: e.errorCode ?? "unknown",
      name: e.name,
    },
  }));

type formatTRPCErrorParams = {
  type: "query" | "mutation" | "subscription" | "unknown";
  ctx: Context | undefined;
  path: string | undefined;
  error: TRPCError;
};

export const formatTRPCError = ({ error }: formatTRPCErrorParams) =>
  match(error.cause)
    .returnType<
      | AppErrorResponse
      | AppErrorResponseWithRecordInvalid
      | AppErrorResponseWithStandardError
    >()
    .with(P.instanceOf(TRPCError), (e) => ({
      code: APP_ERROR_CODES_BY_KEY[e.code],
      message: e.message,
      data: {},
    }))
    .with(P.instanceOf(Prisma.PrismaClientKnownRequestError), (e) =>
      parsePrismaErrorCode(e),
    )
    .with(P.instanceOf(Prisma.PrismaClientUnknownRequestError), (e) => ({
      code: APP_ERROR_CODES_BY_KEY["INTERNAL_SERVER_ERROR"],
      message: e.message,
      data: {},
    }))
    .with(P.instanceOf(Prisma.PrismaClientRustPanicError), (e) => ({
      code: APP_ERROR_CODES_BY_KEY["INTERNAL_SERVER_ERROR"],
      message: e.message,
      data: {},
    }))
    .with(P.instanceOf(Prisma.PrismaClientInitializationError), (e) =>
      parsePrismaInitErrorCode(e),
    )
    .with(P.instanceOf(Prisma.PrismaClientValidationError), (e) => ({
      code: APP_ERROR_CODES_BY_KEY["INTERNAL_SERVER_ERROR"],
      message: e.message,
      data: {},
    }))
    .otherwise((e) => ({
      code: APP_ERROR_CODES_BY_KEY["INTERNAL_SERVER_ERROR"],
      message: e?.message ?? "unknown",
      data: {},
    }));
