"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Policy } from "@/types/policy";
import { POLICIES_DATA } from "@/lib/policiesData";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { QuickAccessGrid } from "@/components/QuickAccessGrid";
import { FilterSidebar } from "@/components/FilterSidebar";
import { PolicyCard } from "@/components/PolicyCard";
import { PolicyDetailModal } from "@/components/PolicyDetailModal";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [policies, setPolicies] = useState<Policy[]>(POLICIES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAudienceFilter, setActiveAudienceFilter] = useState<string>("All");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  // Reset pagination count when filters change
  useEffect(() => {
    setVisibleCount(5);
  }, [searchQuery, activeAudienceFilter, activeCategoryFilter]);

  // Filtered Policies
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAudience =
        activeAudienceFilter === "All" ||
        policy.audience === activeAudienceFilter ||
        policy.audience === "All";

      const matchesCategory =
        activeCategoryFilter === "All" ||
        policy.category.toLowerCase() === activeCategoryFilter.toLowerCase();

      return matchesSearch && matchesAudience && matchesCategory;
    });
  }, [policies, searchQuery, activeAudienceFilter, activeCategoryFilter]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveAudienceFilter("All");
    setActiveCategoryFilter("All");
    setVisibleCount(5);
  };

  const handleLoadSampleData = () => {
    setPolicies(POLICIES_DATA);
    handleResetFilters();
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#0d0e12] py-6 px-4 sm:px-8 md:px-12 lg:px-16 relative overflow-x-hidden">
      {/* Main Content Wrapper */}
      <div className="max-w-[1240px] mx-auto">
        {/* Modular Navigation Bar */}
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategoryFilter={activeCategoryFilter}
          setActiveCategoryFilter={setActiveCategoryFilter}
          setActiveAudienceFilter={setActiveAudienceFilter}
        />

        {/* Modular Hero Section */}
        <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Modular Quick Access Grid */}
        <QuickAccessGrid
          activeCategoryFilter={activeCategoryFilter}
          setActiveCategoryFilter={setActiveCategoryFilter}
        />

        {/* Modular Directory Section */}
        <section id="directory" className="mt-14 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Modular Filter Sidebar */}
            <FilterSidebar
              activeAudienceFilter={activeAudienceFilter}
              setActiveAudienceFilter={setActiveAudienceFilter}
              activeCategoryFilter={activeCategoryFilter}
              setActiveCategoryFilter={setActiveCategoryFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Policy List Directory */}
            <div className="lg:col-span-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-[24px] font-bold text-[#0d0e12] tracking-tight">
                    Recently Updated
                  </h3>
                  <p className="text-[13.5px] text-gray-500">
                    Official regulatory documentation and academic policy records
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {policies.length > 0 && (
                    <button
                      onClick={() => setPolicies([])}
                      className="text-[12px] font-medium text-gray-400 hover:text-red-600 transition-colors"
                      title="Test Empty Database State"
                    >
                      [Simulate Empty DB]
                    </button>
                  )}
                  <Badge variant="secondary" className="px-3.5 py-1.5 text-[13px] font-normal text-gray-700 bg-[#F4F2EC]">
                    Showing <span className="font-bold text-black mx-1">{Math.min(visibleCount, filteredPolicies.length)}</span> of {filteredPolicies.length} policies
                  </Badge>
                </div>
              </div>

              {/* Policy Cards List or Empty State */}
              {policies.length === 0 ? (
                <EmptyState
                  isDatabaseEmpty={true}
                  onLoadSampleData={handleLoadSampleData}
                />
              ) : filteredPolicies.length > 0 ? (
                <div className="space-y-4">
                  {filteredPolicies.slice(0, visibleCount).map((policy) => (
                    <PolicyCard
                      key={policy.id}
                      policy={policy}
                      onSelect={(p) => setSelectedPolicy(p)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  isDatabaseEmpty={false}
                  onResetFilters={handleResetFilters}
                />
              )}

              {filteredPolicies.length > visibleCount && (
                <div className="mt-8 text-center">
                  <Button
                    variant="link"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                    className="text-[14px] font-bold text-[#0d0e12] underline underline-offset-4"
                  >
                    Load More Policies
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Modular Policy Detail Modal */}
      <PolicyDetailModal
        policy={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
    </div>
  );
}
