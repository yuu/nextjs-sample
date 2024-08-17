import { match, P } from "ts-pattern";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import { useAuthContext, AuthContext } from "@/context";
import { SIGNIN_PATH } from "@/config/auth";

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
    .with(["unauthenticated", P.nullish], () => false)
    .with(["unauthenticated", P.not(P.nullish)], () => false)
    .exhaustive();

const redirectParams = (router: NextRouter) =>
  match(router.asPath)
    .with("/", () => ({
      pathname: SIGNIN_PATH,
    }))
    .otherwise(() => ({
      pathname: SIGNIN_PATH,
      query: { returnUrl: router.asPath },
    }));

const toSignIn = (router: NextRouter, auth: AuthContext) => {
  if (!router.isReady) {
    return;
  }
  if (router.asPath === SIGNIN_PATH) {
    return;
  }
  if (requireSignIn(auth)) {
    auth.signin(); // default sign-in page
    // router.replace(redirectParams(router));
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
