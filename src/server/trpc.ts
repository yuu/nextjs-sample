import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Meta, Context } from "@/type/trpc/server";
import { AppError } from "@/type/error";
import { formatTRPCError } from "./error";

const t = initTRPC
  .meta<Meta>()
  .context<Context>()
  .create({
    transformer: superjson,
    defaultMeta: { authRequired: false, role: "general" },
    errorFormatter(opts) {
      const ret = formatTRPCError(opts);
      console.log("[error response]", ret);

      return ret;
    },
  });

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;
const procedure = t.procedure;

const authMiddleware = middleware(async (opts) => {
  const { meta, next } = opts;

  // check auth and role
  if (meta?.authRequired) {
    throw new AppError({ code: "UNAUTHORIZED" });
  }

  return next();
});

export const publicProcedure = procedure.use(authMiddleware);

export const privateProcedure = publicProcedure
  .use(authMiddleware)
  .meta({ authRequired: true, role: "general" });

export const adminProcedure = publicProcedure
  .use(authMiddleware)
  .meta({ authRequired: true, role: "admin" });

export const toListResponse = <Result>(result: {
  result: Result;
  totalPages: number;
  count: number;
}) => {
  return {
    items: result.result,
    pagesCount: result.totalPages,
    totalItemCount: result.count,
  };
};

export const toSingleResponse = <Result>(result: { result: Result }) => {
  return {
    item: result.result,
  };
};
