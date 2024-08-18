import { match } from "ts-pattern";
import {
  RawRuleOf,
  createMongoAbility,
  createAliasResolver,
} from "@casl/ability";
import type { Role } from "@/type/role";
import type { AclAbility } from "@/type/acl";

type User = {
  role: Role;
};

const resolveAction = createAliasResolver({
  read: ["list", "get"],
  write: ["create", "update", "delete"],
});

const admin: Array<RawRuleOf<AclAbility>> = [
  {
    action: "manage",
    subject: "all",
  },
];

const general: Array<RawRuleOf<AclAbility>> = [
  {
    action: "read",
    subject: "all",
  },
];

export const defineAbilityFor = (user: User | null) => {
  const policies = match(user?.role)
    .with("admin", () => {
      return admin;
    })
    .with("general", () => {
      return general;
    })
    .otherwise(() => [] satisfies Array<RawRuleOf<AclAbility>>);

  const ability: AclAbility = createMongoAbility(policies, { resolveAction });

  return ability;
};
