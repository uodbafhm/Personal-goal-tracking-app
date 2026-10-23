import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Share, Smartphone, WifiOff, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallButton() {
  const [evt, setEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setEvt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const isIOS = /iphone|ipad|ipod/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  const handleClick = async () => {
    if (evt) {
      await evt.prompt();
      setEvt(null);
    } else {
      setOpen(true);
    }
  };

  const steps = isIOS
    ? [
        { icon: Smartphone, text: "حلّ هاد الصفحة فـ Safari" },
        { icon: Share, text: "ضغط على زر المشاركة (Share) اللي لتحت" },
        { icon: Download, text: "نزل لتحت وختار «Add to Home Screen»" },
      ]
    : [
        { icon: Smartphone, text: "فكْروم (Chrome)، ضغط على ⋮ اللي فوق" },
        { icon: Download, text: "ختار «تثبيت التطبيق» ولا «إضافة إلى الشاشة الرئيسية»" },
        { icon: Smartphone, text: "غادي تلقاه فالتليفون ديالك بحال أي APK" },
      ];

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={handleClick}
        aria-label="نزّل التطبيق"
        className="grid h-10 w-10 place-items-center rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635]"
        style={{ boxShadow: "0 0 20px -6px rgba(163,230,53,0.4)" }}
      >
        <Download size={16} strokeWidth={2.4} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              exit={{ y: "105%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-md rounded-t-[28px] border-t border-white/10 bg-[#0D120F] px-5 pt-5"
              style={{ paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))" }}
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" />
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-zinc-50">نزّلها فالتليفون</h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="سدّ"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3.5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#A3E635]/12 text-[#A3E635]">
                      <s.icon size={16} strokeWidth={2.2} />
                    </span>
                    <p className="text-[13px] font-semibold leading-relaxed text-zinc-200">
                      <span className="ml-1.5 font-black text-[#A3E635]">{i + 1}.</span>
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#A3E635]/20 bg-[#A3E635]/[0.06] p-3.5">
                <WifiOff size={16} className="mt-0.5 shrink-0 text-[#A3E635]" />
                <p className="text-xs font-semibold leading-relaxed text-zinc-300">
                  من بعد التثبيت، التطبيق كيخدم 100% بلا أنترنت، والمعطيات ديالك كاملة كتبقى
                  مخزنة فالتليفون ديالك بوحدك.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
