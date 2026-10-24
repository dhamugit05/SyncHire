import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Zap, 
  User, 
  Clock, 
  CheckCircle2, 
  Video, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Candidate } from '../types/index.ts';

interface NewInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  onConfirmSchedule: (candidateName: string, roundName: string, time: string) => void;
}

export const NewInterviewModal: React.FC<NewInterviewModalProps> = ({
  isOpen,
  onClose,
  candidates,
  onConfirmSchedule,
}) => {
  const [selectedCandId, setSelectedCandId] = useState(candidates[1]?.id || candidates[0]?.id);
  const [selectedRound, setSelectedRound] = useState('System Design Panel (75m)');
  const [selectedInterviewer, setSelectedInterviewer] = useState('David Kim & Rachel Wei');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Tomorrow, 2:30 PM – 3:45 PM EST');

  if (!isOpen) return null;

  const currentCandidate = candidates.find((c) => c.id === selectedCandId) || candidates[0];

  const handleCreate = () => {
    onConfirmSchedule(currentCandidate.name, selectedRound, selectedTimeSlot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-white/[0.12] bg-[#0f172a] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#131b2e]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#4f46e5] text-white">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">New Interview &lt;60s Speedrun</h2>
              <p className="text-[11px] text-[#918fa1]">Automated panel matching &amp; calendar slot holding</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#918fa1] hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          {/* Candidate selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#dae2fd]">Candidate</label>
            <select
              value={selectedCandId}
              onChange={(e) => setSelectedCandId(e.target.value)}
              className="w-full rounded border border-white/[0.1] bg-[#090d16] px-3 py-2 text-xs text-[#dae2fd] focus:border-[#4f46e5] focus:outline-none"
            >
              {candidates.map((cand) => (
                <option key={cand.id} value={cand.id}>
                  {cand.name} ({cand.role} - {cand.previousCompany})
                </option>
              ))}
            </select>
          </div>

          {/* Module selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#dae2fd]">Interview Module</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'System Design Panel (75m)',
                'Technical Deep Dive (60m)',
                'Recruiter Initial (30m)',
                'Executive Debrief (45m)'
              ].map((round) => (
                <button
                  type="button"
                  key={round}
                  onClick={() => setSelectedRound(round)}
                  className={`p-2.5 rounded text-left border text-xs font-medium transition-colors ${
                    selectedRound === round
                      ? 'bg-[#171f33] border-[#4f46e5] text-white ring-1 ring-[#4f46e5]/40'
                      : 'bg-[#131b2e] border-white/[0.06] text-[#918fa1] hover:text-white'
                  }`}
                >
                  {round}
                </button>
              ))}
            </div>
          </div>

          {/* Evaluator Panel */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#dae2fd]">Recommended Interviewer Pairing</label>
            <div className="rounded bg-[#131b2e] p-3 border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#4edea3]" />
                <span className="text-xs text-[#dae2fd] font-medium">{selectedInterviewer}</span>
              </div>
              <span className="text-[10px] font-mono text-[#4edea3] bg-[#00a572]/20 px-2 py-0.5 rounded border border-[#4edea3]/30">
                Balanced Load
              </span>
            </div>
          </div>

          {/* Suggested Window */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#dae2fd]">Optimal Time Slot</label>
            <div className="rounded bg-[#131b2e] p-3 border border-white/[0.06] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-white">{selectedTimeSlot}</span>
                <span className="text-[10px] font-mono text-[#c3c0ff]">98% Match</span>
              </div>
              <div className="text-[11px] text-[#918fa1]">
                Zero overlap detected • Preserves 45m engineer focus block
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-white/[0.08] bg-[#090d16] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded px-3 py-1.5 text-xs text-[#918fa1] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 rounded bg-[#4f46e5] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#4338ca] transition-all cursor-pointer border-t border-white/20 active:scale-[0.98]"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Schedule &amp; Send Invites</span>
          </button>
        </div>
      </div>
    </div>
  );
};
