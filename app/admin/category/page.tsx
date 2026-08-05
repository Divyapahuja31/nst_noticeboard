import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { addCategory } from "@/app/actions/AddCategory";
import CategoryForm from "./categoryForm";

export default async function AdminCategoryPage() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/signin");
  }

  return (
    <CategoryForm addCategory={addCategory}/>
  );
}
