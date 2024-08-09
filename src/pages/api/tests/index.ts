import type { NextApiRequest, NextApiResponse } from "next/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tests = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const records = await prisma.test.findMany();

    res.status(200).json(records);
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    res.status(500).json({ message: "File processing failed", error: err });
  }
};

export default tests;
