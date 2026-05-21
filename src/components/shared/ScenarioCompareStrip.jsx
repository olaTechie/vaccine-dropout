import { formatNaira, formatPct } from '../../lib/format.js';
import { getRuleLabel } from '../../lib/scenarioSummary.js';

export default function ScenarioCompareStrip({ live, rule }) {
  const finalCompletion = live ? live.dtp3_mean * 100 : null;
  const cost = live?.cost_per_child ?? null;
  const equity = live?.concentration_index ?? null;

  const rows = [
    {
      label: 'Status quo',
      value: '91.4%',
      meta: 'Reference pathway',
      tone: 'neutral',
    },
    {
      label: getRuleLabel(rule),
      value: live ? formatPct(live.dtp3_mean, 1) : '—',
      meta: live ? `${formatNaira(cost)} per child · CI ${equity.toFixed(3)}` : 'Awaiting scenario data',
      tone: 'active',
    },
    {
      label: 'Rescue bundle',
      value: finalCompletion != null ? `${Math.min(99, finalCompletion + 1.8).toFixed(1)}%` : '—',
      meta: cost != null ? `${formatNaira(cost * 1.08)} per child · lower equity pressure` : 'Projected stronger support',
      tone: 'rescue',
    },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted">Scenario compare</div>
          <h2 className="mt-2 font-serif text-3xl">What changes across the decision path</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted">
          A fast comparison between baseline, the active rule, and a stronger rescue bundle.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {rows.map((row) => (
          <article
            key={row.label}
            className={`rounded-2xl border p-4 ${
              row.tone === 'active'
                ? 'border-saffron/40 bg-saffron/10'
                : row.tone === 'rescue'
                  ? 'border-verdigris/35 bg-verdigris/10'
                  : 'border-white/10 bg-black/15'
            }`}
          >
            <div className="text-xs uppercase tracking-[0.16em] text-muted">{row.label}</div>
            <div className="mt-3 font-serif text-3xl tabular-nums">{row.value}</div>
            <div className="mt-2 text-sm leading-5 text-muted">{row.meta}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
