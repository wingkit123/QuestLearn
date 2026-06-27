import { cn } from "@/lib/utils";

type Status =
  | "completed"
  | "in_progress"
  | "not_started"
  | "draft"
  | "published"
  | "active"
  | "withdrawn"
  | "closed"
  | "archived"
  | "submitted"
  | "under_review"
  | "graded"
  | "returned"
  | "open"
  | "reviewed"
  | "resolved"
  | "dismissed";

const statusStyles: Record<Status, string> = {
  // Success (Green)
  completed: "bg-success-bg text-success",
  published: "bg-success-bg text-success",
  active: "bg-success-bg text-success",
  graded: "bg-success-bg text-success",
  resolved: "bg-success-bg text-success",

  // Warning (Yellow/Orange)
  in_progress: "bg-warning-bg text-warning",
  draft: "bg-warning-bg text-warning",
  under_review: "bg-warning-bg text-warning",
  open: "bg-warning-bg text-warning",

  // Danger (Red)
  withdrawn: "bg-danger-bg text-danger",
  closed: "bg-danger-bg text-danger",
  returned: "bg-danger-bg text-danger",

  // Neutral (Gray)
  not_started: "bg-neutral-bg text-neutral",
  archived: "bg-neutral-bg text-neutral",
  submitted: "bg-neutral-bg text-neutral",
  reviewed: "bg-neutral-bg text-neutral",
  dismissed: "bg-neutral-bg text-neutral",
};

export function StatusBadge({ status }: { status: Status }) {
  const formattedStatus = status.replace(/_/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize",
        statusStyles[status] || "bg-neutral-bg text-neutral"
      )}
    >
      {formattedStatus}
    </span>
  );
}
