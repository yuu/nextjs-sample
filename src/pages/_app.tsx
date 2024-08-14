import React from "react";
import type { AppProps } from "next/app";
import { trpc } from "@/api";
import { AppLayout } from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.ja";
import { Navigation } from "@/components/navigation";
import { navigationItems } from "@/config/navigation";
import { useProgressBar } from "@/hooks";

import "@cloudscape-design/global-styles/index.css";
import "nprogress/nprogress.css";

// Suppress warning for ssr useLayoutEffect
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (!process.browser) React.useLayoutEffect = React.useEffect;

function App({ Component, pageProps }: AppProps) {
  useProgressBar();

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <AppLayout
        navigation={<Navigation items={navigationItems()} />}
        content={page}
      />
    ));

  return (
    <I18nProvider locale={"ja"} messages={[messages]}>
      {getLayout(<Component {...pageProps} />)}
    </I18nProvider>
  );
}

export default trpc.withTRPC(App);
