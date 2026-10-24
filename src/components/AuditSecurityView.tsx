import React from 'react';
import { MOCK_AUDIT_LOGS } from '../data/mockData.ts';
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Key, 
  Database 
} from 'lucide-react';

export const AuditSecurityView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0b1326] overflow-y-auto">
      {/* Header */}
      <div className="border-b border-white/[0.08] bg-[#090d16] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-[#918fa1]">
              <span>COMPLIANCE &amp; GOVERNANCE</span>
              <span>/</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Audit &amp; Security Controls
            </h1>
            <p className="text-xs text-[#918fa1] mt-0.5">
              SOC-2 Type II audit trail, GDPR auto-purging pipelines, and bi-directional tenant graph sync logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-[#00a572]/20 px-2.5 py-1 text-xs font-mono text-[#4edea3] border border-[#4edea3]/30 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              SOC-2 / GDPR Compliant
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Top 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#918fa1]">
              <span className="font-semibold uppercase text-[10px]">Connected Tenants</span>
              <Server className="h-4 w-4 text-[#4edea3]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">84 Accounts</div>
            <div className="text-[11px] text-[#4edea3] flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Google Calendar &amp; Outlook 365 Synced</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#918fa1]">
              <span className="font-semibold uppercase text-[10px]">Data Retention Policy</span>
              <Database className="h-4 w-4 text-[#c3c0ff]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">90-Day Auto Purge</div>
            <div className="text-[11px] text-[#c7c4d8]">
              Automated deletion of candidate audio/notes per GDPR &amp; DPDP rules.
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#918fa1]">
              <span className="font-semibold uppercase text-[10px]">Webhook Ping Latency</span>
              <RefreshCw className="h-4 w-4 text-[#ffb95f]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">18ms Avg</div>
            <div className="text-[11px] text-[#ffb95f]">
              Real-time slot lock collision resolution active.
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0f172a] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <h2 className="text-base font-bold text-white">
                Immutable Transactional Audit Trail
              </h2>
              <div className="text-xs text-[#918fa1]">
                Cryptographically signed actions recorded across candidate journeys.
              </div>
            </div>
            <button className="rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1 text-xs text-[#dae2fd] hover:bg-[#171f33] transition-colors">
              Export Audit CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131b2e] text-[#918fa1] uppercase text-[10px] font-mono border-b border-white/[0.08]">
                <tr>
                  <th className="py-2.5 px-4">Timestamp</th>
                  <th className="py-2.5 px-4">Action Event</th>
                  <th className="py-2.5 px-4">Initiator / Actor</th>
                  <th className="py-2.5 px-4">Target Requisition</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Verification Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {MOCK_AUDIT_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-[#131b2e] transition-colors">
                    <td className="py-3 px-4 font-mono text-[#918fa1] whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-[#dae2fd]">{log.action}</td>
                    <td className="py-3 px-4 text-[#c7c4d8]">{log.actor}</td>
                    <td className="py-3 px-4 text-[#c3c0ff] font-mono">{log.target}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        log.status === 'locked' ? 'bg-[#4f46e5]/20 text-[#c3c0ff] border border-[#4f46e5]/30' :
                        log.status === 'synced' ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#4edea3]/30' :
                        log.status === 'purged' ? 'bg-[#222a3d] text-[#dae2fd]' :
                        'bg-rose-950/40 text-rose-300 border border-rose-500/30'
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-[#918fa1] max-w-xs truncate">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
