import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Pencil, Plus, Undo2, WifiOff } from "lucide-react";
import AddHabitSheet from "@/components/AddHabitSheet";
import Celebration from "@/components/Celebration";
import DailyVitaminsSheet from "@/components/DailyVitaminsSheet";
import HabitCard from "@/components/HabitCard";
import InstallButton from "@/components/InstallButton";
import Ring from "@/components/Ring";
import StatsRow from "@/components/StatsRow";
import VitaminTracker from "@/components/VitaminTracker";
import WeekStrip from "@/components/WeekStrip";
import { usePlanner } from "@/hooks/usePlanner";
import { useVitamins } from "@/hooks/useVitamins";
import {
  DAYS_FULL,
  fullDate,
  greeting,
  parseKey,
  quoteOfTheDay,
  todayKey,
} from "@/lib/dates";
import { dayStats } from "@/lib/stats";

export default function App() {
  const { habits, log, toggleStatus, addHabit, removeHabit } = usePlanner();
  const { vitLog, toggleVitamin } = useVitamins();
  const [selectedKey, setSelectedKey] = useState(todayKey());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [vitaminSheetOpen, setVitaminSheetOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [party, setParty] = useState(false);

  const isToday = selectedKey === todayKey();
  const selected = parseKey(selectedKey);
  const stats = dayStats(log[selectedKey], habits);
  const weekday = DAYS_FULL[selected.getDay()];

  const isHealthyHabit = (name: string, id: string) =>
    id === "h-eat" || /ناكل صحي|اكل صحي|أكل صحي|healthy/i.test(name);

  // Celebration when today reaches 100%
  const pctRef = useRef(stats.pct);
  useEffect(() => {
    const prev = pctRef.current;
    pctRef.current = stats.pct;
    if (isToday && stats.total > 0 && stats.pct === 1 && prev < 1) {
      setParty(true);
      const t = setTimeout(() => setParty(false), 3000);
      return () => clearTimeout(t);
    }
  }, [stats.pct, stats.total, isToday]);

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div
          className="absolute -top-44 right-[-25%] h-[440px] w-[440px] rounded-full opacity-[0.14]"
          style={{ background: "radial-gradient(circle, #A3E635 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-[-18%] left-[-30%] h-[440px] w-[440px] rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle, #34D399 0%, transparent 65%)" }}
        />
      </div>
      <div className="grain" aria-hidden />

      <div
        className="relative z-10 mx-auto w-full max-w-md px-5 pt-6"
        style={{ paddingBottom: "calc(7.5rem + env(safe-area-inset-bottom))" }}
      >
        {/* header */}
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[26px] font-black leading-none tracking-tight text-zinc-50">
                واخا
              </span>
              <span
                className="h-2 w-2 rounded-full bg-[#A3E635]"
                style={{ boxShadow: "0 0 14px rgba(163,230,53,0.9)" }}
              />
            </div>
            <p className="mt-1.5 text-[10px] font-semibold text-zinc-500">
              البلان ديالي · كيخدم بلا أنترنت
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setEditMode((v) => !v)}
              aria-label="بدّل العادات"
              className="grid h-10 w-10 place-items-center rounded-full border"
              style={
                editMode
                  ? {
                      borderColor: "rgba(163,230,53,0.5)",
                      backgroundColor: "rgba(163,230,53,0.12)",
                      color: "#A3E635",
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.1)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      color: "#8A938D",
                    }
              }
            >
              <Pencil size={15} strokeWidth={2.3} />
            </motion.button>
            <InstallButton />
          </div>
        </header>

        {/* hero */}
        <section className="mt-7 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-zinc-400">
              {greeting()}
            </p>
            <h1 className="mt-1 text-[32px] font-black leading-tight tracking-tight text-zinc-50">
              نهار {weekday}
            </h1>
            <p className="text-[13px] font-semibold text-zinc-500">{fullDate(selected)}</p>
            <p className="mt-4 border-r-2 border-[#A3E635]/50 pr-3 text-[12.5px] font-semibold leading-relaxed text-zinc-400">
              «{quoteOfTheDay()}»
            </p>
          </div>
          <Ring pct={stats.pct} size={138} stroke={11} />
        </section>

        {/* week */}
        <section className="mt-6">
          <WeekStrip habits={habits} log={log} selectedKey={selectedKey} onSelect={setSelectedKey} />
        </section>

        {/* plan */}
        <section className="mt-7">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-zinc-300">
              {isToday ? "البلان دياليوم" : `بلان نهار ${weekday}`}
            </h2>
            {!isToday ? (
              <button
                onClick={() => setSelectedKey(todayKey())}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-3 py-1.5 text-[11px] font-bold text-[#A3E635] transition-transform active:scale-95"
              >
                <Undo2 size={12} />
                رجع لليوم
              </button>
            ) : (
              habits.length > 0 && (
                <span className="text-[11px] font-bold text-zinc-500">
                  {stats.done}/{stats.total} تكملو
                </span>
              )
            )}
          </div>

          <div className="mt-3.5 space-y-3">
            <AnimatePresence mode="popLayout">
              {habits.map((h) => (
                <HabitCard
                  key={h.id}
                  habit={h}
                  status={log[selectedKey]?.[h.id]}
                  log={log}
                  editMode={editMode}
                  detailsLabel={
                    isHealthyHabit(h.name, h.id) ? "شوف فيتامينات هاد النهار" : undefined
                  }
                  onOpenDetails={
                    isHealthyHabit(h.name, h.id)
                      ? () => setVitaminSheetOpen(true)
                      : undefined
                  }
                  onToggle={(s) => toggleStatus(h.id, selectedKey, s)}
                  onRemove={() => {
                    if (window.confirm(`متأكد باغي تحيد «${h.name}»؟`)) removeHabit(h.id);
                  }}
                />
              ))}
            </AnimatePresence>

            {habits.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-dashed border-white/12 bg-white/[0.02] p-8 text-center"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#A3E635]/10 text-[#A3E635]">
                  <CheckCheck size={20} />
                </div>
                <p className="mt-3 text-sm font-bold text-zinc-300">مازال ما كاينة حتى عادة</p>
                <p className="mt-1 text-xs text-zinc-500">زيد أول عادة فالبلان ديالك</p>
                <button
                  onClick={() => setSheetOpen(true)}
                  className="mt-4 rounded-xl px-5 py-2.5 text-[13px] font-extrabold text-[#0B0F0C] transition-transform active:scale-95"
                  style={{ background: "linear-gradient(135deg,#A3E635,#34D399)" }}
                >
                  زيد عادة
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* vitamins */}
        <VitaminTracker vitLog={vitLog} onToggle={toggleVitamin} />

        {/* stats */}
        <section className="mt-8">
          <h2 className="text-sm font-extrabold text-zinc-300">الحصيلة ديالك</h2>
          <div className="mt-3.5">
            <StatsRow habits={habits} log={log} />
          </div>
        </section>

        <footer className="mt-10 text-center">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-zinc-600">
            <WifiOff size={11} />
            كيخدم 100% بلا أنترنت · المعطيات ديالك فالتليفون ديالك
          </p>
        </footer>
      </div>

      {/* FAB */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-5"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSheetOpen(true)}
            aria-label="زيد عادة"
            className="grid h-[60px] w-[60px] place-items-center rounded-full text-[#0B0F0C]"
            style={{
              background: "linear-gradient(135deg,#A3E635,#34D399)",
              boxShadow: "0 16px 42px -10px rgba(163,230,53,0.55)",
            }}
          >
            <Plus size={26} strokeWidth={2.8} />
          </motion.button>
        </div>
      </div>

      <AddHabitSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onAdd={addHabit} />
      <DailyVitaminsSheet
        open={vitaminSheetOpen}
        dayKey={selectedKey}
        onClose={() => setVitaminSheetOpen(false)}
        vitLog={vitLog}
        onToggle={toggleVitamin}
      />
      <Celebration show={party} />
    </div>
  );
}
