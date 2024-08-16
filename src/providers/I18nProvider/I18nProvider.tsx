import { type PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { I18nProvider as CSI18nProvider } from "@cloudscape-design/components/i18n";

import cloudscapeJa from "@cloudscape-design/components/i18n/messages/all.ja";
import i18nMessage from "@/locales/compiled/ja.json";

type I18nProviderProps = PropsWithChildren<{
  defaultLocale?: "ja";
}>;

const locale = "ja";
const timeZone = "Asia/Tokyo";

export const I18nProvider = ({
  children,
  defaultLocale = "ja",
}: I18nProviderProps) => {
  return (
    <IntlProvider
      locale={locale}
      timeZone={timeZone}
      defaultLocale={defaultLocale}
      messages={i18nMessage}
    >
      <CSI18nProvider locale={locale} messages={[cloudscapeJa]}>
        {children}
      </CSI18nProvider>
    </IntlProvider>
  );
};
