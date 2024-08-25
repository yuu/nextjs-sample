import type { ISODateString } from "next-auth";
import type { Role } from "@/type/role";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  export interface JWT {
    email: string;
  }
}

declare module "next-auth" {
  export interface Session {
    expires: ISODateString;
    user: {
      email: string;
      role: Role;
    };
  }
}
