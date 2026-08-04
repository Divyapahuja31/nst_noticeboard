import { getDb } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { addPolicy } from "@/app/actions/AddPolicy";

export default async function AdminPolicyPage() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/signin");
  }

  const db = await getDb();
  const categories = await db.collection("category").find({}).toArray();

  return (
    <form action={addPolicy}>
      <input name="name" placeholder="Policy Name" required />

      <select name="categoryId" required>
        {categories.map((c) => (
          <option key={c._id.toString()} value={c._id.toString()}>{c.name}</option>
        ))}
      </select>

      <textarea name="description" placeholder="Description" required />
      <button type="submit">Add Policy</button>
    </form>
  );
}
