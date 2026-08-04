'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  BookOpen,
  CheckCircle2,
  Info,
  ShieldAlert,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMediaQuery } from '@/hooks/use-media-query';
import { readStoredNotifs, type StoredNotif } from '@/lib/utils/notifStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifType = 'info' | 'success' | 'warning' | 'alert';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL: Notification[] = [
  {
    id: 'n1',
    type: 'warning',
    title: 'Course Pending Review',
    body: 'Khmer Literature Bootcamp (v2) submitted by Dr. Sopheak Chan',
    time: '2 min ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'success',
    title: 'Certificates Issued',
    body: '47 learners received certificates for Python Basics',
    time: '18 min ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'info',
    title: 'New Learner Registered',
    body: 'Carlos Mendez joined the platform',
    time: '1 h ago',
    read: false,
  },
  {
    id: 'n4',
    type: 'alert',
    title: 'Storage Usage High',
    body: 'Platform storage is at 87 % capacity — consider archiving old assets',
    time: '3 h ago',
    read: true,
  },
  {
    id: 'n5',
    type: 'success',
    title: 'Revenue Milestone',
    body: 'Monthly revenue crossed $90 k for the first time',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'n6',
    type: 'info',
    title: 'New Course Published',
    body: 'Cloud Architecture Fundamentals is now live',
    time: '2 days ago',
    read: true,
  },
];

// ─── Icon map ─────────────────────────────────────────────────────────────────

const TYPE_META: Record<
  NotifType,
  { Icon: React.ElementType; iconCls: string }
> = {
  warning: { Icon: AlertTriangle, iconCls: 'bg-amber-500/10 text-amber-500' },
  success: {
    Icon: CheckCircle2,
    iconCls: 'bg-emerald-500/10 text-emerald-500',
  },
  info: { Icon: Info, iconCls: 'bg-blue-500/10 text-blue-500' },
  alert: { Icon: ShieldAlert, iconCls: 'bg-rose-500/10 text-rose-500' },
};

// ─── NotificationItem ─────────────────────────────────────────────────────────

function NotificationItem({
  notif,
  onDismiss,
  onRead,
}: {
  notif: Notification;
  onDismiss: (id: string) => void;
  onRead: (id: string) => void;
}) {
  const { Icon, iconCls } = TYPE_META[notif.type];
  return (
    <div
      className={cn(
        'group relative flex gap-3 rounded-xl px-3 py-3 transition-colors',
        notif.read
          ? 'hover:bg-muted/50'
          : 'bg-blue-500/4 hover:bg-blue-500/[0.07]',
      )}
      onClick={() => onRead(notif.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onRead(notif.id)}
    >
      <span
        className={cn(
          'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
          iconCls,
        )}
      >
        <Icon className="size-3.5" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 pr-5">
        <p
          className={cn(
            'text-[13px] leading-snug',
            notif.read
              ? 'text-foreground font-normal'
              : 'text-foreground font-semibold',
          )}
        >
          {notif.title}
        </p>
        <p className="text-muted-foreground mt-0.5 text-[12px] leading-relaxed">
          {notif.body}
        </p>
        <p className="text-muted-foreground mt-1.5 text-[11px]">{notif.time}</p>
      </div>

      {/* Corner indicator — unread dot at rest, crossfades into the dismiss
          button on hover so the two never overlap. */}
      <div className="absolute top-3 right-3 flex size-4 items-center justify-center">
        {!notif.read && (
          <span
            className="size-2 rounded-full bg-blue-500 transition-opacity duration-150 group-hover:opacity-0"
            aria-hidden="true"
          />
        )}
        <button
          className="text-muted-foreground hover:text-foreground absolute inset-0 flex items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(notif.id);
          }}
          aria-label="Dismiss notification"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Shared panel body ────────────────────────────────────────────────────────

function NotificationPanel({
  notifs,
  unreadCount,
  onDismiss,
  onRead,
  onMarkAllRead,
  onClose,
  maxListHeight = '420px',
}: {
  notifs: Notification[];
  unreadCount: number;
  onDismiss: (id: string) => void;
  onRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClose?: () => void;
  maxListHeight?: string;
}) {
  return (
    <>
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Bell className="text-muted-foreground size-4" />
          <span className="text-foreground text-sm font-bold">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1.5 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-muted-foreground hover:text-foreground text-[12px] transition-colors"
            >
              Mark all read
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg p-1 transition-colors"
              aria-label="Close notifications"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div
        className="overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ maxHeight: maxListHeight }}
      >
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-14">
            <span className="bg-muted flex size-12 items-center justify-center rounded-full">
              <BookOpen className="text-muted-foreground size-5" />
            </span>
            <p className="text-muted-foreground text-sm">
              You&apos;re all caught up!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5 p-1.5">
            {notifs.map((n) => (
              <NotificationItem
                key={n.id}
                notif={n}
                onDismiss={onDismiss}
                onRead={onRead}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifs.length > 0 && (
        <div className="border-border border-t px-4 py-3">
          <button className="text-muted-foreground hover:text-foreground w-full text-center text-[12px] transition-colors">
            View all notifications
          </button>
        </div>
      )}
    </>
  );
}

// ─── NotificationBell ─────────────────────────────────────────────────────────

const iconBtn =
  'flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

export function NotificationBell({
  buttonClassName,
}: {
  buttonClassName?: string;
} = {}) {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Merge localStorage notifications on mount
  useEffect(() => {
    const id = setTimeout(() => {
      const stored = readStoredNotifs();
      if (stored.length === 0) return;
      setNotifs((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const incoming = stored.filter((n) => !existingIds.has(n.id));
        return incoming.length > 0 ? [...incoming, ...prev] : prev;
      });
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Listen for real-time notifications dispatched by the course player
  useEffect(() => {
    function handler(e: Event) {
      const notif = (e as CustomEvent<StoredNotif>).detail;
      setNotifs((prev) =>
        prev.some((n) => n.id === notif.id) ? prev : [notif, ...prev],
      );
    }
    window.addEventListener('qb:notification', handler);
    return () => window.removeEventListener('qb:notification', handler);
  }, []);
  // Below `lg` (1024px) the bell lives inside the profile drawer — present it as
  // a full bottom sheet so it never overlaps that dropdown. At `lg`+ it sits in
  // the TopBar and uses the anchored dropdown.
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const unreadCount = notifs.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }
  function dismiss(id: string) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }
  function markRead(id: string) {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  // Lock body scroll while mobile sheet is open
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  // Close mobile sheet on Escape
  useEffect(() => {
    if (!sheetOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [sheetOpen]);

  const badgeLabel = unreadCount > 0 ? `, ${unreadCount} unread` : '';
  const badgeNode = unreadCount > 0 && (
    <span className="border-card absolute top-1.5 right-1.5 size-2.5 rounded-full border-2 bg-red-500" />
  );

  // ── Mobile: slide-up bottom sheet ─────────────────────────────────────────

  if (isMobile) {
    return (
      <>
        <button
          aria-label={`Notifications${badgeLabel}`}
          className={cn('relative', iconBtn, buttonClassName)}
          onClick={() => setSheetOpen(true)}
        >
          <Bell className="size-4" />
          {badgeNode}
        </button>

        <div
          className={cn(
            'fixed inset-0 z-200 transition-all duration-300',
            sheetOpen ? 'pointer-events-auto' : 'pointer-events-none',
          )}
          aria-hidden={!sheetOpen}
        >
          {/* Backdrop */}
          <div
            className={cn(
              'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
              sheetOpen ? 'opacity-100' : 'opacity-0',
            )}
            onClick={() => setSheetOpen(false)}
          />

          {/* Sheet */}
          <div
            className={cn(
              'bg-card absolute right-0 bottom-0 left-0 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out',
              sheetOpen ? 'translate-y-0' : 'translate-y-full',
            )}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="bg-border h-1 w-10 rounded-full" />
            </div>
            <NotificationPanel
              notifs={notifs}
              unreadCount={unreadCount}
              onDismiss={dismiss}
              onRead={markRead}
              onMarkAllRead={markAllRead}
              onClose={() => setSheetOpen(false)}
              maxListHeight="55vh"
            />
            {/* Safe-area bottom spacer */}
            <div className="h-6" />
          </div>
        </div>
      </>
    );
  }

  // ── Desktop: dropdown ─────────────────────────────────────────────────────

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`Notifications${badgeLabel}`}
          className={cn('relative', iconBtn, buttonClassName)}
        >
          <Bell className="size-4" />
          {badgeNode}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="border-border bg-card w-80 border p-0 shadow-xl sm:w-96"
      >
        <NotificationPanel
          notifs={notifs}
          unreadCount={unreadCount}
          onDismiss={dismiss}
          onRead={markRead}
          onMarkAllRead={markAllRead}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
