import { match } from "ts-pattern";
import { ReactNode } from "react";
import { AppLayout } from "@cloudscape-design/components";
import { type ButtonDropdownProps } from "@cloudscape-design/components";
import { SideNavigation, TopNavigation } from "@/components/navigation";
import { sideNavigationItems, identity, utilities } from "@/config/navigation";
import { useAuthContext } from "@/context";

type DefaultLayoutProps = {
  content: ReactNode;
};

const useAction = () => {
  const auth = useAuthContext();
  const onItemClick = (
    event: CustomEvent<ButtonDropdownProps.ItemClickDetails>
  ) => {
    const f = match(event.detail.id)
      .with("signout", () => () => auth.signout())
      .otherwise((v) => () => console.log("no implement id:", v));

    f();
  };

  return { onItemClick, email: auth.session?.user?.email };
};

export const DefaultLayout = ({ content }: DefaultLayoutProps) => {
  const { onItemClick, email } = useAction();

  return (
    <>
      <div
        id="top-navigation-wrapper"
        style={{ position: "sticky", top: 0, zIndex: 1002 }}
      >
        <TopNavigation
          identity={identity()}
          utilities={utilities({ email, onItemClick })}
        />
      </div>
      <AppLayout
        headerSelector="#top-navigation-wrapper"
        navigation={<SideNavigation items={sideNavigationItems()} />}
        content={content}
      />
    </>
  );
};
