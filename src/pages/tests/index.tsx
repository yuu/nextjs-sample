import type { NextPage } from "next";
import { trpc } from "@/api";
import { UserTable, usePreferences, useUserTableAction } from "@/features/test";

const TestsPage: NextPage = () => {
  const preferences = usePreferences();
  const { data = { items: [], pagesCount: 0, totalItemCount: 0 }, isLoading } =
    trpc.tests.useQuery({
      page: preferences.currentPageIndex,
      limit: preferences.preferences.pageSize ?? 20,
    });
  const { items, pagesCount, totalItemCount } = data;

  const { handleItemClick } = useUserTableAction(items);

  return (
    <UserTable
      allPreferences={preferences}
      items={items}
      pagesCount={pagesCount}
      totalItemCount={totalItemCount}
      isLoading={isLoading}
      onItemClick={handleItemClick}
    />
  );
};

export default TestsPage;
