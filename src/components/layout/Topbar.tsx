"use client";

import type { AuthUser } from "@/lib/auth/helpers";

export function Topbar({ user }: { user: AuthUser }) {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left side */}
      <div></div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-border pl-6">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-text leading-tight">
              {user.fullName}
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              {user.roleName}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
