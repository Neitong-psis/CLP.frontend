'use client';

import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AdminUserRow } from '@/constants/admin';
import type { SaveUserInput } from '@/features/users';
import { Button } from '@/components/ui/button/Button';
import TopBar from '@/components/common/TopBar';
import { useUserManagement } from '@/components/pages/admin/hooks/useUserManagement';
import { useUserFilter } from '@/components/pages/admin/hooks/useUserFilter';
import {
  DeleteModal,
  EditModal,
  ViewModal,
} from '@/components/pages/admin/components/users/UserModals';
import AddUserModal from './_components/AddUserModal';
import {
  RowContextMenu,
  type ContextMenuState,
} from './_components/RowContextMenu';
import { SkeletonRow, UserTableRow } from './_components/UserTableRow';
import { TablePagination } from './_components/TablePagination';

const TABLE_COLS = [
  'NAME',
  'ROLE',
  'COURSES',
  'JOINED',
  'STATUS',
  'PASSWORD',
  'ACTIONS',
] as const;

export default function AdminUsersPage() {
  const { users, loading, saveEdit, remove, suspend, activate, add } =
    useUserManagement();

  const {
    search,
    setSearch,
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

  const [addOpen, setAddOpen] = useState(false);
  const [viewUser, setViewUser] = useState<AdminUserRow | null>(null);
  const [editUser, setEditUser] = useState<AdminUserRow | null>(null);
  const [editInitialPwd, setEditInitialPwd] = useState<string | undefined>();
  const [deleteUser, setDeleteUser] = useState<AdminUserRow | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  // Per-user known passwords — persisted to sessionStorage so a page refresh
  // doesn't wipe passwords the admin just set. Cleared automatically when the
  // tab/session closes (unlike localStorage).
  const [pwdMap, _setPwdMap] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = sessionStorage.getItem('qbt:admin:pwdmap');
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  function setPwdMap(
    updater: (prev: Record<string, string>) => Record<string, string>,
  ) {
    _setPwdMap((prev) => {
      const next = updater(prev);
      try {
        sessionStorage.setItem('qbt:admin:pwdmap', JSON.stringify(next));
      } catch {
        /* ignore quota / private-browsing errors */
      }
      return next;
    });
  }

  function openEdit(user: AdminUserRow, initialPwd?: string) {
    setEditUser(user);
    setEditInitialPwd(initialPwd);
  }

  function closeEdit() {
    setEditUser(null);
    setEditInitialPwd(undefined);
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
        initialPassword={editInitialPwd}
        onSave={(updated, newPassword) => {
          void saveEdit(updated, newPassword);
          // Keep the column in sync with whatever password the admin confirmed
          if (newPassword && editUser) {
            setPwdMap((prev) => ({ ...prev, [editUser.id]: newPassword }));
          }
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

      {addOpen && (
        <AddUserModal
          onClose={() => setAddOpen(false)}
          onCreate={(input: SaveUserInput) => {
            void add(input);
            setAddOpen(false);
          }}
        />
      )}

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
        <TopBar role="admin" title="User Management" />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <label htmlFor="user-search" className="sr-only">
                Search users by name or email
              </label>
              <Search
                className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="user-search"
                type="search"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-card text-foreground placeholder:text-muted-foreground h-10 w-full rounded-xl border pr-4 pl-10 text-sm outline-none focus:ring-2"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setAddOpen(true)}
              className="shrink-0 rounded-full px-5 font-bold text-white shadow hover:text-white"
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Add User
            </Button>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {filtered.length === 0
              ? 'No users match your search.'
              : `Showing ${pageStart} to ${pageEnd} of ${filtered.length} users.`}
          </p>

          {/* Table */}
          <div className="border-border bg-card overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border bg-surface border-b">
                    <th
                      scope="col"
                      className="text-muted-foreground w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide uppercase"
                    >
                      #
                    </th>
                    {TABLE_COLS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className={cn(
                          'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide uppercase',
                          col === 'ACTIONS' ? 'text-right' : 'text-left',
                        )}
                      >
                        {col}
                      </th>
                    ))}
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
                        pwd={pwdMap[user.id] ?? null}
                        onPwdChange={(pwd) =>
                          setPwdMap((prev) => ({ ...prev, [user.id]: pwd }))
                        }
                        actions={{
                          onView: () => setViewUser(user),
                          onEdit: () => openEdit(user),
                          onResetPassword: (generatedPwd) =>
                            openEdit(user, generatedPwd),
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
                No users match your search.
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
