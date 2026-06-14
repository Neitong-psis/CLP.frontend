'use client';

import {
  Eye,
  KeyRound,
  MoreHorizontal,
  Pencil,
  ShieldCheck,
  ShieldOff,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AdminUserRow } from '@/constants/admin';
import { generateUserPassword } from '@/features/users';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Chip } from '@/components/pages/admin/components/users/UserModals';
import {
  ROLE_AVATAR_BG,
  ROLE_COLOR,
  STATUS_COLOR,
  userInitials,
} from '@/components/pages/admin/components/users/constants';
import { PasswordCell } from './PasswordCell';

export interface UserRowActions {
  onView: () => void;
  onEdit: () => void;
  onResetPassword: (generatedPwd: string) => void;
  onSuspend: () => void;
  onActivate: () => void;
  onDelete: () => void;
}

interface UserTableRowProps {
  user: AdminUserRow;
  index: number;
  isHighlighted: boolean;
  pwd: string | null;
  onPwdChange: (pwd: string) => void;
  actions: UserRowActions;
  onContextMenu: (e: React.MouseEvent<HTMLTableRowElement>) => void;
}

function UserActionsDropdown({
  user,
  actions,
  onResetPasswordClick,
}: {
  user: AdminUserRow;
  actions: UserRowActions;
  onResetPasswordClick: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Actions for ${user.name}`}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg [&_svg]:size-4"
        >
          <MoreHorizontal aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-border bg-card border shadow-md"
      >
        <DropdownMenuLabel className="text-muted-foreground">
          Actions
        </DropdownMenuLabel>

        <DropdownMenuItem
          className="text-foreground focus:bg-muted"
          onSelect={actions.onView}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" /> View
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-foreground focus:bg-muted"
          onSelect={actions.onEdit}
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-foreground focus:bg-muted"
          onSelect={onResetPasswordClick}
        >
          <KeyRound className="h-3.5 w-3.5" aria-hidden="true" /> Reset Password
        </DropdownMenuItem>

        {user.status !== 'Suspended' ? (
          <DropdownMenuItem
            className="text-amber-500 focus:bg-amber-500/10 focus:text-amber-500"
            onSelect={actions.onSuspend}
          >
            <ShieldOff className="h-3.5 w-3.5" aria-hidden="true" /> Suspend
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="text-emerald-500 focus:bg-emerald-500/10 focus:text-emerald-500"
            onSelect={actions.onActivate}
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Activate
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          className="text-rose-500 focus:bg-rose-500/10 focus:text-rose-500"
          onSelect={actions.onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserTableRow({
  user,
  index,
  isHighlighted,
  pwd,
  onPwdChange,
  actions,
  onContextMenu,
}: UserTableRowProps) {
  function handleResetPasswordClick() {
    const generated = generateUserPassword();
    onPwdChange(generated);
    actions.onResetPassword(generated);
  }

  return (
    <tr
      className={cn(
        'hover:bg-muted/50 transition-colors',
        isHighlighted && 'bg-muted/50',
      )}
      onContextMenu={onContextMenu}
    >
      <td className="text-muted-foreground px-4 py-4 text-xs">{index}</td>

      <td className="px-5 py-4">
        <button
          className="flex items-center gap-3 text-left"
          onClick={actions.onView}
        >
          <div
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
              ROLE_AVATAR_BG[user.role],
            )}
          >
            {userInitials(user.name)}
          </div>
          <div>
            <p className="text-foreground font-semibold underline-offset-2 hover:underline">
              {user.name}
            </p>
            <p className="text-muted-foreground text-[11px]">{user.email}</p>
          </div>
        </button>
      </td>

      <td className="px-5 py-4">
        <Chip color={ROLE_COLOR[user.role]}>{user.role}</Chip>
      </td>
      <td className="text-muted-foreground px-5 py-4 text-sm">
        {user.enrolled}
      </td>
      <td className="text-muted-foreground px-5 py-4 text-sm">{user.joined}</td>
      <td className="px-5 py-4">
        <Chip color={STATUS_COLOR[user.status]}>{user.status}</Chip>
      </td>

      <td className="px-5 py-4">
        <PasswordCell pwd={pwd} />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end">
          <UserActionsDropdown
            user={user}
            actions={actions}
            onResetPasswordClick={handleResetPasswordClick}
          />
        </div>
      </td>
    </tr>
  );
}

export function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-4">
        <div className="bg-muted h-3 w-5 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-muted h-8 w-8 shrink-0 rounded-full" />
          <div className="space-y-1.5">
            <div className="bg-muted h-3 w-28 rounded" />
            <div className="bg-muted/70 h-2.5 w-36 rounded" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="bg-muted h-5 w-16 rounded-full" />
      </td>
      <td className="px-5 py-4">
        <div className="bg-muted h-3 w-4 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="bg-muted h-3 w-20 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="bg-muted h-5 w-16 rounded-full" />
      </td>
      <td className="px-5 py-4">
        <div className="bg-muted h-6 w-20 rounded-lg" />
      </td>
      <td className="px-5 py-4">
        <div className="flex justify-end">
          <div className="bg-muted h-6 w-6 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}
