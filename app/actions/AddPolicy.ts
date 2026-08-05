"use server"

import { auth } from "@/auth"
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function addPolicy(formData: FormData): Promise<void> {
  const session = await auth();
  if(!session || session.user.role !== "admin") {
    throw new Error("Unauthorized access");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const categoryId = formData.get("categoryId")?.toString();
  const fullContent = formData.get("fullContent")?.toString();
  const pdfUrl = formData.get("pdfUrl")?.toString();

  if (!categoryId) {
    throw new Error("Category is required");
  }

  const db = await getDb();
  await db.collection('policy').insertOne({
    title,
    description,
    pdfUrl,
    fullContent,
    category: new ObjectId(categoryId),
    updatedAt: new Date(),
    createdAt: new Date(),
  })

  revalidatePath("/admin/policy");
  revalidatePath("/policy");
}