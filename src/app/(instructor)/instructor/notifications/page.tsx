import { getCurrentUser } from "@/lib/auth/helpers";
import { NotificationInbox } from "@/components/notifications/NotificationInbox";
import { redirect } from "next/navigation";

export default async function InstructorNotificationsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "instructor") {
    redirect("/login");
  }

  return <NotificationInbox userId={user.userId} />;
}
