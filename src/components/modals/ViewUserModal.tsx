'use client';

import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { Modal } from './Modal';
import { AdminUserRow } from '@/constants/admin';
import { cn } from '@/lib/utils/cn';
import { userInitials } from '@/lib/utils/user';
import { ROLE_STYLE, ROLE_AVATAR_BG, STATUS_STYLE } from '@/constants/ui';

interface ViewUserModalProps {
  user: AdminUserRow;
  onClose: () => void;
  onEdit: () => void;
}

export function ViewUserModal({ user, onClose, onEdit }: ViewUserModalProps) {
  return (
    <Modal
      title="User Details"
      onClose={onClose}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button
            variant="ghost"
            className="rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl px-5"
            onClick={onEdit}
          >
            <Pencil className="mr-2 h-3.5 w-3.5" />
            Edit
          </Button>
        </>
      }
    >
      <div className="mb-5 flex flex-col items-center gap-2">
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold',
            ROLE_AVATAR_BG[user.role],
          )}
        >
          {userInitials(user.name)}
        </div>
        <p className="font-semibold text-slate-900">{user.name}</p>
        <p className="text-xs text-slate-400">{user.email}</p>
        <div className="flex gap-1.5">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
              ROLE_STYLE[user.role],
            )}
          >
            {user.role}
          </span>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
              STATUS_STYLE[user.status],
            )}
          >
            {user.status}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
        {[
          ['Enrolled Courses', String(user.enrolled)],
          ['Joined', user.joined],
          ['Last Active', user.lastActive],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="text-xs font-semibold text-slate-400">
              {label}
            </span>
            <span className="text-xs font-medium text-slate-700">{value}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}
