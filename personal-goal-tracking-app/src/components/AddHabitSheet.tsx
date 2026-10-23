import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { alpha, COLOR_KEYS, COLORS } from "@/lib/colors";
import { ICON_KEYS, iconFor } from "@/lib/icons";
import type { ColorKey } from "@/lib/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (input: { name: string; note?: string; icon: string; color: ColorKey }) => void;
}

export default function AddHabitSheet({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [icon, setIcon] = useState("other");
  const [color, setColor] = useState<ColorKey>("lime");

  useEffect(() => {
    if (open) {
      setName("");
      setNote("");
      setIcon("other");
      setColor("lime");
    }
  }, [open]);

  const currentHex = COLORS[color].hex;

  const submit = () => {
    if (!name.trim()) return;
    onAdd({ name, note, icon, color });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            exit={{ y: "105%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="no-scrollbar fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-t-[28px] border-t border-white/10 bg-[#0D120F] px-5 pt-5"
            style={{ paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" />

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-zinc-50">عادة جديدة</h2>
              <button
                onClick={onClose}
                aria-label="سدّ"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400"
              >
                <X size={16} />
              </button>
            </div>

            <label className="mt-5 block text-xs font-bold text-zinc-400">سميتها</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً: نم بدري، نشرب الماء…"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#A3E635]/60"
              maxLength={40}
              autoFocus
            />

            <label className="mt-4 block text-xs font-bold text-zinc-400">
              التفاصيل <span className="font-medium text-zinc-600">(اختياري)</span>
            </label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="مثلاً: قبل 11 ديال الليل"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#A3E635]/60"
              maxLength={50}
            />

            <label className="mt-5 block text-xs font-bold text-zinc-400">الأيقونة</label>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {ICON_KEYS.map((key) => {
                const I = iconFor(key);
                const selected = key === icon;
                return (
                  <button
                    key={key}
                    onClick={() => setIcon(key)}
                    aria-label={key}
                    className="grid aspect-square place-items-center rounded-2xl border transition-all active:scale-90"
                    style={{
                      borderColor: selected ? alpha(currentHex, 0.65) : "rgba(255,255,255,0.08)",
                      backgroundColor: selected ? alpha(currentHex, 0.14) : "rgba(255,255,255,0.02)",
                      color: selected ? currentHex : "#6B726D",
                    }}
                  >
                    <I size={19} strokeWidth={2.1} />
                  </button>
                );
              })}
            </div>

            <label className="mt-5 block text-xs font-bold text-zinc-400">اللون</label>
            <div className="mt-2.5 flex flex-wrap gap-3">
              {COLOR_KEYS.map((key) => {
                const c = COLORS[key];
                const selected = key === color;
                return (
                  <button
                    key={key}
                    onClick={() => setColor(key)}
                    aria-label={c.label}
                    className="h-8 w-8 rounded-full transition-all active:scale-90"
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: selected
                        ? `0 0 0 3px #0D120F, 0 0 0 5px ${c.hex}`
                        : "0 0 0 1px rgba(255,255,255,0.12)",
                      transform: selected ? "scale(1.08)" : "scale(1)",
                    }}
                  />
                );
              })}
            </div>

            <button
              onClick={submit}
              disabled={!name.trim()}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-extrabold text-[#0B0F0C] transition-all active:scale-[0.98] disabled:opacity-35"
              style={{
                background: "linear-gradient(135deg, #A3E635, #34D399)",
                boxShadow: "0 12px 32px -10px rgba(163,230,53,0.5)",
              }}
            >
              <Plus size={18} strokeWidth={2.8} />
              زيدها للبلان
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
