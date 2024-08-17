import { ResultAsync } from "neverthrow";
import { randomUUID } from "crypto";
import { AuthOptions } from "next-auth";
import { getOptions } from "./configuration";

export const options = (): ResultAsync<AuthOptions, Error> => {
  return getOptions().map((opt) => {
    return {
      pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
        signOut: "/auth/signin",
      },
      session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
        generateSessionToken: () => randomUUID(),
      },
      providers: opt.providers,
      callbacks: opt.callback,
    } satisfies AuthOptions;
  });
};
