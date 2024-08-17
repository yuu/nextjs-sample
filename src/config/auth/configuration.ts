import { ResultAsync, okAsync } from "neverthrow";
import { CallbacksOptions, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type Providers = AuthOptions["providers"];

export const getOptions = (): ResultAsync<
  { providers: Providers; callback: Partial<CallbacksOptions> },
  Error
> => {
  return okAsync({
    providers: [
      CredentialsProvider({
        credentials: {
          email: {
            label: "email",
            type: "input",
            placeholder: "your_name@example.com",
          },
          password: {
            label: "password",
            type: "password",
          },
        },
        async authorize(credentials) {
          if (credentials === undefined) {
            return null;
          }

          return { id: credentials.email, email: credentials.email };
        },
      }),
    ],
    callback: {
      async jwt({ token }) {
        return token;
      },
      async session({ session }) {
        return session;
      },
    },
  } satisfies { providers: Providers; callback: Partial<CallbacksOptions> });
};
