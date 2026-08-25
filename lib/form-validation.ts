import { AnswerValue, FormErrors, IQuestion } from "@/types/form";

export const REQUIRED_MESSAGE = "This is a required question";

export function emptyAnswerFor(question: IQuestion): AnswerValue {
  return question.type === "CHECKBOXES" ? [] : "";
}

export function isBlank(value: AnswerValue | undefined | null): boolean {
  if (value === undefined || value === null) return true;
  if (Array.isArray(value)) return value.length === 0;
  return value.trim() === "";
}

export function validateQuestion(
  question: IQuestion,
  value: AnswerValue | undefined,
): string | null {
  if (question.required && isBlank(value)) return REQUIRED_MESSAGE;
  return null;
}

export function validateAnswers(
  questions: IQuestion[],
  answers: Record<string, AnswerValue>,
): FormErrors {
  const errors: FormErrors = {};
  for (const question of questions) {
    const message = validateQuestion(question, answers[question.id]);
    if (message) errors[question.id] = message;
  }
  return errors;
}
