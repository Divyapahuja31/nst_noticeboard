"use client";

import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FilterSidebarProps {
  activeAudienceFilter: string;
  setActiveAudienceFilter: (audience: string) => void;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  activeAudienceFilter,
  setActiveAudienceFilter,
  activeCategoryFilter,
  setActiveCategoryFilter,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Card className="lg:col-span-3 bg-[#F8F7F4] p-6 border-[#E8E5DC]">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <Filter className="w-4 h-4 text-gray-700" />
        <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-600">
          Filter By
        </h3>
      </div>

      {/* Student Group Filter Options */}
      <div className="space-y-2.5">
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Student Group
        </div>
        {[
          { label: "All Policies", val: "All" },
          { label: "Undergraduate", val: "Undergraduate" },
          { label: "Postgraduate", val: "Postgraduate" },
          { label: "Hostel / Campus", val: "Hostel / Campus" }
        ].map((item) => (
          <label
            key={item.val}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer transition-all ${
              activeAudienceFilter === item.val
                ? "bg-black text-white font-semibold shadow-xs"
                : "hover:bg-gray-200/70 text-gray-700 font-medium text-[14px]"
            }`}
          >
            <input
              type="radio"
              name="audience"
              checked={activeAudienceFilter === item.val}
              onChange={() => setActiveAudienceFilter(item.val)}
              className="hidden"
            />
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                activeAudienceFilter === item.val
                  ? "border-white bg-white"
                  : "border-gray-400"
              }`}
            >
              {activeAudienceFilter === item.val && (
                <div className="w-2 h-2 rounded-full bg-black" />
              )}
            </div>
            <span className="text-[14px]">{item.label}</span>
          </label>
        ))}
      </div>

      {/* Domain Category Filter Badges */}
      <div className="mt-6 pt-5 border-t border-gray-200">
        <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">
          Domain Category
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Academic", "Attendance", "Exams", "Conduct", "Campus"].map((cat) => (
            <Button
              key={cat}
              variant={activeCategoryFilter.toLowerCase() === cat.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategoryFilter(cat)}
              className={
                activeCategoryFilter.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#00e685] text-[#044d28] hover:bg-[#00e685]/90 font-bold border-0"
                  : "bg-white text-gray-800 border-gray-300 font-medium"
              }
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Reset Filters Button */}
      {(activeAudienceFilter !== "All" || activeCategoryFilter !== "All" || searchQuery !== "") && (
        <Button
          variant="secondary"
          onClick={() => {
            setActiveAudienceFilter("All");
            setActiveCategoryFilter("All");
            setSearchQuery("");
          }}
          className="mt-6 w-full text-[13px] font-semibold"
        >
          Reset All Filters
        </Button>
      )}
    </Card>
  );
};
