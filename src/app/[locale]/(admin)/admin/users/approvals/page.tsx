'use client';

import { useMemo, useState } from 'react';
import { Search, UserPlus, Check, X } from 'lucide-react';
import TopBar from '@/components/common/TopBar';
import { Button } from '@/components/ui/button/Button';
import { useToast } from '@/components/ui/toast';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useAdminUsersApprovalsT, useAdminUsersT } from '@/i18n';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';
import { SortableTh } from '@/components/common/table/SortableTh';
import { FilterableTh } from '@/components/common/table/FilterableTh';
import { Chip } from '@/components/pages/admin/components/users/UserModals';
import {
  ROLES,
  ROLE_COLOR,
  ROLE_DOT,
  userInitials,
} from '@/constants/admin/users';
import type { UserRole } from '@/constants/admin';
import { useColumnSort } from '@/hooks/useColumnSort';
import { parseDateLoose } from '@/lib/utils/sort';
import {
  useUserApprovals,
  type NewApprovalInput,
} from '@/context/UserApprovalsContext';
import type { ApprovalStatus } from '@/context/userApprovalsStore';
import AddUserModal, {
  type NewUserSubmission,
} from '../_components/AddUserModal';

type ApprovalSortKey = 'name' | 'registered' | 'department';

const STATUS_PILL: Record<ApprovalStatus, string> = {
  Pending: 'border-amber-500/20 bg-amber-500/10 text-amber-500',
  Approved: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  Rejected: 'border-rose-500/20 bg-rose-500/10 text-rose-500',
};

function today(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminUserApprovalsPage() {
  const t = useAdminUsersApprovalsT();
  const tUsers = useAdminUsersT();
  const { toast } = useToast();
  const currentAdmin = useCurrentUser();
  const { approvals, addApproval, approve, reject } = useUserApprovals();

  const [tab, setTab] = useState<ApprovalStatus>('Pending');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');
  const [addOpen, setAddOpen] = useState(false);
  const { sortKey, sortDir, toggleSort } = useColumnSort<ApprovalSortKey>();

  const tabs: PillTab<ApprovalStatus>[] = [
    {
      value: 'Approved',
      label: t('tabActive'),
      count: approvals.filter((a) => a.status === 'Approved').length,
    },
    {
      value: 'Pending',
      label: t('tabPending'),
      count: approvals.filter((a) => a.status === 'Pending').length,
    },
    {
      value: 'Rejected',
      label: t('tabRejected'),
      count: approvals.filter((a) => a.status === 'Rejected').length,
    },
  ];

  const filtered = useMemo(() => {
    const rows = approvals.filter((a) => {
      if (a.status !== tab) return false;
      if (roleFilter !== 'All' && a.role !== roleFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
      );
    });

    if (sortKey) {
      rows.sort((a, b) => {
        const cmp =
          sortKey === 'name'
            ? a.name.localeCompare(b.name)
            : sortKey === 'department'
              ? a.department.localeCompare(b.department)
              : parseDateLoose(a.registeredDate) -
                parseDateLoose(b.registeredDate);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [approvals, tab, search, roleFilter, sortKey, sortDir]);

  async function handleApprove(id: string, name: string) {
    const result = await approve(id);
    if (result.ok) {
      toast(t('approveSuccess', { name }), 'success');
    } else {
      toast(t('approveFailed', { name, message: result.message }), 'error');
    }
  }

  function handleReject(id: string, name: string) {
    reject(id);
    toast(t('rejectSuccess', { name }), 'error');
  }

  function handleCreate(input: NewUserSubmission) {
    const request: NewApprovalInput = { ...input, registeredDate: today() };
    addApproval(request);
    toast(t('submittedSuccess', { name: input.name }), 'success');
    setAddOpen(false);
  }

  return (
    <>
      {addOpen && (
        <AddUserModal
          onClose={() => setAddOpen(false)}
          onCreate={handleCreate}
        />
      )}

      <div className="flex min-h-full flex-col">
        <TopBar
          role="admin"
          title={tUsers('title')}
          subtitle={tUsers('subtitle', { email: currentAdmin.email })}
        />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="text-foreground text-base font-bold">
              {t('heading')}
            </h2>
            <p className="text-muted-foreground text-sm">{t('headingDesc')}</p>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <PillTabs
              tabs={tabs}
              value={tab}
              onChange={setTab}
              ariaLabel="Approval status"
            />

            <div className="flex shrink-0 items-center gap-3">
              <div className="relative max-w-xs min-w-0 flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                <input
                  type="search"
                  placeholder={t('searchPlaceholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-card text-foreground placeholder:text-muted-foreground h-10 w-full rounded-xl border pr-4 pl-10 text-sm outline-none focus:ring-2"
                />
              </div>
              <Button
                variant="ghost"
                onClick={() => setAddOpen(true)}
                className="bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors sm:px-4"
              >
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                {t('newUser')}
              </Button>
            </div>
          </div>

          <div className="border-border bg-card overflow-hidden rounded-xl border">
            <div className="scrollbar-none overflow-x-auto">
              <table className="w-full min-w-200 text-sm">
                <thead>
                  <tr className="border-border bg-surface border-b">
                    <SortableTh
                      label={t('colUser')}
                      active={sortKey === 'name'}
                      direction={sortDir}
                      onClick={() => toggleSort('name')}
                    />
                    <FilterableTh
                      label={t('colRole')}
                      options={ROLES}
                      value={roleFilter}
                      onSelect={setRoleFilter}
                      dot={ROLE_DOT}
                    />
                    <SortableTh
                      label={t('colRegistered')}
                      active={sortKey === 'registered'}
                      direction={sortDir}
                      onClick={() => toggleSort('registered')}
                    />
                    <SortableTh
                      label={t('colDepartment')}
                      active={sortKey === 'department'}
                      direction={sortDir}
                      onClick={() => toggleSort('department')}
                    />
                    <th
                      scope="col"
                      className="text-muted-foreground px-5 py-3.5 text-left text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase"
                    >
                      {t('colStatus')}
                    </th>
                    <th
                      scope="col"
                      className="text-muted-foreground px-5 py-3.5 text-right text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase"
                    >
                      {t('colAction')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {filtered.map((a) => (
                    <tr key={a.id}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="bg-brand-gold/15 text-brand-gold flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                            {userInitials(a.name)}
                          </span>
                          <div className="min-w-0">
                            <p className="text-foreground truncate text-sm font-semibold">
                              {a.name}
                            </p>
                            <p className="text-muted-foreground truncate text-xs">
                              {a.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Chip color={ROLE_COLOR[a.role]}>{a.role}</Chip>
                      </td>
                      <td className="text-muted-foreground px-5 py-3.5 whitespace-nowrap">
                        {a.registeredDate}
                      </td>
                      <td className="text-muted-foreground px-5 py-3.5 whitespace-nowrap">
                        {a.department}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_PILL[a.status]}`}
                        >
                          {a.status === 'Pending'
                            ? t('tabPending')
                            : a.status === 'Approved'
                              ? t('approved')
                              : t('rejected')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {a.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="secondary"
                              className="h-8 gap-1 rounded-lg bg-emerald-500 px-3 text-xs font-semibold text-white hover:bg-emerald-600"
                              onClick={() => void handleApprove(a.id, a.name)}
                            >
                              <Check className="h-3.5 w-3.5" />
                              {t('approve')}
                            </Button>
                            <Button
                              variant="ghost"
                              className="h-8 gap-1 rounded-lg border border-rose-500/30 px-3 text-xs font-semibold text-rose-500 hover:bg-rose-500/10"
                              onClick={() => handleReject(a.id, a.name)}
                            >
                              <X className="h-3.5 w-3.5" />
                              {t('reject')}
                            </Button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <p className="text-muted-foreground py-12 text-center text-sm">
                {t('noMatch')}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
