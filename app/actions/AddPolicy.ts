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

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const categoryId = formData.get("categoryId")?.toString();

  if (!categoryId) {
    throw new Error("Category is required");
  }

  const db = await getDb();
  await db.collection('policy').insertOne({
    name, description,
    category: new ObjectId(categoryId),
    date: new Date(),
    createdAt: new Date(),
  })

  revalidatePath("/policy");
}