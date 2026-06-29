"use client";

import { useState } from "react";
import { createUser, updateUserStatus, deleteUser } from "./actions";
import { User, Shield, UserPlus, AlertTriangle, CheckCircle, XCircle, Trash2, Ban, ShieldAlert } from "lucide-react";

interface Props {
  users: any[];
}

export function AdminUsersClient({ users: initialUsers }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("Student");
  const [staffNo, setStaffNo] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    setLoading(true);

    try {
      await createUser({
        fullName,
        email,
        roleName,
        staffNo: staffNo.trim() || undefined,
        studentNo: studentNo.trim() || undefined,
      });

      showToast("User account added successfully!");
      setFullName("");
      setEmail("");
      setRoleName("Student");
      setStaffNo("");
      setStudentNo("");
      setIsOpen(false);
      
      // Reload page state
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to create user", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSuspend = async (userId: number, currentStatus: string) => {
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    const nextStatus = currentStatus === "suspended" ? "active" : "suspended";
    try {
      await updateUserStatus(userId, nextStatus);
      setUsers((prev) =>
        prev.map((u) => (u.user_id === userId ? { ...u, account_status: nextStatus } : u))
      );
      showToast(nextStatus === "suspended" ? "User account suspended." : "User account reactivated.");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to update user status", "error");
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleKick = async (userId: number) => {
    if (!confirm("Are you sure you want to kick/delete this user? All profile records will be deleted!")) return;
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.user_id !== userId));
      showToast("User kicked and account deleted successfully.");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to delete user", "error");
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
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

      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2">User Registry</h1>
          <p className="text-text-muted">Browse and manage platform credentials, roles, and suspension states.</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Add Registry User
        </button>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-page/50 text-text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">User Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u: any) => (
              <tr key={u.user_id} className="hover:bg-bg-page/50 transition-colors">
                <td className="px-6 py-4 font-bold text-text flex items-center gap-2">
                  <User className="w-4 h-4 text-text-muted" /> {u.full_name}
                </td>
                <td className="px-6 py-4 text-text-muted">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="capitalize px-2.5 py-0.5 rounded-full bg-neutral-bg text-xs font-semibold text-neutral">
                    {u.role?.role_name || "Student"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    u.account_status === "active" ? "bg-success-bg/40 text-success" : 
                    u.account_status === "suspended" ? "bg-danger-bg/40 text-danger" : "bg-warning-bg/40 text-warning"
                  }`}>
                    {u.account_status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleToggleSuspend(u.user_id, u.account_status)}
                    disabled={actionLoading[u.user_id]}
                    className={`p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${
                      u.account_status === "suspended" 
                        ? "bg-success/10 text-success border-success/20 hover:bg-success/20" 
                        : "bg-danger/10 text-danger border-danger/20 hover:bg-danger/20"
                    }`}
                  >
                    <Ban className="w-3.5 h-3.5" />
                    {u.account_status === "suspended" ? "Reactivate" : "Suspend"}
                  </button>
                  <button
                    onClick={() => handleKick(u.user_id)}
                    disabled={actionLoading[u.user_id]}
                    className="p-1.5 rounded-lg border border-border text-text-muted hover:text-danger hover:bg-danger/15 transition-all flex items-center gap-1 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Kick
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Add User */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 animate-in fade-in duration-200">
          <form onSubmit={handleCreateUser} className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border bg-bg-page/50">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" /> Create Registry User
              </h3>
              <p className="text-xs text-text-muted mt-1">Directly append a credentialed role profile into the platform.</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="E.g., john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">System Role</label>
                <select
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm font-semibold"
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Academic Advisor">Academic Advisor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {roleName === "Student" && (
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Student ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="E.g., STU-1123"
                    value={studentNo}
                    onChange={(e) => setStudentNo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
                  />
                </div>
              )}

              {(roleName === "Instructor" || roleName === "Academic Advisor") && (
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Staff ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="E.g., INS-3391"
                    value={staffNo}
                    onChange={(e) => setStaffNo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
                  />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-neutral-bg hover:bg-neutral-bg/80 text-text text-sm font-semibold rounded-lg border border-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg disabled:opacity-75"
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
