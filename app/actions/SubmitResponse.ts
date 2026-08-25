"use server";

import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { validateAnswers } from "@/lib/form-validation";
import { AnswerValue, IForm, IQuestion, SubmitState } from "@/types/form";

function readAnswer(question: IQuestion, formData: FormData): AnswerValue {
  if (question.type === "CHECKBOXES") {
    return formData.getAll(question.id).map((value) => value.toString());
  }
  return (formData.get(question.id) ?? "").toString().trim();
}

export async function submitResponse(
  formId: string,
  _prevState: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  if (!ObjectId.isValid(formId)) {
    return { status: "error", errors: {}, message: "This form no longer exists." };
  }

  const db = await getDb();
  const form = await db
    .collection<IForm>("form")
    .findOne({ _id: new ObjectId(formId) });

  if (!form) {
    return { status: "error", errors: {}, message: "This form no longer exists." };
  }

  if (!form.acceptingResponses) {
    return {
      status: "error",
      errors: {},
      message: "This form is no longer accepting responses.",
    };
  }

  const answers: Record<string, AnswerValue> = {};
  for (const question of form.questions) {
    answers[question.id] = readAnswer(question, formData);
  }

  const errors = validateAnswers(form.questions, answers);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const session = await auth();

  await db.collection("formResponse").insertOne({
    form: new ObjectId(formId),
    answers,
    respondentEmail: session?.user?.email ?? undefined,
    submittedAt: new Date(),
  });

  return { status: "success" };
}
