import type { ReactNode } from "react";
import type {
  NextComponentType,
  NextPageContext,
  AppPropsType,
} from "next/dist/shared/lib/utils";
import type { Router } from "next/dist/client/router";
import type { AclPolicy } from "@/type/acl";

declare module "next" {
  export declare type NextPage<
    P = GlobalLayoutProps,
    IP = P,
  > = NextComponentType<NextPageContext, IP, P> & {
    authGuard?: boolean;
    guestGuard?: boolean;
    aclPolicy?: AclPolicy;
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module "next/app" {
  export declare interface AppProps<P = any> extends AppPropsType<Router, P> {
    Component: import("next").NextPage;
  }
}
