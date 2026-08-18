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
  
  const pdfFile = formData.get("pdfFile") as File | null;
  let pdfUrl = formData.get("pdfUrl")?.toString();

  if (pdfFile && pdfFile.size > 0) {
    if (pdfFile.size > 10 * 1024 * 1024) {
      throw new Error("File size exceeds the 10MB limit.");
    }
    const { uploadToS3 } = await import("@/lib/s3");
    pdfUrl = await uploadToS3(pdfFile);
  }

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