import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PART_COLORS = ["#A3E635", "#34D399", "#38BDF8", "#A78BFA", "#FBBF24"];

interface Props {
  show: boolean;
}

export default function Celebration({ show }: Props) {
  const parts = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        angle: (i / 32) * Math.PI * 2 + Math.random() * 0.5,
        dist: 90 + Math.random() * 170,
        size: 5 + Math.random() * 8,
        color: PART_COLORS[i % PART_COLORS.length],
        rot: (Math.random() - 0.5) * 560,
        delay: Math.random() * 0.18,
      })),
    [show]
  );

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
          {/* particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {parts.map((p, i) => (
              <motion.span
                key={i}
                className="absolute rounded-[3px]"
                style={{ width: p.size, height: p.size * 0.6, backgroundColor: p.color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: Math.cos(p.angle) * p.dist,
                  y: Math.sin(p.angle) * p.dist - 60,
                  opacity: 0,
                  scale: 0.35,
                  rotate: p.rot,
                }}
                transition={{ duration: 1.5, delay: p.delay, ease: [0.12, 0.8, 0.28, 1] }}
              />
            ))}
          </div>

          {/* message card */}
          <motion.div
            initial={{ scale: 0.5, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative flex flex-col items-center rounded-[28px] border border-[#A3E635]/30 bg-[#0D120F]/95 px-10 py-7 text-center backdrop-blur-md"
            style={{ boxShadow: "0 24px 80px -20px rgba(163,230,53,0.45)" }}
          >
            <div
              className="grid h-12 w-12 place-items-center rounded-2xl"
              style={{ backgroundColor: "rgba(163,230,53,0.14)", color: "#A3E635" }}
            >
              <Sparkles size={22} />
            </div>
            <div className="mt-3 text-2xl font-black text-zinc-50">نهار مكتمل!</div>
            <div className="mt-1.5 text-sm font-semibold text-zinc-400">
              درتي كلشي — الله يعطيك الصحة
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
