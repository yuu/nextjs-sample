import { match, P } from "ts-pattern";
import { PropsWithChildren } from "react";
import { Loading } from "@/components/fallback";
import type { AclPolicy } from "@/type/acl";
import { AuthGuard } from "./AuthGuard";
import { AclGuard } from "./AclGuard";

type GuardProps = PropsWithChildren<{
  authGuard: boolean;
  guestGuard: boolean;
  acl: AclPolicy;
}>;

export const Guard = ({ children, authGuard, guestGuard, acl }: GuardProps) => {
  return match({ authGuard, guestGuard })
    .with({ authGuard: true, guestGuard: P._ }, () => (
      <AuthGuard fallback={<Loading />}>
        <AclGuard acl={acl} guestGuard={guestGuard}>
          {children}
        </AclGuard>
      </AuthGuard>
    ))
    .otherwise(() => (
      <AclGuard acl={acl} guestGuard={guestGuard}>
        {children}
      </AclGuard>
    ));
};
