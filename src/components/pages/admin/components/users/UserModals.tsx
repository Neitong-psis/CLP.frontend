'use client';

import { useCallback, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Eye, EyeOff, Pencil, RefreshCw, X } from 'lucide-react';
import { generateUserPassword } from '@/features/users';
import { cn } from '@/lib/utils/cn';
import {
  type AdminUserRow,
  type UserRole,
  type UserStatus,
} from '@/constants/admin';
import { Button } from '@/components/ui/button/Button';
import {
  ROLES,
  STATUSES,
  ROLE_AVATAR_BG,
  ROLE_COLOR,
  STATUS_COLOR,
  CANCEL_BTN_CLS,
  userInitials,
} from './constants';

// ─── Chip ─────────────────────────────────────────────────────────────────────

/** Pill badge for role and status labels. `color` supplies the border/bg/text tokens. */
export function Chip({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
        color,
      )}
    >
      {children}
    </span>
  );
}

// ─── ModalShell ───────────────────────────────────────────────────────────────

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Consumed by Dialog.Description (sr-only); required for screen-reader context. */
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  maxWidth?: string;
}

/**
 * Accessible modal shell built on Radix Dialog.
 * Provides: focus trap, Escape-to-close, aria-labelledby, aria-describedby,
 * and overlay-click-to-close — without any custom implementation.
 */
function ModalShell({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-md',
}: ModalShellProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2',
            'bg-card ring-border flex-col overflow-hidden rounded-2xl shadow-2xl ring-1',
            maxWidth,
          )}
        >
          <Dialog.Description className="sr-only">
            {description}
          </Dialog.Description>

          {/* Header */}
          <div className="border-border flex items-center justify-between border-b px-6 py-4">
            <Dialog.Title className="text-foreground text-base font-bold">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Close dialog"
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-1.5 transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 px-6 py-5">{children}</div>

          <div className="border-border flex items-center justify-end gap-2 border-t px-6 py-4">
            {footer}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── ViewModal ────────────────────────────────────────────────────────────────

export function ViewModal({
  open,
  user,
  onClose,
  onEdit,
}: {
  open: boolean;
  user: AdminUserRow | null;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="User Details"
      description={user ? `Viewing profile for ${user.name}` : 'User details'}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button variant="ghost" className={CANCEL_BTN_CLS} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl px-5"
            onClick={onEdit}
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Edit
          </Button>
        </>
      }
    >
      {user && (
        <>
          <div className="mb-5 flex flex-col items-center gap-2">
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold',
                ROLE_AVATAR_BG[user.role],
              )}
            >
              {userInitials(user.name)}
            </div>
            <p className="text-foreground font-semibold">{user.name}</p>
            <p className="text-muted-foreground text-xs">{user.email}</p>
            <div className="flex gap-1.5">
              <Chip color={ROLE_COLOR[user.role]}>{user.role}</Chip>
              <Chip color={STATUS_COLOR[user.status]}>{user.status}</Chip>
            </div>
          </div>

          <div className="divide-border border-border divide-y rounded-xl border">
            {(
              [
                ['Enrolled Courses', String(user.enrolled)],
                ['Joined', user.joined],
                ['Last Active', user.lastActive],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-muted-foreground text-xs font-semibold">
                  {label}
                </span>
                <span className="text-foreground text-xs font-medium">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </ModalShell>
  );
}

// ─── EditModal ────────────────────────────────────────────────────────────────

const inputCls =
  'h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-xs font-semibold text-muted-foreground';

/**
 * Form state initialises from `user` at mount.
 * Pass `key={user.id}` from the parent to reset state when the target user changes.
 */
export function EditModal({
  open,
  user,
  initialPassword,
  onSave,
  onClose,
}: {
  open: boolean;
  user: AdminUserRow | null;
  initialPassword?: string;
  onSave: (updated: AdminUserRow, newPassword?: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [role, setRole] = useState<UserRole>(user?.role ?? 'Learner');
  const [status, setStatus] = useState<UserStatus>(user?.status ?? 'Active');
  const [newPassword, setNewPassword] = useState(initialPassword ?? '');
  const [showPwd, setShowPwd] = useState(!!initialPassword);

  const generatePwd = useCallback(() => {
    setNewPassword(generateUserPassword());
    setShowPwd(true);
  }, []);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Edit User"
      description={user ? `Editing profile for ${user.name}` : 'Edit user'}
      maxWidth="max-w-lg"
      footer={
        <>
          <Button variant="ghost" className={CANCEL_BTN_CLS} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl px-5"
            onClick={() =>
              user &&
              onSave(
                { ...user, name, email, role, status },
                newPassword.trim() || undefined,
              )
            }
          >
            Save changes
          </Button>
        </>
      }
    >
      {user && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-name" className={labelCls}>
                Full Name
              </label>
              <input
                id="edit-name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="edit-email" className={labelCls}>
                Email
              </label>
              <input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <p id="role-group-label" className={labelCls}>
              Role
            </p>
            <div
              className="flex gap-2"
              role="group"
              aria-labelledby="role-group-label"
            >
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={role === r}
                  onClick={() => setRole(r)}
                  className={cn(
                    'flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors',
                    role === r
                      ? ROLE_COLOR[r]
                      : 'border-border text-muted-foreground hover:bg-muted',
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p id="status-group-label" className={labelCls}>
              Status
            </p>
            <div
              className="grid grid-cols-4 gap-2"
              role="group"
              aria-labelledby="status-group-label"
            >
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={status === s}
                  onClick={() => setStatus(s)}
                  className={cn(
                    'rounded-lg border py-2 text-xs font-semibold transition-colors',
                    status === s
                      ? STATUS_COLOR[s]
                      : 'border-border text-muted-foreground hover:bg-muted',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Optional password change */}
          <div className="border-border border-t pt-4">
            <label htmlFor="edit-password" className={labelCls}>
              {initialPassword ? 'Reset Password' : 'New Password'}
              {!initialPassword && (
                <span className="text-muted-foreground/70 font-normal normal-case">
                  {' '}
                  — leave blank to keep current
                </span>
              )}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="edit-password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Enter new password…"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={cn(inputCls, 'pr-9 font-mono tracking-wide')}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  tabIndex={-1}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2"
                >
                  {showPwd ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={generatePwd}
                title="Generate password"
                className="border-border text-muted-foreground hover:bg-muted hover:text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

// ─── DeleteModal ──────────────────────────────────────────────────────────────

export function DeleteModal({
  open,
  name,
  onConfirm,
  onClose,
}: {
  open: boolean;
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Delete user?"
      description={`Confirm permanent deletion of "${name}". This action cannot be undone.`}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button variant="ghost" className={CANCEL_BTN_CLS} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="ghost"
            className="rounded-xl bg-rose-500 px-5 text-white hover:bg-rose-600"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-muted-foreground text-sm leading-relaxed">
        <span className="text-foreground font-semibold">
          &ldquo;{name}&rdquo;
        </span>{' '}
        will be permanently removed. This action cannot be undone.
      </p>
    </ModalShell>
  );
}
