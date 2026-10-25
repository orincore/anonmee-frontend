import type { Icon } from "@phosphor-icons/react";
import { ChatCircleDots, Globe, House, UserCircle, UsersThree } from "@phosphor-icons/react/dist/ssr";

export interface NavItem {
  href: string;
  label: string;
  icon: Icon;
  unreadKey?: "global" | "groups";
}

/** The five places in the app. Same order on the phone tab bar and the desktop rail. */
export const APP_NAV: NavItem[] = [
  { href: "/home", label: "Home", icon: House },
  { href: "/groups/global", label: "Global", icon: Globe, unreadKey: "global" },
  { href: "/groups", label: "Groups", icon: UsersThree, unreadKey: "groups" },
  { href: "/chat", label: "Chat", icon: ChatCircleDots },
  { href: "/me", label: "Me", icon: UserCircle },
];
