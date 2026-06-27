import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl border border-border p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-muted">{title}</h3>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-text">{value}</span>
      </div>
      {description && (
        <p className="text-sm text-text-muted mt-2">{description}</p>
      )}
    </div>
  );
}
