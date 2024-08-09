import { z } from "zod";
import { procedure } from "@/server/trpc";
import { prisma } from "@/server/prisma";

const tests = procedure
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

export default tests;
