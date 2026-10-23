import { addDays, dateKey } from "./dates";
import type { DayLog, Habit, LogMap } from "./types";

export interface DayStats {
  done: number;
  missed: number;
  total: number;
  pct: number; // 0..1
}

export function dayStats(day: DayLog | undefined, habits: Habit[]): DayStats {
  const total = habits.length;
  let done = 0;
  let missed = 0;
  for (const h of habits) {
    const s = day?.[h.id];
    if (s === "done") done += 1;
    else if (s === "missed") missed += 1;
  }
  return { done, missed, total, pct: total > 0 ? done / total : 0 };
}

/** Consecutive 'done' days for a habit, ending today (or yesterday if today not done yet) */
export function habitStreak(habitId: string, log: LogMap): number {
  let n = 0;
  let d = new Date();
  if (log[dateKey(d)]?.[habitId] !== "done") d = addDays(d, -1);
  while (log[dateKey(d)]?.[habitId] === "done") {
    n += 1;
    d = addDays(d, -1);
  }
  return n;
}

/** Consecutive days where every habit was done */
export function perfectStreak(habits: Habit[], log: LogMap): number {
  if (habits.length === 0) return 0;
  let n = 0;
  let d = new Date();
  if (dayStats(log[dateKey(d)], habits).pct < 1) d = addDays(d, -1);
  while (dayStats(log[dateKey(d)], habits).pct === 1) {
    n += 1;
    d = addDays(d, -1);
  }
  return n;
}

/** Completion % over the last 7 days (including today) */
export function weekPct(habits: Habit[], log: LogMap): number {
  if (habits.length === 0) return 0;
  let done = 0;
  for (let i = 0; i < 7; i += 1) {
    const key = dateKey(addDays(new Date(), -i));
    done += dayStats(log[key], habits).done;
  }
  return done / (habits.length * 7);
}

/** Total 'done' marks ever */
export function totalDone(log: LogMap): number {
  let n = 0;
  for (const key of Object.keys(log)) {
    for (const habitId of Object.keys(log[key])) {
      if (log[key][habitId] === "done") n += 1;
    }
  }
  return n;
}
