"use client";

import { deletePolicy } from "@/app/actions/DeletePolicy";
import { IPolicy } from "@/types/policy";
import { format } from "date-fns";

interface PolicyTableProps {
  isAdmin?: boolean;
  policies?: IPolicy[];
  onEdit?: (policy: IPolicy) => void;
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
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Release Date</th>
            <th>File Link</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => {
            const title = policy.title || (policy as any).name || "Untitled";
            const fileLink = policy.pdfUrl || (policy as any).file_link;
            const policyDate = policy.updatedAt || policy.createdAt || (policy as any).date;

            return (
              <tr key={policy._id?.toString() || title}>
                <td>{title}</td>
                <td>
                  {typeof policy.category === "object" && policy.category !== null
                    ? policy.category.name
                    : String(policy.category || "N/A")}
                </td>
                <td>{policy.description}</td>
                <td>
                  {policyDate ? format(new Date(policyDate), "dd/MM/yyyy") : "-"}
                </td>
                <td>
                  {fileLink ? (
                    <a
                      href={fileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Document
                    </a>
                  ) : (
                    "-"
                  )}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
