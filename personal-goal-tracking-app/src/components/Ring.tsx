import { motion } from "framer-motion";

interface Props {
  pct: number; // 0..1
  size?: number;
  stroke?: number;
  label?: string;
}

export default function Ring({ pct, size = 148, stroke = 12, label = "داليوم" }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="block"
        style={{ filter: "drop-shadow(0 0 20px rgba(163,230,53,0.30))" }}
      >
        <defs>
          <linearGradient id="wakhaRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#wakhaRingGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - Math.min(1, Math.max(0, pct))) }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-[28px] font-black leading-none tracking-tight text-zinc-50">
            {Math.round(pct * 100)}
            <span className="text-sm font-bold text-zinc-500">%</span>
          </div>
          <div className="mt-1.5 text-[11px] font-semibold text-zinc-500">{label}</div>
        </div>
      </div>
    </div>
  );
}
