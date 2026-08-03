import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/signin');
  }

  return <div>Hi {session.user.role}!</div>;
}
