"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0F172A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft radial fade so the grid disappears toward edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, transparent 40%, #F8FAFC 100%)",
        }}
      />

      {/* Top-right blue glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.14, 0.22, 0.14] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute -right-64 -top-64 h-[800px] w-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(96,165,250,0.1) 45%, transparent 70%)",
        }}
      />

      {/* Bottom-left navy glow */}
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-40 -left-40 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,95,0.22) 0%, rgba(59,130,246,0.07) 50%, transparent 70%)",
        }}
      />

      {/* Centre accent */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.5 }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
