import React from 'react';
import { 
  Layers, 
  Calendar, 
  FileText, 
  UserCheck, 
  ShieldCheck, 
  Command,
  Sparkles,
  Bot
} from 'lucide-react';

interface SidebarProps {
  currentView: 'pipeline' | 'scheduler' | 'scorecards' | 'candidate-portal' | 'audit';
  onNavigate: (view: 'pipeline' | 'scheduler' | 'scorecards' | 'candidate-portal' | 'audit') => void;
  onOpenCommandPalette: () => void;
  candidateCount?: number;
  scorecardPendingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenCommandPalette,
  candidateCount = 48,
  scorecardPendingCount = 2,
}) => {
  return (
    <aside className="w-56 shrink-0 border-r border-white/[0.08] bg-[#090d16] p-3 flex flex-col justify-between select-none">
      <div className="space-y-4">
        {/* Active Workspaces */}
        <div>
          <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
            Active Workspaces
          </div>
          <div className="flex items-center justify-between rounded bg-[#131b2e] px-2.5 py-2 border border-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-[#00a572]/20 text-[#4edea3]">
                <Bot className="h-3 w-3" />
              </div>
              <span className="text-xs font-medium text-[#dae2fd] group-hover:text-white transition-colors">
                Staff AI Eng Queue
              </span>
            </div>
            <span className="rounded bg-[#00a572]/20 px-1.5 py-0.5 text-[9px] font-mono text-[#4edea3] border border-[#4edea3]/30">
              Tier 1
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <button
            onClick={() => onNavigate('pipeline')}
            className={`w-full flex items-center justify-between rounded px-3 py-2 text-xs font-medium transition-all ${
              currentView === 'pipeline'
                ? 'bg-[#4f46e5] text-white shadow-sm font-semibold'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="h-4 w-4" />
              <span>Pipeline</span>
            </div>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              currentView === 'pipeline' ? 'bg-white/20 text-white' : 'bg-[#171f33] text-[#918fa1]'
            }`}>
              {candidateCount}
            </span>
          </button>

          <button
            onClick={() => onNavigate('scheduler')}
            className={`w-full flex items-center justify-between rounded px-3 py-2 text-xs font-medium transition-all ${
              currentView === 'scheduler'
                ? 'bg-[#4f46e5] text-white shadow-sm font-semibold'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4" />
              <span>Smart Scheduler</span>
            </div>
            <span className="rounded bg-[#00a572]/20 px-1.5 py-0.5 text-[9px] font-mono text-[#4edea3] border border-[#4edea3]/30">
              Live
            </span>
          </button>

          <button
            onClick={() => onNavigate('scorecards')}
            className={`w-full flex items-center justify-between rounded px-3 py-2 text-xs font-medium transition-all ${
              currentView === 'scorecards'
                ? 'bg-[#4f46e5] text-white shadow-sm font-semibold'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-4 w-4" />
              <span>Interviews & Scorecards</span>
            </div>
            {scorecardPendingCount > 0 && (
              <span className="rounded bg-[#885500]/40 px-1.5 py-0.5 text-[10px] font-mono text-[#ffd4a4] border border-[#ffb95f]/30">
                {scorecardPendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('candidate-portal')}
            className={`w-full flex items-center justify-between rounded px-3 py-2 text-xs font-medium transition-all ${
              currentView === 'candidate-portal'
                ? 'bg-[#4f46e5] text-white shadow-sm font-semibold'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="h-4 w-4" />
              <span>Candidate Portal</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('audit')}
            className={`w-full flex items-center justify-between rounded px-3 py-2 text-xs font-medium transition-all ${
              currentView === 'audit'
                ? 'bg-[#4f46e5] text-white shadow-sm font-semibold'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Audit & Security</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Bottom Command Bar Button */}
      <div className="pt-4 border-t border-white/[0.08]">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between rounded border border-white/[0.1] bg-[#131b2e] px-2.5 py-2 text-xs text-[#dae2fd] hover:bg-[#171f33] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Command className="h-3.5 w-3.5 text-[#c3c0ff] group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium">Command Bar</span>
          </div>
          <kbd className="rounded bg-[#222a3d] px-1.5 py-0.5 text-[10px] font-mono text-[#918fa1] border border-white/[0.08]">
            ⌘K
          </kbd>
        </button>
      </div>
    </aside>
  );
};
