import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  RotateCcw, 
  Zap, 
  Send, 
  Clock, 
  CheckCircle2, 
  Users,
  Sparkles
} from 'lucide-react';
import { Candidate } from '../types/index.ts';

interface FastNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
  onSaveNote: (note: string) => void;
}

export const FastNoteModal: React.FC<FastNoteModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onSaveNote,
}) => {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    onSaveNote(note);
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border border-white/[0.12] bg-[#0f172a] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#131b2e]">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#c3c0ff]" />
            <h2 className="text-sm font-bold text-white">Fast Note: {candidate.name}</h2>
          </div>
          <button onClick={onClose} className="text-[#918fa1] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-[#918fa1]">
            Append internal recruiter sync note. Synced directly to ATS record with cryptographic timestamp.
          </p>
          <textarea
            autoFocus
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Candidate confirmed they are open to SF hybrid relocation. System design interview passed with distinction."
            className="w-full rounded border border-white/[0.1] bg-[#090d16] p-3 text-xs text-[#dae2fd] placeholder-[#64748b] focus:border-[#4f46e5] focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-3 py-1.5 text-xs text-[#918fa1] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-[#4f46e5] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#4338ca]"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
  onConfirmReschedule: (newTime: string) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onConfirmReschedule,
}) => {
  const [selectedSlot, setSelectedSlot] = useState('Friday, Oct 26 • 2:00 PM EST');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border border-white/[0.12] bg-[#0f172a] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#131b2e]">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-[#ffb95f]" />
            <h2 className="text-sm font-bold text-white">Reschedule Session: {candidate.name}</h2>
          </div>
          <button onClick={onClose} className="text-[#918fa1] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-[#918fa1]">
            Select an alternative collision-free window. Both candidate and evaluators will be notified instantly via Slack and Google Calendar sync.
          </p>

          <div className="space-y-2">
            {[
              'Friday, Oct 26 • 2:00 PM EST (100% Free)',
              'Monday, Oct 29 • 11:30 AM EST (Optimal)',
              'Tuesday, Oct 30 • 3:30 PM EST (Preserves Focus Blocks)'
            ].map((slot) => (
              <div
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded border cursor-pointer font-mono text-xs transition-colors ${
                  selectedSlot === slot
                    ? 'bg-[#171f33] border-[#4f46e5] text-white ring-1 ring-[#4f46e5]/40'
                    : 'bg-[#131b2e] border-white/[0.06] text-[#918fa1] hover:text-white'
                }`}
              >
                {slot}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.08]">
            <button
              onClick={onClose}
              className="rounded px-3 py-1.5 text-xs text-[#918fa1] hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirmReschedule(selectedSlot);
                onClose();
              }}
              className="rounded bg-[#4f46e5] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#4338ca]"
            >
              Confirm Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BatchActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateCount: number;
  onExecuteBatch: (actionType: string) => void;
}

export const BatchActionModal: React.FC<BatchActionModalProps> = ({
  isOpen,
  onClose,
  candidateCount,
  onExecuteBatch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-white/[0.12] bg-[#0f172a] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#131b2e]">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#ffb95f]" />
            <h2 className="text-sm font-bold text-white">Batch Automation Actions</h2>
          </div>
          <button onClick={onClose} className="text-[#918fa1] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="rounded bg-[#131b2e] p-3 border border-white/[0.06] flex items-center justify-between">
            <span className="text-[#dae2fd]">Target Candidates in Pipeline:</span>
            <span className="font-mono font-bold text-[#4edea3]">{candidateCount} Candidates</span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                onExecuteBatch('nudge_panel');
                onClose();
              }}
              className="w-full text-left p-3 rounded border border-white/[0.08] bg-[#131b2e] hover:bg-[#171f33] transition-colors"
            >
              <div className="font-semibold text-white">Bulk Nudge Pending Panels</div>
              <div className="text-[11px] text-[#918fa1]">Send Slack reminders to interviewers with scorecards pending &gt; 24h</div>
            </button>

            <button
              onClick={() => {
                onExecuteBatch('send_self_booking');
                onClose();
              }}
              className="w-full text-left p-3 rounded border border-white/[0.08] bg-[#131b2e] hover:bg-[#171f33] transition-colors"
            >
              <div className="font-semibold text-white">Broadcast 60-Sec Self-Booking Links</div>
              <div className="text-[11px] text-[#918fa1]">Send personalized magic scheduling invitations to all screened candidates</div>
            </button>

            <button
              onClick={() => {
                onExecuteBatch('advance_stage');
                onClose();
              }}
              className="w-full text-left p-3 rounded border border-white/[0.08] bg-[#131b2e] hover:bg-[#171f33] transition-colors"
            >
              <div className="font-semibold text-white">Advance Qualified to Technical Screen</div>
              <div className="text-[11px] text-[#918fa1]">Move candidates with match score &gt; 90% into Round 2 automatically</div>
            </button>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-white/[0.08] bg-[#090d16] flex justify-end">
          <button
            onClick={onClose}
            className="rounded px-4 py-1.5 text-xs text-[#918fa1] hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
