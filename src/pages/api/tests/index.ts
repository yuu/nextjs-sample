import type { NextApiRequest, NextApiResponse } from "next/types";
import { PrismaClient } from "@prisma/client";
import extension from "prisma-paginate";

const prisma = new PrismaClient().$extends(extension);

type PaginationParams = {
  page?: number;
  per?: number;
};

const paginationToQuery = (
  input: PaginationParams,
): { page: number; limit: number } => {
  const per = input.per ? parseInt(input.per) : 20;
  const page = input.page ? parseInt(input.page) : 1;

  return {
    page: per * Math.abs(page - 1),
    limit: per,
  };
};

const tests = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const result = await prisma.test.paginate(
      {},
      { ...paginationToQuery(req.query) },
    );

    // console.log("[debug] api result", result);
    // const [items, totalItemCount] = await Promise.all([
    //   prisma.test.findMany({
    //     ...paginationToQuery({ page, per }),
    //   }),
    //   prisma.test.count(),
    // ]);
    // const pagesCount = Math.ceil(totalItemCount / per);

    res.status(200).json({
      items: result.result,
      pagesCount: result.totalPages,
      totalItemCount: result.count,
    });
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    res.status(500).json({ message: "File processing failed", error: err });
  }
};

export default tests;
