"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Calendar, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuickAccessGridProps {
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({
  activeCategoryFilter,
  setActiveCategoryFilter,
}) => {
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

      {/* 4 Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Academic & UFM */}
        <Link href="/academic/ufm" className="block text-inherit no-underline">
          <Card
            className={`p-6 min-h-[250px] flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-200 border-0 shadow-xs hover:shadow-md ${
              activeCategoryFilter === "Academic"
                ? "bg-[#00e680] ring-4 ring-[#00e680]/30 scale-[1.02]"
                : "bg-[#00e680] hover:scale-[1.01]"
            }`}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00ce73] rounded-full opacity-80 pointer-events-none" />
            <div className="relative z-10 w-11 h-11 bg-[#044d28]/15 rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#044d28]" />
            </div>
            <div className="relative z-10 mt-6">
              <h3 className="text-[22px] font-bold text-[#0a0b0e] leading-tight tracking-tight">
                Academic & UFM
              </h3>
              <p className="text-[13.5px] font-medium text-[#075631] mt-2 leading-snug">
                Guidelines on grading, academic integrity, and curriculum standards.
              </p>
            </div>
          </Card>
        </Link>

        {/* Card 2: Leaves & Attendance */}
        <Card
          onClick={() => setActiveCategoryFilter("Attendance")}
          className={`p-6 min-h-[250px] flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-200 border-0 shadow-xs hover:shadow-md ${
            activeCategoryFilter === "Attendance"
              ? "bg-[#12141d] ring-4 ring-[#12141d]/30 scale-[1.02]"
              : "bg-[#12141d] hover:scale-[1.01]"
          }`}
        >
          <div className="relative z-10 w-11 h-11 bg-white/10 rounded-[10px] flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="relative z-10 mt-6">
            <h3 className="text-[22px] font-bold text-white leading-tight tracking-tight">
              Leaves & Attendance
            </h3>
            <p className="text-[13.5px] font-medium text-gray-300 mt-2 leading-snug">
              Requirements for minimum attendance and protocols for requesting leave.
            </p>
          </div>
        </Card>

        {/* Card 3: Exam Schedules */}
        <Card
          onClick={() => setActiveCategoryFilter("Exams")}
          className={`p-6 min-h-[250px] flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-200 border-0 shadow-xs hover:shadow-md ${
            activeCategoryFilter === "Exams"
              ? "bg-[#ffc500] ring-4 ring-[#ffc500]/40 scale-[1.02]"
              : "bg-[#ffc500] hover:scale-[1.01]"
          }`}
        >
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#eaa600] rounded-full opacity-80 pointer-events-none" />
          <div className="relative z-10 w-11 h-11 bg-[#523e00]/15 rounded-[10px] flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#523e00]" />
          </div>
          <div className="relative z-10 mt-6">
            <h3 className="text-[22px] font-bold text-[#0d0e12] leading-tight tracking-tight">
              Exam Schedules
            </h3>
            <p className="text-[13.5px] font-medium text-[#523e00] mt-2 leading-snug">
              Timetables, rules for invigilation, and make-up exam procedures.
            </p>
          </div>
        </Card>

        {/* Card 4: Conduct & Ethics */}
        <Card
          onClick={() => setActiveCategoryFilter("Conduct")}
          className={`p-6 min-h-[250px] flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-200 border border-[#E6E2D8] shadow-xs hover:shadow-md ${
            activeCategoryFilter === "Conduct"
              ? "bg-[#F4F2EC] ring-4 ring-gray-300 scale-[1.02]"
              : "bg-[#F4F2EC] hover:scale-[1.01]"
          }`}
        >
          <div className="relative z-10 w-11 h-11 bg-black/10 rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-black" />
          </div>
          <div className="relative z-10 mt-6">
            <h3 className="text-[22px] font-bold text-[#0d0e12] leading-tight tracking-tight">
              Conduct & Ethics
            </h3>
            <p className="text-[13.5px] font-medium text-[#505258] mt-2 leading-snug">
              Code of conduct, disciplinary actions, and campus behavioral norms.
            </p>
          </div>
        </Card>

      </div>
    </section>
  );
};
