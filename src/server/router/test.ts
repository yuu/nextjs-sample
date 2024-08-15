import {
  router,
  publicProcedure,
  toListResponse,
  toSingleResponse,
} from "@/server/trpc";
import { prisma } from "@/server/prisma";
import { TestCreateInputSchema, paginationInputSchema } from "@/schema";

const list = publicProcedure
  .input(paginationInputSchema)
  .query(async (opts) => {
    const { input } = opts;
    const result = await prisma.test.paginate({}, { ...input });

    return toListResponse(result);
  });

export const create = publicProcedure
  .input(TestCreateInputSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    const result = await prisma.test.create({ data: input });

    return toSingleResponse({ result });
  });

const test = router({
  list,
  create,
});

export default test;
