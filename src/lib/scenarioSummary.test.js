import { describe, expect, it } from 'vitest';
import {
  buildScenarioSummary,
  getActiveInterventionLabels,
  getRuleLabel,
} from './scenarioSummary.js';

describe('scenarioSummary', () => {
  it('returns readable rule labels', () => {
    expect(getRuleLabel('top30_risk')).toBe('Top 30% risk targeting');
    expect(getRuleLabel('rl_optimised')).toBe('RL-optimised policy');
    expect(getRuleLabel('custom_rule')).toBe('custom rule');
  });

  it('extracts active intervention labels in display order', () => {
    expect(getActiveInterventionLabels({
      a0: true,
      a1: true,
      a2: false,
      a3: true,
      a4: false,
    })).toEqual(['SMS reminders', 'recall support']);
  });

  it('builds a copy-ready scenario summary with uncertainty', () => {
    const summary = buildScenarioSummary({
      rule: 'top30_risk',
      interventions: { a1: true, a2: true, a3: false, a4: false },
      live: {
        dtp3_mean: 0.928,
        dtp3_ci_low: 0.917,
        dtp3_ci_high: 0.938,
        cost_per_child: 432,
        concentration_index: 0.016,
      },
    });

    expect(summary).toBe(
      'Top 30% risk targeting with SMS reminders and CHW follow-up projects 92.8% DTP3 completion (95% CI 91.7-93.8), at ₦432 per child, with concentration index 0.016.'
    );
  });

  it('builds a summary for unavailable metrics', () => {
    const summary = buildScenarioSummary({
      rule: 'uniform_sms',
      interventions: {},
      live: null,
    });

    expect(summary).toBe('Uniform SMS has no loaded scenario metrics yet.');
  });
});
