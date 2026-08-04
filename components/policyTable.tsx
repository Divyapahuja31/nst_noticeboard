"use client";

import { deletePolicy } from "@/app/actions/DeletePolicy";
import { Policy } from "@/types/policy";
import { format } from "date-fns";

interface PolicyTableProps {
  isAdmin?: boolean;
  policies?: Policy[];
  onEdit?: (policy: Policy) => void;
}

export default function PolicyTable({
  isAdmin = false,
  policies = [],
  onEdit,
}: PolicyTableProps) {
  return (
    <div className="policy">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Release Date</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id?.toString() || policy.name}>
              <td>{policy.name}</td>
              <td>{policy.category?.name || "N/A"}</td>
              <td>{policy.description}</td>
              <td>
                {policy.date
                  ? format(new Date(policy.date), "dd/MM/yyyy")
                  : "-"}
              </td>
              {isAdmin && (
                <td>
                  {onEdit && (
                    <button onClick={() => onEdit?.(policy)}>Edit</button>
                  )}
                  <button onClick={() => deletePolicy(policy._id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
