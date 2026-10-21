import type { Icon } from "@phosphor-icons/react";
import { ChatCircleDots, House, UserCircle, UsersThree } from "@phosphor-icons/react/dist/ssr";

export interface NavItem {
  href: string;
  label: string;
  icon: Icon;
}

/** The four places in the app. Same order on the phone tab bar and the desktop rail. */
export const APP_NAV: NavItem[] = [
  { href: "/home", label: "Home", icon: House },
  { href: "/chat", label: "Chat", icon: ChatCircleDots },
  { href: "/groups", label: "Groups", icon: UsersThree },
  { href: "/me", label: "Me", icon: UserCircle },
];
