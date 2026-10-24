import { Candidate } from '../types/index.ts';

export interface SlaAssessment {
  isBreached: boolean;
  hoursRemaining: number;
  displayText: string;
}

/**
 * Evaluates SLA status for a candidate in current stage (default 48h limit)
 */
export function evaluateCandidateSla(
  daysInStage: number,
  slaThresholdDays: number = 2
): SlaAssessment {
  const hoursInStage = daysInStage * 24;
  const slaThresholdHours = slaThresholdDays * 24;
  const isBreached = hoursInStage >= slaThresholdHours;
  const hoursRemaining = Math.max(0, slaThresholdHours - hoursInStage);

  let displayText = '';
  if (isBreached) {
    displayText = `${daysInStage} days in stage (SLA Breach)`;
  } else {
    displayText = `${hoursRemaining}h remaining in SLA`;
  }

  return {
    isBreached,
    hoursRemaining,
    displayText,
  };
}

/**
 * Filters candidates by search query (name, previous company, skills, or role)
 */
export function filterCandidatesList(
  candidates: Candidate[],
  searchQuery: string,
  roleFilter?: string,
  minMatchScore?: number
): Candidate[] {
  const query = searchQuery.trim().toLowerCase();

  return candidates.filter((c) => {
    if (query) {
      const matchName = c.name.toLowerCase().includes(query);
      const matchCompany = c.previousCompany.toLowerCase().includes(query);
      const matchRole = c.role.toLowerCase().includes(query);
      const matchSkills = c.skills.some((s) => s.toLowerCase().includes(query));
      if (!matchName && !matchCompany && !matchRole && !matchSkills) {
        return false;
      }
    }

    if (roleFilter && roleFilter !== 'all') {
      if (!c.role.toLowerCase().includes(roleFilter.toLowerCase())) {
        return false;
      }
    }

    if (minMatchScore !== undefined && c.matchScore < minMatchScore) {
      return false;
    }

    return true;
  });
}

/**
 * Calculates high-level pipeline stats
 */
export function calculatePipelineMetrics(candidates: Candidate[]) {
  const total = candidates.length;
  const slaBreaches = candidates.filter((c) => c.isSlaBreach || c.daysInStage >= 2).length;
  const avgMatch = total > 0 ? Math.round(candidates.reduce((acc, c) => acc + c.matchScore, 0) / total) : 0;
  
  const stageCounts: Record<string, number> = {
    applied: 0,
    recruiter_screen: 0,
    technical_screen: 0,
    panel_onsite: 0,
    offer: 0,
  };

  candidates.forEach((c) => {
    if (stageCounts[c.stage] !== undefined) {
      stageCounts[c.stage]++;
    }
  });

  return {
    total,
    slaBreaches,
    avgMatch,
    stageCounts,
  };
}
