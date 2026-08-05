import { getDb } from "@/lib/db";
import { IPolicy } from "@/types/policy";
import UFMPolicyClient from "./UFMPolicyClient";

// Disable static caching so page reflects newly uploaded policies immediately
export const revalidate = 0;

export default async function UFMPolicyPage() {
  let dbPolicies: IPolicy[] = [];
  
  try {
    const db = await getDb();
    
    // Aggregation pipeline to lookup categories for policies
    const policiesRaw = await db.collection("policy").aggregate([
      {
        $lookup: {
          from: "category",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    ]).toArray();

    dbPolicies = policiesRaw.map((p) => ({
      _id: p._id.toString(),
      id: p._id.toString(),
      title: p.name || p.title || "",
      description: p.description || "",
      file_link: p.file_link || "",
      category: p.category ? {
        _id: p.category._id.toString(),
        name: p.category.name,
        description: p.category.description || ""
      } : null,
      date: p.date ? new Date(p.date).toISOString() : new Date().toISOString(),
      updatedDate: p.date ? `Updated ${new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}` : "Updated recently",
      audience: p.audience || "All",
      documentRef: p.documentRef || `DOC-${p._id.toString().substring(18).toUpperCase()}`,
      fullContent: p.fullContent || ""
    })) as unknown as IPolicy[];

  } catch (e) {
    console.error("Failed to fetch policies from database:", e);
  }

  // Filter for Academic policies
  const academicPolicies = dbPolicies.filter(p => {
    const categoryName = p.category?.name?.toLowerCase() || "";
    return categoryName === "academic" || categoryName === "academic & ufm";
  });

  return <UFMPolicyClient initialPolicies={academicPolicies} />;
}
