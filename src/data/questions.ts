import type { DomainId } from "./content";

export interface Question {
  id: string;
  domain: DomainId;
  topic: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

// Original practice questions written from the public skills outline. Not official exam content.
export const questions: Question[] = [
  {
    id: "q1",
    domain: "cloud",
    topic: "Consumption-based pricing",
    prompt:
      "A small business wants to avoid buying servers upfront and pay only for what it uses. Which cloud benefit fits best?",
    options: [
      "Capital expenditure (CapEx)",
      "Consumption-based pricing",
      "Fixed annual licensing",
      "Owning a private data centre",
    ],
    answer: 1,
    explanation:
      "Consumption-based pricing means you pay for actual usage, avoiding large upfront purchases. CapEx and owning a data centre are the opposite.",
  },
  {
    id: "q2",
    domain: "cloud",
    topic: "IaaS, PaaS and SaaS",
    prompt:
      "You want to use a finished email application without managing any servers or code. Which service type is this?",
    options: ["IaaS", "PaaS", "SaaS", "On-premises"],
    answer: 2,
    explanation:
      "SaaS delivers complete software ready to use. IaaS and PaaS require you to manage more of the stack.",
  },
  {
    id: "q3",
    domain: "cloud",
    topic: "Shared responsibility model",
    prompt: "In every cloud service type, which responsibility always stays with the customer?",
    options: [
      "Physical security of data centres",
      "Their data and user access",
      "Replacing failed hard drives",
      "Data centre power and cooling",
    ],
    answer: 1,
    explanation:
      "Customers always own their data, accounts and access. Physical facilities are the provider's job.",
  },
  {
    id: "q4",
    domain: "cloud",
    topic: "Public, private and hybrid cloud",
    prompt:
      "An organisation keeps sensitive records in its own data centre but runs its website on a public cloud. What model is this?",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community app"],
    answer: 2,
    explanation: "Combining private infrastructure with public cloud services is a hybrid cloud.",
  },
  {
    id: "q5",
    domain: "architecture",
    topic: "Regions and availability zones",
    prompt: "What is the main purpose of availability zones?",
    options: [
      "Lower software licence prices",
      "Protect apps from a single data centre failure",
      "Translate apps into local languages",
      "Store backups on users' laptops",
    ],
    answer: 1,
    explanation:
      "Availability zones are physically separate locations within a region, improving resilience if one location fails.",
  },
  {
    id: "q6",
    domain: "architecture",
    topic: "Compute",
    prompt:
      "Which compute option runs small pieces of code only when an event happens, without you managing servers?",
    options: ["Virtual machines", "Serverless functions", "Physical servers", "Dedicated hosts"],
    answer: 1,
    explanation:
      "Serverless functions are event-driven and you don't manage servers. VMs and hosts require more management.",
  },
  {
    id: "q7",
    domain: "architecture",
    topic: "Identity and access",
    prompt:
      "A user signs in with a password and then confirms a code sent to their phone. What is this?",
    options: ["Single sign-on", "Multi-factor authentication", "Role tagging", "Resource locking"],
    answer: 1,
    explanation: "Using two or more different proofs of identity is multi-factor authentication.",
  },
  {
    id: "q8",
    domain: "architecture",
    topic: "Storage and redundancy",
    prompt: "Why would you choose storage redundancy that copies data to another region?",
    options: [
      "To make files load in a different font",
      "To keep data available if a whole region has an outage",
      "To reduce the number of users",
      "To avoid using passwords",
    ],
    answer: 1,
    explanation: "Copying data to a separate region protects it against a large regional outage.",
  },
  {
    id: "q9",
    domain: "governance",
    topic: "Policies, locks and tags",
    prompt:
      "You want to stop anyone from accidentally deleting an important resource. What should you use?",
    options: ["A tag", "A resource lock", "A pricing calculator", "A virtual network"],
    answer: 1,
    explanation:
      "Resource locks prevent accidental deletion or changes. Tags only label resources.",
  },
  {
    id: "q10",
    domain: "governance",
    topic: "Cost management",
    prompt:
      "Before building a solution, you want to estimate its monthly cost. Which tool type helps most?",
    options: [
      "A pricing calculator",
      "A resource lock",
      "Multi-factor authentication",
      "A load balancer",
    ],
    answer: 0,
    explanation:
      "A pricing calculator estimates costs before deployment. The others solve security or networking needs.",
  },
];
