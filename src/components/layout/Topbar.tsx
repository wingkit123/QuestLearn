"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Info, AlertTriangle, CheckCircle2, Megaphone } from "lucide-react";
import type { AuthUser } from "@/lib/auth/helpers";

export function Topbar({ user }: { user: AuthUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      title: "🚨 Deadline Approaching",
      message: "SEF Part III due tonight!",
      time: "Just now",
      color: "text-danger bg-danger/10 border-danger/20",
    },
    {
      id: 2,
      title: "📚 New Content",
      message: "Lecture 12 slides uploaded.",
      time: "2 hours ago",
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      id: 3,
      title: "✅ Quiz Graded",
      message: "You scored 40% on Testing Strategies.",
      time: "1 day ago",
      color: "text-warning bg-warning/10 border-warning/20",
    },
  ];

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left side */}
      <div></div>

      {/* Right side */}
      <div className="flex items-center gap-6" ref={dropdownRef}>
        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setUnreadCount(0); // Clear badge on click
            }}
            className="relative text-text-muted hover:text-text transition-colors p-2 rounded-full hover:bg-bg-page"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="font-bold text-text text-sm">Notifications</span>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Mark all as read
                </button>
              </div>

              <div className="divide-y divide-border max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 hover:bg-bg-page/40 transition-colors flex items-start gap-3 cursor-pointer"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-text">{n.title}</span>
                        <span className="text-[10px] text-text-muted">{n.time}</span>
                      </div>
                      <p className="text-xs text-text-muted">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

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
