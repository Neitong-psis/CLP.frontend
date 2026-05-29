import { Activity, Server, Database, Wifi, CheckCircle } from 'lucide-react';
import AdminTopBar from '@/components/common/TopBar';

const SERVICES = [
  { name: 'Web Server', uptime: '99.98%', latency: '42ms', status: 'Healthy' },
  { name: 'Database', uptime: '99.95%', latency: '8ms', status: 'Healthy' },
  { name: 'CDN / Storage', uptime: '100%', latency: '12ms', status: 'Healthy' },
  {
    name: 'Auth Service',
    uptime: '99.99%',
    latency: '18ms',
    status: 'Healthy',
  },
  {
    name: 'Email Service',
    uptime: '98.40%',
    latency: '210ms',
    status: 'Degraded',
  },
  {
    name: 'Video Processing',
    uptime: '97.10%',
    latency: '340ms',
    status: 'Degraded',
  },
];

const SERVICE_ICONS = [Wifi, Database, Server, CheckCircle, Activity, Activity];

export default function AdminSystemPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        role="admin"
        title="System Health"
        subtitle="Real-time service status and infrastructure monitoring"
      />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Overall status banner */}
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-400">
              All Core Systems Operational
            </p>
            <p className="text-[11px] text-white/40">
              Last checked: just now Â· 4 of 6 services healthy
            </p>
          </div>
        </div>

        {/* Service grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => {
            const Icon = SERVICE_ICONS[i];
            const healthy = svc.status === 'Healthy';
            return (
              <div
                key={svc.name}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      healthy
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      healthy
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-amber-500/15 text-amber-400'
                    }`}
                  >
                    {svc.status}
                  </span>
                </div>
                <p className="font-semibold text-white">{svc.name}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
                  <span>
                    Uptime:{' '}
                    <strong className="text-white/60">{svc.uptime}</strong>
                  </span>
                  <span>
                    Latency:{' '}
                    <strong className="text-white/60">{svc.latency}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
