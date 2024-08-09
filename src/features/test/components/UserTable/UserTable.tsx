import {
  Table,
  Pagination,
  CollectionPreferences,
  type ButtonDropdownProps,
} from "@cloudscape-design/components";
import { type UserWithPlanCustomer } from "src/model";
import { UserTableHeader } from "./UserTableHeader";
import { Empty } from "./Empty";
import { usePreferences } from "./usePreferences";

type UserTableProps = {
  items: Array<UserWithPlanCustomer>;
  pagesCount: number;
  totalItemCount: number;
  isLoading: boolean;
  allPreferences: ReturnType<typeof usePreferences>;
  onItemClick: ButtonDropdownProps["onItemClick"];
};

export const UserTable = ({
  items,
  pagesCount,
  totalItemCount,
  isLoading,
  allPreferences,
  onItemClick,
}: UserTableProps) => {
  const {
    preferences,
    onChangePreferences,
    columnDefinitions,
    contentDisplayPreferenceOptions,
    currentPageIndex,
    onChangePagination,
    selectedItems,
    onSelectionChange,
    sortingColumn,
    onSortingChange,
  } = allPreferences;

  return (
    <Table
      selectionType="single"
      variant="container"
      stickyHeader
      stripedRows
      resizableColumns
      enableKeyboardNavigation
      loadingText="Loading..."
      empty={<Empty />}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      trackBy={(v) => v.id}
      filter={undefined}
      header={
        <UserTableHeader
          count={totalItemCount}
          selectCount={selectedItems.length}
          onItemClick={onItemClick}
        />
      }
      pagination={
        <Pagination
          currentPageIndex={currentPageIndex}
          pagesCount={pagesCount}
          onChange={onChangePagination}
        />
      }
      preferences={
        <CollectionPreferences
          onConfirm={onChangePreferences}
          title="設定"
          confirmLabel="保存"
          cancelLabel="キャンセル"
          preferences={preferences}
          pageSizePreference={{
            title: "ページサイズ",
            options: [
              { value: 10, label: "10" },
              { value: 20, label: "20" },
            ],
          }}
          wrapLinesPreference={undefined}
          stripedRowsPreference={undefined}
          stickyColumnsPreference={undefined}
          contentDensityPreference={undefined}
          contentDisplayPreference={{
            options: contentDisplayPreferenceOptions,
          }}
        />
      }
      items={items}
      loading={isLoading}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      sortingDescending={sortingColumn.isDescending}
      sortingColumn={sortingColumn}
      onSortingChange={onSortingChange}
    />
  );
};
