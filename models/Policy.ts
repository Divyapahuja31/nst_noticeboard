import { IPolicy } from "@/types/policy";
import mongoose, { models, model, Schema } from "mongoose";

const PolicySchema = new Schema<IPolicy>(
  {
    title: {type: String, required: true},
    description: { type: String, required: true },
    pdfUrl: { type: String },
    fullContent: { type: String},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
  },
  { timestamps: true }
);

export const Policy = models.Policy || model<IPolicy>("Policy", PolicySchema);