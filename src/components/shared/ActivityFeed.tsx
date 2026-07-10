import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ActivityItem {
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
  emptyMessage?: string;
}

export function ActivityFeed({
  items,
  className,
  emptyMessage = 'No recent activity',
}: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className="py-4 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className={cn('space-y-6', className)}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-4">
          {item.icon ? (
            <div className="mt-1">{item.icon}</div>
          ) : (
            <div className="bg-brand-gold mt-2 h-2 w-2 shrink-0 rounded-full" />
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {item.title}{' '}
              <span className="font-normal text-slate-500">
                {item.description}
              </span>
            </p>
            <p className="text-xs text-slate-400">{item.timestamp}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
