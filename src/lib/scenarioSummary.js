import { formatNaira, formatPct } from './format.js';

export const RULE_LABELS = {
  uniform_sms: 'Uniform SMS',
  uniform_chw: 'Uniform CHW',
  top30_risk: 'Top 30% risk targeting',
  top10_incentive: 'Top 10% plus incentive',
  rl_optimised: 'RL-optimised policy',
  universal: 'Universal support',
  status_quo: 'Status quo',
};

export const INTERVENTION_LABELS = {
  a1: 'SMS reminders',
  a2: 'CHW follow-up',
  a3: 'recall support',
  a4: 'incentive support',
};

const INTERVENTION_ORDER = ['a1', 'a2', 'a3', 'a4'];

export function getRuleLabel(rule) {
  return RULE_LABELS[rule] || String(rule || '').replaceAll('_', ' ');
}

export function getActiveInterventionLabels(interventions = {}) {
  return INTERVENTION_ORDER
    .filter((key) => interventions[key])
    .map((key) => INTERVENTION_LABELS[key]);
}

function joinList(items) {
  if (!items.length) return 'no active interventions';
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

export function buildScenarioSummary({ rule, interventions, live }) {
  const ruleLabel = getRuleLabel(rule);
  if (!live) return `${ruleLabel} has no loaded scenario metrics yet.`;

  const interventionText = joinList(getActiveInterventionLabels(interventions));
  const ciText = live.dtp3_ci_low != null && live.dtp3_ci_high != null
    ? ` (95% CI ${formatPct(live.dtp3_ci_low, 1).replace('%', '')}-${formatPct(live.dtp3_ci_high, 1).replace('%', '')})`
    : '';

  return `${ruleLabel} with ${interventionText} projects ${formatPct(live.dtp3_mean, 1)} DTP3 completion${ciText}, at ${formatNaira(live.cost_per_child)} per child, with concentration index ${live.concentration_index.toFixed(3)}.`;
}
