import { BookOpen, AlertCircle, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = <SearchX className="w-8 h-8 text-text-muted" />,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center bg-surface border border-border border-dashed rounded-xl",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-bg-page flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
