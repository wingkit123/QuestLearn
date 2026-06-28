import { getCurrentUser } from "@/lib/auth/helpers";
import { Users, Search, AlertCircle, CheckCircle } from "lucide-react";

export default async function AdvisorStudentsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const students = [
    { id: 1, name: "Alice Johnson", email: "alice.j@student.example.com", status: "At Risk", count: 3 },
    { id: 2, name: "Bob Smith", email: "bob.s@student.example.com", status: "At Risk", count: 2 },
    { id: 3, name: "Charlie Davis", email: "charlie.d@student.example.com", status: "Stable", count: 0 },
    { id: 4, name: "David Miller", email: "david.m@student.example.com", status: "Stable", count: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">My Advisees</h1>
        <p className="text-text-muted">Overview of all students assigned to your department.</p>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-page/50 text-text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">Student Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-center">Open Alerts</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-bg-page/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-text">{s.name}</td>
                <td className="px-6 py-4 text-text-muted">{s.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    s.status === "At Risk" ? "bg-danger-bg/45 text-danger" : "bg-success-bg/45 text-success"
                  }`}>
                    {s.status === "At Risk" ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-text">
                  {s.count > 0 ? <span className="text-danger">{s.count}</span> : <span className="text-text-muted">—</span>}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-sm font-semibold text-primary hover:underline">
                    View Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
