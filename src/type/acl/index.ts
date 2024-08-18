import type { MongoAbility } from "@casl/ability";

export const subjects = ["all", "user"] as const;
export type Subject = (typeof subjects)[number];

export const actions = [
  "manage",
  "read",
  "write",
  "list",
  "get",
  "create",
  "update",
  "delete",
] as const;
export type Action = (typeof actions)[number];

export type AclAbility = MongoAbility<[Action, Subject]>;

export type AclPolicy = {
  action: Action;
  subject: Subject;
};
