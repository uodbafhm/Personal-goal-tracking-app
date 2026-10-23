import { useCallback, useEffect, useState } from "react";
import { loadHabits, loadLog, saveHabits, saveLog } from "@/lib/storage";
import type { ColorKey, DayStatus, Habit, LogMap } from "@/lib/types";

const uid = () =>
  `h-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function usePlanner() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);
  const [log, setLog] = useState<LogMap>(loadLog);

  useEffect(() => saveHabits(habits), [habits]);
  useEffect(() => saveLog(log), [log]);

  const toggleStatus = useCallback(
    (habitId: string, key: string, status: DayStatus) => {
      setLog((prev) => {
        const day = { ...(prev[key] ?? {}) };
        if (day[habitId] === status) delete day[habitId];
        else day[habitId] = status;
        return { ...prev, [key]: day };
      });
    },
    []
  );

  const addHabit = useCallback(
    (input: { name: string; note?: string; icon: string; color: ColorKey }) => {
      const name = input.name.trim();
      if (!name) return;
      setHabits((prev) => [
        ...prev,
        {
          id: uid(),
          name,
          note: input.note?.trim() || undefined,
          icon: input.icon,
          color: input.color,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    []
  );

  const removeHabit = useCallback((habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  }, []);

  return { habits, log, toggleStatus, addHabit, removeHabit };
}
