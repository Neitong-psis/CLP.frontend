'use client';

import { useAdminUsersT } from '@/i18n';
import { SimpleFilterDropdown } from '@/components/pages/admin/filters/SimpleFilterDropdown';
import {
  INVITE_DOT,
  INVITE_STATUSES,
  ROLE_DOT,
  ROLES,
  STATUS_DOT,
  STATUSES,
} from '@/constants/admin/users';
import type { UserFilter } from '../_hook/useUserFilter';

/** Faceted filter dropdowns for the user table — role, status, invitation. */
export function UsersFilter({ filter }: { filter: UserFilter }) {
  const t = useAdminUsersT();

  return (
    <div className="flex shrink-0 items-center gap-2">
      <SimpleFilterDropdown
        label={t('filterRole')}
        allLabel={t('filterAll')}
        options={ROLES}
        value={filter.roleFilter}
        onSelect={filter.setRoleFilter}
        dot={ROLE_DOT}
      />
      <SimpleFilterDropdown
        label={t('filterStatus')}
        allLabel={t('filterAll')}
        options={STATUSES}
        value={filter.statusFilter}
        onSelect={filter.setStatusFilter}
        dot={STATUS_DOT}
      />
      <SimpleFilterDropdown
        label={t('filterInvitation')}
        allLabel={t('filterAll')}
        options={INVITE_STATUSES}
        value={filter.inviteFilter}
        onSelect={filter.setInviteFilter}
        dot={INVITE_DOT}
      />
    </div>
  );
}
