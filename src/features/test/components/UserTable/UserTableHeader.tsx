import {
  SpaceBetween,
  Header,
  Button,
  ButtonDropdown,
  type ButtonDropdownProps,
} from "@cloudscape-design/components";

type UserTableHeaderProps = {
  count: number;
  selectCount: number;
  onItemClick: ButtonDropdownProps["onItemClick"];
  loading?: boolean;
};

export const UserTableHeader = ({
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
              text: "編集",
              disabled: true,
              disabledReason: "未実装",
            },
            {
              id: "export",
              text: "エクスポート",
            },
            {
              text: "デンジャーゾーン",
              disabled: selectCount === 0,
              disabledReason: "1つ以上選択してください",
              items: [
                {
                  id: "delete",
                  text: "退会",
                  disabled: true,
                  disabledReason: "未実装",
                },
              ],
            },
          ]}
          expandableGroups
          loading={loading}
          onItemClick={onItemClick}
        >
          アクション
        </ButtonDropdown>
        <Button variant="primary" href="/tests/new">
          登録
        </Button>
      </SpaceBetween>
    }
  >
    会員一覧
  </Header>
);
