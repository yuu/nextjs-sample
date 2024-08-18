import { createContext, useContext } from "react";
import type { AclAbility } from "@/type/acl";

const aclContext = createContext<AclAbility>(undefined!);

export const AclContextProvider = aclContext.Provider;

export const AclContextConsumer = aclContext.Consumer;

export const useAclContext = () => {
  const context = useContext(aclContext);
  if (context === undefined) {
    throw new Error("useAclContext must be used within an AclContextProvider");
  }

  return context;
};
