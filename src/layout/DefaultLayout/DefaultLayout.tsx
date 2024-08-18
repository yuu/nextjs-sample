import { ReactNode } from "react";
import { AppLayout } from "@cloudscape-design/components";
import { SideNavigation, TopNavigation } from "@/components/navigation";
import { sideNavigationItems, identity, utilities } from "@/config/navigation";

type DefaultLayoutProps = {
  content: ReactNode;
};

export const DefaultLayout = ({ content }: DefaultLayoutProps) => {
  return (
    <>
      <div
        id="top-navigation-wrapper"
        style={{ position: "sticky", top: 0, zIndex: 1002 }}
      >
        <TopNavigation identity={identity()} utilities={utilities()} />
      </div>
      <AppLayout
        headerSelector="#top-navigation-wrapper"
        navigation={<SideNavigation items={sideNavigationItems()} />}
        content={content}
      />
    </>
  );
};
