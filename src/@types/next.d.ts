import type { ReactNode } from "react";
import type {
  NextComponentType,
  NextPageContext,
  AppPropsType,
} from "next/dist/shared/lib/utils";
import type { Router } from "next/dist/client/router";

declare module "next" {
  export declare type NextPage<
    P = GlobalLayoutProps,
    IP = P,
  > = NextComponentType<NextPageContext, IP, P> & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module "next/app" {
  export declare interface AppProps<P = any> extends AppPropsType<Router, P> {
    Component: import("next").NextPage;
  }
}
