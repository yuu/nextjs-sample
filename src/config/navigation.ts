import { type SideNavigationProps } from "@cloudscape-design/components";

export const navigationItems = (): ReadonlyArray<SideNavigationProps.Item> => {
  return [
    {
      type: "link",
      text: "HOME",
      href: "/",
    },
  ];
};
