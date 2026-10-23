import { motion } from "framer-motion";
import { Check, Droplets, Pill, Wheat } from "lucide-react";
import { addDays, dateKey, DAYS_FULL, DAYS_SHORT, todayKey } from "@/lib/dates";
import { alpha } from "@/lib/colors";
import { 
  seedsForDay, 
  vitaminById, 
  vitaminsForDay, 
  type VitaminLog 
} from "@/lib/vitamins";

interface Props {
  vitLog: VitaminLog;
  onToggle: (dayKey: string, itemId: string) => void;
}

export default function VitaminTracker({ vitLog, onToggle }: Props) {
  const today = new Date();
  const tKey = todayKey();

  const todayDow = today.getDay();
  const satOffset = todayDow === 6 ? 0 : -(todayDow + 1); 
  const saturday = addDays(today, satOffset);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(saturday, i);
    const key = dateKey(d);
    const dow = d.getDay();
    const vitsSchedule = vitaminsForDay(dow);
    const seedsSchedule = seedsForDay(dow);
    const isToday = key === tKey;
    return { date: d, key, dow, vitsSchedule, seedsSchedule, isToday };
  });

  return (
    <section className="mt-8">
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="grid h-8 w-8 place-items-center rounded-xl"
          style={{ backgroundColor: alpha("#38BDF8", 0.12), color: "#38BDF8" }}
        >
          <Pill size={15} strokeWidth={2.2} />
        </div>
        <h2 className="text-sm font-extrabold text-zinc-300">المكملات والحبوب ديالي</h2>
      </div>

      <div className="space-y-2.5">
        {days.map((day) => {
          const isRest = day.vitsSchedule === null;
          
          const vitIds = day.vitsSchedule ?? [];
          const seedsItems = day.seedsSchedule.items;
          const totalItems = vitIds.length + seedsItems.length;
          
          const doneVits = vitIds.filter((id) => vitLog[day.key]?.[id]).length;
          const doneSeeds = seedsItems.filter((s) => vitLog[day.key]?.[s.id]).length;
          const totalDone = doneVits + doneSeeds;

          const allDone = !isRest && totalItems > 0 && totalDone === totalItems;

          return (
            <motion.div
              key={day.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 }}
              className="relative overflow-hidden rounded-2xl border p-3.5"
              style={{
                borderColor: day.isToday
                  ? "rgba(56,189,248,0.4)"
                  : allDone
                    ? "rgba(52,211,153,0.25)"
                    : "rgba(255,255,255,0.06)",
                background: day.isToday
                  ? "linear-gradient(140deg, rgba(56,189,248,0.08), rgba(255,255,255,0.02) 70%)"
                  : allDone
                    ? "linear-gradient(140deg, rgba(52,211,153,0.06), rgba(255,255,255,0.02) 70%)"
                    : "rgba(255,255,255,0.025)",
                boxShadow: day.isToday
                  ? "0 8px 28px -12px rgba(56,189,248,0.3)"
                  : "none",
                transition: "all .3s",
              }}
            >
              <div className="flex items-start gap-3">
                {/* Day number circle */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div
                    className="text-[9px] font-bold"
                    style={{ color: day.isToday ? "#38BDF8" : "#5B625D" }}
                  >
                    {DAYS_SHORT[day.dow]}
                  </div>
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl font-extrabold text-[16px]"
                    style={{
                      backgroundColor: day.isToday
                        ? "#38BDF8"
                        : "rgba(255,255,255,0.06)",
                      color: day.isToday ? "#0B0F0C" : "#D9E4DC",
                      boxShadow: day.isToday
                        ? "0 6px 18px -6px rgba(56,189,248,0.5)"
                        : "none",
                    }}
                  >
                    {day.date.getDate()}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-zinc-200">
                      {DAYS_FULL[day.dow]}
                      {day.isToday && (
                        <span className="mr-1.5 text-[10px] font-extrabold text-[#38BDF8]">
                          (اليوم)
                        </span>
                      )}
                    </span>
                    {!isRest && totalItems > 0 && (
                      <span
                        className="text-[11px] font-bold"
                        style={{
                          color: allDone ? "#34D399" : "#6B726D",
                        }}
                      >
                        {totalDone}/{totalItems}
                      </span>
                    )}
                  </div>

                  {isRest ? (
                    <div className="mt-2 flex items-center gap-2">
                      <Droplets size={14} className="text-sky-400/60" />
                      <span className="text-xs font-semibold text-zinc-500">
                        يوم راحة تام 💧 الماء فقط
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2.5 space-y-2">
                      {/* Vitamins tags */}
                      {vitIds.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {vitIds.map((vitId) => {
                            const vit = vitaminById(vitId);
                            if (!vit) return null;
                            const checked = !!vitLog[day.key]?.[vitId];
                            const label = vit.nameAr ? `${vit.name} (${vit.nameAr})` : vit.name;

                            return (
                              <motion.button
                                key={vitId}
                                whileTap={{ scale: 0.93 }}
                                onClick={() => onToggle(day.key, vitId)}
                                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all active:scale-95"
                                style={{
                                  borderColor: checked
                                    ? "rgba(52,211,153,0.45)"
                                    : "rgba(56,189,248,0.2)",
                                  backgroundColor: checked
                                    ? "rgba(52,211,153,0.12)"
                                    : "rgba(56,189,248,0.05)",
                                  color: checked ? "#6EE7B7" : "#9CA3AF",
                                }}
                              >
                                {checked && <Check size={11} strokeWidth={3} className="text-emerald-400" />}
                                <span>{label}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      )}

                      {/* Seeds tags */}
                      {seedsItems.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {seedsItems.map((seed) => {
                            const checked = !!vitLog[day.key]?.[seed.id];
                            return (
                              <motion.button
                                key={seed.id}
                                whileTap={{ scale: 0.93 }}
                                onClick={() => onToggle(day.key, seed.id)}
                                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all active:scale-95"
                                style={{
                                  borderColor: checked
                                    ? "rgba(52,211,153,0.45)"
                                    : "rgba(251,191,36,0.25)",
                                  backgroundColor: checked
                                    ? "rgba(52,211,153,0.12)"
                                    : "rgba(251,191,36,0.08)",
                                  color: checked ? "#6EE7B7" : "#FCD34D",
                                }}
                              >
                                {checked ? (
                                  <Check size={11} strokeWidth={3} className="text-emerald-400" />
                                ) : (
                                  <Wheat size={10} className="text-amber-400" />
                                )}
                                <span>{seed.label}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
