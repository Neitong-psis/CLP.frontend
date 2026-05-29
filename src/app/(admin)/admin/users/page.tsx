'use client';

import { useState } from 'react';
import {
  Search,
  UserPlus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { ADMIN_USERS, type UserRole, type UserStatus } from '@/constants/admin';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import TopBar from '@/components/common/TopBar';
import AddUserModal from './AddUserModal';

const PAGE_SIZE = 5;

const ROLE_STYLE: Record<UserRole, string> = {
  Admin: 'border border-rose-200 bg-rose-50 text-rose-600',
  Educator: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Learner: 'border border-blue-200 bg-blue-50 text-blue-600',
};

const STATUS_STYLE: Record<UserStatus, string> = {
  Active: 'border border-blue-200 bg-blue-50 text-blue-600',
  Achieved: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Inactive: 'border border-slate-200 bg-slate-50 text-slate-500',
  Suspended: 'border border-rose-200 bg-rose-50 text-rose-600',
};

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = ADMIN_USERS.filter((u) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pageStart =
    filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="User Management"
        subtitle="Live workspace synced for admin@clp.com"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => setModalOpen(true)}
            className="shrink-0 rounded-full px-5 font-bold text-white shadow hover:text-white"
          >
            <UserPlus />
            Add User
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                    #
                  </th>
                  {(
                    [
                      ['NAME', 'left'],
                      ['ROLE', 'left'],
                      ['COURSES', 'left'],
                      ['JOINED', 'left'],
                      ['STATUS', 'left'],
                      ['ACTIONS', 'right'],
                    ] as const
                  ).map(([label, align]) => (
                    <th
                      key={label}
                      className={cn(
                        'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                        align === 'right' ? 'text-right' : 'text-left',
                      )}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((user, idx) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 text-xs text-slate-400">
                      {pageStart + idx}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-navy flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                          {initials(user.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                          ROLE_STYLE[user.role],
                        )}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {user.enrolled}
                    </td>
                    <td className="px-5 py-4 text-slate-500">{user.joined}</td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                          STATUS_STYLE[user.status],
                        )}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label="User actions"
                              className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 [&_svg]:size-4"
                            >
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="border border-slate-200 bg-white shadow-md"
                          >
                            <DropdownMenuLabel className="text-slate-400">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-slate-900">
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-slate-900">
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100" />
                            <DropdownMenuItem className="text-rose-500 focus:bg-rose-50 focus:text-rose-600">
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-slate-400">
              No users match your search.
            </p>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-400">
              Showing {pageStart}–{pageEnd} of {filtered.length} users
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronLeft />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPage(p)}
                  className={cn(
                    'rounded-lg text-xs',
                    p === currentPage
                      ? 'bg-slate-900 text-white hover:bg-slate-800 hover:text-white'
                      : 'text-slate-500 hover:bg-slate-100',
                  )}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <AddUserModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
