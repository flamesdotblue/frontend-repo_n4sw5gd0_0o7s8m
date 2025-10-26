import React from 'react';
import HeaderNav from './components/HeaderNav';
import HeroScene from './components/HeroScene';
import SceneInfo from './components/SceneInfo';
import TempleFocusCTA from './components/TempleFocusCTA';

function App() {
  return (
    <div className="relative min-h-screen bg-slate-900 font-['Inter','Manrope',system-ui] text-white">
      {/* Hero cinematic scene */}
      <HeroScene />

      {/* UI overlays */}
      <HeaderNav />
      <TempleFocusCTA />
      <SceneInfo />

      {/* Footer section placeholder for future expansion */}
      <section className="relative z-30 bg-gradient-to-t from-slate-950 to-transparent">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h3 className="text-2xl font-semibold tracking-wide">A Serene Arrival</h3>
          <p className="mt-3 max-w-3xl text-white/80">
            Designed for cinematic landing experiences: layered parallax, warm golden-hour lighting,
            and an interactive focal door. The atmosphere features sakura blossoms drifting across
            mossy stone, with a lone samurai resting to the left of the temple facade.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
