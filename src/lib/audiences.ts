export interface AudienceItem {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  painPoints: { problem: string; solution: string }[];
  faqs: { q: string; a: string }[];
  keywords: string[];
}

export const AUDIENCES: AudienceItem[] = [
  {
    slug: "introverts",
    title: "Anonymous Chat & Dating for Introverts",
    badge: "For Introverts",
    tagline: "Meaningful connections without the exhausting performance.",
    description:
      "Tired of camera-on pressure, noisy group chats, and superficial photo swiping? Anonmee is built for introverts who crave deep, authentic text conversations where only your thoughts and words matter.",
    painPoints: [
      {
        problem: "Exhausted by camera-on calls and photo swiping",
        solution: "Anonmee is 100% text-only with zero profile photos. No selfies required, ever.",
      },
      {
        problem: "Small talk burnout on typical social apps",
        solution: "Match by specific intent: deep talks, philosophy, venting, or quiet late-night companionship.",
      },
      {
        problem: "Pressure to maintain endless follower lists",
        solution: "Ephemeral 1:1 chats give you freedom. Leave or Skip anytime with zero social debt.",
      },
    ],
    faqs: [
      {
        q: "Why is Anonmee better for introverts than Tinder or Bumble?",
        a: "Traditional apps demand curated photo galleries and performative bios. On Anonmee, matching is based purely on mutual intent and conversation, allowing introverts to connect at their own pace without appearance anxiety.",
      },
      {
        q: "Can I leave a conversation without feeling guilty?",
        a: "Yes. Every chat features an instant Skip or Leave button. There are no follower counts or contact cards, so leaving a chat carries zero awkwardness.",
      },
    ],
    keywords: ["dating app for introverts", "make friends for introverts", "introvert chat app", "quiet stranger chat", "text only dating"],
  },
  {
    slug: "college-students",
    title: "Anonymous Chat & Dating for College Students (18+)",
    badge: "College & Uni (18+)",
    tagline: "Meet peers, date, and talk freely without campus drama.",
    description:
      "College can feel both crowded and lonely. Anonmee provides college students (18+) with a secure, anonymous outlet to date, share campus thoughts, find study buddies, and make friends without social stigma or Instagram exposure.",
    painPoints: [
      {
        problem: "Campus gossip and social media stalking",
        solution: "Your name, college, email, and photos are never revealed. Talk with complete peace of mind.",
      },
      {
        problem: "Superficial swipe apps dominated by casual hookups",
        solution: "Filter by exact desires: from long-term romance and study partners to late-night venting.",
      },
      {
        problem: "Budget constraints on expensive paid dating apps",
        solution: "Anonmee is 100% free with unlimited matching and zero paywalls.",
      },
    ],
    faqs: [
      {
        q: "Is Anonmee really free for students?",
        a: "Yes, 100% free with no premium tiers, paywalled likes, or hidden charges.",
      },
      {
        q: "Are people under 18 allowed on the app?",
        a: "No. Anonmee strictly enforces an 18+ adult age barrier. Minors are strictly prohibited to ensure a safe environment.",
      },
    ],
    keywords: ["college dating app", "anonymous student chat", "make college friends online", "campus chat anonymous", "dating for university students"],
  },
  {
    slug: "night-owls",
    title: "Late Night Chat for Night Owls & Insomniacs",
    badge: "For Night Owls",
    tagline: "For the quiet hours when the rest of the world is asleep.",
    description:
      "When everyone on your contact list is asleep, Anonmee is wide awake. Connect with night owls across the globe for late-night chats, honest life talk, and warm companionship in the small hours.",
    painPoints: [
      {
        problem: "Nobody awake to talk to at 2 AM",
        solution: "Realtime WebSocket matching instantly pairs you with someone awake and looking for the exact same late-night vibe.",
      },
      {
        problem: "Overthinking and insomnia",
        solution: "Express what is on your mind in safe, ephemeral text rooms where what you say is wiped when you finish.",
      },
      {
        problem: "Awkward next-day check-ins",
        solution: "No profiles are saved. When you close the chat, it ends cleanly with zero morning obligation.",
      },
    ],
    faqs: [
      {
        q: "Are people active late at night on Anonmee?",
        a: "Yes! Because Anonmee is global across multiple time zones, there are active adult users online 24/7.",
      },
      {
        q: "Can I just vent without expecting advice?",
        a: "Yes. Simply pick the 'Venting' or 'Late night talks' intent to match with someone who is ready to listen.",
      },
    ],
    keywords: ["late night chat", "can't sleep talk to strangers", "insomnia friends app", "night owl dating", "2am chat"],
  },
  {
    slug: "lonely-people",
    title: "Safe Place to Talk When You Feel Lonely",
    badge: "Emotional Wellbeing",
    tagline: "A kind, judgment-free ear whenever you need someone.",
    description:
      "Loneliness can hit anyone, regardless of how many followers or acquaintances you have. Anonmee offers an honest, safe space to be heard by another human being without judgment, awkwardness, or having to pretend everything is fine.",
    painPoints: [
      {
        problem: "Feeling like a burden to family or real-life friends",
        solution: "Talk to empathetic strangers who chose to be there specifically to listen and converse.",
      },
      {
        problem: "Fear of being judged for your struggles",
        solution: "Total anonymity protects your privacy: only an alias, age, and gender are visible.",
      },
      {
        problem: "Superficial conversations that don't satisfy",
        solution: "Intent matching pairs you with people looking for deep conversation, not surface-level banter.",
      },
    ],
    faqs: [
      {
        q: "Is Anonmee a therapy app?",
        a: "Anonmee is a peer-to-peer anonymous social platform, not professional clinical therapy. However, many users find peer conversations deeply comforting.",
      },
      {
        q: "What if someone says something triggering?",
        a: "You can click Skip or Block instantly with one tap to leave immediately and ensure you never match with them again.",
      },
    ],
    keywords: ["feeling lonely talk to someone", "lonely chat app", "talk to strangers when lonely", "kind stranger chat", "safe venting app"],
  },
  {
    slug: "lgbtq",
    title: "Affirming Anonymous LGBTQ+ Dating & Community",
    badge: "LGBTQ+ Safe",
    tagline: "Connect openly, explore identity, and date without fear.",
    description:
      "Whether you are out and proud, exploring your identity, or seeking open-minded connections in an unsupportive environment, Anonmee provides a private, affirming haven for LGBTQ+, trans, bi-curious, and queer adults.",
    painPoints: [
      {
        problem: "Safety risks of public dating apps in unsupportive areas",
        solution: "Zero photos or location stalking. Only age and gender are visible, keeping you secure.",
      },
      {
        problem: "Fear of being outed to coworkers or family",
        solution: "No connection to phone contacts, social networks, or email addresses.",
      },
      {
        problem: "Finding genuine queer and bi-curious peers",
        solution: "Dedicated matching filters for same-gender, bi-curious, and open-minded relationships.",
      },
    ],
    faqs: [
      {
        q: "Is Anonmee inclusive of all gender identities?",
        a: "Yes. Anonmee supports male, female, trans man, trans woman, non-binary, and custom gender preferences.",
      },
      {
        q: "How does the same-gender filter work?",
        a: "The 'same_gender' intent is symmetric: it only pairs two people who share the exact same gender.",
      },
    ],
    keywords: ["lgbtq anonymous dating", "queer chat app", "bi-curious chat", "trans safe dating app", "non binary friend finder"],
  },
  {
    slug: "over-30",
    title: "Anonymous Dating & Meaningful Talks for Adults 30+",
    badge: "Adults 30+",
    tagline: "Mature conversations for adults who value substance over games.",
    description:
      "Tired of Gen-Z slang, endless swiping games, and ghosting culture? Anonmee's age-filtered matching connects adults in their 30s, 40s, and beyond who value thoughtful dialogue, emotional maturity, and authentic dating.",
    painPoints: [
      {
        problem: "Dating apps dominated by 20-somethings looking for hookups",
        solution: "Customizable age range filters ensure you only match with adults within your desired bracket.",
      },
      {
        problem: "Lack of time for hours of swiping and small talk",
        solution: "Instant matching connects you directly into active 1:1 conversation in seconds.",
      },
      {
        problem: "Privacy concerns regarding professional or marital status",
        solution: "Zero corporate or LinkedIn association. Speak your mind with complete anonymity.",
      },
    ],
    faqs: [
      {
        q: "Can I set an exact age range for matches?",
        a: "Yes. In your preferences you can configure minimum and maximum age bounds (e.g., 30 to 45).",
      },
      {
        q: "What types of relationships can I look for?",
        a: "From long-term relationships and marriage-minded dating to casual companionship and friendship.",
      },
    ],
    keywords: ["dating app over 30", "mature anonymous dating", "make friends in 30s", "dating for adults 40+", "mature stranger chat"],
  },
];

export const audienceBySlug = (slug: string) => AUDIENCES.find((a) => a.slug === slug);
