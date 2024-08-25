import type { NextApiRequest, NextApiResponse } from "next/types";
import NextAuth from "next-auth";
import { options } from "@/config/auth";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const nextAuth = await options()
    .map((authOption) => NextAuth(req, res, authOption))
    .unwrapOr(undefined);

  if (!nextAuth) {
    // internal server error
  }

  return nextAuth;
}
