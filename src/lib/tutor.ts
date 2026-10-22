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
  "topic",
  "azure",
  "cloud",
  "me",
  "i",
  "my",
  "we",
  "our",
  "be",
  "as",
  "at",
  "do",
  "if",
  "than",
  "then",
  "also",
  "really",
  "work",
  "works",
  "working",
  "mean",
  "means",
  "explain",
  "understand",
  "learn",
]);

// Expand common abbreviations and everyday wording into study terms.
const SYNONYMS: { pattern: RegExp; extra: string }[] = [
  { pattern: /\bmfa\b|\b2fa\b|two.factor authentication/, extra: "multi factor authentication" },
  { pattern: /\brbac\b/, extra: "role based access control permissions" },
  { pattern: /\bvms?\b|virtual machine/, extra: "virtual machines compute" },
  { pattern: /\bsaas\b/, extra: "software as a service" },
  { pattern: /\bpaas\b/, extra: "platform as a service" },
  { pattern: /\biaas\b/, extra: "infrastructure as a service" },
  { pattern: /\bcapex\b/, extra: "capital expenditure" },
  { pattern: /\bopex\b/, extra: "operational expenditure" },
  { pattern: /\b2fa\b|multi.factor/, extra: "authentication identity access" },
  { pattern: /\bsso\b/, extra: "single sign on identity" },
  { pattern: /\bvm\b/, extra: "virtual machine compute" },
  { pattern: /\bvnet\b/, extra: "virtual network networking" },
  {
    pattern: /\biac\b|\binfrastructure as code\b/,
    extra: "arm templates bicep repeatable deployment",
  },
  { pattern: /\bpay as you go\b|\bpayg\b/, extra: "consumption based pricing" },
  {
    pattern:
      /\bwhat i will pay\b|\bpay each month\b|\bbefore building\b|\bestimate costs\b|\bpricing calculator\b/,
    extra:
      "Azure cost management Azure Pricing Calculator budget spending estimate before deployment",
  },
  { pattern: /\bdata copies\b|\breplication\b/, extra: "storage redundancy" },
  {
    pattern: /\bprevent deletion\b|\baccidental deletion\b|\bdeleting\b|\bdelete\b|\bdeletion\b/,
    extra: "resource locks Azure Policy CanNotDelete protect resources",
  },
  {
    pattern: /\bby accident\b|\baccidentally\b|\bstop someone\b/,
    extra: "resource locks CanNotDelete prevent accidental deletion",
  },
  { pattern: /\bcommand line\b/, extra: "azure cli powershell cloud shell" },
  { pattern: /\boutage\b|\bplanned maintenance\b/, extra: "azure service health incidents" },
  {
    pattern: /\bslow app\b|\bapplication performance\b/,
    extra: "azure monitor application insights",
  },
  { pattern: /\bsecurity recommendations\b/, extra: "defender for cloud security posture" },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expandQuestion(question: string): string {
  let expanded = normalize(question);

  for (const { pattern, extra } of SYNONYMS) {
    if (pattern.test(question.toLowerCase())) {
      expanded += ` ${normalize(extra)}`;
    }
  }

  return normalize(expanded);
}

function getTopicText(topic: Topic): string {
  return normalize(
    [
      topic.title,
      topic.simple,
      topic.example,
      ...(topic.aliases ?? []),
      ...(topic.keyPoints ?? []),
      ...(topic.commonConfusions ?? []),
      topic.checkQuestion ?? "",
      topic.checkAnswer ?? "",
    ].join(" "),
  );
}

/** Find the study-note topic that best matches a question, or null. */
export function findTopic(question: string): Topic | null {
  const original = normalize(question);
  const expanded = expandQuestion(question);

  if (!original) return null;

  const words = expanded.split(" ").filter((word) => word.length > 2 && !STOPWORDS.has(word));

  let best: Topic | null = null;
  let bestScore = 0;

  for (const topic of topics) {
    const title = normalize(topic.title);
    const aliases = (topic.aliases ?? []).map(normalize);
    const allText = getTopicText(topic);
    let score = 0;

    // Strongly reward an exact topic title or alias.
    if (original === title) score += 12;
    if (original.includes(title) && title.length > 0) score += 8;

    for (const alias of aliases) {
      if (!alias) continue;

      if (original === alias) {
        score += 10;
      } else if (alias.length > 3 && ` ${original} `.includes(` ${alias} `)) {
        score += 7;
      } else if (alias.length > 3 && ` ${expanded} `.includes(` ${alias} `)) {
        score += 5;
      }
    }

    // Topic titles are more important than general explanatory text.
    const titleWords = normalize(title).split(" ");
    for (const word of words) {
      if (titleWords.includes(word)) {
        score += 3;
      } else if (aliases.some((alias) => alias.split(" ").includes(word))) {
        score += 2;
      } else if (allText.split(" ").includes(word)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }

  // Avoid guessing a topic when the question is too vague.
  return best && bestScore >= 3 ? best : null;
}

function relatedTopics(topic: Topic): string {
  return topics
    .filter((item) => item.domain === topic.domain && item.id !== topic.id)
    .slice(0, 2)
    .map((item) => item.title)
    .join(", ");
}

function buildAnswer(topic: Topic, mode: TutorMode): string {
  let answer = `**${topic.title}**\n\n${topic.simple}`;

  if (mode === "african") {
    answer += `\n\n🌍 **Real-life example:** ${topic.example}`;
  } else {
    answer += `\n\n💡 **Example:** ${topic.example}`;
  }

  if (topic.keyPoints?.length) {
    answer += "\n\n**Key points to remember:**";
    answer += topic.keyPoints.map((point) => `\n- ${point}`).join("");
  }

  if (topic.commonConfusions?.length) {
    answer += "\n\n**Common exam traps:**";
    answer += topic.commonConfusions.map((point) => `\n- ${point}`).join("");
  }

  if (topic.checkQuestion) {
    answer += `\n\n🧠 **Quick self-check:** ${topic.checkQuestion}`;

    if (topic.checkAnswer) {
      answer += `\n\n**Answer:** ${topic.checkAnswer}`;
    }
  }

  const related = relatedTopics(topic);

  if (related) {
    answer += `\n\n**You can also explore:** ${related}.`;
  }

  return answer;
}

function fallbackAnswer(): string {
  const suggestions = topics.map((topic) => `- ${topic.title}`).join("\n");

  return (
    "I couldn't confidently match that question to my current notes. " +
    "I'm an offline study tutor, so I don't want to guess and teach you the wrong thing.\n\n" +
    "**Try asking about one of these topics:**\n" +
    suggestions +
    "\n\nTip: Ask a specific question, such as " +
    '"What is the difference between authentication and authorization?"'
  );
}

export const offlineTutor: TutorProvider = {
  async ask({ question, mode, language }) {
    // Small delay to keep the existing chat interaction natural.
    await new Promise((resolve) => setTimeout(resolve, 300));

    const topic = findTopic(question);

    if (!topic) {
      return fallbackAnswer();
    }

    let answer = buildAnswer(topic, mode);

    if (mode === "local" && language) {
      answer =
        `${greetings[language]}\n\n${answer}\n\n` +
        `_This offline version currently provides the main explanation in English. ` +
        `Full ${language} explanations require a language-capable AI service._`;
    }

    return answer;
  },
};

export const activeTutor: TutorProvider = offlineTutor;
