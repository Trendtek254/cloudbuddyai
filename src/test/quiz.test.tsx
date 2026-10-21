import { describe, expect, it } from "vitest";
import { questions } from "@/data/questions";
import { scoreQuiz } from "@/routes/practice";

describe("quiz", () => {
  it("every question has a valid answer and topic label", () => {
    for (const q of questions) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(q.topic.length).toBeGreaterThan(0);
    }
  });
  it("scores all-correct as full marks", () => {
    expect(scoreQuiz(questions.map((q) => q.answer)).score).toBe(questions.length);
  });
  it("records missed topics", () => {
    const answers = questions.map((q, i) => (i === 0 ? (q.answer + 1) % 4 : q.answer));
    const r = scoreQuiz(answers);
    expect(r.score).toBe(questions.length - 1);
    expect(r.missedTopics).toEqual([questions[0].topic]);
  });
});
