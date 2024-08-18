import {
  type SideNavigationProps,
  type TopNavigationProps,
  type ButtonDropdownProps,
} from "@cloudscape-design/components";

export const sideNavigationItems =
  (): ReadonlyArray<SideNavigationProps.Item> => {
    return [
      {
        type: "link",
        text: "HOME",
        href: "/",
      },
      {
        type: "link",
        text: "test",
        href: "/tests",
      },
    ];
  };

export const identity = (): TopNavigationProps.Identity => {
  return {
    href: "/",
    logo: {
      src: "/favicon.png",
      alt: "logo",
    },
  };
};

type UtilitiesParams = {
  onItemClick: (
    event: CustomEvent<ButtonDropdownProps.ItemClickDetails>
  ) => void;
};

export const utilities = ({
  onItemClick,
}: UtilitiesParams): Array<TopNavigationProps.Utility> => {
  return [
    {
      type: "menu-dropdown",
      text: " ",
      description: " ",
      iconName: "user-profile",
      items: [{ id: "signout", text: "ログアウト" }],
      onItemClick: onItemClick,
    },
  ];
};
