import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  User, 
  Layers, 
  AlertTriangle, 
  Download, 
  Sparkles, 
  ArrowRight,
  X,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Candidate } from '../types/index.ts';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onNavigate: (view: 'pipeline' | 'scheduler' | 'scorecards' | 'candidate-portal' | 'audit') => void;
  onTriggerNudge: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  candidates,
  onSelectCandidate,
  onNavigate,
  onTriggerNudge,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.role.toLowerCase().includes(query.toLowerCase()) ||
    c.previousCompany.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-xl border border-white/[0.15] bg-[#0f172a] shadow-2xl overflow-hidden flex flex-col max-h-[520px] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#131b2e]">
          <Search className="h-4 w-4 text-[#918fa1] mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, candidate name, or jump to view..."
            className="w-full bg-transparent text-sm text-white placeholder-[#64748b] focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="text-[#918fa1] hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
              Quick Actions &amp; Workflows
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onNavigate('scheduler');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded text-xs text-[#dae2fd] hover:bg-[#1e293b] hover:text-white transition-colors text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-[#4edea3]" />
                  <span>Open Smart Scheduler Engine (&lt;60s Speedrun)</span>
                </div>
                <kbd className="text-[10px] font-mono text-[#918fa1] bg-[#090d16] px-1.5 py-0.5 rounded">S</kbd>
              </button>

              <button
                onClick={() => {
                  onTriggerNudge();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded text-xs text-[#dae2fd] hover:bg-[#1e293b] hover:text-white transition-colors text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-[#ffb95f]" />
                  <span>Nudge Tech Screen Evaluators (3 SLA Alerts Overdue)</span>
                </div>
                <kbd className="text-[10px] font-mono text-[#918fa1] bg-[#090d16] px-1.5 py-0.5 rounded">N</kbd>
              </button>

              <button
                onClick={() => {
                  onNavigate('candidate-portal');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded text-xs text-[#dae2fd] hover:bg-[#1e293b] hover:text-white transition-colors text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-[#c3c0ff]" />
                  <span>View Candidate 1-Click Self-Booking Portal</span>
                </div>
                <kbd className="text-[10px] font-mono text-[#918fa1] bg-[#090d16] px-1.5 py-0.5 rounded">C</kbd>
              </button>
            </div>
          </div>

          {/* Candidate matching results */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
              Candidates ({filteredCandidates.length})
            </div>
            <div className="space-y-1">
              {filteredCandidates.map((cand) => (
                <button
                  key={cand.id}
                  onClick={() => {
                    onSelectCandidate(cand);
                    onNavigate('pipeline');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded text-xs text-[#dae2fd] hover:bg-[#1e293b] hover:text-white transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={cand.avatarUrl}
                      alt={cand.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-semibold text-white">{cand.name}</span>
                      <span className="text-[#918fa1] ml-2 text-[11px]">{cand.role} • {cand.previousCompany}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#4edea3] bg-[#00a572]/20 px-1.5 py-0.5 rounded">
                    {cand.matchScore}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2 border-t border-white/[0.08] bg-[#090d16] flex items-center justify-between text-[11px] font-mono text-[#918fa1]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-[#c3c0ff]">SyncHire Precision Studio</span>
        </div>
      </div>
    </div>
  );
};
