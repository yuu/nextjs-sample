import { useState, useCallback } from "react";
import {
  type CollectionPreferencesProps,
  type PaginationProps,
  type TableProps,
  type NonCancelableCustomEvent,
} from "@cloudscape-design/components";
import { type Test } from "@/model/test";
import {
  columnDefinitions,
  columnDisplay,
  contentDisplayPreferenceOptions,
} from "./column";

type ChangePreferencesParam =
  NonCancelableCustomEvent<CollectionPreferencesProps.Preferences>;
type ChangePaginationParam =
  NonCancelableCustomEvent<PaginationProps.ChangeDetail>;
type ChangeSelectionParam = NonCancelableCustomEvent<
  TableProps.SelectionChangeDetail<Test>
>;
export type SortingColumn = TableProps.SortingColumn<Test> & {
  isDescending: boolean;
};
type ChangeSortHandlerParam = NonCancelableCustomEvent<
  TableProps.SortingState<Test>
>;

export const usePreferences = () => {
  // -- Pagination
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const onChangePagination = useCallback(
    ({ detail }: ChangePaginationParam) =>
      setCurrentPageIndex(detail.currentPageIndex),
    [setCurrentPageIndex],
  );

  // -- Preferences
  const [preferences, setPreferences] =
    useState<CollectionPreferencesProps.Preferences>({
      pageSize: 20,
      wrapLines: undefined,
      stripedRows: undefined,
      contentDisplay: columnDisplay,
      visibleContent: undefined,
      stickyColumns: undefined,
      contentDensity: undefined,
      custom: undefined,
    });
  const onChangePreferences = useCallback(
    ({ detail }: ChangePreferencesParam) => setPreferences(detail),
    [setPreferences],
  );

  // -- Selection
  const [selectedItems, setSelectedItems] = useState<Array<Test>>([]);
  const onSelectionChange = useCallback(
    ({ detail }: ChangeSelectionParam) =>
      setSelectedItems(detail.selectedItems),
    [setSelectedItems],
  );

  // -- Sorting
  const [sortingColumn, setSortingColumn] = useState<SortingColumn>(() => {
    const defaultCol = columnDefinitions.find((x) => x.id === "name");

    return {
      isDescending: false,
      sortingField: defaultCol?.sortingField,
      sortingComparator: defaultCol?.sortingComparator,
    };
  });
  const onSortingChange = useCallback(
    ({ detail }: ChangeSortHandlerParam) =>
      setSortingColumn({
        isDescending: detail.isDescending ?? false,
        ...detail.sortingColumn,
      }),
    [setSortingColumn],
  );

  return {
    // pagination
    currentPageIndex,
    onChangePagination,

    // preferences
    preferences,
    setPreferences,
    onChangePreferences,

    // column
    columnDefinitions,
    contentDisplayPreferenceOptions,

    // selection
    selectedItems,
    onSelectionChange,

    // Sorting
    sortingColumn,
    onSortingChange,
  };
};
