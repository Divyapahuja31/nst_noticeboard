"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { QuestionProps } from "./types";

export function ShortAnswerQuestion({
  question,
  value,
  invalid,
  onChange,
}: QuestionProps) {
  return (
    <Input
      id={question.id}
      name={question.id}
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Your answer"
      aria-invalid={invalid}
      aria-describedby={invalid ? `${question.id}-error` : undefined}
      aria-required={question.required}
      className={cn(
        "max-w-md",
        invalid && "border-red-600 focus-visible:ring-red-600",
      )}
    />
  );
}
