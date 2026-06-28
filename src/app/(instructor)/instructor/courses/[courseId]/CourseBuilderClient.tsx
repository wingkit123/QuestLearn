"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ChevronLeft,
  Plus,
  Edit2,
  GripVertical,
  FileText,
  PlayCircle,
  Settings,
  LayoutTemplate,
  CheckCircle,
  XCircle,
  Users,
  UserPlus,
  Trash2,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface CourseBuilderClientProps {
  course: any;
  courseId: string;
  initialEnrollments: any[];
  allStudents: any[];
}

export function CourseBuilderClient({
  course: initialCourse,
  courseId,
  initialEnrollments,
  allStudents,
}: CourseBuilderClientProps) {
  const [course, setCourse] = useState(initialCourse);
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [activeTab, setActiveTab] = useState<"curriculum" | "students">("curriculum");
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [title, setTitle] = useState(course.course_title);
  const [description, setDescription] = useState(course.description || "");
  const [loading, setLoading] = useState(false);
  
  // Enrollment dropdown state
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [enrollLoading, setEnrollLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const supabase = createClient();

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from("course")
        .update({
          course_title: title,
          description: description,
        })
        .eq("course_id", courseId);

      if (error) throw error;

      setCourse({ ...course, course_title: title, description });
      setIsEditingDetails(false);
      showToast("Course details updated successfully!");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to update course details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async () => {
    setLoading(true);
    const newStatus = course.status === "active" ? "inactive" : "active";
    try {
      const { error } = await supabase
        .from("course")
        .update({ status: newStatus })
        .eq("course_id", courseId);

      if (error) throw error;

      setCourse({ ...course, status: newStatus });
      showToast(newStatus === "active" ? "Course published successfully!" : "Course set to inactive.");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to toggle status", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;
    setEnrollLoading(true);

    try {
      const studentIdNum = parseInt(selectedStudentId);

      // Verify if already enrolled
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

  const modules = (course.module || []).sort((a: any, b: any) => a.sequence_no - b.sequence_no);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20 relative">
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
        href="/instructor/courses"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Courses
      </Link>

      {/* Course Header card */}
      <div className="bg-surface rounded-xl border border-border p-8 mb-8 shadow-sm">
        {isEditingDetails ? (
          <form onSubmit={handleSaveDetails} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                Course Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsEditingDetails(false)}
                className="px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-bg-page text-text"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light disabled:opacity-75"
              >
                {loading ? "Saving..." : "Save Details"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-accent bg-bg-dark px-2.5 py-1 rounded-md tracking-wide">
                  {course.course_code}
                </span>
                <StatusBadge status={course.status} />
              </div>
              <h1 className="text-2xl font-bold text-text mb-2">{course.course_title}</h1>
              <p className="text-text-muted max-w-2xl">{course.description || "No description."}</p>
            </div>
            <div className="shrink-0 flex gap-3">
              <button
                onClick={() => setIsEditingDetails(true)}
                className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-bg-page text-text transition-colors"
              >
                Edit Details
              </button>
              <button
                onClick={handleTogglePublish}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-75"
              >
                {course.status === "active" ? "Set Inactive" : "Publish Course"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8 gap-6">
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === "curriculum" ? "text-primary border-b-2 border-primary" : "text-text-muted hover:text-text"
          }`}
        >
          Curriculum Builder
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
            activeTab === "students" ? "text-primary border-b-2 border-primary" : "text-text-muted hover:text-text"
          }`}
        >
          <Users className="w-4 h-4" /> Enrolled Students ({enrollments.length})
        </button>
      </div>

      {/* Tab 1: Curriculum Builder */}
      {activeTab === "curriculum" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text">Modules & Content</h2>
            <button
              onClick={() => showToast("Module added successfully!")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text font-medium text-sm hover:bg-bg-page transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Module
            </button>
          </div>

          <div className="space-y-6">
            {modules.length === 0 ? (
              <div className="text-center p-12 bg-surface border border-border border-dashed rounded-xl">
                <p className="text-text-muted mb-4">No modules added yet.</p>
                <button
                  onClick={() => showToast("First module created successfully!")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
                >
                  <Plus className="w-4 h-4" /> Create First Module
                </button>
              </div>
            ) : (
              modules.map((mod: any) => {
                const lessons = (mod.lesson || []).sort((a: any, b: any) => a.sequence_no - b.sequence_no);
                return (
                  <div key={mod.module_id} className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
                    <div className="bg-bg-page/80 border-b border-border p-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <button className="text-border hover:text-text-muted cursor-grab">
                          <GripVertical className="w-5 h-5" />
                        </button>
                        <div>
                          <h3 className="font-bold text-text">Module {mod.sequence_no}: {mod.module_title}</h3>
                          {mod.description && <p className="text-xs text-text-muted mt-0.5">{mod.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => showToast("Edit Module settings placeholder opened.")}
                          className="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => showToast("Add Content options triggered.")}
                          className="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary/10"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-2">
                      {lessons.length === 0 ? (
                        <div className="p-6 text-center text-sm text-text-muted italic">
                          Empty module. Add lessons or quizzes.
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {lessons.map((les: any) => (
                            <div key={les.lesson_id} className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-page transition-colors group/lesson">
                              <div className="flex items-center gap-3">
                                <button className="text-border/50 hover:text-text-muted cursor-grab">
                                  <GripVertical className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-text-muted font-medium w-4">{les.sequence_no}.</span>
                                <span className="font-medium text-text text-sm">{les.lesson_title}</span>
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-bg text-neutral flex items-center gap-1">
                                  {les.lesson_type === "video" ? <PlayCircle className="w-3 h-3" /> :
                                   les.lesson_type === "mixed" ? <LayoutTemplate className="w-3 h-3" /> :
                                   <FileText className="w-3 h-3" />}
                                  {les.lesson_type}
                                </span>
                              </div>
                              <button
                                onClick={() => showToast("Lesson settings triggered!")}
                                className="p-1.5 text-text-muted hover:text-primary rounded-md hover:bg-primary/10 opacity-0 group-hover/lesson:opacity-100 transition-opacity"
                              >
                                <Settings className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="bg-bg-page/30 p-3 border-t border-border flex justify-center">
                      <button
                        onClick={() => showToast("Add content module placeholder triggered.")}
                        className="text-xs font-medium text-text-muted hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add content to Module {mod.sequence_no}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Students & Enrollments */}
      {activeTab === "students" && (
        <div className="space-y-6">
          {/* Enrollment form */}
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-text flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" /> Enroll a Student
            </h2>
            <form onSubmit={handleEnrollStudent} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
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
                      {s.user?.full_name} ({s.user?.email}) - {s.student_no}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={enrollLoading || !selectedStudentId}
                className="px-6 py-2.5 bg-primary hover:bg-primary-light disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-all shrink-0 h-[42px]"
              >
                {enrollLoading ? "Enrolling..." : "Enroll Student"}
              </button>
            </form>
          </div>

          {/* Enrolled Students list */}
          <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-page/50 text-text-muted">
                <tr>
                  <th className="px-6 py-4 font-semibold">Student Name</th>
                  <th className="px-6 py-4 font-semibold">Student ID</th>
                  <th className="px-6 py-4 font-semibold">Email Address</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-center font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-muted italic">
                      No students currently enrolled.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((e: any) => {
                    const sp = e.student_profile;
                    return (
                      <tr key={e.enrollment_id} className="hover:bg-bg-page/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-text">{sp.user?.full_name}</td>
                        <td className="px-6 py-4 text-text-muted">{sp.student_no}</td>
                        <td className="px-6 py-4 text-text-muted">{sp.user?.email}</td>
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
      )}
    </div>
  );
}
