import React from 'react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Shell from './components/layout/Shell.jsx';
import Landing from './routes/Landing.jsx';
import Transcript from './routes/Transcript.jsx';

// Heavy 3D routes are lazy-loaded
const Story = lazy(() => import('./routes/Story.jsx'));
const Simulation = lazy(() => import('./routes/Simulation.jsx'));
// Charts-heavy routes (recharts, d3) lazy-loaded so Landing doesn't ship them
const Policy = lazy(() => import('./routes/Policy.jsx'));
const Explorer = lazy(() => import('./routes/Explorer.jsx'));
const Methods = lazy(() => import('./routes/Methods.jsx'));

export function Loader({ label = 'route' }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-muted">
      <div
        role="status"
        aria-live="polite"
        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm shadow-[0_18px_60px_rgba(0,0,0,0.16)]"
      >
        Loading {label}...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell><Landing /></Shell>} />
      <Route path="/story" element={<Shell><Suspense fallback={<Loader label="evidence story" />}><Story /></Suspense></Shell>} />
      <Route path="/story/transcript" element={<Shell><Transcript /></Shell>} />
      <Route path="/policy" element={<Shell><Suspense fallback={<Loader label="policy dashboard" />}><Policy /></Suspense></Shell>} />
      <Route path="/simulation" element={<Shell><Suspense fallback={<Loader label="narrative simulator" />}><Simulation /></Suspense></Shell>} />
      <Route path="/explorer" element={<Shell><Suspense fallback={<Loader label="research explorer" />}><Explorer /></Suspense></Shell>} />
      <Route path="/explorer/methods" element={<Shell><Suspense fallback={<Loader label="methods notes" />}><Methods /></Suspense></Shell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
