import type { NextPage } from "next";
import { trpc } from "@/api";
import { UserTable, usePreferences, useUserTableAction } from "@/features/test";

const TestsPage: NextPage = () => {
  const preferences = usePreferences();
  const { data: result, isLoading } = trpc.tests.useQuery({
    page: preferences.currentPageIndex,
    limit: preferences.preferences.pageSize ?? 20,
  });
  const pagesCount = result?.pagesCount ?? 0;
  const items = result?.items ?? [];

  const { handleItemClick } = useUserTableAction(items);

  return (
    <UserTable
      allPreferences={preferences}
      items={items}
      pagesCount={pagesCount}
      isLoading={isLoading}
      onItemClick={handleItemClick}
    />
  );
};

export default TestsPage;
