"use server";

import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updatePolicy(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    throw new Error("Unauthorized access");
  }

  const id = formData.get("_id")?.toString();
  const title = formData.get("title")?.toString() || formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const categoryId = formData.get("categoryId")?.toString();
  const pdfUrl = formData.get("pdfUrl")?.toString() || formData.get("file_link")?.toString();
  const fullContent = formData.get("fullContent")?.toString();

  if (!id) {
    throw new Error("Policy ID is required");
  }

  if (!categoryId) {
    throw new Error("Category is required");
  }

  const db = await getDb();
  await db.collection("policy").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        description,
        pdfUrl,
        fullContent,
        category: new ObjectId(categoryId),
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath("/admin/policy");
  revalidatePath("/policy");
}
