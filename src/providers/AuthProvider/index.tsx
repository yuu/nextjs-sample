import { PropsWithChildren } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { AuthContextProvider, type AuthContext } from "@/context";

type AuthProviderProps = PropsWithChildren<{}>;

const NextAuthProviderImpl = ({ children }: PropsWithChildren<{}>) => {
  const { data: session, status } = useSession();

  const contextValue = {
    status: status,
    session: session,
    signup: () => Promise.reject(),
    signin: () => signIn(),
    logout: () => signOut(),
  } satisfies AuthContext;

  return (
    <AuthContextProvider value={contextValue}>{children}</AuthContextProvider>
  );
};

export const AuthProvider = ({ children }: AuthProviderProps) => (
  <SessionProvider refetchInterval={60}>
    <NextAuthProviderImpl>{children}</NextAuthProviderImpl>
  </SessionProvider>
);
