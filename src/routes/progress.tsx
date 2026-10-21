import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, ProgressBar } from "@/components/AppShell";
import { domains, topics } from "@/data/content";
import { resetProgress, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — AI Study Buddy" },
      { name: "description", content: "Track your quiz scores and see which topics to review." },
      { property: "og:title", content: "Progress — AI Study Buddy" },
      { property: "og:description", content: "Quiz scores and topics to review." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const p = useProgress();
  const last = p.attempts[0];
  const review = last ? last.missedTopics : [];
  const notLearned = topics.filter((t) => !p.learned.includes(t.id));
  return (
    <AppShell>
      <PageHeader title="Your progress" subtitle="Saved on this device." />
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-primary">Quiz scores</h2>
          {p.attempts.length === 0 ? (
            <p className="mt-3 text-muted-foreground">No quizzes yet. <Link to="/practice" className="font-medium text-accent underline">Take your first one</Link>.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {p.attempts.map((a, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-muted-foreground">{new Date(a.date).toLocaleDateString()}</span>
                  <div className="flex-1"><ProgressBar value={(a.score / a.total) * 100} /></div>
                  <span className="w-12 text-right text-sm font-semibold">{a.score}/{a.total}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-primary">By domain (last quiz)</h2>
          {last ? domains.map((d) => {
            const s = last.byDomain[d.id];
            return (
              <div key={d.id} className="mt-4">
                <div className="mb-1 flex justify-between text-sm"><span>{d.title}</span><span>{s.correct}/{s.total}</span></div>
                <ProgressBar value={s.total ? (s.correct / s.total) * 100 : 0} />
              </div>
            );
          }) : <p className="mt-3 text-muted-foreground">Complete a quiz to see your strengths.</p>}
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card md:col-span-2">
          <h2 className="font-display text-xl font-semibold text-primary">Topics to review</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {review.map((t) => <span key={t} className="rounded-full bg-destructive-soft px-3 py-1 text-sm">From quiz: {t}</span>)}
            {notLearned.map((t) => <Link key={t.id} to="/learn" hash={t.domain} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:underline">{t.title}</Link>)}
            {review.length === 0 && notLearned.length === 0 && <p className="text-muted-foreground">You're all caught up 🎉</p>}
          </div>
        </section>
      </div>
      <button onClick={() => confirm("Reset all progress?") && resetProgress()} className="mt-6 text-sm text-muted-foreground underline hover:text-destructive">Reset progress</button>
    </AppShell>
  );
}
