import { mergeRouters } from "@/server/trpc";
import tests from "./tests";

export const appRouter = mergeRouters(tests);

export type AppRouter = typeof appRouter;
