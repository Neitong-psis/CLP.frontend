'use client';

import { useState } from 'react';
import { Search, UserPlus, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ADMIN_USERS, type UserRole, type UserStatus } from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const ROLE_STYLE: Record<UserRole, string> = {
  Admin: 'bg-brand-gold/15 text-brand-gold',
  Instructor: 'bg-white/10 text-white/70',
  Learner: 'bg-white/[0.06] text-white/50',
};

const STATUS_STYLE: Record<UserStatus, string> = {
  Active: 'bg-emerald-500/15 text-emerald-400',
  Inactive: 'bg-white/[0.07] text-white/40',
  Suspended: 'bg-rose-500/15 text-rose-400',
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');

  const filtered = ADMIN_USERS.filter((u) => {
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Users"
        subtitle={`${ADMIN_USERS.length} total users`}
        actions={
          <button className="bg-brand-gold hover:bg-brand-gold-dark flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors">
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        }
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-brand-gold/50 h-10 w-full rounded-xl border border-white/[0.10] bg-white/[0.04] pr-3 pl-9 text-sm text-white placeholder-white/25 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(['All', 'Learner', 'Instructor', 'Admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  roleFilter === r
                    ? 'bg-brand-gold text-white'
                    : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.10] hover:text-white',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {[
                    'Name',
                    'Role',
                    'Status',
                    'Enrolled',
                    'Joined',
                    'Last Active',
                    '',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-[11px] font-semibold tracking-wide text-white/40 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-gold flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-[11px] text-white/40">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                          ROLE_STYLE[user.role],
                        )}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                          STATUS_STYLE[user.status],
                        )}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-white/60">
                      {user.enrolled}
                    </td>
                    <td className="px-5 py-3.5 text-white/40">{user.joined}</td>
                    <td className="px-5 py-3.5 text-white/40">
                      {user.lastActive}
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.07] hover:text-white/70">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-white/30">
              No users match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
