import React from "react";
import type { AppProps } from "next/app";
import { AppLayout } from "@cloudscape-design/components";
import { Navigation } from "@/components/navigation";
import { Guard } from "@/components/guard";
import { navigationItems } from "@/config/navigation";
import { useProgressBar } from "@/hooks";
import { I18nProvider, AuthProvider } from "@/providers";
import { trpc } from "@/api";

import "@cloudscape-design/global-styles/index.css";
import "nprogress/nprogress.css";

// Suppress warning for ssr useLayoutEffect
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (!typeof window) React.useLayoutEffect = React.useEffect;

const getPageAttributes = (Component: AppProps["Component"]) => ({
  authGuard: Component.authGuard ?? true,
  guestGuard: Component.guestGuard ?? false,
});

function App({ Component, pageProps }: AppProps) {
  useProgressBar();

  const { authGuard } = getPageAttributes(Component);
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <AppLayout
        navigation={<Navigation items={navigationItems()} />}
        content={page}
      />
    ));

  return (
    <I18nProvider>
      <AuthProvider>
        <Guard authGuard={authGuard}>
          {getLayout(<Component {...pageProps} />)}
        </Guard>
      </AuthProvider>
    </I18nProvider>
  );
}

export default trpc.withTRPC(App);
