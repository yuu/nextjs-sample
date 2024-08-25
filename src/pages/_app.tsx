import React from "react";
import type { AppProps } from "next/app";
import { useProgressBar } from "@/hooks";
import { I18nProvider, AuthProvider, AclProvider } from "@/providers";
import { trpc } from "@/api";
import { Guard } from "@/components/guard";
import { DefaultLayout } from "@/layout";

import "@cloudscape-design/global-styles/index.css";
import "nprogress/nprogress.css";

// Suppress warning for ssr useLayoutEffect
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (typeof window === "undefined") React.useLayoutEffect = () => {};

const getPageAttributes = (Component: AppProps["Component"]) => ({
  authGuard: Component.authGuard ?? true,
  guestGuard: Component.guestGuard ?? false,
  aclPolicy: Component.aclPolicy ?? { action: "manage", subject: "all" },
});

function App({ Component, pageProps }: AppProps) {
  useProgressBar();

  const { authGuard, guestGuard, aclPolicy } = getPageAttributes(Component);
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout content={page} />);

  return (
    <I18nProvider>
      <AuthProvider>
        <AclProvider>
          <Guard authGuard={authGuard} guestGuard={guestGuard} acl={aclPolicy}>
            {getLayout(<Component {...pageProps} />)}
          </Guard>
        </AclProvider>
      </AuthProvider>
    </I18nProvider>
  );
}

export default trpc.withTRPC(App);
