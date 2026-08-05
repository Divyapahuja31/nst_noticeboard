"use client";

import React from "react";
import { GraduationCap, Search, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="max-w-275 mx-auto bg-[#F4F2EC] rounded-[10px] px-4 py-2.5 flex items-center justify-between border border-[#E6E2D8]/70 shadow-xs">
      {/* Logo & Brand Name */}
      <div className="flex items-center gap-3 pl-1">
        <div className="w-8 h-8 bg-black rounded-[10px] flex items-center justify-center shrink-0 shadow-xs">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <span className="font-extrabold text-[19px] tracking-tight text-[#0f1115]">
          EduPolicy <span className="font-medium text-[#555]">Portal</span>
        </span>
      </div>

      {/* Nav Navigation Links */}
      <nav className="hidden md:flex items-center gap-6">
        <Button
          variant="outline"
          size="sm"
          className="font-semibold text-black"
        >
          Policies
        </Button>
        <a href="#quick-access" className="text-[14px] font-medium text-[#4a4c52] hover:text-black transition-colors">
          Handbook
        </a>
        <a href="#directory" className="text-[14px] font-medium text-[#4a4c52] hover:text-black transition-colors">
          Resources
        </a>
        <a href="#directory" className="text-[14px] font-medium text-[#4a4c52] hover:text-black transition-colors">
          Help
        </a>
      </nav>

      {/* Right Header Action Icons & Search */}
      <div className="flex items-center gap-2.5">
        {/* Quick Search Shortcut Input */}
        <div className="relative hidden lg:block w-48">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10" />
          <Input
            type="text"
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-[12px] bg-white text-black placeholder:text-gray-500 border-gray-300 h-9"
          />
        </div>

        {/* High Contrast Notification Icon */}
        <Button variant="outline" size="icon" className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-black shadow-2xs">
          <Bell className="w-4 h-4 text-gray-800" />
        </Button>

        {/* High Contrast Settings Icon */}
        <Button variant="outline" size="icon" className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-black shadow-2xs">
          <Settings className="w-4 h-4 text-gray-800" />
        </Button>

        {/* Profile Avatar */}
        <Avatar className="w-9 h-9 border-2 border-white shadow-xs ml-1">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="User profile" />
        </Avatar>
      </div>
    </header>
  );
};
