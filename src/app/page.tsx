import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/helpers";
import { ROLE_DASHBOARD_PATH } from "@/lib/constants";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(ROLE_DASHBOARD_PATH[user.role]);
  }

  redirect("/login");
}
