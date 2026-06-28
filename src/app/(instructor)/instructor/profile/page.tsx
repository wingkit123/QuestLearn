import { getCurrentUser } from "@/lib/auth/helpers";
import { User, Mail, Shield, Award, Calendar, Contact } from "lucide-react";

export default async function InstructorProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Instructor Profile</h1>
        <p className="text-text-muted">Manage your instructor account and office availability details.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-surface border border-border rounded-xl p-6 text-center space-y-4 shadow-sm">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 text-primary font-bold text-3xl flex items-center justify-center border-2 border-primary/20">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">{user.fullName}</h2>
            <p className="text-sm text-text-muted">Faculty Member</p>
          </div>
          <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-xs font-semibold text-success bg-success-bg/20 py-1.5 rounded-lg">
            <Shield className="w-4 h-4" /> Instructor Role
          </div>
        </div>

        {/* Account Details */}
        <div className="md:col-span-2 bg-surface border border-border rounded-xl p-6 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-text border-b border-border pb-3 flex items-center gap-2">
            <Contact className="w-5 h-5 text-primary" /> Faculty Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Full Name</span>
              <div className="flex items-center gap-2 text-sm text-text font-medium bg-bg-page/50 p-3 rounded-lg border border-border">
                <User className="w-4 h-4 text-text-muted" /> {user.fullName}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address</span>
              <div className="flex items-center gap-2 text-sm text-text font-medium bg-bg-page/50 p-3 rounded-lg border border-border">
                <Mail className="w-4 h-4 text-text-muted" /> {user.email}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Staff ID</span>
              <div className="flex items-center gap-2 text-sm text-text font-medium bg-bg-page/50 p-3 rounded-lg border border-border">
                <Award className="w-4 h-4 text-text-muted" /> QL-INS-001
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Office Hours</span>
              <div className="flex items-center gap-2 text-sm text-text font-medium bg-bg-page/50 p-3 rounded-lg border border-border">
                <Calendar className="w-4 h-4 text-text-muted" /> Mon, Wed 10:00 - 12:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
