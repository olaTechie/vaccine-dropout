import { useMemo, useState } from 'react';
import { Check, Clipboard, Link as LinkIcon } from 'lucide-react';
import { buildHashURL } from '../../lib/paths.js';
import { formatNaira, formatPct } from '../../lib/format.js';
import {
  buildScenarioSummary,
  getActiveInterventionLabels,
  getRuleLabel,
} from '../../lib/scenarioSummary.js';

export default function DecisionSnapshot({
  live,
  rule,
  interventions,
  route = '/simulation',
  search = '',
  title = 'Decision snapshot',
}) {
  const [copyStatus, setCopyStatus] = useState(null);
  const [urlStatus, setUrlStatus] = useState(null);

  const summary = useMemo(
    () => buildScenarioSummary({ rule, interventions, live }),
    [rule, interventions, live]
  );
  const activeInterventions = getActiveInterventionLabels(interventions);
  const ruleLabel = getRuleLabel(rule);

  const copyText = async (text, setter) => {
    try {
      await navigator.clipboard.writeText(text);
      setter('copied');
    } catch {
      setter('failed');
    } finally {
      setTimeout(() => setter(null), 2200);
    }
  };

  const copyURL = () => {
    const url = buildHashURL(route, search);
    copyText(url, setUrlStatus);
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted">{title}</div>
          <h2 className="mt-2 font-serif text-3xl">{ruleLabel}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {activeInterventions.length
              ? `Active bundle: ${activeInterventions.join(', ')}`
              : 'Active bundle: no active intervention'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <SnapshotButton
            onClick={() => copyText(summary, setCopyStatus)}
            icon={<Clipboard size={16} aria-hidden="true" />}
          >
            Copy summary
          </SnapshotButton>
          <SnapshotButton
            onClick={copyURL}
            icon={<LinkIcon size={16} aria-hidden="true" />}
          >
            Copy URL
          </SnapshotButton>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <SnapshotMetric
          label="DTP3 completion"
          value={live ? formatPct(live.dtp3_mean, 1) : '—'}
          sublabel={live?.dtp3_ci_low != null ? `95% CI ${formatPct(live.dtp3_ci_low, 1)}-${formatPct(live.dtp3_ci_high, 1)}` : 'Awaiting metrics'}
        />
        <SnapshotMetric
          label="Cost per child"
          value={live ? formatNaira(live.cost_per_child) : '—'}
          sublabel="Budget-normalised estimate"
        />
        <SnapshotMetric
          label="Equity signal"
          value={live ? live.concentration_index.toFixed(3) : '—'}
          sublabel="Lower is closer to equal access"
        />
      </div>

      <p className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm leading-6 text-moonlight/82">
        {summary}
      </p>
      <div role="status" aria-live="polite" className="mt-3 min-h-5 text-xs text-muted">
        {copyStatus === 'copied' && <StatusText>Scenario summary copied</StatusText>}
        {copyStatus === 'failed' && 'Summary copy failed, clipboard unavailable'}
        {urlStatus === 'copied' && <StatusText>Scenario URL copied</StatusText>}
        {urlStatus === 'failed' && 'URL copy failed, clipboard unavailable'}
      </div>
    </section>
  );
}

function SnapshotMetric({ label, value, sublabel }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-2 font-serif text-3xl tabular-nums">{value}</div>
      <div className="mt-2 text-xs leading-5 text-muted">{sublabel}</div>
    </div>
  );
}

function SnapshotButton({ children, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-semibold transition hover:border-saffron/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60"
    >
      {icon}
      {children}
    </button>
  );
}

function StatusText({ children }) {
  return (
    <span className="inline-flex items-center gap-1 text-verdigris">
      <Check size={14} aria-hidden="true" />
      {children}
    </span>
  );
}
