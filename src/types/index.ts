export type CandidateStage = 
  | 'applied' 
  | 'recruiter_screen' 
  | 'technical_screen' 
  | 'panel_onsite' 
  | 'offer';

export interface Candidate {
  id: string;
  name: string;
  role: string;
  previousCompany: string;
  skills: string[];
  stage: CandidateStage;
  avatarUrl: string;
  matchScore: number;
  appliedDate: string;
  daysInStage: number;
  isSlaBreach?: boolean;
  statusText?: string;
  statusType?: 'default' | 'success' | 'warning' | 'error' | 'in_progress';
  resumeHighlights?: string;
  codeSignalScore?: number;
  scorecardRating?: number;
  salaryApproved?: string;
  equity?: string;
  interviewStatus?: string;
  interviewDue?: string;
  timezone: string;
  timezoneOffsetHours: number;
  email: string;
  phone: string;
}

export interface Interviewer {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  interviewsThisWeek: number;
  maxWeeklyInterviews: number;
  loadPercentage: number;
  timezone: string;
  schedule: Array<{
    timeSlot: string; // "10 AM", "11 AM", etc.
    status: 'open' | 'busy' | 'target' | 'lunch' | 'preferred';
    label?: string;
  }>;
}

export interface RecommendedWindow {
  id: string;
  matchPercentage: number;
  isBest?: boolean;
  dayLabel: string; // "Tomorrow", "Thursday"
  dateFormatted: string; // "Wed, Oct 24"
  timeEst: string; // "2:30 PM – 3:45 PM EST"
  timeCandidate: string; // "Priya: 1:00 AM – 2:15 AM IST (+1d)"
  description: string;
  statusBadge: string; // "Both Available", "Soft Shift Required"
  softShiftRequired?: boolean;
  startHour24: number; // e.g. 14.5 for 2:30 PM
  durationMinutes: number;
}

export interface CandidatePortalBooking {
  selectedDate: string; // e.g. "2024-10-24"
  selectedSlotTime: string; // "11:30 AM - 12:30 PM"
  slotTag: string; // "Best Panel Alignment"
  candidateTimezone: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  otpCode: string[];
  consentAccepted: boolean;
  notes: string;
  bookingStatus: 'pending' | 'confirmed';
}

export interface ScorecardItem {
  id: string;
  candidateName: string;
  candidateRole: string;
  interviewRound: string;
  interviewerName: string;
  scheduledTime: string;
  status: 'pending' | 'submitted' | 'flagged';
  score?: number;
  maxScore: number;
  rubricNotes?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  target: string;
  status: 'synced' | 'locked' | 'breach' | 'purged';
  details: string;
}
