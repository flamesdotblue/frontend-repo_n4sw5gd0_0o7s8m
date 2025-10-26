import React from 'react';
import { MotionConfig, motion } from 'framer-motion';

export default function SceneInfo() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.aside
        id="lore"
        className="absolute bottom-6 left-6 z-30 max-w-md rounded-2xl border border-white/10 bg-black/30 p-5 text-white/90 shadow-2xl backdrop-blur"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2 className="text-xl font-semibold tracking-wide">At the Foot of the Mountain</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Golden hour bathes the old Shinto grounds in warm light. A lone swordsman rests
          beneath the sakura, eyes set on the temple doors. Petals drift through the air,
          and the mountain watches in silence.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {['Cinematic', '3D Anime Vibe', 'Volumetric Light', 'Parallax Ready', 'Sakura'].map((t) => (
            <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </motion.aside>
    </MotionConfig>
  );
}
