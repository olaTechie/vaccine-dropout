import { ArrowRight } from 'lucide-react';

const ACCENTS = {
  story: {
    text: 'text-saffron',
    border: 'border-saffron/30',
    bg: 'bg-saffron/10',
    wash: 'from-saffron/16',
  },
  policy: {
    text: 'text-verdigris',
    border: 'border-verdigris/30',
    bg: 'bg-verdigris/10',
    wash: 'from-verdigris/16',
  },
  simulation: {
    text: 'text-iris',
    border: 'border-iris/30',
    bg: 'bg-iris/10',
    wash: 'from-iris/16',
  },
  explorer: {
    text: 'text-terracotta',
    border: 'border-terracotta/35',
    bg: 'bg-terracotta/10',
    wash: 'from-terracotta/16',
  },
};

export default function RouteIdentity({
  accent = 'policy',
  eyebrow,
  title,
  body,
  actionLabel,
  onAction,
  children,
}) {
  const tone = ACCENTS[accent] || ACCENTS.policy;

  return (
    <section className={`rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${tone.wash} via-white/[0.055] to-white/[0.025] p-6 md:p-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)]`}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className={`inline-flex items-center rounded-full border ${tone.border} ${tone.bg} px-4 py-1 text-xs uppercase tracking-[0.22em] ${tone.text}`}>
            {eyebrow}
          </div>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted md:text-base">{body}</p>
        </div>

        {(actionLabel || children) && (
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            {children}
            {actionLabel && (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-2 text-sm font-semibold text-moonlight transition hover:border-saffron/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60"
              >
                {actionLabel}
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
