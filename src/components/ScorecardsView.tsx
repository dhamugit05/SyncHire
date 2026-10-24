import React, { useState } from 'react';
import { ScorecardItem } from '../types/index.ts';
import { MOCK_SCORECARDS } from '../data/mockData.ts';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Star, 
  Search, 
  Filter, 
  Send,
  AlertCircle
} from 'lucide-react';

interface ScorecardsViewProps {
  onScorecardSubmitted?: () => void;
}

export const ScorecardsView: React.FC<ScorecardsViewProps> = ({
  onScorecardSubmitted,
}) => {
  const [scorecards, setScorecards] = useState<ScorecardItem[]>(MOCK_SCORECARDS);
  const [selectedScorecard, setSelectedScorecard] = useState<ScorecardItem>(scorecards[2]); // Priya Sharma pending
  const [gradingScore, setGradingScore] = useState<number>(4.8);
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitScore = () => {
    const updated = scorecards.map((s) => {
      if (s.id === selectedScorecard.id) {
        return {
          ...s,
          status: 'submitted' as const,
          score: gradingScore,
          rubricNotes: feedbackNotes || 'Calibration debrief completed. Strong alignment with Staff level engineering standards.',
        };
      }
      return s;
    });
    setScorecards(updated);
    setSelectedScorecard({
      ...selectedScorecard,
      status: 'submitted',
      score: gradingScore,
      rubricNotes: feedbackNotes || 'Calibration debrief completed. Strong alignment with Staff level engineering standards.',
    });
    setSubmittedSuccess(true);
    if (onScorecardSubmitted) onScorecardSubmitted();
    setTimeout(() => setSubmittedSuccess(false), 3500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0b1326] overflow-y-auto">
      {/* Header */}
      <div className="border-b border-white/[0.08] bg-[#090d16] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-[#918fa1]">
              <span>EVALUATION SUITE</span>
              <span>/</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Interviews &amp; Scorecards
            </h1>
            <p className="text-xs text-[#918fa1] mt-0.5">
              Structured rubric scoring, calibration debriefs, and automated interviewer grading logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-[#885500]/30 px-2.5 py-1 text-xs font-mono text-[#ffd4a4] border border-[#ffb95f]/30">
              {scorecards.filter((s) => s.status === 'pending').length} Pending Scorecards
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Left Column: List of scorecards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#918fa1]">
            Recent &amp; Pending Submissions
          </div>

          <div className="space-y-2.5">
            {scorecards.map((sc) => {
              const isSelected = selectedScorecard.id === sc.id;
              return (
                <div
                  key={sc.id}
                  onClick={() => setSelectedScorecard(sc)}
                  className={`rounded-lg p-3.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#171f33] border-[#4f46e5] ring-1 ring-[#4f46e5]/40 shadow-sm'
                      : 'bg-[#0f172a] border-white/[0.08] hover:bg-[#131b2e]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#dae2fd]">{sc.candidateName}</div>
                      <div className="text-[11px] text-[#918fa1]">{sc.candidateRole}</div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      sc.status === 'submitted'
                        ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#4edea3]/30'
                        : 'bg-[#885500]/30 text-[#ffb95f] border border-[#ffb95f]/30'
                    }`}>
                      {sc.status === 'submitted' ? `Score: ${sc.score}/5.0` : 'Pending Scorecard'}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-[#c7c4d8] font-medium">
                    {sc.interviewRound}
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#918fa1]">
                    <span>Interviewer: {sc.interviewerName}</span>
                    <span>{sc.scheduledTime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Scorecard Detail & Grading rubric */}
        <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0f172a] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                Rubric Evaluation Detail
              </div>
              <h2 className="text-base font-bold text-white">
                {selectedScorecard.candidateName} • {selectedScorecard.interviewRound}
              </h2>
            </div>

            <span className={`text-xs font-mono px-2.5 py-1 rounded ${
              selectedScorecard.status === 'submitted'
                ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#4edea3]/30'
                : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
            }`}>
              {selectedScorecard.status === 'submitted' ? 'Grading Complete' : 'Action Required'}
            </span>
          </div>

          {submittedSuccess && (
            <div className="rounded bg-[#00a572]/20 border border-[#4edea3]/40 p-3 text-xs text-[#4edea3] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Scorecard saved and synced directly into ATS Requisition!</span>
            </div>
          )}

          {/* Rubric sections */}
          <div className="space-y-3">
            <div className="rounded bg-[#131b2e] p-3 border border-white/[0.04] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#dae2fd]">1. System Architecture &amp; Scale</span>
                <span className="font-mono text-[#4edea3]">Staff+ Mastery</span>
              </div>
              <p className="text-[11px] text-[#918fa1] leading-relaxed">
                Evaluates fault-tolerance, database partition strategy, event queues, and latency boundaries.
              </p>
            </div>

            <div className="rounded bg-[#131b2e] p-3 border border-white/[0.04] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#dae2fd]">2. Operational Rigor &amp; Incident Triage</span>
                <span className="font-mono text-[#4edea3]">Staff+ Mastery</span>
              </div>
              <p className="text-[11px] text-[#918fa1] leading-relaxed">
                Observability instrumentation, zero-downtime deployment pipelines, and blast-radius mitigation.
              </p>
            </div>

            <div className="rounded bg-[#131b2e] p-3 border border-white/[0.04] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#dae2fd]">3. Communication &amp; Executive Presence</span>
                <span className="font-mono text-[#4edea3]">Strong</span>
              </div>
              <p className="text-[11px] text-[#918fa1] leading-relaxed">
                Clear trade-off articulation, respectful technical disagreement, and crisp whiteboard diagrams.
              </p>
            </div>
          </div>

          {/* Scoring Input */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#dae2fd]">Overall Recommendation Rating</span>
              <span className="font-mono font-bold text-base text-[#4edea3]">{gradingScore} / 5.0</span>
            </div>

            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={gradingScore}
              onChange={(e) => setGradingScore(parseFloat(e.target.value))}
              className="w-full accent-[#4f46e5] cursor-pointer"
            />
          </div>

          {/* Written notes */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#dae2fd]">Evaluator Debrief Notes</span>
            <textarea
              value={feedbackNotes || selectedScorecard.rubricNotes || ''}
              onChange={(e) => setFeedbackNotes(e.target.value)}
              placeholder="Detailed synthesis of technical strengths, red flags, and leveling recommendation..."
              rows={3}
              className="w-full rounded border border-white/[0.08] bg-[#090d16] p-2.5 text-xs text-[#dae2fd] placeholder-[#64748b] focus:border-[#4f46e5] focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmitScore}
            className="w-full flex items-center justify-center gap-2 rounded bg-[#4f46e5] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#4338ca] transition-colors cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Submit Official Scorecard to ATS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
