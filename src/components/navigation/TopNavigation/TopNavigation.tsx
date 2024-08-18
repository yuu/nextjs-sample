import {
  TopNavigation as CSTopNavigation,
  type TopNavigationProps as CSTopNavigationProps,
} from "@cloudscape-design/components";

type TopNavigationProps = {
  identity: CSTopNavigationProps.Identity;
  utilities: Array<CSTopNavigationProps.Utility>;
};

export const TopNavigation = ({ identity, utilities }: TopNavigationProps) => {
  return <CSTopNavigation identity={identity} utilities={utilities} />;
};
