import type { Session } from "next-auth";
import { type Role } from "@/type/role";

export type Meta = {
  authRequired: boolean;
  role: Role;
};

export type Context = {
  session: Session | null;
};
