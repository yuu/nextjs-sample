import { PropsWithChildren } from "react";
import { AclContextProvider, useAuthContext } from "@/context";
import { defineAbilityFor } from "@/config/acl";

type AclProviderProps = PropsWithChildren<{}>;

export const AclProvider = ({ children }: AclProviderProps) => {
  const auth = useAuthContext();
  const ability = defineAbilityFor(auth.session?.user ?? null);

  return <AclContextProvider value={ability}>{children}</AclContextProvider>;
};
