import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateInterviewerBurnout,
  computeTimezoneDrift,
  calculateMatchScore,
  validateOtp,
  formatInterviewDuration,
} from './scheduler.ts';

test('calculateInterviewerBurnout correctly assesses load and warnings', () => {
  const low = calculateInterviewerBurnout(2, 5);
  assert.equal(low.percentage, 40);
  assert.equal(low.isHighLoad, false);
  assert.equal(low.statusColor, 'emerald');

  const high = calculateInterviewerBurnout(4, 5);
  assert.equal(high.percentage, 80);
  assert.equal(high.isHighLoad, true);
  assert.equal(high.statusColor, 'amber');

  const limit = calculateInterviewerBurnout(5, 5);
  assert.equal(limit.isOverLimit, true);
  assert.equal(limit.statusColor, 'rose');
});

test('computeTimezoneDrift handles matching and differing timezones', () => {
  const zeroDrift = computeTimezoneDrift(-8, -8);
  assert.equal(zeroDrift.diffHours, 0);
  assert.equal(zeroDrift.formattedText, 'Drift: 0h');

  // Candidate IST (+5.5) vs EST (-4) -> 9.5 hours
  const istVsEst = computeTimezoneDrift(5.5, -4);
  assert.equal(istVsEst.diffHours, 9.5);
  assert.equal(istVsEst.formattedText, '+9.5 hrs vs Panel');
});

test('calculateMatchScore scales correctly with bonuses', () => {
  const perfect = calculateMatchScore(1.0, true, true);
  assert.equal(perfect, 98); // 70 + 20 + 5 + 3 = 98

  const standard = calculateMatchScore(0.8, false, false);
  assert.equal(standard, 86); // 70 + 16 = 86
});

test('validateOtp validates 4 digits correctly', () => {
  assert.equal(validateOtp(['7', '4', '2', '9']), true);
  assert.equal(validateOtp(['7', '4', '2', '']), false);
  assert.equal(validateOtp(['a', 'b', 'c', 'd']), false);
  assert.equal(validateOtp(['1', '2']), false);
});

test('formatInterviewDuration formats correctly', () => {
  assert.equal(formatInterviewDuration(45), '45 min duration');
  assert.equal(formatInterviewDuration(60), '1h duration');
  assert.equal(formatInterviewDuration(75), '1h 15m duration');
});
