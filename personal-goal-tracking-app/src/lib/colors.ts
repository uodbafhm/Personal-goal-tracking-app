import type { ColorKey } from "./types";

export const COLORS: Record<ColorKey, { hex: string; label: string }> = {
  lime: { hex: "#A3E635", label: "ليموني" },
  emerald: { hex: "#34D399", label: "أخضر" },
  teal: { hex: "#2DD4BF", label: "تركواز" },
  sky: { hex: "#38BDF8", label: "سماوي" },
  violet: { hex: "#A78BFA", label: "بنفسجي" },
  pink: { hex: "#F472B6", label: "وردي" },
  amber: { hex: "#FBBF24", label: "ذهبي" },
  orange: { hex: "#FB923C", label: "برتقالي" },
};

export const COLOR_KEYS = Object.keys(COLORS) as ColorKey[];

/** hex -> rgba string with alpha */
export const alpha = (hex: string, a: number): string => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
