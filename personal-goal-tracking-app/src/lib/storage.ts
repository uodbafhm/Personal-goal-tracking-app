import type { Habit, LogMap } from "./types";

const HKEY = "wakha.habits.v1";
const LKEY = "wakha.log.v1";

export const DEFAULT_HABITS: Habit[] = [
  {
    id: "h-eat",
    name: "ناكل صحي",
    note: "بلا سكريات ولا فاست فود",
    icon: "salad",
    color: "lime",
    createdAt: "2024-01-01",
  },
  {
    id: "h-run",
    name: "نجري",
    note: "30 دقيقة جري",
    icon: "run",
    color: "orange",
    createdAt: "2024-01-01",
  },
  {
    id: "h-course",
    name: "نقرا الدورات",
    note: "ساعة على الأقل",
    icon: "study",
    color: "sky",
    createdAt: "2024-01-01",
  },
  {
    id: "h-book",
    name: "نقرا كتاب",
    note: "20 صفحة",
    icon: "book",
    color: "violet",
    createdAt: "2024-01-01",
  },
];

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(HKEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as Habit[];
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_HABITS;
}

export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(HKEY, JSON.stringify(habits));
  } catch {
    /* ignore */
  }
}

export function loadLog(): LogMap {
  try {
    const raw = localStorage.getItem(LKEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed as LogMap;
    }
  } catch {
    /* ignore */
  }
  return {};
}

export function saveLog(log: LogMap): void {
  try {
    localStorage.setItem(LKEY, JSON.stringify(log));
  } catch {
    /* ignore */
  }
}
