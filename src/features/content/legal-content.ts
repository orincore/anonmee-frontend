import { SITE } from "@/lib/site";
import type { ProseSection } from "./components/prose-page";

const C = SITE.contact;

export const PRIVACY_SECTIONS: ProseSection[] = [
  { heading: "The short version", paragraphs: ["Other people on Anonmee only ever see a random name, your gender and your age. We collect as little as we can, we do not sell your data, we do not run advertising trackers, and you can delete your account yourself at any time."] },
  {
    heading: "What we collect",
    paragraphs: ["When you sign up we collect only what the service needs:"],
    bullets: [
      "Your email address and a password, which we store only as a one-way hash, never in a readable form.",
      "A username that only you can see.",
      "Your gender and your date of birth. We use the date of birth to check you are 18 or older and to show your age.",
      "What you are looking for, who you would like to meet, your age range and the topics you like. These are used to match you.",
    ],
  },
  {
    heading: "What we collect while you use Anonmee",
    paragraphs: ["We keep a short technical record that a one-to-one chat took place (which kind of chat it was and how long you waited), but not what was said. We keep your messages in groups and in the room for everyone. We keep a list of people you have blocked and reports you have made or received. We count visits to our public pages to see which links and searches bring people here: this records where a visit came from, not who you are, and it does not store your IP address."],
  },
  {
    heading: "What other people can see",
    paragraphs: ["Another person sees a random name that changes in every chat, your gender and your age. They never see your email, username, name, date of birth, or where you are."],
  },
  {
    heading: "How long we keep things",
    paragraphs: ["We delete data when it is no longer needed:"],
    bullets: [
      "One-to-one messages are deleted when the chat ends. For up to ten minutes afterwards they can still be attached to a report.",
      "Group and room messages are deleted after 7 days.",
      "Messages attached to a report are kept for review and removed 30 days after the report is closed.",
      "Visit counts are kept for 13 months.",
      "Your account details are kept until you delete your account.",
      "Login sessions expire after 30 days of not being used.",
    ],
  },
  { heading: "Who can see account details", paragraphs: ["A small safety team can look up account details, including your email and date of birth, to deal with abuse and to run the service. Access needs two-step login, is limited by role, and every time someone opens an account it is written to a log that cannot be edited. Staff cannot read live or past one-to-one chats."] },
  { heading: "AI companions and your messages", paragraphs: ["When you chat with an AI companion, the text of that chat (the last few messages) is sent to an AI service provider so it can write the replies. We never send your email, username, date of birth or any other account detail. We do not keep a one-to-one chat after it ends, except messages saved because of a report."] },
  { heading: "Who we share data with", paragraphs: ["We do not sell your data and we do not share it for advertising. We use hosting and infrastructure providers to run Anonmee, and they process data only on our instructions. We may share information with the authorities when the law requires it or to protect someone from serious harm, and we will tell you when we are allowed to."] },
  { heading: "Where your data is processed", paragraphs: ["Anonmee is run from the servers of our hosting providers, which may be in a different country from yours. Wherever it is processed, we protect it in the same ways described here."] },
  { heading: "How we protect it", paragraphs: ["Connections are encrypted. Passwords are hashed. Login sessions are short and renew themselves. We limit and log staff access, and we test our security. No online service can promise perfect security, so we also keep to the minimum data, which limits what could ever be exposed."] },
  { heading: "Your rights", paragraphs: ["You can ask to see the data we hold about you, correct it, or delete it. You can delete your account yourself from the Me page, with your password. You can also object to or limit how we use your data, and you can complain to the data protection authority where you live. See the Your data page for how, or write to us."] },
  { heading: "Age", paragraphs: ["Anonmee is only for people who are 18 or older. We do not knowingly collect data from anyone younger, and we remove accounts we believe belong to someone under 18."] },
  { heading: "Changes and contact", paragraphs: [`We will update this page if what we do changes, and we will tell people before a significant change takes effect. Questions go to ${C.support}.`] },
];

export const TERMS_SECTIONS: ProseSection[] = [
  { heading: "Who can use Anonmee", paragraphs: ["You must be 18 or older. By signing up you confirm that you are. Anonmee has no way to check identity documents, so you are responsible for telling the truth about your age. We may suspend any account we believe belongs to someone under 18."] },
  { heading: "Your account", paragraphs: ["Keep your password private and do not share your account. You are responsible for what happens under it. Tell us straight away if you think someone else has got in. You may only have one account."] },
  {
    heading: "How to behave",
    paragraphs: ["Anonmee is for adults to talk to each other. Everything you say must be lawful and consensual. You must not:"],
    bullets: [
      "Harass, threaten, bully, or hate on anyone.",
      "Pressure someone to do or say something they have said no to, or keep going after they say stop.",
      "Ask for, or share, intimate images, money, passwords, or personal details of anyone.",
      "Try to find out who someone is, or share information that identifies them.",
      "Pretend to be someone else, scam people, or sell things.",
      "Talk to or about anyone under 18 in a sexual or romantic way. If you think someone is under 18, report them and leave.",
      "Use bots, scripts, or anything automated, or interfere with how Anonmee works.",
      "Break the law.",
    ],
  },
  { heading: "Adult conversations", paragraphs: ["Some options on Anonmee are for adults who want flirtatious or sexual conversation. Chats are text only and you only meet people who chose a matching option. Consent applies at every moment: anyone can say stop, leave, block or report, and you must respect it immediately."] },
  { heading: "AI companions", paragraphs: ["Some chat partners on Anonmee may be AI-powered companions that keep the app lively when it is quiet. They have a random name, gender and age like everyone else. They can joke, swear in a friendly way and flirt, and in one-to-one chats they can take part in adult conversation, but only with people who chose matching options when they signed up. They never ask for personal details, money or links. If you sincerely ask whether you are talking to an AI, it will say so. You can leave, block or report any chat, including one with an AI companion, at any time."] },
  { heading: "What you write", paragraphs: ["You own what you write, and you are responsible for it. You give Anonmee permission to store and show it to the other people in that chat or group so the service can work, and to keep reported messages for review. Messages in other people's chats are theirs to receive; you may not copy or publish them to identify or shame anyone."] },
  { heading: "Reports and enforcement", paragraphs: ["Anyone can report or block anyone. We act on reports. We may remove messages, suspend or end accounts, and keep records needed to prevent a banned person returning, at our discretion and without notice when safety is at risk. If you think we got it wrong, contact us and we will look again."] },
  { heading: "Deleting your account", paragraphs: ["You can delete your account at any time from the Me page. We cannot delete an account that is under review for a safety report until the review is finished."] },
  { heading: "No guarantees about other people", paragraphs: ["Anonmee introduces strangers and we cannot control or predict what they say or do. Do not share personal information, money, or contact details with someone you have just met. Meeting anyone in person is entirely at your own risk."] },
  { heading: "The service", paragraphs: ["We work to keep Anonmee available and safe, but we provide it as it is, without a promise that it will always be available or error free. We may change or stop parts of it."] },
  { heading: "Our responsibility", paragraphs: ["To the extent the law allows, Anonmee is not responsible for what users say or do, or for losses that follow from using the service. Nothing in these terms limits any right you have by law that cannot be limited."] },
  { heading: "Changes, law and contact", paragraphs: [`We may update these terms, and we will tell you about important changes. If you keep using Anonmee after a change, you accept it. These terms are governed by the laws of India, and the courts there have jurisdiction, unless your local consumer law says otherwise. Questions: ${C.support}.`] },
];

export const COOKIE_SECTIONS: ProseSection[] = [
  { heading: "The short version", paragraphs: ["We use only the small files and storage the service needs to work, plus one anonymous counter for our own visit counts. No advertising, no social-media trackers, no third-party analytics."] },
  {
    heading: "What we set",
    paragraphs: [],
    bullets: [
      "Login cookies (access and refresh): keep you signed in. Essential. They are private to the browser and cannot be read by scripts on the page.",
      "Visitor counter (vid): a random number that lets us count visits to our public pages without knowing who you are. It lasts 30 days. We do not set it if your browser sends Do Not Track or Global Privacy Control.",
      "Your theme choice (stored on your device): remembers light or dark. Never sent to us.",
      "A note of which public pages you have opened this session (stored on your device): stops us counting a reload twice. It disappears when you close the tab.",
    ],
  },
  { heading: "Choices", paragraphs: ["You can clear or block cookies in your browser settings. If you block the login cookies you will not be able to stay signed in. Turning on Do Not Track or Global Privacy Control stops the visitor counter."] },
  { heading: "Changes", paragraphs: [`If this ever changes, for example if we add something new, we will update this page first. Questions: ${C.support}.`] },
];

export const GUIDELINES_SECTIONS: ProseSection[] = [
  { heading: "Be a good stranger", paragraphs: ["You are talking to a real person who cannot see you and cannot see your reactions. Be kind, be honest, and leave when it is not working. A lot of the best conversations here start with a simple hello."] },
  { heading: "Consent comes first", paragraphs: ["Everything on Anonmee is between adults who agree to it. Say what you want, accept a no without arguing, and stop the moment someone asks. If someone does not reply, goes quiet, or changes the subject, take the hint."] },
  { heading: "What gets you removed", paragraphs: ["We act fast on these:"], bullets: ["Anything involving anyone under 18.", "Threats, harassment, hate, and doxxing.", "Pressuring, scamming, or asking for money.", "Asking for or sending intimate images (not possible on Anonmee, and a bannable attempt).", "Telling people to meet you in person, or sharing where someone lives or works.", "Spam, advertising, links to other platforms to move people elsewhere, and bots."] },
  { heading: "Staying anonymous", paragraphs: ["Your random name changes in every chat, and nobody sees your email or username. Do not share your real name, number, social accounts, or location with strangers, and do not ask others to. Once you share it, we cannot take it back."] },
  { heading: "If something goes wrong", paragraphs: ["Tap the menu in any chat to report, block or leave. Reporting also blocks, so you will never be matched with that person again, and they are never told it was you. If you are in danger, contact your local emergency services first."] },
  { heading: "Groups", paragraphs: ["Groups are public rooms with a topic. Stay on the topic, be respectful of the people in it, and report anything that breaks these guidelines. The person who starts a group does not get special powers, and we apply the same rules everywhere."] },
];

export const CHILD_SAFETY_SECTIONS: ProseSection[] = [
  { heading: "Anonmee is for adults only", paragraphs: ["You must be 18 or older. We have zero tolerance for anything that sexualises or endangers anyone under 18, and we remove it and the accounts involved at once."] },
  {
    heading: "How we keep minors out",
    paragraphs: [],
    bullets: [
      "You must give your date of birth and confirm you are 18 or older. The check runs in your browser, on our server, and in our database, so it cannot be skipped.",
      "Age is the only thing other people see about you besides gender, so someone claiming to be a minor is easy to spot.",
      "A report that someone seems to be under 18 suspends the account immediately while we look into it.",
      "Chats are text only: no photos, video or files can be shared.",
    ],
  },
  { heading: "What we cannot do", paragraphs: ["We do not check identity documents, so age is something people tell us. That is why reporting is one tap away in every chat and why we act on reports straight away."] },
  { heading: "If you see something", paragraphs: [`Report the person in the chat, then block and leave. You can also email ${C.safety}. If a child is in danger, contact your local police or child protection services straight away. In India you can reach Childline on 1098.`] },
  { heading: "What we do with reports", paragraphs: ["We preserve the reported messages, close the account, and where the law requires or a child may be at risk we pass the relevant information to the authorities. We will not tell the person who was reported who reported them."] },
  { heading: "If you are under 18", paragraphs: ["Please do not sign up. If you already did, stop using Anonmee and delete your account from the Me page. If someone online is making you uncomfortable, tell a trusted adult."] },
];

export const YOUR_DATA_SECTIONS: ProseSection[] = [
  { heading: "You are in control", paragraphs: ["You can see, correct, and delete your information. Most of it you can do yourself, instantly."] },
  { heading: "See and correct", paragraphs: ["Your username, gender and age are on the Me page, and what you are looking for can be changed there at any time. To see everything else we hold, or to correct something you cannot change yourself, write to us from your sign-up email and we will reply within 30 days."] },
  { heading: "Delete your account", paragraphs: ["Open the Me page and choose Delete my account. You will be asked for your password. This removes your account, your preferences, your messages in groups, and the groups and blocks that belonged to you. It cannot be undone."] },
  { heading: "What we may keep", paragraphs: ["We keep limited information where we have to or where it keeps people safe: reports you have made or received (so someone cannot delete their way out of a ban), a record of the safety actions we took, and anything the law requires us to keep. Accounts under a safety review cannot be deleted until the review is finished."] },
  { heading: "Other rights", paragraphs: ["Depending on where you live, you may also have the right to object to or limit how we use your data, to take a copy of it, and to complain to your data protection authority. Write to us and we will help."] },
  { heading: "How to ask", paragraphs: [`Email ${C.support} from the address you signed up with, and say what you want. We may ask you to confirm it is you before we act.`] },
];
