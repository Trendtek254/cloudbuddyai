import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, ProgressBar } from "@/components/AppShell";
import { domains, type DomainId } from "@/data/content";
import { questions } from "@/data/questions";
import { addAttempt } from "@/lib/progress";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice Quiz — AI Study Buddy" },
      { name: "description", content: "Original multiple-choice practice questions with instant feedback and explanations." },
      { property: "og:title", content: "Practice Quiz — AI Study Buddy" },
      { property: "og:description", content: "Practise cloud fundamentals with instant feedback." },
    ],
  }),
  component: Practice,
});

export function scoreQuiz(answers: number[]) {
  const byDomain = Object.fromEntries(domains.map((d) => [d.id, { correct: 0, total: 0 }])) as Record<DomainId, { correct: number; total: number }>;
  const missed: string[] = [];
  let score = 0;
  questions.forEach((q, i) => {
    byDomain[q.domain].total++;
    if (answers[i] === q.answer) { score++; byDomain[q.domain].correct++; } else missed.push(q.topic);
  });
  return { score, total: questions.length, byDomain, missedTopics: [...new Set(missed)] };
}

function Practice() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const q = questions[idx];
  if (!q) return null;

  function next() {
    const all = [...answers, picked!];
    setAnswers(all);
    setPicked(null);
    if (idx + 1 < questions.length) setIdx(idx + 1);
    else { addAttempt({ date: new Date().toISOString(), ...scoreQuiz(all) }); setDone(true); }
  }
  function restart() { setIdx(0); setAnswers([]); setPicked(null); setDone(false); }

  if (done) {
    const r = scoreQuiz(answers);
    return (
      <AppShell>
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <p className="text-sm font-semibold text-accent">Quiz complete</p>
          <p className="mt-2 font-display text-6xl font-semibold text-primary">{r.score}/{r.total}</p>
          <p className="mt-2 text-muted-foreground">{Math.round((r.score / r.total) * 100)}% correct</p>
          {r.missedTopics.length > 0 && <p className="mt-4 text-sm">Review: {r.missedTopics.join(", ")}</p>}
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={restart} className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Try again</button>
            <Link to="/progress" className="rounded-full bg-secondary px-5 py-2.5 font-semibold text-secondary-foreground">See progress</Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const answered = picked !== null;
  return (
    <AppShell>
      <PageHeader title="Practice" subtitle="Original practice questions based on the public skills outline — not real exam questions." />
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Question {idx + 1} of {questions.length}</span><span>Score {answers.filter((a, i) => a === questions[i]?.answer).length}</span></div>
        <ProgressBar value={(idx / questions.length) * 100} />
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{domains.find((d) => d.id === q.domain)!.title} · {q.topic}</span>
          <h2 className="mt-4 font-display text-xl font-semibold">{q.prompt}</h2>
          <div className="mt-5 space-y-3">
            {q.options.map((o, i) => {
              let cls = "border-border hover:border-accent hover:bg-muted";
              if (answered && i === q.answer) cls = "border-success bg-success-soft";
              else if (answered && i === picked) cls = "border-destructive bg-destructive-soft";
              else if (answered) cls = "border-border opacity-60";
              return (
                <button key={i} disabled={answered} onClick={() => setPicked(i)} className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${cls}`}>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold">{String.fromCharCode(65 + i)}</span>{o}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className={`mt-5 rounded-xl p-4 text-sm ${picked === q.answer ? "bg-success-soft" : "bg-destructive-soft"}`}>
              <p className="font-semibold">{picked === q.answer ? "✓ Correct!" : `✗ Not quite — the answer is ${String.fromCharCode(65 + q.answer)}.`}</p>
              <p className="mt-1">{q.explanation}</p>
            </div>
          )}
          <button disabled={!answered} onClick={next} className="mt-5 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-40">
            {idx + 1 === questions.length ? "Finish quiz" : "Next question"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
