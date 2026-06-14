import { Activity } from 'lucide-react';
import { SettingsSection } from './SettingsSection';

export function SystemHealthSection() {
  return (
    <SettingsSection
      title="System Health"
      subtitle="Review operational status only when you need detailed diagnostics."
    >
      <div className="border-border bg-surface flex items-center justify-between rounded-lg border px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-emerald-500">
            Current status: Operational
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Server, API, storage, and database checks are available in the
            health modal.
          </p>
        </div>
        <button className="text-foreground hover:bg-muted border-border bg-card flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition-colors">
          <Activity className="text-muted-foreground h-3.5 w-3.5" />
          View System Health
        </button>
      </div>
    </SettingsSection>
  );
}
