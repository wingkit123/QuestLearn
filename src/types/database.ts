/* ============================================================
   QuestLearn TypeScript types — mirrors Database-Schema.sql
   ============================================================ */

// ── Identity & Access ─────────────────────────────────────

export type Role = {
  role_id: number;
  role_name: "Student" | "Instructor" | "Academic Advisor" | "Admin";
};

export type User = {
  user_id: number;
  auth_user_id: string; // UUID from Supabase Auth
  role_id: number;
  full_name: string;
  email: string;
  account_status: "pending" | "active" | "suspended" | "deactivated";
  created_at: string;
};

export type StudentProfile = {
  student_profile_id: number;
  user_id: number;
  student_no: string;
  academic_level: string | null;
  programme: string | null;
  department: string | null;
  learning_preference: "visual" | "auditory" | "reading" | "kinesthetic" | null;
};

export type InstructorProfile = {
  instructor_profile_id: number;
  user_id: number;
  staff_no: string;
  specialization: string | null;
  subjects_taught: string | null;
  office_hours: string | null;
};

export type AdvisorProfile = {
  advisor_profile_id: number;
  user_id: number;
  staff_no: string;
  department: string | null;
  office_hours: string | null;
};

// ── Learning Structure ────────────────────────────────────

export type Course = {
  course_id: number;
  instructor_profile_id: number;
  course_code: string;
  course_title: string;
  description: string | null;
  department: string | null;
  status: "draft" | "published" | "active" | "completed" | "archived";
  created_at: string;
};

export type Module = {
  module_id: number;
  course_id: number;
  module_title: string;
  sequence_no: number;
  description: string | null;
  publish_status: "unpublished" | "published";
};

export type Lesson = {
  lesson_id: number;
  module_id: number;
  lesson_title: string;
  lesson_type: "video" | "reading" | "mixed";
  content_text: string | null;
  video_url: string | null;
  sequence_no: number;
  publish_status: "unpublished" | "published";
};

export type ContentItem = {
  content_item_id: number;
  lesson_id: number;
  content_type: "reading" | "video" | "file" | "h5p_lumi";
  title: string;
  body_text: string | null;
  resource_url: string | null;
  storage_path: string | null;
  embed_url: string | null;
  sequence_no: number;
  publish_status: "draft" | "published" | "archived";
  created_at: string;
};

export type Enrollment = {
  enrollment_id: number;
  student_profile_id: number;
  course_id: number;
  enrolled_at: string;
  status: "active" | "withdrawn" | "completed";
};

// ── Assessment & Performance ──────────────────────────────

export type Quiz = {
  quiz_id: number;
  lesson_id: number;
  quiz_title: string;
  total_marks: number;
  time_limit: number | null;
  randomized: boolean;
  publish_status: "draft" | "published" | "closed" | "archived";
};

export type Assignment = {
  assignment_id: number;
  course_id: number;
  lesson_id: number | null;
  assignment_title: string;
  description: string | null;
  deadline: string;
  total_marks: number;
  publish_status: "draft" | "published" | "closed";
  created_at: string;
};

export type AssignmentSubmission = {
  submission_id: number;
  assignment_id: number;
  student_profile_id: number;
  submitted_at: string;
  submission_url: string | null;
  status: "submitted" | "under_review" | "graded" | "returned";
  score: number | null;
  feedback: string | null;
};

export type QuestionBank = {
  question_bank_id: number;
  course_id: number;
  bank_name: string;
  description: string | null;
  is_active: boolean;
};

export type Question = {
  question_id: number;
  question_bank_id: number;
  question_type: "mcq" | "fill_in_blank" | "short_answer";
  prompt: string;
  correct_answer: string;
  explanation: string | null;
  difficulty: "easy" | "medium" | "hard";
  points: number;
};

export type QuizAttempt = {
  attempt_id: number;
  quiz_id: number;
  student_profile_id: number;
  score: number | null;
  max_score: number | null;
  submitted_at: string;
  feedback_summary: string | null;
};

export type AttemptAnswer = {
  attempt_answer_id: number;
  attempt_id: number;
  question_id: number;
  student_answer: string | null;
  is_correct: boolean | null;
  points_earned: number;
};

export type ProgressRecord = {
  progress_record_id: number;
  student_profile_id: number;
  lesson_id: number;
  completion_status: "not_started" | "in_progress" | "completed";
  percentage: number;
  updated_at: string;
};

// ── Support & Analytics ───────────────────────────────────

export type ActivityLog = {
  activity_log_id: number;
  user_id: number;
  activity_type: string;
  target_type: string | null;
  target_id: number | null;
  duration_seconds: number | null;
  metadata: Record<string, unknown> | null;
  activity_time: string;
};

export type AdvisorAlert = {
  advisor_alert_id: number;
  student_profile_id: number;
  advisor_profile_id: number | null;
  alert_type: "low_progress" | "overdue_assignment" | "low_quiz_score" | "low_engagement";
  severity: "low" | "medium" | "high";
  source_type: string | null;
  source_id: number | null;
  message: string;
  status: "open" | "reviewed" | "resolved" | "dismissed";
  created_at: string;
  resolved_at: string | null;
};

export type Notification = {
  notification_id: number;
  user_id: number;
  announcement_id: number | null;
  message: string;
  is_read: boolean;
  sent_at: string;
};

// ── Joined / composite types used by pages ────────────────

export type UserWithRole = User & {
  role: Role;
};

export type CourseWithInstructor = Course & {
  instructor_profile: InstructorProfile & {
    user: Pick<User, "full_name">;
  };
};

export type EnrolledCourse = Enrollment & {
  course: CourseWithInstructor;
};

export type LessonWithProgress = Lesson & {
  progress_record: ProgressRecord[] | null;
};

export type QuizWithQuestions = Quiz & {
  quiz_question: Array<{
    question: Question;
    sequence_no: number;
  }>;
};
