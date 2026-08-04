import mongoose, { models, model, Schema } from "mongoose";

const PolicySchema = new Schema(
  {
    name: {type: String, required: true},
    date: { type: Date, required: true, default: Date.now},
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    file_link: { type: String }
  },
  { timestamps: true }
);

export const Policy = models.Policy || model("Policy", PolicySchema);