import {
  router,
  privateProcedure,
  toListResponse,
  toSingleResponse,
} from "@/server/trpc";
import { prisma } from "@/server/prisma";
import { TestCreateInputSchema, paginationInputSchema } from "@/schema";

const list = privateProcedure
  .input(paginationInputSchema)
  .query(async (opts) => {
    const { input } = opts;
    const result = await prisma.test.paginate({}, { ...input });

    return toListResponse(result);
  });

export const create = privateProcedure
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
