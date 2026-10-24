import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { PipelineView } from './components/PipelineView.tsx';
import { SmartSchedulerView } from './components/SmartSchedulerView.tsx';
import { CandidatePortalView } from './components/CandidatePortalView.tsx';
import { ScorecardsView } from './components/ScorecardsView.tsx';
import { AuditSecurityView } from './components/AuditSecurityView.tsx';
import { CommandPalette } from './components/CommandPalette.tsx';
import { NewInterviewModal } from './components/NewInterviewModal.tsx';
import { FastNoteModal, RescheduleModal, BatchActionModal } from './components/ActionModals.tsx';
import { INITIAL_CANDIDATES } from './data/mockData.ts';
import { Candidate, RecommendedWindow } from './types/index.ts';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'pipeline' | 'scheduler' | 'scorecards' | 'candidate-portal' | 'audit'>('pipeline');
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(INITIAL_CANDIDATES[0]); // Alex Morgan
  
  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewInterviewOpen, setIsNewInterviewOpen] = useState(false);
  const [isFastNoteOpen, setIsFastNoteOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isBatchActionOpen, setIsBatchActionOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleScheduleCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView('scheduler');
    showToast('Smart Scheduler Preloaded', `Loaded ${candidate.name} into <60s Speedrun Engine`, 'info');
  };

  const handleSendBookingLink = (candidate: Candidate) => {
    showToast('60-Sec Self-Booking Link Sent', `Magic link dispatched to ${candidate.email} & copied to clipboard`, 'success');
  };

  const handleNudgePanel = () => {
    showToast('Panel Nudge Dispatched', 'Urgent ping sent to #eng-hiring-sync & evaluators for 3 overdue SLA slots', 'warning');
  };

  const handleHoldSlot = (window: RecommendedWindow) => {
    showToast('24h Atomic Calendar Hold Activated', `Locked ${window.timeEst} across Google Calendar & Outlook 365`, 'success');
  };

  const handleSendDirectInvites = (window: RecommendedWindow) => {
    showToast('Direct Calendar Invites Dispatched', `Invites sent with Zoom VIP link to candidate and 2 evaluators`, 'success');
  };

  const handleCopyMagicLink = () => {
    showToast('Magic Link Copied', '1-Click self-booking link copied to clipboard', 'info');
  };

  const handleExportCsv = () => {
    showToast('Pipeline CSV Exported', 'Downloaded requisition metrics & candidate roster (8 active candidates)', 'info');
  };

  const handleSourceTalent = () => {
    setIsNewInterviewOpen(true);
  };

  const handleExecuteBatch = (actionType: string) => {
    if (actionType === 'nudge_panel') {
      showToast('Bulk Nudge Sent', 'Sent reminders to 4 evaluators with pending scorecard debriefs', 'warning');
    } else if (actionType === 'send_self_booking') {
      showToast('Broadcast Complete', 'Sent 60-second magic booking invites to all candidates in screen stages', 'success');
    } else {
      showToast('Stage Progression', 'Advanced 2 candidates with >90% match to Technical Screen', 'success');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0b1326] text-[#dae2fd]">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenNewInterview={() => setIsNewInterviewOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        scorecardPendingCount={1}
      />

      {/* Main Container: Sidebar + View Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar Rail */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          candidateCount={candidates.length}
          scorecardPendingCount={1}
        />

        {/* View Switcher */}
        {currentView === 'pipeline' && (
          <PipelineView
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            onSelectCandidate={setSelectedCandidate}
            onScheduleCandidate={handleScheduleCandidate}
            onSendBookingLink={handleSendBookingLink}
            onOpenBatchAction={() => setIsBatchActionOpen(true)}
            onOpenFastNote={(c) => {
              setSelectedCandidate(c);
              setIsFastNoteOpen(true);
            }}
            onOpenReschedule={(c) => {
              setSelectedCandidate(c);
              setIsRescheduleOpen(true);
            }}
            onNudgePanel={handleNudgePanel}
            onSourceTalent={handleSourceTalent}
            onExportCsv={handleExportCsv}
          />
        )}

        {currentView === 'scheduler' && (
          <SmartSchedulerView
            candidate={selectedCandidate}
            onSendDirectInvites={handleSendDirectInvites}
            onHoldSlot={handleHoldSlot}
            onCopyMagicLink={handleCopyMagicLink}
          />
        )}

        {currentView === 'candidate-portal' && (
          <CandidatePortalView
            onBookingConfirmed={({ slot, date }) => {
              showToast('Booking Confirmed', `Scheduled technical session for ${date} at ${slot}`, 'success');
            }}
          />
        )}

        {currentView === 'scorecards' && (
          <ScorecardsView
            onScorecardSubmitted={() => {
              showToast('Scorecard Submitted', 'Calibrated scorecard and score posted to requisition', 'success');
            }}
          />
        )}

        {currentView === 'audit' && (
          <AuditSecurityView />
        )}
      </div>

      {/* Interactive Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        candidates={candidates}
        onSelectCandidate={(cand) => {
          setSelectedCandidate(cand);
          setCurrentView('pipeline');
        }}
        onNavigate={setCurrentView}
        onTriggerNudge={handleNudgePanel}
      />

      <NewInterviewModal
        isOpen={isNewInterviewOpen}
        onClose={() => setIsNewInterviewOpen(false)}
        candidates={candidates}
        onConfirmSchedule={(candName, round, time) => {
          showToast('Interview Scheduled', `${round} for ${candName} booked at ${time}`, 'success');
        }}
      />

      <FastNoteModal
        isOpen={isFastNoteOpen}
        onClose={() => setIsFastNoteOpen(false)}
        candidate={selectedCandidate}
        onSaveNote={(note) => {
          showToast('Fast Note Appended', `Note saved for ${selectedCandidate.name}`, 'info');
        }}
      />

      <RescheduleModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        candidate={selectedCandidate}
        onConfirmReschedule={(newSlot) => {
          showToast('Rescheduled', `Moved session for ${selectedCandidate.name} to ${newSlot}`, 'warning');
        }}
      />

      <BatchActionModal
        isOpen={isBatchActionOpen}
        onClose={() => setIsBatchActionOpen(false)}
        candidateCount={candidates.length}
        onExecuteBatch={handleExecuteBatch}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-start gap-3 rounded-lg border border-white/[0.12] bg-[#0f172a] p-4 shadow-2xl max-w-sm animate-in slide-in-from-bottom-5">
          {toastMessage.type === 'success' && <CheckCircle2 className="h-5 w-5 text-[#4edea3] shrink-0 mt-0.5" />}
          {toastMessage.type === 'warning' && <AlertCircle className="h-5 w-5 text-[#ffb95f] shrink-0 mt-0.5" />}
          {toastMessage.type === 'info' && <Info className="h-5 w-5 text-[#c3c0ff] shrink-0 mt-0.5" />}
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-white">{toastMessage.title}</div>
            <div className="text-[#918fa1] leading-relaxed">{toastMessage.desc}</div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#918fa1] hover:text-white ml-2"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
