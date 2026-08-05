"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IconPicker } from "@/components/ui/icon-picker";

function CategoryForm({ addCategory }: { addCategory: (formData: FormData) => void }) {
  const [icon, setIcon] = useState("ShoppingBag");
  const [color, setColor] = useState("#3B82F6");

  return (
    <form action={addCategory} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input
          name="name"
          placeholder="Category Name"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Icon</label>
        <input type="hidden" name="icon" value={icon} />
        <IconPicker
          value={icon}
          onValueChange={setIcon}
          searchPlaceholder="Search icons..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <input type="hidden" name="color" value={color} />
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Category
      </button>
    </form>
  );
}

export default CategoryForm;
