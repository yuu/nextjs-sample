import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Meta, Context } from "@/type/trpc/server";
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
export const procedure = t.procedure;
export const mergeRouters = t.mergeRouters;
