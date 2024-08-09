import type { AppProps } from "next/app";
import { trpc } from "@/api";
import { AppLayout } from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.ja";
import { Navigation } from "@/components/navigation";
import { navigationItems } from "@/config/navigation";

import "@cloudscape-design/global-styles/index.css";

function App({ Component, pageProps }: AppProps) {
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
