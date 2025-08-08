import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DebugBanner from './components/debug/DebugBanner';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Safe Mode: Basic App Render</h1>
          <p className="text-sm text-muted-foreground">
            Minimal view to verify rendering. Use Exit Safe Mode to return to the full app.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="rounded-lg border border-border bg-card text-card-foreground p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">It works!</h2>
          <p className="mb-4">
            If you can see this page, the rendering pipeline is healthy. The issue likely lies in a heavy component or CSS conflict.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={(() => {
                const url = new URL(window.location.href);
                url.searchParams.delete('safe');
                return url.toString();
              })()}
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90"
            >
              Exit Safe Mode
            </a>
            <Link
              to="/"
              className="inline-flex items-center rounded-md border border-border px-4 py-2 hover:bg-muted transition"
            >
              Go to Home (/)
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground">
          Uncle Sam Junk Removal • Safe Mode
        </div>
      </footer>
    </div>
  );
};

const SafeApp: React.FC = () => {
  return (
    <BrowserRouter>
      <DebugBanner />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SafeApp;
