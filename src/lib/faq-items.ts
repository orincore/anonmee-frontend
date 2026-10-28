export interface FaqItem {
  q: string;
  a: string;
}

/** Plain text answers shared across landing FAQ, FAQ page, JSON-LD structured data, and LLM text files. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Are all the people on Anonmee real?",
    a: "Not always. Some chat partners may be AI-powered companions that keep the app lively when it is quiet. They show a random name, gender and age like everyone else, and they can joke, flirt and, in one-to-one chats, take part in adult conversation, but only with people who chose matching options when they signed up. If you sincerely ask whether you are talking to an AI, it will say so, and you can leave, block or report any chat.",
  },
  {
    q: "What is Anonmee Dating App?",
    a: "Anonmee is the premier free anonymous dating app and private stranger chat platform for adults 18+. Unlike traditional dating apps that force you to upload photos and swipe endlessly on appearances, Anonmee matches you with singles and strangers based strictly on mutual intent (dating, romance, flirting, deep conversation, or friendship) with zero photo pressure. Your identity is 100% protected under a random pseudonym, and chats are ephemeral.",
  },
  {
    q: "Who can use Anonmee?",
    a: "Adults only. You must be 18 or older to sign up. We ask for your date of birth and verify age on our server before creating an account.",
  },
  {
    q: "Can I use Anonmee as an anonymous dating app?",
    a: "Yes! Anonmee is designed for authentic anonymous dating and romance. You can pick exact intents like casual dating, flirting, long-term relationship, online romance, or open-minded connections. You are matched only with someone who picked the exact same intent, without any photo superficiality or swipe bias.",
  },
  {
    q: "Can I use Anonmee to make genuine friends?",
    a: "Absolutely. Many people use Anonmee as a friendship app to find friends who share their interests, mindset, or late-night schedules. When you choose 'Friendship', you connect with peers looking for authentic conversation and companionship.",
  },
  {
    q: "What can other people see about me in chat?",
    a: "Other users only see a random alias (e.g., 'SwiftFalcon') that changes in every conversation, your gender, and your age. Your email, username, real name, and date of birth are completely hidden and never disclosed.",
  },
  {
    q: "How does the random stranger chat matching work?",
    a: "Anonmee uses a realtime two-way intent matching engine. You specify what you want (friendship, dating, casual talk, deep thoughts) and who you want to meet (gender and age range). Our WebSocket engine pairs you in under a second with someone whose mutual preferences match yours perfectly.",
  },
  {
    q: "How does the Skip button work during chat?",
    a: "Every live 1:1 chat features an instant 'Skip' button. If either user clicks Skip, the current chat ends immediately and both users are automatically re-queued into the matching engine to connect with new strangers without any awkward delay.",
  },
  {
    q: "How is Anonmee different from Tinder, Bumble, or Omegle?",
    a: "Unlike Tinder or Bumble, Anonmee eliminates superficial photo swiping, paid paywalls, and social media stalking — matching is based purely on intent, vibe, and conversation. Unlike Omegle or Chatroulette, Anonmee is strictly adults-only (18+), text-only (no unsolicited video/camera feeds), and pairs users by specific topics and mutual desires.",
  },
  {
    q: "Does Anonmee keep my chat messages?",
    a: "One-to-one chats are ephemeral and wiped from memory the moment a chat ends. Group messages are automatically expunged after 7 days. If a user is reported for safety violations, the reported snippet is held temporarily for moderator review.",
  },
  {
    q: "Is Anonmee friendly for LGBTQ+, bi-curious, and open-minded dating?",
    a: "Yes. Anonmee has dedicated intent categories for same-gender matching, bi-curious exploration, polyamory, open relationships, and gender-inclusive connections in a safe, non-judgmental environment.",
  },
  {
    q: "Can I send photos or files?",
    a: "No. Anonmee is strictly text-only. Disallowing image/file uploads prevents unsolicited media, spam, and privacy leaks, keeping the platform safe and comfortable for everyone.",
  },
  {
    q: "What if someone is rude, inappropriate, or violates guidelines?",
    a: "Every chat has instant Report and Block controls accessible in one tap. Once blocked or reported, you will never be matched with that person again, and reports are reviewed swiftly by our human safety team.",
  },
  {
    q: "Is Anonmee free to use?",
    a: "Yes. 1:1 matching, group rooms, filtering, and unlimited chats are 100% free with no premium paywalls or hidden subscriptions.",
  },
];
