import { Flame, Target, Trophy } from "lucide-react";
import { alpha } from "@/lib/colors";
import { perfectStreak, totalDone, weekPct } from "@/lib/stats";
import type { Habit, LogMap } from "@/lib/types";

interface Props {
  habits: Habit[];
  log: LogMap;
}

export default function StatsRow({ habits, log }: Props) {
  const streak = perfectStreak(habits, log);
  const wp = Math.round(weekPct(habits, log) * 100);
  const total = totalDone(log);

  const cards = [
    {
      icon: Flame,
      color: "#FBBF24",
      value: String(streak),
      suffix: streak === 1 ? "يوم" : streak === 2 ? "يومين" : "أيام",
      label: "أيام كاملة توالو",
    },
    {
      icon: Target,
      color: "#A3E635",
      value: `${wp}%`,
      suffix: "",
      label: "إنجاز هاد السيمانة",
    },
    {
      icon: Trophy,
      color: "#A78BFA",
      value: String(total),
      suffix: "درة",
      label: "مجموع الإنجازات",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {cards.map((c) => (
        <div
          key={c.label}
          className="flex flex-col gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3"
        >
          <div
            className="grid h-8 w-8 place-items-center rounded-xl"
            style={{ backgroundColor: alpha(c.color, 0.12), color: c.color }}
          >
            <c.icon size={15} strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xl font-black leading-none tracking-tight text-zinc-50">
              {c.value}
              {c.suffix && (
                <span className="mr-1 text-[11px] font-bold text-zinc-500">{c.suffix}</span>
              )}
            </div>
            <div className="mt-1.5 text-[10px] font-semibold leading-tight text-zinc-500">
              {c.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
