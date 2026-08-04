'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAdminUsersT } from '@/i18n';
import { Search, UserPlus } from 'lucide-react';
import type { AdminUserRow } from '@/constants/admin';
import {
  ROLES,
  STATUSES,
  INVITE_STATUSES,
  ROLE_DOT,
  STATUS_DOT,
  INVITE_DOT,
} from '@/constants/admin/users';
import { useUserApprovals } from '@/context/UserApprovalsContext';
import TopBar from '@/components/common/TopBar';
import { SortableTh } from '@/components/common/table/SortableTh';
import { FilterableTh } from '@/components/common/table/FilterableTh';
import { useUserManagement } from '@/./app/[locale]/(admin)/admin/users/_hook/useUserManagement';
import { useUserFilter } from '@/./app/[locale]/(admin)/admin/users/_hook/useUserFilter';
import {
  DeleteModal,
  EditModal,
  ViewModal,
} from '@/components/pages/admin/components/users/UserModals';
import {
  RowContextMenu,
  type ContextMenuState,
} from './_components/RowContextMenu';
import { SkeletonRow, UserTableRow } from './_components/UserTableRow';
import { TablePagination } from './_components/TablePagination';

export default function AdminUsersPage() {
  const t = useAdminUsersT();
  const { users, loading, saveEdit, remove, suspend, activate } =
    useUserManagement();
  const { approvals } = useUserApprovals();
  const pendingCount = approvals.filter((a) => a.status === 'Pending').length;

  const {
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    inviteFilter,
    setInviteFilter,
    sortKey,
    sortDir,
    toggleSort,
    currentPage,
    totalPages,
    pageStart,
    pageEnd,
    filtered,
    paginated,
    goToPage,
    prevPage,
    nextPage,
  } = useUserFilter(users);

  const [viewUser, setViewUser] = useState<AdminUserRow | null>(null);
  const [editUser, setEditUser] = useState<AdminUserRow | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUserRow | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  function openEdit(user: AdminUserRow) {
    setEditUser(user);
  }

  function closeEdit() {
    setEditUser(null);
  }

  return (
    <>
      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <ViewModal
        open={!!viewUser}
        user={viewUser}
        onClose={() => setViewUser(null)}
        onEdit={() => {
          if (viewUser) openEdit(viewUser);
          setViewUser(null);
        }}
      />

      <EditModal
        key={editUser?.id ?? 'edit-closed'}
        open={!!editUser}
        user={editUser}
        onSave={(updated, newPassword) => {
          void saveEdit(updated, newPassword);
          closeEdit();
        }}
        onClose={closeEdit}
      />

      <DeleteModal
        open={!!deleteUser}
        name={deleteUser?.name ?? ''}
        onConfirm={() => {
          if (deleteUser) {
            void remove(deleteUser.id);
            setDeleteUser(null);
          }
        }}
        onClose={() => setDeleteUser(null)}
      />

      {contextMenu && (
        <RowContextMenu
          {...contextMenu}
          onView={() => setViewUser(contextMenu.user)}
          onEdit={() => openEdit(contextMenu.user)}
          onSuspend={() => suspend(contextMenu.user.id)}
          onActivate={() => activate(contextMenu.user.id)}
          onDelete={() => setDeleteUser(contextMenu.user)}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* ── Page shell ─────────────────────────────────────────────────────── */}
      <div className="flex min-h-full flex-col">
        <TopBar role="admin" title={t('title')} />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <label htmlFor="user-search" className="sr-only">
                {t('searchAriaLabel')}
              </label>
              <Search
                className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="user-search"
                type="search"
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-card text-foreground placeholder:text-muted-foreground h-10 w-full rounded-xl border pr-4 pl-10 text-sm outline-none focus:ring-2"
              />
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/admin/users/approvals"
                className="bg-brand-accent text-brand-accent-foreground inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-medium sm:px-4"
              >
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                {t('newUser')}
                {pendingCount > 0 && (
                  <span className="bg-brand-accent-foreground/15 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums">
                    {pendingCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {filtered.length === 0
              ? t('noMatch')
              : t('srShowing', {
                  from: pageStart,
                  to: pageEnd,
                  total: filtered.length,
                })}
          </p>

          {/* Table */}
          <div className="border-border bg-card overflow-hidden rounded-xl border">
            <div className="scrollbar-none overflow-x-auto">
              <table className="w-full min-w-220 text-sm">
                <thead>
                  <tr className="border-border bg-surface border-b">
                    <th
                      scope="col"
                      className="text-muted-foreground w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase"
                    >
                      #
                    </th>
                    <SortableTh
                      label={t('colName')}
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
                      label={t('colCourses')}
                      active={sortKey === 'courses'}
                      direction={sortDir}
                      onClick={() => toggleSort('courses')}
                    />
                    <SortableTh
                      label={t('colJoined')}
                      active={sortKey === 'joined'}
                      direction={sortDir}
                      onClick={() => toggleSort('joined')}
                    />
                    <FilterableTh
                      label={t('colStatus')}
                      options={STATUSES}
                      value={statusFilter}
                      onSelect={setStatusFilter}
                      dot={STATUS_DOT}
                    />
                    <FilterableTh
                      label={t('colInvitation')}
                      options={INVITE_STATUSES}
                      value={inviteFilter}
                      onSelect={setInviteFilter}
                      dot={INVITE_DOT}
                    />
                    <th
                      scope="col"
                      className="text-muted-foreground px-5 py-3.5 text-right text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase"
                    >
                      {t('colActions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {loading &&
                    Array.from({ length: 8 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}
                  {!loading &&
                    paginated.map((user, idx) => (
                      <UserTableRow
                        key={user.id}
                        user={user}
                        index={pageStart + idx}
                        isHighlighted={contextMenu?.user.id === user.id}
                        actions={{
                          onView: () => setViewUser(user),
                          onEdit: () => openEdit(user),
                          onResetPassword: () => openEdit(user),
                          onSuspend: () => suspend(user.id),
                          onActivate: () => activate(user.id),
                          onDelete: () => setDeleteUser(user),
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setContextMenu({ user, x: e.clientX, y: e.clientY });
                        }}
                      />
                    ))}
                </tbody>
              </table>
            </div>

            {!loading && filtered.length === 0 && (
              <p className="text-muted-foreground py-12 text-center text-sm">
                {t('noMatch')}
              </p>
            )}

            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageStart={pageStart}
              pageEnd={pageEnd}
              totalCount={filtered.length}
              onPrev={prevPage}
              onNext={nextPage}
              onGoTo={goToPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
