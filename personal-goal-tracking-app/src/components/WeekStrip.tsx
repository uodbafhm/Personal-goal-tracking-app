import { addDays, dateKey, DAYS_SHORT, todayKey } from "@/lib/dates";
import { dayStats } from "@/lib/stats";
import type { Habit, LogMap } from "@/lib/types";

interface Props {
  habits: Habit[];
  log: LogMap;
  selectedKey: string;
  onSelect: (key: string) => void;
}

export default function WeekStrip({ habits, log, selectedKey, onSelect }: Props) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 6));
  const tKey = todayKey();

  return (
    <div className="flex gap-1.5">
      {days.map((d) => {
        const key = dateKey(d);
        const { pct } = dayStats(log[key], habits);
        const selected = key === selectedKey;
        const isToday = key === tKey;

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="min-w-0 flex-1 rounded-2xl border px-1 py-2.5 text-center transition-all duration-200 active:scale-95"
            style={{
              borderColor: selected ? "transparent" : "rgba(255,255,255,0.06)",
              backgroundColor: selected ? "#A3E635" : "rgba(255,255,255,0.025)",
              boxShadow: selected ? "0 8px 24px -8px rgba(163,230,53,0.5)" : "none",
            }}
            aria-label={`نهار ${key}`}
          >
            <div
              className="text-[10px] font-semibold"
              style={{ color: selected ? "rgba(11,15,12,0.55)" : "#5B625D" }}
            >
              {DAYS_SHORT[d.getDay()]}
            </div>
            <div
              className="mt-0.5 text-[15px] font-extrabold leading-none"
              style={{
                color: selected ? "#0B0F0C" : isToday ? "#A3E635" : "#D9E4DC",
              }}
            >
              {d.getDate()}
            </div>
            <div
              className="mx-auto mt-2 h-[3px] w-4/5 overflow-hidden rounded-full"
              style={{ backgroundColor: selected ? "rgba(11,15,12,0.18)" : "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct * 100}%`,
                  backgroundColor: selected ? "#0B0F0C" : pct === 1 ? "#34D399" : "#A3E635",
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
