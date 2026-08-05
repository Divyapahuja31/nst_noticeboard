import { ICategory } from "@/types/category";
import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true},
    description: { type: String, required: true},
    icon: { type: String, require: true },
    color: { type: String, require: true},
  },
  { timestamps: true}
);

export const Category = models.Category || model<ICategory>("Category", CategorySchema)