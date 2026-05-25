'use client';

import { useState } from 'react';
import { Search, UserPlus, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ADMIN_USERS, type UserRole, type UserStatus } from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

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

const FIELD_CLS =
  'w-full rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:ring-offset-0 transition-colors';

const SELECT_CLS =
  'w-full rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-brand-gold/20 focus:bg-white transition-colors appearance-none cursor-pointer';

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function AddUserModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-slate-900">Add User</h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Create a local user record with role, enrollment, and engagement
          details.
        </p>

        {/* Form */}
        <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Name
            </label>
            <input
              type="text"
              placeholder="Full name"
              className={FIELD_CLS}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className={FIELD_CLS}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Role
            </label>
            <select className={SELECT_CLS} defaultValue="">
              <option value="" disabled>Learner</option>
              <option value="Learner">Learner</option>
              <option value="Educator">Educator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Status
            </label>
            <select className={SELECT_CLS} defaultValue="">
              <option value="" disabled>Active</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Achieved">Achieved</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Courses
            </label>
            <input
              type="number"
              placeholder="0"
              min={0}
              className={FIELD_CLS}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Join Date
            </label>
            <input
              type="text"
              placeholder="May 19, 2026"
              className={FIELD_CLS}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Phone
            </label>
            <input
              type="tel"
              placeholder="+1 555 0100"
              className={FIELD_CLS}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Student / Staff ID
            </label>
            <input
              type="text"
              placeholder="CLP-1008"
              className={FIELD_CLS}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Organization
            </label>
            <input
              type="text"
              placeholder="CLP Academy"
              className={FIELD_CLS}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Program
            </label>
            <input
              type="text"
              placeholder="Web Development"
              className={FIELD_CLS}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800">
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = ADMIN_USERS.filter((u) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
  });

  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="User Management"
        subtitle="Live workspace synced for admin@clp.com"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Add User */}
        <div className="mb-5 flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-brand-gold hover:bg-brand-gold-dark flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* Search */}
        <div className="mb-5">
          <div className="relative max-w-sm">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {(
                    [
                      ['USER', 'left'],
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
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-navy flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
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
                      <div className="flex justify-end gap-1.5">
                        <button
                          aria-label="Edit user"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          aria-label="Delete user"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
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
        </div>
      </div>

      {modalOpen && <AddUserModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
