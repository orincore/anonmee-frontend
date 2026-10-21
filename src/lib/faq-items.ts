export interface FaqItem {
  q: string;
  a: string;
}

/** Plain text answers, shared by the landing teaser, the FAQ page and its structured data, so all three always match. */
export const FAQ_ITEMS: FaqItem[] = [
  { q: "Who can use Anonmee?", a: "Adults only. You must be 18 or older to sign up. We ask for your date of birth and check it on our server." },
  { q: "What can other people see about me?", a: "A random name that changes in every chat, your gender and your age. Never your email, username, name or date of birth." },
  { q: "Does Anonmee keep my messages?", a: "One-to-one chats are deleted when the chat ends. Group and global messages are removed after 7 days. If someone is reported, the reported messages are kept briefly for review." },
  { q: "Can the Anonmee team see who I am?", a: "Our safety team can look up account details to deal with abuse. That access needs two-step login and every look is logged. Other users can never see it." },
  { q: "What if someone is rude or unsafe?", a: "Tap Report or Block in any chat. A reported person is never matched with you again, and reports of anyone under 18 are acted on straight away." },
  { q: "Is it free?", a: "Yes. Matching, chat and groups are free." },
  { q: "Can I send photos or files?", a: "No. Anonmee is text only, which keeps chats safer and more private." },
  { q: "Are groups limited in size?", a: "No. Anyone can join a group, and there is no member limit." },
];
