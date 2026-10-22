import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { STUDY_GUIDE_URL } from "@/data/content";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/learn", label: "Learn" },
  { to: "/tutor", label: "AI Tutor" },
  { to: "/practice", label: "Practice" },
  { to: "/progress", label: "Progress" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-semibold text-primary"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-hero text-primary-foreground">
              ☁
            </span>
            AI Study Buddy
          </Link>
          <nav className="flex flex-wrap gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                activeProps={{
                  className:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p className="mx-auto max-w-2xl px-4">
          AI Study Buddy is an independent, unofficial learning project and is not affiliated with
          or endorsed by Microsoft. Practice questions are original and are not real exam questions.{" "}
          <a
            href={STUDY_GUIDE_URL}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            Official AZ-900 study guide
          </a>
        </p>
      </footer>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl font-semibold text-primary md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-accent transition-all"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}
