import { z } from "zod";
import { procedure, router } from "@/server/trpc";
import { prisma } from "@/server/prisma";
import { TestCreateInputSchema } from "@/schema";

const list = procedure
  .input(
    z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
    }),
  )
  .query(async (opts) => {
    const { input } = opts;
    const result = await prisma.test.paginate({}, { ...input });

    return {
      items: result.result,
      pagesCount: result.totalPages,
      totalItemCount: result.count,
    };
  });

export const create = procedure
  .input(TestCreateInputSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    const result = await prisma.test.create({ data: input });

    return result;
  });

const test = router({
  list,
  create,
});

export default test;
