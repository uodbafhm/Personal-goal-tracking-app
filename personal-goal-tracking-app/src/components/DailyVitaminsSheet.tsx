import { AnimatePresence, motion } from "framer-motion";
import { Check, Droplets, Info, Pill, Wheat, X } from "lucide-react";
import { fullDate, parseKey } from "@/lib/dates";
import { alpha } from "@/lib/colors";
import {
  seedsForDay,
  vitaminById,
  vitaminsForDay,
  type VitaminLog,
} from "@/lib/vitamins";

interface Props {
  open: boolean;
  dayKey: string;
  onClose: () => void;
  vitLog: VitaminLog;
  onToggle: (dayKey: string, itemId: string) => void;
}

export default function DailyVitaminsSheet({
  open,
  dayKey,
  onClose,
  vitLog,
  onToggle,
}: Props) {
  const day = parseKey(dayKey);
  const dow = day.getDay();

  // Vitamins data
  const vitsSchedule = vitaminsForDay(dow);
  const isRest = vitsSchedule === null;
  const vitaminIds = vitsSchedule ?? [];
  const vitsDoneCount = vitaminIds.filter((id) => vitLog[dayKey]?.[id]).length;

  // Seeds data
  const seedsSchedule = seedsForDay(dow);
  const seedsItems = seedsSchedule.items;
  const seedsDoneCount = seedsItems.filter((s) => vitLog[dayKey]?.[s.id]).length;

  const totalItems = vitaminIds.length + seedsItems.length;
  const totalDone = vitsDoneCount + seedsDoneCount;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[75] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            exit={{ y: "105%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-[75] mx-auto w-full max-w-md rounded-t-[28px] border-t border-white/10 bg-[#0D120F] px-5 pt-5 max-h-[92dvh] overflow-y-auto no-scrollbar"
            style={{ paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15 shrink-0" />

            <div className="flex items-center justify-between gap-3 sticky top-0 bg-[#0D120F] pt-2 pb-4 z-10">
              <div>
                <div className="flex items-center gap-2.5">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-xl"
                    style={{ backgroundColor: alpha("#38BDF8", 0.12), color: "#38BDF8" }}
                  >
                    <Pill size={17} strokeWidth={2.3} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-zinc-50">فيتامينات وحبوب اليوم</h2>
                    <p className="text-[11px] font-semibold text-zinc-500">{fullDate(day)}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="سدّ"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400"
              >
                <X size={16} />
              </button>
            </div>

            {isRest ? (
              <div className="mt-3 rounded-3xl border border-sky-400/15 bg-sky-400/[0.05] p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-400/10 text-sky-300">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-zinc-100">يوم راحة تام</h3>
                    <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-zinc-400">
                      {seedsSchedule.reason}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-6 mt-3">
                {/* Progress Header */}
                <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                  <p className="text-[13px] font-semibold text-zinc-400">
                    مجموع المكملات والحبوب اليوم
                  </p>
                  <span className="text-xs font-extrabold text-[#34D399]">
                    {totalDone}/{totalItems}
                  </span>
                </div>

                {/* Section 1: Vitamins */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold text-zinc-300">
                    <Pill size={14} className="text-[#38BDF8]" />
                    المكملات الغذائية
                  </h3>
                  <div className="space-y-2.5">
                    {vitaminIds.map((vitId) => {
                      const vit = vitaminById(vitId);
                      if (!vit) return null;
                      const checked = !!vitLog[dayKey]?.[vitId];
                      const label = vit.nameAr ? `${vit.name} (${vit.nameAr})` : vit.name;

                      return (
                        <motion.button
                          key={vitId}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onToggle(dayKey, vitId)}
                          className="flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-right transition-all"
                          style={{
                            borderColor: checked
                              ? "rgba(52,211,153,0.35)"
                              : "rgba(255,255,255,0.08)",
                            background: checked
                              ? "linear-gradient(140deg, rgba(52,211,153,0.12), rgba(255,255,255,0.025) 70%)"
                              : "rgba(255,255,255,0.025)",
                          }}
                        >
                          <div
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border"
                            style={{
                              borderColor: checked
                                ? "rgba(52,211,153,0.35)"
                                : "rgba(255,255,255,0.08)",
                              backgroundColor: checked
                                ? "rgba(52,211,153,0.14)"
                                : "rgba(255,255,255,0.04)",
                              color: checked ? "#6EE7B7" : "#38BDF8",
                            }}
                          >
                            {checked ? <Check size={18} strokeWidth={3} /> : <Pill size={16} />}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-bold text-zinc-100">
                              {label}
                            </div>
                            <div className="mt-1 text-[11px] font-semibold text-zinc-500">
                              {checked ? "تخذات ✅" : "ضغط عليها منين تاخذها"}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Seeds */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold text-zinc-300">
                    <Wheat size={14} className="text-[#FBBF24]" />
                    الحبوب والزرارع <span className="text-zinc-500 text-[11px] mr-1">({seedsSchedule.title})</span>
                  </h3>

                  {/* Reason Box */}
                  <div className="flex gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-3.5">
                    <Info size={16} className="shrink-0 text-amber-400/70 mt-0.5" />
                    <p className="text-[12px] font-semibold leading-relaxed text-amber-200/80">
                      {seedsSchedule.reason}
                    </p>
                  </div>

                  {seedsItems.length > 0 ? (
                    <div className="space-y-2.5">
                      {seedsItems.map((seed) => {
                        const checked = !!vitLog[dayKey]?.[seed.id];
                        return (
                          <motion.button
                            key={seed.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onToggle(dayKey, seed.id)}
                            className="flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-right transition-all"
                            style={{
                              borderColor: checked
                                ? "rgba(52,211,153,0.35)"
                                : "rgba(255,255,255,0.08)",
                              background: checked
                                ? "linear-gradient(140deg, rgba(52,211,153,0.12), rgba(255,255,255,0.025) 70%)"
                                : "rgba(255,255,255,0.025)",
                            }}
                          >
                            <div
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border"
                              style={{
                                borderColor: checked
                                  ? "rgba(52,211,153,0.35)"
                                  : "rgba(255,255,255,0.08)",
                                backgroundColor: checked
                                  ? "rgba(52,211,153,0.14)"
                                  : "rgba(255,255,255,0.04)",
                                color: checked ? "#6EE7B7" : "#FBBF24",
                              }}
                            >
                              {checked ? <Check size={18} strokeWidth={3} /> : <Wheat size={16} />}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[13px] font-bold text-zinc-100">
                                {seed.label}
                              </div>
                              <div className="mt-1 text-[11px] font-semibold text-zinc-500">
                                {checked ? "تكالت ✅" : "ضغط عليها منين تاكلها"}
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
