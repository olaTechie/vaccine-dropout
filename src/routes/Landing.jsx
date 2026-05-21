import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EVIDENCE_STEPS = [
  { label: 'DTP1', value: '100%', note: 'First contact' },
  { label: 'DTP2', value: '92%', note: 'Retention pressure' },
  { label: 'Corridor', value: '-7.2pp', note: 'Dropout risk' },
  { label: 'DTP3', value: '92.8%', note: 'Projected completion' },
];

const DESTINATIONS = [
  {
    to: '/story',
    index: '01',
    eyebrow: 'Narrative',
    title: 'Start with the evidence story',
    body: 'Walk the immunisation pathway from household contact to the dropout corridor and rescue signals.',
    role: 'Human pathway',
    accent: 'border-saffron/35 bg-saffron/8 text-saffron',
  },
  {
    to: '/policy',
    index: '02',
    eyebrow: 'Decisions',
    title: 'Compare intervention scenarios',
    body: 'Inspect completion, cost, and equity in one decision surface for policy translation.',
    role: 'Decision cockpit',
    accent: 'border-verdigris/35 bg-verdigris/8 text-verdigris',
  },
  {
    to: '/simulation',
    index: '03',
    eyebrow: 'Sandbox',
    title: 'Stage the intervention pathway',
    body: 'Tune the intervention bundle and watch the scenario logic play out as a shareable journey.',
    role: 'Intervention theatre',
    accent: 'border-iris/35 bg-iris/8 text-iris',
  },
  {
    to: '/explorer',
    index: '04',
    eyebrow: 'Evidence',
    title: 'Inspect the full archive',
    body: 'Open cascade, prediction, SHAP, microsimulation, equity, validation, and downloadable artefacts.',
    role: 'Evidence archive',
    accent: 'border-terracotta/35 bg-terracotta/8 text-terracotta',
  },
];

export default function Landing() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#263b70_0%,#121b2d_38%,#05070c_78%)]">
      <section className="relative max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="pointer-events-none absolute inset-x-6 top-8 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(245,176,66,0.35),transparent)] md:block" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-saffron/30 bg-saffron/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-saffron">
              Vaccination dropout in Nigeria
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-6xl md:text-8xl leading-[0.95]">
              Catching the fall before DTP3 is missed.
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-xl text-moonlight/78">
              An evidence atlas for the DTP1 to DTP3 corridor: where the cascade breaks,
              which children carry the highest dropout risk, and which interventions move
              completion without losing sight of cost and equity.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:hidden">
              <MiniEvidence label="Current rule" value="Top 30%" />
              <MiniEvidence label="Projected DTP3" value="92.8%" />
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/simulation"
                className="inline-flex items-center gap-2 rounded-full bg-saffron px-8 py-4 font-semibold text-abyss hover:bg-saffron/90 transition"
              >
                Open simulator
                <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
              </Link>
              <Link
                to="/story"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 hover:bg-white/5 transition"
              >
                Begin the story
                <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <EvidencePathway />
        </div>

        <section className="mt-14">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted">Route map</div>
              <h2 className="mt-2 font-serif text-3xl">Move from pathway to policy, then back to evidence.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Each route has a different job: understand the dropout corridor, choose a rule, stage the bundle, and audit the evidence.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
          {DESTINATIONS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group grid min-h-[220px] grid-rows-[auto_1fr_auto] rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-saffron/35 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs uppercase tracking-[0.2em] text-saffron">{item.eyebrow}</div>
                <div className="font-mono text-xs text-moonlight/35">{item.index}</div>
              </div>
              <div>
                <div className={`mt-5 inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em] ${item.accent}`}>
                  {item.role}
                </div>
                <h2 className="mt-5 font-serif text-3xl leading-tight">{item.title}</h2>
                <p className="mt-4 text-sm leading-6 text-muted">{item.body}</p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-moonlight group-hover:text-saffron">
                Open section
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </div>
            </Link>
          ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function EvidencePathway() {
  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted">Atlas signal</div>
          <h2 className="mt-2 font-serif text-3xl">The dropout corridor</h2>
        </div>
        <div className="rounded-full border border-verdigris/30 bg-verdigris/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-verdigris">
          live model
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {EVIDENCE_STEPS.map((step, index) => (
          <div key={step.label} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4">
            <div className="relative flex justify-center">
              <div className={`h-9 w-9 rounded-full border ${
                step.label === 'Corridor'
                  ? 'border-terracotta/60 bg-terracotta/15'
                  : 'border-saffron/45 bg-saffron/10'
              }`} />
              {index < EVIDENCE_STEPS.length - 1 && (
                <div className="absolute top-10 h-10 w-px bg-white/14" />
              )}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted">{step.label}</div>
                <div className="font-serif text-2xl tabular-nums">{step.value}</div>
              </div>
              <div className="mt-2 text-sm text-muted">{step.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 border-t border-white/10 pt-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat label="Cohort" value="3,194" />
          <Stat label="Actions" value="5" />
          <Stat label="Views" value="4" />
        </div>
      </div>
    </aside>
  );
}

function MiniEvidence({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <div className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-2 font-serif text-2xl">{value}</div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-1 font-serif text-2xl">{value}</div>
    </div>
  );
}
