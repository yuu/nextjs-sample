import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useAclContext } from "@/context";
import type { AclPolicy } from "@/type/acl";

type AclGuardProps = PropsWithChildren<{
  acl: AclPolicy;
  guestGuard: boolean;
}>;

export const AclGuard = ({ acl, guestGuard, children }: AclGuardProps) => {
  const router = useRouter();
  const ability = useAclContext();

  if (
    guestGuard ||
    ["/400", "/500", "/"].some((current) => current === router.route)
  ) {
    return children;
  }

  if (ability.can(acl.action, acl.subject)) {
    return children;
  }

  return <div>401 authorized</div>;
};
