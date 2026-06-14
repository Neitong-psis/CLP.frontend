'use client';

import { useState } from 'react';
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
    body: 'Web Dev Bootcamp (v2) submitted by Dr. Angela Yu',
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

// ─── Icon per type ────────────────────────────────────────────────────────────

const TYPE_META: Record<
  NotifType,
  { Icon: React.ElementType; iconCls: string; dotCls: string }
> = {
  warning: {
    Icon: AlertTriangle,
    iconCls: 'bg-amber-500/10 text-amber-500',
    dotCls: 'bg-amber-500',
  },
  success: {
    Icon: CheckCircle2,
    iconCls: 'bg-emerald-500/10 text-emerald-500',
    dotCls: 'bg-emerald-500',
  },
  info: {
    Icon: Info,
    iconCls: 'bg-blue-500/10 text-blue-500',
    dotCls: 'bg-blue-500',
  },
  alert: {
    Icon: ShieldAlert,
    iconCls: 'bg-rose-500/10 text-rose-500',
    dotCls: 'bg-rose-500',
  },
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
        'group relative flex gap-3 px-4 py-3.5 transition-colors',
        notif.read
          ? 'hover:bg-muted/50'
          : 'bg-blue-500/[0.04] hover:bg-blue-500/[0.07]',
      )}
      onClick={() => onRead(notif.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onRead(notif.id)}
    >
      {/* Type icon */}
      <span
        className={cn(
          'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
          iconCls,
        )}
      >
        <Icon className="size-3.5" aria-hidden="true" />
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
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

      {/* Unread dot */}
      {!notif.read && (
        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />
      )}

      {/* Dismiss */}
      <button
        className="text-muted-foreground hover:text-foreground absolute top-2.5 right-2.5 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(notif.id);
        }}
        aria-label="Dismiss notification"
      >
        <X className="size-3" />
      </button>
    </div>
  );
}

// ─── NotificationBell ─────────────────────────────────────────────────────────

const iconBtn =
  'flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

export function NotificationBell() {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL);

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          className={cn('relative', iconBtn)}
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="border-border bg-card w-80 border p-0 shadow-xl sm:w-96"
      >
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
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-muted-foreground hover:text-foreground text-[12px] transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-[420px] overflow-y-auto">
          {notifs.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12">
              <span className="bg-muted flex size-12 items-center justify-center rounded-full">
                <BookOpen className="text-muted-foreground size-5" />
              </span>
              <p className="text-muted-foreground text-sm">
                You&apos;re all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-border divide-y">
              {notifs.map((n) => (
                <NotificationItem
                  key={n.id}
                  notif={n}
                  onDismiss={dismiss}
                  onRead={markRead}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifs.length > 0 && (
          <div className="border-border border-t px-4 py-2.5">
            <button className="text-muted-foreground hover:text-foreground w-full text-center text-[12px] transition-colors">
              View all notifications
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
