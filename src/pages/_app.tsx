import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "@/api";

import { AppLayout } from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.ja";
import { Navigation } from "@/components/navigation";
import { navigationItems } from "@/config/navigation";

import "@/styles/globals.css";
import "@cloudscape-design/global-styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 1000 * 6 * 10 } },
});

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
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default trpc.withTRPC(App);
