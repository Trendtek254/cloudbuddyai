// Modular tutor provider. The default is an offline provider that answers from
// the built-in topic notes. Replace `activeTutor` with a server-backed provider
// later (keep API keys on the server) without changing the Tutor page.
import { topics, type Topic } from "@/data/content";

export type TutorMode = "simple" | "african" | "local";
export type LocalLanguage = "Swahili" | "Yoruba" | "Hausa" | "Zulu" | "Amharic";

export interface TutorRequest {
  question: string;
  mode: TutorMode;
  language?: LocalLanguage;
}

export interface TutorProvider {
  ask(req: TutorRequest): Promise<string>;
}

const greetings: Record<LocalLanguage, string> = {
  Swahili: "Habari! Hebu tujifunze pamoja.",
  Yoruba: "Ẹ kú àbọ̀! Ẹ jẹ́ ká kẹ́kọ̀ọ́ papọ̀.",
  Hausa: "Sannu! Mu koya tare.",
  Zulu: "Sawubona! Ake sifunde ndawonye.",
  Amharic: "ሰላም! አብረን እንማር።",
};

// Words that carry no topic meaning on their own.
const STOPWORDS = new Set([
  "what",
  "who",
  "when",
  "where",
  "which",
  "why",
  "how",
  "does",
  "did",
  "can",
  "could",
  "should",
  "would",
  "tell",
  "about",
  "explain",
  "describe",
  "give",
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "in",
  "on",
  "to",
  "for",
  "with",
  "is",
  "are",
  "was",
  "were",
  "it",
  "its",
  "that",
  "this",
  "there",
  "their",
  "you",
  "your",
  "please",
  "thanks",
  "hello",
  "study",
  "buddy",
  "difference",
  "between",
  "versus",
  "example",
  "examples",
  "topic",
  "azure",
  "cloud",
]);

// Common abbreviations and casual phrasing mapped onto the study notes.
const SYNONYMS: { pattern: RegExp; extra: string }[] = [
  { pattern: /\bmfa\b|two[- ]factor|2fa\b/, extra: "multi factor authentication" },
  { pattern: /\bvms?\b|virtual machine/, extra: "virtual machines compute" },
  { pattern: /\bserverless\b|\bfunctions?\b/, extra: "serverless functions compute" },
  { pattern: /\bsaas\b/, extra: "software as a service" },
  { pattern: /\bpaas\b/, extra: "platform as a service" },
  { pattern: /\biaas\b|\bhaas\b/, extra: "infrastructure as a service" },
  { pattern: /\bcapex\b/, extra: "capital expenditure upfront" },
  { pattern: /\bopex\b/, extra: "operational expenditure running costs" },
  { pattern: /\bzones?\b/, extra: "regions availability zones" },
  {
    pattern: /\bpricing\b|\bcosts?\b|\bexpensive\b|\bbilling\b/,
    extra: "cost management pricing calculator pay as you go",
  },
  {
    pattern:
      /\bpermissions?\b|\baccess\b|\broles?\b|\bsign ?in\b|\blog ?in\b|\bpasswords?\b|\bid\b|\bidentity\b/,
    extra: "identity access authentication authorization multi factor",
  },
  {
    pattern: /\bbackups?\b|\bredundanc\w*|\bstorage\b|\bfiles\b/,
    extra: "storage redundancy copies",
  },
  {
    pattern: /\block(s|ing)?\b|\btags?\b|\bpolic(y|ies)\b|\brules\b|\bcompliance\b|\bgovernance\b/,
    extra: "policies locks tags governance",
  },
  {
    pattern: /\bdelet\w*|\bprevent\w*|\bprotect\w*|\baccident\w*|\bstop\b/,
    extra: "locks prevent accidental deletion",
  },
  {
    pattern: /\bpay\b|\bpayment|\bspending\b|\bbudget\w*|\bcharge/,
    extra: "cost management pricing calculator pay as you go",
  },
  {
    pattern: /\bmonitor\w*|\bdashboards?\b|\bportal\b|\bcli\b|\bcommand line\b|\btemplates?\b/,
    extra: "monitoring management tools portal",
  },
  { pattern: /\bhybrid\b|\bpublic\b|\bprivate\b/, extra: "public private hybrid cloud models" },
  {
    pattern: /\bsecurity\b|\bresponsible\b|\bresponsibilit\w*/,
    extra: "shared responsibility model security",
  },
];

const topicKeywords: Record<string, string[]> = {
  "what-is-cloud": [
    "cloud computing", "what is cloud", "cloud definition",
    "cloud services", "cloud over internet",
  ],
  "shared-responsibility": [
    "shared responsibility", "who is responsible",
    "cloud security", "customer responsibility",
    "provider responsibility",
  ],
  "pay-as-you-go": [
    "pay as you go", "consumption based", "capex", "opex",
    "only pay", "pay for what you use",
  ],
  "iaas-paas-saas": [
    "iaas", "paas", "saas", "service models",
    "infrastructure as a service", "platform as a service",
    "software as a service",
  ],
  "cloud-models": [
    "public cloud", "private cloud", "hybrid cloud",
    "cloud deployment models",
  ],
  regions: [
    "azure region", "availability zone", "availability zones",
    "geographic area", "regional datacenter",
  ],
  compute: [
    "virtual machine", "virtual machines", "container",
    "containers", "serverless", "azure functions", "compute",
  ],
  storage: [
    "cloud storage", "redundancy", "backup", "data copies",
    "storage redundancy",
  ],
  identity: [
    "authentication", "authorization", "identity",
    "multi factor authentication", "mfa", "access control",
  ],
  "cost-management": [
    "cost management", "pricing calculator", "azure cost",
    "budget", "spending", "cost alerts",
  ],
  policy: [
    "azure policy", "resource locks", "tags",
    "governance rules", "prevent deletion",
  ],
  monitoring: [
    "monitoring", "resource health", "performance",
    "azure portal", "command line", "management tools",
  ],
};

/** Find the study-note topic that best matches a question, or null. */
export function findTopic(q: string): Topic | null {
  const lower = q.toLowerCase();
  let text = lower;
  for (const { pattern, extra } of SYNONYMS) {
    if (pattern.test(lower)) text += ` ${extra}`;
  }

  const words = text
    .split(/\W+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));

  if (words.length === 0) return null;

  let best: Topic | null = null;
  let bestScore = 0;
  let secondScore = 0;

  for (const topic of topics) {
    const title = topic.title.toLowerCase();
    const body = `${topic.simple} ${topic.example}`.toLowerCase();
    const keywordHits = topicKeywords[topic.id] ?? [];
    let score = 0;

    for (const word of words) {
      if (title.includes(word)) {
        score += 3;
      } else if (body.includes(word)) {
        score += 1;
      }
    }

    for (const keyword of keywordHits) {
      const normalizedKeyword = keyword.toLowerCase();
      if (text.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ") ? 3 : 1;
      }
    }

    if (score > bestScore) {
      secondScore = bestScore;
      bestScore = score;
      best = topic;
    } else if (score > secondScore) {
      secondScore = score;
    }
  }

  if (!best || bestScore < 3) return null;
  void secondScore;
  return best;
}

/** Other topics in the same domain that could help. */
function relatedTopics(t: Topic): string {
  return topics
    .filter((x) => x.domain === t.domain && x.id !== t.id)
    .map((x) => x.title)
    .slice(0, 2)
    .join(", ");
}

}

export const offlineTutor: TutorProvider = {
  async ask({ question, mode, language }) {
    await new Promise((r) => setTimeout(r, 400));
    const t = findTopic(question);
    if (!t)
      return `I don't have notes on that yet. I can explain topics like:\n${topics
        .map((x) => `- ${x.title}`)
        .join("\n")}\n\nTry asking about one of those in your own words.`;
    let out = `**${t.title}**\n\n${t.simple}`;
    if (mode === "african") out += `\n\n🌍 Real-life example: ${t.example}`;
    else out += `\n\n💬 In everyday life: ${t.example}`;
    const related = relatedTopics(t);
    if (related) out += `\n\nRelated topics you can ask me about: ${related}.`;
    if (mode === "local" && language)
      out = `${greetings[language]}\n\n${out}\n\n_Full ${language} explanations will be available once the AI tutor is connected. The key idea above is in simple English for now._`;
    return out;
  },
};

export const activeTutor: TutorProvider = offlineTutor;
