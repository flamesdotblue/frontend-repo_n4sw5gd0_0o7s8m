import React from 'react';
import { motion } from 'framer-motion';

export default function TempleFocusCTA() {
  const handleEnter = () => {
    const anchor = document.querySelector('#lore');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="enter" className="absolute inset-0 z-20 flex items-center justify-center">
      {/* Glow aligned roughly where a central temple door would be */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      >
        <motion.div
          className="absolute -inset-20 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />

        <motion.button
          onClick={handleEnter}
          className="relative isolate rounded-full border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-white shadow-lg hover:bg-white/15"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-300/20 to-rose-300/20 blur" aria-hidden />
          <span className="relative font-semibold tracking-wide">Enter Temple</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
