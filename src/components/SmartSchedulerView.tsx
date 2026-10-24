import React, { useState } from 'react';
import { 
  Candidate, 
  Interviewer, 
  RecommendedWindow 
} from '../types/index.ts';
import { 
  RECOMMENDED_WINDOWS, 
  MOCK_INTERVIEWERS 
} from '../data/mockData.ts';
import { 
  Zap, 
  CheckCircle2, 
  SlidersHorizontal, 
  ShieldCheck, 
  Clock, 
  Video, 
  MessageSquare, 
  FileCheck, 
  Lock, 
  Copy, 
  Send, 
  UserPlus, 
  Calendar, 
  Globe, 
  ArrowRight,
  Info,
  Check
} from 'lucide-react';

interface SmartSchedulerViewProps {
  candidate?: Candidate;
  onSendDirectInvites: (window: RecommendedWindow) => void;
  onHoldSlot: (window: RecommendedWindow) => void;
  onCopyMagicLink: () => void;
}

export const SmartSchedulerView: React.FC<SmartSchedulerViewProps> = ({
  candidate,
  onSendDirectInvites,
  onHoldSlot,
  onCopyMagicLink,
}) => {
  const [selectedWindowId, setSelectedWindowId] = useState<string>('WIN-1');
  const [workingHoursStrict, setWorkingHoursStrict] = useState(true);
  const [atomicLockActive, setAtomicLockActive] = useState(true);
  const [prepBufferMinutes, setPrepBufferMinutes] = useState(15);
  const [cooldownBufferMinutes, setCooldownBufferMinutes] = useState(15);
  const [showObserverModal, setShowObserverModal] = useState(false);

  const selectedWindow = RECOMMENDED_WINDOWS.find((w) => w.id === selectedWindowId) || RECOMMENDED_WINDOWS[0];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0b1326] overflow-y-auto">
      {/* Top Banner */}
      <div className="border-b border-white/[0.08] bg-[#090d16] px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#00a572]/20 text-[#4edea3]">
                <Zap className="h-3.5 w-3.5 fill-[#4edea3]" />
              </div>
              <h1 className="text-lg font-bold text-[#dae2fd] tracking-tight">
                Smart Scheduler Engine
              </h1>
              <span className="rounded-full bg-[#00a572]/20 px-2.5 py-0.5 text-[11px] font-mono text-[#4edea3] border border-[#4edea3]/30">
                &lt;60s Speedrun Active
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-[#4f46e5]/20 px-2.5 py-0.5 text-[11px] font-mono text-[#c3c0ff] border border-[#4f46e5]/30">
                100% Sync Verified
              </span>
            </div>
            <p className="mt-1 text-xs text-[#918fa1]">
              Google Calendar &amp; Outlook 365 connected across 84 tenant accounts with real-time slot locking.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[#4edea3] bg-[#131b2e] px-2.5 py-1.5 rounded border border-white/[0.08]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Conflict Latency: 18ms</span>
            </div>

            <button className="flex items-center gap-1.5 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#c7c4d8] hover:bg-[#171f33] hover:text-white transition-colors cursor-pointer">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Rules</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
        {/* Left Column (5 Cols): Requisition, Panel Selection, Guardrails */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Requisition & Stage */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                1. REQUISITION &amp; STAGE
              </span>
              <span className="text-[10px] font-mono text-[#c3c0ff] bg-[#222a3d] px-2 py-0.5 rounded">
                Round 3 of 4
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded bg-[#131b2e] p-2.5 border border-white/[0.04]">
                <div className="text-[10px] text-[#918fa1] uppercase">Target Requisition</div>
                <div className="font-semibold text-[#dae2fd] mt-0.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span>Senior Systems Architect</span>
                </div>
                <div className="text-[10px] font-mono text-[#918fa1] mt-0.5">Job #ENG-204 • Core Infra</div>
              </div>

              <div className="rounded bg-[#131b2e] p-2.5 border border-white/[0.04]">
                <div className="text-[10px] text-[#918fa1] uppercase">Interview Module</div>
                <div className="font-semibold text-[#dae2fd] mt-0.5 flex items-center gap-1.5">
                  <span className="font-mono text-[#c3c0ff]">λ</span>
                  <span>System Design Panel</span>
                </div>
                <div className="text-[10px] font-mono text-[#4edea3] mt-0.5">75 min duration</div>
              </div>
            </div>

            {/* Candidate info inside section 1 */}
            <div className="rounded bg-[#131b2e] p-3 border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                  Candidate Profile
                </span>
                <span className="rounded bg-[#00a572]/20 px-2 py-0.5 text-[10px] font-mono text-[#4edea3] border border-[#4edea3]/30 flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Geo-IP Resolved
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Priya Sharma"
                  className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                />
                <div>
                  <div className="font-bold text-xs text-[#dae2fd]">Priya Sharma</div>
                  <div className="text-[11px] font-mono text-[#918fa1]">priya.s@example.com</div>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2 text-[10px] font-mono">
                <span className="rounded bg-[#090d16] px-2 py-1 text-[#c7c4d8] border border-white/[0.06]">
                  Asia/Kolkata (IST, UTC+5:30)
                </span>
                <span className="rounded bg-[#00a572]/20 px-2 py-1 text-[#4edea3] font-semibold border border-[#4edea3]/30">
                  +9.5 hrs vs Panel (EST)
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Panel Selection & Burnout Guard */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                2. PANEL SELECTION &amp; BURNOUT GUARD
              </span>
              <span className="text-[10px] font-mono text-[#4edea3] bg-[#00a572]/20 px-2 py-0.5 rounded border border-[#4edea3]/30">
                Round-Robin Active
              </span>
            </div>

            <p className="text-[11px] text-[#c7c4d8] bg-[#131b2e] p-2.5 rounded border border-white/[0.04]">
              <strong className="text-[#4edea3]">Optimal pairing locked:</strong> Load-balancing algorithm selected David K. and Rachel Wei to maintain equitable interview load and prevent interviewer fatigue.
            </p>

            <div className="space-y-2.5">
              {/* David Kim */}
              <div className="rounded bg-[#131b2e] p-2.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt="David Kim"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-xs text-[#dae2fd]">David Kim</div>
                    <div className="text-[10px] text-[#918fa1]">Principal Engineer (Lead Evaluator)</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#918fa1]">
                    2 interviews this wk <strong className="text-[#4edea3] ml-1">Load 40%</strong>
                  </div>
                  <div className="w-24 h-1.5 bg-[#1e293b] rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-[#4edea3] w-[40%]" />
                  </div>
                </div>
              </div>

              {/* Rachel Wei */}
              <div className="rounded bg-[#131b2e] p-2.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Rachel Wei"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-xs text-[#dae2fd]">Rachel Wei</div>
                    <div className="text-[10px] text-[#918fa1]">VP Engineering (Executive Bar Raiser)</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#918fa1]">
                    4 interviews this wk <strong className="text-[#ffb95f] ml-1">Load 80%</strong>
                  </div>
                  <div className="w-24 h-1.5 bg-[#1e293b] rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-[#f59e0b] w-[80%]" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowObserverModal(true)}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded border border-dashed border-white/[0.15] text-[11px] text-[#c7c4d8] hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            >
              <UserPlus className="h-3 w-3" />
              <span>+ Add Shadow / Calibration Observer</span>
            </button>
          </div>

          {/* Card 3: Guardrails & Constraints */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                3. GUARDRAILS &amp; CONSTRAINTS
              </span>
              <Lock className="h-3.5 w-3.5 text-[#918fa1]" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded bg-[#131b2e] p-2.5 border border-white/[0.04]">
                <div className="text-[10px] text-[#918fa1]">Prep Buffer</div>
                <div className="font-mono font-semibold text-[#dae2fd]">{prepBufferMinutes} min before</div>
                <div className="text-[10px] text-[#918fa1]">Resume &amp; rubric sync</div>
              </div>

              <div className="rounded bg-[#131b2e] p-2.5 border border-white/[0.04]">
                <div className="text-[10px] text-[#918fa1]">Cooldown Buffer</div>
                <div className="font-mono font-semibold text-[#dae2fd]">{cooldownBufferMinutes} min after</div>
                <div className="text-[10px] text-[#918fa1]">Scorecard submission</div>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[#dae2fd]">Working hours strictly enforced (9am - 5pm panel local)</span>
                <input
                  type="checkbox"
                  checked={workingHoursStrict}
                  onChange={(e) => setWorkingHoursStrict(e.target.checked)}
                  className="h-4 w-4 rounded bg-[#131b2e] border-white/20 text-[#4f46e5] focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[#dae2fd]">Atomic 24h transactional calendar hold</span>
                <input
                  type="checkbox"
                  checked={atomicLockActive}
                  onChange={(e) => setAtomicLockActive(e.target.checked)}
                  className="h-4 w-4 rounded bg-[#131b2e] border-white/20 text-[#4f46e5] focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Recommended Windows, Heatmap, Integrations, Actions */}
        <div className="lg:col-span-7 space-y-4">
          {/* AI Conflict-Free Recommended Windows */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-[#c3c0ff]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#dae2fd]">
                  AI Conflict-Free Recommended Windows
                </span>
              </div>
              <span className="rounded bg-[#00a572]/20 px-2 py-0.5 text-[10px] font-mono text-[#4edea3] border border-[#4edea3]/30">
                Zero Hard Conflicts Found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {RECOMMENDED_WINDOWS.slice(0, 2).map((win) => {
                const isSelected = selectedWindowId === win.id;
                return (
                  <div
                    key={win.id}
                    onClick={() => setSelectedWindowId(win.id)}
                    className={`rounded-lg p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#171f33] border-[#4f46e5] ring-1 ring-[#4f46e5]/40 shadow-sm'
                        : 'bg-[#131b2e] border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-[#00a572]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#4edea3] border border-[#4edea3]/30">
                          {win.matchPercentage}% MATCH {win.isBest ? '(BEST)' : ''}
                        </span>
                        <span className="text-[11px] font-mono text-[#918fa1]">{win.dayLabel}</span>
                      </div>

                      <div className="mt-2 font-mono text-sm font-bold text-[#dae2fd]">
                        {win.timeEst}
                      </div>
                      <div className="text-[11px] font-mono text-[#c3c0ff]">
                        {win.timeCandidate}
                      </div>

                      <p className="mt-2 text-[11px] text-[#918fa1] leading-relaxed">
                        {win.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                      <span className={`text-[10px] font-mono flex items-center gap-1 ${
                        win.softShiftRequired ? 'text-[#ffb95f]' : 'text-[#4edea3]'
                      }`}>
                        {win.softShiftRequired ? (
                          <Info className="h-3 w-3" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        <span>{win.statusBadge}</span>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWindowId(win.id);
                        }}
                        className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#4f46e5] text-white shadow-xs'
                            : 'bg-[#222a3d] text-[#dae2fd] hover:bg-[#31394d]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select Slot'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panel Availability Heatmap */}
          <div className="rounded-lg border border-white/[0.08] bg-[#0f172a] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5">
              <div>
                <h3 className="text-xs font-bold text-[#dae2fd]">
                  Panel Availability Heatmap
                </h3>
                <div className="text-[10px] font-mono text-[#918fa1]">
                  Tomorrow: Wednesday, Oct 24 • Timezone synced in real-time
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-[#4edea3]">
                  <span className="h-2 w-2 rounded-sm bg-[#00a572]" /> Free
                </span>
                <span className="flex items-center gap-1 text-[#918fa1]">
                  <span className="h-2 w-2 rounded-sm bg-[#222a3d]" /> Busy
                </span>
                <span className="flex items-center gap-1 text-[#c3c0ff]">
                  <span className="h-2 w-2 rounded-sm bg-[#4f46e5]" /> Recommended Slot
                </span>
              </div>
            </div>

            {/* Heatmap Table Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="text-[10px] font-mono text-[#918fa1] border-b border-white/[0.06]">
                    <th className="py-2 text-left w-28">Participant</th>
                    <th className="py-2">10 AM</th>
                    <th className="py-2">11 AM</th>
                    <th className="py-2">12 PM</th>
                    <th className="py-2">1 PM</th>
                    <th className="py-2">2 PM</th>
                    <th className="py-2 text-[#c3c0ff] font-bold">3 PM ★</th>
                    <th className="py-2">4 PM</th>
                    <th className="py-2">5 PM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {MOCK_INTERVIEWERS.map((interviewer) => (
                    <tr key={interviewer.id} className="hover:bg-[#131b2e]/50">
                      <td className="py-2.5 text-left font-medium text-[#dae2fd] whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            interviewer.id === 'INT-3' ? 'bg-[#ffb95f]' : 'bg-[#4edea3]'
                          }`} />
                          <span className="text-xs">{interviewer.name}</span>
                          <span className="text-[10px] text-[#918fa1]">({interviewer.timezone})</span>
                        </span>
                      </td>

                      {interviewer.schedule.map((slot, idx) => {
                        let bgStyle = 'bg-[#131b2e] text-[#918fa1]';
                        if (slot.status === 'open') {
                          bgStyle = 'bg-[#00a572]/20 text-[#4edea3] border border-[#4edea3]/20';
                        } else if (slot.status === 'target' || slot.status === 'preferred') {
                          bgStyle = 'bg-[#4f46e5] text-white font-bold ring-1 ring-white/20 shadow-xs';
                        } else if (slot.status === 'lunch') {
                          bgStyle = 'bg-[#222a3d] text-[#918fa1]';
                        }

                        return (
                          <td key={idx} className="p-1">
                            <div className={`rounded py-1.5 text-[10px] font-mono transition-transform hover:scale-105 ${bgStyle}`}>
                              {slot.label || slot.status}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Selected highlight summary */}
            <div className="rounded bg-[#4f46e5]/10 border border-[#4f46e5]/30 p-2.5 text-center text-xs font-mono text-[#c3c0ff]">
              Selected: <strong className="text-white">Oct 24, 2:30 PM – 3:45 PM EST (75 min)</strong> • Zero Overlap Detected
            </div>
          </div>

          {/* Integrations Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded bg-[#0f172a] border border-white/[0.08] p-3 flex items-start gap-2.5">
              <Video className="h-4 w-4 text-[#4edea3] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#dae2fd]">Video Link</span>
                  <span className="text-[9px] font-mono text-[#4edea3]">Active</span>
                </div>
                <div className="text-[10px] text-[#918fa1] mt-0.5">
                  Auto-generate Zoom VIP Room with passcode &amp; waiting room
                </div>
              </div>
            </div>

            <div className="rounded bg-[#0f172a] border border-white/[0.08] p-3 flex items-start gap-2.5">
              <MessageSquare className="h-4 w-4 text-[#4edea3] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#dae2fd]">Slack Alerts</span>
                  <span className="text-[9px] font-mono text-[#4edea3]">Connected</span>
                </div>
                <div className="text-[10px] text-[#918fa1] mt-0.5">
                  Ping #eng-hiring-sync &amp; DM interviewers 10m prior
                </div>
              </div>
            </div>

            <div className="rounded bg-[#0f172a] border border-white/[0.08] p-3 flex items-start gap-2.5">
              <FileCheck className="h-4 w-4 text-[#4edea3] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#dae2fd]">Scorecard Sync</span>
                  <span className="text-[9px] font-mono text-[#4edea3]">Bound</span>
                </div>
                <div className="text-[10px] text-[#918fa1] mt-0.5">
                  Attached 'Sys-Arch v4 Rubric' into calendar metadata
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="rounded-lg border border-white/[0.08] bg-[#090d16] p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              <span className="text-[#918fa1]">Panel Confirmed:</span>
              <strong className="text-[#dae2fd]">2 Evaluators (David K., Rachel W.) • 75m</strong>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onHoldSlot(selectedWindow)}
                className="flex items-center gap-1.5 rounded border border-white/[0.12] bg-[#131b2e] px-3 py-2 text-xs font-medium text-[#dae2fd] hover:bg-[#171f33] transition-colors cursor-pointer"
              >
                <Clock className="h-3.5 w-3.5 text-[#ffb95f]" />
                <span>Hold Slot (24h Lock)</span>
              </button>

              <button
                onClick={onCopyMagicLink}
                className="flex items-center gap-1.5 rounded border border-white/[0.12] bg-[#131b2e] px-3 py-2 text-xs font-medium text-[#dae2fd] hover:bg-[#171f33] transition-colors cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5 text-[#c3c0ff]" />
                <span>Copy Magic Link</span>
              </button>

              <button
                onClick={() => onSendDirectInvites(selectedWindow)}
                className="flex items-center gap-2 rounded bg-[#4f46e5] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#4338ca] transition-all cursor-pointer border-t border-white/20 active:scale-[0.98]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Direct Calendar Invites Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shadow Observer Modal */}
      {showObserverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-lg border border-white/[0.12] bg-[#0f172a] p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-2">Add Shadow / Calibration Observer</h3>
            <p className="text-xs text-[#918fa1] mb-4">
              Invite an engineer for calibration training. They will receive read-only scorecard access.
            </p>
            <div className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Search engineer name or email..."
                className="w-full rounded border border-white/[0.1] bg-[#131b2e] px-3 py-2 text-xs text-[#dae2fd] focus:border-[#4f46e5] focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowObserverModal(false)}
                className="rounded px-3 py-1.5 text-xs text-[#918fa1] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowObserverModal(false)}
                className="rounded bg-[#4f46e5] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4338ca]"
              >
                Add Observer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
