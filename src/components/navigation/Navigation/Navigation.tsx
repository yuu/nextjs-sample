import { useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import {
  SideNavigation,
  type SideNavigationProps,
} from "@cloudscape-design/components";

type NavigationProps = {
  items: ReadonlyArray<SideNavigationProps.Item>;
};

export const Navigation = ({ items }: NavigationProps) => {
  const router = useRouter();
  const activeHref = useMemo(() => {
    const pathSegments = router.pathname
      ?.split("/")
      ?.filter((segment) => !segment.startsWith("[") && segment !== "");

    return "/" + pathSegments?.join();
  }, [router]);
  const onFollow = useCallback(
    (event: CustomEvent<SideNavigationProps.FollowDetail>) => {
      event.preventDefault();
      router.push(event.detail.href);
    },
    [router],
  );

  return (
    <SideNavigation
      activeHref={activeHref}
      header={{
        text: "AppName",
        href: "/",
        logo: {
          src: "/favicon.png",
          alt: "logo",
        },
      }}
      items={items}
      onFollow={onFollow}
    />
  );
};
