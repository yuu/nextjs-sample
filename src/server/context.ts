import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth/next";
import { options } from "@/config/auth";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const authOptions = await options();
  if (authOptions.isErr()) {
    // TODO: internal server error
  }

  const session = await getServerSession(req, res, authOptions.unwrapOr({}));

  return {
    session,
  };
};
