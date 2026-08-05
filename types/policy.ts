import { ObjectId } from "mongodb";

export interface Policy {
  _id?: ObjectId | string;
  id: string;
  title: string;
  name?: string;
  pdfUrl?: string;
  file_link?: string;
  category: any;
  audience: "All" | "Undergraduate" | "Postgraduate" | "Hostel / Campus" | string;
  updatedDate: string;
  description: string;
  fullContent: string;
  documentRef: string;
  [key: string]: any;
}