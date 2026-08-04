"use server"
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addCategory(formDate:FormData): Promise<void> {
  const session = await auth();
  if(!session || session.user.role !== "admin") {
    throw new Error("Unauthorized access");
  }

  const name = formDate.get("name")?.toString();
  const description = formDate.get("description")?.toString();

  const db = await getDb();
  await db.collection('category').insertOne({
    name, description,
    createdAt: new Date(),
  });

  revalidatePath("/policy");
}