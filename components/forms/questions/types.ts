import { AnswerValue, IQuestion } from "@/types/form";

export interface QuestionProps {
  question: IQuestion;
  value: AnswerValue;
  invalid: boolean;
  onChange: (value: AnswerValue) => void;
}
