import { match } from "ts-pattern";
import { PropsWithChildren } from "react";
import { Loading } from "@/components/fallback";
import { AuthGuard } from "./AuthGuard";

type GuardProps = PropsWithChildren<{
  authGuard: boolean;
}>;

export const Guard = ({ children, authGuard }: GuardProps) => {
  return match(authGuard)
    .with(true, () => <AuthGuard fallback={<Loading />}>{children}</AuthGuard>)
    .otherwise(() => <>{children}</>);
};
