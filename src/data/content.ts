export type DomainId = "cloud" | "architecture" | "governance";

export const STUDY_GUIDE_URL =
  "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900";

export interface Topic {
  id: string;
  domain: DomainId;
  title: string;
  simple: string;
  example: string;
}

export const domains: { id: DomainId; title: string; blurb: string }[] = [
  { id: "cloud", title: "Cloud Concepts", blurb: "What the cloud is, why people use it, and the main service types." },
  { id: "architecture", title: "Azure Architecture & Services", blurb: "Regions, compute, networking, storage and identity building blocks." },
  { id: "governance", title: "Azure Management & Governance", blurb: "Costs, rules, compliance and the tools used to manage resources." },
];

export const topics: Topic[] = [
  { id: "what-is-cloud", domain: "cloud", title: "What is cloud computing?", simple: "Cloud computing means renting computing power, storage and software over the internet instead of buying and running your own machines.", example: "Like using a matatu or trotro instead of buying a car — you pay for the ride when you need it." },
  { id: "shared-responsibility", domain: "cloud", title: "Shared responsibility model", simple: "The cloud provider and the customer split security duties. The provider secures the physical data centres; you always look after your data and who can access it.", example: "Renting a shop in a market: the landlord fixes the roof and walls, but you lock your stock and choose who gets a key." },
  { id: "pay-as-you-go", domain: "cloud", title: "Consumption-based pricing", simple: "You pay only for what you use, turning big upfront costs (CapEx) into ongoing running costs (OpEx).", example: "Prepaid electricity tokens: you top up and pay for the units you actually consume." },
  { id: "iaas-paas-saas", domain: "cloud", title: "IaaS, PaaS and SaaS", simple: "IaaS gives you virtual machines to manage. PaaS gives you a ready platform to run your app. SaaS gives you finished software to use.", example: "Making jollof: IaaS is renting a kitchen, PaaS is a kitchen with ingredients ready, SaaS is ordering the finished plate." },
  { id: "cloud-models", domain: "cloud", title: "Public, private and hybrid cloud", simple: "Public cloud is shared infrastructure run by a provider. Private cloud is used by one organisation. Hybrid combines both.", example: "A family uses its own borehole (private) and also the city water supply (public) when needed — that is hybrid." },
  { id: "regions", domain: "architecture", title: "Regions and availability zones", simple: "A region is a geographic area with data centres. Availability zones are separate buildings within a region, so one failure doesn’t take everything down.", example: "A bank keeps branches in different parts of Lagos so one power cut doesn’t close all of them." },
  { id: "compute", domain: "architecture", title: "Compute: VMs, containers, functions", simple: "Virtual machines are full computers in the cloud. Containers package an app lightly. Serverless functions run small pieces of code only when triggered.", example: "A function is like a boda boda you call only when you need a quick trip." },
  { id: "storage", domain: "architecture", title: "Storage and redundancy", simple: "Cloud storage keeps files, data and backups. Redundancy options keep extra copies in other places in case one fails.", example: "Keeping copies of your certificates at home and with a relative in another town." },
  { id: "identity", domain: "architecture", title: "Identity and access", simple: "Identity services check who you are (authentication) and what you can do (authorization). Multi-factor authentication adds an extra proof like a phone code.", example: "Mobile money: your PIN plus your phone together prove it is you." },
  { id: "cost-management", domain: "governance", title: "Cost management", simple: "Pricing calculators estimate costs before you build, and cost tools track and alert you on spending afterwards.", example: "Planning a wedding budget before buying, then tracking receipts so you don’t overspend." },
  { id: "policy", domain: "governance", title: "Policies, locks and tags", simple: "Policies enforce rules on resources, locks prevent accidental deletion, and tags label resources for organising and billing.", example: "School rules (policy), a padlock on the exam cupboard (lock), and name labels on lunch boxes (tags)." },
  { id: "monitoring", domain: "governance", title: "Monitoring and tools", simple: "You can manage resources through a web portal, command-line tools or templates, and monitor their health and performance with built-in services.", example: "A farmer checking a dashboard of rain and soil sensors instead of walking every field." },
];
