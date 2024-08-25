import { match, P } from "ts-pattern";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "@/server/router";
import { isRecordOfStringArrays } from "@/lib/utils";

export const getDetails = (data: any) => {
  return match(data)
    .with(P.nullish, () => undefined)
    .with({ details: P.when(isRecordOfStringArrays) }, (v) => v.details)
    .otherwise(() => undefined);
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      abortOnUnmount: true,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            return {};
          },
        }),
      ],
    };
  },

  ssr: false,
});
