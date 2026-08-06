"use client";

import { deletePolicy } from "@/app/actions/DeletePolicy";
import { IPolicy } from "@/types/policy";
import { format } from "date-fns";
import { Edit3, Trash2, ExternalLink, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  
  const handleEditClick = (policy: IPolicy) => {
    if (onEdit) onEdit(policy);
  };

  const handleDeleteClick = async (id: any) => {
    if (confirm("Are you sure you want to delete this policy?")) {
      try {
        await deletePolicy(id);
      } catch (error) {
        console.error("Failed to delete policy:", error);
        alert("Failed to delete policy. Please try again.");
      }
    }
  };

  const getFormattedDate = (policy: IPolicy) => {
    const rawDate = policy.updatedAt || policy.createdAt;
    if (!rawDate) return "Recently";
    try {
      return format(new Date(rawDate), "dd MMM, yyyy");
    } catch {
      return "Recently";
    }
  };

  if (policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 text-gray-500 border border-dashed border-[#E6E2D8] rounded-[12px] bg-gray-50/50">
        <FileText className="w-10 h-10 text-gray-300 mb-3" />
        <p className="text-[14px] font-medium">No policies uploaded yet.</p>
        <p className="text-[12px] text-gray-400 mt-1">Use the form on the left to upload your first policy.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {policies.map((policy, idx) => {
        const titleText = policy.title || (policy as any).name || "";
        const pdfLink = policy.pdfUrl || (policy as any).file_link || "";
        const categoryName = policy.category?.name || "Uncategorized";

        // Assign styling classes to category badges
        const getBadgeStyle = (name: string) => {
          const lName = name.toLowerCase();
          if (lName.includes("academic") || lName.includes("ufm")) {
            return "bg-[#EBF3FE] text-[#0056cc] border-[#C8E1FC]";
          }
          if (lName.includes("leave") || lName.includes("attendance")) {
            return "bg-[#FAF2EC] text-[#b06000] border-[#F5E1D3]";
          }
          if (lName.includes("exam")) {
            return "bg-amber-50 text-amber-800 border-amber-200";
          }
          return "bg-gray-100 text-gray-700 border-gray-200";
        };

        return (
          <div
            key={policy._id ? String(policy._id) : idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-[#E6E2D8]/70 hover:border-gray-300 rounded-[12px] bg-[#FAF9F6]/50 hover:bg-white transition-all gap-4"
          >
            {/* Left Section: Details */}
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={`px-2 py-0.5 text-[11px] font-extrabold uppercase ${getBadgeStyle(categoryName)}`}>
                  {categoryName}
                </Badge>
                <span className="text-[12.5px] text-gray-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {getFormattedDate(policy)}
                </span>
              </div>
              
              <h4 className="text-[16.5px] font-bold text-[#0d0e12] leading-tight">
                {titleText}
              </h4>
              <p className="text-[13.5px] text-gray-600 line-clamp-2 leading-relaxed">
                {policy.description}
              </p>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              {/* PDF Document link */}
              {pdfLink && (
                <a
                  href={pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 hover:bg-gray-100 text-gray-500 hover:text-black rounded-[8px] border border-gray-200/60 bg-white transition-colors"
                  title="Open PDF Document"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Admin Actions */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleEditClick(policy)}
                    className="p-2.5 hover:bg-amber-50 text-gray-500 hover:text-amber-700 rounded-[8px] border border-gray-200/60 bg-white transition-colors cursor-pointer"
                    title="Edit Policy"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(policy._id)}
                    className="p-2.5 hover:bg-rose-50 text-gray-500 hover:text-rose-600 rounded-[8px] border border-gray-200/60 bg-white transition-colors cursor-pointer"
                    title="Delete Policy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
