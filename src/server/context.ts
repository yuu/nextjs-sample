import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth/next";
import { options } from "@/config/auth";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return await options()
    .map((authOption) => getServerSession(req, res, authOption))
    .match(
      (session) => ({ session }),
      () => ({ session: null })
    );
};
