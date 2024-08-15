import { injectIntl, IntlShape, defineMessages } from "react-intl";
import {
  SpaceBetween,
  Header,
  Button,
  ButtonDropdown,
  type ButtonDropdownProps,
} from "@cloudscape-design/components";

const message = defineMessages({
  edit_text: {
    id: "features.test.components.UserTableHeader.edit.text",
    defaultMessage: "編集",
  },
  edit_disabledReason: {
    id: "features.test.components.UserTableHeader.edit.disabledReason",
    defaultMessage: "未実装",
  },
  export_text: {
    id: "features.test.components.UserTableHeader.export.text",
    defaultMessage: "エクスポート",
  },
  danger_text: {
    id: "features.test.components.UserTableHeader.danger.text",
    defaultMessage: "デンジャーゾーン",
  },
  danger_disabledReason: {
    id: "features.test.components.UserTableHeader.danger.disabledReason",
    defaultMessage: "1つ以上選択してください",
  },
  danger_delete_text: {
    id: "features.test.components.UserTableHeader.danger.delete.text",
    defaultMessage: "退会",
  },
  danger_delete_disabledReason: {
    id: "features.test.components.UserTableHeader.danger.delete.disabledReason",
    defaultMessage: "未実装",
  },
  action: {
    id: "features.test.components.UserTableHeader.action",
    defaultMessage: "アクション",
  },
  action_register: {
    id: "features.test.components.UserTableHeader.action.register",
    defaultMessage: "登録",
  },
  header: {
    id: "features.test.components.UserTableHeader.header",
    defaultMessage: "会員一覧",
  },
});

type UserTableHeaderProps = {
  intl: IntlShape;
  count: number;
  selectCount: number;
  onItemClick: ButtonDropdownProps["onItemClick"];
  loading?: boolean;
};

const UserTableHeaderInner = ({
  intl,
  count,
  selectCount,
  onItemClick,
  loading,
}: UserTableHeaderProps) => (
  <Header
    counter={selectCount ? "(" + selectCount + `/${count})` : `(${count})`}
    actions={
      <SpaceBetween direction="horizontal" size="xs">
        <ButtonDropdown
          items={[
            {
              id: "edit",
              text: intl.formatMessage(message.edit_text),
              disabled: true,
              disabledReason: intl.formatMessage(message.edit_disabledReason),
            },
            {
              id: "export",
              text: intl.formatMessage(message.export_text),
            },
            {
              text: intl.formatMessage(message.danger_text),
              disabled: selectCount === 0,
              disabledReason: intl.formatMessage(message.danger_disabledReason),
              items: [
                {
                  id: "delete",
                  text: intl.formatMessage(message.danger_delete_text),
                  disabled: true,
                  disabledReason: intl.formatMessage(
                    message.danger_delete_disabledReason,
                  ),
                },
              ],
            },
          ]}
          expandableGroups
          loading={loading}
          onItemClick={onItemClick}
        >
          {intl.formatMessage(message.action)}
        </ButtonDropdown>
        <Button variant="primary" href="/tests/new">
          {intl.formatMessage(message.action_register)}
        </Button>
      </SpaceBetween>
    }
  >
    {intl.formatMessage(message.header)}
  </Header>
);

export const UserTableHeader = injectIntl(UserTableHeaderInner);
