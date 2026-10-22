export type DomainId = "cloud" | "architecture" | "governance";

export const STUDY_GUIDE_URL =
  "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900";

export interface Topic {
  id: string;
  domain: DomainId;
  title: string;
  simple: string;
  example: string;
  aliases?: string[];
  keyPoints?: string[];
  commonConfusions?: string[];
  checkQuestion?: string;
  checkAnswer?: string;
}

export const domains: { id: DomainId; title: string; blurb: string }[] = [
  {
    id: "cloud",
    title: "Cloud Concepts",
    blurb: "Cloud computing, benefits, pricing, responsibility and service models.",
  },
  {
    id: "architecture",
    title: "Azure Architecture & Services",
    blurb: "Azure infrastructure, compute, networking, storage, identity and security.",
  },
  {
    id: "governance",
    title: "Azure Management & Governance",
    blurb: "Costs, compliance, deployment, governance and monitoring tools.",
  },
];

export const topics: Topic[] = [
  // =========================================================
  // DOMAIN 1: CLOUD CONCEPTS
  // =========================================================
  {
    id: "what-is-cloud",
    domain: "cloud",
    title: "What is cloud computing?",
    aliases: ["cloud", "cloud computing", "online infrastructure"],
    simple:
      "Cloud computing means accessing computing resources such as servers, storage, databases and software over a network instead of owning and maintaining all the physical equipment yourself.",
    example:
      "Instead of buying a powerful server for a school application, the school rents computing resources from a cloud provider and accesses them over the internet.",
    keyPoints: [
      "Resources can be provisioned when needed.",
      "Capacity can be adjusted as demand changes.",
      "The provider operates the underlying cloud infrastructure.",
      "Customers still manage the parts they are responsible for.",
    ],
    commonConfusions: [
      "Cloud computing does not mean that physical computers disappear. Cloud services still run on physical infrastructure.",
      "Moving to the cloud does not automatically make every application cheaper or more secure.",
    ],
    checkQuestion: "What is the main idea behind cloud computing?",
    checkAnswer:
      "Accessing computing resources as services instead of having to own and operate all the underlying hardware yourself.",
  },
  {
    id: "cloud-benefits",
    domain: "cloud",
    title: "Benefits of cloud computing",
    aliases: [
      "scalability",
      "elasticity",
      "reliability",
      "predictability",
      "high availability",
      "manageability",
      "cloud advantages",
    ],
    simple:
      "Cloud services can help organizations adjust capacity, maintain service availability, estimate performance, manage resources centrally and use built-in security and governance capabilities.",
    example:
      "An online shop may increase its computing capacity during a busy sale and reduce it when customer traffic falls.",
    keyPoints: [
      "High availability aims to keep a service accessible.",
      "Scalability means increasing or decreasing capacity to meet demand.",
      "Elasticity means adjusting capacity as demand changes, often automatically.",
      "Reliability concerns consistent operation and recovery from failures.",
      "Predictability means making performance or cost more predictable.",
      "Manageability includes tools for deploying, monitoring and maintaining resources.",
    ],
    commonConfusions: [
      "Scalability is the ability to handle changing workloads; availability is about keeping a service accessible.",
      "Cloud services offer capabilities, but correct architecture and configuration are still necessary.",
    ],
    checkQuestion:
      "A website automatically adds capacity during a traffic spike. Which benefit is demonstrated?",
    checkAnswer:
      "Elasticity: capacity adjusts to changing demand. This is also an example of scaling.",
  },
  {
    id: "shared-responsibility",
    domain: "cloud",
    title: "Shared responsibility model",
    aliases: [
      "shared responsibility",
      "security responsibilities",
      "customer responsibility",
      "provider responsibility",
    ],
    simple:
      "The cloud provider and customer share security and operational responsibilities. The provider manages the physical cloud infrastructure, while the customer remains responsible for certain things such as data, identities and access. The exact division depends on the service.",
    example:
      "A provider secures the physical data centre. A customer must still protect their account, configure access correctly and handle their data responsibly.",
    keyPoints: [
      "The provider is responsible for the physical infrastructure of its cloud.",
      "Customers are always responsible for their data and identities, and for managing access appropriately.",
      "With IaaS, customers manage more of the operating system and application environment.",
      "With PaaS, the provider manages more of the underlying platform.",
      "With SaaS, the provider manages the application platform, but customers still manage their data and user access.",
    ],
    commonConfusions: [
      "Moving to the cloud does not transfer every security responsibility to Microsoft.",
      "Customer responsibility does not remain identical across IaaS, PaaS and SaaS.",
    ],
    checkQuestion:
      "In a cloud service, who is responsible for deciding which users can access customer data?",
    checkAnswer:
      "The customer is responsible for appropriately managing user access, although the provider supplies tools and secures the underlying infrastructure.",
  },
  {
    id: "cloud-models",
    domain: "cloud",
    title: "Public, private and hybrid cloud",
    aliases: ["public cloud", "private cloud", "hybrid cloud", "cloud deployment models"],
    simple:
      "Public cloud uses cloud infrastructure offered by a provider to multiple customers. Private cloud infrastructure is dedicated to one organization. Hybrid cloud combines private infrastructure with public cloud services.",
    example:
      "A hospital might keep certain systems in its own private environment while using public cloud services for another application.",
    keyPoints: [
      "Public cloud: provider-operated infrastructure used by multiple customers, with logically separated resources.",
      "Private cloud: cloud environment dedicated to one organization.",
      "Hybrid cloud: connects or combines private infrastructure with public cloud services.",
      "The best model depends on requirements such as control, compliance, cost and existing systems.",
    ],
    commonConfusions: [
      "Public cloud does not mean that every customer's data is publicly visible.",
      "Hybrid cloud is not simply using two public cloud providers; it commonly combines public cloud with private infrastructure.",
    ],
    checkQuestion:
      "An organization uses its own private environment and Azure public cloud together. Which model is this?",
    checkAnswer: "Hybrid cloud.",
  },
  {
    id: "consumption-pricing",
    domain: "cloud",
    title: "Consumption-based pricing",
    aliases: [
      "pay as you go",
      "pay-as-you-go",
      "consumption model",
      "operational expenditure",
      "capital expenditure",
      "opex",
      "capex",
    ],
    simple:
      "Consumption-based pricing charges customers according to measured usage or other pricing factors for a service. It can reduce the need to purchase large amounts of hardware before it is needed.",
    example:
      "A business pays for cloud storage it uses instead of buying and maintaining its own storage equipment upfront.",
    keyPoints: [
      "CapEx, or capital expenditure, is money spent acquiring assets such as physical servers.",
      "OpEx, or operational expenditure, is money spent running ongoing operations or services.",
      "Pay-as-you-go can help align spending with usage.",
      "Actual cloud charges can also depend on service type, region, storage, data transfer and pricing options.",
    ],
    commonConfusions: [
      "Pay-as-you-go does not mean every cloud service is free when idle; some resources can incur charges while provisioned.",
      "Cloud computing can involve both capital and operational expenditure depending on the organization and solution.",
    ],
    checkQuestion:
      "A company pays according to its cloud resource usage. Which pricing idea does this illustrate?",
    checkAnswer: "Consumption-based, or pay-as-you-go, pricing.",
  },
  {
    id: "iaas-paas-saas",
    domain: "cloud",
    title: "IaaS, PaaS and SaaS",
    aliases: [
      "iaas",
      "paas",
      "saas",
      "infrastructure as a service",
      "platform as a service",
      "software as a service",
      "cloud service models",
    ],
    simple:
      "IaaS provides infrastructure such as virtual machines. PaaS provides a managed platform for building or running applications. SaaS provides a finished application that customers use.",
    example:
      "IaaS is like renting a kitchen and managing much of the equipment. PaaS is like using a prepared kitchen to cook. SaaS is like ordering a ready-made meal.",
    keyPoints: [
      "IaaS: customers manage the operating system and applications, as well as their data and access; the provider manages physical infrastructure.",
      "PaaS: the provider manages the infrastructure and much of the application platform; customers focus on their applications and data.",
      "SaaS: the provider operates the application; customers configure usage and manage their data and access.",
      "The more managed the service, the less underlying infrastructure the customer usually manages.",
    ],
    commonConfusions: [
      "IaaS is not the same as SaaS: one provides infrastructure, while the other provides usable software.",
      "PaaS does not mean the provider automatically builds the customer's application.",
    ],
    checkQuestion:
      "Which service model is most suitable when a customer wants to use a finished email application?",
    checkAnswer: "SaaS, or Software as a Service.",
  },
  {
    id: "serverless",
    domain: "cloud",
    title: "Serverless computing",
    aliases: ["serverless", "functions", "azure functions", "event driven"],
    simple:
      "Serverless lets developers run code or use services without directly managing the underlying servers. Servers still exist, but the cloud provider handles much of their provisioning and maintenance.",
    example:
      "A function runs when a new file arrives and processes that file without the developer having to maintain a dedicated server for the task.",
    keyPoints: [
      "Serverless services can respond to events or requests.",
      "The provider manages the underlying server infrastructure.",
      "Pricing may be based on execution, requests or other service-specific measures.",
      "Serverless does not mean there are literally no servers.",
    ],
    commonConfusions: [
      "Serverless is not identical to SaaS; it often provides a way to execute code or build a backend.",
      "Not every serverless service has the same pricing or scaling behavior.",
    ],
    checkQuestion: "Does serverless mean that no physical servers exist?",
    checkAnswer:
      "No. Servers still exist; the provider manages the underlying infrastructure for the customer.",
  },

  // =========================================================
  // DOMAIN 2: AZURE ARCHITECTURE AND SERVICES
  // =========================================================
  {
    id: "azure-regions",
    domain: "architecture",
    title: "Azure regions, region pairs and sovereign regions",
    aliases: [
      "regions",
      "region pairs",
      "sovereign regions",
      "geography",
      "azure geography",
      "data residency",
    ],
    simple:
      "An Azure region is a geographic area containing Azure datacenters. Region pairs are designated relationships between certain regions. Sovereign regions are designed for specific government or regulatory requirements.",
    example:
      "An organization may choose a region based on latency, service availability, data residency requirements and resilience needs.",
    keyPoints: [
      "Region choice can affect latency, service availability and cost.",
      "Availability of individual Azure services varies by region.",
      "Region pairs can support certain disaster-recovery and platform-update strategies.",
      "Not every Azure region is paired in the same way, and pairing does not automatically protect every workload.",
      "Sovereign cloud environments serve particular legal, regulatory or government needs.",
    ],
    commonConfusions: [
      "A region is not the same thing as an availability zone.",
      "Using a region pair alone does not guarantee that an application is configured for disaster recovery.",
    ],
    checkQuestion: "What is the main geographic purpose of an Azure region?",
    checkAnswer:
      "It identifies a geographic area where Azure services and datacenters are deployed.",
  },
  {
    id: "availability-zones",
    domain: "architecture",
    title: "Availability zones",
    aliases: [
      "availability zone",
      "zones",
      "high availability",
      "datacenter failure",
      "fault isolation",
    ],
    simple:
      "Availability zones are physically separate locations within a supported Azure region, designed with independent infrastructure such as power, cooling and networking to improve resilience.",
    example:
      "A service deploys copies of its workload across supported zones so that a problem affecting one zone is less likely to make every copy unavailable.",
    keyPoints: [
      "Zones exist within a region.",
      "They help protect against certain datacenter-level failures.",
      "Workloads must be designed and configured to use zones to gain the intended protection.",
      "Not every service or region supports availability zones.",
    ],
    commonConfusions: [
      "Availability zones are not the same as separate Azure regions.",
      "A service deployed in one zone does not automatically become zone-resilient.",
    ],
    checkQuestion:
      "Which is designed to isolate workloads across separate physical locations within a region?",
    checkAnswer: "Availability zones.",
  },
  {
    id: "azure-resource-hierarchy",
    domain: "architecture",
    title: "Azure resources, resource groups, subscriptions and management groups",
    aliases: [
      "resource",
      "resource group",
      "subscription",
      "management group",
      "azure hierarchy",
      "resource hierarchy",
      "organization",
    ],
    simple:
      "Azure resources are individual services or components. Resource groups organize resources, subscriptions provide management and billing boundaries, and management groups organize multiple subscriptions.",
    example:
      "A school may put a web app and its supporting resources in a resource group, organize subscriptions by department, and use a management group to apply governance across those subscriptions.",
    keyPoints: [
      "Resource: an individual Azure service or component, such as a virtual machine.",
      "Resource group: a logical container for resources that are managed together.",
      "Subscription: a boundary for resource management, access control and billing.",
      "Management group: organizes multiple subscriptions for governance.",
      "Management groups can inherit applicable governance settings down the hierarchy.",
    ],
    commonConfusions: [
      "A resource group is not the same as a subscription.",
      "Resources in one resource group do not have to be located in the same Azure region.",
      "A subscription is not itself a physical datacenter.",
    ],
    checkQuestion: "Which Azure scope can organize multiple subscriptions?",
    checkAnswer: "A management group.",
  },
  {
    id: "compute-services",
    domain: "architecture",
    title: "Compute: virtual machines, containers and functions",
    aliases: [
      "compute",
      "virtual machine",
      "vm",
      "containers",
      "container",
      "functions",
      "azure functions",
      "serverless compute",
    ],
    simple:
      "Compute services provide processing power for applications. Virtual machines provide virtualized computers, containers package applications and dependencies, and functions run code in response to events or requests.",
    example:
      "A legacy application may run on a virtual machine, a packaged web service may run in a container, and a small event-triggered task may run as a function.",
    keyPoints: [
      "Virtual machines provide control over the operating system and environment.",
      "Containers package applications with their dependencies and share the host operating-system kernel.",
      "Functions are useful for event-driven code.",
      "Virtual Machine Scale Sets can manage groups of similar virtual machines.",
      "Availability sets help distribute virtual machines across fault and update domains within a datacenter.",
      "Azure Virtual Desktop provides a desktop and application virtualization service.",
    ],
    commonConfusions: [
      "Containers are not full virtual machines; they generally share the host operating-system kernel.",
      "Virtual Machine Scale Sets and availability sets have different purposes.",
      "Functions are not the only form of serverless computing.",
    ],
    checkQuestion:
      "Which compute option is designed to run code in response to events without directly managing servers?",
    checkAnswer: "A serverless function, such as Azure Functions.",
  },
  {
    id: "app-hosting",
    domain: "architecture",
    title: "Application hosting options",
    aliases: ["app service", "web apps", "web hosting", "azure app service", "host an application"],
    simple:
      "Azure offers different ways to host applications. Azure App Service provides a managed platform for web apps and APIs, while virtual machines and container services offer different levels of control and management.",
    example:
      "A developer deploying a standard web application may use Azure App Service instead of configuring and maintaining a virtual machine.",
    keyPoints: [
      "Azure App Service is a managed application-hosting platform.",
      "Virtual machines provide greater control but require more operating-system management.",
      "Containers are useful when an application is packaged with its dependencies.",
      "Choose based on control, portability, operational workload and application requirements.",
    ],
    commonConfusions: [
      "Azure App Service is not the same as a virtual machine.",
      "The most managed option is not necessarily the right choice for every workload.",
    ],
    checkQuestion: "Which service provides managed hosting for web apps and APIs?",
    checkAnswer: "Azure App Service.",
  },
  {
    id: "virtual-networking",
    domain: "architecture",
    title: "Azure virtual networks and networking",
    aliases: [
      "vnet",
      "virtual network",
      "subnet",
      "vnet peering",
      "azure dns",
      "vpn gateway",
      "expressroute",
      "public endpoint",
      "private endpoint",
      "networking",
    ],
    simple:
      "Azure networking connects resources and controls how they communicate. A virtual network provides a private network environment, and subnets divide its address space into smaller network segments.",
    example:
      "A business may place web servers in one subnet and application servers in another, with network rules controlling communication between them.",
    keyPoints: [
      "Virtual networks provide network isolation and connectivity for Azure resources.",
      "Subnets divide a virtual network into smaller address ranges.",
      "VNet peering connects virtual networks over Microsoft's network.",
      "Azure DNS provides DNS hosting and name resolution capabilities.",
      "VPN Gateway supports encrypted connectivity over a VPN.",
      "ExpressRoute provides private connectivity between an organization's network and Microsoft cloud services through a connectivity provider.",
      "Public endpoints are reachable through public network paths, subject to configuration.",
      "Private endpoints use a private IP address in a virtual network to access supported services privately.",
    ],
    commonConfusions: [
      "VPN Gateway and ExpressRoute are not the same connectivity method.",
      "A private endpoint does not automatically guarantee that all public access is disabled; service networking must be configured appropriately.",
      "A subnet is part of a virtual network, not a separate Azure region.",
    ],
    checkQuestion:
      "Which option provides private connectivity to a supported Azure service using a private IP in a virtual network?",
    checkAnswer: "A private endpoint.",
  },
  {
    id: "azure-storage",
    domain: "architecture",
    title: "Azure Storage services and storage types",
    aliases: [
      "blob storage",
      "azure files",
      "queue storage",
      "table storage",
      "disk storage",
      "storage account",
      "object storage",
      "file storage",
      "storage types",
    ],
    simple:
      "Azure Storage offers different services for different kinds of data. Blob Storage stores object data, Azure Files provides managed file shares, Queue Storage stores messages, Table Storage stores structured NoSQL data, and managed disks support virtual machines.",
    example:
      "A learning app might store uploaded documents in Blob Storage and use a managed disk for a virtual machine's operating system.",
    keyPoints: [
      "Blob Storage: objects such as documents, images, backups and media.",
      "Azure Files: managed file shares accessible through supported file-sharing protocols.",
      "Queue Storage: messages used to help decouple application components.",
      "Table Storage: structured NoSQL key/attribute data.",
      "Managed disks: block storage for Azure virtual machines.",
      "A storage account provides a management boundary for supported Azure Storage services.",
    ],
    commonConfusions: [
      "Blob Storage and Azure Files are not interchangeable in every scenario.",
      "Storage services have different access patterns and capabilities.",
      "Choosing storage requires considering performance, access, redundancy, security and cost.",
    ],
    checkQuestion:
      "Which Azure Storage service is designed for object data such as images and documents?",
    checkAnswer: "Azure Blob Storage.",
  },
  {
    id: "storage-tiers",
    domain: "architecture",
    title: "Storage access tiers and redundancy",
    aliases: [
      "hot tier",
      "cool tier",
      "cold tier",
      "archive tier",
      "lrs",
      "zrs",
      "grs",
      "storage redundancy",
      "data replication",
    ],
    simple:
      "Storage access tiers help balance storage cost and access needs. Redundancy options keep additional copies of data to improve durability and, depending on the option, availability or geographic resilience.",
    example:
      "Frequently used files may use an online tier suited to regular access, while long-term records may use a lower-cost tier if its access requirements are acceptable.",
    keyPoints: [
      "Hot, cool and cold tiers target different patterns of data access and storage cost.",
      "Archive is an offline tier for suitable long-term blob data; rehydration is required before data can be read.",
      "LRS stores multiple copies within a single physical location.",
      "ZRS replicates data across availability zones in a region.",
      "GRS replicates data to a secondary geographic region.",
      "GZRS combines zone redundancy in the primary region with geo-replication.",
      "Specific options and limitations depend on the storage account and service.",
    ],
    commonConfusions: [
      "Redundancy is not the same as a complete backup strategy.",
      "The archive tier is not immediately readable like an online access tier.",
      "Geo-replication does not automatically mean an application can fail over without configuration.",
    ],
    checkQuestion:
      "Which redundancy option is designed to replicate data across availability zones in a region?",
    checkAnswer: "Zone-redundant storage (ZRS).",
  },
  {
    id: "storage-transfer-migration",
    domain: "architecture",
    title: "Moving and migrating data to Azure",
    aliases: [
      "azcopy",
      "storage explorer",
      "azure file sync",
      "azure migrate",
      "data box",
      "data migration",
      "move files",
      "offline data transfer",
    ],
    simple:
      "Azure provides tools for transferring files and migrating workloads. The right tool depends on data volume, available connectivity, the source environment and the migration goal.",
    example:
      "A company with a very large dataset and limited network bandwidth might consider an offline transfer appliance instead of sending everything over the internet.",
    keyPoints: [
      "AzCopy is a command-line utility for copying data to, from and between supported storage locations.",
      "Azure Storage Explorer provides a graphical interface for managing supported storage data.",
      "Azure File Sync synchronizes supported on-premises Windows Server file shares with Azure Files.",
      "Azure Migrate helps assess and migrate workloads to Azure.",
      "Azure Data Box supports offline data transfer using physical devices for supported scenarios.",
    ],
    commonConfusions: [
      "Azure Migrate is not simply a tool for copying individual files.",
      "Azure Data Box is useful for certain large-scale transfers but is not required for every migration.",
      "Storage Explorer is a graphical tool, while AzCopy is command-line based.",
    ],
    checkQuestion:
      "Which tool is specifically designed to help assess and migrate workloads to Azure?",
    checkAnswer: "Azure Migrate.",
  },
  {
    id: "identity-access",
    domain: "architecture",
    title: "Microsoft Entra ID, authentication and authorization",
    aliases: [
      "entra id",
      "azure active directory",
      "authentication",
      "authorization",
      "identity",
      "mfa",
      "multifactor authentication",
      "multi-factor authentication",
      "sso",
      "single sign on",
      "passwordless",
      "conditional access",
      "external identities",
      "entra domain services",
    ],
    simple:
      "Identity services help establish who a user or application is and control access. Microsoft Entra ID is Microsoft's cloud identity and access management service. Authentication verifies identity; authorization determines permitted actions.",
    example:
      "A student signs in with an account and completes an additional verification step. The system then checks whether the account is allowed to access a particular application.",
    keyPoints: [
      "Authentication: verifying who or what is requesting access.",
      "Authorization: deciding what an authenticated identity can do.",
      "MFA requires more than one type of verification factor.",
      "Single sign-on (SSO) allows a user to access multiple supported applications after signing in through an identity provider.",
      "Passwordless methods can use supported credentials such as security keys or biometrics.",
      "Conditional Access evaluates signals and policies to control access.",
      "External identities support collaboration with users outside an organization.",
      "Microsoft Entra Domain Services provides managed domain capabilities for supported workloads.",
    ],
    commonConfusions: [
      "Authentication and authorization are different steps.",
      "MFA does not simply mean entering two passwords.",
      "Microsoft Entra ID and Microsoft Entra Domain Services provide different identity capabilities.",
    ],
    checkQuestion:
      "A system checks whether a user is allowed to delete a file. Is this authentication or authorization?",
    checkAnswer: "Authorization.",
  },
  {
    id: "azure-rbac",
    domain: "architecture",
    title: "Azure role-based access control (RBAC)",
    aliases: [
      "rbac",
      "role based access control",
      "permissions",
      "least privilege",
      "reader role",
      "owner role",
      "contributor role",
    ],
    simple:
      "Azure RBAC assigns roles to identities at defined scopes so users and applications receive the permissions needed to manage Azure resources.",
    example:
      "A developer might receive permission to manage a test resource group without receiving unrestricted control over the whole subscription.",
    keyPoints: [
      "A role defines a set of permitted actions.",
      "A role assignment connects an identity, a role and a scope.",
      "Scopes can include management groups, subscriptions, resource groups and resources.",
      "The principle of least privilege means granting only the access needed.",
      "Built-in roles include Reader, Contributor and Owner, with different permissions.",
    ],
    commonConfusions: [
      "RBAC is about permissions; it is not the same as proving a user's identity.",
      "Contributor can manage many resources but does not have the same permissions as Owner.",
      "A broader scope can affect more resources than a narrower scope.",
    ],
    checkQuestion: "Which principle recommends giving users only the permissions they need?",
    checkAnswer: "The principle of least privilege.",
  },
  {
    id: "zero-trust-defense",
    domain: "architecture",
    title: "Zero Trust and defense in depth",
    aliases: [
      "zero trust",
      "never trust always verify",
      "defense in depth",
      "security layers",
      "security model",
    ],
    simple:
      "Zero Trust requires explicit verification and treats access as something that must be evaluated rather than automatically trusted. Defense in depth uses multiple security layers to reduce reliance on any single control.",
    example:
      "A company checks identity, limits permissions, protects devices and monitors activity instead of assuming that everyone inside its network is trustworthy.",
    keyPoints: [
      "Zero Trust emphasizes verifying explicitly, using least privilege and assuming a breach may occur.",
      "Defense in depth layers controls such as identity protection, network security, endpoint protection and data security.",
      "Multiple layers can reduce the impact of a control failure.",
      "Security requires ongoing configuration, monitoring and review.",
    ],
    commonConfusions: [
      "Zero Trust does not mean trusting nobody under any circumstances; it means continually evaluating access based on evidence and policy.",
      "Defense in depth is a layered approach, not one individual product.",
    ],
    checkQuestion: "What is the main idea of defense in depth?",
    checkAnswer:
      "Use multiple layers of security controls so that one failed control does not leave everything unprotected.",
  },
  {
    id: "defender-for-cloud",
    domain: "architecture",
    title: "Microsoft Defender for Cloud",
    aliases: [
      "defender for cloud",
      "cloud security posture",
      "security recommendations",
      "cloud workload protection",
    ],
    simple:
      "Microsoft Defender for Cloud helps assess and improve cloud security posture and provides security capabilities for supported cloud workloads.",
    example:
      "A team uses security recommendations to identify a virtual machine that needs a security configuration improvement.",
    keyPoints: [
      "It helps identify security weaknesses and recommend improvements.",
      "It offers supported workload protection capabilities.",
      "Its capabilities and available plans depend on the environment and configuration.",
      "Security recommendations should be evaluated and addressed appropriately.",
    ],
    commonConfusions: [
      "Defender for Cloud is not identical to Azure Advisor, which provides broader recommendations across several areas.",
      "Enabling a security tool does not remove the need for secure configuration and responsible access management.",
    ],
    checkQuestion:
      "Which service helps assess cloud security posture and protect supported workloads?",
    checkAnswer: "Microsoft Defender for Cloud.",
  },

  // =========================================================
  // DOMAIN 3: MANAGEMENT AND GOVERNANCE
  // =========================================================
  {
    id: "azure-cost-management",
    domain: "governance",
    title: "Azure cost management and pricing",
    aliases: [
      "cost management",
      "azure pricing calculator",
      "total cost",
      "budget",
      "cost alert",
      "spending",
      "pricing",
    ],
    simple:
      "Azure costs depend on factors such as resource type, usage, region, storage, data transfer and selected pricing options. Cost tools help estimate spending, review actual costs and set budgets or alerts.",
    example:
      "Before deploying an application, a team estimates expected costs with the pricing calculator and then reviews actual spending using cost-management tools.",
    keyPoints: [
      "The Azure Pricing Calculator estimates costs before deployment based on chosen assumptions.",
      "Cost analysis helps review and understand recorded spending.",
      "Budgets and alerts can notify users when defined thresholds are reached or forecast to be reached, depending on configuration.",
      "Resource usage, region, storage capacity and data transfer can affect cost.",
      "Tags can help group and analyze costs by project, team or environment.",
    ],
    commonConfusions: [
      "A pricing estimate is not necessarily an exact final bill.",
      "A budget alert is not automatically a hard spending limit that stops all resources.",
      "Creating a resource can incur charges even when users are not actively using it.",
    ],
    checkQuestion: "Which tool helps estimate Azure costs before deploying resources?",
    checkAnswer: "The Azure Pricing Calculator.",
  },
  {
    id: "azure-policy-locks-tags",
    domain: "governance",
    title: "Azure Policy, resource locks and tags",
    aliases: [
      "azure policy",
      "resource locks",
      "tags",
      "governance",
      "compliance",
      "deny resource creation",
      "delete lock",
      "read only lock",
    ],
    simple:
      "Azure Policy evaluates resources against organizational rules. Resource locks help prevent accidental changes or deletion. Tags attach metadata to resources to support organization and cost analysis.",
    example:
      "A company uses a policy to restrict deployments to approved regions, a deletion lock to protect a critical resource, and tags to label resources by department.",
    keyPoints: [
      "Azure Policy can audit, deny or otherwise evaluate resource configurations according to supported policy effects.",
      "A CanNotDelete lock helps prevent deletion while still allowing permitted changes.",
      "A ReadOnly lock prevents supported write and delete operations.",
      "Tags are key-value pairs, such as department=IT or environment=test.",
      "Locks and policies serve different governance purposes.",
    ],
    commonConfusions: [
      "A tag does not itself enforce a security rule.",
      "A resource lock is not a substitute for backups.",
      "Azure Policy can do more than simply block deployments; its behavior depends on the policy definition and effect.",
    ],
    checkQuestion: "Which feature helps prevent accidental deletion of an Azure resource?",
    checkAnswer: "A resource lock, such as a CanNotDelete lock.",
  },
  {
    id: "azure-purview",
    domain: "governance",
    title: "Microsoft Purview and data governance",
    aliases: [
      "purview",
      "microsoft purview",
      "data governance",
      "data catalog",
      "data classification",
      "data estate",
    ],
    simple:
      "Microsoft Purview provides data governance capabilities that help organizations discover, understand, classify and govern data across supported environments.",
    example:
      "An organization uses data-governance tools to understand where sensitive business data resides and how it should be managed.",
    keyPoints: [
      "Data governance helps organizations understand and manage their data.",
      "Purview capabilities include supported data discovery, cataloging, classification and governance functions.",
      "Exact capabilities depend on the Purview solution and configuration.",
      "Data governance complements identity, access control and security measures.",
    ],
    commonConfusions: [
      "Purview is not the same as Azure Policy, which evaluates Azure resources against policy rules.",
      "Discovering or classifying data does not automatically guarantee that all access is secure.",
    ],
    checkQuestion: "Which Microsoft service is associated with data discovery and governance?",
    checkAnswer: "Microsoft Purview.",
  },
  {
    id: "azure-resource-management",
    domain: "governance",
    title: "Azure portal, CLI, PowerShell and Cloud Shell",
    aliases: [
      "azure portal",
      "azure cli",
      "command line",
      "azure powershell",
      "cloud shell",
      "manage resources",
      "management tools",
    ],
    simple:
      "Azure provides several interfaces for managing resources. The portal is a graphical interface, Azure CLI uses commands, Azure PowerShell uses PowerShell commands, and Cloud Shell provides a browser-accessible shell environment.",
    example:
      "A beginner creates a storage account in the portal, while an administrator may use CLI or PowerShell to repeat a deployment consistently.",
    keyPoints: [
      "Azure portal: browser-based graphical management.",
      "Azure CLI: command-line management using Azure CLI commands.",
      "Azure PowerShell: management using PowerShell modules and commands.",
      "Azure Cloud Shell: browser-accessible shell with supported tools available.",
      "Automation tools can make repeated tasks more consistent.",
    ],
    commonConfusions: [
      "Azure CLI and Azure PowerShell are different command interfaces.",
      "Cloud Shell is an environment for using management tools, not a separate Azure resource type that replaces every other tool.",
    ],
    checkQuestion: "Which Azure interface provides a graphical user interface in a browser?",
    checkAnswer: "The Azure portal.",
  },
  {
    id: "azure-arm-iac",
    domain: "governance",
    title: "Azure Resource Manager and infrastructure as code",
    aliases: [
      "arm",
      "azure resource manager",
      "arm templates",
      "infrastructure as code",
      "iac",
      "bicep",
      "repeatable deployment",
      "deployment template",
    ],
    simple:
      "Azure Resource Manager (ARM) is the deployment and management service for Azure resources. Infrastructure as code describes infrastructure in files that can be versioned and deployed consistently. ARM templates are a declarative way to define Azure infrastructure.",
    example:
      "A team defines its development environment in a template so it can deploy a consistent set of resources repeatedly instead of configuring each resource manually.",
    keyPoints: [
      "ARM receives and coordinates Azure resource management and deployment requests.",
      "ARM templates define the desired Azure resources and configuration.",
      "Infrastructure as code supports repeatability, review and version control.",
      "Azure Bicep is another declarative language for deploying Azure resources through ARM.",
      "Templates still need appropriate permissions, parameters and validation.",
    ],
    commonConfusions: [
      "ARM is the management and deployment layer; an ARM template is a way to describe resources for deployment.",
      "Infrastructure as code does not mean that the infrastructure is only simulated or does not exist.",
    ],
    checkQuestion: "What is a key benefit of infrastructure as code?",
    checkAnswer: "It helps define, review and deploy infrastructure consistently and repeatably.",
  },
  {
    id: "azure-arc",
    domain: "governance",
    title: "Azure Arc",
    aliases: [
      "arc",
      "azure arc",
      "hybrid management",
      "multicloud management",
      "on premises resources",
      "manage outside azure",
    ],
    simple:
      "Azure Arc extends certain Azure management and governance capabilities to supported resources outside Azure, including on-premises and other cloud environments.",
    example:
      "An organization can use supported Azure management capabilities for servers that run in its own datacenter as well as servers in Azure.",
    keyPoints: [
      "Azure Arc supports management across supported environments.",
      "It can connect eligible resources to Azure management services.",
      "Capabilities depend on resource type, connectivity and configuration.",
      "Arc does not physically move every connected resource into an Azure datacenter.",
    ],
    commonConfusions: [
      "Azure Arc is not the same as migrating every workload to Azure.",
      "Connecting a resource does not automatically enable every possible management feature.",
    ],
    checkQuestion: "What is the main purpose of Azure Arc?",
    checkAnswer:
      "To extend supported Azure management and governance capabilities to resources across on-premises and other environments.",
  },
  {
    id: "azure-monitor",
    domain: "governance",
    title: "Azure Monitor, Log Analytics, alerts and Application Insights",
    aliases: [
      "azure monitor",
      "log analytics",
      "monitoring",
      "alerts",
      "application insights",
      "performance monitoring",
      "telemetry",
      "logs",
    ],
    simple:
      "Azure Monitor collects and analyzes monitoring data from supported Azure and application environments. Its capabilities include metrics, logs, alerts and application performance monitoring.",
    example:
      "A team creates an alert when a monitored metric crosses a configured threshold and investigates logs to understand what happened.",
    keyPoints: [
      "Azure Monitor is the overall monitoring platform.",
      "Log Analytics supports querying and analyzing collected log data.",
      "Azure Monitor alerts notify users or trigger configured actions when alert conditions are met.",
      "Application Insights provides application performance monitoring and diagnostic capabilities for supported applications.",
      "Metrics and logs are different forms of monitoring data.",
    ],
    commonConfusions: [
      "Monitoring records information and can trigger alerts; it does not guarantee that every problem will be fixed automatically.",
      "Log Analytics is one capability in the broader monitoring ecosystem, not a synonym for every Azure Monitor feature.",
    ],
    checkQuestion: "Which capability is designed to query and analyze collected log data?",
    checkAnswer: "Log Analytics.",
  },
  {
    id: "azure-advisor",
    domain: "governance",
    title: "Azure Advisor",
    aliases: [
      "advisor",
      "azure recommendations",
      "cost recommendations",
      "reliability recommendations",
      "performance recommendations",
      "operational excellence",
    ],
    simple:
      "Azure Advisor analyzes supported resource configurations and usage data to provide recommendations that can help improve cost, reliability, performance, operational excellence and security.",
    example:
      "Advisor may recommend reviewing an underused resource or improving a supported configuration.",
    keyPoints: [
      "Advisor provides recommendations rather than replacing the administrator's decisions.",
      "Recommendations cover several optimization areas.",
      "The available recommendations depend on the resources and information available.",
      "Review recommendations in the context of the workload before applying changes.",
    ],
    commonConfusions: [
      "Azure Advisor is not the same as Azure Service Health, which reports service incidents and health information relevant to the user.",
      "Recommendations should be evaluated rather than applied blindly.",
    ],
    checkQuestion: "Which Azure service provides recommendations for optimizing resources?",
    checkAnswer: "Azure Advisor.",
  },
  {
    id: "azure-service-health",
    domain: "governance",
    title: "Azure Service Health",
    aliases: [
      "service health",
      "azure outage",
      "service issue",
      "service incident",
      "planned maintenance",
      "health advisory",
    ],
    simple:
      "Azure Service Health provides personalized information about Azure service issues, planned maintenance and other health events that may affect the resources or services relevant to an organization.",
    example:
      "An administrator checks Service Health to investigate whether an Azure service incident could explain an application problem.",
    keyPoints: [
      "Service Health provides information relevant to the services and regions an organization uses.",
      "It can help administrators understand incidents and planned maintenance.",
      "It supports configuring alerts for relevant health events.",
      "The information helps distinguish platform-side issues from application-specific problems.",
    ],
    commonConfusions: [
      "Service Health is not the same as Azure Monitor's application and resource monitoring capabilities.",
      "A Service Health notice does not necessarily mean every resource or application is affected.",
    ],
    checkQuestion:
      "Which service helps identify Azure service incidents and planned maintenance relevant to your environment?",
    checkAnswer: "Azure Service Health.",
  },
  {
    id: "azure-monitor-vs-advisor-vs-health",
    domain: "governance",
    title: "Choosing the right Azure monitoring or recommendation tool",
    aliases: [
      "difference between monitor advisor service health",
      "monitor vs advisor",
      "advisor vs service health",
      "which azure tool",
      "compare monitoring tools",
    ],
    simple:
      "Azure Monitor focuses on metrics, logs, alerts and application monitoring. Azure Advisor provides optimization recommendations. Azure Service Health reports Azure service issues and planned maintenance relevant to your environment.",
    example:
      "Use Monitor to investigate an application's high response time, Advisor to review optimization suggestions, and Service Health to check whether a platform incident is affecting a service.",
    keyPoints: [
      "Azure Monitor: collect and analyze operational and application data.",
      "Azure Advisor: recommendations for improving supported resource configurations.",
      "Azure Service Health: personalized information about Azure service incidents and maintenance.",
      "These tools complement one another and can be used together during troubleshooting.",
    ],
    commonConfusions: [
      "All three tools are not interchangeable just because they provide information about Azure.",
      "Advisor provides recommendations; it is not primarily a live incident-status dashboard.",
    ],
    checkQuestion:
      "An administrator wants to know whether Microsoft has reported an Azure service incident affecting their environment. Which tool should they check?",
    checkAnswer: "Azure Service Health.",
  },

  // Supplemental AZ-900 coverage: scenario-based learning

  {
    id: "azure-datacenters",
    domain: "architecture",
    title: "Azure Datacenters",
    simple:
      "A datacenter is a physical facility containing servers, networking equipment, power systems, and cooling systems. An Azure region is a geographic area containing one or more datacenters. Availability zones are physically separate locations within a supported region.",
    example:
      "A company deploys an application in an Azure region. If it needs protection against a problem affecting one datacenter location, it can consider deploying supported resources across availability zones.",
    aliases: [
      "physical datacenter",
      "data centre",
      "azure physical infrastructure",
      "region vs datacenter",
      "datacenter vs availability zone",
    ],
    keyPoints: [
      "Datacenters contain physical computing infrastructure.",
      "An Azure region is a geographic area with one or more datacenters.",
      "Availability zones are physically separate locations within supported regions.",
      "Not every Azure service or region supports availability zones.",
    ],
    commonConfusions: [
      "A region and a datacenter are not the same thing.",
      "Availability zones are not the same as region pairs.",
      "Customers generally select Azure regions, not individual physical datacenters.",
    ],
    checkQuestion: "What is the difference between an Azure region and an availability zone?",
    checkAnswer:
      "A region is a geographic area containing one or more datacenters. An availability zone is a physically separate location within a supported region.",
  },
  {
    id: "cloud-model-use-cases",
    domain: "cloud",
    title: "Cloud Deployment Models: Use Cases",
    simple:
      "Public cloud uses cloud infrastructure offered to customers by a provider. Private cloud provides a dedicated cloud environment for an organization. Hybrid cloud combines on-premises infrastructure or a private environment with public cloud services.",
    example:
      "A startup that wants to deploy quickly may choose public cloud. An organization needing a dedicated environment may consider private cloud. A hospital that keeps some systems on-premises while using Azure for other workloads may use a hybrid approach.",
    aliases: [
      "public private hybrid scenarios",
      "deployment model examples",
      "which cloud model",
      "cloud deployment scenarios",
    ],
    keyPoints: [
      "Public cloud can reduce the need to purchase and maintain physical infrastructure.",
      "Private cloud can provide greater environmental control, but still requires management.",
      "Hybrid cloud connects different environments so they can work together.",
      "Choose a model based on control, existing systems, requirements, and business needs.",
    ],
    commonConfusions: [
      "Private cloud does not automatically guarantee compliance or security.",
      "Hybrid cloud is not simply using two public cloud providers.",
      "Private cloud can be hosted by an organization or by a third party.",
    ],
    checkQuestion:
      "An organization must keep some systems on-premises but wants to use Azure for other workloads. Which deployment model fits?",
    checkAnswer:
      "Hybrid cloud, because it combines on-premises infrastructure with public cloud services.",
  },
  {
    id: "cloud-service-model-use-cases",
    domain: "cloud",
    title: "IaaS, PaaS, and SaaS: Use Cases",
    simple:
      "IaaS provides infrastructure such as virtual machines. PaaS provides a platform for building and deploying applications without managing all the underlying infrastructure. SaaS provides a ready-to-use software application.",
    example:
      "Choose IaaS when you need control over a virtual machine's operating system. Choose PaaS when you want to deploy your application without managing the underlying server operating system. Choose SaaS when you simply want to use a finished application.",
    aliases: [
      "iaas paas saas scenarios",
      "service model examples",
      "choose a cloud service model",
      "infrastructure platform software as a service",
    ],
    keyPoints: [
      "IaaS: more control over infrastructure and operating systems.",
      "PaaS: focus on building and deploying applications.",
      "SaaS: use a provider-managed application.",
      "The provider's responsibilities increase as you move from IaaS toward SaaS.",
    ],
    commonConfusions: [
      "IaaS does not mean you own the provider's physical servers.",
      "PaaS does not mean the customer has no responsibilities.",
      "SaaS is a complete application, not just a virtual machine.",
    ],
    checkQuestion:
      "A developer wants to deploy code without managing the operating system of the underlying server. Which service model is the best fit?",
    checkAnswer:
      "PaaS, because the provider manages the underlying platform while the developer focuses on the application.",
  },
  {
    id: "azure-vm-options",
    domain: "architecture",
    title: "Azure Virtual Machines and VM Options",
    simple:
      "An Azure virtual machine is a software-based computer running in Azure. You select an operating system image and a VM size, and configure resources such as disks and networking. Scale sets help manage groups of similar VMs, availability sets help improve VM availability, and Azure Virtual Desktop delivers virtual desktops and applications.",
    example:
      "A company running a legacy application that needs a particular operating system can host it on an Azure VM. If it needs many similar VM instances, it can consider a Virtual Machine Scale Set.",
    aliases: [
      "vm size",
      "virtual machine resources",
      "vm scale sets",
      "availability sets",
      "azure virtual desktop",
      "vm images disks networking",
    ],
    keyPoints: [
      "VM size determines resources such as CPU and memory.",
      "An image supplies the operating system and may include other software.",
      "VMs use disks for storage and networking resources to communicate.",
      "Virtual Machine Scale Sets manage groups of similar VM instances and support scaling.",
      "Availability sets distribute VMs across fault and update domains.",
      "Azure Virtual Desktop provides virtual desktops and remote applications.",
    ],
    commonConfusions: [
      "A VM Scale Set is for managing groups of VM instances, not storing files.",
      "Availability sets and availability zones are different availability options.",
      "Azure Virtual Desktop is for virtual desktops and applications, not a tool for scaling web servers.",
    ],
    checkQuestion:
      "Which Azure option helps you deploy and manage a group of similar virtual machines that can scale?",
    checkAnswer: "Azure Virtual Machine Scale Sets.",
  },
  {
    id: "azure-storage-account-options",
    domain: "architecture",
    title: "Azure Storage Account Options",
    simple:
      "An Azure Storage account provides a namespace and endpoints for supported Azure Storage services. When creating one, you consider the account type, performance options, redundancy, and the storage services or features your workload needs.",
    example:
      "An application storing images and documents may use Blob Storage through a Storage account. The organization then selects suitable performance and redundancy options based on its requirements.",
    aliases: [
      "storage account type",
      "general purpose v2",
      "standard vs premium storage",
      "storage account configuration",
      "azure storage redundancy options",
    ],
    keyPoints: [
      "A Storage account provides endpoints for accessing supported storage services.",
      "General-purpose v2 is a common account type for many Azure Storage workloads.",
      "Standard and Premium represent different performance and workload options where supported.",
      "Redundancy options determine how data copies are maintained.",
      "Available features depend on the account configuration, region, and service.",
    ],
    commonConfusions: [
      "Hot, Cool, Cold, and Archive are Blob access tiers, not Storage account types.",
      "LRS, ZRS, GRS, and GZRS are redundancy options, not access tiers.",
      "Not every account configuration supports every storage feature or redundancy option.",
    ],
    checkQuestion: "Are Hot, Cool, Cold, and Archive Storage account types or Blob access tiers?",
    checkAnswer:
      "They are Blob access tiers, which help describe how frequently data is accessed and the associated storage-cost trade-offs.",
  },
];
