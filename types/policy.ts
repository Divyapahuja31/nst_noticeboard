import { ObjectId } from "mongodb";
import { Category } from "./category";

export interface Policy {
  _id?: ObjectId;
  name: string;
  date: Date;
  description: string;
  category: Category;
  file_link?: string;
}