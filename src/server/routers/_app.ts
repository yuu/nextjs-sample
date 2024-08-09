import { z } from "zod";
import { procedure, router } from "@/server/trpc";
import tests from "./tests";

const hello = procedure
  .input(
    z.object({
      text: z.string().max(10),
    }),
  )
  .query((opts) => {
    return {
      greeting: `hello ${opts.input.text}`,
    };
  });

export const appRouter = router({
  hello,
  tests,
});

export type AppRouter = typeof appRouter;
