import type { NextPage } from "next";
import {
  UserTable,
  usePreferences,
  useFetchUsers,
  useUserTableAction,
} from "@/features/test";

const TestsPage: NextPage = () => {
  const preferences = usePreferences();
  const { users, isLoading } = useFetchUsers({
    sortingColumn: preferences.sortingColumn,
    page: preferences.currentPageIndex,
    pageSize: preferences.preferences.pageSize ?? 20,
  });
  const { handleItemClick } = useUserTableAction(users ?? []);

  return (
    <UserTable
      allPreferences={preferences}
      items={users}
      pagesCount={100}
      isLoading={isLoading}
      onItemClick={handleItemClick}
    />
  );
};

export default TestsPage;
