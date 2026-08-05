"use client";

import { useState } from "react";
import { addPolicy } from "@/app/actions/AddPolicy";
import { updatePolicy } from "@/app/actions/UpdatePolicy";
import PolicyTable from "@/components/policyTable";
import { IPolicy } from "@/types/policy";
import { ICategory } from "@/types/category";

interface CategoryOption {
  _id: string;
  name: string;
}

interface PolicyAdminManagerProps {
  categories: CategoryOption[];
  initialPolicies: IPolicy[];
}

export default function PolicyAdminManager({
  categories,
  initialPolicies,
}: PolicyAdminManagerProps) {
  const [editingPolicy, setEditingPolicy] = useState<IPolicy | null>(null);

  const handleEdit = (policy: IPolicy) => {
    setEditingPolicy(policy);
  };

  const handleCancelEdit = () => {
    setEditingPolicy(null);
  };

  const getCategoryId = (category: ICategory): string => {
    if (!category) return "";
    if (typeof category === "string") return category;
    if (typeof category === "object" && category?._id) return category._id.toString();
    return "";
  };

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          if (editingPolicy) {
            await updatePolicy(formData);
            setEditingPolicy(null);
          } else {
            await addPolicy(formData);
          }
        }}
        key={editingPolicy ? editingPolicy._id?.toString() : "create"}
      >
        <h2>{editingPolicy ? "Edit Policy" : "Add Policy"}</h2>

        {editingPolicy && (
          <input
            type="hidden"
            name="_id"
            value={editingPolicy._id?.toString()}
          />
        )}

        <input
          name="title"
          placeholder="Policy Title"
          required
          defaultValue={editingPolicy?.title || ""}
        />

        <input
          name="pdfUrl"
          placeholder="Policy PDF URL"
          required
          defaultValue={editingPolicy?.pdfUrl || ""}
        />

        <select
          name="categoryId"
          required
          defaultValue={editingPolicy ? getCategoryId(editingPolicy.category) : ""}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          required
          defaultValue={editingPolicy?.description || ""}
        />

        <textarea
          name="fullContent"
          placeholder="Full Content"
          required
          defaultValue={editingPolicy?.fullContent || ""}
        />


        <div>
          <button type="submit">
            {editingPolicy ? "Update Policy" : "Add Policy"}
          </button>
          {editingPolicy && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <PolicyTable
        isAdmin={true}
        policies={initialPolicies}
        onEdit={handleEdit}
      />
    </div>
  );
}
