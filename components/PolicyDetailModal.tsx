"use client";

import React from "react";
import { Download, CheckCircle2 } from "lucide-react";
import { Policy } from "@/types/policy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PolicyDetailModalProps {
  policy: Policy | null;
  onClose: () => void;
}

export const PolicyDetailModal: React.FC<PolicyDetailModalProps> = ({ policy, onClose }) => {
  return (
    <Dialog open={policy !== null} onOpenChange={(open) => !open && onClose()}>
      {policy && (
        <DialogContent onClose={onClose}>
          <DialogHeader className="space-y-3 pr-8 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="bg-black text-white">
                {policy.category}
              </Badge>
              <span className="text-[13px] text-gray-500 font-medium">
                {policy.updatedDate}
              </span>
              <Badge variant="outline" className="font-mono text-[12px] border-gray-300 bg-gray-100 text-gray-800 font-semibold">
                Ref: {policy.documentRef}
              </Badge>
            </div>
            <DialogTitle className="text-[28px] font-bold text-[#0d0e12] leading-tight">
              {policy.title}
            </DialogTitle>
          </DialogHeader>

          {/* Modal Content Body */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
            <div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Summary
              </h4>
              <p className="text-[15px] text-gray-700 font-medium">
                {policy.description}
              </p>
            </div>

            <div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Regulatory Details & Framework
              </h4>
              <div className="bg-[#F8F7F4] p-4 rounded-[10px] border border-gray-200/70 text-[14.5px] text-gray-800 leading-relaxed font-sans">
                {policy.fullContent}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[13px] text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified Official Institutional Policy — Student Affairs Board</span>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="dark"
              size="lg"
              onClick={() => alert(`Downloading official PDF for ${policy.title}...`)}
              className="w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Official PDF
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close Window
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
