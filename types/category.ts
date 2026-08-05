import { ObjectId } from "mongodb";

export interface ICategory {
  _id: ObjectId | string;
  name: string;
  description: string;
  icon: string;
  color: string
}