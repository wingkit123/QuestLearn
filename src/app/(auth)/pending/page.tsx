import { Clock } from "lucide-react";
import Link from "next/link";

export default function PendingPage() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-warning-bg flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-warning" />
      </div>
      <h2 className="text-2xl font-bold text-text mb-2">Account Pending</h2>
      <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
        Your instructor account is awaiting admin approval. You&apos;ll be able
        to access the platform once your account has been activated.
      </p>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-light transition-colors"
      >
        Back to login
      </Link>
    </div>
  );
}
