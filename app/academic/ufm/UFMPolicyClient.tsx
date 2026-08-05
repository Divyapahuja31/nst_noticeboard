"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  Download,
  Mail,
  FileText,
  ChevronRight,
  ExternalLink,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface UFMPolicyClientProps {
  initialPolicies: any[];
}

const FALLBACK_POLICIES = [
  {
    _id: "ufm-2024",
    id: "ufm-2024",
    title: "Academic Integrity & UFM Policy 2024",
    description: "This policy outlines the institution's commitment to academic honesty, defines Unfair Means (UFM), and establishes procedures for reporting, investigating, and penalizing instances of academic misconduct.",
    file_link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    audience: "All",
    updatedDate: "Updated Aug 01, 2024",
    date: "2024-08-01T00:00:00.000Z",
    documentRef: "DOC-2024-UFM",
    category: { name: "Academic" }
  },
  {
    _id: "academic-integrity",
    id: "academic-integrity",
    title: "Academic Integrity & Grading Code",
    description: "Standard protocols for plagiarism detection, citation guidelines, and letter grade appeals.",
    file_link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    audience: "All",
    updatedDate: "Updated Jul 15, 2024",
    date: "2024-07-15T00:00:00.000Z",
    documentRef: "DOC-2024-ACG",
    category: { name: "Academic" }
  }
];

export default function UFMPolicyClient({ initialPolicies }: UFMPolicyClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Use DB policies if they exist, otherwise use fallback policies
  const policies = useMemo(() => {
    return initialPolicies.length > 0 ? initialPolicies : FALLBACK_POLICIES;
  }, [initialPolicies]);

  // Filtered policies based on search query
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const titleMatch = (policy.title || policy.name || "").toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = (policy.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || descMatch;
    });
  }, [policies, searchQuery]);

  // Selected policy state (default to first item if available)
  const [selectedPolicy, setSelectedPolicy] = useState<any>(
    filteredPolicies[0] || policies[0] || null
  );

  // Helper to format Google Drive link or use Google Docs Viewer to bypass X-Frame-Options blocks
  const getPreviewUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      if (url.includes("/file/d/")) {
        const matches = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (matches && matches[1]) {
          return `https://drive.google.com/file/d/${matches[1]}/preview`;
        }
      }
      if (!url.endsWith("/preview")) {
        return url.replace(/\/view(\?.*)?$/, "") + "/preview";
      }
      return url;
    }
    // Use Google Docs Viewer for other PDF/document links to bypass SAMEORIGIN iframe blocking
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const handleDownload = (policy: any) => {
    if (policy.file_link) {
      window.open(policy.file_link, "_blank");
    } else {
      alert("No download file link available for this policy.");
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans antialiased text-[#0d0e12] pb-24">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E6E2D8] px-4 sm:px-8 md:px-12 py-4">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          {/* Back button */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] font-bold text-[#0d0e12] hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Academic</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0d0e12] font-semibold">Academic & UFM Policies</span>
          </nav>

          {/* Spacer */}
          <div className="w-5 h-5 sm:hidden" />
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 md:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Policy List Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Search and Filters Box */}
            <div className="bg-white border border-[#E6E2D8]/70 rounded-[12px] p-5 shadow-xs">
              <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Search Academic Policies
              </h5>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 z-10" />
                <Input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-[13px] bg-white text-black placeholder:text-gray-500 border-gray-300 h-10 w-full"
                />
              </div>
            </div>

            {/* Policy Cards List */}
            <div className="space-y-3">
              {filteredPolicies.length === 0 ? (
                <div className="bg-white border border-[#E6E2D8]/70 rounded-[12px] p-6 text-center shadow-2xs">
                  <p className="text-[14px] text-gray-500 font-medium">No academic policies found matching search.</p>
                </div>
              ) : (
                filteredPolicies.map((policy) => {
                  const isSelected = selectedPolicy?._id === policy._id;
                  return (
                    <div
                      key={policy._id}
                      onClick={() => setSelectedPolicy(policy)}
                      className={`bg-white border p-4.5 rounded-[12px] cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-xs flex items-start justify-between gap-3 group ${
                        isSelected
                          ? "border-blue-600 ring-2 ring-blue-500/20"
                          : "border-[#E6E2D8] hover:border-gray-400"
                      }`}
                    >
                      <div className="space-y-1">
                        <h4 className="text-[15.5px] font-bold text-[#0d0e12] group-hover:text-blue-600 transition-colors line-clamp-2">
                          {policy.title || policy.name}
                        </h4>
                        <p className="text-[12px] text-gray-500 font-medium">
                          {policy.updatedDate}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform mt-1 shrink-0" />
                    </div>
                  );
                })
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-white border border-[#E6E2D8]/70 rounded-[12px] p-5 shadow-xs">
              <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Policy Contact
              </h5>
              <h4 className="text-[15px] font-bold text-[#0d0e12] mt-2">
                Office of Academic Integrity
              </h4>
              <p className="text-[13.5px] text-gray-500 mt-1">
                For queries regarding guidelines and cases.
              </p>
              <a
                href="mailto:integrity@university.edu"
                className="text-[14px] text-blue-600 font-semibold hover:underline block mt-3"
              >
                integrity@university.edu
              </a>

              <hr className="my-4 border-gray-100" />

              <a
                href="mailto:dean.academic@university.edu?subject=Academic%20Integrity%20Query"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#F4F2EC] hover:bg-[#EAE7DF] text-[#0d0e12] border border-[#E6E2D8] rounded-[8px] py-2.5 text-[13.5px] font-bold transition-colors"
              >
                <Mail className="w-4 h-4 text-gray-600" />
                Contact Academic Dean
              </a>
            </div>
          </aside>

          {/* Right Column - Selected Policy Details Panel */}
          <main className="lg:col-span-8 bg-white border border-[#E6E2D8]/70 rounded-[16px] p-6 sm:p-10 shadow-xs min-h-[600px]">
            {selectedPolicy ? (
              <div className="space-y-6">
                {/* Badges & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 bg-[#E6F4EA] text-[#137333] px-3.5 py-1.5 rounded-full text-[13px] font-bold border border-[#CEEAD6]">
                      <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse" />
                      Active
                    </span>
                    <Badge variant="outline" className="font-mono text-[12.5px] border-gray-300 bg-gray-50 text-gray-700 font-semibold px-3 py-1">
                      Ref: {selectedPolicy.documentRef}
                    </Badge>
                  </div>
                </div>

                {/* Policy Title */}
                <h1 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-[#0d0e12] leading-[1.1] tracking-tight">
                  {selectedPolicy.title || selectedPolicy.name}
                </h1>

                {/* Date Row */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Effective: <strong className="text-black font-semibold">August 1, 2024</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{selectedPolicy.updatedDate}</span>
                  </div>
                </div>

                {/* Summary Description block */}
                <div className="bg-[#FAF9F6] border border-[#E6E2D8]/70 rounded-[12px] p-5">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Summary</h3>
                  <p className="text-[15px] sm:text-[15.5px] text-[#333] leading-relaxed">
                    {selectedPolicy.description}
                  </p>
                </div>

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row gap-3 items-center pt-2">
                  <Button
                    onClick={() => handleDownload(selectedPolicy)}
                    className="w-full sm:w-auto bg-[#0056cc] hover:bg-[#0047b3] text-white font-bold px-6 py-5 rounded-[8px] text-[14px] shadow-sm flex items-center justify-center gap-2 border-0"
                  >
                    <Download className="w-4.5 h-4.5" />
                    Download PDF Document
                  </Button>

                  {selectedPolicy.file_link && (
                    <a
                      href={selectedPolicy.file_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 border border-[#E6E2D8] hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2.5 rounded-[8px] text-[13.5px] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open File Link
                    </a>
                  )}
                </div>

                {/* PDF Live Preview Section */}
                {selectedPolicy.file_link ? (
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4.5 h-4.5 text-gray-500" />
                      <h3 className="font-extrabold text-[15px] text-[#0d0e12]">Document Live Preview</h3>
                    </div>
                    <div className="border border-[#E6E2D8] rounded-[12px] overflow-hidden bg-gray-100 h-[600px] shadow-2xs relative">
                      <iframe
                        src={getPreviewUrl(selectedPolicy.file_link)}
                        className="w-full h-full border-0 absolute inset-0"
                        allow="autoplay"
                        title="Document Preview"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-[#E6E2D8] rounded-[12px] p-8 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
                    <Info className="w-8 h-8 text-gray-400" />
                    <p className="text-[14px] font-medium">No live document preview available. Please download the PDF above.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-20 gap-3">
                <FileText className="w-12 h-12 text-gray-300" />
                <p className="text-[16px] font-semibold">Select a policy to view details</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
