"use client";

import { useState } from "react";
import { approveUser, declineUser } from "./actions";
import { ShieldCheck, Users, HardDrive, CheckCircle2, CheckCircle, XCircle } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { EmptyState } from "@/components/ui/EmptyState";

interface Props {
  pendingUsers: any[];
  userCount: number;
}

export function AdminDashboardClient({ pendingUsers: initialPendingUsers, userCount }: Props) {
  const [pendingUsers, setPendingUsers] = useState(initialPendingUsers);
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async (userId: number) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      await approveUser(userId);
      setPendingUsers((prev) => prev.filter((u) => u.user_id !== userId));
      showToast("Instructor account approved successfully!");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to approve instructor.", "error");
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleDecline = async (userId: number) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      await declineUser(userId);
      setPendingUsers((prev) => prev.filter((u) => u.user_id !== userId));
      showToast("Instructor account registration declined.", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to decline instructor.", "error");
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-surface border border-border rounded-xl shadow-lg p-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom duration-300">
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : (
            <XCircle className="w-5 h-5 text-danger" />
          )}
          <span className="text-sm font-semibold text-text">{toast.message}</span>
        </div>
      )}

      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Admin Dashboard</h1>
        <p className="text-text-muted">System overview and user management.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="System Status" value="Healthy" icon={ShieldCheck} className="border-success/50 bg-success-bg/30" />
        <MetricCard title="Total Users" value={userCount} icon={Users} />
        <MetricCard title="Storage Used" value="45 GB" icon={HardDrive} />
      </div>

      <section>
        <h2 className="text-lg font-bold text-text mb-4">Pending Approvals</h2>
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          {pendingUsers.length === 0 ? (
            <EmptyState
              title="No Pending Approvals"
              description="All user accounts are currently active."
              icon={<CheckCircle2 className="w-8 h-8 text-success" />}
              className="border-0 border-b-0 rounded-none bg-transparent shadow-none"
            />
          ) : (
            <div className="divide-y divide-border">
              {pendingUsers.map((pUser: any) => (
                <div key={pUser.user_id} className="p-4 flex items-center justify-between hover:bg-bg-page/50 transition-colors">
                  <div>
                    <h3 className="font-bold text-text mb-1">{pUser.full_name}</h3>
                    <div className="flex gap-3 text-sm text-text-muted">
                      <span>{pUser.email}</span>
                      <span className="capitalize px-2 py-0.5 rounded-full bg-neutral-bg text-xs font-semibold text-neutral">
                        {pUser.role?.role_name || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDecline(pUser.user_id)}
                      disabled={loading[pUser.user_id]}
                      className="px-4 py-2 border border-border text-sm font-semibold text-text rounded-lg hover:bg-bg-page transition-colors disabled:opacity-70"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleApprove(pUser.user_id)}
                      disabled={loading[pUser.user_id]}
                      className="px-4 py-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-70"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
