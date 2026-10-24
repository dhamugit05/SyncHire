import React, { useState } from 'react';
import { 
  Candidate, 
  CandidateStage 
} from '../types/index.ts';
import { 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Send, 
  MessageSquare, 
  RotateCcw, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Maximize2, 
  Kanban, 
  List as ListIcon, 
  Download, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  UserCheck, 
  Check, 
  ArrowRight,
  TrendingDown,
  Layers,
  UserPlus
} from 'lucide-react';

interface PipelineViewProps {
  candidates: Candidate[];
  selectedCandidate: Candidate;
  onSelectCandidate: (candidate: Candidate) => void;
  onScheduleCandidate: (candidate: Candidate) => void;
  onSendBookingLink: (candidate: Candidate) => void;
  onOpenBatchAction: () => void;
  onOpenFastNote: (candidate: Candidate) => void;
  onOpenReschedule: (candidate: Candidate) => void;
  onNudgePanel: () => void;
  onSourceTalent: () => void;
  onExportCsv: () => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  candidates,
  selectedCandidate,
  onSelectCandidate,
  onScheduleCandidate,
  onSendBookingLink,
  onOpenBatchAction,
  onOpenFastNote,
  onOpenReschedule,
  onNudgePanel,
  onSourceTalent,
  onExportCsv,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Staff Full Stack Engineer (Remote)');
  const [panelLoadFilter, setPanelLoadFilter] = useState('Optimal (<4/wk)');

  const columns: { stage: CandidateStage; label: string; count: number }[] = [
    { stage: 'applied', label: 'Applied & Sourced', count: 2 },
    { stage: 'recruiter_screen', label: 'Recruiter Screen', count: 2 },
    { stage: 'technical_screen', label: 'Technical Screen', count: 2 },
    { stage: 'panel_onsite', label: 'Panel Onsite', count: 1 },
    { stage: 'offer', label: 'Offer & Decision', count: 1 },
  ];

  const filteredCandidates = candidates.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.previousCompany.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0b1326] overflow-y-auto">
      {/* Top Header & Requisition Control */}
      <div className="border-b border-white/[0.08] bg-[#0b1326] px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#918fa1]">
              <span>REQUISITION CONTROL</span>
              <span className="text-[#464555]">/</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-[#dae2fd] tracking-tight">
                Recruiter Command Center
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a572]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#4edea3] border border-[#4edea3]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                Live Sync Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenBatchAction}
              className="flex items-center gap-1.5 rounded border border-white/[0.12] bg-[#131b2e] px-3 py-1.5 text-xs font-medium text-[#dae2fd] hover:bg-[#171f33] hover:border-white/20 transition-all cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 text-[#ffb95f]" />
              <span>Batch Action</span>
              <kbd className="ml-1 rounded bg-[#222a3d] px-1 py-0.2 text-[9px] font-mono text-[#918fa1]">B</kbd>
            </button>

            <button
              onClick={onSourceTalent}
              className="flex items-center gap-1.5 rounded bg-[#4f46e5] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#4338ca] transition-all cursor-pointer border-t border-white/20"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Source Talent</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
          {/* Card 1: Time to schedule */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#918fa1]">
              <span className="font-semibold tracking-wide uppercase text-[11px]">Time to Schedule</span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-[#00a572]/20 px-2 py-0.5 text-[10px] font-mono font-medium text-[#4edea3] border border-[#4edea3]/30">
                <TrendingDown className="h-3 w-3" />
                -42%
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-[#dae2fd]">18h</span>
              <span className="text-xs text-[#918fa1]">avg cycle</span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-[11px] text-[#918fa1] mb-1">
                <span>Prior 30d baseline: 31h</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#1e293b] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#4edea3] to-[#00a572] w-[58%]" />
              </div>
            </div>
          </div>

          {/* Card 2: Today's interviews */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#918fa1]">
              <span className="font-semibold tracking-wide uppercase text-[11px]">Today's Interviews</span>
              <span className="rounded-full bg-[#222a3d] px-2 py-0.5 text-[10px] font-mono text-[#c3c0ff] border border-white/[0.08]">
                8 Slots
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-[#dae2fd]">8</span>
              <span className="text-xs text-[#918fa1]">scheduled</span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-[11px] text-[#918fa1] mb-1 font-mono">
                <span className="text-[#4edea3]">3 Done</span> • <span className="text-[#c3c0ff]">4 In-prog</span> • <span className="text-[#ffb95f]">1 Pending</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#1e293b] flex overflow-hidden gap-0.5">
                <div className="h-full bg-[#4edea3] w-[37.5%]" />
                <div className="h-full bg-[#4f46e5] w-[50%]" />
                <div className="h-full bg-[#ffb95f] w-[12.5%]" />
              </div>
            </div>
          </div>

          {/* Card 3: Active Pipeline */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#918fa1]">
              <span className="font-semibold tracking-wide uppercase text-[11px]">Active Pipeline</span>
              <span className="rounded-full bg-[#222a3d] px-2 py-0.5 text-[10px] font-mono text-[#c3c0ff] border border-white/[0.08]">
                6 Roles
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-[#dae2fd]">142</span>
              <span className="text-xs text-[#918fa1]">candidates</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-[#918fa1]">Global Engineering Cohort</span>
              <span className="text-[#4edea3] font-mono font-medium">91.4% match</span>
            </div>
          </div>

          {/* Card 4: SLA Alerts */}
          <div className="rounded-lg border border-rose-500/30 bg-[#0f172a] p-3.5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between text-xs text-[#918fa1]">
              <span className="font-semibold tracking-wide uppercase text-[11px] text-[#ffb4ab]">SLA Alerts</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#93000a]/40 px-2 py-0.5 text-[10px] font-mono font-medium text-[#ffb4ab] border border-rose-500/40">
                <AlertTriangle className="h-3 w-3 text-rose-400" />
                3 Overdue
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-rose-300">&gt; 48h</span>
              <span className="text-xs text-[#ffb4ab]/80">unresolved</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-[#c7c4d8]">Bottleneck: Tech Screen panel</span>
              <button
                onClick={onNudgePanel}
                className="text-xs font-semibold text-[#c3c0ff] hover:text-white flex items-center gap-0.5 group cursor-pointer"
              >
                <span>Nudge Panel</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="border-b border-white/[0.08] bg-[#090d16] px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Requisition Dropdown */}
          <div className="flex items-center gap-2 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd]">
            <span className="text-[10px] uppercase font-bold text-[#918fa1]">Role Requisition</span>
            <span className="font-medium">{selectedRole}</span>
            <ChevronDown className="h-3 w-3 text-[#918fa1]" />
          </div>

          <div className="flex items-center gap-2 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd]">
            <span className="h-2 w-2 rounded-full bg-[#4edea3]" />
            <span>Core Infrastructure</span>
            <ChevronDown className="h-3 w-3 text-[#918fa1]" />
          </div>

          <div className="flex items-center gap-2 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd]">
            <span className="text-[10px] text-[#918fa1]">Panel Load:</span>
            <span className="text-[#4edea3] font-mono">{panelLoadFilter}</span>
            <ChevronDown className="h-3 w-3 text-[#918fa1]" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded border border-white/[0.08] bg-[#131b2e] p-0.5">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-[#222a3d] text-white shadow-xs' : 'text-[#918fa1] hover:text-[#dae2fd]'
              }`}
            >
              <Kanban className="h-3.5 w-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'list' ? 'bg-[#222a3d] text-white shadow-xs' : 'text-[#918fa1] hover:text-[#dae2fd]'
              }`}
            >
              <ListIcon className="h-3.5 w-3.5" />
              <span>List</span>
            </button>
          </div>

          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#c7c4d8] hover:bg-[#171f33] hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search Bar Input */}
      <div className="px-6 py-2.5 bg-[#0b1326] border-b border-white/[0.06]">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#918fa1]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates, tags, companies..."
            className="w-full rounded border border-white/[0.08] bg-[#090d16] py-1.5 pl-9 pr-4 text-xs text-[#dae2fd] placeholder-[#64748b] focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
          />
        </div>
      </div>

      {/* Main Content Area: Kanban / List + Quick Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Kanban / List Board */}
        <div className="flex-1 p-6 overflow-x-auto overflow-y-auto">
          {viewMode === 'kanban' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 min-w-[1020px] pb-8">
              {columns.map((col) => {
                const stageCandidates = filteredCandidates.filter((c) => c.stage === col.stage);
                return (
                  <div key={col.stage} className="flex flex-col rounded-lg bg-[#0f172a]/70 border border-white/[0.06] p-3">
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${
                          col.stage === 'applied' ? 'bg-[#918fa1]' :
                          col.stage === 'recruiter_screen' ? 'bg-[#c3c0ff]' :
                          col.stage === 'technical_screen' ? 'bg-[#ffb95f]' :
                          col.stage === 'panel_onsite' ? 'bg-[#4edea3]' : 'bg-[#10b981]'
                        }`} />
                        <h2 className="text-xs font-semibold text-[#dae2fd] tracking-tight">
                          {col.label}
                        </h2>
                      </div>
                      <span className="rounded bg-[#171f33] px-1.5 py-0.5 text-[10px] font-mono text-[#918fa1]">
                        {stageCandidates.length}
                      </span>
                    </div>

                    {col.stage === 'applied' && (
                      <div className="mb-2 text-[10px] font-mono text-[#c3c0ff] bg-[#4f46e5]/10 border border-[#4f46e5]/20 rounded px-2 py-1 flex items-center justify-between">
                        <span>Fast Filter (AI &gt; 85%)</span>
                        <Check className="h-3 w-3 text-[#4edea3]" />
                      </div>
                    )}

                    {/* Candidate Cards */}
                    <div className="space-y-2.5 flex-1 overflow-y-auto">
                      {stageCandidates.map((cand) => {
                        const isSelected = selectedCandidate.id === cand.id;
                        return (
                          <div
                            key={cand.id}
                            onClick={() => onSelectCandidate(cand)}
                            className={`rounded-md p-3 border transition-all cursor-pointer relative group ${
                              isSelected
                                ? 'bg-[#171f33] border-[#4f46e5] ring-1 ring-[#4f46e5]/50 shadow-md shadow-indigo-950/30'
                                : 'bg-[#131b2e] border-white/[0.06] hover:bg-[#171f33] hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <img
                                  src={cand.avatarUrl}
                                  alt={cand.name}
                                  className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
                                />
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <h3 className="text-xs font-bold text-[#dae2fd] group-hover:text-white">
                                      {cand.name}
                                    </h3>
                                    {cand.scorecardRating && (
                                      <CheckCircle2 className="h-3 w-3 text-[#4edea3]" />
                                    )}
                                  </div>
                                  <div className="text-[11px] text-[#918fa1]">
                                    {cand.previousCompany}
                                  </div>
                                </div>
                              </div>

                              <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                                cand.matchScore >= 90
                                  ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#4edea3]/30'
                                  : 'bg-[#222a3d] text-[#c3c0ff]'
                              }`}>
                                {cand.matchScore}%
                              </span>
                            </div>

                            {/* Skills badges */}
                            <div className="mt-2.5 flex flex-wrap gap-1">
                              {cand.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded bg-[#090d16] px-1.5 py-0.5 text-[9px] font-mono text-[#c7c4d8] border border-white/[0.04]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* Status Banner / SLA alerts */}
                            {cand.isSlaBreach && (
                              <div className="mt-2 rounded bg-rose-950/40 border border-rose-500/30 px-2 py-1 text-[10px] font-mono text-rose-300 flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-rose-400" />
                                <span>{cand.statusText}</span>
                              </div>
                            )}

                            {cand.statusText && !cand.isSlaBreach && (
                              <div className="mt-2 text-[10px] font-mono text-[#c7c4d8] flex items-center justify-between">
                                <span className={
                                  cand.statusType === 'success' ? 'text-[#4edea3]' :
                                  cand.statusType === 'warning' ? 'text-[#ffb95f]' :
                                  cand.statusType === 'in_progress' ? 'text-[#c3c0ff]' : 'text-[#918fa1]'
                                }>
                                  {cand.statusText}
                                </span>
                              </div>
                            )}

                            {/* CTA inside Card if needed (e.g. Schedule Round 2 on Priya Sharma) */}
                            {cand.id === 'CAND-89202' && (
                              <div className="mt-2.5 pt-2 border-t border-white/[0.08]">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onScheduleCandidate(cand);
                                  }}
                                  className="w-full flex items-center justify-center gap-1.5 rounded bg-[#4f46e5] px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#4338ca] transition-colors"
                                >
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>Schedule Round 2</span>
                                </button>
                              </div>
                            )}

                            {cand.salaryApproved && (
                              <div className="mt-2 text-[10px] font-mono text-[#4edea3] flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>{cand.salaryApproved}</span>
                              </div>
                            )}

                            {cand.equity && (
                              <div className="text-[10px] font-mono text-[#918fa1]">
                                Equity: {cand.equity}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131b2e] text-[#918fa1] uppercase text-[10px] font-mono border-b border-white/[0.08]">
                  <tr>
                    <th className="py-2.5 px-4">Candidate</th>
                    <th className="py-2.5 px-4">Role</th>
                    <th className="py-2.5 px-4">Stage</th>
                    <th className="py-2.5 px-4">Match</th>
                    <th className="py-2.5 px-4">Status / SLA</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredCandidates.map((cand) => (
                    <tr
                      key={cand.id}
                      onClick={() => onSelectCandidate(cand)}
                      className={`hover:bg-[#171f33] transition-colors cursor-pointer ${
                        selectedCandidate.id === cand.id ? 'bg-[#171f33]' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={cand.avatarUrl}
                            alt={cand.name}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-semibold text-[#dae2fd]">{cand.name}</div>
                            <div className="text-[11px] text-[#918fa1]">{cand.previousCompany}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#c7c4d8]">{cand.role}</td>
                      <td className="py-3 px-4">
                        <span className="capitalize text-[11px] font-mono rounded bg-[#222a3d] px-2 py-0.5 text-[#c3c0ff]">
                          {cand.stage.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#4edea3]">
                        {cand.matchScore}%
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[11px] font-mono ${
                          cand.isSlaBreach ? 'text-rose-400 font-semibold' : 'text-[#c7c4d8]'
                        }`}>
                          {cand.statusText || `${cand.daysInStage} days`}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onScheduleCandidate(cand);
                          }}
                          className="rounded bg-[#4f46e5]/20 text-[#c3c0ff] border border-[#4f46e5]/40 px-2 py-1 text-xs hover:bg-[#4f46e5] hover:text-white transition-colors"
                        >
                          Schedule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Quick Inspector (380px fixed width matching spec) */}
        <div className="w-[380px] shrink-0 border-l border-white/[0.08] bg-[#090d16] p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                  Quick Inspector
                </span>
                <span className="rounded bg-[#222a3d] px-1.5 py-0.5 text-[9px] font-mono text-[#c3c0ff]">
                  Active Selection
                </span>
              </div>
              <button 
                title="Expand profile details"
                className="text-[#918fa1] hover:text-white transition-colors"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Candidate Header */}
            <div className="flex items-start gap-3">
              <img
                src={selectedCandidate.avatarUrl}
                alt={selectedCandidate.name}
                className="h-12 w-12 rounded-lg object-cover ring-1 ring-white/10"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-[#dae2fd]">
                    {selectedCandidate.name}
                  </h2>
                </div>
                <div className="text-xs text-[#918fa1]">
                  {selectedCandidate.role} • {selectedCandidate.previousCompany}
                </div>
                <div className="mt-0.5 text-[10px] font-mono text-[#c3c0ff]">
                  ID: {selectedCandidate.id}
                </div>
              </div>
            </div>

            {/* AI Resume Synthesizer Box */}
            <div className="rounded-lg border border-[#4f46e5]/30 bg-[#131b2e] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c3c0ff]">
                  <Sparkles className="h-3.5 w-3.5 text-[#c3c0ff]" />
                  <span>AI RESUME SYNTHESIZER</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#4edea3]">
                  {selectedCandidate.matchScore}% Semantic Match
                </span>
              </div>

              <blockquote className="text-[11px] text-[#c7c4d8] italic leading-relaxed bg-[#090d16]/70 p-2.5 rounded border border-white/[0.04]">
                {selectedCandidate.resumeHighlights ||
                  '"Demonstrated mastery in cloud architectures, real-time message streams, and high reliability production systems."'}
              </blockquote>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedCandidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-[#222a3d] px-2 py-0.5 text-[10px] font-mono text-[#dae2fd] border border-white/[0.06]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interview Progress & Latency */}
            <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-3 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                Interview Progress & Latency
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                    <span className="text-[#dae2fd]">Recruiter Initial</span>
                  </div>
                  <span className="font-mono text-[#4edea3] text-[11px]">Passed (4.8)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#4f46e5] animate-pulse" />
                    <span className="text-[#dae2fd]">System Arch (Live)</span>
                  </div>
                  <span className="font-mono text-[#c3c0ff] text-[11px]">In 2h</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#464555]" />
                    <span className="text-[#918fa1]">Executive Panel</span>
                  </div>
                  <span className="font-mono text-[#918fa1] text-[11px]">Queued</span>
                </div>
              </div>
            </div>

            {/* Panel Free/Busy Engine */}
            <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                  Panel Free/Busy Engine
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-[#4edea3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3]" />
                  All 3 Available
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="rounded bg-[#00a572]/20 border border-[#4edea3]/30 p-2 text-center">
                  <div className="font-mono text-xs font-bold text-[#dae2fd]">14:00</div>
                  <div className="text-[9px] font-mono text-[#4edea3]">100% Free</div>
                </div>
                <div className="rounded bg-[#00a572]/20 border border-[#4edea3]/30 p-2 text-center">
                  <div className="font-mono text-xs font-bold text-[#dae2fd]">15:30</div>
                  <div className="text-[9px] font-mono text-[#4edea3]">100% Free</div>
                </div>
                <div className="rounded bg-[#885500]/30 border border-[#ffb95f]/30 p-2 text-center">
                  <div className="font-mono text-xs font-bold text-[#dae2fd]">17:00</div>
                  <div className="text-[9px] font-mono text-[#ffb95f]">2/3 Free</div>
                </div>
                <div className="rounded bg-[#171f33] border border-white/[0.08] p-2 text-center opacity-60">
                  <div className="font-mono text-xs font-bold text-[#918fa1]">18:00</div>
                  <div className="text-[9px] font-mono text-rose-400">Conflict</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2">
            <button
              onClick={() => onSendBookingLink(selectedCandidate)}
              className="w-full flex items-center justify-center gap-2 rounded bg-[#4f46e5] px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#4338ca] transition-all cursor-pointer border-t border-white/20 active:scale-[0.99]"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send 60-Sec Self-Booking Link</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenFastNote(selectedCandidate)}
                className="flex items-center justify-center gap-1.5 rounded border border-white/[0.12] bg-[#131b2e] px-3 py-2 text-xs font-medium text-[#dae2fd] hover:bg-[#171f33] transition-colors cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5 text-[#c3c0ff]" />
                <span>Fast Note</span>
              </button>
              <button
                onClick={() => onOpenReschedule(selectedCandidate)}
                className="flex items-center justify-center gap-1.5 rounded border border-white/[0.12] bg-[#131b2e] px-3 py-2 text-xs font-medium text-[#dae2fd] hover:bg-[#171f33] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#ffb95f]" />
                <span>Reschedule</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#918fa1]">
              <span>Candidate Timezone: <strong className="text-[#dae2fd]">{selectedCandidate.timezone} (UTC{selectedCandidate.timezoneOffsetHours >= 0 ? `+${selectedCandidate.timezoneOffsetHours}` : selectedCandidate.timezoneOffsetHours})</strong></span>
              <span className="text-[#4edea3] font-semibold">Drift: 0h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
