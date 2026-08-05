import { ICategory } from "./category";
import { Types } from "mongoose";

export interface IPolicy {
  _id: Types.ObjectId | string;
  title: string;
  description: string;
  pdfUrl?: string;
  fullContent?: string;
  category: ICategory;
  updatedAt: Date | string;
  createdAt: Date | string;
}