import { FileText, Award } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { TEMPLATE_STATUS_STYLE, type CertTemplate } from '../_lib/data';

export function TemplateCard({
  tpl,
  onEdit,
  issuedTimesLabel,
  editTemplateLabel,
}: {
  tpl: CertTemplate;
  onEdit: (tpl: CertTemplate) => void;
  issuedTimesLabel: string;
  editTemplateLabel: string;
}) {
  return (
    <div className="border-border bg-card hover:border-border/80 overflow-hidden rounded-xl border shadow transition-colors">
      {tpl.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tpl.thumbnailUrl}
          alt={tpl.name}
          className="bg-surface h-32 w-full object-cover"
        />
      ) : tpl.fileName ? (
        <div className="bg-surface flex h-32 flex-col items-center justify-center gap-2 px-4">
          <FileText className="h-6 w-6 text-blue-500" />
          <p className="text-muted-foreground max-w-full truncate text-[11px] font-medium">
            {tpl.fileName}
          </p>
        </div>
      ) : (
        <div className="bg-surface p-5">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
            <Award className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="bg-muted h-2 w-full rounded-full" />
            <div className="bg-muted h-2 w-4/5 rounded-full" />
            <div className="h-2 w-3/5 rounded-full bg-blue-500/20" />
            <div className="bg-muted h-2 w-full rounded-full" />
            <div className="bg-muted h-2 w-2/3 rounded-full" />
          </div>
          <div className="bg-muted mt-3 h-1.5 w-1/3 rounded-full" />
        </div>
      )}
      <div className="border-border border-t px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-foreground text-sm font-bold">{tpl.name}</p>
          <span
            className={cn(
              'text-xs font-semibold',
              TEMPLATE_STATUS_STYLE[tpl.status],
            )}
          >
            {tpl.status}
          </span>
        </div>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {tpl.category}
        </p>
        <p className="text-muted-foreground mt-1.5 flex items-center gap-1 text-[11px]">
          <FileText className="h-3 w-3" />
          {issuedTimesLabel}
        </p>
        <Button
          variant="ghost"
          onClick={() => onEdit(tpl)}
          className="border-border text-foreground hover:bg-muted mt-3 h-auto w-full rounded-lg border py-1.5 text-xs font-semibold transition-colors"
        >
          {editTemplateLabel}
        </Button>
      </div>
    </div>
  );
}
