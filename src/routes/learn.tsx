import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { domains, topics, STUDY_GUIDE_URL } from "@/data/content";
import { toggleLearned, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — AI Study Buddy" },
      { name: "description", content: "Simple explanations of AZ-900 topics with relatable African examples." },
      { property: "og:title", content: "Learn — AI Study Buddy" },
      { property: "og:description", content: "Topic cards covering cloud concepts, architecture and governance." },
    ],
  }),
  component: Learn,
});

function Learn() {
  const p = useProgress();
  return (
    <AppShell>
      <PageHeader title="Learn" subtitle="Short, friendly explanations for each topic. Mark a topic as learned when it clicks." />
      {domains.map((d) => (
        <section key={d.id} id={d.id} className="mb-10 scroll-mt-24">
          <h2 className="mb-4 font-display text-2xl font-semibold text-primary">{d.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {topics.filter((t) => t.domain === d.id).map((t) => {
              const done = p.learned.includes(t.id);
              return (
                <article key={t.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 text-foreground/90">{t.simple}</p>
                  <p className="mt-3 rounded-xl bg-secondary p-3 text-sm text-secondary-foreground">🌍 {t.example}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button onClick={() => toggleLearned(t.id)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${done ? "bg-success-soft text-success" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
                      {done ? "✓ Learned" : "Mark as learned"}
                    </button>
                    <Link to="/tutor" className="text-sm font-medium text-accent hover:underline">Ask the tutor →</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
      <p className="text-sm text-muted-foreground">
        Topics follow the public skills outline. For full detail see the{" "}
        <a href={STUDY_GUIDE_URL} target="_blank" rel="noreferrer" className="font-medium text-accent underline">official AZ-900 study guide</a>.
      </p>
    </AppShell>
  );
}
