import { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Scrollama, Step } from 'react-scrollama';
import { hasWebGL } from '../lib/webgl.js';
import StageCanvas from '../scene/StageCanvas.jsx';
import StableStoryScene from '../scene/StableStoryScene.jsx';
import InterventionPanel from '../components/hud/InterventionPanel.jsx';
import DashboardOverlay from '../components/hud/DashboardOverlay.jsx';
import CanvasErrorBoundary from '../components/shared/CanvasErrorBoundary.jsx';
import { useStoryStore } from '../state/story.js';

const ACTS = [
  {
    id: 1,
    eyebrow: 'Act I',
    title: 'Six weeks from birth, a decision begins.',
    body: 'In a home like this, across Nigeria, every year, millions of children reach the first immunisation gate. The question is not just whether DTP1 happens, but whether the pathway stays intact all the way to DTP3.',
    kicker: 'This is the human starting point before analytics and policy enter the frame.',
  },
  {
    id: 2,
    eyebrow: 'Act II',
    title: 'The corridor between visits is where dropout happens.',
    body: 'Children are not lost at one dramatic moment. They disappear between scheduled contacts: transport friction, recall failure, competing priorities, and weak follow-up compound into missed doses.',
    kicker: 'By the first birthday, around 15 of every 100 children who began the series have fallen out of the corridor.',
  },
  {
    id: 3,
    eyebrow: 'Act III',
    title: 'A nation of corridors repeats the same risk.',
    body: 'Across Nigeria’s LGAs, the same gates recur at scale. Dropout is not a single hotspot story; it is a repeated systems story, distributed across geography and household context.',
    kicker: 'The burden is broad enough that descriptive mapping alone cannot tell us who to intervene on first.',
  },
  {
    id: 4,
    eyebrow: 'Act IV',
    title: 'Interventions change the shape of the corridor.',
    body: 'SMS reminders, community health workers, facility recall, and incentives all act on the same journey in different ways. The question is how to combine them without wasting budget.',
    kicker: 'The left-hand intervention HUD lets the viewer move from narrative to mechanism.',
  },
  {
    id: 5,
    eyebrow: 'Act V',
    title: 'A policy emerges from the evidence.',
    body: 'The most credible recommendation is not the loudest intervention but the one that balances completion, equity, and cost once the full analytical pipeline is applied.',
    kicker: 'From here, the dashboard and simulator take over from the cinematic story.',
  },
];

export default function Story() {
  const [progress, setProgress] = useState(0);
  const currentAct = useStoryStore((s) => s.currentAct);
  const setAct = useStoryStore((s) => s.setAct);

  if (!hasWebGL()) {
    return <Navigate to="/story/transcript" replace />;
  }

  const activeAct = useMemo(
    () => ACTS.find((act) => act.id === currentAct) || ACTS[0],
    [currentAct]
  );

  return (
    <>
      <CanvasErrorBoundary>
        <StageCanvas>
          <StableStoryScene act={currentAct} progress={progress} />
        </StageCanvas>
      </CanvasErrorBoundary>

      {currentAct === 4 && <InterventionPanel />}
      {currentAct === 5 && <DashboardOverlay visible />}

      <div className="pointer-events-none fixed inset-x-0 top-24 z-20">
        <div className="max-w-7xl mx-auto px-6 flex items-start justify-between gap-6">
          <div className="pointer-events-auto max-w-md rounded-[1.75rem] border border-white/10 bg-abyss/55 px-5 py-4 backdrop-blur-xl shadow-[0_22px_80px_rgba(0,0,0,0.28)]">
            <div className="text-[0.68rem] uppercase tracking-[0.24em] text-saffron">Cinematic Story</div>
            <div className="mt-2 font-serif text-2xl text-moonlight">{activeAct.eyebrow}</div>
            <p className="mt-2 text-sm text-muted">
              Scroll to move through the five-act narrative, then jump to the dashboard or simulator once the recommendation becomes clear.
            </p>
          </div>

          <div className="pointer-events-auto hidden lg:flex items-center gap-3 rounded-full border border-white/10 bg-abyss/55 px-4 py-3 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
            <Link to="/story/transcript" className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-saffron/40 hover:bg-white/5">
              Transcript
            </Link>
            <Link to="/policy" className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-saffron/40 hover:bg-white/5">
              Dashboard
            </Link>
            <Link to="/simulation" className="rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-abyss hover:bg-saffron/90">
              Simulator
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed left-6 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
        <div className="rounded-[1.75rem] border border-white/10 bg-abyss/55 p-4 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
          <div className="text-[0.68rem] uppercase tracking-[0.22em] text-muted mb-4">Story Rail</div>
          <div className="space-y-3">
            {ACTS.map((act) => {
              const isActive = act.id === currentAct;
              return (
                <div
                  key={act.id}
                  className={`w-44 rounded-[1.2rem] border px-4 py-3 transition ${
                    isActive
                      ? 'border-saffron/45 bg-saffron/10'
                      : 'border-white/10 bg-white/4'
                  }`}
                >
                  <div className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">{act.eyebrow}</div>
                  <div className={`mt-2 text-sm leading-snug ${isActive ? 'text-moonlight' : 'text-muted'}`}>
                    {act.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Scrollama onStepEnter={({ data }) => setAct(data)} onStepProgress={({ progress: p }) => setProgress(p)}>
          {ACTS.map((act) => (
            <Step key={act.id} data={act.id}>
              <section className="min-h-[185vh] flex items-center px-6">
                <div className="max-w-7xl mx-auto w-full grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:items-center">
                  <article className="max-w-2xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(5,7,12,0.60),rgba(5,7,12,0.40))] p-7 md:p-9 backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
                    <div className="text-xs uppercase tracking-[0.22em] text-saffron">{act.eyebrow}</div>
                    <h2 className="mt-4 font-serif text-5xl md:text-7xl leading-[0.96]">
                      {act.title}
                    </h2>
                    <p className="mt-6 max-w-xl text-base md:text-lg text-moonlight/82 leading-relaxed">
                      {act.body}
                    </p>
                    <p className="mt-5 max-w-lg text-sm text-muted leading-relaxed">
                      {act.kicker}
                    </p>
                  </article>

                  <aside className="rounded-[1.75rem] border border-white/10 bg-abyss/45 p-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.22)]">
                    <div className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">Scene Context</div>
                    <div className="mt-3 font-serif text-2xl">{act.eyebrow}</div>
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {act.id === 1 && 'The scene focuses tightly on a household because the narrative starts with a single mother-child pair, not a model aggregate.'}
                      {act.id === 2 && 'The corridor compresses repeated missed opportunities into one spatial metaphor: forward movement interrupted by system friction.'}
                      {act.id === 3 && 'The camera pulls back to show how one family story becomes a national systems problem across geography and timing.'}
                      {act.id === 4 && 'This is the interactive act: evidence-based interventions reshape the pathway, and the viewer can inspect what each one contributes.'}
                      {act.id === 5 && 'The final act translates the cinematic story into a policy recommendation, then hands the viewer off to the dashboard and simulator.'}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
                      <span>Act {act.id} of {ACTS.length}</span>
                      <span>{Math.round((act.id / ACTS.length) * 100)}% through story</span>
                    </div>
                  </aside>
                </div>
              </section>
            </Step>
          ))}
        </Scrollama>
      </div>
    </>
  );
}
