import { getDb } from "@/lib/db";
import { Category } from "@/types/category";
import { Policy } from "@/types/policy";
import { format } from "date-fns";

const getCategories = async (): Promise<Category[]> => {
  const db = await getDb();
  const categories = await db.collection<Category>("category").find({}).toArray();
  return categories;
};

const getPolicies = async (): Promise<Policy[]> => {
  const db = await getDb();
  const policies = await db.collection<Policy>("policy").aggregate<Policy>([
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Release Date</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy._id?.toString() || policy.name}>
                <td>{policy.name}</td>
                <td>{policy.category.name}</td>
                <td>{policy.description}</td>
                <td>{format(new Date(policy.date), 'dd/MM/yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PolicyPage;
