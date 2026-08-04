import { getDb } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PolicyAdminManager from "@/components/policyAdminManager";

export default async function AdminPolicyPage() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/signin");
  }

  const db = await getDb();

  const categoriesRaw = await db.collection("category").find({}).toArray();
  const categories = categoriesRaw.map((c) => ({
    _id: c._id.toString(),
    name: c.name as string,
    description: (c.description || "") as string,
  }));

  const policiesRaw = await db
    .collection("policy")
    .aggregate([
      {
        $lookup: {
          from: "category",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
    ])
    .toArray();

  const policies = policiesRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    date: p.date ? new Date(p.date) : new Date(),
    category: {
      ...p.category,
      _id: p.category._id.toString(),
    },
  }));

  return (
    <div>
      <h1>Manage Policies</h1>
      <PolicyAdminManager
        categories={categories}
        initialPolicies={JSON.parse(JSON.stringify(policies))}
      />
    </div>
  );
}
