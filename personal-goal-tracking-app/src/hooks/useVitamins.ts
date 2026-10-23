import { useCallback, useEffect, useState } from "react";
import { loadVitaminLog, saveVitaminLog, type VitaminLog } from "@/lib/vitamins";

const vibrate = () => {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* ignore */
  }
};

export function useVitamins() {
  const [vitLog, setVitLog] = useState<VitaminLog>(loadVitaminLog);

  useEffect(() => {
    saveVitaminLog(vitLog);
  }, [vitLog]);

  const toggleVitamin = useCallback((dayKey: string, vitId: string) => {
    vibrate();
    setVitLog((prev) => {
      const day = { ...(prev[dayKey] ?? {}) };
      if (day[vitId]) delete day[vitId];
      else day[vitId] = true;
      return { ...prev, [dayKey]: day };
    });
  }, []);

  return { vitLog, toggleVitamin };
}
