import React from "react";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { trpc } from "@/api";
import { AppLayout } from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.ja";
import { Navigation } from "@/components/navigation";
import { navigationItems } from "@/config/navigation";
import { useProgressBar } from "@/hooks";

// locales
import i18nMessage from "@/locales/compiled/ja.json";

import "@cloudscape-design/global-styles/index.css";
import "nprogress/nprogress.css";

// Suppress warning for ssr useLayoutEffect
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (!typeof window) React.useLayoutEffect = React.useEffect;

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
    <IntlProvider
      locale={"ja"}
      timeZone="Asia/Tokyo"
      defaultLocale="ja"
      messages={i18nMessage}
    >
      <I18nProvider locale={"ja"} messages={[messages]}>
        {getLayout(<Component {...pageProps} />)}
      </I18nProvider>
    </IntlProvider>
  );
}

export default trpc.withTRPC(App);
