import type { NextPage } from "next";
import {
  UserTable,
  usePreferences,
  useFetchUsers,
  useUserTableAction,
} from "@/features/test";

const TestsPage: NextPage = () => {
  const preferences = usePreferences();
  const { data, isLoading } = useFetchUsers({
    sortingColumn: preferences.sortingColumn,
    page: preferences.currentPageIndex,
    pageSize: preferences.preferences.pageSize ?? 20,
  });
  const { handleItemClick } = useUserTableAction(data?.items ?? []);

  return (
    <UserTable
      allPreferences={preferences}
      items={data?.items ?? []}
      pagesCount={data?.pagesCount ?? 0}
      isLoading={isLoading}
      onItemClick={handleItemClick}
    />
  );
};

export default TestsPage;
