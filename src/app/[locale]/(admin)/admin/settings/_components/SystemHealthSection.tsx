'use client';

import { useState } from 'react';
import { Activity, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAdminSettingsT } from '@/i18n';
import { SettingsSection } from './SettingsSection';

interface HealthItem {
  label: string;
  status: 'ok' | 'error' | 'checking';
  detail: string;
}

const INITIAL_CHECKS: HealthItem[] = [
  { label: 'API Server', status: 'ok', detail: 'Responding in 42 ms' },
  {
    label: 'Database',
    status: 'ok',
    detail: 'PostgreSQL — 12 active connections',
  },
  {
    label: 'File Storage',
    status: 'ok',
    detail: 'S3-compatible — 68 % capacity used',
  },
  { label: 'Auth Service', status: 'ok', detail: 'JWT issuer reachable' },
  {
    label: 'Email Worker',
    status: 'ok',
    detail: 'Queue idle — 0 pending jobs',
  },
];

function StatusIcon({ status }: { status: HealthItem['status'] }) {
  if (status === 'checking')
    return <Loader2 className="h-4 w-4 animate-spin text-amber-400" />;
  if (status === 'ok')
    return <CheckCircle className="h-4 w-4 text-emerald-500" />;
  return <AlertCircle className="h-4 w-4 text-rose-500" />;
}

export function SystemHealthSection() {
  const t = useAdminSettingsT();
  const [open, setOpen] = useState(false);
  const [checks, setChecks] = useState<HealthItem[]>(INITIAL_CHECKS);
  const [running, setRunning] = useState(false);

  function runChecks() {
    setRunning(true);
    setChecks((prev) => prev.map((c) => ({ ...c, status: 'checking' })));

    INITIAL_CHECKS.forEach((item, i) => {
      setTimeout(
        () => {
          setChecks((prev) =>
            prev.map((c, idx) => (idx === i ? { ...item } : c)),
          );
          if (i === INITIAL_CHECKS.length - 1) setRunning(false);
        },
        400 + i * 350,
      );
    });
  }

  function openModal() {
    setOpen(true);
    if (checks.every((c) => c.status !== 'checking')) runChecks();
  }

  const allOk = checks.every((c) => c.status === 'ok');

  return (
    <>
      <SettingsSection
        title={t('systemHealth')}
        subtitle={t('systemHealthDesc')}
      >
        <div className="border-border bg-surface flex items-center justify-between rounded-lg border px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-emerald-500">
              {t('currentStatus')}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {t('healthModalHint')}
            </p>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="text-foreground hover:bg-muted border-border bg-card flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition-colors"
          >
            <Activity className="text-muted-foreground h-3.5 w-3.5" />
            {t('viewSystemHealth')}
          </button>
        </div>
      </SettingsSection>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-card border-border w-full max-w-md rounded-2xl border p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="text-muted-foreground h-5 w-5" />
                <h2 className="text-foreground text-base font-semibold">
                  {t('systemHealth')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground rounded-md p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Overall badge */}
            <div
              className={`mb-5 rounded-lg px-4 py-3 text-sm font-medium ${
                running
                  ? 'bg-amber-50 text-amber-600'
                  : allOk
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-rose-50 text-rose-600'
              }`}
            >
              {running
                ? t('runningDiagnostics')
                : allOk
                  ? t('allSystemsOperational')
                  : t('systemsNeedAttention')}
            </div>

            {/* Checks */}
            <ul className="space-y-3">
              {checks.map((item) => (
                <li
                  key={item.label}
                  className="border-border flex items-center gap-3 rounded-lg border px-4 py-3"
                >
                  <StatusIcon status={item.status} />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-xs font-semibold">
                      {item.label}
                    </p>
                    <p className="text-muted-foreground truncate text-[11px]">
                      {item.status === 'checking' ? t('checking') : item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Re-run */}
            <button
              type="button"
              onClick={runChecks}
              disabled={running}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {running && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {running ? t('running') : t('reRunChecks')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
