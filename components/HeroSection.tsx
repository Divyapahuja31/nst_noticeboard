"use client";

import React from "react";
import { Search, GraduationCap, Sparkles, FileText, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <main className="relative mt-12 md:mt-16 mb-16 text-center max-w-4xl mx-auto flex flex-col items-center">

      {/* LEFT 3D Floating Tile Cluster */}
      <div className="hidden lg:block absolute -left-12 xl:-left-20 top-2 w-55 h-65 pointer-events-none select-none">
        <div className="absolute top-10 left-2 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-[#4a4c52]" />
        </div>

        <div className="absolute top-0 left-20 w-13 h-13 rounded-[10px] bg-[#00e685] border border-[#00d077] shadow-[0_8px_18px_rgba(0,230,133,0.35)] flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-[#044d28]" />
        </div>

        <div className="absolute top-28 left-6 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center">
          <FileText className="w-6 h-6 text-[#4a4c52]" />
        </div>

        <div className="absolute top-18 left-24 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)]" />

        <div className="absolute top-44 left-10 w-13 h-13 rounded-[10px] bg-[#ffc800] border border-[#eaa800] shadow-[0_8px_18px_rgba(255,200,0,0.35)] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#523e00] stroke-[2.5] fill-none">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4" fill="#523e00" />
          </svg>
        </div>

        <div className="absolute top-36 left-32 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)]" />
        <div className="absolute top-52 left-24 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)]" />
      </div>

      {/* RIGHT 3D Floating Tile Cluster */}
      <div className="hidden lg:block absolute -right-12 xl:-right-20 top-2 w-55 h-65 pointer-events-none select-none">
        <div className="absolute top-0 right-20 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center">
          <Calendar className="w-6 h-6 text-[#4a4c52]" />
        </div>

        <div className="absolute top-10 right-6 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)]" />

        <div className="absolute top-20 right-28 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-[#4a4c52]" />
        </div>

        <div className="absolute top-36 right-44 w-13 h-13 rounded-[10px] bg-[#00e685] border border-[#00d077] shadow-[0_8px_18px_rgba(0,230,133,0.35)] flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-[#044d28]" />
        </div>

        <div className="absolute top-28 right-14 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)]" />

        <div className="absolute top-44 right-10 w-13 h-13 rounded-[10px] bg-[#ffc800] border border-[#eaa800] shadow-[0_8px_18px_rgba(255,200,0,0.35)] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#523e00] stroke-[2.5] fill-none">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4" fill="#523e00" />
          </svg>
        </div>

        <div className="absolute top-36 right-0 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)]" />
        <div className="absolute top-52 right-24 w-13 h-13 rounded-[10px] bg-linear-to-b from-white via-[#faf8f4] to-[#ebe7de] border border-[#e2ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.07),inset_0_1.5px_1px_rgba(255,255,255,1)]" />
      </div>

      {/* Hero Main Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-[76px] font-bold tracking-[-0.035em] text-[#0d0e12] leading-[1.04]">
        Student Policy
        <br />
        Portal
      </h1>

      {/* Hero Subtitle */}
      <p className="text-base sm:text-lg md:text-[19px] text-[#505258] mt-5 leading-relaxed font-normal max-w-140">
        Find the official guidelines, handbooks, and regulations necessary for your academic journey. Search directly or browse by category.
      </p>

      {/* Hero Search Box */}
      <div className="mt-8 w-full max-w-155 relative flex items-center bg-[#F4F2EC] p-2 rounded-[10px] border border-[#E6E2D8] shadow-sm">
        <Search className="w-5 h-5 text-gray-500 ml-3 shrink-0" />
        <Input
          type="text"
          placeholder="e.g., 'Attendance Rules', 'UFM Policy', 'Hostel Leave'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] h-11 text-black placeholder:text-gray-400"
        />
        <Button
          variant="dark"
          size="lg"
          onClick={() => {
            const directorySection = document.getElementById("directory");
            directorySection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="shrink-0"
        >
          Search
        </Button>
      </div>

      {/* Quick Search Tag Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[13px] text-gray-500">
        <span className="font-medium text-gray-400">Popular searches:</span>
        {["UFM 2024", "Attendance Rules", "Exam Timetable", "Hostel Regulations"].map((tag) => (
          <Button
            key={tag}
            variant="soft"
            size="sm"
            onClick={() => setSearchQuery(tag)}
            className="h-7 text-xs font-semibold text-[#3a3b40]"
          >
            {tag}
          </Button>
        ))}
      </div>
    </main>
  );
};
