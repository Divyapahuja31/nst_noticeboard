"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Calendar, FileText, ShieldCheck, icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ICategory } from "@/types/category";

interface QuickAccessGridProps {
  activeCategoryFilter: string;
  setActiveCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  categories: ICategory[];
}

const COLOR_SCHEMES = [
  {
    bg: "bg-[#00e680]",
    ring: "ring-4 ring-[#00e680]/30",
    border: "border-0",
    circleBg: "bg-[#00ce73]",
    circlePos: "-top-10 -right-10",
    iconBg: "bg-[#044d28]/15",
    iconColor: "text-[#044d28]",
    titleColor: "text-[#0a0b0e]",
    textColor: "text-[#075631]",
  },
  {
    bg: "bg-[#12141d]",
    ring: "ring-4 ring-[#12141d]/30",
    border: "border-0",
    circleBg: null,
    circlePos: "",
    iconBg: "bg-white/10",
    iconColor: "text-white",
    titleColor: "text-white",
    textColor: "text-gray-300",
  },
  {
    bg: "bg-[#ffc500]",
    ring: "ring-4 ring-[#ffc500]/40",
    border: "border-0",
    circleBg: "bg-[#eaa600]",
    circlePos: "-bottom-10 -right-10",
    iconBg: "bg-[#523e00]/15",
    iconColor: "text-[#523e00]",
    titleColor: "text-[#0d0e12]",
    textColor: "text-[#523e00]",
  },
  {
    bg: "bg-[#F4F2EC]",
    ring: "ring-4 ring-gray-300",
    border: "border border-[#E6E2D8]",
    circleBg: null,
    circlePos: "",
    iconBg: "bg-black/10",
    iconColor: "text-black",
    titleColor: "text-[#0d0e12]",
    textColor: "text-[#505258]",
  },
];

const DEFAULT_ICONS = [GraduationCap, Calendar, FileText, ShieldCheck];

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({
  activeCategoryFilter,
  setActiveCategoryFilter,
  categories = [],
}) => {
  const router = useRouter();
  console.log("cad", categories)
  return (
    <section id="quick-access" className="mt-14 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[26px] font-bold text-[#0d0e12] tracking-tight">Quick Access</h2>
          <p className="text-[14px] text-gray-500">Explore core policy domains and campus regulations</p>
        </div>
        {activeCategoryFilter !== "All" && (
          <Button
            variant="link"
            onClick={() => setActiveCategoryFilter("All")}
            className="text-[13px] font-semibold text-[#00e685] p-0 h-auto"
          >
            Show All Categories
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((category, index) => {
          const theme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
          const IconComponent =
            (category.icon && icons[category.icon as keyof typeof icons]) ||
            (category.name && icons[category.name as keyof typeof icons]) ||
            DEFAULT_ICONS[index % DEFAULT_ICONS.length];

          const isActive = activeCategoryFilter === category.name;
          const isAcademic = category.name?.toLowerCase().includes("academic");

          return (
            <Card
              key={category._id ? String(category._id) : index}
              onClick={
                isAcademic
                  ? () => router.push("/academic/ufm")
                  : () => setActiveCategoryFilter(category.name)
              }
              className={`p-6 min-h-62.5 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md ${theme.border} ${theme.bg} ${
                isActive ? `${theme.ring} scale-[1.02]` : "hover:scale-[1.01]"
              }`}
            >
              {theme.circleBg && (
                <div
                  className={`absolute ${theme.circlePos} w-32 h-32 ${theme.circleBg} rounded-full opacity-80 pointer-events-none`}
                />
              )}
              <div className={`relative z-10 w-11 h-11 ${theme.iconBg} rounded-[10px] flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 ${theme.iconColor}`} />
              </div>
              <div className="relative z-10 mt-6">
                <h3 className={`text-[22px] font-bold ${theme.titleColor} leading-tight tracking-tight`}>
                  {category.name}
                </h3>
                <p className={`text-[13.5px] font-medium ${theme.textColor} mt-2 leading-snug`}>
                  {category.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

