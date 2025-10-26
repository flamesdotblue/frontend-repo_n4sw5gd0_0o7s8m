import React from 'react';

export default function HeaderNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 shadow-md shadow-amber-500/30" />
          <span className="text-white/90 font-semibold tracking-wide text-lg">Shinto Sanctuary</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <a className="hover:text-white transition-colors" href="#scene">Scene</a>
          <a className="hover:text-white transition-colors" href="#lore">Lore</a>
          <a className="hover:text-white transition-colors" href="#enter">Enter</a>
        </nav>
        <button className="rounded-full bg-white/10 backdrop-blur px-4 py-2 text-white/90 hover:bg-white/15 border border-white/10 transition-colors">
          Explore
        </button>
      </div>
    </header>
  );
}
