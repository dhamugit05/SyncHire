import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateCandidateSla,
  filterCandidatesList,
  calculatePipelineMetrics,
} from './pipeline.ts';
import { Candidate } from '../types/index.ts';

const mockCandidates: Candidate[] = [
  {
    id: 'CAND-1',
    name: 'Alex Morgan',
    role: 'Staff Full Stack Engineer',
    previousCompany: 'Ex-Stripe',
    skills: ['React', 'Go', 'System Design'],
    stage: 'recruiter_screen',
    avatarUrl: '',
    matchScore: 94,
    appliedDate: '2024-10-20',
    daysInStage: 1,
    timezone: 'PST',
    timezoneOffsetHours: -8,
    email: 'alex@example.com',
    phone: '555-0101',
  },
  {
    id: 'CAND-2',
    name: 'Priya Sharma',
    role: 'Staff Frontend Specialist',
    previousCompany: 'Ex-Uber',
    skills: ['React', 'TypeScript', 'Web Perf'],
    stage: 'technical_screen',
    avatarUrl: '',
    matchScore: 92,
    appliedDate: '2024-10-15',
    daysInStage: 4,
    isSlaBreach: true,
    timezone: 'IST',
    timezoneOffsetHours: 5.5,
    email: 'priya@example.com',
    phone: '555-0102',
  },
  {
    id: 'CAND-3',
    name: 'Devlin Vance',
    role: 'Staff Systems Engineer',
    previousCompany: 'Ex-Datadog',
    skills: ['Go', 'Rust'],
    stage: 'applied',
    avatarUrl: '',
    matchScore: 88,
    appliedDate: '2024-10-24',
    daysInStage: 0.2,
    timezone: 'EST',
    timezoneOffsetHours: -5,
    email: 'devlin@example.com',
    phone: '555-0103',
  },
];

test('evaluateCandidateSla detects breach when exceeding threshold', () => {
  const normal = evaluateCandidateSla(1, 2);
  assert.equal(normal.isBreached, false);
  assert.equal(normal.hoursRemaining, 24);

  const breached = evaluateCandidateSla(4, 2);
  assert.equal(breached.isBreached, true);
  assert.match(breached.displayText, /SLA Breach/);
});

test('filterCandidatesList filters by name, skill, and role', () => {
  const stripe = filterCandidatesList(mockCandidates, 'stripe');
  assert.equal(stripe.length, 1);
  assert.equal(stripe[0].name, 'Alex Morgan');

  const rust = filterCandidatesList(mockCandidates, 'rust');
  assert.equal(rust.length, 1);
  assert.equal(rust[0].name, 'Devlin Vance');

  const frontend = filterCandidatesList(mockCandidates, '', 'Frontend');
  assert.equal(frontend.length, 1);
  assert.equal(frontend[0].name, 'Priya Sharma');
});

test('calculatePipelineMetrics aggregates correctly', () => {
  const metrics = calculatePipelineMetrics(mockCandidates);
  assert.equal(metrics.total, 3);
  assert.equal(metrics.slaBreaches, 1);
  assert.equal(metrics.stageCounts['recruiter_screen'], 1);
  assert.equal(metrics.stageCounts['technical_screen'], 1);
  assert.equal(metrics.stageCounts['applied'], 1);
});
