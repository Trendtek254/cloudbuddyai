import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { activeTutor, type LocalLanguage, type TutorMode } from "@/lib/tutor";

export const Route = createFileRoute("/tutor")({
  head: () => ({
    meta: [
      { title: "AI Tutor — AI Study Buddy" },
      {
        name: "description",
        content:
          "Ask cloud questions and get simple English, African real-life examples or local-language explanations.",
      },
      { property: "og:title", content: "AI Tutor — AI Study Buddy" },
      { property: "og:description", content: "A friendly chat tutor for cloud fundamentals." },
    ],
  }),
  component: Tutor,
});

interface Msg {
  role: "user" | "tutor";
  text: string;
}
const modes: { id: TutorMode; label: string }[] = [
  { id: "simple", label: "Simple English" },
  { id: "african", label: "African examples" },
  { id: "local", label: "Local language" },
];
const languages: LocalLanguage[] = ["Swahili", "Yoruba", "Hausa", "Zulu", "Amharic"];
const suggestions = [
  "What is IaaS vs SaaS?",
  "Explain availability zones",
  "What is shared responsibility?",
];

function Tutor() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "tutor", text: "Hi! I'm your study buddy. Ask me anything about cloud fundamentals." },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TutorMode>("african");
  const [lang, setLang] = useState<LocalLanguage>("Swahili");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);
    try {
      const reply = await activeTutor.ask({ question: text, mode, language: lang });
      setMsgs((m) => [...m, { role: "tutor", text: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "tutor", text: "Sorry, I couldn't answer just now. Please try again." },
      ]);
    } finally {
      setBusy(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <AppShell>
      <PageHeader
        title="AI Tutor"
        subtitle="Choose how you want things explained, then ask your question."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${mode === m.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            {m.label}
          </button>
        ))}
        {mode === "local" && (
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as LocalLanguage)}
            className="rounded-full border border-input bg-card px-3 py-1.5 text-sm"
            aria-label="Language"
          >
            {languages.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        )}
      </div>
      <div className="flex h-[60vh] flex-col rounded-2xl border border-border bg-card shadow-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
              >
                {m.text.replace(/\*\*|_/g, "")}
              </div>
            </div>
          ))}
          {busy && <p className="text-sm text-muted-foreground">Study Buddy is thinking…</p>}
          <div ref={endRef} />
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border px-4 pt-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-secondary"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2 p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about regions, pricing, identity…"
            className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            disabled={busy}
            className="rounded-full bg-accent px-5 font-semibold text-accent-foreground disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Offline demo tutor: answers come from the built-in study notes on this page — there is no
        live AI connection yet.
      </p>
    </AppShell>
  );
}
