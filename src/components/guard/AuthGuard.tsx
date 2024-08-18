import { match, P } from "ts-pattern";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import { useAuthContext, AuthContext } from "@/context";

const requireSignIn = (auth: AuthContext): boolean =>
  match([auth.status, auth.session])
    .with(["loading", P.nullish], () => false)
    .with(["loading", P.not(P.nullish)], () => false)
    .with(["authenticated", P.nullish], () => true)
    .with(["authenticated", P.not(P.nullish)], () => false)
    .with(["unauthenticated", P.nullish], () => true)
    .with(["unauthenticated", P.not(P.nullish)], () => true)
    .exhaustive();

const isFallback = (auth: AuthContext): boolean =>
  match([auth.status, auth.session])
    .with(["loading", P.nullish], () => true)
    .with(["loading", P.not(P.nullish)], () => true)
    .with(["authenticated", P.nullish], () => false)
    .with(["authenticated", P.not(P.nullish)], () => false)
    .with(["unauthenticated", P.nullish], () => true) // When fallback, redirect to sign-in page
    .with(["unauthenticated", P.not(P.nullish)], () => false)
    .exhaustive();

const toSignIn = (router: NextRouter, auth: AuthContext) => {
  if (!router.isReady) {
    return;
  }

  if (requireSignIn(auth)) {
    auth.signin();
  }
};

type AuthGuardProps = PropsWithChildren<{
  fallback: ReactNode | null;
}>;

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const router = useRouter();
  const auth = useAuthContext();

  useEffect(() => {
    toSignIn(router, auth);
  }, [router, auth]);

  if (isFallback(auth)) {
    return fallback;
  }

  return <>{children}</>;
};
