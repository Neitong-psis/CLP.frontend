import dynamic from "next/dynamic";
import type { DashboardSkeletonVariant } from "@/config/dashboard-pages";
import { SkeletonBlock } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/clp/page-container";

const PageSkeleton = dynamic(
  () =>
    import("@/components/skeletons/page-skeletons").then((module) => ({
      default: module.PageSkeleton,
    })),
  {
    loading: () => (
      <PageContainer as="main" className="space-y-6">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-64 w-full" />
      </PageContainer>
    ),
  },
);

interface DashboardPageViewProps {
  readonly variant: DashboardSkeletonVariant;
}

/** Placeholder page body — swap skeleton sections for real UI when APIs land. */
export function DashboardPageView({ variant }: DashboardPageViewProps) {
  return <PageSkeleton variant={variant} />;
}
