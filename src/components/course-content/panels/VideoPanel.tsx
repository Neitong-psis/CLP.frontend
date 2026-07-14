import { Clock, Lightbulb, Play } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { VideoItem } from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { ContentHeader } from './ContentHeader';

/** Convert a "m:ss" or "h:mm:ss" timestamp to total seconds. */
function timeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  return parts.reduce((acc, part) => acc * 60 + part, 0);
}

interface VideoPanelProps {
  item: VideoItem;
  /** Shown under the title in the no-video placeholder (no `youtubeId`) —
   *  callers own the copy since it differs by role ("Admin preview…" vs.
   *  "Continuing from where you left off…"). */
  placeholderNote: string;
}

/** Title sits above the player now (previously below, YouTube-style) inside
 *  the same bordered card + divider every other content type uses. */
export function VideoPanel({ item, placeholderNote }: VideoPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
      {/* ── Main column: bordered card, header above the player ───────────── */}
      <div className="border-border bg-card overflow-hidden rounded-2xl border">
        <ContentHeader
          kindLabel="Video"
          title={item.title}
          meta={
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Clock className="h-3.5 w-3.5" />
              {item.duration}
            </span>
          }
        />

        <div className="p-5">
          {/* Player */}
          <div className="border-border relative aspect-video w-full overflow-hidden rounded-xl border bg-black">
            {item.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <div className="bg-brand-navy absolute inset-0 flex flex-col items-center justify-center gap-4 dark:bg-[#071225]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,163,0,0.08)_0%,transparent_70%)]" />
                <div className="bg-brand-gold relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_32px_rgba(244,163,0,0.4)]">
                  <Play className="text-brand-navy ml-1 h-7 w-7 fill-current" />
                </div>
                <div className="relative text-center">
                  <p className="text-base font-bold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-white/50">
                    {placeholderNote}
                  </p>
                </div>
              </div>
            )}
          </div>

          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {item.intro}
          </p>
        </div>
      </div>

      {/* ── Side column: lesson resources ─────────────────────────────────── */}
      <aside className="space-y-4 xl:sticky xl:top-0 xl:self-start">
        {/* In This Video */}
        <div className="border-border bg-card rounded-2xl border p-5">
          <h3 className="text-foreground flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="text-brand-gold h-4 w-4" />
            In This Video
          </h3>
          <ul className="mt-3 space-y-2.5">
            {item.topics.map((topic, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-2.5 text-sm leading-snug"
              >
                <span className="text-brand-gold mt-0.5 shrink-0 font-bold">
                  ▸
                </span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Moments — click to jump */}
        <div className="border-border bg-card rounded-2xl border p-5">
          <h3 className="text-foreground flex items-center gap-2 text-sm font-bold">
            <Clock className="text-brand-gold h-4 w-4" />
            Key Moments
          </h3>
          <div className="mt-3 space-y-1">
            {item.moments.map((moment, i) => (
              <button
                key={i}
                type="button"
                disabled={!item.youtubeId}
                onClick={() =>
                  item.youtubeId &&
                  window.open(
                    `https://www.youtube.com/watch?v=${item.youtubeId}&t=${timeToSeconds(moment.time)}s`,
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
                className={cn(
                  'hover:bg-muted/60 -mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors',
                  'disabled:cursor-default disabled:hover:bg-transparent',
                )}
              >
                <span className="bg-brand-gold/10 text-brand-gold shrink-0 rounded-md px-2 py-0.5 font-mono text-xs font-semibold">
                  {moment.time}
                </span>
                <span className="text-muted-foreground text-sm leading-snug">
                  {moment.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
