import { injectIntl, IntlShape, defineMessages } from "react-intl";
import { Box, SpaceBetween } from "@cloudscape-design/components";

const message = defineMessages({
  text: {
    id: "features.test.components.Empty.text",
    defaultMessage: "データがありません",
  },
});

type EmptyProps = {
  intl: IntlShape;
};

const EmptyInner = ({ intl }: EmptyProps) => (
  <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
    <SpaceBetween size="m">
      <b>{intl.formatMessage(message.text)}</b>
    </SpaceBetween>
  </Box>
);

export const Empty = injectIntl(EmptyInner);
