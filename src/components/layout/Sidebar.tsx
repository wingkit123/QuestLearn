"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROLE_NAV, type RoleId } from "@/lib/constants";
import * as Icons from "lucide-react";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Sidebar({ role }: { role: RoleId }) {
  const pathname = usePathname();
  const navItems = ROLE_NAV[role];
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-[var(--spacing-sidebar)] bg-bg-dark text-text-light flex flex-col h-screen fixed top-0 left-0 border-r border-border/10">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-accent text-bg-dark font-extrabold flex items-center justify-center text-xs">
            QL
          </span>
          <span className="text-white font-bold tracking-tight">QuestLearn</span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          // Determine if active: either exact match, or starts with + '/' (so /student doesn't match /student/courses but does match itself)
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          const IconComponent = (Icons as any)[item.icon] || Icons.Circle;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/20 text-accent"
                  : "hover:bg-primary/10 hover:text-white"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer (Logout) */}
      <div className="p-4 border-t border-border/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-danger-bg/10 hover:text-danger-bg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
