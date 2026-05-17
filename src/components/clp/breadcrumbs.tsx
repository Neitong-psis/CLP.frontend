import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

interface BreadcrumbsProps {
  readonly items: readonly BreadcrumbItem[];
  readonly className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const key = `${item.label}-${String(index)}`;

          return (
            <li key={key} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="h-4 w-4 text-[#94A3B8]" aria-hidden />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-medium text-[#64748B] transition-colors hover:text-[#0F172A]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-[#0F172A]" : "text-[#64748B]"}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
