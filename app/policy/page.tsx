import PolicyTable from "@/components/policyTable";
import { getDb } from "@/lib/db";
import { ICategory } from "@/types/category";
import { IPolicy } from "@/types/policy";

const getCategories = async (): Promise<ICategory[]> => {
  const db = await getDb();
  const categories = await db.collection<ICategory>("category").find({}).toArray();
  return categories;
};

const getPolicies = async (): Promise<IPolicy[]> => {
  const db = await getDb();
  const policies = await db.collection<IPolicy>("policy").aggregate<IPolicy>([
    {
      $lookup: {
        from: "category",
        localField: "category",
        foreignField: "_id",
         as: "category"
      }
    },
    { $unwind: "$category" }
  ]).toArray();
  return policies;
};

async function PolicyPage() {
  const categories = await getCategories();
  const policies = await getPolicies();

  return (
    <div>
      <div className="category">
        {categories.map((category) => (
          <div key={category._id?.toString() || category.name}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
      <div className="policy">
        <PolicyTable policies={policies}/>
      </div>
    </div>
  );
}

export default PolicyPage;
