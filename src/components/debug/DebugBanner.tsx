import React from 'react';
import { useLocation } from 'react-router-dom';

const DebugBanner: React.FC = () => {
  const location = useLocation();

  const exitSafeMode = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('safe');
      window.location.replace(url.toString());
    } catch (e) {
      console.error('Failed to exit safe mode:', e);
      window.location.href = location.pathname || '/';
    }
  };

  return (
    <div className="fixed left-3 top-3 z-50 rounded-md border border-border bg-primary text-primary-foreground shadow px-3 py-2 text-xs">
      <div className="font-bold">Safe Mode</div>
      <div className="opacity-90">Path: {location.pathname || '/'}</div>
      <div className="opacity-90">Env: {import.meta.env.MODE}</div>
      <button
        onClick={exitSafeMode}
        className="mt-2 inline-flex items-center rounded-sm bg-secondary px-2 py-1 text-[11px] text-secondary-foreground hover:opacity-90 transition"
        aria-label="Exit safe mode"
      >
        Exit Safe Mode
      </button>
    </div>
  );
};

export default DebugBanner;
