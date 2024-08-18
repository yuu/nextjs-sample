import { useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import {
  SideNavigation as CSSideNavigation,
  type SideNavigationProps,
} from "@cloudscape-design/components";

type NavigationProps = {
  items: ReadonlyArray<SideNavigationProps.Item>;
};

const useActiveHref = () => {
  const router = useRouter();
  const activeHref = useMemo(() => {
    const pathSegments = router.pathname
      ?.split("/")
      ?.filter((segment) => !segment.startsWith("[") && segment !== "");

    return "/" + pathSegments?.join();
  }, [router]);

  return activeHref;
};

const useOnFollow = () => {
  const router = useRouter();
  const onFollow = useCallback(
    (event: CustomEvent<SideNavigationProps.FollowDetail>) => {
      event.preventDefault();
      router.push(event.detail.href);
    },
    [router]
  );

  return onFollow;
};

export const SideNavigation = ({ items }: NavigationProps) => {
  const activeHref = useActiveHref();
  const onFollow = useOnFollow();

  return (
    <CSSideNavigation
      activeHref={activeHref}
      items={items}
      onFollow={onFollow}
    />
  );
};
