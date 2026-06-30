"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, ShieldAlert, MessageSquare } from "lucide-react";

interface Notification {
  notification_id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  sent_at: string;
}

export function NotificationInbox({ userId }: { userId: number }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  async function fetchNotifications() {
    try {
      const { data, error } = await supabase
        .from("notification")
        .select("*")
        .eq("user_id", userId)
        .order("sent_at", { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }

  // Mark all unread notifications as read immediately when user views the page
  async function markAllAsRead() {
    try {
      const { error } = await supabase
        .from("notification")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("is_read", false);

      if (error) throw error;

      // Update local state
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      );
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  }

  async function deleteNotification(id: number) {
    try {
      const { error } = await supabase
        .from("notification")
        .delete()
        .eq("notification_id", id);

      if (error) throw error;

      // Update local state
      setNotifications((prev) => prev.filter((n) => n.notification_id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  }

  useEffect(() => {
    fetchNotifications();

    // Subscribe to realtime notification updates
    const channel = supabase
      .channel(`notification_inbox_updates_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notification",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  // Mark notifications as read once they are loaded/rendered
  useEffect(() => {
    if (notifications.length > 0 && notifications.some((n) => !n.is_read)) {
      markAllAsRead();
    }
  }, [notifications]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.is_read;
    return true;
  });

  // Helper to parse tags like [Academic Advisory Note]
  function parseMessage(messageText: string) {
    const match = messageText.match(/^\[([\s\S]*?)\]\s*([\s\S]*)$/);
    if (match) {
      return {
        tag: match[1],
        content: match[2],
      };
    }
    return {
      tag: null,
      content: messageText,
    };
  }

  // Get icon and color scheme based on the tag
  function getTagStyles(tag: string | null) {
    if (!tag) {
      return {
        icon: Bell,
        color: "text-primary bg-primary/10 border-primary/20",
        tagColor: "bg-primary/10 text-primary border-primary/20",
      };
    }

    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes("advisory") || lowerTag.includes("advisor")) {
      return {
        icon: ShieldAlert,
        color: "text-indigo bg-indigo/10 border-indigo/20",
        tagColor: "bg-indigo/10 text-indigo border-indigo/20",
      };
    }
    if (lowerTag.includes("alert") || lowerTag.includes("warning") || lowerTag.includes("low")) {
      return {
        icon: AlertTriangle,
        color: "text-warning bg-warning/10 border-warning/20",
        tagColor: "bg-warning/10 text-warning border-warning/20",
      };
    }
    if (lowerTag.includes("log") || lowerTag.includes("intervention")) {
      return {
        icon: MessageSquare,
        color: "text-accent bg-accent/10 border-accent/20",
        tagColor: "bg-accent/10 text-accent border-accent/20",
      };
    }

    return {
      icon: Info,
      color: "text-primary bg-primary/10 border-primary/20",
      tagColor: "bg-primary/10 text-primary border-primary/20",
    };
  }

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-300">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Notifications Inbox</h1>
          <p className="text-text-muted text-sm">Stay updated with course announcements, advisory alerts, and platform notifications.</p>
        </div>
        {notifications.some((n) => !n.is_read) && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-semibold hover:bg-primary/20 transition-all self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </header>

      {/* Filter Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
            filter === "all"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
            filter === "unread"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Unread ({notifications.filter((n) => !n.is_read).length})
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-surface border border-border rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-xs text-text-muted mt-4">Loading notifications...</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="p-12 text-center bg-surface border border-border rounded-xl space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-bg flex items-center justify-center mx-auto text-text-muted">
            <Bell className="w-6 h-6" />
          </div>
          <p className="text-sm text-text-muted italic">
            {filter === "unread" ? "You have no unread notifications." : "You have no notifications in your inbox."}
          </p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl shadow-sm divide-y divide-border overflow-hidden">
          {filteredNotifications.map((n) => {
            const { tag, content } = parseMessage(n.message);
            const styles = getTagStyles(tag);
            const Icon = styles.icon;

            return (
              <div
                key={n.notification_id}
                className={`p-5 flex items-start gap-4 hover:bg-bg-page/40 transition-colors relative group ${
                  !n.is_read ? "bg-primary/5 border-l-4 border-l-primary" : ""
                }`}
              >
                <div className={`p-2.5 rounded-lg border ${styles.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 space-y-1 pr-8">
                  <div className="flex flex-wrap items-center gap-2">
                    {tag && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${styles.tagColor}`}>
                        {tag}
                      </span>
                    )}
                    <span className="text-[10px] text-text-muted">
                      {new Date(n.sent_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-text font-medium leading-relaxed mt-1">
                    {content}
                  </p>
                </div>

                <button
                  onClick={() => deleteNotification(n.notification_id)}
                  className="absolute right-5 top-5 opacity-0 group-hover:opacity-100 text-text-muted hover:text-danger transition-all p-1.5 rounded-md hover:bg-neutral-bg"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
