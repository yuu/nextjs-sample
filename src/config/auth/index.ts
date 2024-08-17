import { ResultAsync } from "neverthrow";
import { randomUUID } from "crypto";
import { AuthOptions } from "next-auth";
import { getOptions } from "./configuration";

export const SIGNIN_PATH = "/auth/signin";

export const options = (): ResultAsync<AuthOptions, Error> => {
  return getOptions().map((opt) => {
    return {
      theme: {
        logo: "/images/auth-tochimaru-graph.png",
        brandColor: "#1786fb",
        colorScheme: "light",
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
