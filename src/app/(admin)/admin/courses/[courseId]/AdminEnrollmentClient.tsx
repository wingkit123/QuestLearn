"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle, XCircle, Users, UserPlus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  course: any;
  courseId: string;
  initialEnrollments: any[];
  allStudents: any[];
}

export function AdminEnrollmentClient({
  course,
  courseId,
  initialEnrollments,
  allStudents,
}: Props) {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const supabase = createClient();

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;
    setEnrollLoading(true);

    try {
      const studentIdNum = parseInt(selectedStudentId);

      const isAlreadyEnrolled = enrollments.some(
        (e: any) => e.student_profile?.student_profile_id === studentIdNum
      );
      if (isAlreadyEnrolled) {
        showToast("Student is already enrolled in this course.", "error");
        setEnrollLoading(false);
        return;
      }

      const { data: newEnroll, error } = await supabase
        .from("enrollment")
        .insert({
          student_profile_id: studentIdNum,
          course_id: parseInt(courseId),
          status: "active",
        })
        .select(`
          enrollment_id,
          status,
          student_profile:student_profile_id (
            student_profile_id,
            student_no,
            user:user_id (
              full_name,
              email
            )
          )
        `)
        .single();

      if (error) throw error;

      setEnrollments((prev) => [...prev, newEnroll]);
      showToast("Student successfully enrolled in this course!");
      setSelectedStudentId("");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to enroll student.", "error");
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleRemoveEnrollment = async (enrollmentId: number) => {
    if (!confirm("Are you sure you want to remove this student from the course?")) return;

    try {
      const { error } = await supabase
        .from("enrollment")
        .delete()
        .eq("enrollment_id", enrollmentId);

      if (error) throw error;

      setEnrollments((prev) => prev.filter((e) => e.enrollment_id !== enrollmentId));
      showToast("Student removed from course.");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to remove student.", "error");
    }
  };

  // Find students not currently enrolled
  const unenrolledStudents = allStudents.filter(
    (student) => !enrollments.some((e: any) => e.student_profile?.student_profile_id === student.student_profile_id)
  );

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20 relative space-y-8">
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

      <Link
        href="/admin/courses"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <div className="bg-surface rounded-xl border border-border p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-accent bg-bg-dark px-2.5 py-1 rounded-md tracking-wide">
                {course.course_code}
              </span>
              <span className="text-xs font-bold text-success bg-success-bg/20 px-2.5 py-1 rounded-md">
                Active Registry
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">{course.course_title}</h1>
            <p className="text-text-muted max-w-2xl">{course.description || "No description."}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enroll form */}
        <div className="lg:col-span-1 bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" /> Enroll a Student
          </h2>
          <form onSubmit={handleEnrollStudent} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">
                Select Student
              </label>
              <select
                required
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm font-semibold"
              >
                <option value="">-- Choose a student --</option>
                {unenrolledStudents.map((s) => (
                  <option key={s.student_profile_id} value={s.student_profile_id}>
                    {s.user?.full_name} ({s.user?.email})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={enrollLoading || !selectedStudentId}
              className="w-full px-6 py-2.5 bg-primary hover:bg-primary-light disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-all"
            >
              {enrollLoading ? "Enrolling..." : "Enroll Student"}
            </button>
          </form>
        </div>

        {/* Enrolled Students list */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-border bg-bg-page/50">
            <h2 className="text-lg font-bold text-text flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Registry Roll ({enrollments.length})
            </h2>
          </div>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-page/50 text-text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold">Student Name</th>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-muted italic">
                    No students currently enrolled.
                  </td>
                </tr>
              ) : (
                enrollments.map((e: any) => {
                  const sp = e.student_profile;
                  return (
                    <tr key={e.enrollment_id} className="hover:bg-bg-page/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-text">
                        <div>{sp.user?.full_name}</div>
                        <div className="text-[10px] text-text-muted font-normal mt-0.5">{sp.user?.email}</div>
                      </td>
                      <td className="px-6 py-4 text-text-muted">{sp.student_no}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg/40 text-success">
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleRemoveEnrollment(e.enrollment_id)}
                          className="p-2 text-text-muted hover:text-danger rounded-lg hover:bg-danger/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
