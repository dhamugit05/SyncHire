/**
 * Pure scheduling and calculation engine for SyncHire Precision Studio.
 */

export interface BurnoutAssessment {
  percentage: number;
  isHighLoad: boolean;
  isOverLimit: boolean;
  statusColor: 'emerald' | 'amber' | 'rose';
}

/**
 * Calculates interviewer load percentage and fatigue warning level
 */
export function calculateInterviewerBurnout(
  interviewsThisWeek: number,
  maxLimit: number = 5
): BurnoutAssessment {
  if (maxLimit <= 0) {
    return { percentage: 0, isHighLoad: false, isOverLimit: false, statusColor: 'emerald' };
  }
  const percentage = Math.round((interviewsThisWeek / maxLimit) * 100);
  const isOverLimit = interviewsThisWeek >= maxLimit;
  const isHighLoad = percentage >= 75;

  let statusColor: 'emerald' | 'amber' | 'rose' = 'emerald';
  if (isOverLimit) {
    statusColor = 'rose';
  } else if (isHighLoad) {
    statusColor = 'amber';
  }

  return {
    percentage,
    isHighLoad,
    isOverLimit,
    statusColor,
  };
}

/**
 * Computes human-readable timezone drift between candidate and panel
 * e.g. candidate IST (UTC+5:30) vs EST (UTC-5) -> +10.5 hrs or +9.5 hrs (EDT)
 */
export function computeTimezoneDrift(
  candidateUtcOffset: number,
  panelUtcOffset: number
): { diffHours: number; formattedText: string } {
  const diffHours = candidateUtcOffset - panelUtcOffset;
  if (diffHours === 0) {
    return { diffHours: 0, formattedText: 'Drift: 0h' };
  }
  const sign = diffHours > 0 ? '+' : '';
  const decimal = Math.abs(diffHours % 1);
  let str = '';
  if (decimal === 0.5) {
    str = `${sign}${Math.trunc(diffHours)}.5 hrs vs Panel`;
  } else {
    str = `${sign}${diffHours} hrs vs Panel`;
  }
  return {
    diffHours,
    formattedText: str,
  };
}

/**
 * Evaluates match quality of a candidate time window based on interviewer availability & focus preservation
 */
export function calculateMatchScore(
  evaluatorAvailability: number, // 0 to 1
  focusBlockPreserved: boolean,
  candidateSurveyMatch: boolean
): number {
  let score = 70;
  score += Math.round(evaluatorAvailability * 20);
  if (focusBlockPreserved) score += 5;
  if (candidateSurveyMatch) score += 3;
  return Math.min(100, Math.max(0, score));
}

/**
 * Validates 4-digit OTP
 */
export function validateOtp(otp: string[]): boolean {
  if (!otp || otp.length !== 4) return false;
  return otp.every((char) => /^[0-9]$/.test(char));
}

/**
 * Formats duration in minutes to readable hours and minutes
 */
export function formatInterviewDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min duration`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) return `${hours}h duration`;
  return `${hours}h ${remainingMins}m duration`;
}
