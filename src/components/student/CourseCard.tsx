import Link from "next/link";
import { BookOpen, User } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { EnrolledCourse } from "@/types/database";

interface CourseCardProps {
  enrollment: EnrolledCourse;
  progressPercentage: number;
}

export function CourseCard({ enrollment, progressPercentage }: CourseCardProps) {
  const { course } = enrollment;

  return (
    <Link
      href={`/student/courses/${course.course_id}`}
      className="block group bg-surface rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-md transition-all"
    >
      <div className="p-5 border-b border-border/50">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-bold text-accent bg-bg-dark px-2 py-1 rounded-md tracking-wide">
            {course.course_code}
          </span>
          <StatusBadge status={enrollment.status} />
        </div>
        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {course.course_title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2 min-h-[2.5rem]">
          {course.description || "No description available."}
        </p>
      </div>

      <div className="p-5 bg-bg-page/50 space-y-4">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <User className="w-4 h-4 text-primary/70" />
          <span>{course.instructor_profile.user.full_name}</span>
        </div>
        <ProgressBar value={progressPercentage} showLabel />
      </div>
    </Link>
  );
}
