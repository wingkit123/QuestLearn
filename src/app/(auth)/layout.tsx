export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <span className="w-10 h-10 rounded-lg bg-accent text-bg-dark font-extrabold flex items-center justify-center text-sm">
            QL
          </span>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">
              QuestLearn
            </h1>
            <p className="text-text-light text-xs">
              Smart Interactive Learning
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-surface rounded-xl shadow-2xl border border-border p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
