import type { Session } from "next-auth";

export type Meta = {
  authRequired: boolean;
  role: "general" | "admin";
};

export type Context = {
  session: Session | null;
};
