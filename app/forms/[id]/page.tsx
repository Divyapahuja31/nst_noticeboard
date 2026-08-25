import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import FormRenderer from "@/components/forms/FormRenderer";
import { getDb } from "@/lib/db";
import { IForm } from "@/types/form";

export const revalidate = 0;

export default async function FormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const raw = await db
    .collection<IForm>("form")
    .findOne({ _id: new ObjectId(id) });

  if (!raw) notFound();

  const form: IForm = {
    _id: raw._id.toString(),
    title: raw.title || "Untitled form",
    description: raw.description || "",
    acceptingResponses: raw.acceptingResponses ?? true,
    questions: (raw.questions || []).map((question) => ({
      id: question.id,
      type: question.type,
      title: question.title || "",
      description: question.description || "",
      required: Boolean(question.required),
      ...(question.choices ? { choices: question.choices } : {}),
    })),
    createdAt: new Date(raw.createdAt).toISOString(),
    updatedAt: new Date(raw.updatedAt).toISOString(),
  };

  if (!form.acceptingResponses) {
    return (
      <section className="mx-auto w-full max-w-2xl space-y-4 px-4 py-10">
        <div className="rounded-lg border bg-background p-6">
          <h1 className="text-2xl">{form.title}</h1>
          <p className="mt-4 text-sm">
            This form is no longer accepting responses.
          </p>
        </div>
      </section>
    );
  }

  return <FormRenderer form={form} />;
}
