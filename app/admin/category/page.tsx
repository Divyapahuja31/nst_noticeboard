import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { addCategory } from "@/app/actions/AddCategory";

export default async function AdminCategoryPage() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/signin");
  }

  return (
    <form action={addCategory}>
      <input name="name" placeholder="Category Name" required />
      <textarea name="description" placeholder="Description" required />
      <button type="submit">Add Category</button>
    </form>
  );
}
