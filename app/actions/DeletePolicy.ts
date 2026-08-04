"use server";

import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deletePolicy(policyId: string | ObjectId | undefined): Promise<void> {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    throw new Error("Unauthorized access");
  }

  if (!policyId) {
    throw new Error("Policy ID is required");
  }

  const idString = typeof policyId === "string" ? policyId : policyId.toString();

  const db = await getDb();
  await db.collection("policy").deleteOne({ _id: new ObjectId(idString) });

  revalidatePath("/admin/policy");
  revalidatePath("/policy");
}
