import { motion } from "framer-motion";
import { Check, Flame, Trash2, X } from "lucide-react";
import { alpha, COLORS } from "@/lib/colors";
import { iconFor } from "@/lib/icons";
import { habitStreak } from "@/lib/stats";
import type { DayStatus, Habit, LogMap } from "@/lib/types";

interface Props {
  habit: Habit;
  status?: DayStatus;
  log: LogMap;
  editMode: boolean;
  detailsLabel?: string;
  onOpenDetails?: () => void;
  onToggle: (status: DayStatus) => void;
  onRemove: () => void;
}

const vibrate = () => {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* ignore */
  }
};

export default function HabitCard({
  habit,
  status,
  log,
  editMode,
  detailsLabel,
  onOpenDetails,
  onToggle,
  onRemove,
}: Props) {
  const color = COLORS[habit.color]?.hex ?? "#A3E635";
  const Icon = iconFor(habit.icon);
  const streak = habitStreak(habit.id, log);
  const done = status === "done";
  const missed = status === "missed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
      className="relative overflow-hidden rounded-3xl border p-4 backdrop-blur-sm"
      style={{
        borderColor: done
          ? alpha(color, 0.38)
          : missed
            ? "rgba(248,113,113,0.22)"
            : "rgba(255,255,255,0.07)",
        background: done
          ? `linear-gradient(140deg, ${alpha(color, 0.13)}, rgba(255,255,255,0.02) 60%)`
          : "rgba(255,255,255,0.025)",
        boxShadow: done ? `0 10px 34px -14px ${alpha(color, 0.4)}` : "none",
        transition: "border-color .3s, background .3s, box-shadow .3s",
      }}
    >
      <div className="flex items-center gap-3.5">
        {/* icon blob */}
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border"
          style={{
            backgroundColor: done ? alpha(color, 0.92) : alpha(color, 0.12),
            borderColor: alpha(color, 0.32),
            color: done ? "#0B0F0C" : color,
            boxShadow: done ? `0 0 26px ${alpha(color, 0.45)}` : "none",
            transition: "all .3s",
          }}
        >
          <Icon size={22} strokeWidth={2.2} />
        </div>

        {/* text */}
        <div
          className={`min-w-0 flex-1 ${onOpenDetails ? "cursor-pointer" : ""}`}
          onClick={onOpenDetails}
          onKeyDown={(e) => {
            if (!onOpenDetails) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenDetails();
            }
          }}
          role={onOpenDetails ? "button" : undefined}
          tabIndex={onOpenDetails ? 0 : undefined}
        >
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[15px] font-bold text-zinc-100">{habit.name}</h3>
            {streak > 0 && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                <Flame size={11} fill="currentColor" />
                {streak === 1 ? "يوم" : streak === 2 ? "يومين" : `${streak} أيام`}
              </span>
            )}
          </div>
          {habit.note && <p className="mt-0.5 truncate text-xs text-zinc-500">{habit.note}</p>}
          {onOpenDetails && detailsLabel && (
            <button
              onClick={onOpenDetails}
              className="mt-2 inline-flex max-w-full items-center rounded-full border border-sky-400/20 bg-sky-400/[0.08] px-2.5 py-1 text-[10px] font-bold text-sky-300 transition-transform active:scale-95"
            >
              <span className="truncate">{detailsLabel}</span>
            </button>
          )}
        </div>

        {/* actions */}
        <div className="flex shrink-0 items-start gap-2.5">
          <div className="flex flex-col items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              aria-label="فاتتني"
              onClick={() => {
                vibrate();
                onToggle("missed");
              }}
              className="grid h-11 w-11 place-items-center rounded-full border"
              style={{
                borderColor: missed ? "rgba(248,113,113,0.55)" : "rgba(255,255,255,0.10)",
                backgroundColor: missed ? "rgba(248,113,113,0.16)" : "rgba(255,255,255,0.03)",
                color: missed ? "#FCA5A5" : "#71717A",
                transition: "all .25s",
              }}
            >
              <X size={19} strokeWidth={2.6} />
            </motion.button>
            <span
              className="text-[9px] font-semibold"
              style={{ color: missed ? "#FCA5A5" : "#52525B" }}
            >
              فاتتني
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              aria-label="درتها"
              onClick={() => {
                vibrate();
                onToggle("done");
              }}
              className="grid h-11 w-11 place-items-center rounded-full border"
              style={{
                borderColor: done ? "transparent" : "rgba(255,255,255,0.10)",
                backgroundColor: done ? color : "rgba(255,255,255,0.03)",
                color: done ? "#0B0F0C" : "#71717A",
                boxShadow: done ? `0 8px 22px -6px ${alpha(color, 0.6)}` : "none",
                transition: "all .25s",
              }}
            >
              <Check size={21} strokeWidth={3} />
            </motion.button>
            <span className="text-[9px] font-semibold" style={{ color: done ? color : "#52525B" }}>
              درتها
            </span>
          </div>
        </div>

        {/* delete (edit mode) */}
        {editMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.85 }}
            aria-label="حيد العادة"
            onClick={onRemove}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400"
          >
            <Trash2 size={15} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
