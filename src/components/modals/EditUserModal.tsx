'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Modal } from './Modal';
import { AdminUserRow, UserRole, UserStatus } from '@/constants/admin';
import { EDIT_ROLE_STYLE, EDIT_STATUS_STYLE } from '@/constants/ui';
import { cn } from '@/lib/utils/cn';

const ROLES: UserRole[] = ['Learner', 'Educator', 'Admin'];
const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Suspended', 'Achieved'];

const inputCls =
  'h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-xs font-semibold text-slate-500';

interface EditUserModalProps {
  user: AdminUserRow;
  onSave: (updated: AdminUserRow) => void;
  onClose: () => void;
}

export function EditUserModal({ user, onSave, onClose }: EditUserModalProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);

  return (
    <Modal
      title="Edit User"
      onClose={onClose}
      maxWidth="max-w-md"
      footer={
        <>
          <Button
            variant="ghost"
            className="rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl px-5"
            onClick={() => onSave({ ...user, name, email, role, status })}
          >
            Save changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Role</label>
          <div className="flex gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  'flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors',
                  role === r
                    ? EDIT_ROLE_STYLE[r]
                    : 'border-slate-200 text-slate-400 hover:bg-slate-50',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Status</label>
          <div className="grid grid-cols-4 gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={cn(
                  'rounded-lg border py-2 text-xs font-semibold transition-colors',
                  status === s
                    ? EDIT_STATUS_STYLE[s]
                    : 'border-slate-200 text-slate-400 hover:bg-slate-50',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
