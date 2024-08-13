import { router } from "@/server/trpc";
import test from "./test";

export const appRouter = router({
  test,
});

export type AppRouter = typeof appRouter;
