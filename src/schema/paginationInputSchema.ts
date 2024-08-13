import { z } from "zod";

export const paginationInputSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(20),
});
