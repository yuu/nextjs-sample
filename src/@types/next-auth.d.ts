import { ISODateString } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  interface JWT {
    // id: string;
    // roles: Array<string>;
    // accessToken: string;
  }
}

declare module "next-auth" {
  interface Session {
    // ws_id: string;
    // accessToken: string;
    // expires: ISODateString;
    // user: {
    //   id: string;
    //   name: string;
    //   email: string;
    //   roles: Array<string>;
    //   image?: string;
    // };
  }
}
