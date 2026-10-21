import { useEffect, useState } from "react";
import type { DomainId } from "@/data/content";

export interface QuizAttempt {
  date: string;
  score: number;
  total: number;
  missedTopics: string[];
  byDomain: Record<DomainId, { correct: number; total: number }>;
}

export interface Progress {
  learned: string[];
  attempts: QuizAttempt[];
}

const KEY = "study-buddy-progress-v1";
const empty: Progress = { learned: [], attempts: [] };

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return empty;
  }
}

function save(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("progress-change"));
}

export function toggleLearned(id: string) {
  const p = loadProgress();
  const learned = p.learned.includes(id) ? p.learned.filter((x) => x !== id) : [...p.learned, id];
  save({ ...p, learned });
}

export function addAttempt(a: QuizAttempt) {
  const p = loadProgress();
  save({ ...p, attempts: [a, ...p.attempts].slice(0, 20) });
}

export function resetProgress() {
  save(empty);
}

export function useProgress(): Progress {
  const [p, setP] = useState<Progress>(empty);
  useEffect(() => {
    const update = () => setP(loadProgress());
    update();
    window.addEventListener("progress-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("progress-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return p;
}
