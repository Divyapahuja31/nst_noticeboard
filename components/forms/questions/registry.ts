import { ComponentType } from "react";
import { QuestionType } from "@/types/form";
import { QuestionProps } from "./types";
import { ShortAnswerQuestion } from "./ShortAnswerQuestion";

export const QUESTION_COMPONENTS: Partial<
  Record<QuestionType, ComponentType<QuestionProps>>
> = {
  SHORT_ANSWER: ShortAnswerQuestion,
};

export function getQuestionComponent(
  type: QuestionType,
): ComponentType<QuestionProps> | null {
  return QUESTION_COMPONENTS[type] ?? null;
}
