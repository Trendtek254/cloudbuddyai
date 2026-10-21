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
  const words = q.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  let best = topics[0];
  let bestScore = 0;
  for (const t of topics) {
    const hay = `${t.title} ${t.simple}`.toLowerCase();
    const score = words.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0);
    if (score > bestScore) {
      best = t;
      bestScore = score;
    }
  }
  return bestScore > 0 ? best : null;
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
