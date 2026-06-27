import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { getCurrentUser } from "@/lib/auth/helpers";
import { redirect } from "next/navigation";

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "instructor") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-bg-page pl-[var(--spacing-sidebar)]">
      <Sidebar role="instructor" />
      <div className="flex flex-col min-h-screen">
        <Topbar user={user} />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
