"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PendingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Error signing out:", err);
      // Fallback
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center animate-in fade-in duration-500">
      <div className="w-16 h-16 rounded-full bg-warning-bg flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-warning" />
      </div>
      <h2 className="text-2xl font-bold text-text mb-2">Account Pending</h2>
      <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
        Your instructor account is awaiting admin approval. You&apos;ll be able
        to access the platform once your account has been activated.
      </p>
      <button
        onClick={handleSignOut}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all disabled:opacity-70 shadow-sm"
      >
        {loading ? "Signing out..." : "Back to login"}
      </button>
    </div>
  );
}
