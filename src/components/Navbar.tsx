import React from 'react';
import { 
  Building2, 
  ChevronDown, 
  Moon, 
  Bell, 
  Plus, 
  Zap, 
  Calendar,
  Layers,
  FileText,
  UserCheck,
  ShieldCheck,
  Search
} from 'lucide-react';

interface NavbarProps {
  currentView: 'pipeline' | 'scheduler' | 'scorecards' | 'candidate-portal' | 'audit';
  onNavigate: (view: 'pipeline' | 'scheduler' | 'scorecards' | 'candidate-portal' | 'audit') => void;
  onOpenNewInterview: () => void;
  onOpenCommandPalette: () => void;
  scorecardPendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenNewInterview,
  onOpenCommandPalette,
  scorecardPendingCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0b1326]/95 backdrop-blur-md">
      {/* Main Top Nav */}
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Left: Brand & Workspace */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => onNavigate('pipeline')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#4f46e5] to-[#3730a3] text-white shadow-md shadow-indigo-950/40 border border-white/20">
              <Zap className="h-4 w-4 fill-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-base tracking-tight text-[#dae2fd] group-hover:text-white transition-colors">
                SyncHire
              </span>
              <span className="rounded bg-[#222a3d] px-1.5 py-0.5 text-[10px] font-mono text-[#c3c0ff] border border-white/[0.08]">
                v2.4
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#c7c4d8] hover:bg-[#171f33] transition-colors cursor-pointer">
            <Building2 className="h-3.5 w-3.5 text-[#4edea3]" />
            <span className="font-medium text-[#dae2fd]">Acme Corp • Global Engineering</span>
            <ChevronDown className="h-3 w-3 text-[#918fa1]" />
          </div>
        </div>

        {/* Center: Top Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate('pipeline')}
            className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-all ${
              currentView === 'pipeline'
                ? 'bg-[#171f33] text-white border border-[#4f46e5]/40 shadow-sm'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-[#c3c0ff]" />
            <span>Pipeline</span>
          </button>

          <button
            onClick={() => onNavigate('scheduler')}
            className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-all ${
              currentView === 'scheduler'
                ? 'bg-[#171f33] text-white border border-[#4f46e5]/40 shadow-sm'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <Calendar className="h-3.5 w-3.5 text-[#4edea3]" />
            <span>Smart Scheduler</span>
          </button>

          <button
            onClick={() => onNavigate('scorecards')}
            className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-all ${
              currentView === 'scorecards'
                ? 'bg-[#171f33] text-white border border-[#4f46e5]/40 shadow-sm'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-[#ffb95f]" />
            <span>Interviews & Scorecards</span>
            {scorecardPendingCount > 0 && (
              <span className="ml-0.5 rounded-full bg-[#885500]/60 px-1.5 py-0.2 text-[10px] font-mono text-[#ffd4a4] border border-[#ffb95f]/30">
                {scorecardPendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('candidate-portal')}
            className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-all ${
              currentView === 'candidate-portal'
                ? 'bg-[#171f33] text-white border border-[#4f46e5]/40 shadow-sm'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5 text-[#c3c0ff]" />
            <span>Candidate Portal</span>
          </button>

          <button
            onClick={() => onNavigate('audit')}
            className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-all ${
              currentView === 'audit'
                ? 'bg-[#171f33] text-white border border-[#4f46e5]/40 shadow-sm'
                : 'text-[#c7c4d8] hover:bg-[#131b2e] hover:text-[#dae2fd]'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#4edea3]" />
            <span>Audit & Security</span>
          </button>
        </nav>

        {/* Right: Quick actions & user menu */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd] cursor-pointer hover:bg-[#171f33]">
            <span>Recruiter (Elena Vance)</span>
            <ChevronDown className="h-3 w-3 text-[#918fa1]" />
          </div>

          <button
            onClick={onOpenNewInterview}
            className="flex items-center gap-1.5 rounded bg-[#4f46e5] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#4338ca] transition-all active:scale-[0.98] border-t border-white/20"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Interview</span>
            <span className="text-[10px] text-indigo-200 font-mono hidden sm:inline">(60s)</span>
          </button>

          <div className="flex items-center gap-1 border-l border-white/[0.08] pl-2">
            <button 
              onClick={onOpenCommandPalette}
              title="Search and Command Bar (⌘K)"
              className="flex h-8 w-8 items-center justify-center rounded text-[#918fa1] hover:bg-[#131b2e] hover:text-[#dae2fd] transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>

            <button 
              title="Theme mode active: High Density Precision Dark"
              className="flex h-8 w-8 items-center justify-center rounded text-[#918fa1] hover:bg-[#131b2e] hover:text-[#dae2fd] transition-colors"
            >
              <Moon className="h-4 w-4" />
            </button>

            <div className="relative">
              <button 
                title="Notifications"
                className="flex h-8 w-8 items-center justify-center rounded text-[#918fa1] hover:bg-[#131b2e] hover:text-[#dae2fd] transition-colors"
              >
                <Bell className="h-4 w-4" />
              </button>
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-rose-500 ring-2 ring-[#0b1326]" />
            </div>

            <div className="ml-1 relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Elena Vance"
                className="h-7 w-7 rounded-full object-cover ring-1 ring-white/20"
              />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#10b981] ring-1 ring-[#0b1326]" />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-header Live Status Bar / KPI Ticker */}
      <div className="flex h-8 items-center justify-between border-t border-white/[0.06] bg-[#060e20]/90 px-4 text-[11px] font-mono text-[#c7c4d8]">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex items-center gap-1.5 text-[#dae2fd]">
            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>14 interviews scheduled today</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#ffb95f]">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            <span>2 pending scorecards</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#ffb4ab]">
            <span className="h-2 w-2 rounded-full bg-[#f43f5e]" />
            <span>1 SLA breach alert</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[#918fa1]">
          <span>
            Panel Availability: <strong className="text-[#dae2fd] font-semibold">94.2%</strong>
          </span>
          <span>•</span>
          <span>
            Avg Book Latency: <strong className="text-[#dae2fd] font-semibold">3.2m</strong>
          </span>
        </div>
      </div>
    </header>
  );
};
