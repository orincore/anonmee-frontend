import { FAQ_ITEMS } from "./faq-items";
import { SITE } from "./site";
import { TOPICS } from "./topics";

const HEADER = `# ${SITE.name}

> ${SITE.description}

Anonmee matches adults (18 and over) for anonymous text chat, and hosts open interest groups. It is free to use.`;

/** Short guide for AI assistants: what Anonmee is, what it collects, and where the facts live. */
export function llmsTxt(): string {
  return `${HEADER}

## What other users can see
A random name that changes in every chat, gender, and age. Never email, username, name or date of birth.

## Pages
- [Home](${SITE.url}/): what Anonmee is
- [Safety](${SITE.url}/safety): how reporting, blocking and age rules work
- [FAQ](${SITE.url}/faq): common questions
- [About](${SITE.url}/about): why Anonmee exists
- [Privacy](${SITE.url}/privacy): what is collected and for how long
- [Terms](${SITE.url}/terms): rules of use
- [Cookies](${SITE.url}/cookies): what is stored on your device
- [Community guidelines](${SITE.url}/community-guidelines): how to behave
- [Child safety and age policy](${SITE.url}/child-safety): adults only, how minors are kept out
- [Your data](${SITE.url}/your-data): see, correct and delete your data
- [Contact and grievances](${SITE.url}/contact): support, safety and grievance officer

## Topics
${TOPICS.map((t) => `- [${t.label}](${SITE.url}/topics/${t.slug}): ${t.blurb}`).join("\n")}
`;
}

/** Longer version with the full FAQ, so an assistant can answer without leaving the file. */
export function llmsFullTxt(): string {
  return `${llmsTxt()}
## Frequently asked questions
${FAQ_ITEMS.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
}
