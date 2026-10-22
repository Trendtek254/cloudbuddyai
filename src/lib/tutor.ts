// Modular tutor provider. The default is an offline provider that answers from
// the built-in topic notes. Replace `activeTutor` with a server-backed provider
// later (keep API keys on the server) without changing the Tutor page.
import { topics } from "@/data/content";

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

function findTopic(q: string) {
  
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

function findTopic(question: string) {
  const normalized = question
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let bestTopic: (typeof topics)[number] | null = null;
  let bestScore = 0;

  for (const topic of topics) {
    const keywords = topicKeywords[topic.id] ?? [];
    let score = 0;

    for (const keyword of keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.includes(" ") ? 3 : 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestScore > 0 ? bestTopic : null;
}

}

export const offlineTutor: TutorProvider = {
  async ask({ question, mode, language }) {
    await new Promise((r) => setTimeout(r, 500));
    const t = findTopic(question);
    if (!t)
      return "I don't have notes on that yet. Try asking about cloud models, IaaS/PaaS/SaaS, regions, identity, pricing, or policies.";
    let out = `**${t.title}**\n\n${t.simple}`;
    if (mode === "african") out += `\n\n🌍 Real-life example: ${t.example}`;
    if (mode === "local" && language)
      out = `${greetings[language]}\n\n${out}\n\n_Full ${language} explanations will be available once the AI tutor is connected. The key idea above is in simple English for now._`;
    return out;
  },
};

export const activeTutor: TutorProvider = offlineTutor;
