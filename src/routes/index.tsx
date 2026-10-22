import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { AppShell, ProgressBar } from "@/components/AppShell";
import { domains, topics } from "@/data/content";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Study Buddy — AZ-900 learning for beginners" },
      {
        name: "description",
        content:
          "Learn cloud fundamentals in plain language with relatable African examples, an AI tutor and practice quizzes.",
      },
      { property: "og:title", content: "AI Study Buddy — AZ-900 learning for beginners" },
      {
        property: "og:description",
        content:
          "Plain-language cloud lessons, AI tutor and practice quizzes. Unofficial learning tool.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const p = useProgress();
  const last = p.attempts[0];
  return (
    <AppShell>
      <section className="grid items-center gap-8 overflow-hidden rounded-3xl bg-hero p-6 text-primary-foreground shadow-card md:grid-cols-2 md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Welcome back, learner
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Cloud concepts, explained like a friend would.
          </h1>
          <p className="mt-4 opacity-90">
            Study AZ-900 fundamentals in simple English, with real-life examples from across Africa.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/learn"
              className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-foreground hover:opacity-90"
            >
              Start learning
            </Link>
            <Link
              to="/practice"
              className="rounded-full border border-primary-foreground/40 px-5 py-2.5 font-semibold hover:bg-primary-foreground/10"
            >
              Take a quiz
            </Link>
          </div>
        </div>
        <img
          src={hero}
          alt="Student studying cloud topics on a laptop"
          width={1280}
          height={832}
          className="rounded-2xl"
        />
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Topics learned"
          value={`${p.learned.length}/${topics.length}`}
          pct={(p.learned.length / topics.length) * 100}
        />
        <Stat label="Quizzes taken" value={String(p.attempts.length)} />
        <Stat
          label="Last score"
          value={last ? `${Math.round((last.score / last.total) * 100)}%` : "—"}
          pct={last ? (last.score / last.total) * 100 : undefined}
        />
      </section>

      <h2 className="mt-10 font-display text-2xl font-semibold text-primary">
        Your three study domains
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {domains.map((d, i) => {
          const ts = topics.filter((t) => t.domain === d.id);
          const done = ts.filter((t) => p.learned.includes(t.id)).length;
          return (
            <Link
              key={d.id}
              to="/learn"
              hash={d.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <span className="text-sm font-semibold text-accent">Domain {i + 1}</span>
              <h3 className="mt-1 font-display text-xl font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.blurb}</p>
              <div className="mt-4">
                <ProgressBar value={(done / ts.length) * 100} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {done} of {ts.length} topics
              </p>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}

function Stat({ label, value, pct }: { label: string; value: string; pct?: number | undefined }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-primary">{value}</p>
      {pct !== undefined && (
        <div className="mt-3">
          <ProgressBar value={pct} />
        </div>
      )}
    </div>
  );
}
