"use client";

import React, { useState, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

// Curated list of popular, practical category icons for fast performance & clean UX
export const POPULAR_CATEGORY_ICONS = [
  "ShoppingBag", "Folder", "Tag", "Bookmark", "Star", "Heart", "Bell",
  "Briefcase", "Calendar", "Camera", "FileText", "Grid", "Home", "Image",
  "Info", "Layers", "Layout", "Link", "List", "Mail", "MapPin", "MessageSquare",
  "Package", "Paperclip", "Percent", "Phone", "Pin", "Send", "Settings",
  "Share2", "Shield", "ShoppingCart", "Smartphone", "Smile", "Sliders",
  "Terminal", "User", "Users", "Video", "Zap", "Award", "Box", "Clock",
  "Compass", "CreditCard", "Database", "Edit", "Globe", "HelpCircle", "Key",
  "Lock", "Music", "Printer", "Search", "Server", "Tool", "Trash2", "Tv"
] as const;

export type IconName = typeof POPULAR_CATEGORY_ICONS[number] | string;

interface IconPickerProps {
  value?: string;
  onValueChange?: (value: string) => void;
  searchPlaceholder?: string;
  triggerPlaceholder?: string;
  className?: string;
}

// Renders dynamic Lucide icon directly from static module map without dynamic imports/waterfalls
export const IconHelper = ({ name, ...props }: { name: string } & LucideProps) => {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] || Icons.HelpCircle;
  return <IconComponent {...props} />;
};

export function IconPicker({
  value,
  onValueChange,
  searchPlaceholder = "Search category icons...",
  triggerPlaceholder = "Select an icon",
  className,
}: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    if (!search.trim()) return POPULAR_CATEGORY_ICONS;
    const term = search.toLowerCase();
    return POPULAR_CATEGORY_ICONS.filter((icon) => icon.toLowerCase().includes(term));
  }, [search]);

  const handleSelect = (iconName: string) => {
    onValueChange?.(iconName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-between gap-2 font-normal", className)}
        >
          <div className="flex items-center gap-2 truncate">
            {value ? (
              <>
                <IconHelper name={value} className="h-4 w-4 text-primary shrink-0" />
                <span>{value}</span>
              </>
            ) : (
              <span className="text-muted-foreground">{triggerPlaceholder}</span>
            )}
          </div>
          <Icons.ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3 h-8 text-xs"
        />
        <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {filteredIcons.map((iconName) => {
            const isSelected = value === iconName;
            return (
              <button
                key={iconName}
                type="button"
                title={iconName}
                onClick={() => handleSelect(iconName)}
                className={cn(
                  "flex items-center justify-center h-9 w-9 rounded-md border text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                    : "border-transparent hover:border-border"
                )}
              >
                <IconHelper name={iconName} className="h-4 w-4" />
              </button>
            );
          })}
          {filteredIcons.length === 0 && (
            <div className="col-span-6 py-4 text-center text-xs text-muted-foreground">
              No matching icons found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}