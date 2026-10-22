import { describe, expect, it } from "vitest";
import { findTopic, offlineTutor } from "@/lib/tutor";

describe("offline tutor topic matching", () => {
  it("matches plain questions to the right topic", async () => {
    expect((await findTopicAsync("What is IaaS vs SaaS?"))?.id).toBe("iaas-paas-saas");
    expect((await findTopicAsync("Explain availability zones"))?.id).toBe("regions");
    expect((await findTopicAsync("What is shared responsibility?"))?.id).toBe(
      "shared-responsibility",
    );
  });

  it("matches abbreviations like MFA and VM to the right topics", async () => {
    expect((await findTopicAsync("What is MFA?"))?.id).toBe("identity");
    expect((await findTopicAsync("Tell me about virtual machines"))?.id).toBe("compute");
  });

  it("matches paraphrases of the study notes", async () => {
    expect(
      (await findTopicAsync("How do I stop someone deleting a resource by accident?"))?.id,
    ).toBe("policy");
    expect(
      (await findTopicAsync("How can I check what I will pay each month before building?"))?.id,
    ).toBe("cost-management");
  });

  it("returns null for unrelated questions so the tutor suggests real topics", async () => {
    expect(findTopic("What is the best pizza in Nairobi?")).toBeNull();
    const reply = await offlineTutor.ask({
      question: "What is the best pizza in Nairobi?",
      mode: "simple",
    });
    expect(reply).toContain("I don't have notes");
    expect(reply).toContain("Identity and access"); // suggests actual topic titles
  });

  it("answers include the topic title, an example and related topics", async () => {
    const reply = await offlineTutor.ask({ question: "What is MFA?", mode: "african" });
    expect(reply).toContain("Identity and access");
    expect(reply).toContain("Real-life example:");
    expect(reply).toContain("Related topics");
  });
});

async function findTopicAsync(q: string) {
  return findTopic(q);
}
