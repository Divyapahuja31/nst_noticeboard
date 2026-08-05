"use client";

import React from "react";
import { FileText, FolderOpen, RefreshCw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  isDatabaseEmpty: boolean;
  onResetFilters?: () => void;
  onLoadSampleData?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isDatabaseEmpty,
  onResetFilters,
  onLoadSampleData,
}) => {
  if (isDatabaseEmpty) {
    return (
      <Card className="bg-[#F8F7F4] p-10 sm:p-14 text-center border-dashed border-gray-300 rounded-[10px] my-4">
        <div className="w-16 h-16 bg-gray-200/70 rounded-full flex items-center justify-center mx-auto mb-4">
          <FolderOpen className="w-8 h-8 text-gray-600" />
        </div>
        <h4 className="text-[22px] font-bold text-[#0d0e12] tracking-tight">
          No Policies Published Yet
        </h4>
        <p className="text-[14.5px] text-[#505258] mt-2 leading-relaxed max-w-md mx-auto">
          The institutional policy database is currently empty. Official regulations will appear here once published by administration.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {onLoadSampleData && (
            <Button variant="dark" onClick={onLoadSampleData} className="font-semibold">
              <RefreshCw className="w-4 h-4 mr-2" />
              Load Sample Policies
            </Button>
          )}
          <a href="/admin/policy">
            <Button variant="outline" className="font-semibold border-gray-300 bg-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              Go to Admin Upload
            </Button>
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#F8F7F4] p-10 sm:p-12 text-center border-dashed border-gray-300 rounded-[10px] my-4">
      <div className="w-14 h-14 bg-gray-200/70 rounded-full flex items-center justify-center mx-auto mb-3">
        <FileText className="w-7 h-7 text-gray-500" />
      </div>
      <h4 className="text-[20px] font-bold text-[#0d0e12] tracking-tight">
        No Matching Policies Found
      </h4>
      <p className="text-[14px] text-[#505258] mt-1.5 leading-relaxed max-w-sm mx-auto">
        No policy records matched your search query or selected category filters.
      </p>
      {onResetFilters && (
        <Button variant="dark" onClick={onResetFilters} className="mt-5 font-semibold">
          Reset All Filters
        </Button>
      )}
    </Card>
  );
};
